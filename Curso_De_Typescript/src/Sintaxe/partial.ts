// Ele é um tipo utilitário do Typescript que permite criar uma estrutura a partir de outra existente com todas as propriedades opcionais

// Deixando todos os campos opcionais manualmente
interface User {
  id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}

const user: User = {};

interface User1 {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Utilizando o Partial<> para deixar a estrutura com todas as propriedades como opcionais
type PartialUser = Partial<User1>; // PartialUser passa a ter a estrutura de User1, mas com todos os campos sendo opcionais

// ===================

interface Player {
  nick: string;
  health: number;
  shield: number;
  inventory: string[];
}

// Estou criando um novo tipo a partir de Player, onde o campo "nick" vai ser obrigatório e os demais opcionais
type CustomPlayer = Partial<Omit<Player, "nick">> & Pick<Player, "nick">;

const player: CustomPlayer = {
  nick: "Sam_",
};
