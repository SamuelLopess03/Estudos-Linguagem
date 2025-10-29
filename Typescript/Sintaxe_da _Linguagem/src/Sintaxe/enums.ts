// Representa um conjunto de valores nomeados

// Definição padrão de Enum com numeração inicial de 0 em diante
// enum Direction {
//   North,
//   South,
//   East,
//   West,
// }

enum Direction {
  North = 1,
  South,
  East,
  West,
}

const pos = {
  x: 200,
  y: 150,
  direction: Direction.North,
};

// Os enums se destacam bastante quando precisamos definir algum dado padrão e/ou constante ao longo do código
// Pois quando quisermos alterar a definição ou o valor desse dado é necessário apenas mexer no Enum
enum ClothingSize {
  ExtraSmall = "Bem pequeno",
  Small = "Pequeno",
  Medium = "Médio",
  Large = "Grande",
  ExtraLarge = "Muito grande",
}

const cloth = {
  color: "green",
  size: ClothingSize.Large,
};

// Nos enums também podemos definir valores distintos para os dados quando necessário, não precisam decorar
// certos dados quando forem precisos podendo apenas abstraí-lo no enum
enum ButtonStyle {
  Blue = 45,
  Red = 0,
  Gray = "1",
}

interface Button {
  label: string;
  emoji: string;
  style: ButtonStyle;
}

const button: Button = {
  label: "Clique aqui",
  emoji: "",
  style: ButtonStyle.Red,
};
