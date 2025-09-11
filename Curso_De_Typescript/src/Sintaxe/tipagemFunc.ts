// Podemos com isso realizar a tipagem dos parâmetros e retorno da função definida

type Args = string | number | boolean;

function bootstrap(dirname: string, args?: Args[]): boolean {
  return true;
}

// Definição de uma função em um type alias
type MainFunction = (args: string[]) => void;

const main: MainFunction = function (args) {};

interface Functions {
  run(context: any): void;
  execute(): boolean;
  handle(req: Request, res: Response): void; // Posso definir uma função com tipagem de parâmetros e retorno dentro de uma interface
}

// Exemplo de Utilização
interface CustomLogOptions {
  color?: string;
  time?: Date;
  author?: string;
}

function customLog(text: string, options: CustomLogOptions) {
  const { color = "green", time, author } = options; // Destructing, onde o primeiro campo com simbolo de igual representa um valor padrão, caso não exista

  console.log(color, text);

  if (time) console.log("At: ", time.toString()); // Verificando a existência do campo, pois ele pode ser undefined devido a definição de optional
  if (author) console.log("Author: ", author);
}

customLog("Hello World", { time: new Date(), author: "Samuel" });
