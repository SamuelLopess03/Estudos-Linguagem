type Footer =
  | string
  | {
      text: string;
      iconUrl?: string;
    };

const footerA: Footer = "Administração"; // Type Annotation de fato sendo aplicada à nossa constante
const footerB = "Administração" as Footer; // Significa Type Assertion, ou seja, estou dizendo que tal dado é daquele tipo (Faço o Typescript tratar aquele dado conforme essa tipagem)
const footerC = "Administração" satisfies Footer; // Realiza uma verificação para analisar se o dado é realmente daquele tipo especificado (É realizado uma inferência para aquele tipo quando a validação é verdadeira)

const footerA1: Footer = {
  text: "Administração",
};
const footerB1 = {
  text: "Administração",
  title: "Teste", // O "as" não valida meu objeto e por isso aceita o campo title, apesar do tipo Footer não ter a definição desse atributo
} as Footer; // Podemos ter problema nesse caso
const footerC1 = {
  text: "Administração",
  title: "Teste", // O "satisfies" por sua vez verifica se tal estrutura está de acordo com o tipo Footer e por isso dá error, pois Footer não possui objeto que tenha title
} satisfies Footer;

// Para conseguir acessar as propriedades do footerB1 precisamos realizar um refinamento de tipos
footerB1; // Nesse caso como utilizei o "as" para cravar o tipo do dado, o autocomplete do Typescript não consegue acompanhar os atributos e métodos dele

// Já com o Type Annotation e Satisfies temos como ver as propriedades por meio do autocomplete, pois foram feitas validações sobre os mesmos
footerA1.iconUrl;
footerC1.text;

// ========== Outro Exemplo ============

type Cooldowns = Record<string, number>;

const coolDowns: Cooldowns = {
  samuel: 20,
  cristiano: 10,
  juliano: 15,
};

// Utilizando o Type Annotation não tenho o autocomplete do Typescript, pois o mesmo não consegue entender quais as chaves que o Record possui
coolDowns;

const coolDowns1 = {
  samuel: 20,
  cristiano: 10,
  juliano: 15,
} satisfies Cooldowns;

coolDowns1.cristiano; // Utilizando o Satisfies agora podemos ver as chaves do Record por meio do autocomplete do Typescript por conta da validação do mesmo
