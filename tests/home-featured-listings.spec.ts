import { test, expect } from "@playwright/test";

test("Home page should display featured listings", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Wait for the featured section
  await page.waitForSelector(".featured");

  // Check visibility of section
  await expect(page.locator(".featured")).toBeVisible();

  // Check that at least one featured listing card is rendered
  const listings = page.locator(".featured-card");
  const count = await listings.count();
  expect(count).toBeGreaterThan(0);
});
