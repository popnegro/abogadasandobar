import { spawnSync } from 'node:child_process';

const checks = [
  ['GEO audit', 'audit:geo'],
  ['Retrieval audit', 'audit:retrieval'],
];

for (const [label, script] of checks) {
  const result = spawnSync('npm', ['run', script], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) {
    console.error(`${label} failed.`);
    process.exit(result.status ?? 1);
  }
}

console.log('P3.8 GEO + retrieval gate passed.');
