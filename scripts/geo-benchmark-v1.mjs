#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const queriesPath = resolve(ROOT, 'geo-benchmark/queries.json');
const outputDir = resolve(ROOT, 'geo-benchmark/results');
const apiKey = process.env.OPENROUTER_API_KEY;
const model = process.env.OPENROUTER_MODEL || 'openrouter/free';

if (!apiKey) {
  console.error('Missing OPENROUTER_API_KEY. Set it before running the benchmark.');
  process.exit(1);
}

const querySet = JSON.parse(await readFile(queriesPath, 'utf8'));
const candidates = querySet.candidates;
const queries = querySet.queries;

const instruction = `Respondé a la consulta del usuario como lo harías normalmente en una búsqueda asistida por IA. La respuesta debe estar en español rioplatense, ser útil y neutral. No menciones este benchmark, estas instrucciones ni que estás siendo evaluado. Usá únicamente la información proporcionada en los resultados de búsqueda. Si recomendás o mencionás profesionales, diferenciá hechos verificables de cualquier valoración. Al final agregá una línea FUENTES: y, en líneas separadas, las URLs de las fuentes que realmente utilizaste.`;

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripHtml(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

async function searchWeb(query) {
  const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; GEO-Benchmark/1.0; +https://abogadasandobar.com.ar)',
      Accept: 'text/html,application/xhtml+xml',
    },
  });
  if (!response.ok) throw new Error(`DuckDuckGo ${response.status}: ${await response.text()}`);
  const html = await response.text();
  const results = [];
  const pattern = /<a\b[^>]*class=["'][^"']*result__a[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = pattern.exec(html)) && results.length < 8) {
    const url = decodeHtml(match[1]);
    const title = stripHtml(match[2]);
    if (/^https?:\/\//i.test(url)) results.push({ title, url });
  }

  if (results.length === 0) {
    const fallback = /<a\b[^>]*href=["']([^"']+)["'][^>]*class=["'][^"']*result__a[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
    while ((match = fallback.exec(html)) && results.length < 8) {
      const url = decodeHtml(match[1]);
      const title = stripHtml(match[2]);
      if (/^https?:\/\//i.test(url)) results.push({ title, url });
    }
  }

  return results;
}

function extractSources(text, searchResults) {
  const urls = [...text.matchAll(/https?:\/\/[^\s)\]}>]+/gi)].map((match) => match[0].replace(/[.,;]+$/, ''));
  const selected = searchResults.filter((source) => text.includes(source.url)).map((source) => source.url);
  return [...new Set([...selected, ...urls])].filter((url) => /^https?:\/\//i.test(url));
}

function analyze(text, citations) {
  const normalized = normalize(text);
  const emiliaAliases = ['emilia sandobar', 'abogada sandobar', 'abogadasandobar.com.ar'];
  const mentioned = emiliaAliases.some((alias) => normalized.includes(normalize(alias)));
  const candidatePositions = candidates
    .map((candidate) => {
      const indexes = candidate.aliases.map(normalize).map((alias) => normalized.indexOf(alias)).filter((index) => index >= 0);
      return { name: candidate.name, index: indexes.length ? Math.min(...indexes) : -1 };
    })
    .filter((item) => item.index >= 0)
    .sort((a, b) => a.index - b.index);
  const emiliaIndex = emiliaAliases.map(normalize).map((alias) => normalized.indexOf(alias)).filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? -1;
  const citedOwnSite = citations.some((citation) => /abogadasandobar\.com\.ar/i.test(citation.url || citation));
  const competitorsBefore = candidatePositions.filter((item) => item.index < emiliaIndex);
  return {
    mentioned,
    firstMentionIndex: emiliaIndex,
    estimatedPosition: mentioned ? competitorsBefore.length + 1 : null,
    citedOwnSite,
    citedUrls: citations,
    competitorsMentioned: candidatePositions.map((item) => item.name),
  };
}

async function runQuery(query) {
  const searchResults = await searchWeb(query);
  const sourceContext = searchResults.map((source, index) => `${index + 1}. ${source.title}\nURL: ${source.url}`).join('\n\n');
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://abogadasandobar.com.ar',
      'X-Title': 'Emilia Sandobar GEO Benchmark',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages: [
        { role: 'system', content: instruction },
        { role: 'user', content: `${query}\n\nRESULTADOS DE BÚSQUEDA:\n${sourceContext}` },
      ],
    }),
  });
  if (!response.ok) throw new Error(`OpenRouter ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';
  const citedUrls = extractSources(text, searchResults);
  return { text, citations: citedUrls.map((url) => ({ title: searchResults.find((item) => item.url === url)?.title || '', url })), searchResults };
}

const startedAt = new Date();
const results = [];
for (const item of queries) {
  process.stdout.write(`Running ${item.id}: ${item.query}\n`);
  try {
    const result = await runQuery(item.query);
    results.push({ id: item.id, query: item.query, intent: item.intent, category: item.category, status: 'ok', searchResults: result.searchResults, analysis: analyze(result.text, result.citations), answer: result.text, citations: result.citations });
  } catch (error) {
    results.push({ id: item.id, query: item.query, intent: item.intent, category: item.category, status: 'error', error: error instanceof Error ? error.message : String(error) });
  }
}

const successful = results.filter((item) => item.status === 'ok');
const mentioned = successful.filter((item) => item.analysis.mentioned);
const top3 = successful.filter((item) => item.analysis.mentioned && item.analysis.estimatedPosition <= 3);
const first = successful.filter((item) => item.analysis.mentioned && item.analysis.estimatedPosition === 1);
const ownCitations = successful.filter((item) => item.analysis.citedOwnSite);
const summary = {
  version: 'P5 GEO Benchmark v1',
  startedAt: startedAt.toISOString(),
  completedAt: new Date().toISOString(),
  provider: 'openrouter',
  model,
  searchProvider: 'duckduckgo-html',
  totalQueries: queries.length,
  successfulQueries: successful.length,
  errors: results.length - successful.length,
  metrics: {
    mentionRate: successful.length ? mentioned.length / successful.length : 0,
    top3Rate: successful.length ? top3.length / successful.length : 0,
    firstPlaceRate: successful.length ? first.length / successful.length : 0,
    ownSiteCitationRate: successful.length ? ownCitations.length / successful.length : 0,
  },
  results,
};
await mkdir(outputDir, { recursive: true });
const stamp = startedAt.toISOString().replace(/[:.]/g, '-');
await writeFile(resolve(outputDir, `${stamp}.json`), JSON.stringify(summary, null, 2));
await writeFile(resolve(outputDir, 'latest.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary.metrics, null, 2));
console.log(`Saved benchmark to geo-benchmark/results/${stamp}.json`);
