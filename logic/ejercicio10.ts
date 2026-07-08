function segundoMayor(numeros: number[]): number | undefined{
    // tu código acá
    //Elimina duplicados
    const unicos = [...new Set(numeros)]
    //Valida que hayan mas de dos unicos para que el ejerccio tenga sentido
    if (unicos.length<2){
        return undefined
    }

    // ordena de mayor a menor
    unicos.sort((a,b) => b-a);

    //el segundo del array
    return unicos[1];
}

console.log(segundoMayor([3, 1, 4, 1, 5, 9, 2, 6])); // 6
console.log(segundoMayor([10, 5, 8]));                // 8
console.log(segundoMayor([1, 1, 1]));                 // 1