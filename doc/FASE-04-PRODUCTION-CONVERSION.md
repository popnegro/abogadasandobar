# FASE 04 — PRODUCTION & CONVERSION

## Objetivo

Cerrar la brecha entre el estado actual del PMV y una versión realmente operativa para producción, priorizando conversión, recepción real de consultas, consistencia técnica y seguridad de publicación.

## REGLA PRINCIPAL

No agregar funcionalidades innecesarias.

No inventar datos profesionales, direcciones, credenciales, testimonios, horarios ni integraciones.

No alterar el diseño UX/UI validado salvo que una corrección funcional lo exija.

---

# 1. BASELINE OBLIGATORIO

Antes de implementar cambios, auditar `main` y verificar que la FASE 03 realmente esté integrada.

Comprobar especialmente:

- `package.json` y dependencias declaradas;
- `src/main.tsx`;
- `src/App.tsx`;
- metadatos SEO;
- canonical;
- Open Graph;
- Twitter Cards;
- `robots.txt`;
- `sitemap.xml`;
- jerarquía H1/H2/H3;
- formularios de contacto;
- modal de consulta;
- tests E2E;
- configuración de build.

Si existe una diferencia entre el reporte de FASE 03 y el contenido real de `main`, documentarla antes de continuar.

**No asumir que un commit o reporte implica que los cambios están presentes.**

---

# 2. RECEPCIÓN REAL DE CONSULTAS

Resolver el bloqueo funcional identificado en FASE 03.

### ContactSection

Debe existir un mecanismo real de envío.

### ConsultationModal

Debe existir un mecanismo real de envío.

Preferencia para el PMV:

- mantener una integración simple;
- evitar backend innecesario;
- evitar almacenar datos sensibles en el frontend;
- utilizar variables de entorno cuando corresponda;
- no hardcodear secretos ni credenciales.

Si se utiliza Formspree:

- configurar el endpoint real;
- no dejar `YOUR_FORM_ID` ni placeholders;
- comprobar método `POST`;
- comprobar nombres de campos;
- comprobar estado de éxito;
- comprobar estado de error;
- comprobar comportamiento cuando el servicio externo falla.

**Importante:** no inventar ni generar un Form ID. Si el ID real no está disponible, dejar el bloqueante explícitamente identificado y no simular que está resuelto.

---

# 3. CONVERSIÓN

Validar el flujo completo:

**VISITA → COMPRENSIÓN → CONFIANZA → CTA → ENVÍO REAL → CONFIRMACIÓN**

Verificar:

- CTA principal;
- CTA secundario;
- teléfono;
- WhatsApp si existe actualmente;
- consulta urgente;
- formulario particular;
- formulario empresa;
- solicitud de consulta;
- mensajes de éxito;
- mensajes de error;
- prevención de doble envío;
- recuperación después de error.

No modificar copy estratégico sin evidencia o necesidad funcional.

---

# 4. DATOS Y PRIVACIDAD

Revisar que los formularios transmitan únicamente los datos necesarios.

Verificar:

- consentimiento/privacidad existente;
- no exposición de datos sensibles en URL;
- no logs innecesarios;
- no secretos en código cliente;
- comportamiento ante servicios externos;
- mensajes coherentes con confidencialidad y secreto profesional.

No afirmar que una comunicación es "encriptada" o "segura" si la implementación no lo demuestra técnicamente.

---

# 5. SEO DE PRODUCCIÓN

Validar sobre el estado real del repositorio:

- `title`;
- meta description;
- canonical;
- robots;
- sitemap;
- Open Graph;
- Twitter Cards;
- JSON-LD;
- H1 único y jerarquía semántica;
- URL pública definitiva;
- favicon/manifest si existen;
- indexabilidad.

Para una SPA:

- no tratar `#fragment` como URLs indexables independientes;
- sitemap únicamente con URLs indexables reales;
- canonical consistente con la URL indexable real.

No introducir keywords artificialmente.

---

# 6. PRODUCCIÓN / VERCEL

Validar:

- build de producción;
- rutas/rewrites si existen;
- assets públicos;
- variables de entorno requeridas;
- dominio/canonical configurado;
- comportamiento de formularios en producción;
- ausencia de endpoints localhost;
- ausencia de placeholders de desarrollo.

No modificar configuración de despliegue sin verificar primero la arquitectura actual.

---

# 7. QA

Ejecutar y registrar:

- `npm run typecheck`;
- `npm run build`;
- `npm run test:e2e`;
- revisión de consola;
- revisión de red;
- validación Desktop;
- validación Mobile.

Si `lint` no está configurado, no inventar un resultado PASS. Registrar `NOT CONFIGURED` y evaluar si debe incorporarse en esta fase.

---

# 8. REGRESIÓN UX/UI

Preservar el trabajo de diseño ya aprobado.

Verificar especialmente:

- navegación Desktop;
- navegación Mobile;
- hero;
- servicios;
- experiencia/trayectoria;
- FAQ;
- contacto;
- modal;
- CTAs;
- estados de éxito/error;
- responsive;
- accesibilidad básica.

No rediseñar.

---

# 9. CRITERIO DE SALIDA

La fase solo puede declararse completa si:

### FUNCTIONAL

- navegación PASS;
- formularios reales PASS;
- modal real PASS;
- estados de éxito PASS;
- estados de error PASS.

### SEO

- canonical PASS;
- sitemap PASS;
- robots PASS;
- metadata PASS;
- structured data PASS;
- indexabilidad PASS.

### PRODUCTION

- build PASS;
- E2E PASS;
- Desktop PASS;
- Mobile PASS;
- consola sin errores críticos;
- red sin errores críticos.

### CONVERSION

- CTA principal PASS;
- recepción real de consulta PASS;
- confirmación al usuario PASS.

---

# 10. REPORTE FINAL

Entregar:

## Baseline

Qué estado real se encontró en `main`.

## Funcionalidad

Estado por flujo.

## Formularios

Endpoint/integración utilizada y validación real.

## SEO

Problemas, correcciones y estado final.

## Producción

Configuración y validaciones realizadas.

## QA

Resultados de typecheck, build, E2E, consola, red, Desktop y Mobile.

## UX/UI preservado

Confirmación explícita de funcionalidades y diseño preservados.

## Bloqueantes

Solo los que no puedan resolverse de forma segura sin información externa.

---

# CRITERIO DE SALIDA FINAL

**PMV PRODUCTION + CONVERSION READY**
