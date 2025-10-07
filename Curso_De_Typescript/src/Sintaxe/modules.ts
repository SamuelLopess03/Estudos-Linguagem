// É a mesma ideia de módulos do Javascript
// A diferença é que não interfere o tipo de importação utilizado na configuração, seja commonjs ou module, a exportação vai ser com export e importação com import

// Exemplos de Exportação
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const teste = "dev";

// Caso fossemos importar as funções e constante acima seria dessa forma em Typescript
// O módulo está como js (math.js) justamente porque já vai está pré-configurado para quando o código passar pelo build para Javascript
// import { add, subtract, teste } from "./math.js"

// ===================

// Quando realizar o build do projeto, a interface User vai sumir, pois em Javascript não existe interface ou type
interface User {
  name: string;
  age: number;
  createdAt: Date;
}

function createUser(name: string, age: number): User {
  return { name, age, createdAt: new Date() };
}

export { createUser, User };

// Para realizar a importação das informações acima é necessário para o User passar a descrição de type antes
// Dessa forma o Typescript consegue entender de fato o que é User e quando for feito o build teremos o tratamento correto para ele
// import { createUser, type User } from "./user.js"
