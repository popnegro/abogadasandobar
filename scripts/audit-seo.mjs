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

assert(indexHtml.includes(`<html lang="es-AR">`), 'index.html must declare lang="es-AR".');
assert(indexHtml.includes('<title>') && indexHtml.includes('</title>'), 'index.html must contain a title.');
assert(indexHtml.includes('name="description"'), 'index.html must contain a meta description.');
assert(indexHtml.includes(`<link rel="canonical" href="${SITE_URL}/"`), 'index.html must contain the canonical homepage URL.');
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

const duplicateSitemapUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
assert(duplicateSitemapUrls.length === 0, 'sitemap.xml must not contain duplicate URLs.');
assert(sitemapUrls.every((url) => url.startsWith(SITE_URL)), 'sitemap.xml must contain only canonical site URLs.');

console.log(`SEO smoke: ${requiredRoutes.length} canonical routes checked.`);

if (failures.length) {
  console.error('\nSEO audit failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: robots, sitemap, route metadata, canonical, and core JSON-LD checks passed.');
}
