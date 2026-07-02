import { test, VIEWPORTS } from "@src/fixtures/test";
import { testTestCasesNavigation } from "./shared/test-cases-navigation";

test.use({ viewport: VIEWPORTS.mobile });
test("SPEC: test", async ({ page }) => {
  await testTestCasesNavigation(page, { viewport: "mobile", role: "guest", lang: "en" });
});
