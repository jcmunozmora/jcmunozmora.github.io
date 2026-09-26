import { SITE } from '../i18n/ui';

export function personJsonLd(siteUrl: URL, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': new URL('/#person', siteUrl).href,
    name: SITE.name,
    url: siteUrl.href,
    image: new URL('/og/default.png', siteUrl).href,
    email: `mailto:${SITE.email}`,
    jobTitle: 'Professor of Development Economics',
    description,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad EAFIT',
      url: 'https://www.eafit.edu.co',
      address: { '@type': 'PostalAddress', addressLocality: 'Medellín', addressCountry: 'CO' },
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Université libre de Bruxelles (ECARES)' },
      { '@type': 'CollegeOrUniversity', name: 'Universitat Pompeu Fabra' },
      { '@type': 'CollegeOrUniversity', name: 'Universidad de los Andes' },
      { '@type': 'CollegeOrUniversity', name: 'Universidad de Antioquia' },
    ],
    knowsAbout: [
      'Development economics',
      'Territorial development',
      'Impact evaluation',
      'Social return on investment',
      'Land tenure',
      'Fiscal capacity',
      'Rural development',
    ],
    identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: SITE.orcid },
    sameAs: [`https://orcid.org/${SITE.orcid}`, SITE.scholar, SITE.linkedin, SITE.github, SITE.x, SITE.researchgate],
  };
}
