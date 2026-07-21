import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Desafio 1 estudio', ()=>{
    let loginPage : LoginPage

    test.beforeEach(async ({page})=>{
       await page.goto('/')
       loginPage = new LoginPage(page)
    })

    test('Lista producto click 2 elemento', async ({page})=>{

        //1 . CLick segundo elemento
        console.log('Espera segundo elemento')
        const segundoElemento = await page.locator('//h4[@class="card-title"]/a[contains(@href,"2")]')
        await segundoElemento.click()

        //2. boton add to cart
        console.log('Boton add to cart visible')
        await expect(page.locator('[onclick="addToCart(2)"]')).toBeVisible()

    })

})



