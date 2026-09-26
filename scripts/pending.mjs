#!/usr/bin/env node
// Detects work that exists somewhere but is not yet in the CV, the source every other surface
// (site, bios, profiles) is built from. Read-only. Writes reports/pending.md and prints a summary.
//
//   npm run pending
// Sources: OpenAlex (works linked to the ORCID), Crossref (SSRN DOIs by author name),
// src/data/notion.json (Notion rows ticked "Homepage").
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const ORCID = '0000-0002-7304-8115';
const MAILTO = 'jmunozm1@eafit.edu.co';

const norm = (t) => (t ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
const words = (t) => new Set(norm(t).split(' ').filter((w) => w.length > 3));
function similar(a, b) {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return false;
  let c = 0;
  for (const w of A) if (B.has(w)) c++;
  return c / Math.min(A.size, B.size) >= 0.6;
}

const cv = JSON.parse(await readFile(join(ROOT, 'src/data/cv.json'), 'utf8'));
const bib = await readFile(join(ROOT, 'src/data/papers.bib'), 'utf8');
const notion = JSON.parse(await readFile(join(ROOT, 'src/data/notion.json'), 'utf8').catch(() => '{"papers":[],"projects":[]}'));

const known = [];
for (const s of Object.values(cv.sections)) {
  for (const it of s.items) for (const lang of ['en', 'es']) {
    const x = it[lang];
    if (x.title) known.push(x.title);
    if (x.text) known.push(x.text);
  }
}
for (const m of bib.matchAll(/^\s*title\s*=\s*\{+([^}]+)/gim)) known.push(m[1]);
const cvDois = new Set(JSON.stringify(cv).toLowerCase().match(/10\.\d{4,9}\/[^\s"<>)}\]]+/g) ?? []);
const inCv = (title, doi) => (doi && cvDois.has(doi.toLowerCase())) || known.some((k) => similar(k, title));

async function json(url) {
  const r = await fetch(url, { headers: { 'User-Agent': `jcmunozmora-site (mailto:${MAILTO})` }, signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

const sections = [];

// 1. OpenAlex: works attributed to the ORCID. OpenAlex's author clustering has merged other
// people into this ORCID (crystallography, medicine…), so keep only authorships whose raw name
// is really "Muñoz(-Mora), J.(C.)" and drop database records such as CCDC structures.
// Affiliations and venues that identify JC; homonyms (a Chilean transport engineer, chemists…)
// share the name, so the name alone is not enough.
const MY_INST = /eafit|libre de bruxelles|ecares|pompeu fabra|development studies|sussex|universidad de los andes/i;
const UDEA = /universidad de antioquia/i;
const MY_VENUE = /ssrn|repec|zenodo|research papers in economics/i;
const ECON = /econom|social sciences|agricultur|environmental|development|decision sciences/i;
const isMine = (w) => {
  if (/jcmunozmora\//.test(w.title ?? '')) return true;
  const me = (w.authorships ?? []).filter((a) => a.author?.orcid?.endsWith(ORCID));
  const field = w.primary_topic?.field?.display_name ?? '';
  if (me.some((a) => (a.institutions ?? []).some((i) => MY_INST.test(i.display_name ?? '') || (UDEA.test(i.display_name ?? '') && ECON.test(field))))) return true;
  const venue = w.primary_location?.source?.display_name ?? '';
  return MY_VENUE.test(venue) && ECON.test(w.primary_topic?.field?.display_name ?? '');
};
try {
  const d = await json(`https://api.openalex.org/works?filter=author.orcid:${ORCID}&per-page=200&select=title,publication_year,doi,type,primary_location,authorships,primary_topic&mailto=${MAILTO}`);
  const mine = d.results.filter(isMine);
  const foreign = d.results.length - mine.length;
  const rows = mine
    .filter((w) => w.title && !inCv(w.title, w.doi?.replace('https://doi.org/', '')))
    .map((w) => `- ${w.publication_year} · ${w.title} · ${w.primary_location?.source?.display_name ?? w.type}${w.doi ? ` · ${w.doi}` : ''}`);
  sections.push(['OpenAlex (ORCID) — not in the CV', rows]);
  sections.push([`OpenAlex profile hygiene — ${foreign} works under the ORCID look like someone else's`, foreign ? ['- ask OpenAlex to split the profile: https://openalex.org/ (author page → "Report an issue")'] : []]);
} catch (e) { sections.push(['OpenAlex (ORCID)', [`- could not query: ${e.message}`]]); }

// 2. Crossref: SSRN records (DOI prefix 10.2139) with this author name.
try {
  const d = await json(`https://api.crossref.org/works?query.author=Mu%C3%B1oz-Mora&filter=prefix:10.2139&rows=100&select=DOI,title,author,issued&mailto=${MAILTO}`);
  const mine = d.message.items.filter((w) => (w.author ?? []).some((a) => /mu(ñ|&ntilde;|n)oz/i.test(a.family ?? '') && /mora/i.test(a.family ?? '') && /^(juan|j)/i.test((a.given ?? '').trim())));
  const seen = new Set();
  const rows = mine
    .filter((w) => w.title?.[0] && !inCv(w.title[0], w.DOI))
    .filter((w) => { const k = norm(w.title[0]); if (seen.has(k)) return false; seen.add(k); return true; })
    .map((w) => `- ${w.issued?.['date-parts']?.[0]?.[0] ?? ''} · ${w.title[0]} · https://doi.org/${w.DOI}`);
  sections.push(['SSRN (Crossref) — not in the CV', rows]);
} catch (e) { sections.push(['SSRN (Crossref)', [`- could not query: ${e.message}`]]); }

// 3. Notion rows ticked "Homepage".
const pubs = notion.papers.filter((p) => p.status === 'published' && !inCv(p.title));
sections.push(['Notion — papers marked Published but not in the CV', pubs.map((p) => `- ${p.title}`)]);
const projects = notion.projects.filter((p) => !inCv(p.title) && !inCv(p.name));
sections.push(['Notion — Homepage projects not in the CV grants list', projects.map((p) => `- ${p.title} (${p.status}${p.dates?.start ? `, ${p.dates.start}` : ''})`)]);

const total = sections.filter(([t]) => !t.startsWith('OpenAlex profile hygiene')).reduce((n, [, r]) => n + r.filter((x) => !x.includes('could not query')).length, 0);
const md = [`# Pending updates — ${new Date().toISOString().slice(0, 10)}`, '', 'Items found in a source but not in the CV. Add them to the CV in Overleaf (EN and ES), then run `npm run sync`.', ''];
for (const [title, rows] of sections) md.push(`## ${title}`, '', ...(rows.length ? rows : ['- none']), '');
await mkdir(join(ROOT, 'reports'), { recursive: true });
await writeFile(join(ROOT, 'reports/pending.md'), md.join('\n'));
console.log(`pending: ${total} item(s) not in the CV → reports/pending.md`);
for (const [title, rows] of sections) if (rows.length) console.log(`  ${title}: ${rows.length}`);
