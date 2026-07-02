import { test, VIEWPORTS } from "@src/fixtures/test";
import { testPlaceOrderLoginBeforeCheckout } from "./shared/place-order-login-before-checkout";

test.use({ viewport: VIEWPORTS.desktop });
test("SPEC: login — Place Order: Login before Checkout", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Checkout" },
    { type: "story", description: "Login before placing order" },
    { type: "severity", description: "normal" },
  );
  await testPlaceOrderLoginBeforeCheckout(page, { viewport: "desktop", role: "guest", lang: "en" });
});
