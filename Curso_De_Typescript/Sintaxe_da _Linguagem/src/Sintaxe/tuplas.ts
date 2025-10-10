// Facilmente confundível com Arrays;
// Mas representa uma abordagem diferente, enquanto que Arrays tem uma estrutura dinâmica, onde pode ser adicionado ou removido itens;
// As tuplas representam uma estrutura estática, sendo que em qualquer parte do código elas sempre vão obrigatoriamente ter tais composições;

type NameList = string[]; // Array

type CalendarDate = [day: number, month: number, year: number]; // Tupla

const list: NameList = [];
list.push("Samuel"); // Posso adicionar sem problemas

const date1: CalendarDate = [30, 11, 2025, 90]; // Exemplo com Estrutura Diferente da Tupla
const date2: CalendarDate = [30, "", 2025]; // Exemplo com Estrutura Diferente da Tupla

const date: CalendarDate = [30, 11, 2025];

function createDate(date: CalendarDate) {
  const [day, number, year] = date; // Destructution
}

// Spread Operator
function createDate2(...date: CalendarDate) {
  const [day, number, year] = date;
}

createDate([10, "", true]);
createDate(date);

createDate2(date);
createDate2(20, 10, 2025);
