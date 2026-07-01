import { test } from "@playwright/test";
import { testLoginCorrect } from "./shared/login-correct";

test("SPEC: test", async ({ page }) => {
  await testLoginCorrect(page, { viewport: "tablet", role: "guest", lang: "en" });
});
