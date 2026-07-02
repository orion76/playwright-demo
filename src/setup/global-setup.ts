export default async () => {
  const url = process.env.SITE_URL || "https://automationexercise.com";

  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    throw new Error(`❌ Site unreachable (${url}): ${(e as Error).message}`);
  }
};
