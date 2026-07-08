function sumar(numeros: number[]): number {
    // tu código acá
    return numeros.reduce((acumulado, actual)=> acumulado + actual,0)
    
}

console.log(sumar([1, 2, 3, 4, 5]));  // debe imprimir 15
console.log(sumar([10, 20, 30]));      // debe imprimir 60
console.log(sumar([]));                // debe imprimir 0