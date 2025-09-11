// Overload é basicamente a sobrecarga de métodos, ou seja, criar diversos métodos com mesmo nome, mas com parâmetros e retornos distintos

/**
 * Criar uma nova data a partir de outra
 */
function createDate(value: Date): Date;
/**
 * Criar uma nova data usando uma data numérica
 */
function createDate(value: number): Date;
/**
 * Criar uma nova data usando uma data por extenso
 */
function createDate(value: string): Date;
function createDate(value: Date | number | string): Date {
  return new Date(value);
}
// Basicamente, acima temos as declarações da função createDate que podemos utilizar e abaixo a implementação de fato
// Acima de cada declaração temos um comentário sobre a função createDate que pode ser visualizado na invocação

// ========================

interface Component {
  id: string;
  label: string;
}

// Uma interface pode extender de outra interface, no sentido de herança mesmo, mas não pode implementar
interface Button extends Component {
  style: string;
}

interface SelectMenu extends Component {
  options: string[];
}

enum InputType {
  String,
  Number,
  Date,
  Email,
  Password,
}

interface Input extends Component {
  type: InputType;
}

function buildComponent(id: string, label: string, style: string): Button;
function buildComponent(
  id: string,
  label: string,
  options: string[]
): SelectMenu;
function buildComponent(id: string, label: string, type: InputType): Input;
function buildComponent(
  id: string,
  label: string,
  arg: string | string[] | InputType
) {
  // Refinador de Tipos
  if (typeof arg === "string") {
    return { id, label, style: arg };
  }

  if (Array.isArray(arg)) {
    return { id, label, options: arg };
  }

  return { id, label, type: arg };
}

const button = buildComponent("mybutton", "Clique aqui", "green"); // type Button
const select = buildComponent("myselectmenu", "Selecione o usuário", [
  "Samuel",
  "Leandro",
]); // type SelectMenu
const input = buildComponent("myinput", "Seu email", InputType.Email); // type Input

// ========================

interface Triangle {
  sideA: number;
  sideB: number;
  sideC: number;
}

interface Equilateral extends Triangle {
  type: "equilateral";
}

interface Isosceles extends Triangle {
  type: "isosceles";
}

interface Scalene extends Triangle {
  type: "scanele";
}

type Triangles = Equilateral | Isosceles | Scalene;

function triangle(sides: number): Equilateral;
function triangle(sideA: number, sideBC: number): Isosceles;
function triangle(sideA: number, sideB: number, sideC: number): Scalene;
function triangle(A: number, B?: number, C?: number) {
  // O símbolo de opcional é obrigatorio porque a depender do método invocado podemos ter somente 1, 2 ou 3 parâmetros por conta da sobrecarga

  if (B && C) {
    return {
      type: "scanele",
      sideA: A,
      sideB: B,
      sideC: C,
    };
  }

  if (B && !C) {
    return {
      type: "isosceles",
      sideA: A,
      sideB: B,
      sideC: B,
    };
  }

  return {
    type: "equilateral",
    sideA: A,
    sideB: A,
    sideC: A,
  };
}

const triangle1 = triangle(10); // type Equilateral
const triangle2 = triangle(10, 2); // type Isosceles
const triangle3 = triangle(10, 2, 5); // type Scalene

// =======================

class Player {
  public name: string;
  public nickname: string;
  public health: number;

  // Sobrecarga também pode ser feita sobre o construtor de uma classe
  constructor(name: string, nickname: string);
  constructor(name: string, health: number);
  constructor(name: string, arg: string | number) {
    this.name = name;

    if (typeof arg === "string") {
      this.nickname = arg;
      this.health = 20;
    } else {
      this.health = arg;
      this.nickname = name;
    }
  }
}

// Existe mais de uma forma de instância um objeto de uma classe que possui sobrecarga no construtor
const samuel = new Player("Samuel", "S_Lopes10");
const alessandro = new Player("Alessandro", 20);

// Assim como o overload pode ser utilizado em funções, também pode ser adicionado à métodos normais ou estáticos de classe
