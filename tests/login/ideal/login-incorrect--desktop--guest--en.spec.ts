import { test, VIEWPORTS } from "@src/fixtures/test";
import { testLoginIncorrect } from "./shared/login-incorrect";

test.use({ viewport: VIEWPORTS.desktop });
test("SPEC: login — Login incorrect credentials", async ({ page }) => {
  test.info().annotations.push(
    { type: "feature", description: "User Login" },
    { type: "story", description: "Login with incorrect email and password" },
    { type: "severity", description: "normal" },
  );
  await testLoginIncorrect(page, { viewport: "desktop", role: "guest", lang: "en" });
});
