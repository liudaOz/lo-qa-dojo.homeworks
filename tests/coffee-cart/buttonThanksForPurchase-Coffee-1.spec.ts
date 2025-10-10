import { test, expect } from '@playwright/test';

test('button "Thanks for purchase is present is successfully, Coffee-1', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $');
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@mail');
  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toContainText('Thanks for your purchase. Please check your email for payment.');
});