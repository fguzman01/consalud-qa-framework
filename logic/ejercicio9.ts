function contarVocales(texto: string): number {
    return (texto.match(/[aeiou]/gi) || []).length;
}

console.log(contarVocales('hola mundo'));  // 4
console.log(contarVocales('karate'));      // 3
console.log(contarVocales('xyz'));         // 0