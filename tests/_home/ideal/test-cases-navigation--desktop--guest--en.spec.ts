import { test } from "@playwright/test";
import { testTestCasesNavigation } from "./shared/test-cases-navigation";

test("SPEC: _home — Test Cases Navigation", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Home" },
    { type: "story", description: "Navigate to test cases page" },
    { type: "severity", description: "normal" },
  );
  await testTestCasesNavigation(page, { viewport: "desktop", role: "guest", lang: "en" });
});
