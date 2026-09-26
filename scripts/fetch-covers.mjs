#!/usr/bin/env node
// Finds a cover for every book, chapter and report in the CV that has none yet, and saves it as
// src/assets/covers/<slug>.jpg (the site picks it up by name). Tries, per CV link: the page's
// og:image / twitter:image, then the first page of its PDF (citation_pdf_url, Figshare or a direct
// PDF link), rendered with Ghostscript. Sites that block scripts are listed at the end so the
// cover can be fetched by hand with a browser. Never overwrites an existing cover.
//
//   npm run covers
import { readFile, writeFile, readdir, mkdir, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'src/assets/covers');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
const SECTIONS = ['books', 'chapters', 'other_pubs', 'reports'];

// Same rule as src/lib/slug.ts.
function titleSlug(title) {
  const s = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (s.length <= 64) return s;
  const cut = s.slice(0, 64);
  return cut.slice(0, cut.lastIndexOf('-'));
}

const cv = JSON.parse(await readFile(join(ROOT, 'src/data/cv.json'), 'utf8'));
const worksSrc = await readFile(join(ROOT, 'src/data/works.ts'), 'utf8');
// Curated cards that already carry a cover, keyed by their `cv:` title prefix.
const curatedWithCover = [...worksSrc.matchAll(/\{\s*id: '[^']+',\s*cv: '([^']+)'[\s\S]*?\n  \},/g)]
  .filter((m) => /\n\s+cover: /.test(m[0]))
  .map((m) => m[1]);

// Journal articles live in papers.bib and are shown without covers; skip them here too.
const bib = await readFile(join(ROOT, 'src/data/papers.bib'), 'utf8');
const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const articleTitles = [...bib.matchAll(/^\s*title\s*=\s*\{+([^}]+)/gim)].map((m) => norm(m[1]).slice(0, 40));
const isArticle = (title) => articleTitles.some((t) => t && norm(title).startsWith(t));

await mkdir(OUT, { recursive: true });
const existing = new Set((await readdir(OUT)).map((f) => f.replace(/\.\w+$/, '')));

async function get(url, asBuffer = false) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: '*/*' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
  const type = res.headers.get('content-type') ?? '';
  const body = asBuffer || /pdf|image/.test(type) ? Buffer.from(await res.arrayBuffer()) : await res.text();
  return { ok: res.ok, status: res.status, type, body, url: res.url };
}

const isPdf = (buf) => Buffer.isBuffer(buf) && buf.subarray(0, 5).toString() === '%PDF-';
const isImage = (buf) => Buffer.isBuffer(buf) && (buf[0] === 0xff || buf.subarray(1, 4).toString() === 'PNG');

function renderPdf(buf, target) {
  const tmp = join(tmpdir(), `cover-${process.pid}.pdf`);
  return writeFile(tmp, buf).then(() => {
    execFileSync('gs', ['-q', '-dNOPAUSE', '-dBATCH', '-dSAFER', '-sDEVICE=jpeg', '-dJPEGQ=85', '-r110', '-dFirstPage=1', '-dLastPage=1', `-sOutputFile=${target}`, tmp]);
    return unlink(tmp);
  });
}

async function saveImage(buf, target) {
  await writeFile(target, buf);
  try { execFileSync('sips', ['-s', 'format', 'jpeg', '-Z', '1200', target, '--out', target], { stdio: 'ignore' }); } catch {}
}

async function tryLink(link, target) {
  const fig = link.match(/figshare\.com\/.*?\/(\d{6,})$/) ?? link.match(/opendocs\.ids\.ac\.uk\/articles\/.*\/(\d{6,})$/);
  if (fig) {
    const meta = await get(`https://api.figshare.com/v2/articles/${fig[1]}`);
    const file = JSON.parse(meta.body).files?.find((f) => /\.pdf$/i.test(f.name));
    if (file) { const pdf = await get(file.download_url, true); if (isPdf(pdf.body)) { await renderPdf(pdf.body, target); return 'figshare pdf'; } }
  }
  const page = await get(link);
  if (isPdf(page.body)) { await renderPdf(page.body, target); return 'pdf'; }
  if (typeof page.body !== 'string') return null;
  const meta = (name) => page.body.match(new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]*content=["']([^"']+)`, 'i'))?.[1]
    ?? page.body.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${name}["']`, 'i'))?.[1];
  const img = meta('og:image') ?? meta('twitter:image');
  if (img && !/logo|favicon|default/i.test(img)) {
    const r = await get(new URL(img, page.url).href, true);
    if (isImage(r.body)) { await saveImage(r.body, target); return 'og:image'; }
  }
  const pdfUrl = meta('citation_pdf_url');
  if (pdfUrl) {
    const r = await get(new URL(pdfUrl, page.url).href, true);
    if (isPdf(r.body)) { await renderPdf(r.body, target); return 'citation_pdf_url'; }
  }
  return page.ok ? null : `blocked (${page.status})`;
}

const found = [];
const missing = [];
for (const key of SECTIONS) {
  for (const item of cv.sections[key]?.items ?? []) {
    const e = item.en;
    if (curatedWithCover.some((p) => e.title.startsWith(p)) || isArticle(e.title)) continue;
    const slug = titleSlug(e.title);
    if (existing.has(slug)) continue;
    const target = join(OUT, `${slug}.jpg`);
    let how = null;
    const notes = [];
    for (const link of e.links) {
      try { how = await tryLink(link, target); } catch (err) { notes.push(`${link}: ${err.name}`); }
      if (how && !how.startsWith('blocked')) break;
      if (how) notes.push(`${link}: ${how}`);
      how = null;
    }
    if (how) found.push(`${e.title} ← ${how}`);
    else missing.push(`${e.title}${e.links.length ? ` (${notes.join('; ') || 'no cover on the page'})` : ' (no link in the CV)'}`);
  }
}

console.log(`fetch-covers: ${found.length} new · ${missing.length} still without cover`);
for (const f of found) console.log(`  + ${f}`);
for (const m of missing) console.log(`  ? ${m}`);
