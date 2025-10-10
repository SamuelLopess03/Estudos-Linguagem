// A estrutura typeof permite verificar um tipo de uma variável

let username = "Samuel";

let nickname: typeof username = "Cristiano";
// let nickname: String = "Cristiano"; Isso quer dizer a mesma coisa da linha de cima

const username1 = "Samuel"; // Quando utilizamos constante e não definimos o tipo do dado, a inferência que temos é do tipo literal

let nickname1: typeof username1 = "Cristiano"; // O error ocorre porque nickname1 é do tipo username1 que é o literal "Samuel"

let nickname2: typeof username1 = "Samuel";

// ======== Outro Exemplo ==========

const person = {
  name: "Samuel",
  age: 22,
};

type Person = typeof person; // Posso utilizar o typeof juntamente com o type alias

function createPerson(newPerson: Person) {}

createPerson({
  name: "Cristiano",
  age: 25,
});

// ======== Outro Exemplo =========

// Com isso eu consigo utilizar estruturas externas que desenvolvi e utilizar o tipo dessa estrutura para processar minhas variáveis se necessário
import config from "../config.json";

// Ou seja, posso tipar essa informação conforme quiser se eu tiver a estrutura requerida para o processamento
type Colors = typeof config.colors;

function createColors(schema: Colors) {}

createColors({
  danger: "#ff3d3d",
  primary: "#3b82f6",
  success: "#22c55e",
});
