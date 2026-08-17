# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02b1-qa.spec.ts >> FASE 04 — Unified conversion flow >> Desktop: Home, Hero and primary CTA render
- Location: tests/e2e/02b1-qa.spec.ts:10:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#main-navbar')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#main-navbar')

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
> 11 |     await expect(page.locator('#main-navbar')).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
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
  67 |       await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
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