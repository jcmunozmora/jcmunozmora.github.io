import { getCollection } from 'astro:content';
import { siteWorks } from './works';
import { featured } from '../data/projects';
import { courseSites, courses } from '../data/teaching';
import talksData from '../data/talks.json';
import { lectures, materials } from '../data/resources';
import { classify, topics } from '../data/topics';
import { routes, type Lang } from '../i18n/ui';
import { activityHref, plainText } from './activity';
import { dated, notionCurrentProjects, workingPapers } from './cv';

export type Kind = 'article' | 'working' | 'book' | 'chapter' | 'report' | 'project' | 'course' | 'talk' | 'resource' | 'post';

export type CatalogItem = {
  id: string;
  kind: Kind;
  title: string;
  meta?: string;
  year?: number;
  href: string;
  external: boolean;
  topics: string[];
};

// Exceptions to the keyword rules: id → topics to add.
const overrides: Record<string, string[]> = {
  'project:catastro': ['fiscal', 'land'],
};

const yearOf = (s?: string | null) => {
  const m = s?.match(/(19|20)\d{2}/g);
  return m ? Number(m[m.length - 1]) : undefined;
};

function item(x: Omit<CatalogItem, 'topics' | 'external'> & { text: string; body?: string }): CatalogItem {
  const found = new Set([...classify(x.text, x.body), ...(overrides[x.id] ?? [])]);
  return {
    id: x.id,
    kind: x.kind,
    title: x.title,
    meta: x.meta,
    year: x.year,
    href: x.href,
    external: /^https?:/.test(x.href),
    topics: topics.map((t) => t.slug).filter((s) => found.has(s)),
  };
}

export async function catalog(lang: Lang): Promise<CatalogItem[]> {
  const out: CatalogItem[] = [];
  const pubs = await getCollection('publications');
  for (const p of pubs) {
    const d = p.data;
    out.push(item({
      id: `pub:${p.id}`, kind: 'article', title: d.title, meta: d.venue, year: d.year,
      href: d.href ?? `${routes.research[lang]}#articles`,
      text: [d.title, d.venue, d.keywords.join(' ')].join(' '),
      body: d.abstract,
    }));
  }
  for (const w of workingPapers(lang, pubs.map((p) => p.data.title))) {
    out.push(item({
      id: `wp:${w.title}`, kind: 'working', title: w.title, meta: w.status === 'ssrn' ? `SSRN ${w.ssrn}` : undefined,
      year: yearOf(w.detail), href: w.href ?? `${routes.research[lang]}#working`, text: w.title,
    }));
  }
  for (const w of siteWorks(lang, pubs.map((p) => p.data.title))) {
    out.push(item({
      id: `work:${w.id}`, kind: w.kind === 'policy' ? 'report' : w.kind, title: w.title, meta: w.venue, year: w.year,
      href: w.pdf ?? w.link ?? `${routes.research[lang]}#${w.kind === 'policy' ? 'policy' : 'books'}`,
      text: [w.title, w.venue].join(' '),
      body: [w.summary?.en, w.summary?.es, w.detail].join(' '),
    }));
  }
  out.push(item({
    id: 'project:catastro', kind: 'project', title: featured.title[lang], meta: featured.partner[lang],
    href: routes.projects[lang], text: featured.title.en, body: featured.summary.en,
  }));
  dated('grants', lang).forEach((g, i) => {
    const en = dated('grants', 'en')[i];
    const title = plainText(g.text.replace(/<[^>]+>/g, ''));
    out.push(item({
      id: `grant:${i}`, kind: 'project', title, year: yearOf(g.when), href: `${routes.projects[lang]}#grants`,
      text: `${plainText(en.text.replace(/<[^>]+>/g, ''))} ${title}`,
    }));
  });
  for (const p of notionCurrentProjects()) {
    out.push(item({
      id: `notion:${p.id}`, kind: 'project', title: p.title, year: yearOf(p.dates?.start ?? undefined),
      href: routes.projects[lang], text: [p.title, p.name, p.keywords.join(' ')].join(' '),
    }));
  }
  for (const c of courseSites) {
    out.push(item({
      id: `course:${c.id}`, kind: 'course', title: c.title[lang], meta: c.program[lang], year: yearOf(c.term),
      href: c.href, text: [c.title.en, c.title.es, c.summary.en, c.summary.es].join(' '),
    }));
  }
  for (const c of courses) {
    out.push(item({
      id: `course:${c.id}`, kind: 'course', title: c.title[lang], meta: c.where[lang],
      href: c.link ?? routes.teaching[lang], text: [c.title.en, c.title.es].join(' '), body: c.summary.en,
    }));
  }
  for (const t of talksData.talks) {
    out.push(item({
      id: `talk:${t.slug}`, kind: 'talk', title: t.title, meta: t.event ?? undefined, year: yearOf(t.date),
      href: t.href, text: [t.title, t.event, t.note, t.tags.join(' ')].join(' '),
    }));
  }
  for (const l of lectures) {
    out.push(item({
      id: `lecture:${l.id}`, kind: 'talk', title: l.title[lang], meta: l.where[lang], year: l.year,
      href: l.link ?? routes.talks[lang], text: [l.title.en, l.title.es].join(' '), body: l.summary.en,
    }));
  }
  for (const m of materials) {
    out.push(item({
      id: `material:${m.id}`, kind: 'resource', title: m.title[lang], href: m.href,
      text: [m.title.en, m.title.es].join(' '), body: m.summary.en,
    }));
  }
  for (const p of await getCollection('activity')) {
    out.push(item({
      id: `post:${p.id}`, kind: 'post', title: p.data.title, year: p.data.date.getUTCFullYear(),
      href: activityHref(lang, p.id), text: p.data.title, body: plainText(p.body ?? ''),
    }));
  }
  return out.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));
}
