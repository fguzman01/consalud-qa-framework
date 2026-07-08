function esPalindromo(texto: string): boolean {
    // tu código acá
    const textoInvertido = texto.split('').reverse().join('');
    return texto === textoInvertido;
}

console.log(esPalindromo('ana'));      // true
console.log(esPalindromo('karate'));   // false
console.log(esPalindromo('reconocer')); // true
console.log(esPalindromo(''));         // true