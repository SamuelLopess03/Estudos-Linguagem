// É o processo de refinamento de tipos de fato, onde ele vai validar se um dado pertence a um tipo específico

// Narrowing representa a utilização de type guards para realizar o refinamento de tipos, então ele é o tratamento inteligente que o Typescript faz sobre os dados
function printValue(value: string | number | boolean) {
  if (typeof value === "string" || typeof value === "number") {
    value; // Value pode ser string | number nesse bloco

    return; // Se chegar no return significa que value era um desses tipos e portanto o que tem fora do bloco é do outro tipo
  }

  value; // Value aqui é do tipo boolean, pois a função não terminou no return do bloco if anterior
}

// =====================

// Refinador de tipos utilizando o princípio de Truthy/Falsy
// Basicamente os valores: null, undefined, 0, "", false, [], {} => Significam Falsy, ou seja, false no sentido booleano
// Os demais valores representam Truthy, ou seja, true no sentido booleano
function handle(value: string | undefined | null) {
  if (!value) return;

  value.toUpperCase();
}

handle("Samuel");

/* 
    Narrowing traz confiança e segurança ao usar Typescript, pois quando temos variáveis que podem apresentar 
    diferentes tipos de dados por conta do Union Type, ele permite realizar uma verificação sobre a variável
    para refinar até um nível que tenhamos certeza qual o tipo dela para poder operar e utilizar suas pro-
    priedades e métodos sem sofrer com erros.
*/
