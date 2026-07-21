import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Desafio 1 estudio', ()=>{
    let loginPage : LoginPage

    test.beforeEach(async ({page})=>{
       await page.goto('/')
       loginPage = new LoginPage(page)
    })

    test('Login validación con if', async ({ page }) => {
        await page.locator('#login2').click();
        await expect(page.locator('#logInModal')).toBeVisible();
        await page.locator('#loginusername').fill('qeqewqe@werwrew.cl');
        await page.locator('#loginpassword').fill('1');

        // registrar listener ANTES del click
        const dialogPromise = page.waitForEvent('dialog');
        await page.locator('[onclick="logIn()"]').click();
        
        const dialog = await dialogPromise;
        
        if (dialog.message().includes('User does not exist.')) {
            await dialog.accept();
            await expect(page.locator('#nameofuser')).not.toBeVisible();
        } else {
            await dialog.accept();
            test.fail(true, 'Mensaje inesperado: ' + dialog.message());
        }
    });



})