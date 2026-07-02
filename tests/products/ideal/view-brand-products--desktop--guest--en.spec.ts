import { test, VIEWPORTS } from "@src/fixtures/test";
import { testViewBrandProducts } from "./shared/view-brand-products";

test.use({ viewport: VIEWPORTS.desktop });
test("SPEC: products — View Brand Products", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Products" },
    { type: "story", description: "View products by brand" },
    { type: "severity", description: "normal" },
  );
  await testViewBrandProducts(page, { viewport: "desktop", role: "guest", lang: "en" });
});
