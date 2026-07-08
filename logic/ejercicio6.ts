interface Producto {
    nombre: string;
    precio: number;
}

function productoCaro(productos: Producto[]): Producto {
    // tu código acá
    const precioMaximo = Math.max(...productos.map(p => p.precio))

    const filtrados = productos.filter(p => p.precio == precioMaximo);

    return filtrados[0];
}

const productos = [
    { nombre: 'Laptop', precio: 1500 },
    { nombre: 'Mouse', precio: 25 },
    { nombre: 'Monitor', precio: 800 },
    { nombre: 'Teclado', precio: 150 }
];

console.log(productoCaro(productos));
// debe imprimir { nombre: 'Laptop', precio: 1500 }