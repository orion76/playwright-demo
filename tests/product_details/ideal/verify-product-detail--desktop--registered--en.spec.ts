import { test } from "@playwright/test";
import { testVerifyProductDetail } from "./shared/verify-product-detail";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testVerifyProductDetail(page, { viewport: "desktop", role: "registered", lang: "en" });
});
