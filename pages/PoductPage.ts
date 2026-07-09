import { Page, Locator, expect} from '@playwright/test';

export class ProductPage{
    readonly page: Page;

    readonly linkProdcut1: Locator;
    readonly buttonAddCart: Locator
    readonly linkCard : Locator


    constructor (page: Page){
        this.page = page;
        this.linkProdcut1 = page.locator('.card-title a').first();
        this.buttonAddCart = page.getByRole('link', { name: 'Add to cart' })
        this.linkCard = page.locator('//a[@id="cartur"]')
  
    }

    async clicButtonCart (){
        console.log('CLikc en añadir al carro')
        await this.buttonAddCart.click()
    }

    async clickProduct1 (){
        console.log('CLick en el primer producto de la lista')
        await this.linkProdcut1.click();
    }

    async extraerNombre (): Promise<string>{
        console.log('Extrae el nombre del producto')
        const textProduct = await this.linkProdcut1.innerText();
        return textProduct;
    }

    async clickIrCarro (){
        console.log('Ir al carro')
        await this.linkCard.click();
    }

    async validateCard(nombreProducto: string){
        console.log('Validar si esta nombre producto :', nombreProducto)
        const elemento = this.page.locator(`//td[text()="${nombreProducto}"]`);
        await elemento.waitFor({ state: 'visible' });
        await expect(elemento).toBeVisible();

    }

}