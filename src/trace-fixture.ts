import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export { expect };
export const test = base.extend({
  page: async ({ page, context }, use, testInfo) => {
    const traceDir = path.join(path.dirname(testInfo.file), 'trace');
    fs.mkdirSync(traceDir, { recursive: true });

    const file = testInfo.file
      .replace(/\.spec\.ts$/, '')
      .split(path.sep)
      .pop();
    const ln = testInfo.line || 0;
    const name = `${file}_${ln}`.toLowerCase();

    const messages: { level: string; text: string }[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning' || msg.type() === 'error') {
        messages.push({ level: msg.type(), text: msg.text() });
      }
    });

    await context.tracing.start({ screenshots: true, snapshots: true });
    await use(page);
    await context.tracing.stop({ path: path.join(traceDir, `${name}.zip`) });

    if (messages.length > 0) {
      const log = messages.map((m) => `[${m.level}] ${m.text}`).join('\n');
      fs.writeFileSync(path.join(traceDir, `${name}.console.log`), log + '\n');
    }
  },
});
