import test from "@playwright/test";

test("go to local site", async ({ page }) => {
  await page.goto("");

  await page
    .getByText("Пароль повинен містити принаймні 6 символів", { exact: true })
    .click();
  await page.getByText("Пароль повинен ").click();

  await page.getByRole("textbox", { name: "Email адреса *" }).fill("test");
  await page.getByLabel("Пароль").fill("test");
  await page.getByRole("button", { name: "Створити аккаунт" }).click();
  //await page.getByTitle("").click();
  await page.getByPlaceholder("Введіть ваш email").fill("test");

  for (let i = 0; i < 5; i++) {
    console.log(
      await page.locator('[data-user-id="1"]>td').nth(i).textContent()
    );
  }

  await page.goto("https://playwright.dev/");
  await page.getByAltText("Browsers (Chromium, Firefox, WebKit").click(); // тільки для іміджів
});


