import { spawnSync } from 'node:child_process';

for (const script of ['audit:geo', 'audit:retrieval']) {
  const result = spawnSync('npm', ['run', script], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log('P3.8 GEO + retrieval gate passed.');
