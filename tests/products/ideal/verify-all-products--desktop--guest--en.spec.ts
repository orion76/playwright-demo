import { test, VIEWPORTS } from "@src/fixtures/test";
import { testVerifyAllProducts } from "./shared/verify-all-products";

test.use({ viewport: VIEWPORTS.desktop });
test("SPEC: products — Verify All Products", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Products" },
    { type: "story", description: "View all products and product detail" },
    { type: "severity", description: "normal" },
  );
  await testVerifyAllProducts(page, { viewport: "desktop", role: "guest", lang: "en" });
});
