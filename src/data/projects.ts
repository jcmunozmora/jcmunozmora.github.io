import type { ImageMetadata } from 'astro';
import catastro from '../assets/img/catastro_departamental.png';

type Bi = { en: string; es: string };

export type Project = {
  id: string;
  title: Bi;
  partner: Bi;
  pillar: 'territory' | 'method' | 'both';
  summary: Bi;
  image?: ImageMetadata;
  href?: string;
  pdf?: string;
  body?: { en: string[]; es: string[] };
};

// Featured project. Source: _projects/1_project.md of the previous site.
export const featured: Project = {
  id: 'catastro',
  title: {
    en: 'Simplifying cadastral management in Antioquia and Medellín',
    es: 'Simplificación de la gestión catastral en Antioquia y Medellín',
  },
  partner: {
    en: 'Transfer of Spanish good practices towards multipurpose cadastre · with Spain’s Dirección General del Catastro',
    es: 'Transferencia de buenas prácticas españolas hacia el catastro multipropósito · con la Dirección General del Catastro de España',
  },
  pillar: 'both',
  image: catastro,
  pdf: '/pdf/works/Informe_Catastro.pdf',
  summary: {
    en: 'Diagnosis and co-created recommendations to simplify cadastral and registry processes in Antioquia and Medellín under Colombia’s multipurpose cadastre.',
    es: 'Diagnóstico y recomendaciones co-creadas para simplificar los procesos catastrales y registrales de Antioquia y Medellín en el marco del catastro multipropósito.',
  },
  body: {
    en: [
      'Colombia’s cadastre has traditionally served to identify, measure and register plots to raise property-tax revenue. The multipurpose approach turns it into a strategic planning tool for land use, investment and targeting in the regions.',
      'Working with the experience of Spain’s Dirección General del Catastro, the project mapped the challenges of cadastral management in Antioquia and Medellín: scarce qualified staff, budget constraints for updating information, weak interoperability between cadastre and registry, and the sustainability of processes under current regulation.',
      'The proposals include a simplified, general-purpose cadastral data model, a single procedural scheme, common valuation models, an orthophoto programme for mapping, and a continuous training pathway for cadastral staff.',
    ],
    es: [
      'El catastro en Colombia se ha desarrollado en torno a identificar, medir y registrar predios para generar ingresos por impuestos. El enfoque multipropósito lo convierte en una herramienta de planificación estratégica para el ordenamiento, el uso del suelo, la inversión y la focalización en las regiones.',
      'A partir de la experiencia de la Dirección General del Catastro de España, el proyecto identificó los retos de la gestión catastral en Antioquia y Medellín: escasez de capital humano calificado, restricciones presupuestales para actualizar la información, poca interoperabilidad entre catastro y registro, y la sostenibilidad de los procesos frente a la normatividad.',
      'Las propuestas incluyen un modelo de datos catastral simplificado y de aplicación general, un esquema procedimental único, modelos comunes de valoración, un programa de ortofotos para la cartografía y un itinerario formativo continuo para los funcionarios catastrales.',
    ],
  },
};

// Open project sites published from GitHub (github.com/jcmunozmora/<repo>).
// Descriptions follow each repository's own description.
export const repos: Project[] = [
  {
    id: 'sroi-meta-analysis',
    href: '/sroi-meta-analysis/',
    pillar: 'method',
    title: {
      en: 'From Principles to Practice: SROI reporting in the SVI database',
      es: 'De los principios a la práctica: los informes SROI de la base de SVI',
    },
    partner: { en: 'Replication package and web repository', es: 'Paquete de replicación y repositorio web' },
    summary: {
      en: 'A systematic content analysis of Social Return on Investment reports in the Social Value International database.',
      es: 'Un análisis sistemático de contenido de los informes de Retorno Social de la Inversión en la base de datos de Social Value International.',
    },
  },
  {
    id: 'mgis-instrumentos-financiacion',
    href: '/mgis-instrumentos-financiacion/',
    pillar: 'method',
    title: {
      en: 'New financing instruments for the social sector',
      es: 'Nuevos instrumentos de financiación del sector social',
    },
    partner: { en: 'MGIS · Universidad EAFIT', es: 'MGIS · Universidad EAFIT' },
    summary: {
      en: 'Course site on new instruments to finance the social sector.',
      es: 'Sitio del curso sobre nuevos instrumentos para financiar el sector social.',
    },
  },
  {
    id: 'pulso_antioquia',
    href: '/pulso_antioquia/',
    pillar: 'territory',
    title: { en: 'Pulso Social Antioquia', es: 'Pulso Social Antioquia' },
    partner: { en: 'Open repository', es: 'Repositorio abierto' },
    summary: {
      en: 'The Pulso Social repository for Antioquia.',
      es: 'El repositorio de Pulso Social para Antioquia.',
    },
  },
  {
    id: 'food-perception-rural-colombia',
    href: '/food-perception-rural-colombia/',
    pillar: 'territory',
    title: { en: 'Food perception in rural Colombia', es: 'Percepción alimentaria en la Colombia rural' },
    partner: { en: 'Paper repository', es: 'Repositorio del artículo' },
    summary: {
      en: 'The repository for the paper on food perception in rural Colombia.',
      es: 'El repositorio del artículo sobre percepción alimentaria en la Colombia rural.',
    },
  },
];
