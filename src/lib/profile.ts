import cv from '../data/cv.json';
import { dated } from './cv';
import { PLACES, type PlaceKey } from '../data/places';

// How each CV project is classified: the kind of work (a project can be more than one) and the kind
// of organization it was done for. Matched against the English CV line; a project that matches no
// rule is reported by `unclassified()` so a new CV entry never goes missing silently.
export type Mode = 'research' | 'evaluation' | 'policy' | 'advisory';
export type Partner = 'public' | 'funds' | 'private' | 'academia';
export const MODES: Mode[] = ['research', 'evaluation', 'policy', 'advisory'];
export const PARTNERS: Partner[] = ['public', 'funds', 'private', 'academia'];

const RULES: { match: RegExp; modes: Mode[]; partner: Partner; where: PlaceKey[] }[] = [
  { match: /EVAL-INNO/, modes: ['research', 'evaluation'], partner: 'academia', where: ['es', 'it', 'hu', 'uk', 'co', 'bo', 'pe', 'kz', 've', 'tr'] },
  { match: /AGROSAVIA/i, modes: ['research', 'policy'], partner: 'public', where: ['co'] },
  { match: /Central America/i, modes: ['research', 'policy'], partner: 'public', where: ['gt', 'hn', 'sv', 'ni'] },
  { match: /territory of contrasts/i, modes: ['research', 'policy'], partner: 'private', where: ['co-ant'] },
  { match: /raise productivity under a sustainable model/i, modes: ['policy'], partner: 'public', where: ['co'] },
  { match: /Integrated impact-measurement framework/i, modes: ['advisory', 'evaluation'], partner: 'private', where: ['co'] },
  { match: /MuniGest/i, modes: ['policy'], partner: 'academia', where: ['co-ant'] },
  { match: /Provinces for Administration/i, modes: ['policy'], partner: 'public', where: ['co-ant'] },
  { match: /Comfama/i, modes: ['advisory', 'evaluation'], partner: 'private', where: ['co-ant'] },
  { match: /La Danta/i, modes: ['evaluation', 'advisory'], partner: 'private', where: ['co-ant'] },
  { match: /Becas para el Desarrollo|Sueños que transforman/i, modes: ['evaluation', 'advisory'], partner: 'private', where: ['co'] },
  { match: /corporate and family foundations/i, modes: ['research', 'evaluation'], partner: 'academia', where: ['co'] },
  { match: /Theory of impact/i, modes: ['evaluation'], partner: 'academia', where: ['co-ant'] },
  { match: /café por la sostenibilidad/i, modes: ['advisory'], partner: 'academia', where: ['co'] },
  { match: /Herencia Colombia|Green Climate Fund/i, modes: ['evaluation'], partner: 'funds', where: ['co'] },
  { match: /u'GOOD/i, modes: ['research'], partner: 'academia', where: ['co'] },
  { match: /care-work training/i, modes: ['evaluation', 'policy'], partner: 'public', where: ['co-cun'] },
  { match: /Hub Conexión Juvenil/i, modes: ['advisory'], partner: 'private', where: ['co'] },
  { match: /rural property tax/i, modes: ['policy'], partner: 'public', where: ['co-ant'] },
  { match: /SIMONAA/i, modes: ['policy'], partner: 'public', where: ['co-cun'] },
  { match: /Agri-Food Supply System/i, modes: ['policy'], partner: 'public', where: ['co'] },
  { match: /S²Cities/i, modes: ['evaluation'], partner: 'funds', where: ['co-ant', 'ec', 'ph', 'id'] },
  { match: /Grupo Argos/i, modes: ['advisory', 'evaluation'], partner: 'private', where: ['co-ura'] },
  { match: /Croppie|Digital\) Village/i, modes: ['research', 'evaluation'], partner: 'academia', where: ['co'] },
  { match: /Territorial Inequalities/i, modes: ['research', 'policy'], partner: 'public', where: ['co'] },
  { match: /Paraguay/i, modes: ['policy'], partner: 'public', where: ['py'] },
  { match: /agricultural development policy/i, modes: ['policy'], partner: 'public', where: ['co'] },
  { match: /agricultural strategies/i, modes: ['policy'], partner: 'public', where: ['co'] },
  { match: /Building Healthy Homes/i, modes: ['research', 'evaluation'], partner: 'public', where: ['co-ant', 'co-val', 'co-atl'] },
  { match: /Hogares Saludables/i, modes: ['evaluation', 'advisory'], partner: 'private', where: ['co-ant', 'co-val', 'co-atl'] },
  { match: /potato/i, modes: ['policy', 'advisory'], partner: 'private', where: ['co'] },
  { match: /Fondo Colombia Sostenible|Land for Prosperity/i, modes: ['evaluation'], partner: 'funds', where: ['co'] },
  { match: /Pulso Social/i, modes: ['policy'], partner: 'public', where: ['co'] },
  { match: /Göttingen|Climate-Smart/i, modes: ['research'], partner: 'academia', where: ['co'] },
  { match: /Venezuelan Migrants/i, modes: ['research', 'policy'], partner: 'public', where: ['co'] },
];

// Fieldwork that is not a CV project: the Burundi studies (CV: working paper on household structure
// in Burundi; research assistant for UNICEF-Burundi, 2014).
const RESEARCH_PLACES: PlaceKey[] = ['bi'];

export type Classified = { modes: Mode[]; partner: Partner; where: PlaceKey[] } | null;

/** Classification of every project, in CV order (same order as `dated('grants', lang)`). */
export function classify(): Classified[] {
  return dated('grants', 'en').map((g) => {
    const r = RULES.find((x) => x.match.test(g.text));
    return r ? { modes: r.modes, partner: r.partner, where: r.where } : null;
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
    for (const n of f.replace(/&amp;/g, '&').replace(/\s*\(.*?\)/g, '').split(/\s*[/&]\s*/)) if (n.trim()) names.add(n.trim());
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
    countries: byCountry().size,
    evaluations: count('evaluation'),
    byMode: Object.fromEntries(MODES.map((m) => [m, count(m)])) as Record<Mode, number>,
    byPartner: Object.fromEntries(PARTNERS.map((p) => [p, c.filter((x) => x?.partner === p).length])) as Record<Partner, number>,
  };
}

/** Every place with the number of projects there; research fieldwork counts as one entry. */
export function places() {
  const n = new Map<PlaceKey, number>();
  for (const c of classify()) for (const k of c?.where ?? []) n.set(k, (n.get(k) ?? 0) + 1);
  for (const k of RESEARCH_PLACES) n.set(k, (n.get(k) ?? 0) + 1);
  return [...n].map(([key, count]) => ({ key, count, ...PLACES[key] })).sort((a, b) => b.count - a.count);
}

/** Number of distinct projects per country (a project in three Colombian regions counts once). */
export function byCountry() {
  const n = new Map<string, Set<number | string>>();
  const add = (c: string, id: number | string) => (n.get(c) ?? n.set(c, new Set()).get(c)!).add(id);
  classify().forEach((c, i) => c?.where.forEach((k) => add(PLACES[k].country, i)));
  for (const k of RESEARCH_PLACES) add(PLACES[k].country, `research:${k}`);
  return new Map([...n].map(([c, ids]) => [c, ids.size]));
}
