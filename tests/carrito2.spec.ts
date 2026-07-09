import {test, expect} from '@playwright/test'
import { ProductFlow } from '../flows/ProductFlow'
import { UserProvider } from '../data/providers/UserProvider'
import { LoginFlow } from '../flows/LoginFlow'
import { ProductPage } from '../pages/PoductPage';

test.describe ('Set de test de carrito', () =>{
    let loginFlow : LoginFlow
    let productFlow : ProductFlow
    let productPage : ProductPage
    const userProvider = new UserProvider
    
    test.beforeEach (async({page})=>{
        await page.goto('/')
        loginFlow = new LoginFlow(page)
        productFlow = new ProductFlow(page)
        productPage = new ProductPage(page)
       
    })

    test('Agregar al carrito y validar', async ({page}) =>{
        // 1. Login en sitio Web
        const user = userProvider.getValidUser();
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

    });

    test('Agregar al carrito y validar con POM', async({page})=>{
        // 1. Login en sitio Web
        const user = userProvider.getValidUser();
        await loginFlow.loginWithCredentials(user.username, user.password);

        //2 . Agregar prodcuto y validar
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


    })

});