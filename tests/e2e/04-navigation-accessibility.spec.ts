import { test, expect } from '@playwright/test';

test.describe('navigation accessibility', () => {
  test('exposes skip link and semantic desktop navigation', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: 'Saltar al contenido principal' });
    await expect(skipLink).toHaveAttribute('href', '#main-content');
    await expect(page.locator('#main-content')).toBeVisible();

    const primaryNav = page.getByRole('navigation', { name: 'Navegación principal' });
    await expect(primaryNav.getByRole('link', { name: 'Preguntas frecuentes' })).toHaveAttribute('href', '/preguntas-frecuentes');
    await expect(primaryNav.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '/servicios-abogacia-mendoza');
  });

  test('keeps the mobile menu control at an accessible touch target', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const toggle = page.locator('#mobile-menu-toggle');
    await expect(toggle).toBeVisible();
    const box = await toggle.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });
});
