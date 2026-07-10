import { Page, Locator} from '@playwright/test';

export class CartPage {
    readonly page : Page
    readonly buttonPursharse : Locator
    readonly inputName : Locator
    readonly inputPais : Locator
    readonly inputCity : Locator
    readonly inputCard : Locator
    readonly inputMonth: Locator
    readonly inputYear : Locator
    readonly buttonConf : Locator
    
    constructor (page : Page){
        this.page = page;
        this.buttonPursharse = page.locator('[data-target="#orderModal"]');
        this.inputName = page.locator('[id="name"]')
        this.inputPais = page.locator('[id="country"]')
        this.inputCity = page.locator('[id="city"]')
        this.inputCard = page.locator('[id="card"]')
        this.inputMonth = page.locator('[id="month"]')
        this.inputYear = page.locator('[id="year"]')
        this.buttonConf = page.getByRole('button', { name: 'Purchase'})

    }

    async clickButtonPursharse (){
        console.log('Hacer click en comprar')
        await this.buttonPursharse.click()
    }

    async inputDatosUsuario (name:string, country:string, city:string, card:string, moth:string, year:string  ){
        await this.inputName.fill(name)
        await this.inputPais.fill(country)
        await this.inputCity.fill(city)
        await this.inputCard.fill(card)
        await this.inputMonth.fill(moth)
        await this.inputYear.fill(year)
    }

    async clickConfCompra (){
        console.log('confirmar compra')
        await this.buttonConf.click()
    }

}