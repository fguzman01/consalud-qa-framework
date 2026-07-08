function invertir(texto: string): string {
    // tu código acá
    return texto.split('').reverse().join('');
}

console.log(invertir('hola'));      // debe imprimir 'aloh'
console.log(invertir('karate'));    // debe imprimir 'etarak'
console.log(invertir(''));          // debe imprimir ''