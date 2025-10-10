import { test, expect } from '@playwright/test';

test('Order list is created successfully, Coffee-2', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await expect(page.locator('#app')).toContainText('(Discounted) Mocha x 1+-Cappuccino x 1+-Espresso x 1+-Espresso Macchiato x 1+-');
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('h1')).toContainText('Payment details');
  await page.getByRole('textbox', {name: 'Name'}).fill('123');
  await page.getByRole('textbox', {name: 'Email'}).fill('123@mail');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toContainText('Thanks for your purchase. Please check your email for payment.');
});