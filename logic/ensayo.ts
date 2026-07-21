function tieneNegativos(numeros: number[]): boolean {
    // 1 opcion
    //return numeros.some(num => num <0)
    
    // 2 opcion
    for (let i = 0; i <numeros.length; i++){
        if(numeros[i]<0){
            return true
        }
    }

    return false
    
}

function contarPalabras (palabra: string): number{
    const textoLimpio = palabra.trim()
    if(palabra === "") return 0;
    return textoLimpio.split(/\s+/).length
}
function mayoresConMayusculas(palabras: string[]): string[] {
    return palabras
        .filter(p => p.length > 5)
        .map(p => p.toUpperCase());
}

console.log(mayoresConMayusculas(['hola', 'playwright', 'QA', 'cucumber', 'karate']));
// ['PLAYWRIGHT', 'CUCUMBER', 'KARATE']

console.log(tieneNegativos([5, -2, 8, 1, 4, 9, 6])); //true
console.log(contarPalabras('hola me llamo felipe'))
console.log(mayoresConMayusculas(['hola', 'playwright', 'QA', 'cucumber', 'karate']));
