import { test, expect } from '@playwright/test';

test('GET /posts/1 - validar response API', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    console.log('Status:', response.status());
    
    const body = await response.json();
    console.log('Response body:', JSON.stringify(body, null, 2));
    
    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
    expect(typeof body.title).toBe('string');
    expect(typeof body.userId).toBe('number');
    
    console.log('Id:', body.id);
    console.log('Title:', body.title);
    console.log('UserId:', body.userId);
});

test('POST /posts - crear post', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'Test Consalud',
            body: 'Contenido',
            userId: 1
        }
    });
    
    console.log('Status POST:', response.status());
    
    const body = await response.json();
    console.log('Response POST:', JSON.stringify(body, null, 2));
    
    expect(response.status()).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.title).toBe('Test Consalud');
    
    console.log('Id creado:', body.id);
});