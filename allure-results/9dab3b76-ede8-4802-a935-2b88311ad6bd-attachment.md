# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: carrito2.spec.ts >> Set de test de carrito >> Agregar al carrito y validar
- Location: tests\carrito2.spec.ts:16:9

# Error details

```
Error: locator.waitFor: Error: strict mode violation: locator('//td[text()="Samsung galaxy s6"]') resolved to 3 elements:
    1) <td>Samsung galaxy s6</td> aka getByRole('cell', { name: 'Samsung galaxy s6' }).first()
    2) <td>Samsung galaxy s6</td> aka getByRole('cell', { name: 'Samsung galaxy s6' }).nth(1)
    3) <td>Samsung galaxy s6</td> aka getByRole('cell', { name: 'Samsung galaxy s6' }).nth(2)

Call log:
  - waiting for locator('//td[text()="Samsung galaxy s6"]') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "PRODUCT STORE" [ref=e4] [cursor=pointer]:
        - /url: index.html
        - img [ref=e5]
        - text: PRODUCT STORE
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home (current)" [ref=e9] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=e10]: (current)
        - listitem [ref=e11]:
          - link "Contact" [ref=e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e13]:
          - link "About us" [ref=e14] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e15]:
          - link "Cart" [ref=e16] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem [ref=e17]:
          - link "Log out" [ref=e18] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e19]:
          - link "Welcome felipe.guzman.a@gmail.com" [ref=e20] [cursor=pointer]:
            - /url: "#"
        - listitem
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "Products" [level=2] [ref=e24]
      - table [ref=e26]:
        - rowgroup [ref=e27]:
          - row "Pic Title Price x" [ref=e28]:
            - columnheader "Pic" [ref=e29]
            - columnheader "Title" [ref=e30]
            - columnheader "Price" [ref=e31]
            - columnheader "x" [ref=e32]
        - rowgroup [ref=e33]:
          - row "Samsung galaxy s6 360 Delete" [ref=e34]:
            - cell [ref=e35]:
              - img [ref=e36]
            - cell "Samsung galaxy s6" [ref=e37]
            - cell "360" [ref=e38]
            - cell "Delete" [ref=e39]:
              - link "Delete" [ref=e40] [cursor=pointer]:
                - /url: "#"
          - row "Samsung galaxy s6 360 Delete" [ref=e41]:
            - cell [ref=e42]:
              - img [ref=e43]
            - cell "Samsung galaxy s6" [ref=e44]
            - cell "360" [ref=e45]
            - cell "Delete" [ref=e46]:
              - link "Delete" [ref=e47] [cursor=pointer]:
                - /url: "#"
          - row "Samsung galaxy s6 360 Delete" [ref=e48]:
            - cell [ref=e49]:
              - img [ref=e50]
            - cell "Samsung galaxy s6" [ref=e51]
            - cell "360" [ref=e52]
            - cell "Delete" [ref=e53]:
              - link "Delete" [ref=e54] [cursor=pointer]:
                - /url: "#"
    - generic [ref=e55]:
      - heading "Total" [level=2] [ref=e56]
      - heading "1080" [level=3] [ref=e59]
      - button "Place Order" [ref=e60]
  - generic [ref=e62]:
    - generic [ref=e65]:
      - heading "About Us" [level=4] [ref=e66]
      - paragraph [ref=e67]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e70]:
      - heading "Get in Touch" [level=4] [ref=e71]
      - paragraph [ref=e72]: "Address: 2390 El Camino Real"
      - paragraph [ref=e73]: "Phone: +440 123456"
      - paragraph [ref=e74]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e78]:
      - img [ref=e79]
      - text: PRODUCT STORE
  - contentinfo [ref=e80]:
    - paragraph [ref=e81]: Copyright © Product Store
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test'
  2  | import { ProductFlow } from '../flows/ProductFlow'
  3  | import { UserProvider } from '../data/providers/UserProvider'
  4  | import { LoginFlow } from '../flows/LoginFlow'
  5  | 
  6  | test.describe ('Set de test de carrito', async() =>{
  7  |     let loginFlow : LoginFlow
  8  |     const userProvider = new UserProvider
  9  |     
  10 |     test.beforeEach (async({page})=>{
  11 |         await page.goto('/')
  12 |         loginFlow = new LoginFlow(page)
  13 |        
  14 |     })
  15 | 
  16 |     test('Agregar al carrito y validar', async ({page}) =>{
  17 |         // 1. Login en sitio Web
  18 |         const user = userProvider.getValidUser();
  19 |         await loginFlow.loginWithCredentials(user.username, user.password);
  20 | 
  21 |         // 2. Almacenar elemento, extraer texto y click en producto
  22 |         const linkPrimerProducto = page.locator('//h4[@class="card-title"]/a[contains(@href,"1")]');
  23 |         const nombreProducto = await linkPrimerProducto.innerText();
  24 |         await linkPrimerProducto.click();
  25 | 
  26 |         // 3 . Validar texto producto, agregar al carro
  27 |         await expect(page.locator('//h2[@class="name"]')).toHaveText(nombreProducto)
  28 |         const addButton= page.locator('//a[@onclick="addToCart(1)"]')
  29 |         const dialogPromise = page.waitForEvent('dialog')
  30 |         await addButton.click()
  31 |         const dialog = await dialogPromise
  32 |         expect(dialog.message()).toContain('Product added');
  33 |         await dialog.accept();
  34 | 
  35 |         //4. Ir al carrito y validar por nombre de producto
  36 |         const linkCart = page.locator('//a[@id="cartur"]')
  37 |         await linkCart.click()
> 38 |         await page.locator(`//td[text()="${nombreProducto}"]`).waitFor({state : 'visible'})
     |                                                                ^ Error: locator.waitFor: Error: strict mode violation: locator('//td[text()="Samsung galaxy s6"]') resolved to 3 elements:
  39 | 
  40 |     });
  41 | 
  42 | });
```