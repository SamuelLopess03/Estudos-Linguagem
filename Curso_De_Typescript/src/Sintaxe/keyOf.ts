// Keyof basicamente permite extrair as chaves de um objeto ou de alguma estrutura que as possua

interface Person {
  name: string;
  age: number;
  email: string;
}

type PersonKeys = keyof Person;

function modifyProp(prop: PersonKeys) {}

// No momento da invocação vai ser mostrado com o autocomplete as keys da interface Person
modifyProp("email");

// ================

// Posso utilizar o keyof de maneira inteligente dentro de Generics, para pegar as chaves de um objeto passado no argumento da função
// Tal comportamento é possível por conta da restrição de tipo sobre o Generic K utilizando o extends
function getProperty<T, K extends keyof T>(obj: T, key: K) {}

const person = {
  name: "Samuel",
  age: 18,
};

const player = {
  nick: "Sam_",
  health: 20,
};

const book = {
  title: "Código Limpo",
  author: "Robert",
};

// Logo, a invocação da função se torna adaptativa e flexível, de acordo com o primeiro argumento passado
getProperty(person, "name");
getProperty(player, "health");
getProperty(book, "author");

// =======================

import config from "../config.json";

// Estou pegando as chaves do tipo retornado pelo config.colors que é um objeto com cores
type ColorKey = keyof typeof config.colors;

function coloredLog(color: ColorKey, text: string) {
  // Esse acesso no config.colors[color] só é possível porque o color possui exatamente as chaves de config.colors
  // Se o parâmetro color fosse apenas uma string, tal acesso não seria possível, pois o Typescript barraria pela possibilidade de ele poder assumir qualquer valor distinto das chaves de config.colors
  console.log(config.colors[color], text);
}

coloredLog("success", "Hello");
