# FASE 04 — BASELINE REAL DEL REPOSITORIO

Fecha: 2026-08-15

## Estado canónico

La rama `main` es la fuente de verdad para FASE 04.

El reporte anterior de FASE 03 no coincide completamente con `main`: `main` no contiene `react-helmet-async`, `src/main.tsx` no utiliza `HelmetProvider` y el `package.json` no declara esa dependencia. Por lo tanto, la corrección local que intentó incorporar `react-helmet-async` no debe propagarse a producción.

La estrategia SEO canónica para esta SPA se mantiene en `index.html` con una única URL indexable, `robots.txt` y `sitemap.xml` con la URL raíz. No se utilizarán hash fragments como URLs indexables independientes.

## Hallazgos funcionales

`ContactSection` y `ConsultationModal` todavía contienen una simulación de envío mediante `setTimeout`. El éxito mostrado por la UI no representa una recepción real del mensaje.

Esto mantiene bloqueada la salida de FASE 04.

## Decisión de implementación

- Formspree será la integración de recepción para el PMV.
- El endpoint se configurará mediante `VITE_FORMSPREE_ENDPOINT`.
- No se incorporará `react-helmet-async`.
- No se generará ni hardcodeará un Form ID.
- La UI solo mostrará éxito después de una respuesta HTTP satisfactoria.
- Endpoint ausente, error HTTP o error de red deberán producir un estado de error recuperable.

## Trabajo preparado

Se incorporó `src/lib/formSubmission.ts` como capa única para el envío a Formspree y se documentó `VITE_FORMSPREE_ENDPOINT` en `.env.example`.

La implementación de los dos formularios y la validación E2E final quedan pendientes de la configuración del endpoint real.

## Criterio de salida actual

**FASE 04 EN PROGRESO — BLOQUEADA POR ENDPOINT FORMspree REAL**
