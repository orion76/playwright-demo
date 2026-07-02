import { test, VIEWPORTS } from "@src/fixtures/test";
import { testVerifyProductDetail } from "./shared/verify-product-detail";

test.use({ viewport: VIEWPORTS.desktop });
test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testVerifyProductDetail(page, { viewport: "desktop", role: "registered", lang: "en" });
});
