import { test, VIEWPORTS } from "@src/fixtures/test";
import { testAddReview } from "./shared/add-review";

test.use({ viewport: VIEWPORTS.desktop });
test("SPEC: product_details — Add Review", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Product Details" },
    { type: "story", description: "Submit a product review" },
    { type: "severity", description: "normal" },
  );
  await testAddReview(page, { viewport: "desktop", role: "guest", lang: "en" });
});
