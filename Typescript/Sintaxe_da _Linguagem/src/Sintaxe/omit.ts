// Omit também um tipo utilitário do Typescript assim como Pick e funciona de forma inversa ao Pick
// Ou seja, ele permite com que seja criado um novo tipo removendo algumas propriedades que escolhermos

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

type BasicUserInfo = Omit<User, "id" | "name">; // BasicUserInfo possui apenas as propriedades "email" e "isAdmin" de User, pois os demais foram retirados pelo Omit

/*
    Não tem segredo, o Omit é semelhante ao Pick em questão de entendimento, só que seu funcionamento é o oposto,
    pois enquanto que o Pick retorna um novo dado a partir das propriedades escolhidas da estrutura desejada, o
    Omit retorna um novo dado a partir das propriedades não selecionadas, ou seja, ele exclui da estrutura todas
    as propriedades que foram referenciadas para ele.
*/
