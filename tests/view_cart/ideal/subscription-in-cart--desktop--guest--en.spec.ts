import { test } from "@playwright/test";
import { testSubscriptionInCart } from "./shared/subscription-in-cart";

test("SPEC: view_cart — Subscription in Cart", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "Cart" },
    { type: "story", description: "Verify subscription on cart page" },
    { type: "severity", description: "normal" },
  );
  await testSubscriptionInCart(page, { viewport: "desktop", role: "guest", lang: "en" });
});
