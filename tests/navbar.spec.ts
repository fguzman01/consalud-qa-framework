import {test, expect} from '@playwright/test'
test.describe('Navbar - demoblaze', ()=> {
    

    test.beforeEach(async ({ page }) => {
        await page.goto('/');  
            
    });

    test('Validar elementos del navbar son visibles', async ({ page }) => {
        await expect(page.locator('[id="nava"]')).toBeVisible()
        await expect(page.locator('//*[@class="nav-link" and text()="Home "]')).toBeVisible()
        await expect(page.locator('[id="cartur"]')).toBeVisible()
        await expect(page.locator('[id="login2"]')).toBeVisible()
    });
})