import { readFile } from 'node:fs/promises';

const SITE_URL = 'https://www.abogadasandobar.com.ar';
const requiredRoutes = [
  '/',
  '/servicios-abogacia-mendoza',
  '/abogada-penalista-mendoza',
  '/nuestro-metodo',
  '/preguntas-frecuentes',
  '/contacto',
];

const files = await Promise.all([
  readFile('public/llms.txt', 'utf8'),
  readFile('src/utils/useRouteMetadata.ts', 'utf8'),
  readFile('src/utils/structuredData.ts', 'utf8'),
  readFile('public/sitemap.xml', 'utf8'),
  readFile('public/robots.txt', 'utf8'),
]);

const [llms, routeMetadata, structuredData, sitemap, robots] = files;
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(llms.includes('# Emilia Sandobar — Abogada Penalista en Mendoza'), 'llms.txt must define the primary entity and specialty.');
assert(llms.includes('https://www.abogadasandobar.com.ar/'), 'llms.txt must identify the official site.');
assert(llms.includes('## Páginas principales'), 'llms.txt must expose the main indexable pages.');
for (const route of requiredRoutes) {
  assert(llms.includes(`${SITE_URL}${route}`), `llms.txt is missing ${route}.`);
  assert(routeMetadata.includes(`'${route}':`), `route metadata is missing ${route}.`);
}

for (const type of ['Person', 'LegalService', 'WebSite', 'WebPage', 'BreadcrumbList']) {
  assert(structuredData.includes(`'@type': '${type}'`), `structured data source must contain ${type}.`);
}
assert(structuredData.includes("jobTitle: 'Abogada'"), 'structured data must identify the professional role.');
assert(structuredData.includes("name: 'Mendoza'"), 'structured data must expose Mendoza as the service area.');
assert(structuredData.includes('knowsAbout: SERVICE_TYPES'), 'structured data must expose the declared practice areas.');
assert(!structuredData.includes('sameAs:'), 'structured data must not invent unverified sameAs profiles.');

assert(sitemap.includes('<urlset'), 'sitemap.xml must contain a urlset.');
for (const route of requiredRoutes) {
  assert(sitemap.includes(`<loc>${SITE_URL}${route}</loc>`), `sitemap.xml is missing ${route}.`);
}
assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots.txt must reference the canonical sitemap.');

console.log(`GEO audit: ${requiredRoutes.length} canonical routes checked.`);

if (failures.length) {
  console.error('\nGEO audit failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: llms.txt, entity semantics, route coverage, sitemap and robots checks passed.');
}
