import { test, VIEWPORTS } from "@src/fixtures/test";
import { testRemoveProduct } from "./shared/remove-product";

test.use({ viewport: VIEWPORTS.mobile });
test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testRemoveProduct(page, { viewport: "mobile", role: "registered", lang: "en" });
});
