import { test } from "@playwright/test";
import { testLoginCorrect } from "./shared/login-correct";

test("SPEC: login — Login correct credentials", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "User Login" },
    { type: "story", description: "Login with correct email and password" },
    { type: "severity", description: "critical" },
  );
  await testLoginCorrect(page, { viewport: "desktop", role: "guest", lang: "en" });
});
