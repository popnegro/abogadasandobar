import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE_URL = 'https://abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-home.webp`;
const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#legal-service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const ROUTES = {
  '/': {
    title: 'Emilia Sandobar | Abogada Penalista en Mendoza',
    description: 'Emilia Sandobar es abogada penalista en Mendoza. Brinda asesoramiento, defensa y representación jurídica en asuntos penales y vinculados con personas y organizaciones.',
  },
  '/inicio': {
    title: 'Emilia Sandobar | Abogada Penalista en Mendoza',
    description: 'Emilia Sandobar es abogada penalista en Mendoza. Brinda asesoramiento, defensa y representación jurídica en asuntos penales y vinculados con personas y organizaciones.',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Abogacía en Mendoza | Emilia Sandobar',
    description: 'Servicios de abogacía en Mendoza de Emilia Sandobar: defensa penal, litigación y asesoramiento jurídico para personas, empresas y organizaciones.',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Emilia Sandobar',
    description: 'Emilia Sandobar es abogada penalista en Mendoza. Esta página reúne información sobre su perfil profesional y su actividad de asesoramiento y litigación penal.',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Emilia Sandobar, Abogada Penalista',
    description: 'Conozca el método de trabajo de Emilia Sandobar para analizar cada situación jurídica, definir una estrategia y acompañar una consulta profesional.',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Abogada Penalista en Mendoza',
    description: 'Preguntas frecuentes sobre la atención profesional de Emilia Sandobar, abogada penalista en Mendoza, y sobre cómo orientar una primera consulta jurídica.',
  },
  '/contacto': {
    title: 'Contacto | Emilia Sandobar, Abogada Penalista en Mendoza',
    description: 'Contacto de Emilia Sandobar, abogada penalista en Mendoza, para solicitar una consulta y recibir orientación sobre una situación jurídica.',
  },
};

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
    url: 'https://www.diariouno.com.ar/ovacion/hubo-dos-nuevos-allanamientos-el-caso-los-certificados-truchos-la-liga-mendocina-futbol-n1453036',
  },
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const canonicalPath = (path) => (path === '/inicio' ? '/' : path);

function buildJsonLd(path, metadata) {
  const canonicalUrl = `${SITE_URL}${canonicalPath(path)}`;
  const breadcrumbItems = path === '/'
    ? [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }]
    : [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: metadata.title.split(' | ')[0], item: canonicalUrl },
      ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'Dra. Emilia Sandobar',
        description: 'Sitio web profesional de la Dra. Emilia Sandobar, abogada en Mendoza.',
        inLanguage: 'es-AR',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: metadata.title,
        description: metadata.description,
        inLanguage: 'es-AR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        provider: { '@id': SERVICE_ID },
        breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
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
        image: DEFAULT_IMAGE,
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
  };
}

const source = await readFile('dist/index.html', 'utf8');
const jsonLdPattern = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;

for (const [path, metadata] of Object.entries(ROUTES)) {
  const canonicalUrl = `${SITE_URL}${canonicalPath(path)}`;
  const jsonLd = JSON.stringify(buildJsonLd(path, metadata), null, 2);

  let html = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`)
    .replace(/<meta property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`)
    .replace(/<meta name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*"\s*\/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    .replace(jsonLdPattern, `<script type="application/ld+json">\n${jsonLd}\n  </script>`);

  const outputPath = path === '/' ? 'dist/index.html' : join('dist', path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Static SEO HTML generated for ${Object.keys(ROUTES).length} routes.`);
