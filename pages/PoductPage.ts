import { Page, Locator} from '@playwright/test';

export class ProductPage{
    readonly page: Page;

    readonly linkProdcut1: Locator;
    readonly buttonAddCart: Locator


    constructor (page: Page){
        this.page = page;
        this.linkProdcut1 = page.locator('.card-title a').first();
        this.buttonAddCart = page.getByRole('link', { name: 'Add to cart' })
  
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

}