import { test as base } from "@playwright/test";
import { SITE_URL } from "../../config";

let connectivityOk: boolean | null = null;

async function checkSite(): Promise<boolean> {
  if (connectivityOk !== null) return connectivityOk;
  try {
    const res = await fetch(SITE_URL, {
      method: "HEAD",
      signal: AbortSignal.timeout(10000),
    });
    connectivityOk = res.ok;
  } catch {
    connectivityOk = false;
  }
  return connectivityOk;
}

const connectivityCheck = Object.assign(
  async ({}, use: () => Promise<void>) => {
    if (await checkSite()) {
      await use();
    } else {
      base.skip();
    }
  },
  { auto: true as const, timeout: 15000 as const },
);

export default { connectivityCheck };
