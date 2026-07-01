import { test } from "@playwright/test";
import { testVerifyAllProducts } from "./shared/verify-all-products";

test.use({ storageState: "auth/persistent-user.json" });

test("SPEC: test", async ({ page }) => {
  await testVerifyAllProducts(page, { viewport: "desktop", role: "registered", lang: "en" });
});
