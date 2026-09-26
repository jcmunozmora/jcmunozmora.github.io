#!/usr/bin/env node
// Reads the rows marked `Homepage` in the Notion "Projects" database and writes
// src/data/notion.json with the public fields only. Runs locally: the Notion token
// never reaches CI or the repo.
//
//   npm run sync:notion
// Token: $NOTION_API_KEY, falling back to ~/.claude/scripts/.env.quijote (integration Claude_JC).
import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const PROJECTS_DB = 'b60a980b-3f40-424f-abc9-bdcc5d2b8942';
const OUT = new URL('../src/data/notion.json', import.meta.url).pathname;

// Only these properties are ever read (Summary is AI-generated and mixes in internal notes, so it
// stays out too). Notes, next actions, local paths, team, stakeholders,
// journals (confidential while under review) and page bodies are private by design.
const PUBLIC_STATUS = {
  Published: 'published',
  Done: 'completed',
  Closing: 'completed',
  Submitted: 'under_review',
  'Ready to submit': 'in_progress',
  'In Progress': 'in_progress',
  Planning: 'in_progress',
  Preparing: 'in_progress',
  Waiting: 'in_progress',
  Paused: 'paused',
};
const PRIVATE_TYPES = /^P&D/;

async function token() {
  if (process.env.NOTION_API_KEY) return process.env.NOTION_API_KEY.trim();
  const env = await readFile(join(homedir(), '.claude/scripts/.env.quijote'), 'utf8').catch(() => '');
  const m = env.match(/^NOTION_API_KEY=(.+)$/m);
  if (!m) { console.error('sync-notion: no NOTION_API_KEY'); process.exit(4); }
  return m[1].trim().replace(/^["']|["']$/g, '');
}

const KEY = await token();

async function query(db, body) {
  const rows = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${db}/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, start_cursor: cursor, page_size: 100 }),
    });
    if (!res.ok) { console.error(`sync-notion: Notion API ${res.status} on ${db}`); process.exit(5); }
    const data = await res.json();
    rows.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return rows;
}

const text = (p) => (p?.title ?? p?.rich_text ?? []).map((t) => t.plain_text).join('').trim() || null;
const date = (p) => (p?.date ? { start: p.date.start?.slice(0, 10) ?? null, end: p.date.end?.slice(0, 10) ?? null } : null);

const rows = await query(PROJECTS_DB, { filter: { property: 'Homepage', checkbox: { equals: true } } });

const items = [];
const skipped = [];
for (const r of rows) {
  const p = r.properties;
  const name = text(p['Project name']);
  const types = (p.Type?.multi_select ?? []).map((t) => t.name);
  const status = p.Status?.status?.name ?? p.Status?.select?.name ?? null;
  if (types.some((t) => PRIVATE_TYPES.test(t))) { skipped.push(`${name} (internal type)`); continue; }
  if (!PUBLIC_STATUS[status]) { skipped.push(`${name} (status ${status})`); continue; }
  const kind = types.includes('Papers') ? 'paper' : types.includes('Project') ? 'project' : null;
  if (!kind) { skipped.push(`${name} (type ${types.join('/') || 'none'})`); continue; }
  items.push({
    id: r.id.replace(/-/g, ''),
    kind,
    name,
    title: text(p.Titulo) ?? name,
    status: PUBLIC_STATUS[status],
    dates: date(p.Dates),
    doi: kind === 'paper' && status === 'Published' ? (p.DOI?.url ?? null) : null,
    keywords: (p.keywords?.multi_select ?? []).map((k) => k.name),
  });
}

const norm = (t) => t.toLowerCase().replace(/[^a-z0-9áéíóúñü]+/g, ' ').trim();
const seen = new Set();
for (let i = items.length - 1; i >= 0; i--) {
  const k = `${items[i].kind}:${norm(items[i].title)}`;
  if (seen.has(k)) { skipped.push(`${items[i].name} (duplicate title)`); items.splice(i, 1); } else seen.add(k);
}

items.sort((a, b) => (b.dates?.start ?? '').localeCompare(a.dates?.start ?? '') || a.title.localeCompare(b.title));
const out = {
  generated: 'scripts/sync-notion.mjs — do not edit; tick "Homepage" in Notion › Projects and run npm run sync:notion',
  papers: items.filter((i) => i.kind === 'paper'),
  projects: items.filter((i) => i.kind === 'project'),
};
const json = `${JSON.stringify(out, null, 2)}\n`;
const previous = await readFile(OUT, 'utf8').catch(() => null);
if (previous !== json) await writeFile(OUT, json);
console.log(`sync-notion: ${rows.length} rows with Homepage · ${out.papers.length} papers · ${out.projects.length} projects · ${skipped.length} skipped · ${previous === json ? 'unchanged' : 'written'}`);
for (const s of skipped) console.log(`  skipped: ${s}`);
