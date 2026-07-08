function mayor(a: number, b: number): number {
    if(a>b){
        return a
    }
    return b
}

console.log(mayor(10, 5));   // debe imprimir 10
console.log(mayor(3, 8));    // debe imprimir 8
console.log(mayor(4, 4));    // debe imprimir 4