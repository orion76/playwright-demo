import { test } from "@playwright/test";
import { testSearchProduct } from "./shared/search-product";

test("SPEC: test", async ({ page }) => {
  await testSearchProduct(page, { viewport: "tablet", role: "guest", lang: "en" });
});
