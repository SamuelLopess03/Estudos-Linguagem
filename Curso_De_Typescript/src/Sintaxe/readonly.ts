// Significa dizer que algum dado é imutável, ou seja, permite apenas leitura e não escrita

interface User {
  readonly id: string; // Utilização da palavra-chave readonly no atributo
  name: string;
  age: number;
}

const user: User = {
  id: "heqcbehq",
  name: "Samuel",
  age: 18,
};

user.id = "cwgevcg"; // Está dando porque definimos na interface que a propriedade id era readonly
user.name = "Cristiano";
user.age = 15;

// Tal error acima só ocorre com Typescript, ou seja, caso realizemos um build da aplicação ficando o código em js, a interface vai sumir e assim o id vai deixar de ser readonly
// Essa definição é mais rígida após o build, pois fica até mesmo no código js
Object.defineProperties(user, {
  id: {
    writable: false,
  },
});

// ===============

class Command {
  public readonly createdAt: Date; // Definindo a propriedade da classe como readonly também
  public name: string;

  constructor(name: string) {
    this.createdAt = new Date(); // Tal atribuição de valor (escrita) só é possível na primeria atribuição, pois é a criação do objeto da classe
    this.name = name;
  }

  public run() {
    this.name = "outro nome";
    this.createdAt = new Date(); // Aqui não é mais possível, pois ao utilizar essa função, o objeto já deve ter sido criado anteriormente
  }
}

const command = new Command("ping");
command.createdAt = new Date(); // Nem dentro e nem fora da classe pode-se utilizar a propriedade, por mais que ela seja pública

// ==================

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

// Readonly<T> signifca que o dado o Generic recebido, todas as propriedades do mesmo se tornarão readonly
function freeze<T extends object>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

const staticPlayer = freeze(player);

staticPlayer.health = 20; // Significa que não pode ser alterado, ou seja, não pode ter escrita novamente

/*
    O Readonly<T> só vai deixar as propriedades do objeto em si como readonly, isso significa dizer que
    caso o objeto que passemos como Generic para Readonly tenha objetos de objetos, ou seja, propriedades
    mais internas ainda, elas não ficarão como readonly também. Exemplo:

    interface User {
        name: string;
        endereco: {
            rua: string;
            bairro: string
        }
    }

    const staticUser = Readonly<User>

    staticUser é igual a {
        readonly name: string;
        readonly endereco: {
            rua: string; // Essas propriedades mais internas não foram definidas como readonly
            bairro: string;
        }
    }
*/
