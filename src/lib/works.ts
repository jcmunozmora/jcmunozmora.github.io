import type { ImageMetadata } from 'astro';
import { works as curated, type Work } from '../data/works';
import { classify, topicBySlug } from '../data/topics';
import type { Lang } from '../i18n/ui';
import { refs, similar, type SectionKey } from './cv';
import { titleSlug } from './slug';

const coverFiles = import.meta.glob<ImageMetadata>('../assets/covers/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});
const covers = Object.fromEntries(
  Object.entries(coverFiles).map(([path, img]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), img]),
);
export const autoCover = (title: string) => covers[titleSlug(title)];

export type SiteWork = Work & { detail?: string; auto?: boolean };

const SECTIONS: { key: SectionKey; kind: Work['kind'] }[] = [
  { key: 'books', kind: 'book' },
  { key: 'chapters', kind: 'chapter' },
  { key: 'other_pubs', kind: 'chapter' },
  { key: 'reports', kind: 'policy' },
];

const yearOf = (s: string) => {
  const m = s.match(/\((?:[^()]*?)((?:19|20)\d{2})\)/) ?? s.match(/((?:19|20)\d{2})/);
  return m ? Number(m[1]) : undefined;
};

// The CV decides which books, chapters and reports exist; curated cards in src/data/works.ts
// add covers and summaries. Entries that are also journal articles (in papers.bib) are skipped.
export function siteWorks(lang: Lang, articleTitles: string[] = []): SiteWork[] {
  const used = new Set<string>();
  const out: SiteWork[] = [];
  for (const { key, kind } of SECTIONS) {
    const en = refs(key, 'en');
    const loc = refs(key, lang);
    en.forEach((e, i) => {
      const c = curated.find((w) => w.cv && e.title.startsWith(w.cv) && w.kind === kind && !used.has(w.id));
      if (c) {
        used.add(c.id);
        out.push({ ...c, link: c.link ?? e.links[0], cover: c.cover ?? autoCover(e.title) });
        return;
      }
      if (articleTitles.some((t) => similar(t, e.title))) return;
      const t = loc[i] ?? e;
      const topic = classify(e.title)[0];
      out.push({
        id: titleSlug(e.title),
        kind,
        title: t.title,
        venue: '',
        detail: t.rest,
        year: yearOf(e.rest),
        link: e.links[0],
        cover: autoCover(e.title),
        pillar: topic && topicBySlug[topic]?.pillar === 'method' ? 'method' : 'territory',
        auto: true,
      });
    });
  }
  for (const w of curated) if (!w.cv) out.push(w);
  return out;
}
