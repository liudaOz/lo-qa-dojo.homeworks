import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.learnwebdriverio.com/register');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('lcie4412');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lcie4412@ukr.net');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('lcie4412@ukr.net');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.locator('#app')).toContainText('username is already taken.');
  await page.getByText('email is already taken.').click();
  await expect(page.locator('#app')).toContainText('email is already taken.');
});