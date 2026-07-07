import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginFlow } from '../../flows/LoginFlow';
import {expect} from '@playwright/test'
import { After } from '@cucumber/cucumber';

setDefaultTimeout(30000);

let browser : Browser
let context : BrowserContext;
let page: Page;
let loginFlow: LoginFlow



Given ('el usuario esta en la pagina de inicio', async ()=>{
    browser = await chromium.launch({headless: false, slowMo: 1000});
    context = await browser.newContext({baseURL: 'https://www.demoblaze.com'})
    page = await context.newPage();
    await page.goto('')
    loginFlow = new LoginFlow(page)

});

When ('el usuario inicia sesion con usuario {string} y contraseña {string}', async(username: string, password: string)=>{
    await loginFlow.loginWithCredentials(username, password)
});

Then ('el usuario debe ver su nombre en el nvbar', async()=>{
    await page.waitForSelector('#nameofuser', { state: 'visible' })
    await expect(page.locator('#nameofuser')).toContainText('felipe.guzman.a@gmail.com');

})

Then ('debe aparecer un alerta con el mensaje {string}', async (mensaje:string)=>{
    const dialog = await page.waitForEvent('dialog');
    expect(dialog.message()).toContain(mensaje);
    await dialog.accept();
})

After(async function() {
    await page.close();
    await context.close();
    await browser.close();
});
