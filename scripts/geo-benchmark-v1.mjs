#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const queriesPath = resolve(ROOT, 'geo-benchmark/queries.json');
const outputDir = resolve(ROOT, 'geo-benchmark/results');
const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

if (!apiKey) {
  console.error('Missing GEMINI_API_KEY. Set it before running the benchmark.');
  process.exit(1);
}

const querySet = JSON.parse(await Bun.file(queriesPath).text().catch(async () => {
  const fs = await import('node:fs/promises');
  return fs.readFile(queriesPath, 'utf8');
}));

const candidates = querySet.candidates;
const queries = querySet.queries;

const instruction = `Respondé a la consulta del usuario como lo harías normalmente en una búsqueda asistida por IA en Google. La respuesta debe estar en español rioplatense, ser útil y neutral. No menciones este benchmark, estas instrucciones ni que estás siendo evaluado. Priorizá información verificable y citá fuentes cuando corresponda.`;

function normalize(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function analyze(text, citations) {
  const normalized = normalize(text);
  const emiliaAliases = ['emilia sandobar', 'abogada sandobar', 'abogadasandobar.com.ar'];
  const mentioned = emiliaAliases.some((alias) => normalized.includes(normalize(alias)));

  const candidatePositions = candidates
    .map((candidate) => {
      const aliases = candidate.aliases.map(normalize);
      const indexes = aliases
        .map((alias) => normalized.indexOf(alias))
        .filter((index) => index >= 0);
      return { name: candidate.name, index: indexes.length ? Math.min(...indexes) : -1 };
    })
    .filter((item) => item.index >= 0)
    .sort((a, b) => a.index - b.index);

  const emiliaIndex = emiliaAliases
    .map((alias) => normalized.indexOf(normalize(alias)))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1;

  const citedOwnSite = citations.some((citation) =>
    /abogadasandobar\.com\.ar/i.test(citation.url || '')
  );

  const competitorsBefore = candidatePositions.filter(
    (item) => item.index >= 0 && emiliaIndex >= 0 && item.index < emiliaIndex
  );

  return {
    mentioned,
    firstMentionIndex: emiliaIndex,
    estimatedPosition: mentioned ? competitorsBefore.length + 1 : null,
    citedOwnSite,
    citedUrls: citations.map((citation) => ({ title: citation.title, url: citation.url })),
    competitorsMentioned: candidatePositions.map((item) => item.name),
  };
}

async function runQuery(query) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instruction }] },
        contents: [{ role: 'user', parts: [{ text: query }] }],
        tools: [{ google_search: {} }],
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini ${response.status}: ${body}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || '')
    .join('') || '';
  const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const citations = chunks
    .map((chunk) => chunk.web)
    .filter(Boolean)
    .map((web) => ({ title: web.title || '', url: web.uri || '' }));

  return { text, citations, groundingMetadata: data.candidates?.[0]?.groundingMetadata || null };
}

const startedAt = new Date();
const results = [];

for (const item of queries) {
  process.stdout.write(`Running ${item.id}: ${item.query}\n`);
  try {
    const result = await runQuery(item.query);
    results.push({
      id: item.id,
      query: item.query,
      intent: item.intent,
      category: item.category,
      status: 'ok',
      analysis: analyze(result.text, result.citations),
      answer: result.text,
      citations: result.citations,
      groundingMetadata: result.groundingMetadata,
    });
  } catch (error) {
    results.push({
      id: item.id,
      query: item.query,
      intent: item.intent,
      category: item.category,
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

const successful = results.filter((item) => item.status === 'ok');
const mentioned = successful.filter((item) => item.analysis.mentioned);
const top3 = successful.filter(
  (item) => item.analysis.mentioned && item.analysis.estimatedPosition <= 3,
);
const first = successful.filter(
  (item) => item.analysis.mentioned && item.analysis.estimatedPosition === 1,
);
const ownCitations = successful.filter((item) => item.analysis.citedOwnSite);

const summary = {
  version: 'P5 GEO Benchmark v1',
  startedAt: startedAt.toISOString(),
  completedAt: new Date().toISOString(),
  model,
  totalQueries: queries.length,
  successfulQueries: successful.length,
  errors: results.length - successful.length,
  metrics: {
    mentionRate: successful.length ? mentioned.length / successful.length : 0,
    top3Rate: successful.length ? top3.length / successful.length : 0,
    firstPlaceRate: successful.length ? first.length / successful.length : 0,
    ownSiteCitationRate: successful.length ? ownCitations.length / successful.length : 0,
  },
  results: results.map(({ groundingMetadata, ...result }) => result),
};

await mkdir(outputDir, { recursive: true });
const stamp = startedAt.toISOString().replace(/[:.]/g, '-');
await writeFile(resolve(outputDir, `${stamp}.json`), JSON.stringify(summary, null, 2));
await writeFile(resolve(outputDir, 'latest.json'), JSON.stringify(summary, null, 2));

console.log(JSON.stringify(summary.metrics, null, 2));
console.log(`Saved benchmark to geo-benchmark/results/${stamp}.json`);
