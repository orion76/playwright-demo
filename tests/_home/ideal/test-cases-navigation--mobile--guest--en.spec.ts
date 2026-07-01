import { test } from "@playwright/test";
import { testTestCasesNavigation } from "./shared/test-cases-navigation";

test("SPEC: test", async ({ page }) => {
  await testTestCasesNavigation(page, { viewport: "mobile", role: "guest", lang: "en" });
});
