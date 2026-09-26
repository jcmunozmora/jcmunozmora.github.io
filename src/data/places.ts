// Places where the projects in the CV happened. A project names places by key in src/lib/profile.ts.
// A subnational place belongs to its country, so the map counts countries once.
type Bi = { en: string; es: string };
export type Place = { name: Bi; country: string; lat: number; lon: number };

const country = (en: string, es: string, lat: number, lon: number, code: string): Place => ({ name: { en, es }, country: code, lat, lon });

export const PLACES = {
  co: country('Colombia', 'Colombia', 4.71, -74.07, 'co'),
  'co-ant': { name: { en: 'Antioquia', es: 'Antioquia' }, country: 'co', lat: 6.24, lon: -75.57 },
  'co-ura': { name: { en: 'Urabá', es: 'Urabá' }, country: 'co', lat: 8.09, lon: -76.73 },
  'co-val': { name: { en: 'Valle del Cauca', es: 'Valle del Cauca' }, country: 'co', lat: 3.45, lon: -76.53 },
  'co-atl': { name: { en: 'Atlántico', es: 'Atlántico' }, country: 'co', lat: 10.96, lon: -74.8 },
  'co-cun': { name: { en: 'Cundinamarca', es: 'Cundinamarca' }, country: 'co', lat: 4.9, lon: -74.3 },
  ec: country('Ecuador', 'Ecuador', -2.9, -79.0, 'ec'),
  py: country('Paraguay', 'Paraguay', -25.28, -57.63, 'py'),
  pe: country('Peru', 'Perú', -12.05, -77.04, 'pe'),
  bo: country('Bolivia', 'Bolivia', -16.5, -68.15, 'bo'),
  ve: country('Venezuela', 'Venezuela', 10.49, -66.88, 've'),
  gt: country('Guatemala', 'Guatemala', 14.63, -90.51, 'gt'),
  hn: country('Honduras', 'Honduras', 14.08, -87.21, 'hn'),
  ni: country('Nicaragua', 'Nicaragua', 12.11, -86.24, 'ni'),
  sv: country('El Salvador', 'El Salvador', 13.69, -89.22, 'sv'),
  ph: country('Philippines', 'Filipinas', 14.6, 120.98, 'ph'),
  id: country('Indonesia', 'Indonesia', -6.91, 107.61, 'id'),
  bi: country('Burundi', 'Burundi', -3.38, 29.36, 'bi'),
  zm: country('Zambia', 'Zambia', -15.42, 28.28, 'zm'),
  zw: country('Zimbabwe', 'Zimbabue', -20.15, 28.58, 'zw'),
  ke: country('Kenya', 'Kenia', 0.06, 34.29, 'ke'),
  cm: country('Cameroon', 'Camerún', 4.6, 8.8, 'cm'),
  es: country('Spain', 'España', 39.47, -0.38, 'es'),
  it: country('Italy', 'Italia', 41.9, 12.5, 'it'),
  hu: country('Hungary', 'Hungría', 47.5, 19.04, 'hu'),
  uk: country('United Kingdom', 'Reino Unido', 51.51, -0.13, 'uk'),
  tr: country('Türkiye', 'Turquía', 39.78, 30.52, 'tr'),
  kz: country('Kazakhstan', 'Kazajistán', 43.24, 76.89, 'kz'),
} satisfies Record<string, Place>;

export type PlaceKey = keyof typeof PLACES;
