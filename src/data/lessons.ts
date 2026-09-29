export interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
}

export interface CodeChallenge {
    instructions: string;
    starterCode: string;
}

export interface Lesson {
    id: number;
    title: string;
    content: string;
    quiz?: QuizQuestion[];
    challenge?: CodeChallenge;
}

export const lessons: Lesson[] = [
    {
        id: 1,
        title: "Bem-vindo ao Start Java",
        content: `
Seja bem-vindo ao **Start Java**, uma plataforma criada para ajudar estudantes que estão dando os primeiros passos no mundo da programação utilizando a linguagem Java.

Muitos alunos ingressam em cursos de **Ciência da Computação**, **Sistemas de Informação** e áreas relacionadas sem nunca terem escrito uma linha de código. Pensando nisso, o Start Java foi desenvolvido para tornar o aprendizado mais simples, organizado e acessível. Aqui você encontrará conteúdos introdutórios, exemplos práticos e exercícios que ajudarão a compreender os principais conceitos da programação de forma gradual.

Nosso objetivo é fornecer uma base sólida para que você desenvolva sua lógica de programação e ganhe confiança para enfrentar os desafios das disciplinas e projetos futuros.

Boa jornada e bons estudos!
`
    },
    {
        id: 2,
        title: "O que é Java?",
        content: `

Java é uma linguagem de programação orientada a objetos criada em 1995 e amplamente utilizada no desenvolvimento de sistemas, aplicações web, aplicativos Android e soluções empresariais. Uma das principais características do Java é sua portabilidade. Graças à JVM (Java Virtual Machine), um programa pode ser executado em diferentes sistemas operacionais sem precisar ser modificado.

---

## Por que aprender Java?

Java é uma das linguagens mais utilizadas no mercado de tecnologia e é muito ensinada em universidades por ajudar no aprendizado dos conceitos fundamentais da programação.

Com Java, você aprenderá:

💡 Lógica de programação.
📦 Variáveis e tipos de dados.
🔄 Laços de repetição.
🏛️ Orientada a Objetos (OO).

`,
        quiz: [
            {
                question: "O que garante que um programa Java rode em diferentes sistemas operacionais sem modificação?",
                options: ["O compilador C++", "A JVM (Java Virtual Machine)", "O navegador", "O sistema operacional"],
                correctIndex: 1,
                explanation: "A JVM interpreta o bytecode Java, tornando os programas portáveis entre sistemas operacionais."
            },
            {
                question: "Em que ano a linguagem Java foi criada?",
                options: ["1985", "1995", "2005", "2010"],
                correctIndex: 1
            },
            {
                question: "Além de aplicações desktop, para quais tipos de aplicação o Java é amplamente utilizado atualmente?",
                options: [
                    "Apenas jogos 2D simples",
                    "Sistemas web, aplicativos Android e soluções empresariais",
                    "Apenas scripts de automação de terminal",
                    "Apenas processamento de imagens"
                ],
                correctIndex: 1
            },
            {
                question: "Uma empresa precisa que o mesmo sistema rode tanto em servidores Linux quanto em computadores com Windows, sem alterar uma linha do código-fonte. Qual característica do Java resolve esse problema?",
                options: [
                    "A sintaxe simples da linguagem",
                    "A portabilidade garantida pela JVM",
                    "O suporte a herança múltipla",
                    "A tipagem dinâmica"
                ],
                correctIndex: 1,
                explanation: "Esse princípio é conhecido como 'write once, run anywhere' (escreva uma vez, rode em qualquer lugar)."
            },
            {
                question: "Para qual formato o código Java é compilado antes de ser executado pela JVM?",
                options: ["Bytecode", "Assembly", "HTML", "Binário nativo do sistema operacional"],
                correctIndex: 0,
                explanation: "O compilador Java transforma o código-fonte em bytecode, que a JVM interpreta e executa em qualquer sistema operacional."
            }
        ]
    },
    {
        id: 3,
        title: "Variáveis e Tipos de Dados",
        content: `
Variáveis são espaços na memória do computador usados para **armazenar valores** que podem ser utilizados e alterados durante a execução do programa.

Em Java, toda variável precisa ter um **tipo** definido antes de ser usada. Isso porque o Java é uma linguagem **fortemente tipada**.

---

## Como declarar uma variável

\`\`\`java
int idade = 20;
String nome = "Maria";
double altura = 1.75;
boolean estudando = true;
\`\`\`

Perceba a estrutura: **tipo + nome da variável + valor**.

## Principais tipos primitivos

| Tipo | Armazena | Exemplo |
|------|----------|---------|
| int | Números inteiros | 10, -5, 2024 |
| double | Números decimais (a maioria dos casos) | 3.14, 19.90 |
| float | Números decimais, com menos precisão | 3.14f |
| char | Um único caractere | 'A', 'z' |
| boolean | Verdadeiro ou falso | true, false |
| long | Números inteiros muito grandes | 10000000000L |

obs: \`String\` não é um tipo primitivo, é uma classe. Mesmo assim, é usada o tempo todo para representar texto em Java.

## Conversão de tipos (casting)

Às vezes é preciso converter um tipo em outro. Quando a conversão vai de um tipo "menor" para um "maior" (como de \`int\` para \`double\`), ela acontece automaticamente:

\`\`\`java
int quantidade = 10;
double quantidadeDouble = quantidade; // 10.0
\`\`\`

Já quando o caminho é o contrário, é necessário fazer a conversão manualmente, e isso pode causar perda de precisão:

\`\`\`java
double preco = 19.90;
int precoInteiro = (int) preco; // 19 (a parte decimal é descartada)
\`\`\`

## Regras para nomear variáveis

✅ Podem conter letras, números e o símbolo _ (underline).
✅ Não podem começar com número.
✅ Não podem ser palavras reservadas do Java (como \`class\`, \`if\`, \`int\`).
✅ Por convenção, usamos **camelCase** (ex: \`nomeCompleto\`, \`idadeAluno\`).
`,
        quiz: [
            {
                question: "Por que o Java é considerado uma linguagem fortemente tipada?",
                options: [
                    "Porque não usa tipos",
                    "Porque toda variável precisa ter um tipo definido antes de ser usada",
                    "Porque só aceita números",
                    "Porque os tipos mudam sozinhos durante a execução"
                ],
                correctIndex: 1
            },
            {
                question: "Qual dessas opções NÃO é um nome de variável válido em Java?",
                options: ["idade", "nomeCompleto", "2idade", "_valor"],
                correctIndex: 2,
                explanation: "Nomes de variáveis não podem começar com número."
            },
            {
                question: "Considerando o código: int x = 10; x = x + 5; Qual é o valor de x depois da segunda linha?",
                options: ["10", "5", "15", "x + 5"],
                correctIndex: 2,
                explanation: "A variável x recebe seu valor atual (10) somado a 5, resultando em 15."
            },
            {
                question: "Você quer armazenar o preço de um produto, que pode ter casas decimais, como 19.90. Qual tipo é mais apropriado para essa variável?",
                options: ["int", "boolean", "double", "char"],
                correctIndex: 2
            },
            {
                question: "double preco = 9.99; int precoConvertido = (int) preco; Qual será o valor de precoConvertido?",
                options: ["9.99", "10", "9", "Erro de compilação"],
                correctIndex: 2,
                explanation: "Ao converter double para int manualmente, a parte decimal é descartada (não arredondada), restando apenas 9."
            }
        ],
        challenge: {
            instructions: "Crie uma variável int chamada idade com valor 25 e uma variável String chamada nome com o seu nome. Depois, imprima na tela algo como: \"Nome: Maria, Idade: 25\" usando System.out.println.",
            starterCode: `public class Main {
    public static void main(String[] args) {
        // Escreva seu código aqui

    }
}`
        }
    },
    {
        id: 4,
        title: "Operadores",
        content: `
São os símbolos que permitem fazer cálculos, comparações e tomar decisões dentro de um programa. Vamos conhecer os três grupos principais.

---

## Operadores Aritméticos

Fazem somas, subtrações, divisões e mais:

| Operador | Nome | Exemplo |
|----------|------|---------|
| + | Soma | 5 + 3 = 8 |
| - | Subtração | 5 - 3 = 2 |
| * | Multiplicação | 5 * 3 = 15 |
| / | Divisão | 6 / 2 = 3 |
| % | Módulo (resto da divisão) | 10 % 3 = 1 |

obs: o módulo da divisão serve, por exemplo, para operações que precisam saber se um número é par ou ímpar (o resto da divisão por 2 é 0 ou 1).

---

## Operadores Relacionais

Comparam dois valores e respondem com verdadeiro ou falso. Pense neles como juízes das condições!

| Operador | Significado |
|----------|-------------|
| > | Maior |
| < | Menor |
| >= | Maior ou igual |
| <= | Menor ou igual |
| == | Igual |
| != | Diferente |

---

## Operadores Lógicos

Servem para conectar comparações e tomar decisões mais complexas:

🔹 && (E) – Tudo precisa ser verdadeiro!
🔹 || (OU) – Basta um ser verdadeiro!
🔹 ! (NÃO) – Inverte o valor lógico!
`,
        quiz: [
            {
                question: "Qual operador retorna o resto de uma divisão?",
                options: ["/", "%", "*", "=="],
                correctIndex: 1
            },
            {
                question: "Para o operador && (E) retornar verdadeiro, o que é necessário?",
                options: [
                    "Que apenas uma condição seja verdadeira",
                    "Que todas as condições sejam verdadeiras",
                    "Que todas sejam falsas",
                    "Nada, ele sempre retorna verdadeiro"
                ],
                correctIndex: 1
            },
            {
                question: "Qual é o resultado da expressão 7 % 2 em Java?",
                options: ["3.5", "1", "0", "3"],
                correctIndex: 1,
                explanation: "O operador % retorna o resto da divisão: 7 dividido por 2 dá 3, com resto 1."
            },
            {
                question: "Você precisa verificar se uma pessoa pode tirar carteira de motorista: ela precisa ter 18 anos ou mais *e* também ter feito o exame teórico. Qual operador lógico conecta corretamente essas duas condições?",
                options: ["!", "||", "&&", "=="],
                correctIndex: 2,
                explanation: "Como as duas condições precisam ser verdadeiras ao mesmo tempo, o operador correto é o && (E)."
            },
            {
                question: "Qual é o resultado da expressão (5 > 3) && (2 > 4)?",
                options: ["true", "false", "5", "Erro de compilação"],
                correctIndex: 1,
                explanation: "Como a condição (2 > 4) é falsa, o operador && retorna false, pois exige que as duas condições sejam verdadeiras."
            }
        ]
    },
    {
        id: 5,
        title: "Estruturas Condicionais",
        content: `
As **estruturas condicionais** permitem que o programa tome decisões, executando blocos de código diferentes dependendo se uma condição é verdadeira ou falsa. Elas trabalham em conjunto com os operadores relacionais e lógicos que você já conheceu.

---

## if / else if / else

\`\`\`java
int idade = 20;

if (idade < 12) {
    System.out.println("Criança");
} else if (idade < 18) {
    System.out.println("Adolescente");
} else {
    System.out.println("Adulto");
}
\`\`\`

O Java avalia as condições **na ordem em que aparecem** e executa apenas o primeiro bloco cuja condição for verdadeira. Se nenhuma condição for verdadeira, o bloco do \`else\` é executado.

## Operador ternário

Uma forma resumida de escrever um if/else simples, ideal quando você só precisa escolher entre dois valores:

\`\`\`java
int idade = 20;
String status = (idade >= 18) ? "Maior de idade" : "Menor de idade";
\`\`\`

## switch-case

Usado quando queremos comparar uma mesma variável com **vários valores possíveis**, evitando muitos \`else if\` em sequência.

\`\`\`java
int diaDaSemana = 3;

switch (diaDaSemana) {
    case 1:
        System.out.println("Domingo");
        break;
    case 2:
        System.out.println("Segunda-feira");
        break;
    case 3:
        System.out.println("Terça-feira");
        break;
    default:
        System.out.println("Dia inválido");
}
\`\`\`

⚠️ Cuidado: sem o comando \`break\`, a execução continua para os próximos \`case\` mesmo que a condição não seja mais verdadeira (esse comportamento é chamado de *fall-through*).

---

obs: as estruturas condicionais são a base para qualquer programa que precise validar dados, checar permissões ou responder de forma diferente a situações diferentes.
`,
        quiz: [
            {
                question: "O que acontece se a condição do if for falsa e não existir um else?",
                options: [
                    "O programa trava",
                    "Nenhum bloco é executado e o programa continua normalmente",
                    "O bloco do if é executado mesmo assim",
                    "Ocorre um erro de compilação"
                ],
                correctIndex: 1
            },
            {
                question: "Qual estrutura é mais indicada para comparar uma mesma variável com vários valores fixos possíveis?",
                options: ["for", "switch-case", "while", "operador ternário"],
                correctIndex: 1
            },
            {
                question: "O que o comando break faz dentro de um switch?",
                options: [
                    "Repete o case atual",
                    "Encerra o switch, evitando que os próximos cases sejam executados",
                    "Inicia um novo case",
                    "Não tem efeito dentro do switch"
                ],
                correctIndex: 1,
                explanation: "Sem o break, o Java continua executando os cases seguintes até encontrar um break ou chegar ao fim do switch (fall-through)."
            },
            {
                question: "Um sistema deve exibir 'Aprovado' se a nota for maior ou igual a 7, e 'Reprovado' caso contrário. Qual estrutura resolve esse problema da forma mais simples?",
                options: ["switch-case", "if/else", "for", "while"],
                correctIndex: 1
            },
            {
                question: "int x = 10; if (x > 5) { System.out.println(\"A\"); } else if (x > 8) { System.out.println(\"B\"); } O que será impresso?",
                options: ["A", "B", "A e B", "Nada será impresso"],
                correctIndex: 0,
                explanation: "O Java executa apenas o primeiro bloco cuja condição for verdadeira. Como x > 5 já é verdadeiro, o else if nem chega a ser avaliado."
            }
        ],
        challenge: {
            instructions: "Declare uma variável nota do tipo double e use if/else para imprimir \"Aprovado\" se a nota for maior ou igual a 7, e \"Reprovado\" caso contrário.",
            starterCode: `public class Main {
    public static void main(String[] args) {
        // Escreva seu código aqui

    }
}`
        }
    },
    {
        id: 6,
        title: "Arrays (Vetores)",
        content: `
Um **array** (ou vetor) é uma estrutura que armazena **múltiplos valores do mesmo tipo** em uma única variável, usando um tamanho fixo definido na criação.

---

## Declarando e criando um array

\`\`\`java
int[] idades = new int[3];
idades[0] = 18;
idades[1] = 25;
idades[2] = 30;
\`\`\`

Também é possível declarar e já preencher os valores diretamente:

\`\`\`java
String[] nomes = {"Ana", "Bruno", "Carla"};
\`\`\`

## Acessando elementos

Cada posição de um array é acessada por um **índice**, que sempre começa em **0**.

\`\`\`java
System.out.println(nomes[0]);      // Ana
System.out.println(nomes.length);  // 3 (tamanho do array)
\`\`\`

⚠️ Cuidado: tentar acessar um índice que não existe (como \`nomes[5]\` em um array de tamanho 3) gera o erro \`ArrayIndexOutOfBoundsException\`.

## Percorrendo um array

O jeito mais comum é usando um laço \`for\`, combinando com o que você já aprendeu:

\`\`\`java
for (int i = 0; i < nomes.length; i++) {
    System.out.println(nomes[i]);
}
\`\`\`

Também existe o **for-each**, mais simples quando não precisamos do índice:

\`\`\`java
for (String nome : nomes) {
    System.out.println(nome);
}
\`\`\`

---

obs: arrays têm tamanho fixo, definido na criação. Quando você precisa de uma estrutura que cresça ou diminua durante a execução do programa, o ideal é usar uma \`List\`, como veremos a seguir.
`,
        quiz: [
            {
                question: "Qual é o índice do primeiro elemento de um array em Java?",
                options: ["1", "0", "-1", "Depende do tamanho do array"],
                correctIndex: 1
            },
            {
                question: "Qual propriedade é usada para saber a quantidade de elementos de um array?",
                options: ["size()", "length", "count()", "tamanho()"],
                correctIndex: 1
            },
            {
                question: "int[] numeros = {10, 20, 30}; O que acontece ao tentar acessar numeros[3]?",
                options: [
                    "Retorna 0",
                    "Retorna null",
                    "Lança um ArrayIndexOutOfBoundsException",
                    "O programa ignora o comando e continua"
                ],
                correctIndex: 2,
                explanation: "O array numeros tem índices válidos de 0 a 2 (3 posições). O índice 3 não existe, então o Java lança essa exceção."
            },
            {
                question: "Qual a principal diferença entre um array e uma List (ArrayList)?",
                options: [
                    "Não existe diferença prática",
                    "O array tem tamanho fixo, enquanto a List pode crescer ou diminuir",
                    "A List só pode armazenar números",
                    "O array é sempre mais lento que a List"
                ],
                correctIndex: 1
            },
            {
                question: "Qual das opções cria corretamente um array de 5 posições do tipo int?",
                options: [
                    "int array = new int[5];",
                    "int[] array = new int(5);",
                    "int[] array = new int[5];",
                    "int[5] array = new int();"
                ],
                correctIndex: 2
            }
        ],
        challenge: {
            instructions: "Crie um array de inteiros com os valores 5, 10, 15, 20 e 25. Use um laço for para somar todos os elementos e imprima o resultado no final.",
            starterCode: `public class Main {
    public static void main(String[] args) {
        // Escreva seu código aqui

    }
}`
        }
    },
    {
        id: 7,
        title: "Estruturas de Dados: Listas, Pilha e Fila",
        content: `
Você já viu os arrays, que têm tamanho fixo. Agora vamos conhecer estruturas mais flexíveis para **organizar e armazenar múltiplos valores** na memória, permitindo que sejam acessados e manipulados de forma eficiente. Vamos conhecer três das mais usadas: **Lista**, **Pilha** e **Fila**.

---

## Lista (List)

Uma lista armazena elementos em **sequência**, permitindo acesso por posição (índice), inserção e remoção em qualquer lugar, com o tamanho ajustando-se automaticamente. Em Java, a interface \`List\` é implementada por classes como \`ArrayList\`.

\`\`\`java
List<String> nomes = new ArrayList<>();
nomes.add("Ana");
nomes.add("Bruno");
nomes.add("Carla");

System.out.println(nomes.get(1)); // Bruno
\`\`\`

## Pilha (Stack)

A pilha segue o princípio **LIFO** (*Last In, First Out* — o último a entrar é o primeiro a sair). Pense em uma pilha de pratos: você sempre retira o prato do topo.

| Operação | O que faz |
|----------|-----------|
| push | Adiciona um elemento no topo |
| pop | Remove o elemento do topo |
| peek | Consulta o elemento do topo sem remover |

\`\`\`java
Stack<Integer> pilha = new Stack<>();
pilha.push(1);
pilha.push(2);
pilha.push(3);

System.out.println(pilha.pop()); // 3
\`\`\`

## Fila (Queue)

A fila segue o princípio **FIFO** (*First In, First Out* — o primeiro a entrar é o primeiro a sair). Funciona como uma fila de banco: quem chega primeiro é atendido primeiro.

| Operação | O que faz |
|----------|-----------|
| offer / add | Insere um elemento no final |
| poll / remove | Remove o elemento do início |
| peek | Consulta o elemento do início sem remover |

\`\`\`java
Queue<String> fila = new LinkedList<>();
fila.offer("Cliente 1");
fila.offer("Cliente 2");

System.out.println(fila.poll()); // Cliente 1
\`\`\`

---

obs: entender **LIFO** e **FIFO** é essencial, pois esses conceitos aparecem em diversas situações da programação, como controle de histórico (pilha) e processamento de tarefas (fila).
`,
        quiz: [
            {
                question: "Qual estrutura de dados segue o princípio LIFO?",
                options: ["Fila", "Lista", "Pilha", "Array"],
                correctIndex: 2
            },
            {
                question: "Em uma Fila (Queue), qual método remove o elemento do início?",
                options: ["push", "poll", "pop", "peek"],
                correctIndex: 1
            },
            {
                question: "Se você inserir os elementos 1, 2 e 3 (nessa ordem) em uma Pilha usando push, qual será a ordem de saída ao chamar pop() três vezes seguidas?",
                options: ["1, 2, 3", "3, 2, 1", "2, 1, 3", "1, 3, 2"],
                correctIndex: 1,
                explanation: "A pilha é LIFO: o último elemento inserido (3) é o primeiro a sair."
            },
            {
                question: "Se você inserir os elementos 1, 2 e 3 (nessa ordem) em uma Fila usando offer, qual será a ordem de saída ao chamar poll() três vezes seguidas?",
                options: ["1, 2, 3", "3, 2, 1", "2, 3, 1", "3, 1, 2"],
                correctIndex: 0,
                explanation: "A fila é FIFO: o primeiro elemento inserido (1) é o primeiro a sair."
            },
            {
                question: "Qual interface do Java é comumente implementada pela classe ArrayList?",
                options: ["Stack", "Queue", "List", "Map"],
                correctIndex: 2
            }
        ],
        challenge: {
            instructions: "Crie uma Stack<Integer> e insira os números 10, 20 e 30 usando push. Em seguida, remova um elemento com pop() e imprima o valor removido na tela.",
            starterCode: `import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        // Escreva seu código aqui

    }
}`
        }
    },
    {
        id: 8,
        title: "Laços de Repetição",
        content: `
Laços de repetição (ou *loops*) permitem executar um **bloco de código várias vezes**, evitando que você repita o mesmo código manualmente. Em Java, os principais são: \`for\`, \`while\` e \`do-while\`.

---

## for

Usado quando você **sabe quantas vezes** quer repetir algo.

\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println("Repetição número " + i);
}
\`\`\`

A estrutura tem três partes: **inicialização**, **condição** e **incremento**.

## while

Usado quando a repetição depende de uma **condição**, e você não sabe exatamente quantas vezes ela vai ocorrer.

\`\`\`java
int contador = 0;

while (contador < 5) {
    System.out.println("Contador: " + contador);
    contador++;
}
\`\`\`

⚠️ Cuidado: se a condição nunca se tornar falsa, o laço vira um **loop infinito**!

## do-while

Parecido com o \`while\`, mas garante que o bloco seja executado **pelo menos uma vez**, pois a condição só é verificada no final.

\`\`\`java
int numero = 10;

do {
    System.out.println("Número: " + numero);
    numero++;
} while (numero < 5);
\`\`\`

---

## Comandos úteis dentro de laços

| Comando | O que faz |
|---------|-----------|
| break | Interrompe o laço imediatamente |
| continue | Pula para a próxima repetição, ignorando o restante do bloco atual |

obs: laços de repetição são fundamentais para percorrer arrays e listas, validar dados e resolver problemas que envolvem repetição, como somas, contagens e buscas.
`,
        quiz: [
            {
                question: "Qual laço garante que o bloco seja executado pelo menos uma vez?",
                options: ["for", "while", "do-while", "foreach"],
                correctIndex: 2
            },
            {
                question: "O que o comando 'break' faz dentro de um laço?",
                options: [
                    "Pula para a próxima repetição",
                    "Interrompe o laço imediatamente",
                    "Reinicia o laço do zero",
                    "Não faz nada"
                ],
                correctIndex: 1
            },
            {
                question: "Quantas vezes o bloco do laço for (int i = 0; i < 5; i++) será executado?",
                options: ["4", "5", "6", "Infinitas vezes"],
                correctIndex: 1,
                explanation: "O laço executa para i = 0, 1, 2, 3 e 4 — um total de 5 vezes."
            },
            {
                question: "Um aluno escreveu: int i = 0; while (i < 10) { System.out.println(i); } e o programa trava em um loop infinito. O que está faltando no código?",
                options: [
                    "Um comando break dentro do laço",
                    "Incrementar i dentro do laço (ex: i++)",
                    "Trocar while por do-while",
                    "Adicionar um comando continue"
                ],
                correctIndex: 1,
                explanation: "Sem incrementar i, a condição i < 10 nunca se torna falsa, e o laço nunca termina."
            },
            {
                question: "O que o comando continue faz dentro de um laço?",
                options: [
                    "Encerra o laço imediatamente",
                    "Pula para a próxima repetição, ignorando o restante do bloco atual",
                    "Reinicia o laço do zero",
                    "Não tem nenhum efeito"
                ],
                correctIndex: 1
            }
        ],
        challenge: {
            instructions: "Use um laço for para imprimir os números de 1 a 10, cada um em uma linha.",
            starterCode: `public class Main {
    public static void main(String[] args) {
        // Escreva seu código aqui

    }
}`
        }
    },
    {
        id: 9,
        title: "Métodos (Funções)",
        content: `
Um **método** é um bloco de código nomeado que executa uma tarefa específica e pode ser **reutilizado** sempre que necessário, evitando repetição de código.

---

## Estrutura de um método

\`\`\`java
public static int somar(int a, int b) {
    return a + b;
}
\`\`\`

| Parte | O que significa |
|-------|------------------|
| public static | Modificadores (por enquanto, use sempre assim para métodos fora de uma classe de objeto) |
| int | Tipo de retorno do método |
| somar | Nome do método |
| (int a, int b) | Parâmetros que o método recebe |
| return | Devolve um valor e encerra o método |

## Chamando um método

\`\`\`java
public static void main(String[] args) {
    int resultado = somar(5, 3);
    System.out.println(resultado); // 8
}
\`\`\`

## Métodos void

Quando um método **não precisa devolver nenhum valor**, usamos o tipo \`void\`:

\`\`\`java
public static void saudar(String nome) {
    System.out.println("Olá, " + nome + "!");
}
\`\`\`

Métodos \`void\` são chamados normalmente, mas seu retorno não pode ser atribuído a uma variável.

---

obs: dividir um programa em métodos pequenos e bem definidos torna o código mais organizado, fácil de testar e de reutilizar — esse é um dos primeiros passos rumo à Orientação a Objetos.
`,
        quiz: [
            {
                question: "Para que serve o comando return dentro de um método?",
                options: [
                    "Imprime um valor na tela",
                    "Devolve um valor e encerra a execução do método",
                    "Repete o método",
                    "Declara uma variável"
                ],
                correctIndex: 1
            },
            {
                question: "Qual tipo de retorno deve ser usado quando um método não devolve nenhum valor?",
                options: ["int", "void", "null", "empty"],
                correctIndex: 1
            },
            {
                question: "public static int dobrar(int numero) { return numero * 2; } Qual será o valor retornado ao chamar dobrar(7)?",
                options: ["7", "9", "14", "49"],
                correctIndex: 2
            },
            {
                question: "Qual a principal vantagem de dividir um programa em métodos?",
                options: [
                    "O programa fica maior",
                    "Permite reutilizar código e organizar melhor o programa",
                    "Deixa o programa mais lento",
                    "Não existe vantagem real"
                ],
                correctIndex: 1
            },
            {
                question: "Um método void pode usar o comando return dentro dele?",
                options: [
                    "Não, nunca",
                    "Sim, mas sem devolver nenhum valor, apenas para encerrar o método antecipadamente",
                    "Sim, mas apenas retornando texto",
                    "Sim, mas apenas retornando números"
                ],
                correctIndex: 1,
                explanation: "Em métodos void, o comando 'return;' (sem valor) pode ser usado para interromper a execução do método antes do seu final."
            }
        ],
        challenge: {
            instructions: "Crie um método chamado calcularMedia que recebe duas notas (double) como parâmetros e retorna a média entre elas. No método main, chame o método com dois valores e imprima o resultado.",
            starterCode: `public class Main {

    // Crie o método calcularMedia aqui

    public static void main(String[] args) {
        // Chame o método e imprima o resultado aqui

    }
}`
        }
    },
    {
        id: 10,
        title: "Orientação a Objetos",
        content: `
A **Orientação a Objetos (OO)** é um paradigma de programação que organiza o código em torno de **objetos**, que representam elementos do mundo real ou conceitos do sistema. Java é uma linguagem totalmente orientada a objetos.

---

## Classe e Objeto

Uma **classe** é um molde (modelo) que define atributos e comportamentos. Um **objeto** é uma instância criada a partir desse molde.

\`\`\`java
class Cachorro {
    String nome;
    int idade;

    void latir() {
        System.out.println(nome + " está latindo!");
    }
}
\`\`\`

\`\`\`java
Cachorro rex = new Cachorro();
rex.nome = "Rex";
rex.idade = 3;
rex.latir(); // Rex está latindo!
\`\`\`

---

## Os 4 pilares da Orientação a Objetos

| Pilar | O que significa |
|-------|------------------|
| Encapsulamento | Proteger os dados internos de um objeto, controlando o acesso através de métodos |
| Herança | Uma classe pode herdar atributos e métodos de outra classe |
| Polimorfismo | Um mesmo método pode se comportar de formas diferentes dependendo do objeto |
| Abstração | Focar no que o objeto faz, escondendo detalhes complexos de implementação |

## Herança na prática

\`\`\`java
class Animal {
    void emitirSom() {
        System.out.println("Som genérico de animal");
    }
}

class Gato extends Animal {
    @Override
    void emitirSom() {
        System.out.println("Miau!");
    }
}
\`\`\`

Aqui, \`Gato\` **herda** de \`Animal\` e **sobrescreve** (polimorfismo) o método \`emitirSom\`.

---

obs: dominar Orientação a Objetos é essencial, pois é a base de praticamente todos os frameworks e sistemas profissionais construídos em Java.
`,
        quiz: [
            {
                question: "O que é uma classe em Java?",
                options: [
                    "Um valor numérico",
                    "Um molde que define atributos e comportamentos de um objeto",
                    "Um tipo de laço",
                    "Um operador lógico"
                ],
                correctIndex: 1
            },
            {
                question: "Qual pilar da OO permite que uma classe herde atributos e métodos de outra?",
                options: ["Encapsulamento", "Abstração", "Herança", "Polimorfismo"],
                correctIndex: 2
            },
            {
                question: "No exemplo em que a classe Gato herda de Animal e sobrescreve o método emitirSom(), qual outro pilar da Orientação a Objetos está sendo demonstrado, além da Herança?",
                options: ["Encapsulamento", "Abstração", "Polimorfismo", "Nenhum outro pilar"],
                correctIndex: 2,
                explanation: "Sobrescrever um método para que se comporte de forma diferente em cada classe filha é um exemplo de Polimorfismo."
            },
            {
                question: "Você quer impedir que outras partes do código alterem diretamente o atributo idade de um objeto Pessoa, permitindo alterações apenas através de um método específico que valida o novo valor. Qual pilar da OO você está aplicando?",
                options: ["Herança", "Encapsulamento", "Polimorfismo", "Abstração"],
                correctIndex: 1,
                explanation: "Controlar o acesso aos dados internos de um objeto através de métodos é a definição de Encapsulamento."
            },
            {
                question: "O que representa um objeto em relação a uma classe?",
                options: [
                    "A classe é uma cópia do objeto",
                    "O objeto é uma instância criada a partir do molde definido pela classe",
                    "Não existe relação entre eles",
                    "Um objeto só pode existir sem uma classe"
                ],
                correctIndex: 1
            }
        ],
        challenge: {
            instructions: "Crie uma classe Pessoa com os atributos nome (String) e idade (int), e um método apresentar() que imprime: \"Olá, meu nome é [nome] e tenho [idade] anos\". No método main, crie um objeto Pessoa e chame apresentar().",
            starterCode: `public class Main {

    // Crie sua classe Pessoa aqui

    public static void main(String[] args) {
        // Crie o objeto e chame o método aqui

    }
}`
        }
    }
];
