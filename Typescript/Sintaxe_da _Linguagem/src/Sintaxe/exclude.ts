// É um tipo utilitário do Typescript que serve para excluir um tipo de uma união de tipos para criar um novo

type Primitive = string | number | boolean;

type Value = Exclude<Primitive, boolean>; // Value agora só pode ser do tipo string ou number

type Value2 = Exclude<Primitive, boolean | string>; // Também posso excluir mais de um tipo por meio da junção dos tipos por Union Type

// =====================

enum Colors {
  Red = "#FF0000",
  Orange = "#FFA500",

  Blue = "#0000FF",
  Green = "#008000",
}

// Utilizando o Exclude em um cenário possível, onde podemos filtrar um novo tipo para utilizar ao longo do código
type WarmColors = Exclude<Colors, Colors.Blue | Colors.Green>;
type CooldColors = Exclude<Colors, WarmColors>;

interface Message<T> {
  type: T;
  content: string;
  color: T extends "warm" ? WarmColors : CooldColors;
}

function createMessage<T extends "warm" | "coold">(options: Message<T>) {}

createMessage({
  type: "coold",
  content: "teste",
  color: Colors.Green,
});

createMessage({
  type: "coold",
  content: "teste",
  color: Colors.Orange, // Está dando error porque no argumento da função passamos o campo type como coold e de acordo com o Generic da interface, ele deve ser do tipo CooldColors
});
