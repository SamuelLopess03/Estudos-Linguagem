// Representa a tipagem estática que delimita o tipo de algo no momento da declaração, não podendo ser alterado
// Sintaxe: (name: string, idade: number): string => {} | A frente dos ":" temos a definição do tipo

const myString: string = "Samuel";
const myNumber: number = 20;
const myBoolean: boolean = true;

// Exemplo de Utilização Errada
const newString: string = 20.5;

const myVar: any = class {}; // O tipo Any representa qualquer coisa, basicamente é um tipo genérico

const myVar1: null = null; // Representa a ausência de qualquer dado => Definido Normalmente de Forma Manual pelo Dev

const myVar2: undefined = undefined; // Representa que o dado não tem definição ou pelo menos ainda não teve valor => Automático pelo Javascript/Typescript

// Tipagem sobre uma função com seu retorno e argumentos tipados
// Basicamente, o simbolo de "?" significa que o dado pode ser opcional, mas ele deve está entre os últimos parâmetros
// A atribuição no argumento da função significa que aquele vai ser o valor padrão, caso não seja enviado algum dado para a função naquela posição
function greet(
  name: string,
  age?: number,
  isProgrammer: boolean = false
): string {
  return "";
}

greet("nome");

// No typescript existe a inferência de tipos, que dado o valor atribuido para a variável/função, o typescript delimita o tipo de acordo com o valor
const arrayNumbers = [-1, 2, 10, 15, 20];
