import { test } from "@playwright/test";
import { testAddProductsInCart } from "./shared/add-products-in-cart";

test("SPEC: products — Add Products in Cart", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Products" },
    { type: "story", description: "Add multiple products to cart" },
    { type: "severity", description: "normal" },
  );
  await testAddProductsInCart(page, { viewport: "desktop", role: "guest", lang: "en" });
});
