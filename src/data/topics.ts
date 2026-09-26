// Topic taxonomy. An item gets a topic when its title, venue, abstract or keywords match one
// of the patterns (EN or ES, accent-insensitive). Add a pattern here rather than tagging by hand;
// use `overrides` in src/lib/catalog.ts only for the exceptions.
export type Topic = {
  slug: string;
  en: string;
  es: string;
  pillar: 'territory' | 'method';
  blurb: { en: string; es: string };
  patterns: RegExp[];
};

export const topics: Topic[] = [
  {
    slug: 'land',
    en: 'Land & property rights',
    es: 'Tierra y derechos de propiedad',
    pillar: 'territory',
    blurb: { en: 'Land concentration, tenure, titling and the markets for rural land.', es: 'Concentración, tenencia, titulación y mercados de la tierra rural.' },
    patterns: [/\bland\b/, /\btierra/, /propiedad rural/, /property rights/, /derechos de propiedad/, /tenure/, /tenencia/, /titling/, /titulacion/, /expropriation/, /\bpredios? rurales/, /land values/],
  },
  {
    slug: 'conflict',
    en: 'Conflict, violence & illicit economies',
    es: 'Conflicto, violencia y economías ilícitas',
    pillar: 'territory',
    blurb: { en: 'Civil war, armed groups, displacement, illicit crops and criminal economies.', es: 'Guerra civil, grupos armados, desplazamiento, cultivos ilícitos y economías criminales.' },
    patterns: [/conflict/, /conflicto/, /civil war/, /guerra/, /violen/, /paramilitar/, /illicit/, /ilicit/, /\bcoca\b/, /displacement/, /desplazamiento/, /criminal/, /ilegalidad/, /peace/, /\bpaz\b/, /war on drugs/, /demobili/],
  },
  {
    slug: 'fiscal',
    en: 'Cadastre & public finance',
    es: 'Catastro y finanzas públicas',
    pillar: 'territory',
    blurb: { en: 'Multipurpose cadastre, property tax, subnational fiscal capacity and public spending.', es: 'Catastro multipropósito, impuesto predial, capacidad fiscal subnacional y gasto público.' },
    patterns: [/cadastr/, /catastr/, /property tax/, /predial/, /fiscal/, /public expenditure/, /gasto publico/, /finanzas (publicas|territoriales)/, /public finance/, /land taxes/, /revenue/, /recaudo/, /valorizacion/],
  },
  {
    slug: 'rural',
    en: 'Agriculture & rural development',
    es: 'Agricultura y desarrollo rural',
    pillar: 'territory',
    blurb: { en: 'Smallholders, coffee, agroforestry, agricultural policy and rural livelihoods.', es: 'Pequeños productores, café, agroforestería, política agropecuaria y medios de vida rurales.' },
    patterns: [/agricultur/, /agropecuari/, /agroaliment/, /agri-food/, /\brural/, /farm/, /finca/, /smallholder/, /campesin/, /coffee/, /\bcafe/, /cafeter/, /caficult/, /\brice\b/, /arroz/, /paddy/, /cacao/, /cocoa/, /potato/, /papa\b/, /livestock/, /ganader/, /trees on farms/, /agroforest/],
  },
  {
    slug: 'climate',
    en: 'Climate & environment',
    es: 'Clima y ambiente',
    pillar: 'territory',
    blurb: { en: 'Adaptation, deforestation rules, resilience and environmental quality.', es: 'Adaptación, normas de deforestación, resiliencia y calidad ambiental.' },
    patterns: [/climat/, /environment/, /ambient/, /deforest/, /eudr/, /kuznets/, /forest/, /bosque/, /carbon/, /resilien/, /pollution/, /contaminacion/, /bioeconom/, /biodivers/, /green growth/],
  },
  {
    slug: 'housing',
    en: 'Housing, cities & public space',
    es: 'Vivienda, ciudades y espacio público',
    pillar: 'territory',
    blurb: { en: 'Housing upgrades, informal settlements, youth-led placemaking and urban wellbeing.', es: 'Mejoramiento de vivienda, asentamientos informales, urbanismo juvenil y bienestar urbano.' },
    patterns: [/housing/, /vivienda/, /\bhomes?\b/, /hogares saludables/, /healthy homes/, /slum/, /informal settlement/, /\burban/, /placemaking/, /public space/, /espacio publico/, /vivo mi calle/, /s2cities/, /\bcities\b/, /metropolitan/, /metropolitana/, /medellin/],
  },
  {
    slug: 'food',
    en: 'Food security, nutrition & health',
    es: 'Seguridad alimentaria, nutrición y salud',
    pillar: 'territory',
    blurb: { en: 'Food environments, diets, nutrition, food security and public health.', es: 'Entornos alimentarios, dietas, nutrición, seguridad alimentaria y salud pública.' },
    patterns: [/\bfood/, /aliment/, /nutri/, /\bmeal/, /eating/, /\bdiet/, /health/, /salud/, /covid/, /vaccin/, /vacun/],
  },
  {
    slug: 'impact',
    en: 'Impact evaluation & social value',
    es: 'Evaluación de impacto y valor social',
    pillar: 'method',
    blurb: { en: 'Experiments and quasi-experiments, SROI, theory of change and MEL systems.', es: 'Experimentos y cuasi-experimentos, SROI, teoría de cambio y sistemas de MEL.' },
    patterns: [/impact/, /impacto/, /evaluation/, /evaluacion/, /\bsroi\b/, /social value/, /valor social/, /\brct\b/, /randomi/, /aleatori/, /experiment/, /theory of change/, /teoria de cambio/, /\bmel\b/, /monitoring/, /monitoreo/, /regression discontinuity/, /counterfactual/, /baseline/, /linea de base/],
  },
  {
    slug: 'institutions',
    en: 'Entrepreneurship, migration & institutions',
    es: 'Emprendimiento, migración e instituciones',
    pillar: 'territory',
    blurb: { en: 'Productive and destructive entrepreneurship, migrants, labour markets and institutions.', es: 'Emprendimiento productivo y destructivo, migrantes, mercados laborales e instituciones.' },
    patterns: [/entrepreneur/, /emprend/, /institution/, /institucion/, /migra/, /labor market/, /mercado laboral/, /business/, /\bmining\b/, /mineria/, /\bgold\b/, /\boro\b/, /informal/],
  },
  {
    slug: 'inequality',
    en: 'Inequality, education & growth',
    es: 'Desigualdad, educación y crecimiento',
    pillar: 'territory',
    blurb: { en: 'Territorial and economic inequality, human capital, trust and long-run growth.', es: 'Desigualdad territorial y económica, capital humano, confianza y crecimiento de largo plazo.' },
    patterns: [/inequalit/, /desigualdad/, /education/, /educacion/, /school/, /escuela/, /human.capital/, /\bgrowth\b/, /crecimiento/, /\btrust\b/, /confianza/, /poverty/, /pobreza/, /concentration/],
  },
  {
    slug: 'methods',
    en: 'Data, AI & research methods',
    es: 'Datos, IA y métodos de investigación',
    pillar: 'method',
    blurb: { en: 'Survey design, measurement, GIS, data governance and AI in research and teaching.', es: 'Diseño de encuestas, medición, SIG, gobernanza de datos e IA en investigación y docencia.' },
    patterns: [/\bdata\b/, /\bdatos\b/, /\bai\b/, /\bia\b/, /artificial intelligence/, /inteligencia artificial/, /\bgis\b/, /\bsig\b/, /survey/, /encuesta/, /questionnaire/, /cuestionario/, /measurement/, /medicion/, /measuring/, /midiendo/, /statistic/, /estadistic/, /research (design|seminar|studio)/, /investigacion aumentada/, /seminario de investigacion/, /econometr/, /reproducib/, /lasso/, /predictive/],
  },
  {
    slug: 'finance',
    en: 'Sustainable & impact finance',
    es: 'Finanzas sostenibles y de impacto',
    pillar: 'method',
    blurb: { en: 'Impact bonds, results-based financing, investment decisions and credit for resilience.', es: 'Bonos de impacto, financiamiento por resultados, decisiones de inversión y crédito para la resiliencia.' },
    patterns: [/financ/, /\bbonds?\b/, /\bbonos?\b/, /investment/, /inversion/, /\bcredit/, /credito/, /\besg\b/, /sustainable projects/, /proyectos sostenibles/, /term sheet/],
  },
];

export const topicBySlug = Object.fromEntries(topics.map((t) => [t.slug, t]));

export const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

// Title, venue and keywords are strong evidence: one matching pattern tags the item.
// Abstracts and post bodies mention many things in passing, so a topic needs at least two
// different patterns to match there.
export function classify(strong: string, weak = ''): string[] {
  const a = norm(strong);
  const b = norm(weak);
  return topics
    .filter((tp) => tp.patterns.some((p) => p.test(a)) || tp.patterns.filter((p) => p.test(b)).length >= 2)
    .map((tp) => tp.slug);
}
