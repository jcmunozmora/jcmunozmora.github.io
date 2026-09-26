import type { ImageMetadata } from 'astro';
import desarrollo from '../assets/teaching/Teaching_Desarrollo.png';
import gis from '../assets/teaching/logo_gis.png';
import tecnicas from '../assets/teaching/teaching_tecnicas.png';
import seminario from '../assets/teaching/teaching_research.png';
import ai from '../assets/teaching/cartoon_ml.jpg';
import csa from '../assets/teaching/csa_head.jpeg';

type Bi = { en: string; es: string };

export type Course = {
  id: string;
  title: Bi;
  where: Bi;
  image?: ImageMetadata;
  summary: Bi;
  link?: string;
};

// Recent course sites published from GitHub. Source: each repository's README and syllabus
// (github.com/jcmunozmora/<repo>), read 2026-09-26.
export type CourseSite = {
  id: string;
  title: Bi;
  program: Bi;
  term?: string;
  href: string;
  summary: Bi;
  highlights: { en: string[]; es: string[] };
};

export const courseSites: CourseSite[] = [
  {
    id: 'curso-haciendo-economia',
    href: '/curso-haciendo-economia/',
    term: '2026-2',
    title: { en: 'Doing Economics — Project 1: Tools and Applications', es: 'Haciendo Economía — Proyecto 1: Herramientas y Aplicaciones' },
    program: { en: 'BSc in Economics · Universidad EAFIT · with Susana Berrío', es: 'Pregrado en Economía · Universidad EAFIT · con Susana Berrío' },
    summary: {
      en: 'Students produce a credible, reproducible piece of economic research with AI as co-pilot and their own judgement in charge: the course is about the judgement tools cannot replace.',
      es: 'Los estudiantes producen una pieza de investigación económica creíble y reproducible, con la IA como copiloto y su juicio al mando: el curso trata del juicio que las herramientas no pueden reemplazar.',
    },
    highlights: {
      en: ['Seven sprints, each adding a piece of the paper', 'Fortnightly interviews with working economists', 'Golden rule: no code without pseudocode first'],
      es: ['Siete sprints, cada uno suma una pieza del paper', 'Entrevistas quincenales con economistas en ejercicio', 'Regla de oro: ningún código sin pseudocódigo primero'],
    },
  },
  {
    id: 'curso_seminario_investigacion',
    href: '/curso_seminario_investigacion/',
    term: '2026',
    title: { en: 'Augmented Research Studio', es: 'Studio de Investigación Aumentada' },
    program: { en: 'MSc in Applied Economics · Universidad EAFIT', es: 'Maestría en Economía Aplicada · Universidad EAFIT' },
    summary: {
      en: 'The research seminar rewritten in 2026 around augmented intelligence: “you are the researcher; AI is your lever”. Units, sessions, milestones and executable labs lead to a thesis proposal.',
      es: 'El seminario de investigación reescrito en 2026 alrededor de la inteligencia aumentada: “tú eres el investigador; la IA es tu palanca”. Unidades, sesiones, hitos y laboratorios ejecutables llevan a una propuesta de tesis.',
    },
    highlights: {
      en: ['Five executable AI labs', 'Five milestones with rubrics and a Quarto thesis template', 'Public portfolio of each cohort'],
      es: ['Cinco laboratorios de IA ejecutables', 'Cinco hitos con rúbricas y plantilla de tesis en Quarto', 'Vitrina pública del portafolio de cada cohorte'],
    },
  },
  {
    id: 'curso-gestion-informacion',
    href: '/curso-gestion-informacion/',
    term: '2026',
    title: { en: 'Information Management and Data Governance', es: 'Gestión de la Información y Gobernanza de Datos' },
    program: { en: 'Specialization in Territorial Public Management · Universidad EAFIT', es: 'Especialización en Gobierno y Gestión Pública Territorial · Universidad EAFIT' },
    summary: {
      en: 'A 36-hour course for Colombian public-sector professionals on data culture, basic statistics, information sources and dashboards for decision-making.',
      es: 'Un curso de 36 horas para profesionales del sector público colombiano sobre cultura de datos, estadística básica, fuentes de información y tableros para la toma de decisiones.',
    },
    highlights: {
      en: ['Four units from data culture to Power BI', 'Directory of public data sources and an annotated bibliography'],
      es: ['Cuatro unidades, de la cultura de datos a Power BI', 'Directorio de fuentes de datos públicas y bibliografía anotada'],
    },
  },
  {
    id: 'curso-impacto',
    href: '/curso-impacto/',
    term: '2026',
    title: { en: 'Measuring and Valuing Social Impact: a Theory of Change Approach', es: 'Medición y Valoración del Impacto Social: Enfoque de Teoría de Cambio' },
    program: { en: 'Executive education for Comfama · Universidad EAFIT · with Paola Velásquez', es: 'Educación continua para Comfama · Universidad EAFIT · con Paola Velásquez' },
    summary: {
      en: 'A 20-hour hybrid programme on theory of change and the measurement and valuation of social impact for practitioners.',
      es: 'Un programa híbrido de 20 horas sobre teoría de cambio y la medición y valoración del impacto social para equipos de práctica.',
    },
    highlights: {
      en: ['Eight sessions in two blocks', 'Virtual and on-site sessions'],
      es: ['Ocho sesiones en dos bloques', 'Sesiones virtuales y presenciales'],
    },
  },
  {
    id: 'curso-proyectos-sostenibles',
    href: '/curso-proyectos-sostenibles/',
    term: '2026-2',
    title: { en: 'Formulating and Evaluating Sustainable Projects', es: 'Formulación y Evaluación de Proyectos Sostenibles' },
    program: {
      en: 'MSc in Sustainable Finance and Climate Change · Universidad EAFIT',
      es: 'Maestría en Finanzas Sostenibles y Cambio Climático · Universidad EAFIT',
    },
    summary: {
      en: 'Students formulate and evaluate a real agroforestry cocoa project with nature-based revenues and defend it before an investment committee with assigned roles — a bank, an impact fund and others.',
      es: 'Los estudiantes formulan y evalúan un proyecto real de cacao agroforestal con ingresos de naturaleza y lo defienden ante un comité de inversión con roles asignados: un banco, un fondo de impacto y otros.',
    },
    highlights: {
      en: ['No exams: cross-audits and peer assessment', 'AI expected, with prompts documented and every figure checked against a primary source', 'Private vs social NPV and carbon switching values'],
      es: ['Sin exámenes: auditorías cruzadas y co-evaluación', 'IA esperada, con prompts documentados y cada cifra verificada contra fuente primaria', 'VPN privado frente a VPN social y valores de cambio del carbono'],
    },
  },
  {
    id: 'mgis-instrumentos-financiacion',
    href: '/mgis-instrumentos-financiacion/',
    term: '2026',
    title: { en: 'New Financing Instruments for the Social Sector', es: 'Nuevos Instrumentos de Financiación del Sector Social' },
    program: {
      en: 'MSc in Social Management and Innovation (MGIS) · Universidad EAFIT',
      es: 'Maestría en Gerencia e Innovación Social (MGIS) · Universidad EAFIT',
    },
    summary: {
      en: 'The impact-finance ecosystem and its instruments — social and development impact bonds, results-based financing, green and social bonds, ESG — ending with a term sheet students structure themselves.',
      es: 'El ecosistema de financiamiento de impacto y sus instrumentos —bonos de impacto social y de desarrollo, financiamiento basado en resultados, bonos verdes y sociales, ESG— con un term sheet que los estudiantes estructuran como entrega final.',
    },
    highlights: {
      en: ['Declared use of AI tools, verified against primary sources', 'Six sessions, three units, one term sheet'],
      es: ['Uso declarado de herramientas de IA, verificado contra fuentes primarias', 'Seis sesiones, tres unidades, un term sheet'],
    },
  },
];

// Source: the teaching pages of the previous site (_teaching/).
export const courses: Course[] = [
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
      en: 'Summer School on Biodiversity, Bioeconomy and Climate Change (2023)',
      es: 'Escuela de verano sobre biodiversidad, bioeconomía y cambio climático (2023)',
    },
    image: csa,
    summary: {
      en: 'The puzzle of climate change, its place in economics, and the controversies around defining and measuring climate-smart agriculture.',
      es: 'El rompecabezas del cambio climático, su lugar en la economía y las controversias sobre cómo definir y medir la agricultura climáticamente inteligente.',
    },
    link: 'https://www.canva.com/design/DAFuLvpxO9I/view',
  },
  {
    id: 'desarrollo',
    title: { en: 'Economic Growth and Development', es: 'Desarrollo y crecimiento económico' },
    where: { en: 'Universidad EAFIT', es: 'Universidad EAFIT' },
    image: desarrollo,
    link: 'https://economicgrowth.github.io/',
    summary: {
      en: 'Why do some nations grow steadily while others do not? Classical, neoclassical, exogenous and endogenous growth models, and the critiques that led to new theories of growth and development.',
      es: '¿Por qué algunas naciones crecen de manera sostenida y otras no? Modelos clásicos, neoclásicos, de crecimiento exógeno y endógeno, y las críticas que dieron paso a las nuevas teorías del crecimiento y el desarrollo.',
    },
  },
  {
    id: 'tecnicas',
    title: { en: 'Techniques of Economic Measurement', es: 'Técnicas de medición económica' },
    where: { en: 'Universidad EAFIT', es: 'Universidad EAFIT' },
    image: tecnicas,
    summary: {
      en: 'A critical view of the questions economics asks and the measurement methods used to answer, validate and contrast them — their reach, limits and ethics.',
      es: 'Una visión crítica de los tipos de preguntas que se hace la economía y de los métodos de medición con que se responden, validan y contrastan: su alcance, sus límites y su ética.',
    },
  },
  {
    id: 'seminario',
    title: { en: 'Research Seminar', es: 'Seminario de investigación' },
    where: { en: 'Universidad EAFIT', es: 'Universidad EAFIT' },
    image: seminario,
    summary: {
      en: 'Planning, designing, executing and communicating applied economics research: from a well-posed question and objectives to theory, methods and dissemination, through case studies and students’ own projects.',
      es: 'Planear, diseñar, ejecutar y divulgar investigación en economía aplicada: de una buena pregunta y sus objetivos al marco teórico, los métodos y la divulgación, a partir de casos y de los proyectos de los estudiantes.',
    },
  },
  {
    id: 'gis',
    title: { en: 'GIS for Applied Economics', es: 'SIG para economía aplicada' },
    where: { en: 'Universitat Pompeu Fabra (until 2019)', es: 'Universitat Pompeu Fabra (hasta 2019)' },
    image: gis,
    summary: {
      en: 'A crash course in the spatial data analysis toolbox and the empirical problems of applied economics it can solve.',
      es: 'Un curso intensivo sobre la caja de herramientas del análisis de datos espaciales y los problemas empíricos de la economía aplicada que permite resolver.',
    },
    link: 'https://gisforappliedeconomics.github.io/',
  },
];
