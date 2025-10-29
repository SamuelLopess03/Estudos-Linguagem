// Os type guards basicamente realizam a verificação de um tipo de dado em tempo de execução
// Isso é utilizado principalmente quando temos union type, onde uma variável pode ser definida inicialmente com tipos diferentes

function printValue(value: string | number) {
  // typeof é um type guard, pois ele permite verificar o tipo da variável, atuando como um refinador de tipos
  if (typeof value === "string") {
    console.log(value.toLocaleUpperCase()); // Dentro desse bloco a variável "value" é tratada somente como string
  } else {
    console.log(value.toFixed(2)); // Dentro desse bloco a variável "value" é tratada somente como number
  }
}

// =========================

class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  // Com classes não podemos utilizar o typeof para verificar o tipo da variável, para esse caso necessitamos do instanceof
  // typeof é somente para tipos primitivos
  if (animal instanceof Dog) {
    animal.bark(); // Dentro desse bloco de código a variável "animal" é operada como do tipo Dog

    return;
  }

  animal.meow(); // Como dentro do bloco do if tem a verificação para Dog e ele tem um return, então animal fora desse bloco é operada como sendo do(s) outro(s) tipo(s) definido(s) na função
}

// =================================

interface Fish {
  swin(): void;
}

interface Bird {
  fly(): void;
}

function move(animal: Fish | Bird) {
  // Quando temos interface o type guard possível é o "in", pois ele analisa se a interface possui aquele atributo ou método
  // Nesse caso estamos verificando para o método swin() da interface Fish
  // Devemos ter atenção nessa verificação, pois ela deve ser feita em um atributo ou método específico daquela interface
  if ("swin" in animal) {
    animal.swin();

    return;
  }

  animal.fly();
}

function main(value: string[] | Date) {
  // Utilizando o "in" para verificar um método no array de String para mostrar que não é utilizado somente em interface
  if ("push" in value) {
    value.map(() => {});
  }
}

// =====================================

interface Chef {
  cook(): void;
  certificate: string;
}

interface Teacher {
  teach(): void;
  diploma: string;
}

interface Driver {
  drive(): void;
  license: string;
}

type Professionals = Chef | Teacher | Driver;

// Um type guard definido por nós utilizando a palavra-chave "is", basicamente o retorno da função é um boolean que diz se a intância é do tipo Chef ou não
// Normalmente o retorno é uma validação emcima do parâmetro recebido ao qual faremos a verificação
function isChef(value: Professionals): value is Chef {
  // A palavra-chave "as" realiza um casting sobre aquele dado, ou seja, força ele a ser daquele tipo delimitado após o "as"
  return (value as Chef).cook !== undefined; // Verificamos se value possue o método cook
}

// Sempre essas verificações feitas para descobrir o tipo de algum dado por meio de um atributo ou método deve ser feito levando em conta uma informação específica daquele tipo;
function isTeacher(value: Professionals): value is Teacher {
  return (value as Teacher).teach !== undefined;
}

function isDriver(value: Professionals): value is Driver {
  return (value as Driver).drive !== undefined;
}

function execute(professional: Professionals) {
  if (isChef(professional)) {
    professional.cook(); // Agora dentro desse bloco "professional" é tratado como do tipo Chef

    return;
  }

  if (isDriver(professional)) {
    professional.drive(); // Agora dentro desse bloco "professional" é tratado como do tipo Driver

    return;
  }

  // professional é tratado como Teacher porque os blocos anteriores de verificação realizavam o retorno da função e por isso que se a execução chegou nessa linha significa que ele é do tipo Teacher.
  professional.teach();
}

// Outro Exemplo com a Palavra-Chave "is"

class Professionals1 {
  isChef1(): this is Chef1 {
    return this instanceof Chef1;
  }

  isTeacher1(): this is Teacher1 {
    return this instanceof Teacher1;
  }

  isDriver1(): this is Driver1 {
    return this instanceof Driver1;
  }
}

class Chef1 extends Professionals1 {
  public cook(): void {}
  public certificate: string = "Chefe Chico";
}

class Teacher1 extends Professionals1 {
  public teach(): void {}
  public diploma: string = "Eu sou Samuel";
}

class Driver1 extends Professionals1 {
  public drive(): void {}
  public license: string = "1234652787";
}

function execute1(professional: Professionals1) {
  switch (true) {
    case professional.isChef1(): {
      professional.cook();
      break;
    }
    case professional.isDriver1(): {
      professional.drive();
      break;
    }
    case professional.isTeacher1(): {
      professional.teach();
      break;
    }
    default:
      break;
  }
}

// =============

// O tipo "unknown" significa desconhecido, então pode representar qualquer coisa
function main1(value: unknown) {
  // O método isArray da Classe Array significa um type guard para arrays
  if (Array.isArray(value)) {
    value.push(1); // Dentro desse bloco value se comporta como um array
  }
}
