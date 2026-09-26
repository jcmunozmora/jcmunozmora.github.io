import type { ImageMetadata } from 'astro';

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

// Featured project. Facts: CV (grants) and the abstracts of its two SSRN working papers.
export const featured: Project = {
  id: 'hogares-saludables',
  title: {
    en: 'Hogares Saludables: what a better home changes',
    es: 'Hogares Saludables: lo que cambia una mejor vivienda',
  },
  partner: {
    en: 'Impact evaluation for Cementos Argos, with the Inter-American Development Bank · 2023–2024',
    es: 'Evaluación de impacto para Cementos Argos, con el Banco Interamericano de Desarrollo · 2023–2024',
  },
  pillar: 'both',
  summary: {
    en: 'A cluster randomised evaluation of interior housing upgrades for low-income urban households in three Colombian cities.',
    es: 'Una evaluación aleatorizada por conglomerados de mejoras al interior de viviendas de hogares urbanos de bajos ingresos en tres ciudades de Colombia.',
  },
  body: {
    en: [
      'Hogares Saludables upgrades kitchens, floors and bathrooms and adds a 40-hour construction and life-skills course. We evaluated it with a cluster randomised controlled trial covering 1,163 low-income urban households in three Colombian cities.',
      'The intervention improved mental health, reduced fever among children under six, lowered unemployment and debt and raised income expectations; it did not change domestic violence or family harmony. Thirty-one percent of treated households made further improvements on their own, which suggests that interior upgrades work as a catalyst for continued investment.',
      'A companion study sent engineers into informal dwellings and trained an AI model on 11,000 photographs to rate housing quality, linking it to well-being and rental values.',
    ],
    es: [
      'Hogares Saludables mejora cocinas, pisos y baños y suma un curso de 40 horas de construcción y habilidades para la vida. Lo evaluamos con un experimento aleatorizado por conglomerados con 1.163 hogares urbanos de bajos ingresos en tres ciudades de Colombia.',
      'La intervención mejoró la salud mental, redujo la fiebre en niños menores de seis años, bajó el desempleo y el endeudamiento y elevó las expectativas de ingreso; no cambió la violencia doméstica ni la armonía familiar. El 31% de los hogares tratados hizo mejoras adicionales por su cuenta, lo que sugiere que mejorar el interior de la vivienda impulsa nuevas inversiones.',
      'Un estudio complementario llevó ingenieros a viviendas informales y entrenó un modelo de IA con 11.000 fotografías para calificar su calidad, y la relacionó con el bienestar y el valor de arriendo.',
    ],
  },
};
