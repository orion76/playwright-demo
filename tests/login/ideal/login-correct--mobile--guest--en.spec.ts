import { test, VIEWPORTS } from "@src/fixtures/test";
import { testLoginCorrect } from "./shared/login-correct";

test.use({ viewport: VIEWPORTS.mobile });
test("SPEC: test", async ({ page }) => {
  await testLoginCorrect(page, { viewport: "mobile", role: "guest", lang: "en" });
});
