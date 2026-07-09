function sinDuplicados(palabras: string[]): string[] {
    // tu código acá
    
    return [...new Set(palabras)];


}

console.log(sinDuplicados(['a', 'b', 'a', 'c', 'b'])); // ['a', 'b', 'c']
console.log(sinDuplicados(['QA', 'QA', 'Dev']));        // ['QA', 'Dev']
console.log(sinDuplicados([]));                          // []