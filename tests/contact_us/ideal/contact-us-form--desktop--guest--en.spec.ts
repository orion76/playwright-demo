import { test } from "@playwright/test";
import { testContactForm } from "./shared/contact-us-form";

test("SPEC: contact_us — Contact Us Form", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Contact Us" },
    { type: "story", description: "Submit contact form with valid data" },
    { type: "severity", description: "normal" },
  );
  await testContactForm(page, { viewport: "desktop", role: "guest", lang: "en" });
});
