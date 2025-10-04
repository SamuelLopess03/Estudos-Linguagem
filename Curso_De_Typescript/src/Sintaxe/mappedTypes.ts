// Basicamente é uma técnica de mapear as chaves de um objeto para criar outro dado ou tipo se necessário

interface User {
  id: string;
  name: string;
  age?: number;
  email: string;
  isAdmin?: boolean;
  send(): string;
  join(): void;
  isActive(): boolean;
}

type MyPartial<T> = {
  [Key in keyof T]?: T[Key]; // Utilzando o princípio do Mapped Types, ou seja, estou mapeando um tipo a partir das propriedades e métodos de uma interface
};

type MyRequired<T> = {
  [Key in keyof T]-?: T[Key]; // O Símbolo de subtração retira o fato de serem opcionais
};

type PartialUser = MyPartial<User>; // PartialUser tem todos os campos como opcionais

type PartialUser1 = MyRequired<User>; // PartialUser1 tem todos os campos como obrigatórios

// Basicamente estou mapeando todas as propriedades e métodos do objeto Generic e estou acrescentando um underline ("_") à frente
type UnderscoreProps<T> = {
  [Key in keyof T as Key extends string ? `_${Key}` : Key]: T[Key];
};

type UnderscoreUser = UnderscoreProps<User>;

type NoMethods<T> = {
  [Key in keyof T as T[Key] extends Function ? never : Key]: T[Key];
};

type NoProps<T> = {
  [Key in keyof T as T[Key] extends Function ? Key : never]: T[Key];
};

type NoMethodsUser = NoMethods<User>; // NoMethodsUser não possui mais nenhum método de User, pois o type NoMethods utilizando o mapped types retira as funções na filtragem

type NoPropsUser = NoProps<User>; // Agora NoPropsUser possui apenas os métodos de User

type RemovePropsType<T, U> = {
  [Key in keyof T as T[Key] extends U ? never : Key]: T[Key];
};

type MyUser = RemovePropsType<User, string>; // Todas as propriedades de User que forem do tipo string serão removidas para a definição do novo tipo
type MyUser1 = RemovePropsType<User, () => string>; // O método que tiver o retorno como string será removido na filtragem de RemovePropsType
