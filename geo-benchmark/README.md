# P5 — GEO Benchmark v1

Benchmark reproducible para medir cómo una IA con búsqueda web presenta a Emilia Sandobar frente a consultas de intención penal en Mendoza.

## Qué mide

- `mentionRate`: frecuencia con la que Emilia Sandobar aparece en la respuesta.
- `top3Rate`: frecuencia con una posición estimada dentro de las tres primeras entidades.
- `firstPlaceRate`: frecuencia con posición estimada #1.
- `ownSiteCitationRate`: frecuencia con la que la respuesta cita `abogadasandobar.com.ar`.
- respuesta completa, resultados de búsqueda y fuentes seleccionadas.

La `estimatedPosition` de v1 es heurística: ordena la primera aparición de Emilia frente a un conjunto fijo de competidores conocidos. No debe interpretarse como un ranking oficial de Google.

## Proveedor

v1 separa búsqueda y generación para evitar el coste de las herramientas de búsqueda comerciales:

- Búsqueda web: DuckDuckGo HTML.
- Modelo: OpenRouter `openrouter/free`.

El modelo recibe los resultados recuperados por el buscador y debe responder únicamente con ese contexto, identificando al final las fuentes utilizadas.

## Ejecución local

```bash
export OPENROUTER_API_KEY='...'
npm run benchmark:geo
```

Opcional:

```bash
export OPENROUTER_MODEL='openrouter/free'
```

Los resultados quedan en `geo-benchmark/results/`.

## Automatización

`.github/workflows/geo-benchmark.yml` permite ejecución manual y semanal los lunes a las 12:00 UTC.

El workflow requiere el secret de repositorio:

`OPENROUTER_API_KEY`

No se debe guardar la API key en el repositorio.

## Consultas

Las 15 consultas están versionadas en `geo-benchmark/queries.json` y cubren:

- penal general;
- defensa;
- urgencias;
- detención;
- allanamiento;
- denuncias;
- delito económico;
- consulta;
- entidad Emilia Sandobar;
- recomendación.

## Regla de interpretación

Este benchmark mide **visibilidad generativa**, no reemplaza Search Console, Google Business Profile, resultados orgánicos ni una evaluación jurídica/comercial de los profesionales mencionados.
