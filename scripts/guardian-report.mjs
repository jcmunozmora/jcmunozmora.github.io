#!/usr/bin/env node
// Records the verdict of a guardian run (scripts/auto-update.sh) in reports/guardian.json and
// raises a macOS notification when JC needs to know: a failure, a publish, a blocked or held run,
// doctor findings, or new items waiting to enter the CV. Repeated warnings are sent at most once
// every 20 hours, so a problem left for days does not become noise.
//
//   node scripts/guardian-report.mjs <result> <trigger> <message> [doctorFindings]
//   result: published | ok | held | blocked | failed
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const STATE = join(ROOT, 'reports/guardian.json');
const REPEAT_HOURS = 20;

const [result = 'ok', trigger = 'manual', message = '', doctorArg = '0'] = process.argv.slice(2);
const doctor = Number(doctorArg) || 0;
const prev = JSON.parse(await readFile(STATE, 'utf8').catch(() => '{}'));
const pendingMd = await readFile(join(ROOT, 'reports/pending.md'), 'utf8').catch(() => '');
const pending = pendingMd.split('\n').filter((l) => l.startsWith('- ')).length;
const now = new Date();

const alerts = [];
if (result === 'failed') alerts.push({ msg: `Falló la ronda: ${message}. Ver ~/Library/Logs/jcmunozmora-site-sync.log`, always: true });
if (result === 'published') alerts.push({ msg: `Publicado: ${message}`, always: true });
if (result === 'held' || result === 'blocked') alerts.push({ msg: message });
if (doctor > 0) alerts.push({ msg: `doctor: ${doctor} hallazgo(s) → /sanson-web` });
if (pending > (prev.pending ?? 0)) alerts.push({ msg: `${pending} obra(s) fuera del CV (antes ${prev.pending ?? 0}) → /sanson-propagar`, always: true });

// notified: message → when it was last sent; only the current alerts are kept.
const last = prev.notified ?? {};
const fresh = (msg) => !last[msg] || now - new Date(last[msg]) > REPEAT_HOURS * 36e5;
const toSend = alerts.filter((a) => a.always || fresh(a.msg)).map((a) => a.msg);
const notified = Object.fromEntries(alerts.map((a) => [a.msg, toSend.includes(a.msg) ? now.toISOString() : last[a.msg]]));

if (toSend.length) {
  const text = toSend.join(' · ').replace(/["\\]/g, "'");
  try {
    execFileSync('osascript', ['-e', `display notification "${text}" with title "jcmunozmora.co" subtitle "Guardián del sitio"`]);
  } catch { /* no GUI session: the log and the state file still carry it */ }
}

const state = {
  run: now.toISOString(),
  trigger,
  result,
  message,
  doctor,
  pending,
  notified,
  lastPublish: result === 'published' ? now.toISOString() : prev.lastPublish ?? null,
};
await mkdir(join(ROOT, 'reports'), { recursive: true });
await writeFile(STATE, `${JSON.stringify(state, null, 2)}\n`);
console.log(`guardian: ${result} (${trigger})${message ? ` — ${message}` : ''} · doctor ${doctor} · pending ${pending}${toSend.length ? ' · notified' : ''}`);
