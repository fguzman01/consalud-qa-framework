import {test, expect} from '@playwright/test'
import { ProductFlow } from '../flows/ProductFlow';
import { text } from 'node:stream/consumers';

test.describe('Login - demoblaze', ()=> {
    let productFlow : ProductFlow

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        productFlow = new ProductFlow(page)
            
    });

    test('Validar producto', async ({ page }) => {
        //Guardar en un variable el elemento
        const linkProducto = page.locator('//h4[@class="card-title"]/a[@href="prod.html?idp_=1"]');
        //Extraemos el texto para validar despues
        const nombreProducto = await linkProducto.innerText();
        //CLick en elemento
        await linkProducto.click();
        //await page.locator('a[href="prod.html?idp_=1"]').click();
        //Validar titulo del producto
        const titulo = page.locator('//h2[@class="name"]');
        await expect(titulo).toHaveText(nombreProducto);
        //Esperar boton add
        await page.getByRole('link', { name: 'Add to cart' }).waitFor({ state: 'visible' });
        const dialogPromise = page.waitForEvent('dialog')
        await page.getByRole('link', { name: 'Add to cart' }).click()
        const dialog = await dialogPromise
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();
    });

     test('Carrito desde el flow', async ({ page }) => {
        
        const nombre = await productFlow.irAlProducto1();
        await expect(page.locator('//h2[@class="name"]')).toHaveText(nombre);
        const dialogPromise = page.waitForEvent('dialog')
        await productFlow.agregarProducto()
        const dialog = await dialogPromise
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();

     });



});

