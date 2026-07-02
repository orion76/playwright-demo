import { test, VIEWPORTS } from "@src/fixtures/test";
import { testSubscriptionInCart } from "./shared/subscription-in-cart";

test.use({ viewport: VIEWPORTS.mobile });
test("SPEC: test", async ({ page }) => {
  await testSubscriptionInCart(page, { viewport: "mobile", role: "guest", lang: "en" });
});
