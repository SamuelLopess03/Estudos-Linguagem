// Basicamente, a gente usa esse conceito de interface no typescript para realizar uma tipagem mais complexa sobre algo.
/*
 Utilizando JS não temos nenhum alerta de error quando passamos um valor de tipo diferente daquele que era esperado,
 assim como para estrutura mais complexas, como parâmetros de funções. Logo, com typescript conseguimos utilizar
 esse conceito para ter mais claro quais tipos de dados receber e também se tiver um tipo de dado diferente do esperado
 o próprio compilador do typescript vai alertar o error em tempo real, tendo em vista que o JS só apresenta o error após
 executar a aplicação.
*/

import { sayHello } from "console";

interface UserWallet {
  // A interface representa um contrato, devemos utilizar tal objeto respeitando a estrutura e tipagem sobre seus dados
  coins?: number;
  credits?: number;
}

interface User {
  // Sintaxe para representar uma interface, normalmente no formato Pascal Case
  name: string;
  createdAt: Date;
  wallet?: UserWallet; // O simbolo "?" representa que tal dado é opcional, ou seja, pode ser undefined
}

interface User {
  // Representa um acréscimo a Interface anterior de User, pois tem o mesmo nome
  talk(): void;
}

function createUser(name: string): User {
  return {
    name,
    createdAt: new Date(),
    talk: () => {
      console.log("Eu sou ", name);
    },
  };
}

function updateWallet(user: User, wallet: UserWallet) {
  user.wallet = { ...user.wallet, ...wallet };
}

const samuel = createUser("Samuel");

// O melhor do typescript é que ele não permite modificar a ordem dos parâmetros, por conta das tipagens e organização
// Além de tudo fica mais visível para alguém que está utilizando a função ou o dado criado.
updateWallet(samuel, { coins: 10 });

/* Exemplo Extra - Utilização de uma Outra Interface com o Nome de Outra para Expandir os dados e/ou funções */

declare global {
  interface Console {
    sayHello(): void;
  }
}

Object.assign(console, {
  sayHello() {
    console.log("Hello");
  },
});

console.sayHello(); // Tal método foi desenvolvido por nós para expandir os dados/métodos do Console

/* Voltando para o Contexto do Conteúdo */

interface Admin extends User {
  ban(user: User): void;
  kick(user: User): void;
}

function promoteUser(user: User): Admin {
  return {
    ...user,
    ban(userToBan) {
      console.log(userToBan, "foi banido por", this.name);
    },
    kick(userToKick) {
      console.log(userToKick, "foi expulso por", this.name);
    },
  };
}

const adminSamuel = promoteUser(samuel);

function adminAction(admin: Admin) {}

adminAction(samuel); // Isso representa que não posso passar um objeto que não é do tipo que foi declarado na função
adminAction(adminSamuel);
