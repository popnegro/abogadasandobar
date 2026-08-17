# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02b1-qa.spec.ts >> FASE 04 — Unified conversion flow >> All rendered image assets load successfully
- Location: tests/e2e/02b1-qa.spec.ts:61:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e6]:
      - button "ES Logo Emilia Sandobar Despacho Penal & Corporativo" [ref=e7]:
        - img "ES Logo" [ref=e9]
        - generic [ref=e10]:
          - generic [ref=e11]: Emilia Sandobar
          - generic [ref=e12]: Despacho Penal & Corporativo
      - navigation [ref=e13]:
        - button "Servicios" [ref=e14]
        - button "Experiencia" [ref=e15]
        - button "Preguntas frecuentes" [ref=e16]
      - button "Solicitar Consulta" [ref=e18]
  - main [ref=e20]:
    - generic [ref=e21]:
      - generic [ref=e25]:
        - generic [ref=e26]: Defensa Penal & Asesoría Corporativa
        - generic [ref=e27]:
          - generic [ref=e29]:
            - heading "Defensa Penal Estratégica & Asesoría Corporativa" [level=1] [ref=e30]
            - paragraph [ref=e31]: Especialista en derecho penal económico, litigación procesal compleja y protección patrimonial integral ante cualquier instancia judicial con máxima confidencialidad.
          - generic [ref=e33]:
            - heading "¿Necesita asistencia jurídica?" [level=2] [ref=e34]
            - generic [ref=e35]:
              - button "Solicitar consulta" [ref=e36] [cursor=pointer]
              - button "Ver Canales de Contacto" [ref=e40] [cursor=pointer]
      - generic [ref=e43]:
        - generic [ref=e44]:
          - generic [ref=e45]:
            - generic [ref=e46]: Áreas de Práctica Especializada
            - heading "Servicios & Dirección Jurídica" [level=2] [ref=e47]
            - paragraph [ref=e48]: Intervención técnica y estratégica en causas penales complejas, blindaje directivo y asesoramiento corporativo preventivo ante cualquier tribunal.
          - button "Ver todos los servicios" [ref=e49] [cursor=pointer]
        - generic "Carrusel de servicios" [ref=e54]:
          - button "01 Derecho Penal Económico y Financiero Defensa técnica en defraudaciones, administración fraudulenta, insolvencias punibles y blanqueo de capitales. Ver alcance" [ref=e55] [cursor=pointer]:
            - generic [ref=e56]:
              - generic [ref=e57]: "01"
              - generic [ref=e62]: Derecho Penal Económico y Financiero
              - generic [ref=e63]: Defensa técnica en defraudaciones, administración fraudulenta, insolvencias punibles y blanqueo de capitales.
            - generic [ref=e64]: Ver alcance
          - button "02 Litigación Penal Compleja y Juicio Oral Dirección letrada con intervención directa en sala, preparación pericial e interrogatorios estratégicos. Ver alcance" [ref=e68] [cursor=pointer]:
            - generic [ref=e69]:
              - generic [ref=e70]: "02"
              - generic [ref=e77]: Litigación Penal Compleja y Juicio Oral
              - generic [ref=e78]: Dirección letrada con intervención directa en sala, preparación pericial e interrogatorios estratégicos.
            - generic [ref=e79]: Ver alcance
          - button "03 Compliance Penal y Programas de Integridad Diseño, auditoría e implantación de planes de prevención de delitos (art. 31 bis del Código Penal). Ver alcance" [ref=e83] [cursor=pointer]:
            - generic [ref=e84]:
              - generic [ref=e85]: "03"
              - generic [ref=e92]: Compliance Penal y Programas de Integridad
              - generic [ref=e93]: Diseño, auditoría e implantación de planes de prevención de delitos (art. 31 bis del Código Penal).
            - generic [ref=e94]: Ver alcance
          - button "04 Derecho Penal Societario y Tributario Asesoramiento y defensa del órgano de administración frente a contingencias penales, fiscales y societarias. Ver alcance" [ref=e98] [cursor=pointer]:
            - generic [ref=e99]:
              - generic [ref=e100]: "04"
              - generic [ref=e106]: Derecho Penal Societario y Tributario
              - generic [ref=e107]: Asesoramiento y defensa del órgano de administración frente a contingencias penales, fiscales y societarias.
            - generic [ref=e108]: Ver alcance
          - button "05 Ciberdelitos y Fraude Digital Respuesta procesal inmediata ante estafas informáticas, sabotaje digital, fuga de datos y revelación de secretos. Ver alcance" [ref=e112] [cursor=pointer]:
            - generic [ref=e113]:
              - generic [ref=e114]: "05"
              - generic [ref=e120]: Ciberdelitos y Fraude Digital
              - generic [ref=e121]: Respuesta procesal inmediata ante estafas informáticas, sabotaje digital, fuga de datos y revelación de secretos.
            - generic [ref=e122]: Ver alcance
          - button "06 Urgencias Penales y Medidas Cautelares Atención 24/7 para detenciones policiales, registros judiciales y comparecencias de prisión provisional. Ver alcance" [ref=e126] [cursor=pointer]:
            - generic [ref=e127]:
              - generic [ref=e128]: "06"
              - generic [ref=e133]: Urgencias Penales y Medidas Cautelares
              - generic [ref=e134]: Atención 24/7 para detenciones policiales, registros judiciales y comparecencias de prisión provisional.
            - generic [ref=e135]: Ver alcance
          - button "07 Investigaciones Internas y Forensic Esclarecimiento de irregularidades corporativas, forensic documental y entrevistas de investigación. Ver alcance" [ref=e139] [cursor=pointer]:
            - generic [ref=e140]:
              - generic [ref=e141]: "07"
              - generic [ref=e147]: Investigaciones Internas y Forensic
              - generic [ref=e148]: Esclarecimiento de irregularidades corporativas, forensic documental y entrevistas de investigación.
            - generic [ref=e149]: Ver alcance
          - button "08 Derecho Penal Ambiental y Urbanístico Defensa técnica frente a imputaciones por delitos contra el medio ambiente, territorio y seguridad industrial. Ver alcance" [ref=e153] [cursor=pointer]:
            - generic [ref=e154]:
              - generic [ref=e155]: "08"
              - generic [ref=e162]: Derecho Penal Ambiental y Urbanístico
              - generic [ref=e163]: Defensa técnica frente a imputaciones por delitos contra el medio ambiente, territorio y seguridad industrial.
            - generic [ref=e164]: Ver alcance
  - contentinfo [ref=e168]:
    - generic [ref=e170]:
      - paragraph [ref=e173]:
        - strong [ref=e174]: "Guardia Penal Activa en Mendoza:"
        - text: Asistencia urgente 24hs por detenciones o allanamientos en el Polo Judicial Penal y Gran Mendoza.
      - generic [ref=e175]:
        - 'link "Guardia 24hs: +54 9 261 512-3456" [ref=e176] [cursor=pointer]':
          - /url: tel:+549261512-3456
        - button "Pedir Turno" [ref=e180] [cursor=pointer]
    - generic [ref=e182]:
      - generic [ref=e183]:
        - generic [ref=e184]:
          - generic [ref=e185]:
            - generic [ref=e186]: ES
            - generic [ref=e187]:
              - generic [ref=e188]: Dra. Emilia Sandobar
              - generic [ref=e189]: Abogada Penalista & Asesora Corporativa
          - paragraph [ref=e190]: Estudio jurídico especializado en Derecho Penal Económico, Litigación de Alta Complejidad y Programas de Integridad Corporativa en la Provincia de Mendoza y Fueros Federales de Cuyo.
          - generic [ref=e191]:
            - generic [ref=e192]: Mat. Provincial N° 9.842
            - generic [ref=e198]: "Habilitación: Suprema Corte de Mendoza & Fuero Federal"
        - generic [ref=e202]:
          - generic [ref=e203]: Áreas & Servicios Mendoza
          - list [ref=e204]:
            - listitem [ref=e205]:
              - button "› Derecho Penal Económico y Financiero" [ref=e206] [cursor=pointer]:
                - generic [ref=e207]: ›
                - generic [ref=e208]: Derecho Penal Económico y Financiero
            - listitem [ref=e209]:
              - button "› Litigación Penal Compleja y Juicio Oral" [ref=e210] [cursor=pointer]:
                - generic [ref=e211]: ›
                - generic [ref=e212]: Litigación Penal Compleja y Juicio Oral
            - listitem [ref=e213]:
              - button "› Compliance Penal y Programas de Integridad" [ref=e214] [cursor=pointer]:
                - generic [ref=e215]: ›
                - generic [ref=e216]: Compliance Penal y Programas de Integridad
            - listitem [ref=e217]:
              - button "› Derecho Penal Societario y Tributario" [ref=e218] [cursor=pointer]:
                - generic [ref=e219]: ›
                - generic [ref=e220]: Derecho Penal Societario y Tributario
            - listitem [ref=e221]:
              - button "› Ciberdelitos y Fraude Digital" [ref=e222] [cursor=pointer]:
                - generic [ref=e223]: ›
                - generic [ref=e224]: Ciberdelitos y Fraude Digital
            - listitem [ref=e225]:
              - button "› Urgencias Penales y Medidas Cautelares" [ref=e226] [cursor=pointer]:
                - generic [ref=e227]: ›
                - generic [ref=e228]: Urgencias Penales y Medidas Cautelares
            - listitem [ref=e229]:
              - button "› Investigaciones Internas y Forensic" [ref=e230] [cursor=pointer]:
                - generic [ref=e231]: ›
                - generic [ref=e232]: Investigaciones Internas y Forensic
            - listitem [ref=e233]:
              - button "› Derecho Penal Ambiental y Urbanístico" [ref=e234] [cursor=pointer]:
                - generic [ref=e235]: ›
                - generic [ref=e236]: Derecho Penal Ambiental y Urbanístico
        - generic [ref=e237]:
          - generic [ref=e238]: Jurisdicción & Cobertura
          - generic [ref=e239]:
            - generic [ref=e240]:
              - generic [ref=e241]: 1ª Circunscripción (Gran Mendoza)
              - paragraph [ref=e242]: Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Maipú, Luján de Cuyo, Lavalle. Polo Judicial Penal.
            - generic [ref=e243]:
              - generic [ref=e244]: 2ª & 3ª Circunscripción
              - paragraph [ref=e245]: San Rafael, Gral. Alvear, Malargüe, San Martín, Rivadavia, Junín, Santa Rosa y La Paz.
            - generic [ref=e246]:
              - generic [ref=e247]: 4ª Circunscripción (Valle de Uco)
              - paragraph [ref=e248]: Tunuyán, Tupungato, San Carlos.
            - generic [ref=e249]:
              - generic [ref=e250]: Fuero Penal Federal
              - paragraph [ref=e251]: Juzgados Federales 1, 2 y 3 de Mendoza, TOF y Cámara Federal de Apelaciones.
        - generic [ref=e252]:
          - generic [ref=e253]: Sede & Contacto
          - generic [ref=e254]:
            - generic [ref=e259]:
              - generic [ref=e260]: Av. España 948, 4º Piso
              - generic [ref=e261]: Ciudad de Mendoza, M5500, Mendoza, Argentina
            - link "+54 261 423-8900" [ref=e265] [cursor=pointer]:
              - /url: tel:+54261423-8900
            - link "consulta@sandobar-abogados.com.ar" [ref=e270] [cursor=pointer]:
              - /url: mailto:consulta@sandobar-abogados.com.ar
            - generic [ref=e271]: "Lun a Vie: 08:30 - 19:30 hs"
          - button "Cita Confidencial" [ref=e277] [cursor=pointer]
      - generic [ref=e278]:
        - generic [ref=e279]: "Términos & Servicios Indexados en Mendoza:"
        - generic [ref=e280]:
          - generic [ref=e281]: Abogado Penalista Mendoza
          - generic [ref=e282]: Defensa Penal en Polo Judicial Mendoza
          - generic [ref=e283]: Delitos Económicos y Financieros Mendoza
          - generic [ref=e284]: Guardia Penal 24hs Mendoza
          - generic [ref=e285]: Asistencia al Detenido Gran Mendoza
          - generic [ref=e286]: Compliance Penal Corporativo Mendoza
          - generic [ref=e287]: Ciberdelitos & Fraude Digital Cuyo
          - generic [ref=e288]: Tribunales Penales Colegiados Mendoza
          - generic [ref=e289]: Cámara Federal de Apelaciones de Mendoza
          - generic [ref=e290]: Suprema Corte de Justicia de Mendoza
          - generic [ref=e291]: Responsabilidad Penal Directivos Mendoza
          - generic [ref=e292]: Derecho Penal Tributario AFIP Mendoza
          - generic [ref=e293]: Abogado Penalista San Rafael
          - generic [ref=e294]: Abogado Penalista Godoy Cruz
          - generic [ref=e295]: Abogado Penalista Guaymallén
      - generic [ref=e296]:
        - generic [ref=e297]:
          - button "Inicio" [ref=e298] [cursor=pointer]
          - button "Servicios" [ref=e299] [cursor=pointer]
          - button "Sobre Mí" [ref=e300] [cursor=pointer]
          - button "Experiencia" [ref=e301] [cursor=pointer]
          - button "Preguntas Frecuentes" [ref=e302] [cursor=pointer]
          - button "Contacto" [ref=e303] [cursor=pointer]
        - generic [ref=e304]:
          - generic [ref=e305]: © 2026 Dra. Emilia Sandobar. Todos los derechos reservados.
          - generic [ref=e306]:
            - generic [ref=e307]: Mat. Prov. 9.842 Mendoza
            - generic [ref=e308]: ·
            - generic [ref=e309]: Secreto Profesional Ley 4976
            - generic [ref=e310]: ·
            - generic [ref=e311]: Ley 25.326
  - 'link "Urgencias Penales 24h: +54 9 261 512-3456" [ref=e313] [cursor=pointer]':
    - /url: tel:+549261512-3456
    - generic [ref=e316]: "Urgencias Penales 24h:"
    - generic [ref=e317]: +54 9 261 512-3456
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const heroImageHost = 'assets/images/hero';
  4  | 
  5  | test.describe('FASE 04 — Unified conversion flow', () => {
  6  |   test.beforeEach(async ({ page }) => {
  7  |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  8  |   });
  9  | 
  10 |   test('Desktop: Home, Hero and primary CTA render', async ({ page }) => {
  11 |     await expect(page.locator('#main-navbar')).toBeVisible();
  12 |     await expect(page.locator('#hero-banner')).toBeVisible();
  13 |     await expect(page.getByRole('heading', { name: /Defensa Penal Estratégica/i }).first()).toBeVisible();
  14 |     await expect(page.getByRole('button', { name: /Solicitar consulta/i }).first()).toBeVisible();
  15 |   });
  16 | 
  17 |   test('Hero asset remains external and stable', async ({ page }) => {
  18 |     const backgroundImage = await page.locator('#hero-banner > div').first().evaluate((element) => getComputedStyle(element).backgroundImage);
  19 |     expect(backgroundImage).toContain(heroImageHost);
  20 |   });
  21 | 
  22 |   test('Primary CTA navigates to the unified contact flow without a consultation modal', async ({ page }) => {
  23 |     await page.getByRole('button', { name: /Solicitar consulta/i }).first().click();
  24 |     await expect(page.locator('#contact-section')).toBeVisible();
  25 |     await expect(page.locator('#contact-full-name')).toBeVisible();
  26 |     await expect(page.locator('#consultation-modal-overlay')).toHaveCount(0);
  27 |   });
  28 | 
  29 |   test('Contact form exposes consultation mode and validation', async ({ page }) => {
  30 |     await page.getByRole('button', { name: /Solicitar consulta/i }).first().click();
  31 |     await page.getByRole('button', { name: /Solicitar consulta/i }).last().click();
  32 |     await expect(page.getByText(/Por favor ingrese su nombre completo/i)).toBeVisible();
  33 |     await expect(page.getByRole('button', { name: /Videollamada/i })).toHaveAttribute('aria-pressed', 'false');
  34 |     await page.getByRole('button', { name: /Videollamada/i }).click();
  35 |     await expect(page.getByRole('button', { name: /Videollamada/i })).toHaveAttribute('aria-pressed', 'true');
  36 |   });
  37 | 
  38 |   test('Services CTA preserves the selected practice area in Contact', async ({ page, isMobile }) => {
  39 |     if (isMobile) {
  40 |       await page.locator('#mobile-menu-toggle').click();
  41 |       await page.locator('#mobile-nav-link-servicios').click();
  42 |     } else {
  43 |       await page.locator('#nav-link-servicios').click();
  44 |     }
  45 |     const firstService = page.locator('[role="button"][aria-label^="Conocer alcance"]').first();
  46 |     await firstService.click();
  47 |     await page.getByRole('button', { name: /Solicitar Consulta sobre esta Área/i }).click();
  48 |     await expect(page.locator('#contact-section')).toBeVisible();
  49 |     await expect(page.locator('input[name="practiceArea"]')).toHaveValue(/.+/);
  50 |   });
  51 | 
  52 |   test('Mobile navigation reaches the unified contact flow', async ({ page, isMobile }) => {
  53 |     test.skip(!isMobile, 'Mobile-only coverage');
  54 |     await page.locator('#mobile-menu-toggle').click();
  55 |     await expect(page.locator('#mobile-nav-drawer')).toBeVisible();
  56 |     await page.locator('#mobile-cta-consult-btn').click();
  57 |     await expect(page.locator('#contact-section')).toBeVisible();
  58 |     await expect(page.locator('#consultation-modal-overlay')).toHaveCount(0);
  59 |   });
  60 | 
  61 |   test('All rendered image assets load successfully', async ({ page }) => {
  62 |     const images = page.locator('img');
  63 |     const count = await images.count();
  64 |     for (let index = 0; index < count; index += 1) {
  65 |       const image = images.nth(index);
  66 |       await expect(image).toBeVisible();
> 67 |       await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
     |                                                                                                                                             ^ Error: expect(received).toBe(expected) // Object.is equality
  68 |     }
  69 |   });
  70 | 
  71 |   test('No uncaught JavaScript page errors occur during initial load', async ({ page }) => {
  72 |     const pageErrors: string[] = [];
  73 |     page.on('pageerror', (error) => pageErrors.push(error.message));
  74 |     await page.reload({ waitUntil: 'networkidle' });
  75 |     expect(pageErrors).toEqual([]);
  76 |   });
  77 | });
  78 | 
```