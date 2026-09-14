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
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function resolveDuckDuckGoUrl(value) {
  const decoded = decodeHtml(value);
  if (/^https?:\/\//i.test(decoded)) {
    try {
      const parsed = new URL(decoded);
      const uddg = parsed.searchParams.get('uddg');
      if (uddg) return decodeURIComponent(uddg);
    } catch {
      // Keep the original URL when it is not parseable as a URL.
    }
    return decoded;
  }

  try {
    const parsed = new URL(decoded, 'https://html.duckduckgo.com');
    const uddg = parsed.searchParams.get('uddg');
    if (uddg) return decodeURIComponent(uddg);
  } catch {
    // Ignore malformed result links.
  }
  return decoded;
}

function addResult(results, href, rawTitle) {
  const url = resolveDuckDuckGoUrl(href);
  const title = stripHtml(rawTitle);
  if (!title || title.length < 2 || !/^https?:\/\//i.test(url)) return;
  if (/duckduckgo\.com/i.test(url)) return;
  if (!results.some((result) => result.url === url)) results.push({ title, url });
}

function parseDuckDuckGoResults(html) {
  const results = [];

  // Current DDG HTML commonly renders result titles as h2 > a and may omit
  // result__a from the anchor. Parse result blocks first so markup changes do
  // not silently become an empty benchmark.
  const blocks = html.match(/<div\b[^>]*class=["'][^"']*\bresult\b[^"']*["'][^>]*>[\s\S]*?(?=<div\b[^>]*class=["'][^"']*\bresult\b|<div\s+id=["']links["']|$)/gi) || [];
  for (const block of blocks) {
    const titleMatch = block.match(/<h2\b[^>]*>[\s\S]*?<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h2>/i)
      || block.match(/<a\b[^>]*class=["'][^"']*result__a[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i)
      || block.match(/<a\b[^>]*href=["']([^"']+)["'][^>]*class=["'][^"']*result__a[^"']*["'][^>]*>([\s\S]*?)<\/a>/i);
    if (titleMatch) addResult(results, titleMatch[1], titleMatch[2]);
    if (results.length >= 8) return results;
  }

  // Fallback for the classic result__a markup.
  const patterns = [
    /<a\b[^>]*class=["'][^"']*result__a[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    /<a\b[^>]*href=["']([^"']+)["'][^>]*class=["'][^"']*result__a[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) && results.length < 8) addResult(results, match[1], match[2]);
    if (results.length >= 8) break;
  }

  return results;
}

async function searchWeb(query) {
  const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
      Referer: 'https://html.duckduckgo.com/',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
    },
  });
  if (!response.ok) throw new Error(`DuckDuckGo ${response.status}: ${await response.text()}`);
  const html = await response.text();
  if (/captcha|are you a human|unusual traffic|anomaly/i.test(html) && !/result__a|class=["'][^"']*\bresult\b/i.test(html)) {
    throw new Error('DuckDuckGo returned an anti-bot page instead of search results.');
  }
  const results = parseDuckDuckGoResults(html);
  if (results.length === 0) throw new Error('DuckDuckGo returned HTML but no parseable search results.');
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
