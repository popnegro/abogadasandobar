import { test, expect } from '@playwright/test';

const heroImageHost = 'assets/images/hero';

test.describe('FASE 04 — Unified conversion flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('Desktop: Home, Hero and primary CTA render', async ({ page }) => {
    await expect(page.locator('#main-navbar')).toBeVisible();
    await expect(page.locator('#hero-banner')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Defensa Penal Estratégica/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Solicitar consulta/i }).first()).toBeVisible();
  });

  test('Hero asset remains external and stable', async ({ page }) => {
    const backgroundImage = await page.locator('#hero-banner > div').first().evaluate((element) => getComputedStyle(element).backgroundImage);
    expect(backgroundImage).toContain(heroImageHost);
  });

  test('Primary CTA navigates to the unified contact flow without a consultation modal', async ({ page }) => {
    await page.getByRole('button', { name: /Solicitar consulta/i }).first().click();
    await expect(page.locator('#contact-section')).toBeVisible();
    await expect(page.locator('#contact-full-name')).toBeVisible();
    await expect(page.locator('#consultation-modal-overlay')).toHaveCount(0);
  });

  test('Contact form exposes consultation mode and validation', async ({ page }) => {
    await page.getByRole('button', { name: /Solicitar consulta/i }).first().click();
    await page.getByRole('button', { name: /Solicitar consulta/i }).last().click();
    await expect(page.getByText(/Por favor ingrese su nombre completo/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Videollamada/i })).toHaveAttribute('aria-pressed', 'false');
    await page.getByRole('button', { name: /Videollamada/i }).click();
    await expect(page.getByRole('button', { name: /Videollamada/i })).toHaveAttribute('aria-pressed', 'true');
  });

  test('Services CTA preserves the selected practice area in Contact', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('#mobile-menu-toggle').click();
      await page.locator('#mobile-nav-link-servicios').click();
    } else {
      await page.locator('#nav-link-servicios').click();
    }
    const firstService = page.locator('[role="button"][aria-label^="Conocer alcance"]').first();
    await firstService.click();
    await page.getByRole('button', { name: /Solicitar Consulta sobre esta Área/i }).click();
    await expect(page.locator('#contact-section')).toBeVisible();
    await expect(page.locator('input[name="practiceArea"]')).toHaveValue(/.+/);
  });

  test('Mobile navigation reaches the unified contact flow', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only coverage');
    await page.locator('#mobile-menu-toggle').click();
    await expect(page.locator('#mobile-nav-drawer')).toBeVisible();
    await page.locator('#mobile-cta-consult-btn').click();
    await expect(page.locator('#contact-section')).toBeVisible();
    await expect(page.locator('#consultation-modal-overlay')).toHaveCount(0);
  });

  test('All rendered image assets load successfully', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let index = 0; index < count; index += 1) {
      const image = images.nth(index);
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
  });

  test('No uncaught JavaScript page errors occur during initial load', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.reload({ waitUntil: 'networkidle' });
    expect(pageErrors).toEqual([]);
  });
});
