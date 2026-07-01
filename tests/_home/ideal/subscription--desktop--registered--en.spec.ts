import { test } from "@playwright/test";
import { testSubscription } from "./shared/subscription";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testSubscription(page, { viewport: "desktop", role: "registered", lang: "en" });
});
