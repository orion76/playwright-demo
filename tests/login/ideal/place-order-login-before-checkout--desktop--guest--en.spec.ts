import { test } from "@playwright/test";
import { testPlaceOrderLoginBeforeCheckout } from "./shared/place-order-login-before-checkout";

test("SPEC: login — Place Order: Login before Checkout", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Checkout" },
    { type: "story", description: "Login before placing order" },
    { type: "severity", description: "normal" },
  );
  await testPlaceOrderLoginBeforeCheckout(page, { viewport: "desktop", role: "guest", lang: "en" });
});
