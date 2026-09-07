import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = join(process.cwd(), 'public/assets');
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
const hashes = new Map();
const oversized = [];

for (const file of files) {
  const data = await readFile(file);
  const size = (await stat(file)).size;
  const rel = relative(process.cwd(), file);
  const hash = createHash('sha256').update(data).digest('hex');
  if (!hashes.has(hash)) hashes.set(hash, []);
  hashes.get(hash).push(rel);
  if (size > maxImageBytes) oversized.push(`${rel} (${Math.round(size / 1024)} KB)`);
}

const duplicates = [...hashes.values()].filter(group => group.length > 1);
console.log(`Asset audit: ${files.length} images scanned.`);

if (duplicates.length) {
  console.error('\nDuplicate image content detected:');
  for (const group of duplicates) console.error(`- ${group.join(' = ')}`);
  process.exitCode = 1;
}

if (oversized.length) {
  console.error(`\nImages over ${maxImageBytes / 1024} KB:`);
  for (const item of oversized) console.error(`- ${item}`);
  process.exitCode = 1;
}

if (!duplicates.length && !oversized.length) console.log('PASS: no duplicate or oversized images detected.');
