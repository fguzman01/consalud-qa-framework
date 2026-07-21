# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: desafio2.spec.ts >> Desafio 1 estudio >> Login validación con if
- Location: tests\desafio2.spec.ts:12:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForEvent: Target page, context or browser has been closed
=========================== logs ===========================
waiting for event "dialog"
============================================================
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test'
  2  | import { LoginPage } from '../pages/LoginPage'
  3  | 
  4  | test.describe('Desafio 1 estudio', ()=>{
  5  |     let loginPage : LoginPage
  6  | 
  7  |     test.beforeEach(async ({page})=>{
  8  |        await page.goto('/')
  9  |        loginPage = new LoginPage(page)
  10 |     })
  11 | 
  12 |     test('Login validación con if', async ({page})=>{
  13 | 
  14 |         //1. CLick en login
  15 |         await page.locator('#login2').click()
  16 | 
  17 |         //2. Esperar visible moda
  18 |         await expect(page.locator('[id="logInModal"]')).toBeVisible()
  19 |         //3. Input user / pass
  20 |         await page.locator('[id="loginusername"]').fill('qeqewqe@werwrew.cl')
  21 |         await page.locator('[id="loginpassword"]').fill('1')
  22 | 
  23 |         //5. if si aparece modal
  24 |         //const nameofuser = page.locator('[id="nameofuser"]')
  25 |         if(await page.waitForEvent('dialog')){
> 26 |              const dialogPromise = page.waitForEvent('dialog')
     |                                         ^ Error: page.waitForEvent: Target page, context or browser has been closed
  27 |              const dialog = await dialogPromise
  28 |              expect(dialog.message()).toContain('User does not exist.');
  29 |             await dialog.accept();
  30 |         }else{
  31 |             test.fail(true, 'El elemento dejó de estar visible inesperadamente.');
  32 |         }
  33 |     })
  34 | 
  35 | 
  36 | 
  37 | })
```