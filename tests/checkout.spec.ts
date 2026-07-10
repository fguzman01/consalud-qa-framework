import {test, expect} from '@playwright/test'
import { UserProvider } from '../data/providers/UserProvider'
import { LoginFlow } from '../flows/LoginFlow'
import { ProductFlow } from '../flows/ProductFlow'
import { CartPage } from '../pages/CartPage'
import { ProductPage } from '../pages/PoductPage'

test.describe('Checkout completo', () =>{
    const userProvider = new UserProvider
    let loginFlow : LoginFlow
    let productFlow : ProductFlow
    let cartPage : CartPage
    let productPage: ProductPage


    test.beforeEach (async({page})=>{
        await page.goto('/')
        loginFlow = new LoginFlow(page)
        productFlow = new ProductFlow(page)
        cartPage = new CartPage(page)
        productPage = new ProductPage(page)

    })


    test('Check out Store', async ({page})=>{
        // 1. Login en sitio web
        const user = userProvider.getValidUser()
        //await loginFlow.loginWithCredentials(user.username, user.password)
        //await loginFlow.loginWithCredentials("felipe.guzman.a@gmail.com","123456")
        await loginFlow.loginWithCredentials(user.username, user.password);

        // 2. Almacenar elemento, extraer texto y click en producto
        const linkPrimerProducto = page.locator('//h4[@class="card-title"]/a[contains(@href,"1")]');
        const nombreProducto = await linkPrimerProducto.innerText();
        await linkPrimerProducto.click();

        // 3 . Validar texto producto, agregar al carro
        await expect(page.locator('//h2[@class="name"]')).toHaveText(nombreProducto)
        const addButton= page.locator('//a[@onclick="addToCart(1)"]')
        const dialogPromise = page.waitForEvent('dialog')
        await addButton.click()
        const dialog = await dialogPromise
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();

        //4. Ir al carrito y validar por nombre de producto
        const linkCart = page.locator('//a[@id="cartur"]')
        await linkCart.click()
        await page.locator(`//td[text()="${nombreProducto}"]`).waitFor({state : 'visible'})

        //5. Lclick en purcharse
        const pursharseButton = page.locator('[data-target="#orderModal"]')
        await pursharseButton.click()

        //6. Llenar formulario
        await expect(pursharseButton).toBeVisible();
        await page.locator('[id="name"]').fill('Felipe Guzman')
        await page.locator('[id="country"]').fill('Chile')
        await page.locator('[id="city"]').fill('Santiago')
        await page.locator('[id="card"]').fill('1234567890')
        await page.locator('[id="month"]').fill('12')
        await page.locator('[id="year"]').fill('2025')

        //7. Check Purchase
        await page.getByRole('button', { name: 'Purchase'}).click()

        //8. Validar mensaje de exito
        await expect(page.locator('//h2[text()="Thank you for your purchase!"]')).toBeVisible()

    });

    test('Checkout desde el POM', async ({ page }) => {

         // 1. Login en sitio Web
        const user = userProvider.getValidUser();
        await loginFlow.loginWithCredentials(user.username, user.password);
        
        const nombre = await productFlow.irAlProducto1();
        await expect(page.locator('//h2[@class="name"]')).toHaveText(nombre);
        const dialogPromise = page.waitForEvent('dialog')
        await productFlow.agregarProducto()
        const dialog = await dialogPromise
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();

         //4. Ir al carrito y validar por nombre de producto
        await productPage.clickIrCarro()
        await productPage.validateCard(nombre)

        //5. click en purcharse
        await cartPage.clickButtonPursharse()
        
        //6. Llenar formulario compra
        await cartPage.inputDatosUsuario('Felipe Guzman', 'Chile', 'Santiago', 
            '1234567890', '12', '2025')
        await cartPage.clickConfCompra()
        
        //7. Validar mensaje de exito
        await expect(page.locator('//h2[text()="Thank you for your purchase!"]')).toBeVisible()
        
     });




})

