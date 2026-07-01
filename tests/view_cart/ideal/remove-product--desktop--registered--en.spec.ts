import { test } from "@playwright/test";
import { testRemoveProduct } from "./shared/remove-product";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testRemoveProduct(page, { viewport: "desktop", role: "registered", lang: "en" });
});
