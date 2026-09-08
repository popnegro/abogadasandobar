import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html', '.css', '.json']);
const ignoredDirs = new Set(['node_modules', '.git', 'dist', 'playwright-report', 'test-results']);
const textFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (sourceExtensions.has(full.slice(full.lastIndexOf('.')))) textFiles.push(full);
  }
}

walk(root);

const searchable = textFiles
  .filter((file) => !file.startsWith(join(root, 'public', 'assets')))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

const deps = {
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.devDependencies ?? {}),
};

const unusedDependencies = Object.keys(deps).filter((name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`from\\s+[\\\"']${escaped}(?:/[^\\\"']*)?[\\\"']`),
    new RegExp(`import\\s*\\(\\s*[\\\"']${escaped}(?:/[^\\\"']*)?[\\\"']`),
    new RegExp(`require\\(\\s*[\\\"']${escaped}(?:/[^\\\"']*)?[\\\"']`),
  ];
  return !patterns.some((pattern) => pattern.test(searchable));
});

const temporaryPatterns = [
  /(?:^|[.\\/])(?:\.DS_Store|Thumbs\.db)$/i,
  /(?:\.bak|\.tmp|\.temp|\.orig|~)$/i,
  /(?:^|[\\/])(?:tmp|temp|temporary)[-_]/i,
];

const temporaryFiles = [];
for (const file of textFiles) {
  const rel = relative(root, file);
  if (temporaryPatterns.some((pattern) => pattern.test(rel))) temporaryFiles.push(rel);
}

const legacyRootScripts = [];
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(js|mjs|cjs)$/i.test(entry.name)) continue;
  const full = join(root, entry.name);
  const content = readFileSync(full, 'utf8');
  const referencedByConfig = searchable.includes(entry.name);
  if (!referencedByConfig && content.length > 0) legacyRootScripts.push(entry.name);
}

const sourceCandidates = [];
const srcDir = join(root, 'src');
if (existsSync(srcDir)) {
  const sourceFiles = [];
  function collect(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) collect(full);
      else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/i.test(entry.name)) sourceFiles.push(full);
    }
  }
  collect(srcDir);
  for (const file of sourceFiles) {
    const rel = relative(root, file).replaceAll('\\', '/');
    const base = rel.replace(/\.(ts|tsx|js|jsx|mjs|cjs)$/i, '');
    if (base.endsWith('/main') || base.endsWith('/App')) continue;
    const name = base.split('/').pop();
    const referenced = searchable.includes(`./${name}`) || searchable.includes(`/${name}`) || searchable.includes(`'${rel}'`) || searchable.includes(`\"${rel}\"`);
    if (!referenced) sourceCandidates.push(rel);
  }
}

console.log('P2.6 dependency/debt audit');
console.log(`Dependencies checked: ${Object.keys(deps).length}`);
console.log(`Unused dependency candidates: ${unusedDependencies.length ? unusedDependencies.join(', ') : 'none'}`);
console.log(`Temporary files: ${temporaryFiles.length ? temporaryFiles.join(', ') : 'none'}`);
console.log(`Legacy root scripts: ${legacyRootScripts.length ? legacyRootScripts.join(', ') : 'none'}`);
console.log(`Potential unreferenced source candidates: ${sourceCandidates.length ? sourceCandidates.join(', ') : 'none'}`);

if (temporaryFiles.length > 0) {
  console.error('\nFAIL: temporary artifacts must not enter the repository.');
  process.exit(1);
}
