import { CONTACT_INFO } from './contactData';
import { ASSETS } from './lawyerData';

const SITE_URL = 'https://abogadasandobar.com.ar';

export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Dra. Emilia Sandobar',
      inLanguage: 'es-AR',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Emilia Sandobar',
      jobTitle: 'Abogada',
      image: `${SITE_URL}${ASSETS.portrait}`,
    },
    {
      '@type': 'LegalService',
      '@id': `${SITE_URL}/#legal-service`,
      name: 'Dra. Emilia Sandobar',
      url: SITE_URL,
      image: `${SITE_URL}${ASSETS.heroOffice}`,
      description:
        'Asesoramiento y representación jurídica para particulares, empresas y directivos, con atención profesional y confidencial.',
      areaServed: {
        '@type': 'City',
        name: 'Mendoza',
        containedInPlace: {
          '@type': 'Country',
          name: 'Argentina',
        },
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Peatonal Sarmiento 250, 2do piso oficina B',
        addressLocality: 'Mendoza',
        addressCountry: 'AR',
      },
      email: CONTACT_INFO.email,
      telephone: CONTACT_INFO.phone,
      provider: {
        '@id': `${SITE_URL}/#person`,
      },
      serviceType: [
        'Derecho Penal',
        'Soluciones legales a empresas',
        'Representación penal y seguros',
        'Reclamos indemnizatorios',
      ],
    },
  ],
} as const;
