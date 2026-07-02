import { test, VIEWPORTS } from "@src/fixtures/test";
import { testAddReview } from "./shared/add-review";

test.use({ viewport: VIEWPORTS.mobile });
test("SPEC: test", async ({ page }) => {
  await testAddReview(page, { viewport: "mobile", role: "guest", lang: "en" });
});
