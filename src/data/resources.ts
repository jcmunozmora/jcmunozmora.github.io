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

// Open materials: code and data to reuse. Course sites live in Teaching. Replication packages come from Zenodo (DOI).
export type Material = { id: string; kind: 'site' | 'replication'; title: Bi; summary: Bi; href: string };

export const materials: Material[] = [
  {
    id: 'fxs-replication',
    kind: 'replication',
    title: {
      en: 'Replication package — When Do Property Rights Reduce Illicit Crops?',
      es: 'Paquete de replicación — When Do Property Rights Reduce Illicit Crops?',
    },
    summary: {
      en: 'Code and data to reproduce the results of the working paper (with Martínez-González and López-Uribe).',
      es: 'Código y datos para reproducir los resultados del documento de trabajo (con Martínez-González y López-Uribe).',
    },
    href: 'https://doi.org/10.5281/zenodo.20559381',
  },
];
