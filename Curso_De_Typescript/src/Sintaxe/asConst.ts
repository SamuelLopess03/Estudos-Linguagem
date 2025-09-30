// Significa que vai tornar o dado como uma estrutura imutável do tipo literal, ou seja, da forma como foi definido

const colors = ["vermelho", "azul", "verde", "amarelo"] as const; // Colors passa a ser uma tupla com readonly, ao invés de um string[]

colors.pop(); // Dá error, pois colors não é string[] e sim uma tupla readonly
colors.push();

const [red, blue, green, yellow] = colors; // Na destruturação, os valores são do tipo literal de acordo com o que foi definido de inicio

const [red1, blue1, green1, yellow1, other1] = colors; // Não pode ter mais valores do que foi definido em colors, pois o mesmo com o "as const" se tornou uma tupla

// ================

const directions = ["north", "south", "east", "west"] as const; // Se tornou readonly e uma tupla com campos do tipo literal

type Directions = (typeof directions)[number]; // Directions vai ser do tipo dos campos da tupla de directions

// ===================

function setStatus(status: "success" | "error" | "pending") {
  console.log(`Status: ${status}`);
}

let currentStatus = "success"; // Let faz com que a variável seja do tipo primitivo = string

let currentStatus1 = "success" as const; // Aqui a gente faz com que a variável seja do tipo literal, ou seja, tipo "success"

setStatus(currentStatus); // Está dando error porque currentStatus é do tipo string, então pode ser qualquer string que fuja dos literals definidos para o parâmetro da função
setStatus(currentStatus1);

// =================

// Sem o "as const", Action é um objeto que tem propriedades sendo todas do tipo string e mutáveis, ou seja, posso alterar em linhas posteriores
const Action = {
  create: 1,
  update: 2,
  delete: 3,
};

// Com o "as const", Action é um objeto que possui propriedades readonly e que são de tipo literal, ou seja, de acordo com a atribuição inicial
const Action1 = {
  create: 1,
  update: 2,
  delete: 3,
} as const;

// Basicamente posso definir outros tipos de acordo com o objeto do tipo literal definido por "as const", assim como também por meio de suas chaves
type ActionEnum = typeof Action1;
type Actions = keyof ActionEnum;

function manage(action: Actions | ActionEnum[Actions]) {}
