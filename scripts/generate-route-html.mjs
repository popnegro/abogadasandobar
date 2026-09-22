import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE_URL = 'https://abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-home.webp`;
const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#legal-service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Must stay aligned with src/utils/useRouteMetadata.ts (SEO on-page). */
const ROUTES = {
  '/': {
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza',
  },
  '/inicio': {
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Abogacía en Mendoza | Defensa Penal y Urgencias 24 hs',
    description:
      'Abogada penal en Mendoza: defensa penal, urgencias 24 hs, litigación compleja y asesoramiento corporativo especializado.',
    image: `${SITE_URL}/assets/images/hero/hero-services.webp`,
    imageAlt: 'Servicios de abogacía penal en Mendoza — Emilia Sandobar',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Especializada en Derecho Penal | Emilia Sandobar',
    description:
      'Emilia Sandobar, abogada penalista en Mendoza especializada en derecho penal. Litigio provincial y federal, con guardia legal 24 hs.',
    image: `${SITE_URL}/assets/images/hero/hero-about.webp`,
    imageAlt: 'Perfil de Emilia Sandobar, abogada penalista en Mendoza',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Abogada Penalista en Mendoza | Emilia Sandobar',
    description:
      'Método de trabajo de la abogada penalista Emilia Sandobar: análisis, estrategia y acompañamiento en causas penales en Mendoza.',
    image: `${SITE_URL}/assets/images/hero/hero-method.webp`,
    imageAlt: 'Método de trabajo — abogada penalista Emilia Sandobar',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Abogada Penalista 24 hs en Mendoza',
    description:
      'FAQ abogada penalista en Mendoza: contactar guardia 24 hs, qué hacer si me detienen, y diferencia entre abogada penal y penalista.',
    image: `${SITE_URL}/assets/images/hero/hero-faq.webp`,
    imageAlt: 'Preguntas frecuentes — abogada penalista en Mendoza',
  },
  '/contacto': {
    title: 'Contacto | Abogada Penalista en Mendoza | Guardia Legal 24 hs',
    description:
      'Contacte a Emilia Sandobar, abogada penalista en Mendoza. Consulta profesional y guardia legal 24 hs para urgencias penales.',
    image: `${SITE_URL}/assets/images/hero/hero-contact.webp`,
    imageAlt: 'Contacto y guardia legal 24 hs — Emilia Sandobar',
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
        about: { '@id': SERVICE_ID },
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
        jobTitle: 'Abogada Penalista',
        url: `${SITE_URL}/abogada-penalista-mendoza`,
        image: `${SITE_URL}/assets/images/portraits/emilia-sandobar.webp`,
        worksFor: { '@id': SERVICE_ID },
        knowsAbout: [
          'Derecho Penal',
          'Abogada penalista',
          'Litigación penal',
          'Urgencias penales 24 hs',
          'Asesoramiento corporativo',
          'Reclamos indemnizatorios',
        ],
        subjectOf: AUTHORITY_SOURCES,
      },
      {
        '@type': 'LegalService',
        '@id': SERVICE_ID,
        name: 'Dra. Emilia Sandobar',
        url: `${SITE_URL}/`,
        image: DEFAULT_IMAGE,
        logo: `${SITE_URL}/assets/brand/logo-brandmark.svg`,
        description:
          'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs para particulares, empresas y directivos, con atención profesional y confidencial.',
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

const OG_IMAGE_WIDTH = '1376';
const OG_IMAGE_HEIGHT = '768';

for (const [path, metadata] of Object.entries(ROUTES)) {
  const canonicalUrl = `${SITE_URL}${canonicalPath(path)}`;
  const jsonLd = JSON.stringify(buildJsonLd(path, metadata), null, 2);
  const image = metadata.image || DEFAULT_IMAGE;
  const imageAlt = metadata.imageAlt || 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza';

  let html = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`)
    .replace(/<meta property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`)
    .replace(/<meta name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${image}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*"\s*\/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    .replace(jsonLdPattern, `<script type="application/ld+json">\n${jsonLd}\n  </script>`);

  if (!html.includes('property="og:image:width"')) {
    html = html.replace(
      /<meta property="og:image:alt" content="[^"]*"\s*\/>/,
      (match) => `${match}\n  <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />\n  <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    );
  } else {
    html = html
      .replace(/<meta property="og:image:width" content="[^"]*"\s*\/>/, `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`)
      .replace(/<meta property="og:image:height" content="[^"]*"\s*\/>/, `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`);
  }

  if (!html.includes('name="twitter:image:alt"')) {
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"\s*\/>/,
      (match) => `${match}\n  <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    );
  } else {
    html = html.replace(
      /<meta name="twitter:image:alt" content="[^"]*"\s*\/>/,
      `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    );
  }

  const outputPath = path === '/' ? 'dist/index.html' : join('dist', path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Static SEO HTML generated for ${Object.keys(ROUTES).length} routes.`);
