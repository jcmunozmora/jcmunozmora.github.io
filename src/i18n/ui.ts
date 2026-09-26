export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;

export type RouteKey = 'home' | 'research' | 'projects' | 'teaching' | 'activity';

// Parallel routes: every page exists in both languages under these paths.
export const routes: Record<RouteKey, Record<Lang, string>> = {
  home: { en: '/', es: '/es/' },
  research: { en: '/research/', es: '/es/investigacion/' },
  projects: { en: '/projects/', es: '/es/proyectos/' },
  teaching: { en: '/teaching/', es: '/es/docencia/' },
  activity: { en: '/activity/', es: '/es/actividad/' },
};

export const SITE = {
  name: 'Juan Carlos Muñoz-Mora',
  email: 'jmunozm1@eafit.edu.co',
  orcid: '0000-0002-7304-8115',
  linkedin: 'https://www.linkedin.com/in/juan-carlos-munoz-mora-996008a8/',
  linkedinActivity: 'https://www.linkedin.com/in/juan-carlos-munoz-mora-996008a8/recent-activity/all/',
  github: 'https://github.com/jcmunozmora',
  x: 'https://x.com/jcmunozmora',
  researchgate: 'https://www.researchgate.net/profile/Juan_Munoz-Mora',
  slides: '/slides/',
};

export const ui = {
  en: {
    'meta.description':
      'Juan Carlos Muñoz-Mora is a development economist at Universidad EAFIT working where territorial development meets rigorous impact evaluation.',
    'nav.research': 'Research',
    'nav.projects': 'Projects',
    'nav.teaching': 'Teaching',
    'nav.activity': 'Activity',
    'nav.talks': 'Talks',
    'nav.skip': 'Skip to content',
    'theme.toggle': 'Toggle dark mode',
    'lang.switch': 'Leer en español',
    'hero.role': 'Development economist · Universidad EAFIT, Medellín',
    'hero.tagline': 'Where rigorous evidence meets territorial reality.',
    'hero.bio':
      'I study how territories develop — land, fiscal capacity, rural livelihoods and technology adoption — and I measure whether public and social investments create lasting value, combining experimental and quasi-experimental designs, mixed methods and social return on investment.',
    'hero.cta.research': 'Explore the research',
    'hero.cta.contact': 'Get in touch',
    'pillars.eyebrow': 'Two pillars, one question',
    'pillars.territory.title': 'Territorial development',
    'pillars.territory.body':
      'Fiscal capacity, cadastre and land tenure, rural development and technology adoption — with most of the evidence rooted in Colombia.',
    'pillars.method.title': 'Impact & social value',
    'pillars.method.body':
      'Impact evaluation with RCTs and quasi-experiments, mixed methods, SROI and monitoring, evaluation and learning systems that decision-makers can use.',
    'pillars.both': 'Measuring what matters in the territory.',
    'home.selected': 'Selected publications',
    'home.activity': 'Recent activity',
    'home.allPubs': 'All publications',
    'home.allActivity': 'All activity',
    'research.title': 'Research',
    'research.lede':
      'Peer-reviewed articles, books and policy reports on land, conflict, rural economies and the measurement of development outcomes.',
    'research.articles': 'Articles',
    'research.books': 'Books & chapters',
    'research.policy': 'Policy reports',
    'research.scholar': 'Full record on ORCID',
    'pub.abstract': 'Abstract',
    'pub.selected': 'Selected',
    'projects.title': 'Projects',
    'projects.lede':
      'Applied work with governments, universities and international organisations, and the open repositories that document it.',
    'projects.featured': 'Featured project',
    'projects.repos': 'Open project sites',
    'projects.visit': 'Visit project site',
    'teaching.title': 'Teaching',
    'teaching.lede':
      'Courses and lectures on development, economic measurement, research design and the use of AI in research.',
    'teaching.materials': 'Materials',
    'activity.title': 'Activity',
    'activity.lede':
      'Notes, findings and announcements, most of them first published on LinkedIn. Posts appear in the language they were written in.',
    'activity.onLinkedin': 'On LinkedIn',
    'activity.more': 'Follow on LinkedIn',
    'activity.back': 'All activity',
    'activity.rss': 'RSS feed',
    'footer.contact': 'Contact',
    'footer.elsewhere': 'Elsewhere',
    'notfound.title': 'Page not found',
    'notfound.body': 'The page you are looking for does not exist or has moved.',
    'notfound.home': 'Back to the home page',
  },
  es: {
    'meta.description':
      'Juan Carlos Muñoz-Mora es economista del desarrollo en la Universidad EAFIT y trabaja donde el desarrollo territorial se encuentra con la evaluación rigurosa del impacto.',
    'nav.research': 'Investigación',
    'nav.projects': 'Proyectos',
    'nav.teaching': 'Docencia',
    'nav.activity': 'Actividad',
    'nav.talks': 'Charlas',
    'nav.skip': 'Saltar al contenido',
    'theme.toggle': 'Cambiar modo oscuro',
    'lang.switch': 'Read in English',
    'hero.role': 'Economista del desarrollo · Universidad EAFIT, Medellín',
    'hero.tagline': 'Medir lo que importa. Acompañar a quien decide.',
    'hero.bio':
      'Estudio cómo se desarrollan los territorios —tierra, capacidad fiscal, economías rurales y adopción tecnológica— y mido si las inversiones públicas y sociales generan valor duradero, combinando diseños experimentales y cuasi-experimentales, métodos mixtos y retorno social de la inversión.',
    'hero.cta.research': 'Ver la investigación',
    'hero.cta.contact': 'Escríbeme',
    'pillars.eyebrow': 'Dos pilares, una pregunta',
    'pillars.territory.title': 'Desarrollo territorial',
    'pillars.territory.body':
      'Capacidad fiscal, catastro y tenencia de la tierra, desarrollo rural y adopción tecnológica, con la mayor parte de la evidencia anclada en Colombia.',
    'pillars.method.title': 'Impacto y valor social',
    'pillars.method.body':
      'Evaluación de impacto con experimentos y cuasi-experimentos, métodos mixtos, SROI y sistemas de monitoreo, evaluación y aprendizaje que sirvan a quien decide.',
    'pillars.both': 'Medir lo que importa en el territorio.',
    'home.selected': 'Publicaciones seleccionadas',
    'home.activity': 'Actividad reciente',
    'home.allPubs': 'Todas las publicaciones',
    'home.allActivity': 'Toda la actividad',
    'research.title': 'Investigación',
    'research.lede':
      'Artículos con revisión de pares, libros e informes de política sobre tierra, conflicto, economías rurales y la medición de resultados de desarrollo.',
    'research.articles': 'Artículos',
    'research.books': 'Libros y capítulos',
    'research.policy': 'Informes de política',
    'research.scholar': 'Registro completo en ORCID',
    'pub.abstract': 'Resumen',
    'pub.selected': 'Seleccionada',
    'projects.title': 'Proyectos',
    'projects.lede':
      'Trabajo aplicado con gobiernos, universidades y organismos internacionales, y los repositorios abiertos que lo documentan.',
    'projects.featured': 'Proyecto destacado',
    'projects.repos': 'Sitios abiertos de proyectos',
    'projects.visit': 'Ir al sitio del proyecto',
    'teaching.title': 'Docencia',
    'teaching.lede':
      'Cursos y conferencias sobre desarrollo, medición económica, diseño de investigación y el uso de la IA en la investigación.',
    'teaching.materials': 'Materiales',
    'activity.title': 'Actividad',
    'activity.lede':
      'Notas, hallazgos y anuncios, la mayoría publicados primero en LinkedIn. Cada publicación aparece en el idioma en que fue escrita.',
    'activity.onLinkedin': 'En LinkedIn',
    'activity.more': 'Seguir en LinkedIn',
    'activity.back': 'Toda la actividad',
    'activity.rss': 'Feed RSS',
    'footer.contact': 'Contacto',
    'footer.elsewhere': 'En otros sitios',
    'notfound.title': 'Página no encontrada',
    'notfound.body': 'La página que buscas no existe o cambió de lugar.',
    'notfound.home': 'Volver al inicio',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export const t = (lang: Lang) => (key: UIKey) => ui[lang][key];

export const dateFmt = (lang: Lang, d: Date, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }) =>
  d.toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-GB', { ...opts, timeZone: 'UTC' });
