import { test, expect } from "@playwright/test";

test.describe("Add and remove feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
  });

  test(
    "Add and remove number of coffee successfully, Coffee-4",
    {
      tag: ["@smoke"],
      annotation: {
        type: "description",
        description:
          "The process of adding and removing caps of coffee, link, documentation, l.osa, Xray",
      },
    },
    async ({ page }) => {
      //await page.locator('[data-test="Cafe_Breve"]').click();
      await page.getByTestId("Cafe_Breve").click();
      await page.locator('[data-test="checkout"]').hover();
      await page.getByRole("list").filter({ hasText: "+-" }).click();
      await expect(page.locator("#app")).toContainText("x 1");
      await page
        .getByRole("button", { name: "Add one Cafe Breve" })
        .click({ clickCount: 2 });
      //await page.getByRole("button", { name: "Add one Cafe Breve" }).click();
      await expect(page.locator("#app")).toContainText("x 3");
      await page.getByRole("button", { name: "Remove one Cafe Breve" }).click();
      await expect(page.locator("#app")).toContainText("x 2");
    }
  );
});
