import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginFlow } from '../../flows/LoginFlow';
import {expect} from '@playwright/test'
import { After } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';
import console from 'node:console';

setDefaultTimeout(30000);

let browser : Browser
let context : BrowserContext;
let page: Page;
let loginFlow: LoginFlow
let loginPage : LoginPage



Given ('el usuario esta en la pagina de inicio', async ()=>{
    browser = await chromium.launch({headless: false, slowMo: 500});
    context = await browser.newContext({baseURL: 'https://www.demoblaze.com'})
    page = await context.newPage();
    await page.goto('')
    loginFlow = new LoginFlow(page)
    loginPage = new LoginPage(page)

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

Then ('el titulo de la pagina debe ser {string}', async(titulo:string)=>{
    await expect(page).toHaveTitle(titulo);
})

When ('el usuario abre el modal de login', async ()=>{
    console.log('Click modal login');
    await loginPage.openLoginModal()
})

Then ('el usuario cierra el modal', async ()=>{
    console.log('Modal login visible')
    await loginPage.esperarModalVisible()
    await loginPage.cerrarModal()
});

Then ('el modal de login no debe ser visible', async ()=>{
    console.log('Validar que no es visible')
    await expect(loginPage.loginModalShow).not.toBeVisible();
}) 

Then ('el boton de login debe estar visible', async ()=>{
    console.log('el boton de login debe estar visible')
    await expect(loginPage.linkLoginModal).toBeVisible()

})

Then ('el usuario hace logout', async ()=>{
    console.log('Step cando se hace logout')
    await loginPage.clickLogOut()
})

Then('el titulo de la pagina deser {string}', async(titulo:string)=>{
    console.log('el titulo de la pagina debe ser', titulo)
    await expect(page).toHaveTitle(titulo);
})


When('usuario hace click en sigup', async()=>{
    console.log('Step click en signup')
    await loginPage.clickSignUp()
})

Then('debe estar visible el modal de sigup', async()=>{
    console.log('Modal signup debe estar visible')
    await expect(page.locator('[id="signInModal"]')).toBeVisible()
})

When ('click en ir a aboutus', async()=>{
    console.log('hacer click en about us')
    await page.locator('[data-target="#videoModal"]').click()
})

Then ('debe estar visible video', async()=>{
    console.log('debe estar visible videp')
    await expect(page.locator('[title="Play Video"]')).toBeVisible()
})


After(async function() {
    await page.close();
    await context.close();
    await browser.close();
});
