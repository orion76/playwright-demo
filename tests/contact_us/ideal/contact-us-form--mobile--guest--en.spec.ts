import { test, VIEWPORTS } from "@src/fixtures/test";
import { testContactForm } from "./shared/contact-us-form";

test.use({ viewport: VIEWPORTS.mobile });
test("SPEC: test", async ({ page }) => {
  await testContactForm(page, { viewport: "mobile", role: "guest", lang: "en" });
});
