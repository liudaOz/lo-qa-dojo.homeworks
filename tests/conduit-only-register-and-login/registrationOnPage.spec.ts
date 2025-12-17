import { test, expect } from "@playwright/test";
import { createRandomUser } from "../../randomUserHelper";

test.describe("Check process and form of registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("heading")).toContainText("Sign up");
  });

  test(
    "Sign up new user with valid data - created new user, crl-1",
    {
      tag: ["@smoke"],
      annotation: {
        type: "description",
        description:
          "The process of creation new user, link, documentation, l.osa, Xray",
      },
    },

    async ({ page, baseURL }) => {
      const user = createRandomUser();
      await page.getByRole("textbox", { name: "Username" }).fill(user.username);
      await page.getByRole("textbox", { name: "Email" }).fill(user.email);
      await page.getByRole("textbox", { name: "Password" }).fill(user.password);
      await page.getByRole("button", { name: "Sign up" }).click();
      expect(page.url()).toContain(baseURL);
      await expect(page.locator("#app")).toContainText(user.username);
    }
  );

  test(
    "Sign up existing user - received message 'is already taken' and not created new user, crl-2",
    {
      tag: ["@smoke"],
      annotation: {
        type: "description",
        description:
          "The process of creation existing user, link, documentation, l.osa, Xray",
      },
    },
    async ({ page, baseURL }) => {
      const user = createRandomUser();
      await page.getByRole("textbox", { name: "Username" }).fill(user.username);
      await page.getByRole("textbox", { name: "Email" }).fill(user.email);
      await page.getByRole("textbox", { name: "Password" }).fill(user.password);
      await page.getByRole("button", { name: "Sign up" }).click();
      expect(page.url()).toContain(baseURL);
      await expect(page.locator("#app")).toContainText(user.username);

      await page.goto("/register");
      await expect(page.getByRole("heading")).toContainText("Sign up");
      await expect(page.getByRole("navigation")).toContainText(user.username);
      await page.getByRole("textbox", { name: "Username" }).fill(user.username);
      await page.getByRole("textbox", { name: "Email" }).fill(user.email);
      await page.getByRole("textbox", { name: "Password" }).fill(user.password);
      await page.getByRole("button", { name: "Sign up" }).click();
      expect(page.url()).toContain("/register");
      await expect(page.locator("#app")).toContainText(
        "username is already taken."
      );
      await expect(page.locator("#app")).toContainText(
        "email is already taken."
      );
    }
  );

  test(
    "Sign up new user with invalid data, all fields are empty - received message 'can't be blank' and not created new user, crl-3",
    {
      tag: ["@smoke"],
      annotation: {
        type: "description",
        description:
          "The process of creation new user with empty data, link, documentation, l.osa, Xray",
      },
    },
    async ({ page, baseURL }) => {
      const user = createRandomUser();
      await page.getByRole("textbox", { name: "Username" }).fill(user.username);
      await page.getByRole("textbox", { name: "Email" }).fill(user.email);
      await page.getByRole("textbox", { name: "Password" }).fill(user.password);
      await page.getByRole("button", { name: "Sign up" }).click();
      expect(page.url()).toContain(baseURL);
      await expect(page.locator("#app")).toContainText(user.username);

      await page.goto("/register");
      await expect(page.getByRole("heading")).toContainText("Sign up");
      await expect(page.getByRole("navigation")).toContainText(user.username);
      await expect(page.getByRole("textbox", { name: "Username" })).toBeEmpty();
      await expect(page.getByRole("textbox", { name: "Email" })).toBeEmpty();
      await expect(page.getByRole("textbox", { name: "Password" })).toBeEmpty();
      await page.getByRole("button", { name: "Sign up" }).click();
      expect(page.url()).toContain(baseURL);
      await expect(page.locator("#app")).toContainText(user.username);
      await expect(page.locator("#app")).toContainText(
        "username can't be blank"
      );
      await expect(page.locator("#app")).toContainText("email can't be blank");
    }
  );
});

// npm run
