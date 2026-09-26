#!/usr/bin/env node
// Reads the slides hub manifest (github.com/jcmunozmora/slides, slides.yml) and writes
// src/data/talks.json. Decks stay in the hub, served at /slides/; the site only links to them.
//
//   npm run sync:talks
//   SLIDES_DIR=/path npm run sync:talks
import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { load } from 'js-yaml';

const DIR = process.env.SLIDES_DIR ?? join(homedir(), 'github_repositories/slides');
const OUT = new URL('../src/data/talks.json', import.meta.url).pathname;
// Proposals and uncategorised files live in the hub but are not talks.
const SKIP_KINDS = new Set(['propuesta', 'otro']);

const { presentations = [] } = load(await readFile(join(DIR, 'slides.yml'), 'utf8'));
const talks = presentations
  .filter((p) => !p.hidden && !SKIP_KINDS.has(p.kind) && p.title && p.date && (p.html || p.pdf))
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    date: String(p.date),
    kind: p.kind,
    event: p.event ?? null,
    lang: p.lang ?? null,
    href: `/slides/${p.html ?? p.pdf}`,
    format: p.html ? 'html' : 'pdf',
    note: p.note ?? null,
    tags: p.tags ?? [],
    featured: Boolean(p.featured),
  }))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

const json = `${JSON.stringify({ generated: 'scripts/sync-talks.mjs — do not edit; edit slides.yml in the slides repo', talks }, null, 2)}\n`;
const previous = await readFile(OUT, 'utf8').catch(() => null);
if (previous !== json) await writeFile(OUT, json);
console.log(`sync-talks: ${talks.length} talks of ${presentations.length} hub entries · ${previous === json ? 'unchanged' : 'written'}`);
