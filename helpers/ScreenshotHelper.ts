import { Page, test } from '@playwright/test';

export async function attachScreenshot(page: Page, name: string) {
    const screenshot = await page.screenshot();
    await test.info().attach(name, {
        body: screenshot,
        contentType: 'image/png'
    });
}

