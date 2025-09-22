# Interfaces em TypeScript

**Autor:** Matheus Pereira

---

## Visão geral

### Exemplo 01: Sistema de Agendamento de Consultas
**Descrição:** Criar um programa que gerencie consultas médicas ou de serviços.

- **Interface `Consulta`**:
  - **Campos obrigatórios**: `id` (string), `paciente` (string), `data` (Date).
  - **Campos opcionais**: `observacoes?: string`, `dataCancelamento?: Date | null`.
  - **Status**: `status: "agendada" | "concluída" | "cancelada"`.

- **Funcionalidades (CRUD)**:
  - `agendarConsulta()`: Cria uma nova consulta.
  - `cancelarConsulta()`: Recebe um `id` e atribui a `dataCancelamento`.
  - `listarConsultas()`: Exibe todas as consultas com seu status.
  - `listarPorStatus(status: string)`: Filtra as consultas por status.

#### Output Esperado para `exemplo01-consultas.js`:

```
--- Iniciando o Sistema de Agendamento ---

> Consulta para "João da Silva" agendada com sucesso!
> ID: consulta-1

> Consulta para "Maria Oliveira" agendada com sucesso!
> ID: consulta-2

> Consulta para "Pedro Santos" agendada com sucesso!
> ID: consulta-3

> Consulta para "Ana Paula" agendada com sucesso!
> ID: consulta-4

--- Lista Completa de Consultas ---

----------------------------------------
  ID: consulta-1
  Paciente: João da Silva
  Data: 20/10/2025, 10:00:00
  Status: agendada
  Observações: Exame de rotina

----------------------------------------
  ID: consulta-2
  Paciente: Maria Oliveira
  Data: 21/10/2025, 14:30:00
  Status: agendada

----------------------------------------
  ID: consulta-3
  Paciente: Pedro Santos
  Data: 22/10/2025, 09:00:00
  Status: agendada
  Observações: Avaliação inicial

----------------------------------------
  ID: consulta-4
  Paciente: Ana Paula
  Data: 23/10/2025, 11:00:00
  Status: agendada
----------------------------------------

> Consulta com ID "consulta-2" cancelada com sucesso em 21/09/2025, 21:57:30.

> Consulta com ID "consulta-1" marcada como concluída.

> Consulta com ID "consulta-4" cancelada com sucesso em 21/09/2025, 21:57:30.

Aviso: A consulta com ID "consulta-1" não pode ser concluída, pois já está no estado "concluída".

Erro: Consulta com ID "consulta-99" não encontrada.

--- Lista Completa de Consultas ---

----------------------------------------
  ID: consulta-1
  Paciente: João da Silva
  Data: 20/10/2025, 10:00:00
  Status: concluída
  Observações: Exame de rotina

----------------------------------------
  ID: consulta-2
  Paciente: Maria Oliveira
  Data: 21/10/2025, 14:30:00
  Status: cancelada
  Cancelada em: 21/09/2025, 21:57:30

----------------------------------------
  ID: consulta-3
  Paciente: Pedro Santos
  Data: 22/10/2025, 09:00:00
  Status: agendada
  Observações: Avaliação inicial

----------------------------------------
  ID: consulta-4
  Paciente: Ana Paula
  Data: 23/10/2025, 11:00:00
  Status: cancelada
  Cancelada em: 21/09/2025, 21:57:30
----------------------------------------

--- Consultas com Status "agendada" ---
- ID: consulta-3 | Paciente: Pedro Santos | Data: 22/10/2025, 09:00:00

--- Consultas com Status "concluída" ---
- ID: consulta-1 | Paciente: João da Silva | Data: 20/10/2025, 10:00:00

--- Consultas com Status "cancelada" ---
- ID: consulta-2 | Paciente: Maria Oliveira | Data: 21/10/2025, 14:30:00
- ID: consulta-4 | Paciente: Ana Paula | Data: 23/10/2025, 11:00:00
```

### Exemplo 02: Sistema de Biblioteca
**Descrição:** Gerenciar livros e empréstimos de forma simples.

- **Interface `Livro`**:
  - `titulo: string`
  - `autor: string`
  - `emprestado: boolean`
  - `dataEmprestimo?: Date | null`
  - `dataDevolucao?: Date | null`

- **Funcionalidades**:
  - `cadastrarLivro()`
  - `emprestarLivro()`: Altera `emprestado` para `true` e define `dataEmprestimo`.
  - `devolverLivro()`: Altera `emprestado` para `false` e define `dataDevolucao`.
  - `listarDisponiveis()`: Mostra apenas os livros não emprestados.

#### Output Esperado para `exemplo02-biblioteca.js`:

```
--- Executando o Sistema de Biblioteca ---

> Livro "O Hobbit" de J.R.R. Tolkien cadastrado com sucesso.

> Livro "1984" de George Orwell cadastrado com sucesso.

> Livro "O Código Da Vinci" de Dan Brown cadastrado com sucesso.

--- Catálogo Completo de Livros ---

-------------------------------------
  Título: "O Hobbit"
  Autor: J.R.R. Tolkien
  Status: Disponível

-------------------------------------
  Título: "1984"
  Autor: George Orwell
  Status: Disponível

-------------------------------------
  Título: "O Código Da Vinci"
  Autor: Dan Brown
  Status: Disponível
-------------------------------------

--- Livros Disponíveis para Empréstimo ---
- Título: "O Hobbit", Autor: J.R.R. Tolkien
- Título: "1984", Autor: George Orwell
- Título: "O Código Da Vinci", Autor: Dan Brown

> Livro "1984" emprestado com sucesso em 21/09/2025, 21:57:38.

Aviso: O livro "1984" já está emprestado.

--- Livros Disponíveis para Empréstimo ---
- Título: "O Hobbit", Autor: J.R.R. Tolkien
- Título: "O Código Da Vinci", Autor: Dan Brown

> Livro "1984" devolvido com sucesso em 21/09/2025, 21:57:38.

Aviso: O livro "O Hobbit" já está disponível (não emprestado).

--- Catálogo Completo de Livros ---

-------------------------------------
  Título: "O Hobbit"
  Autor: J.R.R. Tolkien
  Status: Disponível

-------------------------------------
  Título: "1984"
  Autor: George Orwell
  Status: Disponível
  Data de Empréstimo: 21/09/2025, 21:57:38
  Data de Devolução: 21/09/2025, 21:57:38

-------------------------------------
  Título: "O Código Da Vinci"
  Autor: Dan Brown
  Status: Disponível
-------------------------------------
```

### Exemplo 03: Gerenciador de Tarefas Avançado
**Descrição:** Criar um to-do list com categorias e datas.

- **Interface `Tarefa`**:
  - `id: number`
  - `descricao: string`
  - `categoria?: string`
  - `concluida: boolean`
  - `dataConclusao?: Date | null`

- **Funcionalidades**:
  - `adicionarTarefa()`: Cria uma nova tarefa.
  - `concluirTarefa()`: Marca a tarefa como concluída e adiciona a `dataConclusao`.
  - `listarPendentes()` e `listarConcluidas()`

#### Output Esperado para `exemplo03-tarefas.js`:

```
--- Executando o Gerenciador de Tarefas ---

> Tarefa "Fazer compras" adicionada com sucesso.

> Tarefa "Responder e-mails do trabalho" adicionada com sucesso.

> Tarefa "Ligar para o dentista" adicionada com sucesso.

> Tarefa "Finalizar relatório do projeto" adicionada com sucesso.

--- Tarefas Pendentes ---
[ID: 1] - Fazer compras (Pessoal)
[ID: 2] - Responder e-mails do trabalho
[ID: 3] - Ligar para o dentista (Saúde)
[ID: 4] - Finalizar relatório do projeto

> Tarefa "Fazer compras" concluída em 21/09/2025, 21:57:56.

> Tarefa "Finalizar relatório do projeto" concluída em 21/09/2025, 21:57:56.

Aviso: A tarefa "Fazer compras" já está concluída.

Erro: Tarefa com ID 99 não encontrada.

--- Tarefas Pendentes ---
[ID: 2] - Responder e-mails do trabalho
[ID: 3] - Ligar para o dentista (Saúde)

--- Tarefas Concluídas ---
[ID: 1] - Fazer compras (Concluída em: 21/09/2025, 21:57:56)
[ID: 4] - Finalizar relatório do projeto (Concluída em: 21/09/2025, 21:57:56)
```

---

## Estrutura do projeto

```
interfaces-typescript/
├── exemplo01-consultas.ts
├── exemplo02-biblioteca.ts
├── exemplo03-tarefas.ts
├── tsconfig.json
└── (arquivos .js gerados após a compilação)
```

---

## Requisitos

- Node.js (>= 18 recomendado)
- TypeScript instalado (global ou local)

---

## Instalação

Para começar a usar este projeto, siga os passos abaixo:

1.  **Clone o repositório:**

    Abra seu terminal ou prompt de comando e execute o seguinte comando para baixar o projeto:

    ```bash
    git clone https://github.com/mafhper/interfaces-typescript.git
    cd interfaces-typescript
    ```

2.  **Instale as dependências (TypeScript):**

    Este projeto utiliza TypeScript. Se você ainda não o tem instalado, pode fazê-lo globalmente ou localmente.

    **Instalação global (recomendado para uso geral):**

    ```bash
    npm install -g typescript
    ```

    **Instalação local (para este projeto específico):**

    ```bash
    npm install typescript --save-dev
    ```

    Após a instalação do TypeScript, você pode instalar outras dependências do projeto (se houver alguma no `package.json`):

    ```bash
    npm install
    ```

---

## Compilação

Para compilar os arquivos `.ts`:

```bash
tsc
```

ou, se o TypeScript estiver instalado apenas localmente:

```bash
npx tsc
```

Isso vai gerar os arquivos `.js` correspondentes.

---

## Execução

Depois de compilados, execute cada exemplo com:

```bash
node exemplo01-consultas.js
node exemplo02-biblioteca.js
node exemplo03-tarefas.js
```

---

## Explicação do `tsconfig.json`

O projeto usa uma versão **simplificada** do `tsconfig.json`, criada a partir do comando `tsc --init` e reduzida para os pontos essenciais.

Exemplo típico (adaptado para este projeto):

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

### O que cada opção faz:
- **target:** define para qual versão do JavaScript o código será convertido (ES2016 é suficiente para Node moderno).
- **module:** indica qual sistema de módulos usar. Como estamos rodando no Node.js, `commonjs` é o mais simples.
- **strict:** liga várias verificações de tipo, ajudando a escrever código mais seguro.
- **esModuleInterop:** facilita o uso de `import` com pacotes que usam `require`.
- **forceConsistentCasingInFileNames:** garante que os nomes de arquivos usados nos imports tenham sempre a mesma grafia (importante em sistemas Linux, sensíveis a maiúsculas/minúsculas).
- **skipLibCheck:** acelera a compilação ignorando checagem em arquivos de definição de bibliotecas externas.

---

## O que aprender com os exemplos

Este projeto foi elaborado para demonstrar as **interfaces em TypeScript** através de exemplos práticos. Ao explorar os arquivos, você poderá aprender sobre:

-   **Definição e Uso de Interfaces para Objetos:**
    -   Veja como interfaces como `Consulta`, `Livro` e `Tarefa` estabelecem contratos claros para a estrutura dos dados, garantindo consistência em todo o código.
    -   Entenda como as interfaces ajudam a organizar e tipar objetos complexos, tornando o código mais legível e menos propenso a erros.

-   **Propriedades Opcionais (`?`) e Obrigatórias:**
    -   Observe o uso do `?` para definir propriedades que podem ou não estar presentes em um objeto (ex: `observacoes?` em `Consulta`, `categoria?` em `Tarefa`).
    -   Compreenda a importância de distinguir entre dados essenciais e dados complementares.

-   **Interfaces com Métodos (Contratos de Funções):**
    -   Embora os exemplos aqui foquem mais em estruturas de dados, as interfaces também podem definir a assinatura de métodos, o que é fundamental para criar contratos para classes e funções.

-   **Uso de `Union Types` e `null`/`undefined`:**
    -   Explore como `union types` (ex: `"agendada" | "concluída" | "cancelada"` para `status` em `Consulta`) restringem os valores possíveis de uma propriedade.
    -   Veja como `Date | null` é utilizado para campos como `dataCancelamento` ou `dataConclusao`, indicando que uma data pode existir ou ser explicitamente `null`.
    -   Entenda a diferença entre `null` (ausência intencional de valor) e `undefined` (ausência de valor por omissão de uma propriedade opcional).

-   **Arrays Tipados:**
    -   Aprenda a criar arrays que armazenam apenas objetos de um tipo específico (ex: `const consultas: Consulta[]`), garantindo a integridade dos dados em coleções.

-   **Organização de Código com Funções e Lógica de Negócio:**
    -   Analise como as funções de CRUD (Criar, Ler, Atualizar, Deletar/Concluir) são implementadas para interagir com os dados tipados, mantendo a lógica de cada sistema (agendamento, biblioteca, tarefas) clara e modular.

Ao final, você terá bons exemplos sobre como usar interfaces para construir aplicações TypeScript mais robustas, organizadas e fáceis de manter.

---

## Licença

Este projeto está sob a licença MIT.
