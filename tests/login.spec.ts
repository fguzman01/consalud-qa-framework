import {test, expect} from '@playwright/test'
import { LoginFlow } from '../flows/LoginFlow'
import { UserProvider } from '../data/providers/UserProvider';
import { attachScreenshot } from '../helpers/ScreenshotHelper';

test.describe('Login - demoblaze', ()=> {
    let loginFlow: LoginFlow
    const userProvider = new UserProvider();

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginFlow = new LoginFlow(page);
    });

    test('Login exitoso con credenciales válidas', async ({ page }) => {
        //await page.goto('/');
        const loginFlow = new LoginFlow(page);
        const user = userProvider.getValidUser();
        await loginFlow.loginWithCredentials(user.username, user.password);
        await expect(page.locator('#nameofuser')).toBeVisible();
        await expect(page.locator('#nameofuser')).toContainText(user.username);
        await attachScreenshot(page, 'Login Screenshot');
        
    });

    test('Login fallido con credenciales inválidas', async({page}) =>{
        const user = userProvider.getInvalidUser();
        const dialogPromise = page.waitForEvent('dialog')
        await loginFlow.loginWithCredentials(user.username, user.password);
        const dialog = await dialogPromise

        expect(dialog.message()).toContain('User does not exist');
        await dialog.accept();

        await expect(page.locator('#nameofuser')).not.toBeVisible();
        await attachScreenshot(page, 'Invalid Login');

    });

    test('Login fallido usuario empaty', async({page}) =>{
        const user = userProvider.getEmpatyUser()
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out Username and Password.');
            await dialog.accept();
        });
        await loginFlow.loginWithCredentials(user.username, user.password);
        
        await expect(page.locator('#nameofuser')).not.toBeVisible();
        await attachScreenshot(page, 'Empaty login');

    });

});