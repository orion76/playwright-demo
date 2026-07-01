import { test } from "@playwright/test";
import { testSubscriptionInCart } from "./shared/subscription-in-cart";

test("SPEC: test", async ({ page }) => {
  await testSubscriptionInCart(page, { viewport: "mobile", role: "guest", lang: "en" });
});
