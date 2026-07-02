import { test } from "@playwright/test";
import { testVerifyProductQuantity } from "./shared/verify-product-quantity";

test("SPEC: product_details — Verify Product Quantity", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Product Details" },
    { type: "story", description: "Verify product quantity in cart" },
    { type: "severity", description: "normal" },
  );
  await testVerifyProductQuantity(page, { viewport: "desktop", role: "guest", lang: "en" });
});
