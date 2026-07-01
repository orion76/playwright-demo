import { test } from "@playwright/test";
import { testVerifyProductDetail } from "./shared/verify-product-detail";

test("SPEC: test", async ({ page }) => {
  await testVerifyProductDetail(page, { viewport: "tablet", role: "guest", lang: "en" });
});
