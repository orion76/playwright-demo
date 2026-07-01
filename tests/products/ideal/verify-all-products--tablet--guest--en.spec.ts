import { test } from "@playwright/test";
import { testVerifyAllProducts } from "./shared/verify-all-products";

test("SPEC: test", async ({ page }) => {
  await testVerifyAllProducts(page, { viewport: "tablet", role: "guest", lang: "en" });
});
