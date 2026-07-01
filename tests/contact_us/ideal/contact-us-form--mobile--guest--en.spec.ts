import { test } from "@playwright/test";
import { testContactForm } from "./shared/contact-us-form";

test("SPEC: test", async ({ page }) => {
  await testContactForm(page, { viewport: "mobile", role: "guest", lang: "en" });
});
