import { test } from "@playwright/test";
import { testContactForm } from "./shared/contact-us-form";

test("SPEC: test", async ({ page }) => {
  await testContactForm(page, { viewport: "tablet", role: "guest", lang: "en" });
});
