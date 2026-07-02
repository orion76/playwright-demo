import { test, VIEWPORTS } from "@src/fixtures/test";
import { testLoginCorrect } from "./shared/login-correct";

test.use({ viewport: VIEWPORTS.tablet });
test("SPEC: test", async ({ page }) => {
  await testLoginCorrect(page, { viewport: "tablet", role: "guest", lang: "en" });
});
