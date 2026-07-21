import { test, expect } from '@playwright/test';

test('Loop - validar todos los productos del home', async ({ page }) => {
    await page.goto('/');
    
    // obtener todos los productos
    const productos = page.locator('.card-title a');
    const cantidad = await productos.count();
    console.log('Total productos:', cantidad);
    
    // loop por cada producto
    for (let i = 0; i < cantidad; i++) {
        const nombre = await productos.nth(i).innerText();
        console.log(`Producto ${i + 1}:`, nombre);
        await expect(productos.nth(i)).toBeVisible();
    }
});

test('Loop - agregar multiples productos al carrito', async ({ page }) => {
    await page.goto('/');
    
    const productosIds = [1, 2, 3]; // ids de productos a agregar
    
    for (const id of productosIds) {
        // ir al producto
        await page.locator(`a[href="prod.html?idp_=${id}"]`).first().click();
        
        // agregar al carrito
        const dialogPromise = page.waitForEvent('dialog');
        await page.locator(`[onclick="addToCart(${id})"]`).click();
        const dialog = await dialogPromise;
        console.log(`Producto ${id} agregado:`, dialog.message());
        await dialog.accept();
        
        // volver al home
        await page.goto('/');
    }
    
    // ir al carrito y validar que hay 3 productos
    await page.locator('#cartur').click();
    const items = page.locator('tbody tr');
    const cantidadCarrito = await items.count();
    console.log('Productos en carrito:', cantidadCarrito);
    expect(cantidadCarrito).toBe(productosIds.length);
});

test('Loop - validar precios de productos', async ({ page }) => {
    await page.goto('/');
    
    const precios = page.locator('.card-block h5');
    const cantidad = await precios.count();
    
    for (let i = 0; i < cantidad; i++) {
        const precio = await precios.nth(i).innerText();
        console.log(`Precio producto ${i + 1}:`, precio);
        await expect(precios.nth(i)).toBeVisible();
    }
});