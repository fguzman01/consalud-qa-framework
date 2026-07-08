function masLargo(palabras: string[]): string {
    // tu código acá
    //valido que tengo caracteres
    if (palabras.length === 0) {
        return "";
    }

    return palabras.reduce((masLargo, actual) =>{
        return actual.length > masLargo.length ? actual:masLargo;
    })


}

console.log(masLargo(['hola', 'karate', 'playwright', 'QA'])); // 'playwright'
console.log(masLargo(['a', 'bb', 'ccc']));                     // 'ccc'
console.log(masLargo(['igual', 'largo']));                     // 'igual'