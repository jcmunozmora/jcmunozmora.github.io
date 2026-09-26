import type { ImageMetadata } from 'astro';
import ai from '../assets/teaching/cartoon_ml.jpg';
import csa from '../assets/teaching/csa_head.jpeg';

type Bi = { en: string; es: string };

// Lectures and conference materials that are not courses. Source: the previous site (_teaching/).
export type Lecture = { id: string; title: Bi; where: Bi; year?: number; image?: ImageMetadata; summary: Bi; link?: string };

export const lectures: Lecture[] = [
  {
    id: 'ai-research',
    title: { en: 'AI for Research', es: 'IA para la investigación' },
    where: { en: 'Lecture and open materials (in Spanish)', es: 'Conferencia y materiales abiertos' },
    image: ai,
    summary: {
      en: 'How generative models work and how to use them at each step of academic work — from the research question and literature review to assisted reading, coding and writing — along with the ethical dilemmas they raise.',
      es: 'Cómo funcionan los modelos generativos y cómo usarlos en cada paso del ejercicio académico —desde la pregunta de investigación y la revisión de literatura hasta la lectura, la programación y la escritura asistidas— junto con los dilemas éticos que plantean.',
    },
  },
  {
    id: 'csa',
    title: { en: 'Climate-Smart Agriculture', es: 'Agricultura climáticamente inteligente' },
    where: {
      en: 'Summer School on Biodiversity, Bioeconomy and Climate Change',
      es: 'Escuela de verano sobre biodiversidad, bioeconomía y cambio climático',
    },
    year: 2023,
    image: csa,
    summary: {
      en: 'The puzzle of climate change, its place in economics, and the controversies around defining and measuring climate-smart agriculture.',
      es: 'El rompecabezas del cambio climático, su lugar en la economía y las controversias sobre cómo definir y medir la agricultura climáticamente inteligente.',
    },
    link: 'https://www.canva.com/design/DAFuLvpxO9I/view',
  },
];

// Open materials: replication packages, data, tools and dashboards (public GitHub repositories
// and their sites). Course repositories live with their course in src/data/teaching.ts.
// `paper`: start of the title of the article or working paper it replicates; that publication then
// shows a "Code & data" link in Research.
export type Material = { id: string; kind: 'replication' | 'tool'; title: Bi; summary: Bi; href: string; paper?: string };

const gh = (repo: string) => `https://github.com/${repo}`;

export const materials: Material[] = [
  {
    id: 'fxs-replication', kind: 'replication', href: 'https://doi.org/10.5281/zenodo.20559381', paper: 'When Do Property Rights Reduce Illicit Crops',
    title: { en: 'When Do Property Rights Reduce Illicit Crops?', es: 'When Do Property Rights Reduce Illicit Crops?' },
    summary: { en: 'Replication package (Zenodo) for the working paper with Martínez-González and López-Uribe.', es: 'Paquete de replicación (Zenodo) del documento de trabajo con Martínez-González y López-Uribe.' },
  },
  {
    id: 'land-formation-replication', kind: 'replication', href: 'https://doi.org/10.5281/zenodo.20600074', paper: 'With the Peace in Sight',
    title: { en: 'With the Peace in Sight: Strategic Land Expropriation Before Paramilitary Demobilisation', es: 'With the Peace in Sight: Strategic Land Expropriation Before Paramilitary Demobilisation' },
    summary: { en: 'Replication package (Zenodo) for the paper with Kleine-Rueschkamp, d’Anjou and Sánchez-Saldarriaga.', es: 'Paquete de replicación (Zenodo) del artículo con Kleine-Rueschkamp, d’Anjou y Sánchez-Saldarriaga.' },
  },
  {
    id: 'coffee-climate-replication', kind: 'replication', href: gh('jcmunozmora/coffee_climate_change_replication'),
    title: { en: 'Conditional credit, counselling visits and tree cover in Colombian coffee farms', es: 'Crédito condicionado, visitas de asesoría y cobertura arbórea en fincas cafeteras' },
    summary: { en: 'Replication code and anonymised data for Helo et al. (2026), a difference-in-differences design.', es: 'Código de replicación y datos anonimizados de Helo et al. (2026), un diseño de diferencias en diferencias.' },
  },
  {
    id: 'returning-home', kind: 'replication', href: gh('jcmunozmora/returning_home'), paper: 'Returning Home after Civil War',
    title: { en: 'Returning Home after Civil War (Journal of Development Studies, 2018)', es: 'Returning Home after Civil War (Journal of Development Studies, 2018)' },
    summary: { en: 'Stata code and data (CWIQ Burundi 2006) to replicate the article with Philip Verwimp.', es: 'Código en Stata y datos (CWIQ Burundi 2006) para replicar el artículo con Philip Verwimp.' },
  },
  {
    id: 'trees-uganda', kind: 'replication', href: gh('jcmunozmora/TreesOnFarm_Uganda'), paper: 'Do trees on farms improve household',
    title: { en: 'Do trees on farms improve household well-being? Uganda panel (2020)', es: '¿Mejoran los árboles en fincas el bienestar? Panel de Uganda (2020)' },
    summary: { en: 'Raw data, questionnaires and the full processing and analysis pipeline for the article in Frontiers in Forests and Global Change.', es: 'Datos originales, cuestionarios y todo el procesamiento y análisis del artículo en Frontiers in Forests and Global Change.' },
  },
  {
    id: 'facility-list-coder', kind: 'tool', href: gh('jcmunozmora/facilitylistcoder'), paper: 'Validity and Reliability of the Facility List Coder',
    title: { en: 'Facility List Coder', es: 'Facility List Coder' },
    summary: { en: 'A low-cost tool to assess community food environments from secondary data (IJERPH, 2019).', es: 'Una herramienta de bajo costo para evaluar entornos alimentarios a partir de datos secundarios (IJERPH, 2019).' },
  },
  {
    id: 'food-perception', kind: 'replication', href: '/food-perception-rural-colombia/', paper: 'Healthy is Fresh',
    title: { en: '“Healthy is fresh”: food perception in rural Colombia', es: '“Healthy is fresh”: percepción alimentaria en la Colombia rural' },
    summary: { en: 'Online supplementary materials for the participatory study of meal ideals and barriers to food choice.', es: 'Materiales complementarios del estudio participativo sobre ideales de comida y barreras en la elección de alimentos.' },
  },
  {
    id: 'sroi-meta-analysis', kind: 'replication', href: '/sroi-meta-analysis/', paper: 'Measuring Without Accounting',
    title: { en: 'From Principles to Practice: SROI reporting in the SVI database', es: 'De los principios a la práctica: los informes SROI de la base de SVI' },
    summary: { en: 'Replication package and web repository of the systematic content analysis of SROI reports.', es: 'Paquete de replicación y repositorio web del análisis sistemático de informes SROI.' },
  },
  {
    id: 'pulso-social-package', kind: 'tool', href: gh('pulsosocialcolombia/PulsoSocialColombia'),
    title: { en: 'Pulso Social Colombia — R package and dashboards', es: 'Pulso Social Colombia — paquete en R y tableros' },
    summary: { en: 'Open social indicators for Colombia with a territorial focus, following the IDB’s Pulso Social method; dashboards in the companion repository.', es: 'Indicadores sociales abiertos para Colombia con enfoque territorial, según la metodología Pulso Social del BID; tableros en el repositorio asociado.' },
  },
  {
    id: 'pulso-antioquia', kind: 'tool', href: '/pulso_antioquia/',
    title: { en: 'Pulso Social Antioquia', es: 'Pulso Social Antioquia' },
    summary: { en: 'The Pulso Social indicators for the department of Antioquia.', es: 'Los indicadores de Pulso Social para el departamento de Antioquia.' },
  },
  {
    id: 'simonaa-dashboards', kind: 'tool', href: gh('Simonaa-Antioquia/Tableros'),
    title: { en: 'SIMONAA — food supply dashboards for Antioquia', es: 'SIMONAA — tableros de abastecimiento agroalimentario de Antioquia' },
    summary: { en: 'Source code of the dynamic dashboards on food prices and supply built on SIPSA data.', es: 'Código fuente de los tableros dinámicos de precios y abastecimiento de alimentos construidos con datos del SIPSA.' },
  },
  {
    id: 'coffee-digital', kind: 'tool', href: '/coffee-digital/',
    title: { en: 'Coffee Digital — mapping coffee farms', es: 'Coffee Digital — mapas de fincas cafeteras' },
    summary: { en: 'R scripts for static and interactive maps of coffee farms with satellite imagery.', es: 'Scripts en R para mapas estáticos e interactivos de fincas cafeteras con imágenes satelitales.' },
  },
];

const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

export const codeFor = (title: string) =>
  materials.find((m) => m.paper && norm(title).startsWith(norm(m.paper)))?.href;
