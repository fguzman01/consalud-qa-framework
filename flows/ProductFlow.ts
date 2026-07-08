import { Page } from '@playwright/test';
import { ProductPage } from '../pages/PoductPage';


export class ProductFlow {

    private productPage : ProductPage;

    constructor (page: Page){
        this.productPage = new ProductPage(page);
    }


    async irAlProducto1 (): Promise<string>{
        const nombre = await this.productPage.extraerNombre();
        await this.productPage.clickProduct1();
        return nombre;
    }

    async agregarProducto (){
        console.log('Se agrega producto al carro')
        await this.productPage.clicButtonCart()
    }
    
}