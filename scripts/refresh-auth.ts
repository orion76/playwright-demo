/**
 * Refresh auth state for tests.
 *
 * Usage: npx tsx scripts/refresh-auth.ts
 *
 * 1. Opens browser on /login
 * 2. Waits for you to log in manually
 * 3. Saves auth state (path from getStorageState()) after redirect
 */
import { chromium } from "@playwright/test"
import { SITE_URL } from "../src/config"
import { getStorageState } from "../src/auth"

const USER_KEY = process.env.TEST_USER || "organizer";

async function main() {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(SITE_URL + "/login")

  console.log(`\n⚠️  Logging in as "${USER_KEY}".`)
  console.log("   After redirect from /login, state will save automatically.\n")

  page.setDefaultTimeout(0)
  await page.waitForFunction(
    () => !location.pathname.includes("/login"),
  )

  const dest = getStorageState(USER_KEY)
  await context.storageState({ path: dest })
  console.log("✅ Auth state saved to", dest)

  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
