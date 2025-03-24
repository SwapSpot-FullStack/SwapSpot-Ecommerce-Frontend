import { test, expect } from "@playwright/test";

test("Home page should display the 'List Item' button", async ({ page }) => {
  // Go to the homepage
  await page.goto("http://localhost:5173");

  // Wait for the 'List Item' button to be visible
  await page.waitForSelector("text=List Item");

  // Verify that the 'List Item' button is visible
  await expect(page.locator("text=List Item")).toBeVisible();
});
