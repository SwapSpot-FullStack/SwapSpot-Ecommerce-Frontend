import { test, expect } from "@playwright/test";

test("Listing detail page should display product information", async ({
  page,
}) => {
  // Go to the detail page of listing with ID "1"
  await page.goto("http://localhost:5173/listings/1");

  // These match what you actually render in your ListingDetails.jsx file
  await expect(page.getByText("Tent")).toBeVisible();
  await expect(
    page.getByText("Waterproof and lightweight. Great for hiking and camping.")
  ).toBeVisible();
  await expect(page.getByText("$50")).toBeVisible();
});
