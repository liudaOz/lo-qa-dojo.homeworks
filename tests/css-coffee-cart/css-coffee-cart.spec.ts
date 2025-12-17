import { test, expect } from "@playwright/test";

test.describe(
  "Check actions on coffee-cart page",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "link in Xray",
    },
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
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
        await page.locator('[data-test="Cafe_Breve"]').click();
        await page.locator('[data-test="checkout"]').hover();
        await expect(page.locator(".unit-desc")).toContainText("x 1");
        await page.locator(".unit-controller").click();
        //await page.locator('.unit-controller').filter({ hasText: "+-" }).click();
        await expect(page.locator(".unit-desc")).toContainText("x 2");
        await page
          .locator('[aria-label="Add one Cafe Breve"]')
          .click({ clickCount: 2 });
        //await page.getByRole("button", { name: "Add one Cafe Breve" }).click();
        await expect(page.locator(".unit-desc")).toContainText("x 4");
        await page.locator('[aria-label="Remove one Cafe Breve"]').click();
        await expect(page.locator(".unit-desc")).toContainText("x 3");
      }
    );

    test(
      'button "Thanks for purchase is present is successfully, Coffee-1',
      {
        tag: ["@smoke", "@regression"],
        annotation: {
          type: "description",
          description: "link XRAY, documentation link, l.osa",
        },
      },
      async ({ page }) => {
        await page.locator('[data-test="Espresso"]').click();
        await expect(page.locator('[data-test="checkout"]')).toContainText(
          "Total: $"
        );
        await page.locator('[data-test="checkout"]').click();
        await page.locator("#name").fill("test");
        await page.locator("#email").fill("test@mail");
        await page.locator("#promotion").check();
        await page.locator('[id*="submit"]').click();
        await expect(page.locator('[class$="success"]')).toContainText(
          "Thanks for your purchase. Please check your email for payment."
        );
      }
    );

    test(
      "Tabs Menu, Cart, Github are present and available for navigation are successfully, Coffee-3",
      {
        tag: ["@smoke"],
        annotation: {
          type: "description",
          description: "link documentation, l.osa, Xray",
        },
      },
      async ({ page }) => {
        await expect(page.locator('[aria-label="Menu page"]')).toContainText(
          "menu"
        );
        //await expect(page.getByLabel('Cart page')).toContainText('cart (0)');
        //await expect(page.getByLabel('GitHub page')).toContainText('github');
        await page.locator('[aria-label="Menu page"]').click();
        await expect(page.locator('[data-test="checkout"]')).toContainText(
          "Total: $0.00"
        );
        await page.locator('[aria-label="Cart page"]').click();
        //await page.getByRole('listitem').filter({ hasText: 'cart (0)' }).click();
        await expect(page.locator(".list")).toContainText(
          "No coffee, go add some."
        );
        await page
          .locator('[aria-label="GitHub page"]')
          .filter({ hasText: "github" })
          .click();
        //await page.getByRole('link', { name: 'GitHub page' }).click();
        await expect(page.locator(".container")).toContainText(
          "Star our repository jecfish/coffee-cart. Report in the repository if you found any issues."
        );
      }
    );

    test(
      "Order list is created successfully, Coffee-2",
      {
        tag: ["@smoke"],
        annotation: {
          type: "description",
          description: "link documentation, l.osa, Xray",
        },
      },
      async ({ page }) => {
        await page.locator('[data-test="Espresso"]').click();
        await page.locator('[data-test="Espresso_Macchiato"]').click();
        await page.locator('[data-test="Cappuccino"]').click();
        await expect(page.locator(".promo")).toContainText(
          "It's your lucky day! Get an extra cup of Mocha for $4."
        );
        await page.locator(".yes").click();

        await expect(
          page.locator('span:has-text("(Discounted) Mocha")')
        ).toContainText("(Discounted) Mocha");

        await expect(page.locator('[class$="desc"]').nth(0)).toContainText(
          " x 1"
        );

        await expect(page.locator('span:has-text("Cappuccino")')).toContainText(
          "Cappuccino"
        );

        await expect(page.locator('[class$="desc"]').nth(1)).toContainText(
          " x 1"
        );

        await expect(
          page.locator("span", { hasText: /^Espresso$/ })
        ).toContainText("Espresso");

        await expect(page.locator('[class$="desc"]').nth(2)).toContainText(
          " x 1"
        );

        await expect(
          page.locator("span", { hasText: /^Espresso Macchiato$/ })
        ).toContainText("Espresso Macchiato");

        await expect(page.locator('[class$="desc"]').nth(3)).toContainText(
          " x 1"
        );

        /*await expect(page.locator("cart-preview")).toContainText(
          "(Discounted) Mocha x 1+-Cappuccino x 1+-Espresso x 1+-Espresso Macchiato x 1+-"
        );*/
        await page.locator('[data-test="checkout"]').click();
        await expect(page.locator(".size")).toContainText("Payment details");
        await page.locator("#name").fill("123");
        await page.locator("#email").fill("123@mail");
        await page.locator("#promotion").click();
        await page.locator('[id*="submit"]').click();
        await expect(page.locator('[class$="success"]')).toContainText(
          "Thanks for your purchase. Please check your email for payment."
        );
      }
    );

    test(
      'Submit empty "Payment details" - form stay opened, Coffee-5',
      {
        tag: ["@smoke"],
        annotation: {
          type: "description",
          description: "link, documentation, l.osa, Xray",
        },
      },
      async ({ page }) => {
        await page.locator('[data-test="Espresso"]').click();
        await page.locator('[data-test="Espresso_Macchiato"]').click();
        await page.locator('[data-test="Cappuccino"]').click();
        await expect(page.locator(".promo")).toContainText(
          "It's your lucky day! Get an extra cup of Mocha for $4."
        );
        //await expect(page.locator('#app')).toContainText('Yes, of course!');
        await expect(
          page.locator('button:has-text("Nah, I\'ll skip.")')
        ).toContainText("Nah, I'll skip.");
        await page.locator(".yes").click();
        await page.locator('[data-test="checkout"]').click();
        await expect(page.locator(".size")).toContainText("Payment details");
        await expect(page.locator('[for="name"]')).toContainText("Name");
        await expect(page.locator("#name")).toBeEmpty();
        await expect(page.locator('[for="email"]')).toContainText("Email");
        await expect(page.locator("#email")).toBeEmpty();
        await expect(page.locator('[type="checkbox"]')).not.toBeChecked();
        await expect(page.locator("#submit-payment")).toContainText("Submit");
        await page.locator('[id^="submit"]').click();
        await expect(page.locator(".close")).toContainText("×");
        await expect(page.locator("#submit-payment")).toBeVisible();
        await page.locator(".close").click();
        await expect(page.locator("#submit-payment")).not.toBeVisible();
      }
    );
  }
);
