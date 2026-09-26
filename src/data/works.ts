import type { ImageMetadata } from 'astro';
import informalidad from '../assets/works/informalidad.jpg';
import thisland from '../assets/works/thisland_hd.jpg';
import areces from '../assets/works/areces_datos_masivos.jpg';
import idbTerritorial from '../assets/works/idb_territorial.png';
import idsTitling from '../assets/works/ids_titling.jpg';
import notas9 from '../assets/works/notas_politica9.jpg';
import granAtlas from '../assets/works/gran_atlas.jpg';
import bookTrees from '../assets/works/book_trees.png';
import treesonfarm from '../assets/works/treesonfarm.png';
import distribution from '../assets/works/book_distribution.png';
import lumiere from '../assets/works/lumiere.jpg';
import burundiEdu from '../assets/works/burundi_edu.jpeg';
import antioquiaRural from '../assets/works/antioquia_rural.jpeg';
import landTaxes from '../assets/works/land_taxes.jpeg';

type Bi = { en: string; es: string };

export type Work = {
  id: string;
  kind: 'book' | 'chapter' | 'policy';
  title: string;
  authors?: string[];
  venue: string;
  year?: number;
  cover?: ImageMetadata;
  pillar: 'territory' | 'method' | 'both';
  summary?: Bi;
  link?: string;
  pdf?: string;
  // Start of the entry's English title in the CV. Links this curated card to the CV entry, so
  // the CV decides what is listed and this file only adds cover, summary and links.
  cv?: string;
};

// Sources: the CV (CV-MunozMora-EN.tex, 2026-08-18) for titles, years, co-authors and links;
// the previous site (_books/, _policy/) for covers and summaries; Crossref for DOIs.
export const works: Work[] = [
  {
    id: 'esta-tierra',
    cv: 'This land is my land',
    kind: 'book',
    title: 'Esta tierra es mi tierra. Conflicto armado y propiedad rural en Urabá, Colombia',
    venue: 'Editorial Universidad EAFIT',
    year: 2021,
    cover: thisland,
    pillar: 'territory',
    link: 'https://doi.org/10.17230/9789587207101lr0',
    summary: {
      en: 'A new reading of the armed conflict in Urabá: how successive periods of territorial dispute reshaped rural property since the mid-twentieth century, with close attention to 2006–2011, just before the peace negotiations.',
      es: 'Una nueva lectura del conflicto armado en Urabá: cómo los distintos periodos de disputa territorial transformaron la propiedad rural desde mediados del siglo XX, con énfasis en 2006–2011, justo antes de la negociación del Acuerdo de Paz.',
    },
    pdf: 'https://editorial.eafit.edu.co/index.php/editorial/catalog/download/133/145/456',
  },
  {
    id: 'oro-madera',
    cv: 'Informality and Illegality',
    kind: 'book',
    title: 'Informalidad e ilegalidad en la explotación del oro y la madera en Antioquia',
    authors: ['Jorge Giraldo Ramírez', 'Juan Carlos Muñoz-Mora'],
    venue: 'Editorial Universidad EAFIT · ISBN 978-958-99013-2-8',
    year: 2012,
    cover: informalidad,
    pillar: 'territory',
    summary: {
      en: 'A mixed-methods value-chain study of gold mining and timber extraction in Antioquia, identifying the incentives that let criminal organisations enter, stay in and leave these informal economies.',
      es: 'Un estudio de cadena de valor con métodos mixtos sobre la minería de oro y la extracción de madera en Antioquia, que identifica los incentivos de entrada, permanencia y salida de las organizaciones criminales en estas economías informales.',
    },
    pdf: '/pdf/works/Giraldo_Munoz-2012.pdf',
  },
  {
    id: 'atlas',
    cv: 'The atlas of rural property',
    kind: 'book',
    title: 'Atlas de la distribución de la propiedad rural en Colombia, 2000–2009',
    authors: ['Ana María Ibáñez', 'Margarita Gáfaro', 'Juan Carlos Muñoz-Mora'],
    venue: 'Universidad de los Andes · Instituto Geográfico Agustín Codazzi',
    year: 2012,
    cover: granAtlas,
    pillar: 'territory',
    summary: {
      en: 'The limits of rural cadastral information for measuring equity in land distribution, the methods used to measure it, and a decade of evidence for 2000–2009.',
      es: 'Los límites de la información catastral rural para medir la equidad en la distribución de la tierra, las metodologías para medirla y una década de evidencia para 2000–2009.',
    },
    link: 'https://tiendavirtual.igac.gov.co/es/content/atlas-de-la-distribuci%C3%B3n-de-la-propiedad-rural-en-colombia-en-libro-incluye-cd',
  },
  {
    id: 'midiendo-desigualdad',
    cv: 'Midiendo desigualdad',
    kind: 'chapter',
    title: 'Midiendo desigualdad desde el cielo',
    authors: ['José G. Montalvo', 'Marta Reynal-Querol', 'Juan Carlos Muñoz-Mora'],
    venue: 'In D. Peña (coord.), Investigación Económica con Datos Masivos, ch. 7, pp. 263–299 · Fundación Ramón Areces · ISBN 978-84-9961-472-4',
    year: 2025,
    cover: areces,
    pillar: 'method',
    link: 'https://www.fundacionareces.es/fundacionareces/es/publicaciones/investigacion-economica-con-datos-masivos.html?tipo=7',
    pdf: 'https://www.fundacionareces.es/recursos/doc/portal/2024/04/23/web-investigacion-economica-con-datos-masivos.pdf',
    summary: {
      en: 'A new method to build a Gini index for every country from satellite night-time lights, with a local Pareto correction for top-coding and a factor analysis of Gini measures (the MIFA index). Circulated since 2017 as “Measuring inequality from above”. In Spanish.',
      es: 'Una metodología nueva para construir un índice de Gini por país a partir de la luminosidad nocturna satelital, con una corrección local de Pareto al límite de codificación y un análisis factorial de medidas de Gini (índice MIFA). Circuló desde 2017 como “Measuring inequality from above”.',
    },
  },
  {
    id: 'trees-africa',
    cv: 'Do trees on farms matter',
    kind: 'chapter',
    title: 'Do Trees on Farms Matter in African Agriculture?',
    authors: ['Daniel C. Miller', 'Juan Carlos Muñoz-Mora', 'Luc Christiaensen'],
    venue: 'In L. Christiaensen & L. Demery (eds.), Agriculture in Africa: Telling Myths from Facts · World Bank',
    year: 2018,
    cover: bookTrees,
    pillar: 'territory',
    link: 'https://openknowledge.worldbank.org/handle/10986/28543',
    summary: {
      en: 'About a third of smallholders in the five Sub-Saharan countries studied grow trees on their farms; tree crops contribute 17% of gross income among growers and 6% on average across rural households.',
      es: 'Cerca de un tercio de los pequeños productores de los cinco países de África subsahariana estudiados cultiva árboles en sus fincas; estos aportan el 17% del ingreso bruto de quienes los cultivan y el 6% en promedio de los hogares rurales.',
    },
    pdf: '/pdf/works/Christieaensen_2019_chapter.pdf',
  },
  {
    id: 'statistical-models',
    cv: 'Best practices of statistical models',
    kind: 'chapter',
    title: 'Buenas prácticas de los modelos estadísticos en las Ciencias Sociales: entender el lenguaje de los datos',
    authors: ['Juan Carlos Muñoz-Mora', 'Sebastián Aparicio'],
    venue: 'In M. Cardona & J.C. Muñoz-Mora (eds.), Aproximaciones Metodológicas en las Ciencias Sociales · Universidad de Manizales',
    year: 2017,
    pillar: 'method',
  },
  {
    id: 'land-concentration',
    cv: 'The Persistence of Land Concentration',
    kind: 'chapter',
    title: 'The Persistence of Land Concentration in Colombia: What Happened Between 2000 and 2010?',
    authors: ['Ana María Ibáñez', 'Juan Carlos Muñoz-Mora'],
    venue: 'In M. Bergsmo, C. Rodríguez-Garavito, P. Kalmanovitz & M. Saffon (eds.), Distributive Justice in Transitions · Torkel Opsahl / PRIO',
    year: 2011,
    cover: distribution,
    pillar: 'territory',
    link: 'http://www.fichl.org/fileadmin/fichl/documents/FICHL_6_web.pdf',
    summary: {
      en: 'Tracks the evolution and regional distribution of rural land concentration in Colombia and explores its possible links with the dynamics of the armed conflict.',
      es: 'Analiza la evolución y la distribución regional de la concentración de la propiedad rural en Colombia y explora su posible relación con la dinámica del conflicto armado.',
    },
    pdf: '/pdf/works/Distributive_Justice_in_Transitions_Capitulo.pdf',
  },
  {
    id: 'idb-territorial',
    cv: 'Territorial Inequalities',
    kind: 'policy',
    title: 'Territorial Inequalities in Colombia: Realities and Perspectives',
    authors: ['Laura Giles-Álvarez', 'Cristhian Larrahondo', 'Mónica Hernández', 'Juan Carlos Muñoz-Mora', 'Germán D. Angulo', 'Laura M. Quintero'],
    venue: 'Inter-American Development Bank',
    year: 2024,
    pillar: 'territory',
    link: 'https://doi.org/10.18235/0013019',
    cover: idbTerritorial,
    pdf: 'https://publications.iadb.org/publications/spanish/document/Desigualdades-territoriales-en-Colombia-realidades-y-perspectivas.pdf',
  },
  {
    id: 'ids-titling',
    cv: 'Does Land Titling Matter',
    kind: 'policy',
    title: 'Does Land Titling Matter? The Role of Land Property Rights in Colombia’s War on Drugs',
    venue: 'Policy Briefing · Institute of Development Studies, University of Sussex',
    year: 2018,
    pillar: 'territory',
    link: 'https://opendocs.ids.ac.uk/articles/report/Does_Land_Titling_Matter_The_Role_of_Land_Property_Rights_in_Colombia_s_War_on_Drugs/26440954',
    cover: idsTitling,
  },
  {
    id: 'lumiere',
    kind: 'policy',
    title: 'Lumière Project: household energy baseline',
    venue: 'ECARES – Université libre de Bruxelles · UNICEF Burundi',
    year: 2018,
    cover: lumiere,
    pillar: 'method',
    summary: {
      en: 'Baseline for a randomised evaluation of alternative household energy in Burundi: 1,000 households interviewed across 34 treatment and 29 control communities.',
      es: 'Línea de base de una evaluación aleatorizada de fuentes alternativas de energía para hogares en Burundi: 1.000 hogares entrevistados en 34 comunidades de tratamiento y 29 de control.',
    },
  },
  {
    id: 'trees-guidebook',
    kind: 'policy',
    title: 'Trees on Farms: Measuring their Contribution to Household Welfare',
    authors: ['Daniel C. Miller', 'Juan Carlos Muñoz-Mora', 'Alberto Zezza', 'Josefine Durazo'],
    venue: 'World Bank · Guidebook',
    cover: treesonfarm,
    pillar: 'method',
    summary: {
      en: 'A survey module and toolbox for integrating trees on farms and agroforestry into multi-topic and agricultural household surveys in low- and middle-income countries.',
      es: 'Un módulo de encuesta y caja de herramientas para integrar los árboles en fincas y la agroforestería en encuestas de hogares agrícolas y multitemáticas en países de ingreso bajo y medio.',
    },
    pdf: '/pdf/works/Trees-on-Farms-Measuring-Their-Contribution-to-Household-Welfare.pdf',
  },
  {
    id: 'burundi-education',
    cv: 'Inequality in Education',
    kind: 'policy',
    title: 'Inequality in Education, School Dropout and Adolescent Lives in Burundi',
    authors: ['K. Cieslik', 'M. Giani', 'Juan Carlos Muñoz-Mora', 'R.L. Ngenzebuke', 'P. Verwimp'],
    venue: 'UNICEF Burundi · Université libre de Bruxelles',
    year: 2014,
    cover: burundiEdu,
    pillar: 'method',
    summary: {
      en: 'Quantitative study of enrolment, drop-out, youth and violence, and inequality in education, combining household surveys and administrative data with fieldwork.',
      es: 'Estudio cuantitativo de matrícula, deserción, juventud y violencia, y desigualdad en la educación, que combina encuestas de hogares y datos administrativos con trabajo de campo.',
    },
  },
  {
    id: 'antioquia-tenure',
    cv: 'Rural land tenure system',
    kind: 'policy',
    title: 'Estructura de la propiedad rural en Antioquia, 2006–2011',
    authors: ['Juan Carlos Muñoz-Mora', 'Oswaldo Zapata'],
    venue: 'Universidad EAFIT · Gobernación de Antioquia',
    year: 2012,
    cover: antioquiaRural,
    pillar: 'territory',
    summary: {
      en: 'The first analysis of rural property structures in Antioquia using the complete departmental cadastre for 2006–2011, with land-concentration indices comparable with national figures. In Spanish.',
      es: 'La primera aproximación a las estructuras de propiedad rural de Antioquia con la información catastral completa del departamento para 2006–2011, con índices de concentración comparables con los nacionales.',
    },
  },
  {
    id: 'antioquia-taxes',
    cv: 'Land taxes in Antioquia',
    kind: 'policy',
    title: 'Impuesto predial en Antioquia: hacia un diseño óptimo',
    venue: 'Universidad EAFIT · Gobernación de Antioquia · co-coordinated with Alberto Naranjo',
    year: 2012,
    cover: landTaxes,
    pillar: 'territory',
    summary: {
      en: 'The determinants of property-tax collection and evasion in Antioquia’s municipalities, and the policies that could raise revenue. In Spanish.',
      es: 'Los determinantes del recaudo y la evasión del impuesto predial en los municipios de Antioquia, y las políticas que podrían aumentar el recaudo.',
    },
    pdf: '/pdf/works/Informe_Predial_antioquia.pdf',
  },
  {
    id: 'uraba',
    cv: 'Urabá: abundance',
    kind: 'policy',
    title: 'Urabá: abundancia y disputa por la tierra',
    venue: 'Universidad EAFIT · Gobernación de Antioquia · co-coordinated with Jorge Giraldo',
    year: 2012,
    pillar: 'territory',
  },
  {
    id: 'notas-politica',
    cv: 'The Persistence of Land Concentration',
    kind: 'policy',
    title: 'The Persistence of Land Concentration in Colombia: What Happened Between 2000 and 2010?',
    authors: ['Ana María Ibáñez', 'Juan Carlos Muñoz-Mora'],
    venue: 'Notas de Política No. 9 · Universidad de los Andes',
    year: 2011,
    pillar: 'territory',
    link: 'https://repositorio.uniandes.edu.co/entities/publication/b03f2b5b-9da9-4970-8b65-6554e498f3ef',
    cover: notas9,
  },
];
