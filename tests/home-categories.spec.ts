import { test, expect } from "@playwright/test";

test("Home page should display categories", async ({ page }) => {
  // Go to the homepage
  await page.goto("http://localhost:5173");

  // Wait for the categories section to load
  await page.waitForSelector("text=Categories");

  // Verify that the categories section is visible
  await expect(page.locator("text=Categories")).toBeVisible();
});
