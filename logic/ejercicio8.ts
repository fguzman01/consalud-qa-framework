function paresOrdenados(numeros: number[]): number[] {
    // tu código acá
    return numeros
        .filter(numero => numero % 2 === 0)
        .sort((a,b) => a-b); 

}

console.log(paresOrdenados([5, 2, 8, 1, 4, 9, 6])); // [2, 4, 6, 8]
console.log(paresOrdenados([1, 3, 5, 7]));           // []
console.log(paresOrdenados([4, 2, 6]));              // [2, 4, 6]