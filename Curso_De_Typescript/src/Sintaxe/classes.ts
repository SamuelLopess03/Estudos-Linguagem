// Mesma ideia das classes do Javascript, o que muda é que agora tudo deve ser tipado dentro dela

export class Player {
  private static players: Player[] = []; // Atributo estático, ou seja, é visível a nível de classe e não de instância
  // public name: string; // Para inicializar o construtor devemos ter o atributo criado e definido antes | Por padrão o atributo é público
  private name: string;
  private health: number; // Modificador de acesso que não permite tal atributo ser acessado fora dessa classe

  constructor(name: string) {
    this.name = name;
    this.health = 20;
    Player.players.push(this);
  }

  public static getPlayers() {
    return Player.players;
  }

  public getName() {
    return this.name;
  }

  public getHealth() {
    // Método criado com acesso público fora da classe
    return this.health;
  }

  // Podemos utilizar nos nossos métodos a definição da própria classe, como no exemplo utilizando Player em damage()
  public damage(amount: number, damager?: Player) {
    const updatedHealth = this.health - amount;

    console.log(
      damager
        ? `${damager.getName()} deu ${amount} de dano em ${this.name}`
        : `${this.name} tomou ${amount} de dano`
    );

    if (updatedHealth < 0) {
      this.health = 0;
      this.die();
      return;
    }

    this.health = updatedHealth;
  }

  // Método com acesso privado apenas de modo interno na classe
  private die(damager?: Player) {
    if (damager) {
      console.log(this.name, "foi morto(a) por", damager.getName());
      return;
    }

    console.log(this.name, " morreu!");
  }
}

const player = new Player("Samuel");
const player2 = new Player("Rincko");

player.damage(10, player2);

// ===================================================

class Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  makeSound(): void {
    console.log(`${this.name} está fazendo um som`);
  }
}

// "extends" representa o sentido de herança no Typescript
class Dog extends Animal {
  breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age); // Representa a chamada do construtor da superclasse, ou seja, Animal
    this.breed = breed;
  }

  // Representa a sobrescrita do método da superclasse
  makeSound(): void {
    console.log(`${this.name} está latindo`);
  }
}

const dog = new Dog("Bob", 3, "Golden Retriever");
dog.makeSound();

// =====================================

interface Drivable {
  startEngine(): void;
  drive(): void;
}

// "implements" representa o sentido da classe está implementando os atributos e métodos da interface acima
// É quase como se estivessemos colocando tipagem sobre essa classe
class Car implements Drivable {
  startEngine(): void {
    console.log("Motor Ligado");
  }
  drive(): void {
    console.log("Carro Está Sendo Dirigido");
  }

  // Posso criar novos métodos desde que tenhamos os definidos pela interface
  ride(): void {}
}

// ===================================

// Significa que a classe não pode ser instanciada, normalmente utilizada como superclasse
abstract class Shape {
  // Método abstrato somente precisa de definição e não de implementação
  abstract area(): number;

  // Dentro de uma classe abstrata também podemos ter métodos não abstratos com implementação
  describe(): void {
    console.log("Isso é uma forma");
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  // Também podemos sobrescrever o método não abstrato da classe abstrata que herdamos
  describe(): void {
    console.log("Isso é um círculo");
  }
}

const circle = new Circle(5);
circle.area();
circle.describe();

// =================================

class Person {
  protected age: number; // Modificador de acesso que permite utilização em subclasses, mas no restante é privado

  constructor(age: number) {
    this.age = age;
  }

  // Método com modificador de acesso protegido tem a mesma ideia que o atributo, só pode ser acessado pela própria classe ou subclasse
  protected getAge(): number {
    return this.age;
  }
}

class Employee extends Person {
  private name: string;

  constructor(name: string, age: number) {
    super(age);
    this.name = name;
  }

  public introduce(): void {
    // Método getAge() é protegido e herdado da classe Person, logo, é possível acessá-lo
    console.log(`Eu sou ${this.name} e tenho ${this.getAge()} anos de idade`);
  }
}
