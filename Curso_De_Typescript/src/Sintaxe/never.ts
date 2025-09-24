// Significa um tipo especial, que reflete a sua descrição "nunca"
// Então é um tipo de impossibilidade quando tivermos algum error ao longo do código

// Basicamente significa que essa função não vai ter retorno ou pelo menos vai gerar um error
// Tal comportamento é diferente de void, undefined ou null
function throwError(message: string): never {
  throw new Error(message);
}

function main() {
  throwError("Ocorreu um Error");

  const name = "Samuel"; // Percebe-se que a linha de código está um pouco opaca, pois a execução nunca vai chegar aqui, justamente por conta da função que retorna never na invocação acima
}

function main1() {
  try {
    throwError("Ocorreu um Error");
  } catch (error) {}

  const name = "Samuel"; // Só vamos poder chegar nessa linha se a função acima estiver dentro de um try-catch
}

main();

// ===============

function teste(x: string | number) {
  if (typeof x === "string") {
    return x; // É uma string por conta do narrowing (refinamento de tipos)
  }

  if (typeof x === "number") {
    return x; // É um number por conta do narrowing (refinamento de tipos)
  }

  return x; // É um never, pois nunca x vai ser diferente de string ou number dada a definição do argumento da função
}

teste({} as string); // Exemplo de um argumento que foge de ser uma string ou number, isso só é possível por conta do "as"

// =================

type Impossible = string & number; // o tipo é never, pois nunca que algum dado vai poder ser string e number ao mesmo tempo
