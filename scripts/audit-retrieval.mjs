import { readFile } from 'node:fs/promises';

const SITE_URL = 'https://abogadasandobar.com.ar';
const routes = [
  '/',
  '/servicios-abogacia-mendoza',
  '/abogada-penalista-mendoza',
  '/nuestro-metodo',
  '/preguntas-frecuentes',
  '/contacto',
];

const [indexHtml, llms, metadata, structuredData] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('public/llms.txt', 'utf8'),
  readFile('src/utils/useRouteMetadata.ts', 'utf8'),
  readFile('src/utils/structuredData.ts', 'utf8'),
]);

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(indexHtml.includes('Emilia Sandobar'), 'primary entity must be directly retrievable from the document.');
assert(indexHtml.includes('Abogada'), 'professional role must be directly retrievable from the document.');
assert(indexHtml.includes('Mendoza'), 'local entity must be directly retrievable from the document.');
assert(indexHtml.includes('derecho penal'), 'primary practice area must be directly retrievable from the document.');
assert(llms.includes(SITE_URL), 'official site must be exposed as the primary source.');
assert(llms.includes('Emilia Sandobar'), 'llms.txt must expose the primary entity.');
assert(llms.includes('Abogada Penalista en Mendoza'), 'llms.txt must expose entity + specialty + locality.');

for (const route of routes) {
  assert(metadata.includes(`'${route}':`), `metadata must cover ${route}.`);
}

for (const type of ['Person', 'LegalService', 'WebSite', 'WebPage', 'BreadcrumbList']) {
  assert(structuredData.includes(`'@type': '${type}'`), `structured data must expose ${type}.`);
}
assert(structuredData.includes("jobTitle: 'Abogada'"), 'structured data must expose the professional role.');
assert(structuredData.includes("name: 'Mendoza'"), 'structured data must expose Mendoza.');
assert(structuredData.includes('knowsAbout: SERVICE_TYPES'), 'structured data must expose declared practice areas.');
assert(!structuredData.includes('sameAs:'), 'retrieval signals must not rely on unverified sameAs profiles.');

console.log(`Retrieval audit: ${routes.length} canonical routes checked.`);
if (failures.length) {
  console.error('\nRetrieval audit failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: entity, role, locality, practice area, route coverage, and structured retrieval signals are present.');
}
