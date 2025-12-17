import { test, expect } from "@playwright/test";

const fullName = "Firstname Lastname";
const email = "fullname@mail.co";
const currentAddress = "1234 Main Street, Apt 56, New York, NY 10001, USA";
const permanentAddress =
  "вулиця Володимирська, буд. 79б, кв. 64, м. Київ, Київська обл., 01033, Україна";

test(
  "Fill text-box - submited successfully, Demoqa-1",
  {
    tag: ["@smoke", "@regression"],
    annotation: {
      type: "description",
      description: "link on Xray",
    },
  },
  async ({ page }) => {
    await page.goto("/text-box");
    await page
      .locator('//input[contains(@placeholder, "Full Name")]')
      .fill(`${fullName}`);
    await page.locator('//input[@id="userEmail"]').fill(`${email}`);
    await page
      .locator('//textarea[@placeholder="Current Address"]')
      .fill(`${currentAddress}`);
    await page
      .locator('//textarea[@id="permanentAddress"]')
      .fill(`${permanentAddress}`);
    await page.locator('//button[@id="submit"]').click();

    ////*[@id="output"]//p[@id="name"]
    await expect(
      page.locator('//*[@id="output"]').locator('//p[@id="name"]')
    ).toContainText("Name:" + `${fullName}`);

    ////*[@id="output"]//p[@id="email"]
    await expect(
      page.locator('//*[@id="output"]').locator('//p[@id="email"]')
    ).toContainText("Email:" + `${email}`);

    ////*[@id="output"]//p[@id="currentAddress"]
    await expect(
      page.locator('//*[@id="output"]').locator('//p[@id="currentAddress"]')
    ).toContainText("Current Address :" + `${currentAddress}`);
    ////*[@id="output"]//p[@id="permanentAddress"]
    await expect(
      page.locator('//*[@id="output"]').locator('//p[@id="permanentAddress"]')
    ).toContainText("Permananet Address :" + `${permanentAddress}`);
  }
);

test(
  "Check radio-button - YES and IMPRESSIVE and NO checked successfully, Demoqa-2",
  {
    tag: ["@smoke", "@regression"],
    annotation: {
      type: "description",
      description:
        "link on Xray, link on bug-report 'Radio-button <NO> disabled'",
    },
  },
  async ({ page }) => {
    await page.goto("/radio-button");

    await page.locator('//label[@for="yesRadio"]').check();
    await expect(page.locator('//*[@class="text-success"]')).toContainText(
      "Yes"
    );

    await page.locator('//label[@for="impressiveRadio"]').check();
    await expect(page.locator('//*[@class="text-success"]')).toContainText(
      "Impressive"
    );

    await page.locator('//label[@for="noRadio"]').hover();
    await expect(page.locator('//input[@id="noRadio"]')).not.toBeChecked();
  }
);

test(
  "Check check-box - expanded successfully, Demoqa-3",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "link on Xray",
    },
  },
  async ({ page }) => {
    await page.goto("/checkbox");

    await page.locator('//button[@aria-label="Toggle"]').click();
    await page.locator('//button[@aria-label="Toggle"]').nth(1).click();
    await page.locator('//button[@aria-label="Toggle"]').nth(2).click();
    await page.locator('//button[@aria-label="Toggle"]').nth(3).click();
    await page.locator('//button[@aria-label="Toggle"]').nth(4).click();
    await page.locator('//button[@aria-label="Toggle"]').nth(5).click();
    await page.locator('//button[@aria-label="Toggle"]').nth(5).click();
    await page.locator('//span[@class="rct-checkbox"]').nth(0).click();

    await expect(page.locator(""));
  }
);
