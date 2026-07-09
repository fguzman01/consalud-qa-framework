function obtenerKeys(objeto: Record<string, unknown>): string[] {
    // tu código acá
    return Object.keys(objeto)

}

console.log(obtenerKeys({ nombre: 'Felipe', edad: 35, rol: 'QA' })); // ['nombre', 'edad', 'rol']
console.log(obtenerKeys({})); // []