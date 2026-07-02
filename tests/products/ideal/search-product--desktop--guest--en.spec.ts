import { test, VIEWPORTS } from "@src/fixtures/test";
import { testSearchProduct } from "./shared/search-product";

test.use({ viewport: VIEWPORTS.desktop });
test("SPEC: products — Search Product", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Products" },
    { type: "story", description: "Search product by name" },
    { type: "severity", description: "normal" },
  );
  await testSearchProduct(page, { viewport: "desktop", role: "guest", lang: "en" });
});
