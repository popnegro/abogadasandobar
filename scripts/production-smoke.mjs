const BASE_URL = (process.env.BASE_URL ?? 'https://abogadasandobar.com.ar').replace(/\/$/, '');

const ROUTES = [
  '/',
  '/servicios-abogacia-mendoza',
  '/abogada-penalista-mendoza',
  '/nuestro-metodo',
  '/preguntas-frecuentes',
  '/contacto',
];

const EXPECTED_SITEMAP_PATHS = ROUTES.map((route) => (route === '/' ? '/inicio' : route));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchText(path) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'abogadasandobar-production-smoke/1.0' },
  });

  const body = await response.text();
  return { response, body, url: response.url };
}

async function checkPage(path) {
  const { response, body, url } = await fetchText(path);
  assert(response.ok, `${path}: expected HTTP 2xx, received ${response.status}`);
  assert(response.headers.get('content-type')?.includes('text/html'), `${path}: expected HTML content`);

  const title = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  assert(title, `${path}: missing <title>`);

  const canonical = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)?.[1];
  assert(canonical, `${path}: missing canonical`);
  assert(canonical.startsWith(`${BASE_URL}/`) || canonical === BASE_URL, `${path}: canonical points outside ${BASE_URL}`);

  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body);
  assert(!noindex, `${path}: production page contains noindex`);

  const h1Count = (body.match(/<h1\b/gi) ?? []).length;
  assert(h1Count === 1, `${path}: expected exactly one H1, found ${h1Count}`);

  console.log(`PASS page ${path} -> ${response.status} (${url})`);
}

async function checkRobotsAndSitemap() {
  const robots = await fetchText('/robots.txt');
  assert(robots.response.ok, `robots.txt: expected HTTP 2xx, received ${robots.response.status}`);
  assert(robots.body.includes('Sitemap:'), 'robots.txt: missing Sitemap directive');

  const sitemap = await fetchText('/sitemap.xml');
  assert(sitemap.response.ok, `sitemap.xml: expected HTTP 2xx, received ${sitemap.response.status}`);
  assert(sitemap.body.includes('<urlset'), 'sitemap.xml: missing <urlset>');

  const locations = [...sitemap.body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1]);
  assert(locations.length > 0, 'sitemap.xml: contains no <loc> entries');

  for (const expectedPath of EXPECTED_SITEMAP_PATHS) {
    const expected = `${BASE_URL}${expectedPath}`;
    assert(locations.includes(expected), `sitemap.xml: missing ${expected}`);
  }

  assert(!locations.includes(`${BASE_URL}/experiencia`), 'sitemap.xml: legacy /experiencia route is still published');
  console.log('PASS robots.txt');
  console.log('PASS sitemap.xml');
}

await checkRobotsAndSitemap();
for (const route of ROUTES) await checkPage(route);
console.log(`Production smoke PASS: ${BASE_URL}`);
