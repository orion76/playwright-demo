import { test, VIEWPORTS } from "@src/fixtures/test";
import { testSubscription } from "./shared/subscription";

test.use({ viewport: VIEWPORTS.tablet });
test("SPEC: test", async ({ page }) => {
  await testSubscription(page, { viewport: "tablet", role: "guest", lang: "en" });
});
