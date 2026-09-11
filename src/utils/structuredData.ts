const SITE_URL = 'https://www.abogadasandobar.com.ar';

const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#legal-service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export interface StructuredPage {
  path: string;
  title: string;
  description: string;
}

const SERVICE_TYPES = [
  'Derecho Penal',
  'Litigación penal',
  'Asesoramiento corporativo',
  'Representación penal y seguros',
  'Reclamos indemnizatorios',
];

function upsertJsonLd(id: string, data: unknown) {
  let script = document.head.querySelector<HTMLScriptElement>(`script[data-structured-data="${id}"]`);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.structuredData = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function updateStructuredData(page: StructuredPage) {
  const canonicalUrl = `${SITE_URL}${page.path === '/inicio' ? '/' : page.path}`;
  const breadcrumbItems = page.path === '/'
    ? [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' }]
    : [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: page.title.split(' | ')[0], item: canonicalUrl },
      ];

  upsertJsonLd('entity', {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Emilia Sandobar',
        jobTitle: 'Abogada',
        url: `${SITE_URL}/abogada-penalista-mendoza`,
        image: `${SITE_URL}/assets/images/portraits/emilia-sandobar.webp`,
        worksFor: { '@id': SERVICE_ID },
        knowsAbout: SERVICE_TYPES,
      },
      {
        '@type': 'LegalService',
        '@id': SERVICE_ID,
        name: 'Dra. Emilia Sandobar',
        url: SITE_URL + '/',
        image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
        logo: `${SITE_URL}/assets/brand/logo-brandmark.svg`,
        description: 'Asesoramiento y representación jurídica para particulares, empresas y directivos, con atención profesional y confidencial.',
        areaServed: {
          '@type': 'City',
          name: 'Mendoza',
          containedInPlace: { '@type': 'Country', name: 'Argentina' },
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Peatonal Sarmiento 250, 2do piso oficina B',
          addressLocality: 'Mendoza',
          addressCountry: 'AR',
        },
        email: 'info@abogadasandobar.com.ar',
        telephone: '+54 9 261 346-4483',
        provider: { '@id': PERSON_ID },
        serviceType: SERVICE_TYPES,
      },
    ],
  });

  upsertJsonLd('page', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    inLanguage: 'es-AR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    provider: { '@id': SERVICE_ID },
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
  });

  upsertJsonLd('breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  });

  upsertJsonLd('website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL + '/',
    name: 'Dra. Emilia Sandobar',
    description: 'Sitio web profesional de la Dra. Emilia Sandobar, abogada en Mendoza.',
    inLanguage: 'es-AR',
    publisher: { '@id': PERSON_ID },
  });
}
