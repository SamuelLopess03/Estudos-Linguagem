// Os tipos genéricos basicamente possibilitam o uso de tipos dinâmicos sobre funções, classes e interfaces, mas sem perder a segurança da tipagem dos dados
// Eles permitem deixar essas estruturas mais flexíveis e reutilizáveis

// Essa tipagem com parênteses antes do [] permite definir que o array pode ser do tipo string ou number
function getFirstElement(arr: (string | number)[]) {
  return arr[0];
}

const names = ["A", "B", "C"];

const myName = getFirstElement(names);

const numbers = [1, 2, 3, 4, 5];

const myNumber = getFirstElement(numbers);

const booleans = [true, false, true];

const myBoolean = getFirstElement(booleans); // Isso não é possível, pois o argumento da função só pode ser um array de strings ou um array de numbers

// ======== Utilizando Generics ==========

// Ao utilizar Generics, podemos operar com qualquer tipo de dado, pois o mesmo vai realizar uma inferência de tipo sobre o parâmetro da invocação
// Quando utilizamos "<>" estamos delimitando a utilização do Generic, no meio colocamos algo para representar o tipo genérico e assim podermos utilizar ao longo dos argumentos e corpo da função
function getFirstElement1<T>(arr: T[]) {
  return arr[0];
}

// Para poder utilizar o tipo genérico, é necessário sempre passar os sinais "<>" e algo que represente o mesmo dentro deles
//function getFirstElement2(arr: T[]) {
//  return arr[0];
//}

// Então isso permite deixar o método mais flexível, mas sem perder a segurança na validação dos tipos
const names1 = ["A", "B", "C"];

const myName1 = getFirstElement1(names);

const numbers1 = [1, 2, 3, 4, 5];

const myNumber1 = getFirstElement1(numbers);

const booleans1 = [true, false, true];

const myBoolean1 = getFirstElement1(booleans);

// ====================

// Isso quer dizer que podemos utilizar mais de um tipo genérico dentro de uma função, basta apenas utilizarmos vírgulas para separá-los
function isEqual<T, U>(a: T, b: U): boolean {
  return a === b;
}

isEqual(10, 20);
isEqual(10, "Teste");

// ======== Utilizando Interfaces ==============

// Com interface posso passar Generics também, que no caso é após o nome da mesma
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

interface User {
  id: string;
  name: string;
  role: string;
}

function fetchUser(): ApiResponse<User> {
  return {
    success: true,
    error: "",
    data: { id: "123", name: "Samuel", role: "" },
  };
}

interface Book {
  id: string;
  title: string;
}

function fetchBook(): ApiResponse<Book> {
  return {
    success: true,
    data: { id: "1342", title: "sacvhgqsvcghq" },
  };
}

// ========= Utilizando Classes ==============

// Exemplo de utilização de Generic na definição de um Array interno do typescript
const arr: Array<string> = [];

// Definimos o Generic na classe assim como na interface, após o nome dela
class MyCustomArray<T> {
  private items: T[] = [];

  public add(item: T) {
    this.items.unshift(item);
  }

  public remove(): T | undefined {
    return this.items.shift();
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const myCustomStringArr = new MyCustomArray<string>();
myCustomStringArr.add("Samuel");
const removed = myCustomStringArr.remove(); // Removed é igual a String ou Undefined

const myCustomNumberArr = new MyCustomArray<number>();
myCustomNumberArr.add(20);
const removed1 = myCustomNumberArr.remove(); // Removed é igual a Number ou Undefined

const myCustomNumberArr1 = new MyCustomArray<number>();
myCustomNumberArr1.add(true); // Não posso passar um dado de tipo diferente daquele que foi definido e permitido na classe
const removed2 = myCustomNumberArr1.remove(); // Removed é igual a Number ou Undefined

interface Player {
  name: string;
  health: number;
  shield: number;
  isDead: boolean;
}

const myCustomPlayerArr = new MyCustomArray<Player>();
myCustomPlayerArr.add({ name: "Samuel", health: 20, shield: 5, isDead: false });
const removedPlayer = myCustomPlayerArr.remove(); // RemovedPlayer é igual a Interface Player ou Undefined
removedPlayer?.name; // Posso acessar as propriedades do Player

// ==============================

// Basicamente o extends significa também herança, utilizamos ele nesse contexto para restringir o Generic
// Isso significa que o tipo que vai substituir o Generic quando invocado precisa possuir essa propriedade por conta do extends
function logLength<T extends { length: number }>(item: T) {
  console.log(item.length);
}

const numbers2 = [1, 2, 3];
const myObj = { length: 20 };
const myName2 = "Samuel";

// Isso é possível porque os tipos anteriores possuem a propriedade length
logLength(numbers2);
logLength(myObj);
logLength(myName2);

const my = new Set<number>();
logLength(my); // Esse error está acontecendo porque o tipo Set não possui a propriedade length, mas sim size

// ======= Outro Exemplo ========

interface HasName {
  name: string;
  isProgrammer: boolean;
}

// Estamos restrigindo o Generic T para extender e possuir as propriedades da interface HasName
function greet<T extends HasName>(obj: T) {
  console.log(`Olá, ${obj.name}`);
}

const player = {
  nick: "Samuel",
};

const user = {
  name: "Samuel",
  isProgrammer: true,
  age: 20,
};

greet(player); // O error está ocorrendo porque o objeto player não possui as propriedades name e isProgrammer
greet(user);

// ======= Outro Exemplo ========

// Podemos também utilizar tipos primitivos para restringir o Generic

function combine<T extends number | string>(a: T, b: T): string {
  return `${a}${b}`;
}

combine(10, 22);
combine("Teste", "Dev");
combine(10, "Teste10"); // Não posso passar os dois, pois temos apenas um Generic, e quando inferido inicialmente que era number não pode mais passar string
combine(true, false);

// ========== Último Exemplo com Classes ==========

class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  meow() {
    console.log("Meow!");
  }
}

// O parâmetro Class significa que está recebendo um construtor de uma Classe
function createInstance<T extends Animal>(
  Class: new (name: string) => T,
  name: string
) {
  return new Class(name);
}

const dog = createInstance(Dog, "Samuel"); // A variável dog é do tipo Dog, pois extende Animal, dado a restrição sobre o Generic
const other = createInstance(Date, "Samuel"); // Está dando error porque Date não extende de Animal, por conta da restrição
