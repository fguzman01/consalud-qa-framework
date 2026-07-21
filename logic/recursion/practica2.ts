// 1. Factorial
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
// Pista: caso base es factorial(0) o factorial(1) = 1

import { platform } from "node:os"

function factorial2(number : number):number{
    if (number === 1) return 1
    return number *factorial2(number-1)  
}

// 2. Fibonacci
// fib(0)=0, fib(1)=1, fib(n) = fib(n-1) + fib(n-2)
function fibonacci2(number : number):number{
    if(number===0) return 0
    if(number===1) return 1

    return fibonacci2(number-1) + fibonacci2(number-2)
}

// 3. Suma de un array usando recursión (sin usar .reduce ni loops)
// sumArray([1,2,3,4]) => 10
// Pista: suma = primer elemento + sumArray(resto del array)

function sumArray2(arr : number[]):number{
    if(arr.length ===0) return 0
    return arr[0] + sumArray2(arr.slice(1))
}

// 4. Davis' Staircase (clásico de HackerRank)
// Puedes subir de a 1, 2 o 3 escalones. ¿De cuántas formas distintas
// puedes subir una escalera de n escalones?
// stepPerms(1) = 1  (1)
// stepPerms(3) = 4  (1+1+1, 1+2, 2+1, 3)
// Pista: para llegar al escalón n, viniste del n-1, n-2 o n-3

function step(n:number):number{
    if (n===1) return 1
    if (n===2) return 2
    if (n===3) return 4

    return step(n-1) + step(n-2) + step(n-3)
}

// 5. Reverse de un string usando recursión (sin .reverse())
// reverseString("hola") => "aloh"
// Pista: reverse(s) = reverse(resto de s) + primer caracter de s

function reverse(palabra : string):string{
    if (palabra.length === 0) return ""

    return reverse(palabra.slice(1)) + palabra[0]
}

// 6. ¿Es un array (o parte de él) un palíndromo?
// isPalindrome("anilina") => true
// Pista: compara primer y último caracter, y llama recursivamente
// con el string "recortado" (sin esos dos extremos)

function palindrome (palabra:string):boolean{
    if(palabra === "") return true
    if(palabra.length === 1)  return true
    if(palabra[0] != palabra[palabra.length - 1]) return false

    return palindrome(palabra.slice(1 , -1))
}

// ==========================================
// NIVEL 3: Recursión sobre estructuras / backtracking simple
// ==========================================

// 7. Potencia: calcular base^exp usando recursión
// power(2, 5) => 32
// Pista: 2^5 = 2 * 2^4  |  caso base: cualquier número^0 = 1

function potencia(base:number, exp:number):number{
    if (exp === 0) return 1

    return base * potencia(base, exp -1)
}

// 8. Todas las subsecuencias (subsets) de un array
// subsets([1,2]) => [[], [1], [2], [1,2]]
// Pista: para cada elemento, tienes 2 caminos: incluirlo o no incluirlo
// en la llamada recursiva sobre el resto del array
function subsets(arr: number[]): number[][] {
    if (arr.length === 0) return [[]];
    
    const first = arr[0];
    const rest = arr.slice(1);
    const subsetsRest = subsets(rest);
    const conFirst = subsetsRest.map(subset => [first, ...subset]);
    
    return [...subsetsRest, ...conFirst];
}

// 9. Máximo común divisor (Euclides) — muy típico
// gcd(48, 18) => 6
// Pista: gcd(a, b) = gcd(b, a % b)  |  caso base: si b == 0, retorna a

function gcd(a:number , b:number):number{
    if (b===0) return a

    return gcd(b,a%b)
}

// ==========================================
// Tests rápidos para verificar tus soluciones
// ==========================================
function runTestss() {
  console.log("factorial(5) =", factorial2(5), "→ esperado 120");
  console.log("fibonacci(7) =", fibonacci2(7), "→ esperado 13");
  console.log("sumArray2([1,2,3,4]) =", sumArray2([1, 2, 3, 4]), "→ esperado 10");
  //console.log("sumArray([1,2,3,4]) =", sumArray([1, 2, 3, 4]), "→ esperado 10");
  console.log("stepPerms(4) =", step(4), "→ esperado 7");
  console.log("reverseString('hola') =", reverse("hola"), "→ esperado 'aloh'");
  console.log("isPalindrome('anilina') =", palindrome("anilina"), "→ esperado true");
  console.log("power(2,5) =", potencia(2, 5), "→ esperado 32");
  console.log("subsets([1,2]) =", JSON.stringify(subsets([1, 2])), "→ esperado [[],[1],[2],[1,2]] (orden puede variar)");
  console.log("gcd(48,18) =", gcd(48, 18), "→ esperado 6");
}

runTestss();