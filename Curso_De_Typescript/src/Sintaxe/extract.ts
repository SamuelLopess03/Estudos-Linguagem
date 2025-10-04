// É outro tipo utilitário do Typescript, ele trabalha no sentido inverso do Exclude, dado um tipo vamos escolher quais propriedades dele queremos por meio da passagem de outro tipo

type Primitive = string | boolean | number;

type MyType = Extract<Primitive, string | number>; // Estou pegando os possíveis tipos de Primitive como string ou number e definindo em MyType

type Primitive2 =
  | string
  | boolean
  | number
  | string[]
  | number[]
  | Date
  | Set<string>;

type Value = Extract<Primitive2, { length: number }>; // Value só pode ser string, string[] ou number[], pois entre os tipos de Primitive2, somente eles possuem a propriedade length

// =====================

interface User {
  name: string;
  age: number;
}

interface Player {
  nickname: string;
  health: number;
}

interface Member {
  nickname: string;
  username: string;
}

interface Book {
  title: string;
  author: string;
}

interface Post {
  title: string;
  createdAt: Date;
  author: string;
}

interface Admin extends User {
  ban(user: User): void;
  kick(user: User): void;
}

type Elements = User | Member | Player | Book | Admin | Post;

type MyType1 = Extract<Elements, { name: string; isAdmin: boolean }>; // Seu tipo é never, pois não existe nenhuma interface que possua a propriedade name e isAdmin
type MyType2 = Extract<Elements, { nickname: string }>; // MyType2 só pode ser Player ou Member, pois são as únicas interfaces que tem essa propriedade
type MyType3 = Extract<Elements, { title: string; createdAt: Date }>; // Pode ser somente Post, pois é a única interface que tem ambas as propriedades
