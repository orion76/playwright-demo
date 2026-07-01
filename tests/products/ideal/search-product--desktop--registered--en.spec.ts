import { test } from "@playwright/test";
import { testSearchProduct } from "./shared/search-product";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testSearchProduct(page, { viewport: "desktop", role: "registered", lang: "en" });
});
