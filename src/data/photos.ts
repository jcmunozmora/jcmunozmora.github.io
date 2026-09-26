import type { ImageMetadata } from 'astro';
import valle from '../assets/photos/general-valle-rio-aereo-antioquia.jpg';
import colinas from '../assets/photos/territorio-colinas-eje-cafetero.jpg';
import parcelas from '../assets/photos/medicion-parcelas-geometricas-aereo.jpg';
import mosaico from '../assets/photos/medicion-mosaico-parcelas-aereo.jpg';
import niebla from '../assets/photos/hero-niebla-montanas-quindio.jpg';
import medellin from '../assets/photos/general-medellin-ladera-urbana.jpg';
import finca from '../assets/photos/territorio-finca-ladera-sierra-nevada.jpg';
import cordilleras from '../assets/photos/hero-cordilleras-antioquia.jpg';

export type Photo = {
  src: ImageMetadata;
  alt: { en: string; es: string };
  place: string;
  author: string;
  url: string;
  focus?: string;
};

// Unsplash License. Full credits in src/assets/photos/CREDITS.md.
// Only label a place as Colombian when the photo page says so.
const photo = (p: Photo) => p;

export const photos = {
  valle: photo({
    src: valle,
    alt: { en: 'Aerial view of an Andean valley and river near Medellín', es: 'Vista aérea de un valle andino y su río cerca de Medellín' },
    place: 'Antioquia, Colombia',
    author: 'Dimitry B',
    url: 'https://unsplash.com/photos/kMO9FvbJM7E',
    focus: '50% 55%',
  }),
  colinas: photo({
    src: colinas,
    alt: { en: 'Rolling hills and pastures in the coffee region', es: 'Colinas y potreros en el Eje Cafetero' },
    place: 'Quindío, Colombia',
    author: 'Michael Lechner',
    url: 'https://unsplash.com/photos/eboyXRgq0R4',
    focus: '50% 70%',
  }),
  parcelas: photo({
    src: parcelas,
    alt: { en: 'Aerial view of rectangular farm plots beside a road', es: 'Vista aérea de parcelas rectangulares junto a una carretera' },
    place: 'Waterloo, Canada',
    author: 'Sveta Fedarava',
    url: 'https://unsplash.com/photos/tI_Odb7ZU6M',
  }),
  mosaico: photo({
    src: mosaico,
    alt: { en: 'Patchwork of fields seen from a plane', es: 'Mosaico de parcelas visto desde un avión' },
    place: 'Stansted, United Kingdom',
    author: 'Nik Ramzi Nik Hassan',
    url: 'https://unsplash.com/photos/jvMKd38zuUE',
    focus: '50% 60%',
  }),
  niebla: photo({
    src: niebla,
    alt: { en: 'Low clouds over Andean slopes in Cocora', es: 'Niebla baja sobre laderas andinas en Cocora' },
    place: 'Salento, Quindío, Colombia',
    author: 'Juan Manuel Núñez Méndez',
    url: 'https://unsplash.com/photos/gagbXVp6poM',
    focus: '50% 60%',
  }),
  medellin: photo({
    src: medellin,
    alt: { en: 'Medellín’s hillside neighbourhoods and mountains', es: 'Las laderas y montañas de Medellín' },
    place: 'Medellín, Colombia',
    author: 'David Gabrić',
    url: 'https://unsplash.com/photos/kNy4Nw-BbLk',
    focus: '50% 45%',
  }),
  finca: photo({
    src: finca,
    alt: { en: 'A smallholder farm on a mountain slope', es: 'Una finca campesina en una ladera' },
    place: 'Sierra Nevada de Santa Marta, Colombia',
    author: 'Giselle Cucunubá Manes',
    url: 'https://unsplash.com/photos/M7JWrcfo67k',
    focus: '50% 75%',
  }),
  cordilleras: photo({
    src: cordilleras,
    alt: { en: 'Mountain ranges at sunset in Antioquia', es: 'Cordilleras al atardecer en Antioquia' },
    place: 'Santa Bárbara, Antioquia, Colombia',
    author: 'Andres F. Uran',
    url: 'https://unsplash.com/photos/78-ahPScEM4',
    focus: '50% 70%',
  }),
};
