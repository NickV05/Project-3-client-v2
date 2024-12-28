import { test, expect } from "@playwright/test";
import { generateRandomLicensePlate } from "../src/utils/functions";

test.describe("Records Table Tests", () => {
  const randomPlateNumber = generateRandomLicensePlate();
  test("Creates Record and displays it on the table", async ({ page }) => {
    await page.goto("/");

    const table = page.locator('[data-testid="records-table"]');
    await expect(table).toBeVisible();
    await page.waitForTimeout(500);

    const addButton = page.locator('[data-testid="add-record"]');
    await expect(addButton).toBeVisible();
    await addButton.click();
    await page.waitForTimeout(500);

    const form = page.locator('[data-testid="form-wrapper"]');
    await expect(form).toBeVisible();
    await page.waitForTimeout(500);

    const inputLPR = page.locator('[data-testid="input-lpr"]');
    await expect(inputLPR).toBeVisible();
    await inputLPR.fill(randomPlateNumber);
    await page.waitForTimeout(500);

    const selectEvent = page.locator(
      '[data-testid="form-wrapper"] [data-testid="select-event"]'
    );
    await expect(selectEvent).toBeVisible();
    await selectEvent.click();
    await page.waitForTimeout(500);

    const eventEntry = page.locator('[data-testid="event-entry"]');
    await expect(eventEntry).toBeVisible();
    await eventEntry.click();
    await page.waitForTimeout(500);

    const addMetadataButton = page.locator('[data-testid="add-metadata"]');
    await addMetadataButton.click();
    await page.waitForTimeout(500);

    const metadataKey = page.locator('[data-testid="metadata-key"]');
    const metadataValue = page.locator('[data-testid="metadata-value"]');
    await expect(metadataKey).toBeVisible();
    await expect(metadataValue).toBeVisible();
    await page.waitForTimeout(500);

    await metadataKey.fill("color");
    await metadataValue.fill("red");
    await page.waitForTimeout(500);

    const submitButton = page.locator('[data-testid="submit-button"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await page.waitForTimeout(500);

    const successMessage = page.locator(".ant-message-success");
    await expect(successMessage).toContainText(
      `Record created for the License Plate Number: ${randomPlateNumber}`
    );
  });

  test("Applies filters and validates the result", async ({ page }) => {
    await page.goto("/");

    const table = page.locator('[data-testid="records-table"]');
    await expect(table).toBeVisible();
    await page.waitForTimeout(500);

    const eventTypeFilter = page.locator('[data-testid="select-event"]');
    await expect(eventTypeFilter).toBeVisible();
    await eventTypeFilter.click();
    await page.waitForTimeout(500);

    const eventEntry = page.locator('[data-testid="select-event-entry"]');
    await expect(eventEntry).toBeVisible();
    await eventEntry.click();
    await page.waitForTimeout(500);

    const licensePlateFilter = page.locator(
      '[data-testid="filter-license-plate"]'
    );
    await expect(licensePlateFilter).toBeVisible();
    await licensePlateFilter.fill(randomPlateNumber);
    await page.waitForTimeout(500);

    const refetchButton = page.locator('[data-testid="refetch-button"]');
    await expect(refetchButton).toBeVisible();
    await refetchButton.click();
    await page.waitForTimeout(1000);

    const rowCount = await page
      .locator(".ant-table-row.ant-table-row-level-0")
      .count();
    await expect(rowCount).toBe(1);
  });
});
