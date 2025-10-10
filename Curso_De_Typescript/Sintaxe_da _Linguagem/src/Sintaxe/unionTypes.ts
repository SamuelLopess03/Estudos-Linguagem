// Representa uma junção de tipos, ou seja, nossa definição pode assumir qualquer tipagem daquela junção;

// O Símbolo "|" é a união, logo, o tipo Primitive pode ser uma string OU um number OU um boolean;
// Essa definição pode assumir qualquer tipagem referida na estrutura, mas uma vez utilizado um tipo não pode mais usar outro;
type Primitive = string | number | boolean;

export function main(value: Primitive) {
  // De inicio value pode ter qualquer método ou dado que seja comum entre as definições estruturadas em Primitive;
  // Typescript é um inteligente ao ponto de saber realizar essas verificações iniciais para não deixar ocorrer errors;

  if (typeof value === "string") {
    return;
  }

  if (typeof value === "number") {
    return;
  }

  // Nesse momento o value se apresenta como somente do tipo de boolean;
  // Isso acontece porque no Typescript temos o refinamento de tipos, onde ele valida os ifs anteriores que geram escopos especificos
  // para um determinado tipo (dado o typeof) e que os métodos executam return. Entõa no fim, se a função não terminou e chegamos
  // nessa linha significa que o dado value não era do tipo que if delimitava.
  value;
}

enum TrafficLightType {
  Red,
  Yellow,
  Green,
}

interface RedColor {
  type: TrafficLightType.Red;
  stop(): void;
}

interface YellowColor {
  type: TrafficLightType.Yellow;
  wait(): void;
}

interface GreenColor {
  type: TrafficLightType.Green;
  drive(): void;
}

type TrafficLight = RedColor | YellowColor | GreenColor;

// Dado que a constante pode ser qualquer uma das definições acima, de inicio quando verificamos o que ela possue vemos todos os dados e métodos
// Mas quando escolhemos uma informação que existe apenas em um dos tipos delimitados, então a constante passa a ser daquele tipo exclusivo;
// Nesse exemplo o dado que é comum é o campo type, mas com o passar da valoração ele define o tipo, quando passamos um valor de enum
// que está de acordo com um dos tipos acima, ele assume aquela definição exclusiva;
const trafficLight: TrafficLight = {
  type: TrafficLightType.Red,
  stop() {},
};

// Para definição de tipo com type alias podemos utilizar tipagem literal
type Status = "notFound" | 404 | "ok" | 200 | "forbiden" | 408; // Então Status pode assumir qualquer valor desses dados brutos

// Também existe a forma de definir tipos recursivos
type JSONValue =
  | string
  | number
  | boolean
  | JSONValue[]
  | {
      [key: string]: JSONValue;
    };

// Exemplo de Utilização
type FindItemPredicate = number | ((value: string, index: number) => boolean);

function findItem(array: string[], predicate: FindItemPredicate) {
  if (typeof predicate === "number") {
    return array[predicate];
  }

  return array.find(predicate); // Isso só é possível porque o método find precisa receber como parâmetro uma função de acordo com nossa definição
}

findItem(["rincko", "juliano", "cristiasno"], 1);
findItem(["rincko", "juliano", "cristiasno"], (value) => value.startsWith("c"));
