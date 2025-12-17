import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.learnwebdriverio.com/register');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.locator('#app')).toContainText('username can\'t be blank');
  await expect(page.locator('#app')).toContainText('email can\'t be blank');
});