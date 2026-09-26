import { routes, type Lang } from '../i18n/ui';
import { dated } from './cv';
import { titleSlug } from './slug';
import { classify, type Mode, type Partner } from './profile';

type Bi = { en: string; es: string };
export type Output = { label: Bi; href: string; external: boolean };
export type SiteProject = {
  when: string;
  start: number;
  end: number | null;
  current: boolean;
  funder?: string;
  role?: string;
  description: string;
  outputs: Output[];
  modes: Mode[];
  partner?: Partner;
};

// Outputs of a project, matched by a phrase of its English CV line. Keep links to public pages only.
const OUTPUTS: { match: RegExp; links: { label: Bi; href: string }[] }[] = [
  {
    match: /Hogares Saludables/i,
    links: [
      { label: { en: 'Working paper: Building More Than Homes', es: 'Documento de trabajo: Building More Than Homes' }, href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6399298' },
      { label: { en: 'Working paper: Housing Investments and Well-being', es: 'Documento de trabajo: Housing Investments and Well-being' }, href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5387296' },
    ],
  },
  { match: /Croppie/i, links: [{ label: { en: 'RCT registry', es: 'Registro del RCT' }, href: 'https://www.socialscienceregistry.org/trials/16448' }] },
  { match: /Digital\) Village/i, links: [{ label: { en: 'RCT registry', es: 'Registro del RCT' }, href: 'https://www.socialscienceregistry.org/trials/16776' }] },
  { match: /Herencia Colombia/i, links: [{ label: { en: 'GCF project FP203', es: 'Proyecto FP203 del GCF' }, href: 'https://www.greenclimate.fund/project/fp203' }] },
  { match: /Territorial Inequalities/i, links: [{ label: { en: 'Report', es: 'Informe' }, href: 'https://doi.org/10.18235/0013019' }] },
  { match: /Pulso Social/i, links: [{ label: { en: 'R package and dashboards', es: 'Paquete en R y tableros' }, href: 'https://github.com/pulsosocialcolombia/PulsoSocialColombia' }] },
  {
    match: /Fondo Colombia Sostenible/i,
    links: [{ label: { en: 'Final report (2023)', es: 'Informe final (2023)' }, href: `@research#${titleSlug('Mid-term Evaluation of the Multi-Donor Fund Colombia Sostenible: Final Report')}` }],
  },
  { match: /S²Cities/i, links: [{ label: { en: 'Programme site', es: 'Sitio del programa' }, href: 'https://www.s2cities.org/' }] },
  { match: /u'GOOD/i, links: [{ label: { en: 'Programme page', es: 'Página del programa' }, href: 'https://www.fondationbotnar.org/project/ugood/' }] },
  { match: /Hub Conexión Juvenil/i, links: [{ label: { en: 'Hub site', es: 'Sitio del hub' }, href: 'https://www.hubconexionjuvenil.com/' }] },
  { match: /SIMONAA/i, links: [{ label: { en: 'Dashboards (code)', es: 'Tableros (código)' }, href: 'https://github.com/Simonaa-Antioquia/Tableros' }] },
  { match: /food security, migration|Venezuelan Migrants/i, links: [] },
];

const years = (s: string) => (s.match(/(19|20)\d{2}/g) ?? []).map(Number);

function parse(html: string) {
  const m = html.match(/^(?:<strong>(.*?)<\/strong>\s*[—–-]\s*)?<em>(.*?)<\/em>\.\s*(.*)$/s);
  return m ? { funder: m[1], role: m[2], description: m[3] } : { description: html };
}

export function siteProjects(lang: Lang): SiteProject[] {
  const en = dated('grants', 'en');
  const cls = classify();
  const now = new Date().getFullYear();
  return dated('grants', lang)
    .map((g, i) => {
      const [start = 0, endYear] = years(g.when);
      const open = /[–-]\s*$/.test(g.when) || /present|presente/i.test(g.when);
      const end = open ? null : endYear ?? start;
      const outputs = OUTPUTS.filter((o) => o.match.test(en[i]?.text ?? '')).flatMap((o) =>
        o.links.map((l) => ({
          label: l.label,
          href: l.href.startsWith('@research') ? l.href.replace('@research', routes.research[lang]) : l.href,
          external: !l.href.startsWith('@'),
        })),
      );
      return { when: g.when, start, end, current: end === null || end >= now, ...parse(g.text), outputs, modes: cls[i]?.modes ?? [], partner: cls[i]?.partner };
    })
    .sort((a, b) => b.start - a.start || (b.end ?? 9999) - (a.end ?? 9999));
}
