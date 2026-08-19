# FASE 04 — QA & DEPLOY

## Objetivo

Realizar la validación final del PMV y desplegar únicamente cuando el producto esté estable.

## REGLA PRINCIPAL

**NO DESPLEGAR UNA VERSIÓN QUE NO HAYA SIDO VALIDADA.**

---

# 1. QA TÉCNICO

Ejecutar las verificaciones disponibles:

- typecheck;
- lint;
- build;
- tests.

Registrar errores y warnings relevantes.

---

# 2. QA FUNCIONAL

Probar:

- navegación;
- CTAs;
- formularios;
- contacto;
- servicios;
- especialidades;
- ubicación;
- enlaces;
- integraciones;
- estados de éxito;
- estados de error.

---

# 3. QA VISUAL

Revisar:

- Desktop;
- Mobile;
- tablet cuando corresponda;
- Hero;
- imágenes;
- tipografía;
- spacing;
- componentes;
- responsive.

Confirmar que no existan regresiones visuales.

---

# 4. QA ACCESIBILIDAD

Verificar:

- teclado;
- focus;
- contraste;
- labels;
- headings;
- nombres accesibles;
- formularios;
- mensajes.

---

# 5. QA PERFORMANCE

Comparar métricas disponibles:

- LCP;
- INP;
- CLS;
- FCP;
- TTFB.

Mostrar únicamente métricas realmente obtenidas.

---

# 6. PRODUCCIÓN

Desplegar en Vercel utilizando la configuración existente.

Después del deploy verificar:

- aplicación pública;
- rutas;
- dominio;
- formularios;
- CTAs;
- metadata;
- sitemap;
- robots;
- integraciones;
- consola;
- errores de red.

---

# 7. SMOKE TEST

Realizar un recorrido completo:

**LANDING → NAVEGACIÓN → CONTENIDO → CTA → CONTACTO → RESULTADO**

---

# 8. CRITERIOS DE APROBACIÓN

El PMV solo se considera aprobado si:

- build correcto;
- flujos críticos funcionan;
- no existen errores críticos;
- Desktop funciona;
- Mobile funciona;
- funcionalidades preservadas;
- SEO básico operativo;
- producción responde correctamente.

---

# 9. REPORTE FINAL

Entregar:

## Estado final

`APPROVED` o `REQUIRES FIXES`

## QA técnico

Resultados.

## QA funcional

Resultados.

## QA visual

Resultados.

## Accesibilidad

Resultados.

## Performance

Métricas.

## Producción

Estado del deployment.

## Problemas pendientes

Solo los pendientes reales.

## Funcionalidades preservadas

Confirmación explícita.

---

# CRITERIO DE SALIDA

## SALIDA FINAL

**PMV APROBADO Y PUBLICADO**