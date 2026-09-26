import type { ImageMetadata } from 'astro';
import informalidad from '../assets/works/informalidad.jpg';
import thisland from '../assets/works/thisland.jpg';
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
  kind: 'book' | 'policy';
  title: string;
  authors?: string[];
  venue: string;
  year?: number;
  cover: ImageMetadata;
  pillar: 'territory' | 'method' | 'both';
  summary: Bi;
  link?: string;
};

// Source: the book and policy pages of the previous site (_books/, _policy/).
export const works: Work[] = [
  {
    id: 'esta-tierra',
    kind: 'book',
    title: 'Esta tierra es mi tierra',
    venue: 'Editorial Universidad EAFIT',
    year: 2023,
    cover: thisland,
    pillar: 'territory',
    summary: {
      en: 'A new reading of the armed conflict in Urabá: how successive periods of territorial dispute reshaped rural property since the mid-twentieth century, with close attention to 2006–2011, just before the peace negotiations.',
      es: 'Una nueva lectura del conflicto armado en Urabá: cómo los distintos periodos de disputa territorial transformaron la propiedad rural desde mediados del siglo XX, con énfasis en 2006–2011, justo antes de la negociación del Acuerdo de Paz.',
    },
  },
  {
    id: 'oro-madera',
    kind: 'book',
    title: 'Informalidad e ilegalidad en la explotación del oro y la madera en Antioquia',
    authors: ['Jorge Giraldo Ramírez', 'Juan Carlos Muñoz-Mora'],
    venue: 'Editorial Universidad EAFIT',
    year: 2012,
    cover: informalidad,
    pillar: 'territory',
    summary: {
      en: 'A mixed-methods value-chain study of gold mining and timber extraction in Antioquia, identifying the incentives that let criminal organisations enter, stay in and leave these informal economies.',
      es: 'Un estudio de cadena de valor con métodos mixtos sobre la minería de oro y la extracción de madera en Antioquia, que identifica los incentivos de entrada, permanencia y salida de las organizaciones criminales en estas economías informales.',
    },
  },
  {
    id: 'land-concentration',
    kind: 'book',
    title: 'The Persistence of Land Concentration in Colombia: What Happened between 2000 and 2009?',
    authors: ['Ana María Ibáñez', 'Juan Carlos Muñoz-Mora'],
    venue: 'Book chapter',
    year: 2011,
    cover: distribution,
    pillar: 'territory',
    summary: {
      en: 'Tracks the evolution and regional distribution of rural land concentration in Colombia between 2000 and 2009 and explores its possible links with the dynamics of the armed conflict.',
      es: 'Analiza la evolución y la distribución regional de la concentración de la propiedad rural en Colombia entre 2000 y 2009, y explora su posible relación con la dinámica del conflicto armado.',
    },
  },
  {
    id: 'atlas',
    kind: 'book',
    title: 'Atlas de la distribución de la propiedad rural en Colombia',
    authors: ['Ana María Ibáñez', 'Margarita Gáfaro', 'Juan Carlos Muñoz-Mora'],
    venue: 'Universidad de los Andes – IGAC',
    year: 2011,
    cover: granAtlas,
    pillar: 'territory',
    summary: {
      en: 'Chapter on the limits of rural cadastral information for measuring equity in land distribution, the methods used to measure it, and a review of Colombian studies since 1960.',
      es: 'Capítulo sobre los límites de la información catastral rural para medir la equidad en la distribución de la tierra, las metodologías para medirla y una revisión de los estudios colombianos desde 1960.',
    },
  },
  {
    id: 'trees-africa',
    kind: 'book',
    title: 'Do Trees on Farms Matter in African Agriculture?',
    authors: ['Daniel C. Miller', 'Juan Carlos Muñoz-Mora', 'Luc Christiaensen'],
    venue: 'Book chapter',
    cover: bookTrees,
    pillar: 'territory',
    summary: {
      en: 'About a third of smallholders in the five Sub-Saharan countries studied grow trees on their farms; tree crops contribute 17% of gross income among growers and 6% on average across rural households.',
      es: 'Cerca de un tercio de los pequeños productores de los cinco países de África subsahariana estudiados cultiva árboles en sus fincas; estos aportan el 17% del ingreso bruto de quienes los cultivan y el 6% en promedio de los hogares rurales.',
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
    id: 'burundi-education',
    kind: 'policy',
    title: 'Inequality in Education – Burundi',
    venue: 'ECARES – Université libre de Bruxelles · UNICEF Burundi',
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
    kind: 'policy',
    title: 'Estructura de la propiedad rural en Antioquia',
    venue: 'Universidad EAFIT – Gobernación de Antioquia',
    year: 2011,
    cover: antioquiaRural,
    pillar: 'territory',
    summary: {
      en: 'The first analysis of rural property structures in Antioquia using the complete departmental cadastre for 2006–2011, with land-concentration indices comparable with national figures. In Spanish.',
      es: 'La primera aproximación a las estructuras de propiedad rural de Antioquia con la información catastral completa del departamento para 2006–2011, con índices de concentración comparables con los nacionales.',
    },
  },
  {
    id: 'antioquia-taxes',
    kind: 'policy',
    title: 'Impuesto predial en Antioquia',
    venue: 'Atlas de la propiedad de la tierra de Antioquia',
    year: 2015,
    cover: landTaxes,
    pillar: 'territory',
    summary: {
      en: 'The determinants of property-tax collection and evasion in Antioquia’s municipalities, and the policies that could raise revenue. In Spanish.',
      es: 'Los determinantes del recaudo y la evasión del impuesto predial en los municipios de Antioquia, y las políticas que podrían aumentar el recaudo.',
    },
  },
];
