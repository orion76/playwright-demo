import { test } from "@playwright/test";
import { testTestCasesNavigation } from "./shared/test-cases-navigation";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testTestCasesNavigation(page, { viewport: "desktop", role: "registered", lang: "en" });
});
