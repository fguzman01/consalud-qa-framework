/**
 * PRÁCTICA DE RECURSIÓN — Equifax/23people HackerRank Test
 * Estructura para pensar CUALQUIER problema de recursión:
 * 1. Caso base: ¿cuándo paro? (el caso más simple posible)
 * 2. Caso recursivo: ¿cómo reduzco el problema y confío en que la llamada
 *    recursiva resuelve el resto?
 * 3. ¿Cómo combino el resultado de la llamada recursiva con el paso actual?
 *
 * Resuelve cada ejercicio TÚ MISMO antes de mirar la pista/solución.
 * Cronometra: 15-20 min por ejercicio (el test real da hasta 25 min).
 */

// ==========================================
// NIVEL 1: Los clásicos (calientan el patrón)
// ==========================================

// 1. Factorial
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
// Pista: caso base es factorial(0) o factorial(1) = 1
function factorial(n: number): number {
  // TU CÓDIGO AQUÍ
  if(n === 1){
    return 1
  }
  return n*factorial(n-1)
}

// 2. Fibonacci
// fib(0)=0, fib(1)=1, fib(n) = fib(n-1) + fib(n-2)
function fibonacci(n: number): number {
  // TU CÓDIGO AQUÍ
  if(n === 0){
    return 0
  }
  if(n===1){
    return 1
  }

  return fibonacci(n-1) + fibonacci(n-2)  // ← dos llamadas separadas
}

// 3. Suma de un array usando recursión (sin usar .reduce ni loops)
// sumArray([1,2,3,4]) => 10
// Pista: suma = primer elemento + sumArray(resto del array)
function sumArray(arr: number[]): number {
  // TU CÓDIGO AQUÍ
  if (arr.length === 0) return 0
  return arr[0] + sumArray(arr.slice(1))
}

// 3.1 Suma de un array usando recursión (sin usar .reduce ni loops)
// sumArray([1,2,3,4]) => 10
// Pista: suma = primer elemento + sumArray(resto del array)
function sumArray1(arr: number[], i: number = 0): number {
  // TU CÓDIGO AQUÍ
  if (i === arr.length) return 0
  return arr[i] + sumArray1(arr, i + 1);
}

// ==========================================
// NIVEL 2: Un poco más de manejo de casos
// ==========================================

// 4. Davis' Staircase (clásico de HackerRank)
// Puedes subir de a 1, 2 o 3 escalones. ¿De cuántas formas distintas
// puedes subir una escalera de n escalones?
// stepPerms(1) = 1  (1)
// stepPerms(3) = 4  (1+1+1, 1+2, 2+1, 3)
// Pista: para llegar al escalón n, viniste del n-1, n-2 o n-3
function stepPerms(n: number): number {
  // TU CÓDIGO AQUÍ
  if(n===1) return 1
  if(n===2) return 2
  if(n===3) return 4

  return  stepPerms(n-1) + stepPerms(n-2) + stepPerms(n-3);
}

// 5. Reverse de un string usando recursión (sin .reverse())
// reverseString("hola") => "aloh"
// Pista: reverse(s) = reverse(resto de s) + primer caracter de s
function reverseString(s: string): string {
  // TU CÓDIGO AQUÍ
  if (s.length === 0)return "";

  return reverseString(s.slice(1))+ s[0]
}

// 6. ¿Es un array (o parte de él) un palíndromo?
// isPalindrome("anilina") => true
// Pista: compara primer y último caracter, y llama recursivamente
// con el string "recortado" (sin esos dos extremos)
function isPalindrome(s: string): boolean {
  // TU CÓDIGO AQUÍ
  //Casos bases

  if(s === "") return true
  if(s.length === 1) return true
  
  if(s[0] !== s[s.length -1])return false
  return isPalindrome(s.slice(1, -1))
  
}

// ==========================================
// NIVEL 3: Recursión sobre estructuras / backtracking simple
// ==========================================

// 7. Potencia: calcular base^exp usando recursión
// power(2, 5) => 32
// Pista: 2^5 = 2 * 2^4  |  caso base: cualquier número^0 = 1
function power(base: number, exp: number): number {
  // TU CÓDIGO AQUÍ
  if (exp===0) return 1
  return base * power(base, exp -1)
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
function gcd(a: number, b: number): number {
  // TU CÓDIGO AQUÍ

  if(b===0) return a


  return gcd(b,a%b)
}

// ==========================================
// Tests rápidos para verificar tus soluciones
// ==========================================
function runTests() {
  console.log("factorial(5) =", factorial(5), "→ esperado 120");
  console.log("fibonacci(7) =", fibonacci(7), "→ esperado 13");
  console.log("sumArray([1,2,3,4]) =", sumArray([1, 2, 3, 4]), "→ esperado 10");
  console.log("sumArray([1,2,3,4]) =", sumArray([1, 2, 3, 4]), "→ esperado 10");
  console.log("stepPerms(4) =", stepPerms(4), "→ esperado 7");
  console.log("reverseString('hola') =", reverseString("hola"), "→ esperado 'aloh'");
  console.log("isPalindrome('anilina') =", isPalindrome("anilina"), "→ esperado true");
  console.log("power(2,5) =", power(2, 5), "→ esperado 32");
  console.log("subsets([1,2]) =", JSON.stringify(subsets([1, 2])), "→ esperado [[],[1],[2],[1,2]] (orden puede variar)");
  console.log("gcd(48,18) =", gcd(48, 18), "→ esperado 6");
}

runTests();