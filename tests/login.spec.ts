import { test, expect } from "@playwright/test";

test("Login page should allow user to login", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  // Fill in login credentials
  await page.getByPlaceholder("Email").fill("user@example.com");
  await page.getByPlaceholder("Password").fill("password123");

  // Click the login button
  await page.getByRole("button", { name: "Login" }).click();

  // Wait for redirection to dashboard or appearance of logout button
  await page.waitForURL("**/dashboard", { timeout: 10000 });

  // Check that the Logout button appears (indicates login success)
  await expect(page.getByRole("button", { name: "🚪 Logout" })).toBeVisible();
});
