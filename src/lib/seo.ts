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
    jobTitle: 'Development economist',
    description,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad EAFIT',
      url: 'https://www.eafit.edu.co',
      address: { '@type': 'PostalAddress', addressLocality: 'Medellín', addressCountry: 'CO' },
    },
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
    sameAs: [`https://orcid.org/${SITE.orcid}`, SITE.linkedin, SITE.github, SITE.x, SITE.researchgate],
  };
}
