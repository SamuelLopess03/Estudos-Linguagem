// Ele é um tipo utilitário do Typescript que pega todas as propriedades de uma estrutura e coloca como obrigatórias, é o oposto do Partial<>

interface User {
  id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}

// Estou criando um novo tipo apartir da interface User, só que agora com todos os campos obrigatórios
type RequiredUser = Required<User>;

// Como a interface User tem todos os campos como opcionais, então posso criar um dado sem passar nenhum atributo
const user: User = {};

const user1: RequiredUser = {}; // Nesse momento está dando error porque precisar todos os campos, pois agora eles são obrigatórios

// ===================

// Basicamente, estou apenas querendo que os campos "body" e "method" sejam obrigatórios, mas os demais devem existir sendo opcionais
type MyFetchOptions = Required<Pick<RequestInit, "body" | "method">> &
  Omit<RequestInit, "body" | "method">;

function myFetch(url: string, options?: MyFetchOptions) {}

// Apenas "body" e "method" são obrigatórios, os demais são opcionais
myFetch("dehdijd", {
  body: "",
  method: "",
});
