# FASE 01 — AUDIT & STABILIZE

## OBJETIVO

Auditar, limpiar y estabilizar técnicamente el proyecto antes de intervenir en UX/UI, contenido, funcionalidades o SEO.

Esta fase debe trabajar exclusivamente sobre el estado REAL del proyecto.

---

# 0. REGLAS OPERATIVAS OBLIGATORIAS

Los documentos de trabajo se encuentran en:

/doc

Antes de comenzar:

1. Leer este archivo completo.
2. Inspeccionar el proyecto real.
3. Revisar los reportes anteriores disponibles en `/doc`, si existen.
4. Determinar la arquitectura real.
5. Determinar las funcionalidades reales.
6. Establecer un baseline técnico.
7. Ejecutar la auditoría.
8. Realizar únicamente cambios seguros dentro del alcance.
9. Validar los cambios.
10. Crear el reporte obligatorio.

---

# 1. PROHIBIDO SIMULAR

ESTÁ PROHIBIDO SIMULAR LA EJECUCIÓN DE ESTA FASE.

Nunca:

- inventar archivos;
- inventar componentes;
- inventar dependencias;
- inventar errores;
- inventar integraciones;
- inventar funcionalidades;
- inventar resultados de comandos;
- inventar tests;
- inventar métricas;
- inventar resultados de build;
- inventar modificaciones;
- inventar arquitectura;
- presentar hipótesis como hechos.

Si no existe acceso operativo al proyecto real:

NO SIMULAR.

Informar:

`NO SE PUEDE EJECUTAR LA FASE 01 EN EL ENTORNO ACTUAL`

y detenerse.

No generar un reporte ficticio.

---

# 2. EVIDENCIA

Todo hallazgo debe estar respaldado por evidencia real.

La evidencia puede ser:

- archivo;
- ruta;
- símbolo;
- import/export;
- configuración;
- dependencia;
- resultado de comando;
- error;
- log;
- test;
- build;
- comportamiento reproducible.

Si no existe evidencia suficiente:

`REQUIERE_VALIDACIÓN`

No afirmar que el problema existe como hecho.

---

# 3. REGLAS DE PRESERVACIÓN

NO:

- modificar el diseño;
- modificar UI;
- modificar UX;
- eliminar funcionalidades;
- cambiar navegación;
- cambiar identidad visual;
- rediseñar componentes;
- cambiar contenido;
- agregar funcionalidades;
- migrar tecnologías por preferencia;
- realizar actualizaciones masivas de dependencias.

El objetivo es estabilizar, no rediseñar.

---

# 4. DESCUBRIMIENTO

Inspeccionar:

- estructura;
- package.json;
- lockfile;
- framework;
- TypeScript;
- routing;
- componentes;
- hooks;
- servicios;
- APIs;
- autenticación;
- base de datos;
- variables de entorno;
- configuración de Vercel;
- assets;
- scripts;
- dependencias.

Determinar la arquitectura REAL.

---

# 5. INVENTARIO FUNCIONAL

Registrar las funcionalidades realmente existentes.

Para cada funcionalidad indicar:

- ubicación;
- componente/ruta;
- integración;
- estado;
- dependencias.

No eliminar funcionalidades.

Si existe duda:

`REQUIERE_VALIDACIÓN`

---

# 6. CÓDIGO MUERTO

Buscar:

- archivos sin referencias;
- componentes sin uso;
- imports muertos;
- exports innecesarios;
- variables sin uso;
- funciones sin uso;
- duplicaciones;
- código legado;
- archivos temporales;
- dependencias sin uso.

Solo eliminar código cuando exista evidencia suficiente de que no participa en ninguna funcionalidad, ruta, integración, configuración o proceso de build/deployment.

Si existe duda:

NO ELIMINAR.

---

# 7. ERRORES DE INTEGRACIÓN

Auditar:

- frontend/backend;
- APIs;
- autenticación;
- base de datos;
- Firebase;
- Supabase;
- servicios externos;
- variables de entorno;
- Vercel;
- routing.

Corregir solamente problemas comprobados.

---

# 8. ARQUITECTURA

Evaluar:

- separación de responsabilidades;
- duplicaciones;
- acoplamiento;
- dependencias circulares;
- componentes monolíticos;
- servicios duplicados;
- modelos inconsistentes;
- estructura de carpetas.

Refactorizar únicamente cuando:

1. exista un problema real;
2. exista evidencia;
3. no cambie el comportamiento funcional;
4. el riesgo sea controlable.

---

# 9. DEPENDENCIAS

Auditar dependencias.

No realizar actualizaciones masivas.

Una actualización solo puede realizarse si:

- existe un problema real;
- la actualización es necesaria;
- se comprende el impacto;
- se valida posteriormente.

No actualizar una dependencia simplemente porque existe una versión más nueva.

---

# 10. VALIDACIÓN

Ejecutar únicamente scripts existentes en el proyecto.

Validar, cuando estén disponibles:

- typecheck;
- lint;
- build;
- tests.

Nunca inventar scripts.

Nunca inventar resultados.

Si una validación no puede ejecutarse:

`NO EJECUTADO`

---

# 11. REPORTE OBLIGATORIO

Crear:

/doc/01-AUDIT-STABILIZE-REPORT.md

El reporte debe contener:

# FASE 01 — AUDIT & STABILIZE — REPORT

## 1. Resumen ejecutivo

## 2. Arquitectura real detectada

## 3. Inventario funcional

## 4. Problemas técnicos encontrados

Clasificados:

- CRITICAL
- HIGH
- MEDIUM
- LOW
- INFO

## 5. Código muerto detectado

Para cada elemento:

- archivo;
- símbolo;
- evidencia;
- decisión.

## 6. Código muerto eliminado

Solo elementos realmente eliminados.

## 7. Errores de integración encontrados

Problema + evidencia + causa + solución.

## 8. Refactorizaciones realizadas

Archivo + problema + solución + impacto.

## 9. Dependencias

Dependencias analizadas y decisiones tomadas.

## 10. Validación

Indicar resultados REALES de:

- typecheck;
- lint;
- build;
- tests.

## 11. Funcionalidades preservadas

Confirmación explícita.

## 12. Diseño preservado

Confirmar:

- Desktop;
- Mobile;
- UI;
- UX;
- identidad visual.

## 13. Problemas pendientes

Solo problemas reales.

## 14. Recomendaciones para Fase 02

Solo recomendaciones relacionadas con:

02 — UX/UI & CONTENT

No implementar todavía recomendaciones de fases posteriores.

---

# CRITERIO DE FINALIZACIÓN

La fase solo termina cuando:

- el MD fue leído;
- el proyecto real fue inspeccionado;
- la arquitectura real fue identificada;
- las funcionalidades fueron revisadas;
- los problemas seguros fueron corregidos;
- las modificaciones fueron validadas;
- el reporte fue creado en `/doc`.

NO avanzar automáticamente a Fase 02.

Al finalizar responder:

FASE 01 COMPLETADA

y resumir:

- cambios realizados;
- errores pendientes;
- resultado de build;
- ubicación del reporte.