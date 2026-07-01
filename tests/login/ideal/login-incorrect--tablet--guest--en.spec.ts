import { test } from "@playwright/test";
import { testLoginIncorrect } from "./shared/login-incorrect";

test("SPEC: test", async ({ page }) => {
  await testLoginIncorrect(page, { viewport: "tablet", role: "guest", lang: "en" });
});
