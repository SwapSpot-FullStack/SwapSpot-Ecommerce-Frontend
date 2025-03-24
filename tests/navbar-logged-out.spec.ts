import { test, expect } from "@playwright/test";

test("Navbar should show Login and Register when logged out", async ({
  page,
}) => {
  // Go to the homepage
  await page.goto("http://localhost:5173");

  // Check for Login link
  const loginLink = page.getByRole("link", { name: "Login" });
  await expect(loginLink).toBeVisible();

  // Check for Register link
  const registerLink = page.getByRole("link", { name: "Register" });
  await expect(registerLink).toBeVisible();
});
