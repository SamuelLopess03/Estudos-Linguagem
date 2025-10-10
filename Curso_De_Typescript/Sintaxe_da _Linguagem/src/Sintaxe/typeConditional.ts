// Podemos utilizar o validador ternário (? :) para realizar uma tipagem sobre as informações

// Exemplo: T extends U ? X : Y => ou seja, T precisa possuir U para ser X, caso não, vai ser Y

// Basicamente o Generic T precisa ser uma string para retornar "É uma string", se não for, retorna "Não é uma string"
type Conditional<T> = T extends string ? "É uma string" : "Não é uma string";

// Após definir o Generic T posso utilizá-lo ao longo da função inteira, seja nos argumentos, no corpo ou retorno da mesma
function conditional<T>(value: T): Conditional<T> {
  const text = typeof value === "string" ? "É uma string" : "Não é uma string";

  return text as Conditional<T>;
}

const result = conditional("Samuel"); // O retorno é "É uma string", pois estou passando de fato no argumento uma string
const result1 = conditional(20); // O result é "Não é uma string" por conta que o argumento era um number

// =================

class SelectMenu {}
class CheckBox {}
class Input {}
class Button {}

type ElementType = "input" | "button" | "selectmenu" | "checkbox";

// Utilizando tipagem condicional para verificar o tipo do Generic, de acordo com esse valor vai ser retornado a classe correspondente
type GetElement<T> = T extends "input"
  ? Input
  : T extends "button"
  ? Button
  : T extends "selectmenu"
  ? SelectMenu
  : T extends "checkbox"
  ? CheckBox
  : never;

interface Data<T extends ElementType> {
  type: T;
  execute(element: GetElement<T>): void;
}

function createData<T extends ElementType>(data: Data<T>) {}

// Quando a função é invocada o Typescript vai realizar as verificações para validar e inferir o tipo do Generic e assim retornado o dado corretamente
createData({
  type: "selectmenu",
  execute(element) {},
});

// ========================

type isString<T> = T extends string ? true : false;
type isNumber<T> = T extends number ? true : false;

interface StringOptions {
  upper(): void;
  lower(): void;
}

interface NumberOptions {
  pow(exp: number): number;
  sub(b: number): number;
  sum(b: number): number;
}

type ManipuleOptions<T> = isString<T> extends true
  ? StringOptions
  : isNumber<T> extends true
  ? NumberOptions
  : never;

function manipule<T>(value: T): ManipuleOptions<T> {
  return Object.create({});
}

manipule("Samuel").lower; // É verificado que o argumento é uma string, logo, vai ser feito validações sobre os tipos genéricos acima e inferir a estrutura correta, que é nesse caso é a interface StringOptions
manipule(20).pow; // Mesma ideia do exemplo acima, só que agora ele representa a interface NumberOptions, por conta das validações do Typescript
