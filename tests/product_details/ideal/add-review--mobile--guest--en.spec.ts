import { test } from "@playwright/test";
import { testAddReview } from "./shared/add-review";

test("SPEC: test", async ({ page }) => {
  await testAddReview(page, { viewport: "mobile", role: "guest", lang: "en" });
});
