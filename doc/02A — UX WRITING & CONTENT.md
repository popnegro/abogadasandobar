# FASE 02A — UX WRITING & CONTENT

## OBJETIVO

Realizar una auditoría y optimización completa del UX Writing y del contenido visible de la aplicación.

El objetivo es mejorar:

- claridad;
- consistencia;
- tono de voz;
- jerarquía textual;
- microcopy;
- CTAs;
- labels;
- placeholders;
- mensajes de ayuda;
- mensajes de estado;
- mensajes de error;
- textos de formularios;
- textos de navegación;
- textos de interacción.

La intervención debe preservar completamente:

- funcionalidades existentes;
- arquitectura existente;
- diseño visual;
- identidad visual;
- layout;
- componentes;
- responsive;
- Desktop;
- Mobile.

---

# REGLAS ABSOLUTAS

## 1. NO MODIFICAR EL DISEÑO

No modificar:

- colores;
- tipografías;
- tamaños visuales salvo que sea estrictamente necesario por contenido;
- espaciados;
- grids;
- layouts;
- componentes visuales;
- animaciones;
- imágenes;
- iconos;
- estructura visual;
- composición del Hero;
- alturas del Hero;
- responsive;
- breakpoints.

Esta fase es exclusivamente de UX Writing y Content.

---

## 2. NO ELIMINAR FUNCIONALIDADES

Está prohibido eliminar, desactivar o simplificar funcionalidades existentes.

No eliminar:

- navegación;
- formularios;
- campos;
- CTAs;
- modales;
- servicios;
- secciones;
- enlaces;
- interacciones;
- validaciones;
- estados;
- lógica existente.

Si un texto parece innecesario pero está asociado a una funcionalidad, NO eliminarlo sin evidencia inequívoca.

---

## 3. NO INVENTAR INFORMACIÓN

No inventar:

- datos profesionales;
- años de experiencia;
- porcentajes;
- cantidad de casos;
- credenciales;
- títulos;
- matrículas;
- clientes;
- especialidades;
- resultados;
- testimonios;
- estadísticas;
- direcciones;
- teléfonos;
- emails;
- horarios;
- información legal.

Si un texto requiere información que no existe en el proyecto:

`PENDIENTE — INFORMACIÓN NO DISPONIBLE`

No completar mediante suposiciones.

---

# 4. TONO DE VOZ

El proyecto corresponde a un estudio profesional de abogacía.

Utilizar un tono:

- profesional;
- institucional;
- claro;
- sobrio;
- confiable;
- preciso;
- humano;
- directo.

Evitar:

- lenguaje excesivamente comercial;
- exageraciones;
- promesas absolutas;
- lenguaje agresivo;
- clichés publicitarios;
- frases genéricas;
- tecnicismos innecesarios;
- tono informal.

---

# 5. TRATAMIENTO DEL USUARIO

Mantener un tratamiento formal consistente.

Utilizar:

- usted;
- tiene;
- puede;
- comuníquese;
- consulte;
- conozca;
- solicite.

Evitar mezclar con voseo:

- tenés;
- podés;
- contactate;
- escribinos;
- consultanos.

Debe existir consistencia en todo el sitio.

---

# 6. AUDITORÍA ANTES DE MODIFICAR

Antes de modificar cualquier texto:

1. inspeccionar todo `src/`;
2. localizar todos los textos visibles;
3. identificar textos duplicados;
4. identificar CTAs;
5. identificar labels;
6. identificar placeholders;
7. identificar helper text;
8. identificar mensajes de error;
9. identificar mensajes de éxito;
10. identificar textos de navegación;
11. identificar textos del Hero;
12. identificar textos de servicios;
13. identificar textos de Trayectoria;
14. identificar textos de Contacto;
15. identificar textos del Footer;
16. identificar textos de modales;
17. identificar textos asociados a estados interactivos.

No comenzar editando únicamente un componente aislado.

---

# 7. INVENTARIO DE CONTENIDO

Crear internamente un inventario con:

| Ubicación | Texto actual | Tipo | Problema | Acción |
|---|---|---|---|---|

Tipos posibles:

- Heading
- Subheading
- Body
- CTA
- Navigation
- Label
- Placeholder
- Helper text
- Error
- Success
- Modal
- Card
- Footer
- Accessibility text

---

# 8. CRITERIOS DE REDACCIÓN

Cada texto debe evaluarse según:

### Claridad

¿El usuario entiende inmediatamente qué significa?

### Acción

¿El CTA deja claro qué ocurrirá al activarlo?

### Consistencia

¿Utiliza el mismo vocabulario que el resto del sitio?

### Tono

¿Mantiene el tono profesional e institucional?

### Utilidad

¿El texto aporta información real?

### Brevedad

¿Puede decirse lo mismo con menos palabras sin perder precisión?

### Usuario

¿El texto está centrado en lo que el usuario necesita?

---

# 9. HERO

Auditar:

- título;
- subtítulo;
- descripción;
- CTA principal;
- CTA secundario;
- microcopy;
- mensajes de confianza.

No modificar:

- tamaño;
- posición;
- imagen;
- altura;
- composición.

Si se detecta un problema visual relacionado con el Hero:

`DERIVAR A FASE 02B`

No implementarlo en esta fase.

---

# 10. CTA

Revisar todos los CTAs del proyecto.

Especial atención a:

- CTA principal del Hero;
- CTA de servicios;
- CTA de contacto;
- CTA de consulta;
- CTA de urgencia;
- CTA del Footer;
- acciones dentro de modales.

Cada CTA debe responder claramente:

**¿Qué ocurrirá cuando haga clic?**

Preferir acciones concretas.

Ejemplos:

- "Conocer áreas de práctica"
- "Solicitar una consulta"
- "Contactar al estudio"
- "Ver trayectoria"

Evitar CTAs ambiguos como:

- "Más información";
- "Descubrir";
- "Explorar";
- "Continuar";

cuando exista una alternativa más precisa.

---

# 11. FORMULARIOS

Auditar todos los formularios.

Revisar:

- labels;
- placeholders;
- helper text;
- mensajes de error;
- mensajes de éxito;
- botones;
- estados;
- campos obligatorios;
- mensajes de validación.

## REGLA

El placeholder NO debe funcionar como sustituto del label.

El label debe comunicar qué información debe ingresar el usuario.

El placeholder puede utilizarse únicamente como ejemplo.

---

# 12. CONSULTA URGENTE

Auditar específicamente la opción:

`Consulta Urgente`

Debe quedar claro qué significa marcarla.

Si el proyecto no contiene información suficiente para determinar qué implica realmente una consulta urgente, NO inventar una explicación.

En ese caso:

`PENDIENTE — DEFINIR CRITERIO DE URGENCIA`

No prometer:

- atención inmediata;
- respuesta inmediata;
- disponibilidad 24/7;
- prioridad garantizada;

si esa información no está explícitamente respaldada por el proyecto.

---

# 13. MENSAJES DE ERROR

Revisar mensajes técnicos o poco comprensibles.

Evitar mostrar:

- errores internos;
- stack traces;
- nombres de variables;
- códigos técnicos innecesarios.

Preferir mensajes claros orientados al usuario.

Ejemplo conceptual:

En lugar de:

`Invalid field`

usar una explicación comprensible.

No alterar la lógica de validación.

---

# 14. MENSAJES DE ÉXITO

Auditar el mensaje posterior al envío de formularios.

Debe comunicar:

1. que la acción fue recibida;
2. qué ocurrió;
3. qué puede esperar el usuario, únicamente si existe información real.

No inventar tiempos de respuesta.

---

# 15. NAVEGACIÓN

Revisar:

- Inicio;
- Trayectoria;
- Contacto;
- Servicios;
- navegación secundaria;
- navegación del Footer.

Mantener exactamente las funcionalidades existentes.

No cambiar la arquitectura de navegación.

---

# 16. SERVICIOS

Auditar:

- nombres;
- títulos;
- descripciones;
- CTAs;
- textos de tarjetas;
- textos de detalle.

Mantener consistencia terminológica.

Si un servicio aparece nombrado de diferentes maneras en distintas partes del sitio, identificarlo y unificarlo únicamente cuando sea inequívoco.

---

# 17. TRAYECTORIA

Auditar:

- títulos;
- biografía;
- estadísticas;
- timeline;
- credenciales;
- método de trabajo.

No modificar datos objetivos.

No alterar:

- números;
- fechas;
- porcentajes;
- años;
- cargos;
- títulos académicos.

Solo mejorar redacción cuando el significado original sea inequívoco.

---

# 18. FOOTER

Auditar:

- información institucional;
- navegación;
- contacto;
- CTAs;
- enlaces;
- textos legales.

No modificar datos de contacto.

No inventar información.

---

# 19. ACCESIBILIDAD TEXTUAL

Revisar:

- labels;
- textos de botones;
- nombres accesibles;
- textos de enlaces;
- mensajes de error;
- instrucciones;
- estados.

Los textos deben poder comprenderse fuera de su contexto visual cuando sea necesario.

No realizar en esta fase una refactorización técnica de accesibilidad.

Si se requiere una modificación estructural:

`DERIVAR A FASE 03`

---

# 20. CONSISTENCIA TERMINOLÓGICA

Crear una lista interna de términos principales.

Ejemplo:

| Concepto | Término canónico |
|---|---|
| Contacto | Contacto |
| Consulta | Consulta |
| Servicios | Áreas de práctica |
| Trayectoria | Trayectoria |
| Urgencia | Consulta urgente |

No cambiar términos sin analizar previamente todas sus apariciones.

---

# 21. CAMBIOS PERMITIDOS

Está permitido:

- modificar textos;
- mejorar CTAs;
- corregir gramática;
- corregir ortografía;
- corregir inconsistencias de tono;
- mejorar labels;
- mejorar placeholders;
- añadir helper text cuando exista información suficiente;
- mejorar mensajes de error;
- mejorar mensajes de éxito;
- unificar terminología.

---

# 22. CAMBIOS PROHIBIDOS

No realizar:

- rediseño;
- cambios de layout;
- cambios de colores;
- cambios de tipografía;
- cambios de imágenes;
- reemplazo de assets;
- cambios del Hero;
- cambios de altura del Hero;
- cambios de focal point;
- refactorización arquitectónica;
- cambios de routing;
- incorporación de SEO;
- incorporación de Schema.org;
- cambios de performance;
- instalación de nuevas dependencias;
- migración de frameworks;
- eliminación de funcionalidades.

Estos temas pertenecen a otras fases.

---

# 23. FASE 02B

Todo hallazgo relacionado con:

- imágenes;
- assets definitivos;
- Hero;
- focal point;
- tamaño del Hero;
- integración visual final;
- composición Desktop/Mobile;

debe registrarse como:

`DERIVADO A FASE 02B — FINAL DESIGN INTEGRATION`

No implementarlo ahora.

---

# 24. FASE 03

Todo hallazgo relacionado con:

- SEO;
- Schema.org;
- SEO Local;
- metadata;
- performance;
- optimización técnica;
- arquitectura avanzada;
- analytics;

debe registrarse como:

`DERIVADO A FASE 03`

No implementarlo ahora.

---

# 25. REGLA DE NO REGRESIÓN

Antes de modificar contenido:

- verificar dónde se utiliza;
- verificar si está asociado a lógica;
- verificar si forma parte de una condición;
- verificar si forma parte de una validación;
- verificar si se utiliza en Desktop y Mobile.

No modificar cadenas utilizadas por lógica funcional sin comprobar su impacto.

---

# 26. VALIDACIÓN OBLIGATORIA

Después de los cambios ejecutar:

```bash
npm run typecheck