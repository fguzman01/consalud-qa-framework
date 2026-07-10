# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout completo >> Checkout desde el POM
- Location: tests\checkout.spec.ts:73:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('//td[text()="Samsung galaxy s6"]')
Expected: visible
Error: strict mode violation: locator('//td[text()="Samsung galaxy s6"]') resolved to 2 elements:
    1) <td>Samsung galaxy s6</td> aka getByRole('cell', { name: 'Samsung galaxy s6' }).first()
    2) <td>Samsung galaxy s6</td> aka getByRole('cell', { name: 'Samsung galaxy s6' }).nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('//td[text()="Samsung galaxy s6"]')

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
    - generic [ref=e48]:
      - heading "Total" [level=2] [ref=e49]
      - heading "720" [level=3] [ref=e52]
      - button "Place Order" [ref=e53]
  - generic [ref=e55]:
    - generic [ref=e58]:
      - heading "About Us" [level=4] [ref=e59]
      - paragraph [ref=e60]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e63]:
      - heading "Get in Touch" [level=4] [ref=e64]
      - paragraph [ref=e65]: "Address: 2390 El Camino Real"
      - paragraph [ref=e66]: "Phone: +440 123456"
      - paragraph [ref=e67]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e71]:
      - img [ref=e72]
      - text: PRODUCT STORE
  - contentinfo [ref=e73]:
    - paragraph [ref=e74]: Copyright © Product Store
```

# Test source

```ts
  1  | import { Page, Locator, expect} from '@playwright/test';
  2  | 
  3  | export class ProductPage{
  4  |     readonly page: Page;
  5  | 
  6  |     readonly linkProdcut1: Locator;
  7  |     readonly buttonAddCart: Locator
  8  |     readonly linkCard : Locator
  9  | 
  10 | 
  11 |     constructor (page: Page){
  12 |         this.page = page;
  13 |         this.linkProdcut1 = page.locator('.card-title a').first();
  14 |         this.buttonAddCart = page.getByRole('link', { name: 'Add to cart' })
  15 |         this.linkCard = page.locator('//a[@id="cartur"]')
  16 |   
  17 |     }
  18 | 
  19 |     async clicButtonCart (){
  20 |         console.log('CLikc en añadir al carro')
  21 |         await this.buttonAddCart.click()
  22 |     }
  23 | 
  24 |     async clickProduct1 (){
  25 |         console.log('CLick en el primer producto de la lista')
  26 |         await this.linkProdcut1.click();
  27 |     }
  28 | 
  29 |     async extraerNombre (): Promise<string>{
  30 |         console.log('Extrae el nombre del producto')
  31 |         const textProduct = await this.linkProdcut1.innerText();
  32 |         return textProduct;
  33 |     }
  34 | 
  35 |     async clickIrCarro (){
  36 |         console.log('Ir al carro')
  37 |         await this.linkCard.click();
  38 |     }
  39 | 
  40 |     async validateCard(nombreProducto: string){
  41 |         console.log('Validar si esta nombre producto :', nombreProducto)
  42 |         const elemento = this.page.locator(`//td[text()="${nombreProducto}"]`);
  43 |         await elemento.waitFor({ state: 'visible' });
> 44 |         await expect(elemento).toBeVisible();
     |                                ^ Error: expect(locator).toBeVisible() failed
  45 | 
  46 |     }
  47 | 
  48 | }
```