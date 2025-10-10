import { test, expect } from '@playwright/test';

test('Submit empty "Payment details" - form stay opened, Coffee-5', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  //await expect(page.locator('#app')).toContainText('Yes, of course!');
  await expect(page.locator('#app')).toContainText('Nah, I\'ll skip.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await expect(page.locator('#app')).toContainText('(Discounted) Mocha x 1+-Cappuccino x 1+-Espresso x 1+-Espresso Macchiato x 1+-');
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('h1')).toContainText('Payment details');
  await expect(page.getByLabel('Payment form')).toContainText('Name');
  await expect(page.getByLabel('Payment form')).toContainText('Email');
  await expect(page.locator('#submit-payment')).toContainText('Submit');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: '×' })).toBeVisible();
  /*await expect (page.locator('div')).toContainText('/^Email$/', { timeout: 100000 });
  
  await page.locator('div').filter({ hasText: /^Email$/ }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('div').filter({ hasText: /^Email$/ }).click();
  await page.getByRole('button', { name: '×' }).click();*/
});