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

const indexHtml = await readFile('index.html', 'utf8');
const robotsTxt = await readFile('robots.txt', 'utf8');
const sitemapXml = await readFile('sitemap.xml', 'utf8');
const routeMetadata = await readFile('src/utils/useRouteMetadata.ts', 'utf8');

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const countMatches = (source, pattern) => [...source.matchAll(pattern)].length;

assert(indexHtml.includes('<html lang="es-AR">'), 'index.html must declare lang="es-AR".');
assert(countMatches(indexHtml, /<title>/g) === 1, 'index.html must contain exactly one title element.');
assert(countMatches(indexHtml, /<meta\s+name="description"/g) === 1, 'index.html must contain exactly one meta description.');
assert(indexHtml.includes(`<link rel="canonical" href="${SITE_URL}/"`), 'index.html must contain the canonical homepage URL.');
assert(countMatches(indexHtml, /<link\s+rel="canonical"/g) === 1, 'index.html must contain exactly one canonical link.');
assert(indexHtml.includes('application/ld+json'), 'index.html must contain JSON-LD structured data.');
for (const type of ['WebSite', 'WebPage', 'BreadcrumbList', 'Person', 'LegalService']) {
  assert(indexHtml.includes(`"@type": "${type}"`), `index.html JSON-LD must contain ${type}.`);
}

assert(robotsTxt.includes('User-agent: *'), 'robots.txt must define a global user-agent rule.');
assert(robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots.txt must reference the canonical sitemap URL.');

const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(sitemapXml.includes('<urlset'), 'sitemap.xml must contain a urlset.');
assert(sitemapUrls.length === requiredRoutes.length, `sitemap.xml must contain exactly ${requiredRoutes.length} URLs; found ${sitemapUrls.length}.`);
for (const route of requiredRoutes) {
  assert(sitemapUrls.includes(`${SITE_URL}${route}`), `sitemap.xml is missing ${route}.`);
  assert(routeMetadata.includes(`'${route}':`), `route metadata is missing ${route}.`);
}

const metadataRoutes = [...routeMetadata.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((match) => match[1]);
for (const route of requiredRoutes) {
  const block = routeMetadata.match(new RegExp(`['"]${route.replaceAll('/', '\\/')}['"]\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\},?`));
  assert(block, `route metadata block is missing ${route}.`);
  if (block) {
    assert(/title:\s*['"][^'"]+['"]/.test(block[1]), `route metadata title is missing for ${route}.`);
    assert(/description:\s*['"][^'"]+['"]/.test(block[1]), `route metadata description is missing for ${route}.`);
  }
}
assert(new Set(metadataRoutes).size === metadataRoutes.length, 'route metadata must not contain duplicate route keys.');

const duplicateSitemapUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
assert(duplicateSitemapUrls.length === 0, 'sitemap.xml must not contain duplicate URLs.');
assert(sitemapUrls.every((url) => url.startsWith(SITE_URL)), 'sitemap.xml must contain only canonical site URLs.');

console.log(`SEO smoke: ${requiredRoutes.length} canonical routes checked.`);

if (failures.length) {
  console.error('\nSEO audit failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: index metadata, route metadata, robots, sitemap, canonical, and core JSON-LD checks passed.');
}
