import { Page } from "@playwright/test";

const SCRIPT = `
(function() {
  if (window.__toasts) return;
  window.__toasts = [];
  var selectors = [
    '[class*="toast"]',
    '[class*="Snackbar"]',
    '[class*="snackbar"]',
    '[class*="notification"]',
    '[class*="notistack"]',
    '[role="alert"]:not([tabindex])'
  ];
  function capture(node) {
    if (node.nodeType !== 1) return;
    for (var s = 0; s < selectors.length; s++) {
      if (node.matches && node.matches(selectors[s])) {
        var text = (node.textContent || '').trim();
        if (text) window.__toasts.push(text);
      }
      if (node.querySelectorAll) {
        var found = node.querySelectorAll(selectors[s]);
        for (var f = 0; f < found.length; f++) {
          var txt = (found[f].textContent || '').trim();
          if (txt) window.__toasts.push(txt);
        }
      }
    }
  }
  var observer = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      for (var n = 0; n < mutations[m].addedNodes.length; n++) {
        capture(mutations[m].addedNodes[n]);
      }
    }
  });
  function startObserving() {
    var target = document.body || document.documentElement;
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }
  }
  if (document.body) {
    startObserving();
  } else {
    document.addEventListener('DOMContentLoaded', startObserving);
  }
})();
`;

/**
 * Installs a MutationObserver that captures all toast messages.
 * Call before page navigation (uses addInitScript).
 */
export async function installToastCollector(page: Page) {
  await page.addInitScript(SCRIPT);
}

/**
 * Reads all captured toasts and clears the buffer.
 */
export async function readToasts(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const arr = (window as any).__toasts as string[] | undefined;
    if (!arr) return [];
    const copy = [...arr];
    arr.length = 0;
    return copy;
  });
}

/**
 * Clears all captured toasts without reading them.
 */
export async function clearToasts(page: Page): Promise<void> {
  await page.evaluate(() => {
    const arr = (window as any).__toasts as string[] | undefined;
    if (arr) arr.length = 0;
  });
}

/**
 * Returns the last toast message (or null if none).
 */
export async function lastToast(page: Page): Promise<string | null> {
  const toasts = await readToasts(page);
  return toasts.length > 0 ? toasts[toasts.length - 1] : null;
}

/**
 * Waits for a new toast matching text, polling every 200ms.
 * Clears the buffer before waiting — only matches toasts that appear after the call.
 */
export async function waitForToast(
  page: Page,
  text: string | RegExp,
  timeout = 5000,
): Promise<string> {
  await clearToasts(page);
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const toasts = await readToasts(page);
    for (const t of toasts) {
      if (typeof text === "string" ? t.includes(text) : text.test(t)) {
        return t;
      }
    }
    await page.waitForTimeout(200);
  }
  throw new Error(`Toast "${text}" not found within ${timeout}ms`);
}
