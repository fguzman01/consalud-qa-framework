interface Persona {
    nombre: string;
    edad: number;
}

function mayoresDeEdad(personas: Persona[]): Persona[] {
    // tu código acá
    return personas.filter(personas=>personas.edad>=18)
}

const personas = [
    { nombre: 'Felipe', edad: 35 },
    { nombre: 'Juan', edad: 15 },
    { nombre: 'Maria', edad: 22 },
    { nombre: 'Pedro', edad: 17 }
];

console.log(mayoresDeEdad(personas));
// debe imprimir Felipe y Maria