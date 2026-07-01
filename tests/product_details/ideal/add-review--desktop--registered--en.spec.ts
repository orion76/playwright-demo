import { test } from "@playwright/test";
import { testAddReview } from "./shared/add-review";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testAddReview(page, { viewport: "desktop", role: "registered", lang: "en" });
});
