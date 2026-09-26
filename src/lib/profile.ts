import cv from '../data/cv.json';
import { dated } from './cv';

// How each CV project is classified: the kind of work (a project can be more than one) and the kind
// of organization it was done for. Matched against the English CV line; a project that matches no
// rule is reported by `unclassified()` so a new CV entry never goes missing silently.
export type Mode = 'research' | 'evaluation' | 'policy' | 'advisory';
export type Partner = 'public' | 'funds' | 'private' | 'academia';
export const MODES: Mode[] = ['research', 'evaluation', 'policy', 'advisory'];
export const PARTNERS: Partner[] = ['public', 'funds', 'private', 'academia'];

const RULES: { match: RegExp; modes: Mode[]; partner: Partner }[] = [
  { match: /Herencia Colombia|Green Climate Fund/i, modes: ['evaluation'], partner: 'funds' },
  { match: /u'GOOD/i, modes: ['research'], partner: 'academia' },
  { match: /care-work training/i, modes: ['evaluation', 'policy'], partner: 'public' },
  { match: /Hub Conexión Juvenil/i, modes: ['advisory'], partner: 'private' },
  { match: /rural property tax/i, modes: ['policy'], partner: 'public' },
  { match: /SIMONAA|Agri-Food Supply System/i, modes: ['policy'], partner: 'public' },
  { match: /S²Cities/i, modes: ['evaluation'], partner: 'funds' },
  { match: /Grupo Argos/i, modes: ['advisory', 'evaluation'], partner: 'private' },
  { match: /Croppie|Digital\) Village/i, modes: ['research', 'evaluation'], partner: 'academia' },
  { match: /Territorial Inequalities/i, modes: ['research', 'policy'], partner: 'public' },
  { match: /agricultural development policy|Paraguay|agricultural strategies/i, modes: ['policy'], partner: 'public' },
  { match: /Building Healthy Homes/i, modes: ['research', 'evaluation'], partner: 'public' },
  { match: /Hogares Saludables/i, modes: ['evaluation', 'advisory'], partner: 'private' },
  { match: /potato/i, modes: ['policy', 'advisory'], partner: 'private' },
  { match: /Fondo Colombia Sostenible|Land for Prosperity/i, modes: ['evaluation'], partner: 'funds' },
  { match: /Pulso Social/i, modes: ['policy'], partner: 'public' },
  { match: /Göttingen|Climate-Smart/i, modes: ['research'], partner: 'academia' },
  { match: /Venezuelan Migrants/i, modes: ['research', 'policy'], partner: 'public' },
];

export type Classified = { modes: Mode[]; partner: Partner } | null;

/** Classification of every project, in CV order (same order as `dated('grants', lang)`). */
export function classify(): Classified[] {
  return dated('grants', 'en').map((g) => {
    const r = RULES.find((x) => x.match.test(g.text));
    return r ? { modes: r.modes, partner: r.partner } : null;
  });
}

export function unclassified() {
  const c = classify();
  return dated('grants', 'en').filter((_, i) => !c[i]).map((g) => g.text.replace(/<[^>]+>/g, ''));
}

const funders = () => {
  const names = new Set<string>();
  for (const g of dated('grants', 'en')) {
    const f = g.text.match(/^<strong>(.*?)<\/strong>/)?.[1];
    if (!f) continue;
    for (const n of f.replace(/&amp;/g, '&').split(/\s*[/&]\s*|\s+\(/)) {
      const clean = n.replace(/\)$/, '').trim();
      if (clean && !/^(BID|U\. Chicago|Germany|South Africa)$/.test(clean)) names.add(clean);
    }
  }
  return names;
};

/** Headline counts, all computed from the CV so they update with it. */
export function counters() {
  const s = cv.sections as Record<string, { items: unknown[] }>;
  const c = classify();
  const count = (m: Mode) => c.filter((x) => x?.modes.includes(m)).length;
  return {
    articles: s.articles_intl.items.length + s.articles_col.items.length,
    working: s.working_papers.items.length,
    projects: s.grants.items.length,
    organizations: funders().size,
    phd: s.supervision.items.length,
    evaluations: count('evaluation'),
    byMode: Object.fromEntries(MODES.map((m) => [m, count(m)])) as Record<Mode, number>,
    byPartner: Object.fromEntries(PARTNERS.map((p) => [p, c.filter((x) => x?.partner === p).length])) as Record<Partner, number>,
  };
}
