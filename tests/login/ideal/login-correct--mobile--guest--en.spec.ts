import { test } from "@playwright/test";
import { testLoginCorrect } from "./shared/login-correct";

test("SPEC: test", async ({ page }) => {
  await testLoginCorrect(page, { viewport: "mobile", role: "guest", lang: "en" });
});
