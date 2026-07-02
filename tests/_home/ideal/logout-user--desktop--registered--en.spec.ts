import { test } from "@playwright/test";
import { testLogoutUser } from "./shared/logout-user";

test("SPEC: / — Logout User", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "User Session" },
    { type: "story", description: "Logout from account" },
    { type: "severity", description: "normal" },
  );
  await testLogoutUser(page, { viewport: "desktop", role: "registered", lang: "en" });
});
