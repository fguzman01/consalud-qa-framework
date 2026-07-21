import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';


test.describe('Simulacro tes consalud', ()=>{
    let loginPage : LoginPage

    test.beforeEach(async({page})=>{
        await page.goto('/');
        loginPage = new LoginPage(page)

    })

    test('Login exitoso con valida nvar', async ({page})=>{

        //1. CLick en login
        await page.locator('#login2').click()

        //2. Esperar visible moda
        await expect(page.locator('[id="logInModal"]')).toBeVisible()
        //3. Input user / pass
        //await loginPage.inputUsername('felipe.guzman.a@gmail.com')
        //await loginPage.inputPassword('123456')
        //4. Input user y password
        await page.locator('[id="loginusername"]').fill('felipe.guzman.a@gmail.com')
        await page.locator('[id="loginpassword"]').fill('123456')
        //5 .CLick en boton login
        await page.locator('[onclick="logIn()"]').click()
        //6 .Validar nvar
        await expect(page.locator('[id="nameofuser"]')).toContainText('felipe.guzman.a@gmail.com')
    })

})