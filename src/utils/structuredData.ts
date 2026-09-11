const SITE_URL = 'https://abogadasandobar.com.ar';

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

const AUTHORITY_SOURCES = [
  {
    '@type': 'CreativeWork',
    name: 'Ciclo de charlas Educación Financiera y Nuevas Tecnologías — UNCUYO',
    url: 'https://fce.uncuyo.edu.ar/se-viene-el-ciclo-de-charlas-educacion-financiera-y-nuevas-tecnologias',
  },
  {
    '@type': 'NewsArticle',
    name: 'Allanaron la Liga Mendocina de Fútbol por presunta falsificación de certificados médicos',
    url: 'https://www.radionihuil.com.ar/allanaron-la-liga-mendocina-de-futbol-por-presunta-falsificacion-de-certificados-medicos/',
  },
  {
    '@type': 'NewsArticle',
    name: 'Hubo dos nuevos allanamientos por los certificados truchos de la Liga Mendocina de Fútbol',
    url: 'https://www.diariouno.com.ar/ovacion/hubo-dos-nuevos-allanamientos-el-caso-los-certificados-truchos-liga-mendocina-futbol-n1453036',
  },
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
    ? [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }]
    : [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
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
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universidad Nacional de Cuyo',
          url: 'https://www.uncuyo.edu.ar/',
        },
        subjectOf: AUTHORITY_SOURCES,
      },
      {
        '@type': 'LegalService',
        '@id': SERVICE_ID,
        name: 'Dra. Emilia Sandobar',
        url: `${SITE_URL}/`,
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

  if (page.path === '/abogada-penalista-mendoza') {
    upsertJsonLd('profile', {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${canonicalUrl}#profile`,
      url: canonicalUrl,
      name: page.title,
      inLanguage: 'es-AR',
      mainEntity: { '@id': PERSON_ID },
    });
  }

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
    url: `${SITE_URL}/`,
    name: 'Dra. Emilia Sandobar',
    description: 'Sitio web profesional de la Dra. Emilia Sandobar, abogada en Mendoza.',
    inLanguage: 'es-AR',
    publisher: { '@id': PERSON_ID },
  });
}
