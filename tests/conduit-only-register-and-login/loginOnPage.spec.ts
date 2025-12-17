import { test, expect } from "@playwright/test";
import { IUserData } from "./data";

test.describe("Check process and form of login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading")).toContainText("Sign in");
  });

  test(
    "Sing in with valid data - success and transition on Feed, crl-4",
    {
      tag: ["@smoke"],
      annotation: {
        type: "description",
        description:
          "The process of login existing user with valid data, link, documentation, l.osa, Xray",
      },
    },
    async ({ page, baseURL }) => {
      await test.step("Fill login form with valid credentials", async () => {
      await page
        .getByRole("textbox", { name: "Email" })
        .fill(IUserData.email[IUserData.email.length - 1]);
      await page
        .getByRole("textbox", { name: "Password" })
        .fill(IUserData.password[IUserData.password.length - 1]);
      });

      await test.step("Submit the login form", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
      });

await test.step("Verify user redirected to Feed and username visible", async () => {
      expect(page.url()).toContain(baseURL);
      await expect(
        page.locator("[data-qa-id=site-nav] > *").nth(3)
      ).toContainText(IUserData.user[IUserData.user.length - 1]);
      await expect(
        page.getByRole("heading", { name: "conduit" })
      ).toContainText("conduit");
    });

    await test.step("Verify content and tabs 'Your Feed', 'Global Feed'", async () => {
      await expect(page.locator(".container").nth(1)).toContainText(
        "A place to share your knowledge."
      );
      await expect(
        page.locator("[data-qa-id=feed-tabs] > *").nth(0)
      ).toContainText("Your Feed");
      await expect(
        page.locator("[data-qa-id=feed-tabs] > *").nth(1)
      ).toContainText("Global Feed");
    });
    }
  );

  test(
    "Sing in with invalid data - received message 'email or password is invalid' and stayed on SignIn page , crl-5",
    {
      tag: ["@smoke"],
      annotation: {
        type: "description",
        description:
          "The process of login existing user with invalid data, link, documentation, l.osa, Xray",
      },
    },
    async ({ page }) => {
      await test.step("Fill form with invalid password", async () => {
      await page
        .getByRole("textbox", { name: "Email" })
        .fill(IUserData.email[IUserData.email.length - 1]);
      await page
        .getByRole("textbox", { name: "Password" })
        .fill(IUserData.password[0]);
      });

      await test.step("Submit form and check error message", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
      expect(page.url()).toContain("/login");
      await expect(page.locator(".error-messages")).toContainText(
        "email or password is invalid"
      );
    });

    await test.step("Verify page layout after failed login", async () => {
      await expect(
        page.getByRole("heading", { name: "Sign in" })
      ).toContainText("Sign in");
      await expect(page.getByRole("paragraph", { name: "" })).toContainText(
        "Need an account?"
      );
    });
    }
  );

  test(
    "Click on link 'Need an account?' on SignIn page  - moved to SignUp page and vice versa: Click on link 'Have an account?' on SignUp page  - moved to SignIn page, crl-6",
    {
      tag: ["@smoke", "@regression"],
      annotation: {
        type: "description",
        description:
          "The process of transition between SignIn and SignUp pages, link, documentation, l.osa, Xray",
      },
    },
    async ({ page }) => {
      await test.step("Verify SignIn page elements", async () => {
      await expect(
        page.getByRole("heading", { name: "Sign in" })
      ).toContainText("Sign in");
      await expect(page.getByRole("paragraph", { name: "" })).toContainText(
        "Need an account?"
      );
      await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: "Password" })
      ).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: "Username" })
      ).not.toBeVisible();
    });

    await test.step("Click link 'Need an account?' and verify SignUp page", async () => {
      await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
      await page.getByRole("paragraph", { name: "" }).click();

      //expect(page.url()).toContain("/register");
      await expect(
        page.getByRole("heading", { name: "Sign up" })
      ).toContainText("Sign up");
      await expect(page.getByRole("paragraph", { name: "" })).toContainText(
        "Have an account?"
      );
      await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: "Password" })
      ).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: "Username" })
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
      expect(page.url()).toContain("/register");
    });

    await test.step("Click link 'Have an account?' and verify return to SignIn page", async () => {
      await page.getByText("Have an account?").click();

      //expect(page.url()).toContain("/login");
      await expect(
        page.getByRole("heading", { name: "Sign in" })
      ).toContainText("Sign in");
      await expect(page.getByRole("paragraph", { name: "" })).toContainText(
        "Need an account?"
      );
      await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: "Password" })
      ).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: "Username" })
      ).not.toBeVisible();
      await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
      expect(page.url()).toContain("/login");
    });
    }
  );
});
