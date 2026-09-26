import cv from '../data/cv.json';
import notion from '../data/notion.json';
import { ssrnByTitle, ssrnExtra, ssrnUrl } from '../data/ssrn';
import type { Lang } from '../i18n/ui';

type Pair<T> = { en: T; es: T };
type Ref = { type: 'ref'; title: string; rest: string; links: string[] };
type Dated = { type: 'dated'; when: string; text: string; links: string[] };
type Inline = { type: 'inline'; values: string[] };
type Text = { type: 'text'; text: string; links: string[] };
type Item = Ref | Dated | Inline | Text;

export type SectionKey = keyof typeof cv.sections;

const sections = cv.sections as unknown as Record<SectionKey, { title: Pair<string>; items: Pair<Item>[] }>;

export const cvUpdated = cv.source.updated.en;
export const cvTagline = (lang: Lang) => cv.tagline[lang];
export const sectionTitle = (key: SectionKey, lang: Lang) => sections[key].title[lang];

export function dated(key: SectionKey, lang: Lang) {
  return sections[key].items.map((i) => i[lang]).filter((i): i is Dated => i.type === 'dated');
}
export function refs(key: SectionKey, lang: Lang) {
  return sections[key].items.map((i) => i[lang]).filter((i): i is Ref => i.type === 'ref');
}
export function inline(key: SectionKey, lang: Lang) {
  const i = sections[key].items.map((x) => x[lang]).find((x): x is Inline => x.type === 'inline');
  return i?.values ?? [];
}
export function text(key: SectionKey, lang: Lang) {
  const i = sections[key].items.map((x) => x[lang]).find((x): x is Text => x.type === 'text');
  return i?.text ?? '';
}

const words = (t: string) =>
  new Set(t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 3));

export function similar(a: string, b: string) {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return false;
  let common = 0;
  for (const w of A) if (B.has(w)) common++;
  return common / Math.min(A.size, B.size) >= 0.6;
}

export type WorkingPaper = {
  title: string;
  detail: string;
  status: 'ssrn' | 'submitted' | 'working-paper' | 'in-progress';
  ssrn?: string;
  href?: string;
};

const ssrnId = (links: string[]) => links.map((l) => l.match(/10\.2139\/ssrn\.(\d+)/)?.[1]).find(Boolean);

export function workingPapers(lang: Lang, published: string[] = []): WorkingPaper[] {
  const fromCv = refs('working_papers', lang).map((r, n) => {
    const en = refs('working_papers', 'en')[n];
    const id = ssrnId(en.links) ?? Object.entries(ssrnByTitle).find(([t]) => en.title.startsWith(t))?.[1];
    const raw = en.rest.toLowerCase();
    const status: WorkingPaper['status'] = id
      ? 'ssrn'
      : /submitted|under review/.test(raw)
        ? 'submitted'
        : en.links.length
          ? 'working-paper'
          : 'in-progress';
    return {
      title: r.title,
      detail: r.rest,
      status,
      ssrn: id,
      href: id ? ssrnUrl(id) : en.links[0],
    };
  });
  const extra = ssrnExtra
    .filter((x) => !fromCv.some((p) => similar(p.title, x.title)))
    .map((x) => ({
      title: x.title,
      detail: `${lang === 'es' ? 'con' : 'with'} ${x.coauthors.join(lang === 'es' ? ' y ' : ' and ')}. SSRN (${x.year}).`,
      status: 'ssrn' as const,
      ssrn: x.id,
      href: ssrnUrl(x.id),
    }));
  return [...fromCv, ...extra].filter((p) => !published.some((t) => similar(t, p.title)));
}

// Notion rows marked "Homepage" that the CV does not already list.
export function notionPapersInProgress(pubTitles: string[]) {
  const known = [...refs('working_papers', 'en').map((r) => r.title), ...pubTitles, ...ssrnExtra.map((x) => x.title)];
  return notion.papers.filter(
    (p) => p.status !== 'published' && !known.some((t) => similar(t, p.title)),
  );
}

export function notionCurrentProjects() {
  return notion.projects.filter((p) => p.status === 'in_progress');
}
