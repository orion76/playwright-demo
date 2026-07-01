import { test } from "@playwright/test";
import { testContactForm } from "./shared/contact-us-form";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testContactForm(page, { viewport: "desktop", role: "registered", lang: "en" });
});
