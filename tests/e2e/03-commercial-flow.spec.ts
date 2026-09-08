import { test, expect } from '@playwright/test';

test.describe('Commercial conversion flow', () => {
  test('Primary consultation CTA reaches contact funnel', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#cta-consultation-btn').click();
    await expect(page).toHaveURL(/\/contacto$/);
    await expect(page.locator('#contact-section')).toBeVisible();
  });

  test('Service consultation CTA carries the selected practice area', async ({ page }) => {
    await page.goto('/servicios-abogacia-mendoza', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /Defensa penal/i }).first().click();
    await expect(page.locator('[data-testid="service-expanded-panel"]')).toBeVisible();
    await page.getByRole('link', { name: /Solicitar consulta/i }).click();
    await expect(page).toHaveURL(/\/contacto$/);
    await expect(page.locator('#selected-practice-area')).toBeVisible();
    await expect(page.locator('input[name="practiceArea"]')).toHaveValue(/.+/);
  });

  test('Contact funnel validates required fields before submission', async ({ page }) => {
    await page.goto('/contacto', { waitUntil: 'domcontentloaded' });
    await page.locator('form button[type="submit"]').click();
    await expect(page.getByText(/Por favor ingrese su nombre completo/i)).toBeVisible();
    await expect(page.getByText(/Por favor ingrese un teléfono/i)).toBeVisible();
    await expect(page.getByText(/Por favor describa brevemente/i)).toBeVisible();
    await expect(page.locator('#contact-success-state')).toHaveCount(0);
  });

  test('Business consultation mode requires the business email', async ({ page }) => {
    await page.goto('/contacto', { waitUntil: 'domcontentloaded' });
    await page.getByRole('tab', { name: /Empresa y Directivos/i }).click();
    await page.locator('form button[type="submit"]').click();
    await expect(page.getByText(/Por favor ingrese un correo electrónico/i)).toBeVisible();
  });

  test('Contact consultation modes are mutually selectable', async ({ page }) => {
    await page.goto('/contacto', { waitUntil: 'domcontentloaded' });
    const modes = page.locator('button[aria-pressed]');
    await expect(modes).toHaveCount(3);
    const video = page.getByRole('button', { name: /Videollamada/i }).first();
    const otherMode = modes.filter({ hasNotText: /Videollamada/i }).first();
    await expect(video).toBeVisible();
    await expect(otherMode).toBeVisible();
    await video.click();
    await expect(video).toHaveAttribute('aria-pressed', 'true');
    await otherMode.click();
    await expect(otherMode).toHaveAttribute('aria-pressed', 'true');
    await expect(video).toHaveAttribute('aria-pressed', 'false');
  });

  test('WhatsApp conversion entrypoint exposes an external contact target', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const whatsapp = page.locator('a[aria-label*="WhatsApp"]').first();
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute('href', /^https:\/\/wa\.me\//);
    await expect(whatsapp).toHaveAttribute('target', '_blank');
  });

  test('Mobile consultation CTA reaches contact without opening a modal', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only coverage');
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#mobile-menu-toggle').click();
    await page.locator('#mobile-cta-consult-btn').click();
    await expect(page).toHaveURL(/\/contacto$/);
    await expect(page.locator('#contact-section')).toBeVisible();
    await expect(page.locator('#consultation-modal-overlay')).toHaveCount(0);
  });
});
