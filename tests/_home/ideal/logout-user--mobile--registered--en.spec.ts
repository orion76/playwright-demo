import { test } from "@playwright/test";
import { testLogoutUser } from "./shared/logout-user";

test("SPEC: _home — Logout User", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "User Session" },
    { type: "story", description: "Logout from account" },
    { type: "severity", description: "normal" },
  );
  await testLogoutUser(page, { viewport: "mobile", role: "registered", lang: "en" });
});
