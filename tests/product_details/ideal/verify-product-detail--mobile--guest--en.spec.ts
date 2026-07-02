import { test, VIEWPORTS } from "@src/fixtures/test";
import { testVerifyProductDetail } from "./shared/verify-product-detail";

test.use({ viewport: VIEWPORTS.mobile });
test("SPEC: test", async ({ page }) => {
  await testVerifyProductDetail(page, { viewport: "mobile", role: "guest", lang: "en" });
});
