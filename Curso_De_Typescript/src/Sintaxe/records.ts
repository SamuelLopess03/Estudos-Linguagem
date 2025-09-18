// Records representa um tipo de dado utilitário no typescript para trabalhar com dados em formato chave/valor aplicando Generics

// Isso representa que Settings só pode possuir dados de chave/valor como string
type Settings = Record<string, string>;

const settings: Settings = {
  name: "Samuel",
  type: "module",
  version: 1.0, // Está dando error porque o Record só pode possuir string na chave/valor
};

// Uma das desvantagens é que não posso ver os atributos que a constante settings possui (É como se o Record abstraísse as informações)
// O famoso autocomplete que o próprio Typescript possui
settings.name;

type Offsets = Record<number, string>;

const offSets: Offsets = {
  0.2: "abc",
  "0.4": "123", // Eu posso até receber o number na chave entre aspas duplas, mas necessita ser um number de fato
  ab3: "try", // Exemplo de error com aspas duplas sem ser number na chave
};

// ======= Exemplo com Interface ========

// Utilizando recursividade entre tipos aqui com Record
interface Route {
  path: string;
  children?: Routes;
}

// Recorde routes possui chave (string) / valor (interface Route)
type Routes = Record<string, Route>;

const routes: Routes = {
  home: {
    path: "/home",
    children: {
      auth: {
        path: "/auth",
      },
    },
  },
};

// ===== Outro Exemplo =======

// É como se eu estivesse dizendo que Feature só pode assumir os valores desses tipos no Union Type, mas esses tipos só assumem um valor possível, que é a sua própria descrição
// Logo, é como se eu estivesse criando uma constante que só pode assumir aqueles valores
type Feature = "compileOnSave" | "autoSave" | "autoUpdate";

// Com isso eu faço a limitação das chaves possíveis, além de deixá-las visíveis para quem for utilizar
type Features = Record<Feature, boolean>;

const config: Features = {
  autoSave: true,
  autoUpdate: false,
  compileOnSave: true,
};

// Agora eu possuo o autocomplete do Typescript sobre as chaves da constante config que é um Record
config.autoSave;

// Necessito passar todas as chaves que foram definidas e delimitadas no type Feature
const config1: Features = {
  autoSave: true,
  autoUpdate: false,
};

const config1: Features = {
  autoSave: true,
  autoUpdate: false,
  compileOnSave: true,
  teste: false, // Não posso passar mais chaves do que aquelas delimitadas no type Feature
};
