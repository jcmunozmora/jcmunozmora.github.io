#!/usr/bin/env node
// Site health check for /sanson-web: is every source synced, is the repo clean, is the live
// site up? Read-only. Exit 0 = all good, 1 = findings.
//
//   npm run doctor
import { readFile, readdir, stat } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
import matter from 'gray-matter';

const ROOT = new URL('..', import.meta.url).pathname;
const H = homedir();
const CV_DIR = process.env.CV_DIR ?? join(H, 'Library/CloudStorage/Dropbox/Apps/Overleaf/CV - JC');
const LI_DIR = join(process.env.JC_LINKEDIN_DIR ?? join(H, 'github_repositories/jc-linkedin'), 'drafts/linkedin');
const SLIDES = join(process.env.SLIDES_DIR ?? join(H, 'github_repositories/slides'), 'slides.yml');
const NOTION_MAX_DAYS = 30;

const findings = [];
const ok = [];
const check = (good, okMsg, badMsg) => (good ? ok.push(okMsg) : findings.push(badMsg));
const mtime = async (p) => (await stat(p).catch(() => null))?.mtime ?? null;
const day = (d) => d?.toISOString().slice(0, 10) ?? '—';
const sh = (cmd) => { try { return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; } };

// 1. CV
const cvJson = JSON.parse(await readFile(join(ROOT, 'src/data/cv.json'), 'utf8').catch(() => '{}'));
const texTime = await mtime(join(CV_DIR, 'CV-MunozMora-EN.tex'));
if (!texTime) findings.push(`CV: not found at ${CV_DIR}`);
else check(day(texTime) <= (cvJson.source?.updated?.en ?? ''), `CV: synced (${day(texTime)})`, `CV: edited ${day(texTime)}, site has ${cvJson.source?.updated?.en ?? 'nothing'} → npm run sync:cv`);

// 2. LinkedIn activity
const liFiles = (await readdir(LI_DIR).catch(() => [])).filter((f) => f.endsWith('.md'));
let published = 0;
for (const f of liFiles) {
  const { data } = matter(await readFile(join(LI_DIR, f), 'utf8'));
  if (data.estado === 'publicado' && data.publicado) published++;
}
const synced = (await readdir(join(ROOT, 'src/content/activity/linkedin')).catch(() => [])).filter((f) => f.endsWith('.md')).length;
check(published === synced, `Activity: ${synced} posts synced`, `Activity: ${published} published in jc-linkedin, ${synced} on the site → npm run sync:activity`);

// 3. Talks
const slidesTime = await mtime(SLIDES);
const talksTime = await mtime(join(ROOT, 'src/data/talks.json'));
check(slidesTime && talksTime && slidesTime <= talksTime, `Talks: synced (${day(talksTime)})`, `Talks: slides.yml changed ${day(slidesTime)}, site synced ${day(talksTime)} → npm run sync:talks`);

// 4. Notion
const notionTime = await mtime(join(ROOT, 'src/data/notion.json'));
const age = notionTime ? Math.floor((Date.now() - notionTime) / 864e5) : Infinity;
check(age <= NOTION_MAX_DAYS, `Notion: synced ${age} days ago`, `Notion: last sync ${notionTime ? `${age} days ago` : 'never'} → npm run sync:notion`);

// 5. Repo
const branch = sh('git rev-parse --abbrev-ref HEAD');
const dirty = sh('git status --porcelain');
const ahead = sh('git rev-list --count @{u}..HEAD');
check(!dirty, `Git: clean on ${branch}`, `Git: uncommitted changes on ${branch}`);
if (ahead === null) findings.push(`Git: branch ${branch} has no upstream (not published)`);
else check(ahead === '0', 'Git: nothing waiting to be pushed', `Git: ${ahead} commit(s) not pushed — publishing needs explicit approval`);

// 6. Live site
async function head(url) {
  try {
    const r = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
    return `${r.status}${r.headers.get('location') ? ` → ${r.headers.get('location')}` : ''}`;
  } catch (e) { return `ERR ${e.cause?.code ?? e.name}`; }
}
const live = await head('https://jcmunozmora.co/');
const gh = await head('https://jcmunozmora.github.io/');
const slidesLive = await head('https://jcmunozmora.co/slides/');
check(live.startsWith('200'), `Live: jcmunozmora.co ${live}`, `Live: jcmunozmora.co ${live}`);
check(/^301 → https?:\/\/jcmunozmora\.co\/?$/.test(gh), `Live: github.io ${gh}`, `Live: github.io ${gh} (QR codes point here)`);
check(slidesLive.startsWith('200'), `Live: /slides/ ${slidesLive}`, `Live: /slides/ ${slidesLive}`);

for (const m of ok) console.log(`  ✓ ${m}`);
for (const m of findings) console.log(`  ✗ ${m}`);
console.log(`doctor: ${ok.length} ok · ${findings.length} findings`);
process.exit(findings.length ? 1 : 0);
