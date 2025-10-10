// O declare serve para informar ou declarar que um certo dado ou tipo de dado existe ao longo do projeto, mas ele não possui a funcionalidade ou implementação de algo, como por exemplo uma função

// Estamos definindo que tais dados vão existir de maneira global
// Dessa forma, qualquer outro módulo ou arquivo pode acessar tais dados sem precisar importar algo
declare global {
  const teste: string;
}

// Com essa implementação do dado não teremos mais error quando executarmos o código, pois teremos a implementação de fato da constante
Object.assign(globalThis, {
  teste: "Dev",
});

console.log(teste); // A nível de codificação não dá error, mas quando executamos encontramos um error, pois não temos o valor concreto de teste

// ==================

interface UserData {
  id: number;
  name: string;
  age: number;
}

class User {
  declare id: number; // Basicamente o declare padrão vai informar que aquele algo existe, nesse caso, que a classe User possui o atributo "id"
  declare name: string;
  declare age: number;

  constructor(data: UserData) {
    Object.assign(this, data);
  }
}

const user = new User({ id: 1, name: "Teste", age: 30 });
user.age; // Possui todos os atributos para serem acessados aqui normalmente

// =================

// Adicionando propriedades a interface ProcessEnv que possui informações do .env, meio que extende a interface original acrescentando mais atributos e/ou métodos
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
    }
  }
}

console.log(process.env.PORT);

/*
    Por fim, existe também os arquivos que possuem estrutura: nome_arquivo.d.ts
    Tais arquivos são definidos e construídos para dar a tipagem sobre um projeto que vai passar pelo processo
    de build e assim vai perder todos as suas tipagens, por conta que o código transpilado fica no formato de
    Javascript. Logo, tal arquivo serve para armazenar a tipagem sobre as estruturas que um outro arquivo contém,
    assim quem for utilizar esse projeto vai conseguir saber e importar elas com sua tipagem correta.
*/
