import { test } from "@playwright/test";
import { testRecommendedItems } from "./shared/recommended-items";

test("SPEC: / — Recommended Items", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Home" },
    { type: "story", description: "Add recommended items to cart" },
    { type: "severity", description: "normal" },
  );
  await testRecommendedItems(page, { viewport: "desktop", role: "guest", lang: "en" });
});
