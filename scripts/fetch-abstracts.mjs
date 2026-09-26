#!/usr/bin/env node
// Finds the abstract of every journal article (papers.bib) and working paper (CV) that has none,
// and stores it in src/data/abstracts.json keyed by title slug. Sources, in order: Crossref, OpenAlex
// (by DOI) and Zenodo (for replication packages linked to a paper in src/data/resources.ts).
// Existing abstracts are never overwritten; pass --refresh to fetch them again.
//
//   npm run abstracts
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'src/data/abstracts.json');
const MAILTO = 'jmunozm1@eafit.edu.co';
const REFRESH = process.argv.includes('--refresh');

// Same rule as src/lib/slug.ts.
function titleSlug(title) {
  const s = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (s.length <= 64) return s;
  const cut = s.slice(0, 64);
  return cut.slice(0, cut.lastIndexOf('-'));
}
const decode = (t) => t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const clean = (t) => decode(decode(t))
  .replace(/<\/?jats:[^>]*>/g, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ').replace(/^(abstract|resumen)[:.\s]+/i, '').trim();

async function json(url) {
  const r = await fetch(url, { headers: { 'User-Agent': `jcmunozmora-site (mailto:${MAILTO})` }, signal: AbortSignal.timeout(25000) });
  return r.ok ? r.json() : null;
}

async function fromCrossref(doi) {
  const d = await json(`https://api.crossref.org/works/${encodeURIComponent(doi)}?mailto=${MAILTO}`);
  const a = d?.message?.abstract;
  return a ? clean(a) : null;
}
async function fromOpenAlex(doi) {
  const d = await json(`https://api.openalex.org/works/doi:${encodeURIComponent(doi)}?select=abstract_inverted_index&mailto=${MAILTO}`);
  const inv = d?.abstract_inverted_index;
  if (!inv) return null;
  const words = [];
  for (const [w, pos] of Object.entries(inv)) for (const p of pos) words[p] = w;
  return clean(words.join(' '));
}
async function fromZenodo(doi) {
  const id = doi.match(/zenodo\.(\d+)/)?.[1];
  if (!id) return null;
  const d = await json(`https://zenodo.org/api/records/${id}`);
  const desc = d?.metadata?.description;
  if (!desc) return null;
  // Replication READMEs start with the paper's own abstract when there is one.
  const m = desc.match(/abstract\s*<\/[^>]+>\s*(.*?)(<h\d|$)/is);
  return m ? clean(m[1]) : null;
}

const store = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const targets = [];

const bib = await readFile(join(ROOT, 'src/data/papers.bib'), 'utf8');
for (const m of bib.matchAll(/@\w+\{[^,]+,([\s\S]*?)\n\}/g)) {
  const body = m[1];
  if (/\babstract\s*=/.test(body)) continue;
  const title = body.match(/\btitle\s*=\s*\{+([^}]+)/)?.[1];
  const doi = body.match(/\bdoi\s*=\s*\{([^}]+)/)?.[1];
  if (title && doi) targets.push({ title, dois: [doi] });
}

const cv = JSON.parse(await readFile(join(ROOT, 'src/data/cv.json'), 'utf8'));
const resources = await readFile(join(ROOT, 'src/data/resources.ts'), 'utf8');
const zenodoFor = [...resources.matchAll(/href: 'https:\/\/doi\.org\/(10\.5281\/zenodo\.\d+)',\s*paper: '([^']+)'/g)].map((m) => ({ doi: m[1], paper: m[2] }));
for (const it of cv.sections.working_papers?.items ?? []) {
  const e = it.en;
  const dois = e.links.map((l) => l.match(/(10\.\d{4,9}\/[^\s?#]+)/)?.[1]).filter(Boolean);
  for (const z of zenodoFor) if (e.title.startsWith(z.paper)) dois.push(z.doi);
  targets.push({ title: e.title, dois });
}

let added = 0;
const missing = [];
for (const t of targets) {
  const key = titleSlug(t.title);
  if (store[key] && !REFRESH) continue;
  let found = null;
  for (const doi of t.dois) {
    for (const [name, fn] of [['crossref', fromCrossref], ['openalex', fromOpenAlex], ['zenodo', fromZenodo]]) {
      try { const a = await fn(doi); if (a && a.length > 120) { found = { abstract: a, source: name, doi }; break; } } catch {}
    }
    if (found) break;
  }
  if (found) { store[key] = { title: t.title, ...found }; added++; }
  else missing.push(`${t.title}${t.dois.length ? '' : ' (no DOI)'}`);
}

const sorted = Object.fromEntries(Object.entries(store).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(OUT, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`fetch-abstracts: ${added} new · ${Object.keys(store).length} stored · ${missing.length} without abstract`);
for (const m of missing) console.log(`  ? ${m}`);
