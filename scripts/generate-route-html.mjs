import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE_URL = 'https://abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-home.webp`;
const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#legal-service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Must stay aligned with src/utils/useRouteMetadata.ts (SEO on-page).
 *  h1/intro must match visible hero copy so crawlers and UI stay consistent.
 */
const ROUTES = {
  '/': {
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza',
    h1: 'Abogada Emilia Sandobar',
    h2: 'Defensa penal y representación de víctimas en Mendoza',
    intro:
      'Emilia Sandobar es abogada penalista en Mendoza especializada en derecho penal. Ofrece defensa penal, representación de víctimas y atención 24 hs para urgencias, con estrategia jurídica rigurosa e intervención profesional directa.',
  },
  '/inicio': {
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza',
    h1: 'Abogada Emilia Sandobar',
    h2: 'Defensa penal y representación de víctimas en Mendoza',
    intro:
      'Emilia Sandobar es abogada penalista en Mendoza especializada en derecho penal. Ofrece defensa penal, representación de víctimas y atención 24 hs para urgencias, con estrategia jurídica rigurosa e intervención profesional directa.',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Abogacía en Mendoza | Defensa Penal y Urgencias 24 hs',
    description:
      'Abogada penal en Mendoza: defensa penal, urgencias 24 hs, litigación compleja y asesoramiento corporativo especializado.',
    image: `${SITE_URL}/assets/images/hero/hero-services.webp`,
    imageAlt: 'Servicios de abogacía penal en Mendoza — Emilia Sandobar',
    h1: 'Servicios de Abogacía en Mendoza',
    intro:
      'Defensa penal, litigación compleja y asesoramiento corporativo para personas y organizaciones que necesitan una estrategia jurídica rigurosa y una intervención profesional directa. Urgencias penales 24 hs en Mendoza.',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Especializada en Derecho Penal | Emilia Sandobar',
    description:
      'Emilia Sandobar, abogada penalista en Mendoza especializada en derecho penal. Litigio provincial y federal, con guardia legal 24 hs.',
    image: `${SITE_URL}/assets/images/hero/hero-about.webp`,
    imageAlt: 'Perfil de Emilia Sandobar, abogada penalista en Mendoza',
    h1: 'Abogada Penalista en Mendoza',
    intro:
      'Emilia Sandobar es abogada penalista en Mendoza especializada en derecho penal. Interviene como abogada penal en causas provinciales y federales, con defensa técnica, representación de víctimas y guardia legal 24 hs para urgencias.',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Abogada Penalista en Mendoza | Emilia Sandobar',
    description:
      'Método de trabajo de la abogada penalista Emilia Sandobar: análisis, estrategia y acompañamiento en causas penales en Mendoza.',
    image: `${SITE_URL}/assets/images/hero/hero-method.webp`,
    imageAlt: 'Método de trabajo — abogada penalista Emilia Sandobar',
    h1: 'Nuestro método jurídico',
    intro:
      'Un proceso de trabajo estructurado para comprender cada situación, evaluar sus riesgos y construir una estrategia jurídica rigurosa en causas penales en Mendoza.',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Abogada Penalista 24 hs en Mendoza',
    description:
      'FAQ abogada penalista en Mendoza: contactar guardia 24 hs, qué hacer si me detienen, y diferencia entre abogada penal y penalista.',
    image: `${SITE_URL}/assets/images/hero/hero-faq.webp`,
    imageAlt: 'Preguntas frecuentes — abogada penalista en Mendoza',
    h1: 'Preguntas frecuentes',
    intro:
      'Respuestas sobre abogada penalista 24 hs en Mendoza, cómo contactar la guardia legal, qué hacer ante una detención y la diferencia entre abogada penal y abogada penalista.',
  },
  '/contacto': {
    title: 'Contacto | Abogada Penalista en Mendoza | Guardia Legal 24 hs',
    description:
      'Contacte a Emilia Sandobar, abogada penalista en Mendoza. Consulta profesional y guardia legal 24 hs para urgencias penales.',
    image: `${SITE_URL}/assets/images/hero/hero-contact.webp`,
    imageAlt: 'Contacto y guardia legal 24 hs — Emilia Sandobar',
    h1: 'Contacto',
    intro:
      'Contacto de Emilia Sandobar, abogada penalista en Mendoza. Solicite una consulta profesional o asistencia de guardia legal 24 hs para urgencias penales.',
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

function buildSeoStaticMain(metadata) {
  const h1 = escapeHtml(metadata.h1 || metadata.title.split(' | ')[0]);
  const h2 = metadata.h2
    ? `<h2 style="font-size:1.35rem;font-weight:700;line-height:1.2;margin:0 0 1rem;color:#d9a9b8">${escapeHtml(metadata.h2)}</h2>`
    : '';
  const intro = escapeHtml(metadata.intro || metadata.description);

  // Inline styles ensure first paint matches the dark hero before CSS/JS load.
  const mainStyle =
    'box-sizing:border-box;min-height:100vh;margin:0;padding:6rem 1.25rem 2rem;' +
    'background:#181614;color:#fff8f2;font-family:Georgia, Times New Roman, serif';

  return (
    `<main id="seo-static-content" data-seo-static="true" style="${mainStyle}">` +
    `<h1 style="font-size:1.75rem;font-weight:700;line-height:1.15;margin:0 0 0.75rem">${h1}</h1>` +
    h2 +
    `<p style="max-width:40rem;font-size:1rem;line-height:1.55;font-weight:300;opacity:0.9;margin:0">${intro}</p>` +
    `<nav aria-label="Secciones principales" style="margin-top:2rem;font-size:0.875rem">` +
    `<ul style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:0.75rem 1.25rem">` +
    `<li><a href="${SITE_URL}/" style="color:#d9a9b8">Inicio</a></li>` +
    `<li><a href="${SITE_URL}/abogada-penalista-mendoza" style="color:#d9a9b8">Abogada penalista en Mendoza</a></li>` +
    `<li><a href="${SITE_URL}/servicios-abogacia-mendoza" style="color:#d9a9b8">Servicios de abogacía</a></li>` +
    `<li><a href="${SITE_URL}/preguntas-frecuentes" style="color:#d9a9b8">Preguntas frecuentes</a></li>` +
    `<li><a href="${SITE_URL}/contacto" style="color:#d9a9b8">Contacto y guardia 24 hs</a></li>` +
    `</ul>` +
    `</nav>` +
    `</main>`
  );
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

  const seoMain = buildSeoStaticMain(metadata);
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${seoMain}</div>`);
  } else if (/<div id="root">/.test(html)) {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>(\s*<script type="module")/,
      `<div id="root">${seoMain}</div>$1`,
    );
  }

  const outputPath = path === '/' ? 'dist/index.html' : join('dist', path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Static SEO HTML generated for ${Object.keys(ROUTES).length} routes.`);
