// Significa basicamente o fato de renomear ou dar apelido para uma importação
// Normalmente utilizado mais para legibilidade e organização

// Utilizando o alias utilizado na configuração de paths do ts.config
// Tal anotação pode ser utilizada em qualquer nível da aplicação, seja uma pasta em hierarquia superior do que está no path "#mathfuncs" ou em hierarquia inferior de nível de profundidade de pastas
import {} from "#mathfuncs/sum.js";

// OBS: É importante entender que quando o projeto é buildado e transpilado para Javascript, essa importação fica da mesma forma, ou seja, não temos a conversão para o caminho relativo real e com isso ao tentar executar o projeto recebemos um error.
// Logo, para ocorrer tal conversão, é necessário mapear esse caminho de alias para o caminho relativo real no arquivo package.json por meio da key "imports" assim como a key "paths" do ts.config.

// Também posso criar um arquivo único que vai conter todas as exportações necessárias para aquele módulo e assim conseguir importar as dependências de maneira organizada nesse arquivo
import { navbar, sidebar } from "#components";
