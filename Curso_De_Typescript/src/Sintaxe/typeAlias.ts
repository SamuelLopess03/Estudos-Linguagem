// O type alias define qualquer estrutura de tipagem, não apenas objeto igual interface, então ele é mais abrangente

// O símbolo "|" representa o "OU", logo, o tipo Input pode ser uma string ou um number ou um array de strings
type Input = string | number | string[]; // Então ele pode ser qualquer um desses tipos

function prompt(input: Input) {}

prompt("quheui");
prompt(10);
prompt(["123", "abc"]);
prompt(true); // Exemplo de tipo que o Input não definiu

interface Dog {
  name: string;
  breed: string;
  bark(): string;
}

interface Cat {
  name: string;
  color: string;
  meow(): string;
}

interface Bird {
  name: string;
  wingspan: number;
  chirp(): string;
}

// Podemos utilizar interfaces definidas para representar um certo tipo ou união de tipos
type Animal =
  | Dog
  | Cat
  | Bird
  | {
      // Exemplo de um objeto criado de modo literal sem definir interface, o ruim que não temos a abstração do que seria esse dado corretamente igual os demais
      name: string;
      weight: number;
      moo(): string;
    }
  | string;

// interface UserWallet {
//   coins?: number;
//   credits?: number;
// }

// interface User {
//   name: string;
//   createdAt: Date;
//   wallet?: UserWallet;
// }

// Fazendo os tipos de dados com type ao invés de interface
type UserWallet = {
  coins?: number;
  credits?: number;
};

type User = {
  name: string;
  createdAt: Date;
  wallet?: UserWallet;
};
