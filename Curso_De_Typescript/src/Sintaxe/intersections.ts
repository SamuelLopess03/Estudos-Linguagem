// Type intersections = &
// Basicamente representa que o tipo definido com essa estrutura necessita ter todos os tipos delimitados

interface Robot {
  material: string;
  fuel: string;
}

interface Human {
  name: string;
  age: number;
}

type Cyborg = Robot & Human; // Cyborg contém todos os dados e métodos de Robot e (AND) Human

// Temos a intersecção de tipos, ou seja, a definição proposta deve conter todos os dados de ambas as declarações

type Custom = number & string & boolean; // O tipo fica como "never", pois tal definição não é possível

// Devemos tomar cuidado para não estruturar algo com tipagens incompatíveis entre si
