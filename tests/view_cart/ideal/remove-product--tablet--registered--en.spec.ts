import { test, VIEWPORTS } from "@src/fixtures/test";
import { testRemoveProduct } from "./shared/remove-product";

test.use({ viewport: VIEWPORTS.tablet });
test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testRemoveProduct(page, { viewport: "tablet", role: "registered", lang: "en" });
});
