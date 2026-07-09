function todosPositivos(numeros: number[]): boolean {
    // tu código acá
    if(numeros.length===0){
        return true
    }
    return numeros.every(numero => numero > 0)

}

console.log(todosPositivos([1, 2, 3, 4]));    // true
console.log(todosPositivos([1, -2, 3]));       // false
console.log(todosPositivos([]));               // true