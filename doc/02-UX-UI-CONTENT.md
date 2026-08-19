# FASE 02 — UX/UI & CONTENT

## OBJETIVO

Auditar y optimizar la experiencia de usuario, interfaz y contenido del proyecto actual.

La finalidad es mejorar:

- claridad;
- jerarquía;
- usabilidad;
- accesibilidad;
- consistencia;
- comprensión;
- conversión;
- calidad del contenido.

SIN realizar un rediseño arbitrario.

---

# 1. REGLA PRINCIPAL

La aplicación actual debe considerarse la base visual y funcional.

NO eliminar funcionalidades existentes.

NO eliminar secciones existentes.

NO eliminar CTAs existentes.

NO eliminar formularios existentes.

NO modificar la arquitectura técnica salvo que sea estrictamente necesario para implementar una mejora UX/UI.

---

# 2. DISEÑO EXISTENTE

Preservar:

- identidad visual;
- paleta cromática;
- tipografías;
- estilo general;
- composición;
- sistema visual;
- assets existentes;
- personalidad de marca.

Las mejoras deben ser evolutivas, no un rediseño desde cero.

---

# 3. DESKTOP Y MOBILE

Auditar obligatoriamente:

## Desktop

Revisar:

- jerarquía visual;
- ancho de contenido;
- Hero;
- navegación;
- CTAs;
- tarjetas;
- formularios;
- modales;
- footer;
- espacios;
- legibilidad.

## Mobile

Revisar:

- navegación;
- jerarquía;
- tamaños;
- espaciado;
- botones;
- formularios;
- modal;
- textos;
- desbordamientos;
- interacción táctil;
- legibilidad.

NO eliminar la vista Desktop para optimizar Mobile.

NO eliminar Mobile para optimizar Desktop.

---

# 4. INVENTARIO UX

Auditar las funcionalidades existentes:

- navegación Inicio;
- navegación Trayectoria;
- navegación Contacto;
- Hero;
- servicios;
- detalle de servicios;
- CTA de consulta;
- modal de consulta;
- formulario Particular;
- formulario Empresa;
- campos dinámicos;
- consulta urgente;
- estados de formulario;
- footer;
- enlaces de contacto.

Para cada elemento evaluar:

- claridad;
- utilidad;
- consistencia;
- accesibilidad;
- jerarquía;
- fricción.

---

# 5. NAVEGACIÓN

Auditar:

- comprensión de las opciones;
- estado activo;
- consistencia;
- retorno al Inicio;
- acceso a Contacto;
- acceso a servicios;
- comportamiento en Mobile.

NO cambiar el modelo de navegación sin necesidad.

---

# 6. HERO

Auditar:

- claridad del mensaje;
- propuesta de valor;
- jerarquía;
- título;
- subtítulo;
- CTA principal;
- CTA secundario;
- relación entre texto y acción;
- legibilidad.

NO cambiar todavía:

- tamaño estructural;
- imágenes;
- composición visual.

Si se detectan problemas de tamaño o imagen:

registrarlos como recomendación para la fase correspondiente.

---

# 7. SERVICIOS

Auditar:

- comprensión inmediata;
- jerarquía;
- nombres;
- descripciones;
- iconografía;
- CTA;
- acceso al detalle;
- consistencia entre tarjetas.

No eliminar ningún servicio.

---

# 8. TRAYECTORIA

Auditar:

- jerarquía de información;
- credenciales;
- experiencia;
- estadísticas;
- timeline;
- método de trabajo;
- comprensión de la propuesta profesional.

Evitar contenido redundante.

---

# 9. CONTACTO

Auditar especialmente:

- claridad del formulario;
- diferencia Particular / Empresa;
- etiquetas;
- placeholders;
- campos obligatorios;
- mensajes de validación;
- estados de error;
- estado de éxito;
- consulta urgente;
- CTA;
- carga cognitiva.

NO modificar todavía la lógica de negocio.

---

# 10. MODAL DE CONSULTA

Auditar:

- motivo de apertura;
- claridad;
- jerarquía;
- cierre;
- accesibilidad;
- comportamiento Mobile;
- relación con el formulario principal.

El modal debe mantener su funcionalidad actual.

---

# 11. UX WRITING

Realizar una auditoría preliminar de:

- títulos;
- subtítulos;
- CTAs;
- etiquetas;
- placeholders;
- mensajes;
- botones;
- textos de ayuda;
- mensajes de error;
- mensajes de éxito.

Evaluar:

- claridad;
- tono;
- consistencia;
- formalidad;
- orientación al usuario;
- acción esperada.

IMPORTANTE:

NO realizar todavía una reescritura masiva de contenido.

Las recomendaciones específicas de copy deben quedar registradas para:

02A — UX WRITING.

---

# 12. ACCESIBILIDAD UX

Auditar:

- contraste;
- tamaño de texto;
- labels;
- botones;
- foco;
- navegación por teclado;
- elementos interactivos;
- estados;
- formularios;
- modales;
- atributos ARIA cuando sean necesarios.

No modificar la identidad visual para resolver una recomendación de accesibilidad sin justificarlo.

---

# 13. CONSISTENCIA UI

Auditar:

- botones;
- bordes;
- radios;
- sombras;
- espaciados;
- tamaños;
- iconos;
- estados;
- componentes repetidos.

Buscar inconsistencias reales.

No crear un nuevo design system si el actual funciona.

---

# 14. CONTENIDO

Auditar:

- información duplicada;
- información insuficiente;
- jerarquía;
- contenido poco claro;
- contenido que dificulta la conversión;
- datos profesionales;
- servicios;
- contacto.

No inventar información profesional.

No modificar datos legales o profesionales sin confirmación.

---

# 15. REGLA DE CAMBIOS

Se permiten:

- mejoras UX de bajo riesgo;
- mejoras UI de bajo riesgo;
- mejoras de accesibilidad;
- mejoras de jerarquía;
- mejoras de espaciado;
- mejoras de interacción;
- correcciones de inconsistencias.

No se permite:

- rediseñar completamente;
- cambiar identidad;
- eliminar funcionalidades;
- eliminar secciones;
- cambiar arquitectura;
- cambiar contenido profesional sin evidencia;
- sustituir componentes por preferencia.

---

# 16. VALIDACIÓN

Después de los cambios ejecutar:

- npm run typecheck;
- npm run build.

Si existe:

- npm run dev.

Verificar:

- Desktop;
- Mobile;
- navegación;
- formularios;
- modal;
- CTAs;
- servicios.

No declarar una validación que no haya sido realizada.

---

# 17. REPORTE

La respuesta debe contener:

## 1. Resumen ejecutivo

## 2. Auditoría UX

## 3. Auditoría UI

## 4. Auditoría Mobile

## 5. Auditoría Desktop

## 6. Accesibilidad

## 7. Contenido

## 8. Cambios realizados

Para cada cambio:

- archivo;
- problema;
- solución;
- impacto.

## 9. Cambios NO realizados

Explicar qué recomendaciones quedaron pendientes y por qué.

## 10. UX Writing pendiente

Separar las recomendaciones que corresponden a 02A.

## 11. Validación

Indicar resultados REALES de:

- typecheck;
- build;
- dev;
- pruebas manuales.

## 12. Funcionalidades preservadas

Confirmar explícitamente.

## 13. Diseño preservado

Confirmar:

- Desktop;
- Mobile;
- identidad visual.

## 14. Problemas pendientes

Solo problemas reales.

---

# CRITERIO DE FINALIZACIÓN

La Fase 02 solo puede considerarse terminada cuando:

- se auditó UX;
- se auditó UI;
- se auditó Desktop;
- se auditó Mobile;
- se auditó accesibilidad;
- se auditó contenido;
- se realizaron únicamente cambios seguros;
- se preservaron funcionalidades;
- se validó typecheck;
- se validó build.

NO avanzar automáticamente a 02A.

NO realizar todavía una reescritura completa de UX Writing.

---

# REGLA FINAL

NO inventar.

NO eliminar funcionalidades.

NO rediseñar.

NO modificar identidad visual.

NO cambiar contenido profesional sin evidencia.

NO avanzar a 02A.

Responder con el resultado real de la ejecución.