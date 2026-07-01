import { test } from "@playwright/test";
import { testSubscription } from "./shared/subscription";

test("SPEC: _home — Subscription", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Home" },
    { type: "story", description: "Subscribe on home page" },
    { type: "severity", description: "normal" },
  );
  await testSubscription(page, { viewport: "desktop", role: "guest", lang: "en" });
});
