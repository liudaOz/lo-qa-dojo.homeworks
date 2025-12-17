import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
  await expect(page.getByRole("heading")).toContainText("Sign up");
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("123");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("123@mail");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("123@mail");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.locator("#app")).toContainText("email is invalid");
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("124");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("124@mail.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("124@mail.com");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.locator("#app")).toContainText("124");
});
