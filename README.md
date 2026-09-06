# Emilia Sandobar — Sitio web

Sitio web oficial de la Dra. Emilia Sandobar, abogada especializada en defensa penal y asesoría corporativa en Mendoza, Argentina.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Playwright

## Desarrollo local

### Requisitos

- Node.js 22+
- npm

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Validación

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Los tests E2E utilizan Playwright y cubren los flujos principales de navegación, conversión, formulario de contacto y carga de assets.

## Arquitectura

La aplicación es una SPA React + Vite. Las rutas públicas principales son:

- `/inicio`
- `/servicios-abogacia-mendoza`
- `/experiencia`
- `/nuestro-metodo`
- `/preguntas-frecuentes`
- `/contacto`

El SEO técnico por ruta se gestiona desde `src/utils/useRouteMetadata.ts` y los datos de contenido se mantienen separados en `src/data/`.

## Producción

Dominio oficial: `https://www.abogadasandobar.com.ar`

El despliegue de producción se gestiona mediante Vercel.

## CI

GitHub Actions ejecuta automáticamente:

1. instalación de dependencias;
2. TypeScript typecheck;
3. build de producción;
4. instalación de Chromium;
5. suite E2E de Playwright;
6. publicación del reporte de Playwright cuando corresponde.

## Estado

PMV funcional y orientado a producción. Los cambios de alcance deben priorizar estabilidad, simplicidad y cierre del producto antes que nuevas capas de arquitectura.
