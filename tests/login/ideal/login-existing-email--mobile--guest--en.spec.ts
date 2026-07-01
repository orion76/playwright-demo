import { test } from "@playwright/test";
import { testLoginExistingEmail } from "./shared/login-existing-email";

test("SPEC: test", async ({ page }) => {
  await testLoginExistingEmail(page, { viewport: "mobile", role: "guest", lang: "en" });
});
