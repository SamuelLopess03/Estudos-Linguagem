// O Infer é utilizado para tirar o tipo de um dado a partir de outro, ele faz uma inferência para dar a tipagem de algo
// Normalmente muito aproveitado em tipagens condicionais, segue os exemplos abaixo

type ArrayType<Arr> = Arr extends string[] // Dessa forma vai ficando inviável ter que garantir todos os casos de tipo para uma situação específica de tipagem
  ? string
  : Arr extends number[]
  ? number
  : Arr extends (string | number)[]
  ? string | number
  : never;

type ArrayType1<Arr> = Arr extends Array<infer U> ? U : never; // Para resolver a situação acima basta utilizar a palavra-chave "infer"

const names = ["Cristiano", "Messi", "Neymar"];
const numbers = [7, 10, 11];
const myarr1 = [...names, ...numbers];
const myarr = ["Samuel", true, 29, null, -20, false, "Teste"];

type MyType = ArrayType<typeof myarr>; // MyType se tornou never porque myarr é um array de string, number, boolean ou null "(string | number | boolean | null)[]"

type MyType1 = ArrayType1<typeof myarr>; // Utilizando o ArrayType1<Arr> que possui o "infer" temos que MyType1 vai ser de acordo com o Generic, que nesse caso é o myarr

// =====================

function customLog(color: "red" | "green", content: string) {}
function myFetch(url: string, options: RequestInit) {}
function createUser(name: string, age: number, isProgrammer: boolean) {}
function pow(value: number) {}

// Basicamente, aqui ele está verificando se o Generic que GetSecondParam recebe é uma função que recebe dois parâmetros e retorna qualquer coisa;
// Se ele for de acordo com essa validação, o "infer" vai pegar o tipo do segundo parâmetro e colocar em "Param" e no fim vai realizar a tipagem segundo esse tipo resgatado
type GetSecondParam<F> = F extends (p1: any, p2: infer Param) => any
  ? Param
  : never;

type FuncParam = GetSecondParam<typeof customLog>; // FuncParam é do tipo string, pois o segundo parâmetro de customLog é do tipo string também
type FuncParam1 = GetSecondParam<typeof myFetch>; // FuncParam1 é do tipo RequestInit, indo de acordo com a primeria abordagem acima
type FuncParam2 = GetSecondParam<typeof createUser>; // FuncParam2 é never, pois a função createUser tem mais de 2 parâmetros e aí cai no caso da condicional de ser never
type FuncParam3 = GetSecondParam<typeof pow>; // FuncParam3 é unknown, porque a função pow possui menos parâmetros do que o necessário e por isso nem chega a pegar o segundo parâmetro, nesse caso

// Para resolver o problema acima, basta apenas colocar um rest operator após o segundo parâmetro, pois assim ele vai poder receber vários argumentos
type GetSecondParam1<F> = F extends (
  p1: any,
  p2: infer Param,
  ...args: any[]
) => any
  ? Param
  : never;

// Aqui vamos pegar todos os tipos de todos os parâmetros de uma função, caso não seja função ele vai ser never
type GetParameters<F> = F extends (...args: infer Args) => any ? Args : never;

type FuncParams = GetParameters<typeof customLog>; // FuncParams vira uma tupla com a ordem e tipo dos parâmetros da função passada no Generic

// ====================

const placeholders = [
  "variable(title)",
  "var(member)",
  "Samuel",
  "var(username)",
  "VAR(createdAt)",
  "var(timestamp)",
] as const;

type Arr = typeof placeholders;

type GetVarName<T extends string> = T extends `var(${infer VarName})`
  ? VarName
  : never;

type Vars = GetVarName<"var(member)">; // Aqui Vars vai ser do tipo member, pois no Generic do GetVarName pegamos e realizamos a inferência de tipo sobre o que tem dento dos parênteses de var, ou seja, "var(algo)"
type Vars1 = GetVarName<Arr[number]>; // Arr[number] significa que ele vai pegar todos os valores do array e assim aplicar de acordo com a condição do Generic de GetVarName
