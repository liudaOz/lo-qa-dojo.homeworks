import { test, expect } from "@playwright/test";

test(
  "Tabs Menu, Cart, Github are present and available for navigation are successfully, Coffee-3",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description:
        "link documentation, l.osa, Xray",
    },
  },
  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await expect(page.getByLabel("Menu page")).toContainText("menu");
    //await expect(page.getByLabel('Cart page')).toContainText('cart (0)');
    //await expect(page.getByLabel('GitHub page')).toContainText('github');
    await page.getByRole("link", { name: "Menu page" }).click();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      "Total: $0.00"
    );
    await page.getByRole("link", { name: "Cart page" }).click();
    //await page.getByRole('listitem').filter({ hasText: 'cart (0)' }).click();
    await expect(page.getByRole("paragraph")).toContainText(
      "No coffee, go add some."
    );
    await page.getByRole("listitem").filter({ hasText: "github" }).click();
    //await page.getByRole('link', { name: 'GitHub page' }).click();
    await expect(page.locator("#app")).toContainText(
      "Star our repository jecfish/coffee-cart. Report in the repository if you found any issues."
    );
  }
);
