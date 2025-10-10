// Tipagem recursiva tem a mesma ideia de Funções recursivas, é uma tipagem que possui a si próprio ou que retorna a si próprio em uma definição

type JSONValue = string | number | boolean;

const json: JSONValue = "Samuel";
const json1: JSONValue = ["Samuel"]; // Não permiti, pois JSONValue não pode ser array

type JSONValue1 = string | number | boolean | JSONValue1[];

// Agora é possível porque JSONValue1 pode ser uma string, number, boolean ou array de JSONValue1 { ou seja, string[], number[], boolean[], (JSONValue1[])[]}
const json2: JSONValue1 = ["Samuel"];
const json3: JSONValue1 = {}; // JSONValue1 não pode ser um objeto

type JSONValue2 =
  | string
  | number
  | boolean
  | JSONValue1[]
  | {
      [key: string]: JSONValue2;
    };

const json4: JSONValue2 = {
  name: "Samuel",
  health: 35,
  skills: [],
  scripts: {
    typescript: true,
  },
};

// ==================

type PackageJson = typeof import("../../package.json");

// Basicamente, essa tipagem serve para deixar todos os campos de um objeto opcionais, mesmo que ele tenha objetos internos, ou seja, objeto de objetos
type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends object ? NestedPartial<T[K]> : T[K];
};

// Para deixar todos os campos como obrigatórios basta colocar o símbolo de subtração "-" antes do "?"
type NestedRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? NestedPartial<T[K]> : T[K];
};

// Para deixar todos os campos como somente leitura (readonly) basta apenas colocar a palavra-chave "readonly" antes de tudo
type NestedReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? NestedPartial<T[K]> : T[K];
};

type PartialPackageJson = NestedPartial<PackageJson>;
type RequiredPackageJson = NestedRequired<PackageJson>;
type ReadonlyPackageJson = NestedReadonly<PackageJson>;

// Por padrão o objeto scripts de PackageJson precisa ter todos os campos valorados, mas com filtragem ocorrida pelo NestedPartial, todos eles ficaram opcionais
const pkg: PartialPackageJson = {
  scripts: {},
};

// ===================

const names = "Rincko,Juliano,Cristiano,Ana,Nicole";

const arrNames = names.split(",");

// Com isso estamos pegando os nomes que tem na constante names e atribuito como tipo para Names com union type
// Basicamente, o extends vai verificar se o Generic T possui a estrutura que está na template literal e assim vai definindo o novo tipo chamando Split de forma recursiva e acrescentando o novo tipo por causa do union type
type Split<S extends string, T> = T extends `${infer Splited}${S}${infer Rest}`
  ? Splited | Split<S, Rest>
  : never;

type Names = Split<",", typeof names>;

// ================

// Ele verifica a string e vai extrair as partes que aparecem depois de ":" igual os parâmetros em uma URL (Ex.: Express) e unir esses retornos com union type
type GetParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | GetParams<Rest>
    : T extends `${string}:${infer Param}`
    ? Param
    : never;

type Params = GetParams<"/users/:userId/post/:postId">; // Params é do tipo userId ou postId
