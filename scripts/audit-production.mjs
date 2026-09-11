const SITE_URL = (process.env.BASE_URL || 'https://abogadasandobar.com.ar').replace(/\/$/, '');

const requiredRoutes = [
  '/',
  '/servicios-abogacia-mendoza',
  '/abogada-penalista-mendoza',
  '/nuestro-metodo',
  '/preguntas-frecuentes',
  '/contacto',
];

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const fetchText = async (path) => {
  const url = `${SITE_URL}${path}`;
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'abogada-sandobar-production-audit' },
    });
    return { url: response.url, response, body: await response.text() };
  } catch (error) {
    failures.push(`${path} could not be fetched: ${error.message}`);
    return null;
  }
};

console.log(`Production smoke audit: ${SITE_URL}`);

const pages = await Promise.all(requiredRoutes.map(fetchText));

for (const [index, result] of pages.entries()) {
  const route = requiredRoutes[index];
  if (!result) continue;

  assert(result.response.ok, `${route} returned HTTP ${result.response.status}.`);
  assert(result.response.headers.get('content-type')?.includes('text/html'), `${route} must return HTML.`);
  assert(result.url.replace(/\/$/, '') === `${SITE_URL}${route}`.replace(/\/$/, ''), `${route} redirected to an unexpected URL: ${result.url}`);
  assert(result.body.includes('<html'), `${route} response must contain an HTML document.`);
  assert(result.body.includes('<title>'), `${route} response must contain a title.`);
  assert(result.body.includes('Emilia Sandobar'), `${route} response must expose the primary entity.`);
  assert(result.body.includes('Mendoza'), `${route} response must expose the local entity.`);
}

for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt']) {
  const result = await fetchText(path);
  if (!result) continue;
  assert(result.response.ok, `${path} returned HTTP ${result.response.status}.`);
}

const robots = await fetchText('/robots.txt');
if (robots) {
  assert(robots.body.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots.txt must reference the production sitemap.');
}

const sitemap = await fetchText('/sitemap.xml');
if (sitemap) {
  for (const route of requiredRoutes) {
    assert(sitemap.body.includes(`<loc>${SITE_URL}${route}</loc>`), `production sitemap is missing ${route}.`);
  }
}

const llms = await fetchText('/llms.txt');
if (llms) {
  assert(llms.body.includes('Emilia Sandobar'), 'llms.txt must expose the primary entity.');
  assert(llms.body.includes('Abogada Penalista en Mendoza'), 'llms.txt must expose specialty and locality.');
}

console.log(`Checked ${requiredRoutes.length} canonical routes plus robots.txt, sitemap.xml and llms.txt.`);

if (failures.length) {
  console.error('\nProduction smoke audit failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: production routes, HTTP responses, redirects, entity signals, robots, sitemap and llms.txt checks passed.');
}
