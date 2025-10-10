import { test, expect } from '@playwright/test';

test('Add and remove number of coffee successfully, Coffee-4', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.locator('[data-test="checkout"]').hover();
  await page.getByRole('list').filter({ hasText: '+-' }).click();
  await expect(page.locator('#app')).toContainText('x 1');
  await page.getByRole('button', { name: 'Add one Cafe Breve' }).click();
  await page.getByRole('button', { name: 'Add one Cafe Breve' }).click();
  await expect(page.locator('#app')).toContainText('x 3');
  await page.getByRole('button', { name: 'Remove one Cafe Breve' }).click();
  await expect(page.locator('#app')).toContainText('x 2');
});