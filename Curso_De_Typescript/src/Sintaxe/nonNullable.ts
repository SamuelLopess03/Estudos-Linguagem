// Mais um tipo utilitário do Typescript, ele retira do novo tipo a ser criado as tipagem como null, undefined, ou algo relacionado

type MaybeID = null | number | string | undefined;

type Name = NonNullable<MaybeID>; // Name só pode ser number ou string, pois o null e undefined foram retirados

// =================

interface Member {
  id: string;
  name: string;
  posts?: {
    title: string;
    content: string;
    tags?: {
      name: string;
      icon?: string;
    }[];
    createdAt: Date;
  }[];
}

// Utilizando o NonNullable para definir um novo tipo a partir de uma propriedade de uma interface que de antemão poderia ser um array de objetos ou undefined
type Post = NonNullable<Member["posts"]>[number];
