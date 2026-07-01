import { test } from "@playwright/test";
import { testSubscription } from "./shared/subscription";

test("SPEC: test", async ({ page }) => {
  await testSubscription(page, { viewport: "tablet", role: "guest", lang: "en" });
});
