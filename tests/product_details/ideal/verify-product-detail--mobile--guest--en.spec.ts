import { test } from "@playwright/test";
import { testVerifyProductDetail } from "./shared/verify-product-detail";

test("SPEC: test", async ({ page }) => {
  await testVerifyProductDetail(page, { viewport: "mobile", role: "guest", lang: "en" });
});
