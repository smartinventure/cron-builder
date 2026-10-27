// Renders the demo with the builder open and saves README screenshots to docs/.
// Usage: npm run build:demo && npm run screenshot
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = 4179;
const server = spawn('npx', ['vite', 'preview', '--config', 'vite.demo.config.ts', '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
});

const url = `http://localhost:${PORT}/?open`;

async function waitForServer() {
    for (let i = 0; i < 50; i++) {
        try {
            if ((await fetch(url)).ok) return;
        } catch { /* not up yet */ }
        await new Promise((r) => setTimeout(r, 200));
    }
    throw new Error('Preview server did not start');
}

try {
    await waitForServer();
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 900, height: 820 }, deviceScaleFactor: 2 });

    await page.goto(url);
    await page.getByRole('button', { name: 'Weekly' }).waitFor();
    await page.waitForTimeout(600); // let the CSS colour transitions settle
    await page.screenshot({ path: 'docs/screenshot.png' });

    await page.getByRole('button', { name: 'Advanced Mode' }).click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'docs/screenshot-advanced.png' });

    await browser.close();
    console.log('Saved docs/screenshot.png and docs/screenshot-advanced.png');
} finally {
    server.kill();
}
