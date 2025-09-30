// Ele é um tipo utilitário do próprio Typescript
// Basicamente, com ele conseguimos filtrar um outro tipo para criar um novo tipo a partir das propriedades refinadas

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

type BasicUserInfo = Pick<User, "id" | "name">; // Aqui nós passamos o tipo base (User) e escolhemos as propriedades do mesmo no segundo espaço de Generic

const user: BasicUserInfo = {
  id: "cjkcbeq",
  name: "teste",
};

// ================

type DateProps = "getHours" | "getMinutes" | "getDay";
type DateTime = Pick<Date, DateProps>; // DateTime representa apenas os métodos que queremos de acordo com a tipagem de DateProps

// ===================

interface Player {
  nick: string;
  health: number;
  shield: number;
  inventory: string[];
}

const player: Player = {
  nick: "Sam_",
  health: 30,
  shield: 20,
  inventory: ["potion", "wand"],
};

function execute<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return Object.create({});
}

const newPlayer = execute(player, ["health", "inventory"]); // Estou definindo newPlayer de acordo com a Interface Player e filtrando pelo tipo utilitário Pick

newPlayer.health;
newPlayer.inventory;
newPlayer.shield; // Ele não tem essa propriedade, pois não foi filtrado pelo Pick
