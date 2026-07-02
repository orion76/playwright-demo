import { test } from "@playwright/test";
import { testDownloadInvoiceAfterPurchase } from "./shared/download-invoice-after-purchase";

test("SPEC: products — Download Invoice after Purchase", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Checkout" },
    { type: "story", description: "Download invoice after purchase" },
    { type: "severity", description: "normal" },
  );
  await testDownloadInvoiceAfterPurchase(page, { viewport: "desktop", role: "guest", lang: "en" });
});
