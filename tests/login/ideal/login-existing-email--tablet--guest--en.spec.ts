import { test } from "@playwright/test";
import { testLoginExistingEmail } from "./shared/login-existing-email";

test("SPEC: test", async ({ page }) => {
  await testLoginExistingEmail(page, { viewport: "tablet", role: "guest", lang: "en" });
});
