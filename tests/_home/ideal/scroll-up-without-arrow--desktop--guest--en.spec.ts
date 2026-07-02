import { test, VIEWPORTS } from "@src/fixtures/test";
import { testScrollUpWithoutArrow } from "./shared/scroll-up-without-arrow";

test.use({ viewport: VIEWPORTS.desktop });
test("SPEC: / — Scroll Up without Arrow", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Home" },
    { type: "story", description: "Scroll up without arrow button" },
    { type: "severity", description: "low" },
  );
  await testScrollUpWithoutArrow(page, { viewport: "desktop", role: "guest", lang: "en" });
});
