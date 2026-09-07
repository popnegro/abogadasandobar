import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = join(process.cwd(), 'public/assets');
const sourceRoot = join(process.cwd(), 'src');
const maxImageBytes = 300 * 1024;
const imageExtensions = new Set(['.webp', '.avif', '.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (imageExtensions.has(extname(entry.name).toLowerCase())) files.push(path);
  }
  return files;
}

const files = await walk(root);
const sourceFiles = await walkText(sourceRoot);
const hashes = new Map();
const oversized = [];
const assets = new Map();

for (const file of files) {
  const data = await readFile(file);
  const size = (await stat(file)).size;
  const rel = relative(process.cwd(), file).replaceAll('\\', '/');
  const assetPath = `/${relative(root, file).replaceAll('\\', '/')}`;
  const hash = createHash('sha256').update(data).digest('hex');
  assets.set(assetPath, rel);
  if (!hashes.has(hash)) hashes.set(hash, []);
  hashes.get(hash).push(rel);
  if (size > maxImageBytes) oversized.push(`${rel} (${Math.round(size / 1024)} KB)`);
}

const sourceText = sourceFiles.join('\n');
const referenced = new Set();
for (const assetPath of assets.keys()) {
  const escaped = assetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp(escaped).test(sourceText)) referenced.add(assetPath);
}

const candidateRefs = [...sourceText.matchAll(/(?:\/assets\/images|assets\/images)\/[A-Za-z0-9._/-]+/g)]
  .map(match => match[0].startsWith('/') ? match[0] : `/${match[0]}`);
const missing = [...new Set(candidateRefs)].filter(ref => !assets.has(ref));
const orphaned = [...assets.keys()].filter(assetPath => !referenced.has(assetPath));
const duplicates = [...hashes.values()].filter(group => group.length > 1);

console.log(`Asset audit: ${files.length} images scanned.`);

if (duplicates.length) {
  console.error('\nDuplicate image content detected:');
  for (const group of duplicates) console.error(`- ${group.join(' = ')}`);
}

if (oversized.length) {
  console.error(`\nImages over ${maxImageBytes / 1024} KB:`);
  for (const item of oversized) console.error(`- ${item}`);
}

if (orphaned.length) {
  console.error('\nOrphaned image assets (not referenced from src):');
  for (const assetPath of orphaned) console.error(`- ${assets.get(assetPath)}`);
}

if (missing.length) {
  console.error('\nReferenced image assets not found in public/assets:');
  for (const assetPath of missing) console.error(`- ${assetPath}`);
}

if (!duplicates.length && !oversized.length && !orphaned.length && !missing.length) {
  console.log('PASS: no duplicate, oversized, orphaned, or missing image assets detected.');
} else {
  process.exitCode = 1;
}

async function walkText(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkText(path));
    else if (/\.(tsx?|jsx?|css|html)$/.test(entry.name)) files.push(await readFile(path, 'utf8'));
  }
  return files;
}
