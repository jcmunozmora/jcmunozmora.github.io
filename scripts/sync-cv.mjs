#!/usr/bin/env node
// Reads the bilingual LaTeX CV (Overleaf, synced through Dropbox) and writes src/data/cv.json.
// Both files share the same structure, so entries are paired by position.
//
//   npm run sync:cv
//   CV_DIR=/path npm run sync:cv
import { readFile, writeFile, stat, mkdir, copyFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const DIR = process.env.CV_DIR ?? join(homedir(), 'Library/CloudStorage/Dropbox/Apps/Overleaf/CV - JC');
const OUT = new URL('../src/data/cv.json', import.meta.url).pathname;
const FILES = { en: 'CV-MunozMora-EN.tex', es: 'CV-MunozMora-ES.tex' };

// Section keys by position in the English CV, so the Spanish headings never matter.
const KEYS = {
  'Profile': 'profile',
  'Research Fields': 'fields',
  'Education': 'education',
  'Academic Appointments': 'appointments',
  'Academic Leadership & Administration': 'leadership',
  'Teaching & Thesis Supervision': 'teaching',
  'Recent Courses': 'courses',
  'Doctoral Thesis Supervision': 'supervision',
  'Affiliations': 'affiliations',
  'Publications': 'publications',
  'Peer-Reviewed Journal Articles (International)': 'articles_intl',
  'Peer-Reviewed Journal Articles (Colombia)': 'articles_col',
  'Books': 'books',
  'Book Chapters': 'chapters',
  'Other Publications (methodological)': 'other_pubs',
  'Working Papers & Work in Progress': 'working_papers',
  'Research Reports & Policy Papers': 'reports',
  'Selected Grants, Evaluations & Consultancies': 'grants',
  'Earlier Research Positions': 'earlier_positions',
  'Professional Activities': 'activities',
  'Invited Seminars & Presentations': 'seminars',
  'Conferences & Workshops': 'conferences',
  'Refereeing': 'refereeing',
  'Honors & Scholarships': 'honors',
  'Skills & Languages': 'skills',
};

// Returns the content of the balanced {...} group starting at s[i] === '{', and the index after it.
function group(s, i) {
  if (s[i] !== '{') throw new Error(`expected "{" at ${i}: ${s.slice(i, i + 40)}`);
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === '\\') { j++; continue; }
    if (s[j] === '{') depth++;
    else if (s[j] === '}' && --depth === 0) return [s.slice(i + 1, j), j + 1];
  }
  throw new Error(`unbalanced group at ${i}`);
}

function replaceCommand(s, name, arity, fn) {
  let out = '';
  let i = 0;
  const tok = `\\${name}{`;
  for (;;) {
    const k = s.indexOf(tok, i);
    if (k < 0) return out + s.slice(i);
    out += s.slice(i, k);
    let j = k + tok.length - 1;
    const args = [];
    for (let a = 0; a < arity; a++) {
      const [g, next] = group(s, j);
      args.push(g);
      j = next;
    }
    out += fn(...args);
    i = j;
  }
}

const escapeHtml = (s) => s.replace(/&(?![a-z]+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// LaTeX fragment -> small, safe HTML (strong, em, a) plus the list of URLs it links to.
function toHtml(tex) {
  const links = [];
  let s = tex.replace(/(?<!\\)%.*$/gm, '');
  s = s
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\#/g, '#')
    .replace(/\\_/g, '_')
    .replace(/\\LaTeX\b/g, 'LaTeX')
    .replace(/\\dotsep/g, ' · ')
    .replace(/\\par\b/g, '')
    .replace(/\\\s/g, ' ')
    .replace(/~/g, ' ')
    .replace(/---/g, '—')
    .replace(/--/g, '–');
  s = escapeHtml(s);
  s = replaceCommand(s, 'href', 2, (url, text) => {
    const u = url.replace(/&amp;/g, '&').replace(/\\/g, '');
    links.push(u);
    return `<a href="${u.replace(/&/g, '&amp;').replace(/"/g, '%22')}" rel="noopener">${text}</a>`;
  });
  s = replaceCommand(s, 'textbf', 1, (t) => `<strong>${t}</strong>`);
  s = replaceCommand(s, 'emph', 1, (t) => `<em>${t}</em>`);
  s = s.replace(/\\[a-zA-Z]+\*?/g, '').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
  return { html: s, links };
}

const plain = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function parse(tex) {
  const body = tex.slice(tex.indexOf('\\begin{document}'), tex.indexOf('\\end{document}'));
  const tagline = group(tex, tex.indexOf('\\cvtagline{') + '\\cvtagline'.length)[0];
  const heads = [...body.matchAll(/\\(section|cvsubhead)\{/g)].map((m) => ({
    kind: m[1],
    at: m.index,
    title: group(body, m.index + m[0].length - 1)[0],
  }));
  const sections = heads.map((h, n) => {
    const chunk = body.slice(h.at, n + 1 < heads.length ? heads[n + 1].at : body.length);
    const items = [];
    for (const m of chunk.matchAll(/\\pub\{/g)) {
      const [title, j] = group(chunk, m.index + 4);
      const [rest] = group(chunk, j);
      const t = toHtml(title);
      const r = toHtml(rest);
      items.push({ type: 'ref', title: plain(t.html), rest: r.html.replace(/^[,.]\s*/, ''), links: r.links });
    }
    for (const line of chunk.split('\n')) {
      const m = line.match(/^\\yr\{([^}]*)\}\s*&\s*(.*?)\s*(\\\\)?\s*$/);
      if (m) {
        const t = toHtml(m[2]);
        items.push({ type: 'dated', when: plain(toHtml(m[1]).html), text: t.html, links: t.links });
      }
    }
    const inline = chunk.indexOf('\\cvinline{');
    if (inline >= 0) {
      const [g] = group(chunk, inline + '\\cvinline'.length);
      items.push({ type: 'inline', values: plain(toHtml(g).html).split(' · ').map((v) => v.trim()).filter(Boolean) });
    }
    if (!items.length && h.kind === 'section') {
      const text = chunk.replace(/^\\section\{[^}]*\}/, '').replace(/^\s*\{\\footnotesize\s*/, '').replace(/\\par\}\s*$/, '');
      const t = toHtml(text.trim());
      if (t.html) items.push({ type: 'text', text: t.html, links: t.links });
    }
    return { kind: h.kind, title: plain(toHtml(h.title).html), items };
  });
  return { tagline: plain(toHtml(tagline).html), sections };
}

const parsed = {};
const mtimes = {};
for (const [lang, file] of Object.entries(FILES)) {
  const path = join(DIR, file);
  parsed[lang] = parse(await readFile(path, 'utf8'));
  mtimes[lang] = (await stat(path)).mtime.toISOString().slice(0, 10);
}

const { en, es } = parsed;
if (en.sections.length !== es.sections.length) {
  console.error(`sync-cv: EN has ${en.sections.length} sections, ES has ${es.sections.length}`);
  process.exit(1);
}

const sections = {};
for (let n = 0; n < en.sections.length; n++) {
  const a = en.sections[n];
  const b = es.sections[n];
  const key = KEYS[a.title];
  if (!key) { console.error(`sync-cv: unknown section "${a.title}" — add it to KEYS`); process.exit(1); }
  if (a.items.length !== b.items.length) {
    console.error(`sync-cv: "${a.title}" has ${a.items.length} items in EN and ${b.items.length} in ES`);
    process.exit(1);
  }
  sections[key] = {
    title: { en: a.title, es: b.title },
    items: a.items.map((x, i) => ({ en: x, es: b.items[i] })),
  };
}

const out = {
  generated: 'scripts/sync-cv.mjs — do not edit; edit the CV in Overleaf and run npm run sync:cv',
  source: { dir: DIR, files: FILES, updated: mtimes },
  tagline: { en: en.tagline, es: es.tagline },
  sections,
};
const json = `${JSON.stringify(out, null, 2)}\n`;
const previous = await readFile(OUT, 'utf8').catch(() => null);
if (previous !== json) await writeFile(OUT, json);
// The compiled PDFs are published as-is for download.
const pdfDir = new URL('../public/cv/', import.meta.url).pathname;
await mkdir(pdfDir, { recursive: true });
for (const file of Object.values(FILES)) {
  const pdf = file.replace(/\.tex$/, '.pdf');
  await copyFile(join(DIR, pdf), join(pdfDir, pdf));
}

const count = Object.values(sections).reduce((n, s) => n + s.items.length, 0);
console.log(`sync-cv: ${Object.keys(sections).length} sections · ${count} entries · CV updated ${mtimes.en} · ${previous === json ? 'unchanged' : 'written'}`);
