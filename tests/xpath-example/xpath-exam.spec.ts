import test from "@playwright/test";

//label[text()='Name']/ancestor::div[contains(@class, 'formHorizontalWrapper')]//input
//label[text()='Label']/ancestor::div[contains(@class, 'formHorizontalWrapper')]//input
//label[text()='Number']/ancestor::div[contains(@class, 'formHorizontalWrapper')]//input

function getInputElementByLabel(label: string) {
  return `//label[text()='${label}']/ancestor::div[contains(@class, 'formHorizontalWrapper')]//input`;
}

// або

function getInputElementByLabel9(label: "Name" | "Label" | "Number") {
  return `//label[text()='${label}']/ancestor::div[contains(@class, 'formHorizontalWrapper')]//input`;
}

getInputElementByLabel9("Label"); // є підказки Label, Name, Number
getInputElementByLabel9("Name"); // є підказки Label, Name, Number
getInputElementByLabel9("Number"); // є підказки Label, Name, Number
console.log(getInputElementByLabel9("Label"));

test("test", async ({ page }) => {
  //label[text()='Number']/ancestor::div[contains(@class, 'formHorizontalWrapper')]//input

  await page
    .locator("label", { hasText: "Number" })
    .locator("/ancestor::div[contains(@class, 'formHorizontalWrapper')]")
    .locator("input");

  //label[text()='Short description']/ancestor::div[contains(@class, 'formHorizontalWrapper')]//textarea

  await page
    .locator("label", { hasText: "Short description" })
    // .and()  .or()
    // await page.getByText("Ok").or(page.getByText("Okey")).click();
    // filter  - є такий метод, але не акцентуємо увагу поки що
    .locator("/ancestor::div[contains(@class, 'formHorizontalWrapper')]")
    .locator("textarea")
    .first()
    .click();

  // .locator("textarea").last().click();
  // .locator("textarea").nth(-1).click();  0 - це перший елемент, -1 - це останній елемент
});
