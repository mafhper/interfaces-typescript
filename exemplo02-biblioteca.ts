/**
 * @author: Matheus Pereira
 * @date: 21/09/2025
 *
 * Este arquivo implementa um sistema simples de gerenciamento de biblioteca.
 *
 * Funcionalidades:
 * - Definir uma interface `Livro` para representar os livros do catálogo.
 * - Cadastrar, emprestar, devolver e listar livros.
 * - Controlar o status de empréstimo de cada livro.
 *
 * Conceitos aplicados:
 * - Interfaces com propriedades booleanas e opcionais.
 * - Uso de `Date | null` para campos que podem não ter valor.
 * - Manipulação de arrays com `find` e `filter`.
 * - Funções para simular um CRUD básico.
 */

// --- Definindo a interface `Livro` ---

/**
 * A interface `Livro` descreve a estrutura de um objeto de livro.
 * Ela garante que todos os livros no catálogo tenham um formato consistente.
 *
 * @property {string} titulo - O título do livro.
 * @property {string} autor - O nome do autor do livro.
 * @property {boolean} emprestado - Um valor booleano que indica se o livro está emprestado (`true`) ou disponível (`false`).
 * @property {Date | null} [dataEmprestimo] - A data em que o livro foi emprestado. É `null` se o livro estiver disponível.
 * @property {Date | null} [dataDevolucao] - A data em que o livro foi devolvido. É `null` se o livro estiver emprestado ou nunca foi emprestado.
 */
interface Livro {
  titulo: string;
  autor: string;
  emprestado: boolean;
  dataEmprestimo?: Date | null;
  dataDevolucao?: Date | null;
}

// --- Criando um array tipado para armazenar os livros ---

/**
 * `catalogoLivros` é o array que funciona como o banco de dados em memória da biblioteca.
 * Ele armazena todos os objetos do tipo `Livro`.
 */
const catalogoLivros: Livro[] = [];

// --- Implementando as funções de gerenciamento ---

/**
 * Cadastra um novo livro no catálogo, definindo seu estado inicial como "disponível".
 *
 * @param {string} titulo - O título do livro a ser cadastrado.
 * @param {string} autor - O autor do livro.
 */
function cadastrarLivro(titulo: string, autor: string) {
  // Verifica se o livro já existe para evitar duplicatas.
  const livroExistente = catalogoLivros.find(
    (l) => l.titulo.toLowerCase() === titulo.toLowerCase()
  );
  if (livroExistente) {
    console.log(`\nAviso: O livro "${titulo}" já existe no catálogo.`);
    return;
  }

  const novoLivro: Livro = {
    titulo,
    autor,
    emprestado: false,
    dataEmprestimo: null,
    dataDevolucao: null,
  };
  catalogoLivros.push(novoLivro);
  console.log(`\n> Livro "${titulo}" de ${autor} cadastrado com sucesso.`);
}

/**
 * Empresta um livro, alterando seu status para `emprestado` e registrando a data do empréstimo.
 *
 * @param {string} titulo - O título do livro a ser emprestado.
 */
function emprestarLivro(titulo: string) {
  const livro = catalogoLivros.find(
    (l) => l.titulo.toLowerCase() === titulo.toLowerCase()
  );

  if (!livro) {
    console.log(`\nErro: Livro "${titulo}" não encontrado no catálogo.`);
    return;
  }

  if (livro.emprestado) {
    console.log(`\nAviso: O livro "${titulo}" já está emprestado.`);
  } else {
    livro.emprestado = true;
    livro.dataEmprestimo = new Date();
    livro.dataDevolucao = null; // Garante que a data de devolução anterior seja limpa.
    console.log(
      `\n> Livro "${titulo}" emprestado com sucesso em ${livro.dataEmprestimo.toLocaleString()}.`
    );
  }
}

/**
 * Devolve um livro, alterando seu status para `disponível` e registrando a data da devolução.
 *
 * @param {string} titulo - O título do livro a ser devolvido.
 */
function devolverLivro(titulo: string) {
  const livro = catalogoLivros.find(
    (l) => l.titulo.toLowerCase() === titulo.toLowerCase()
  );

  if (!livro) {
    console.log(`\nErro: Livro "${titulo}" não encontrado no catálogo.`);
    return;
  }

  if (!livro.emprestado) {
    console.log(
      `\nAviso: O livro "${titulo}" já está disponível (não emprestado).`
    );
  } else {
    livro.emprestado = false;
    livro.dataDevolucao = new Date();
    console.log(
      `\n> Livro "${titulo}" devolvido com sucesso em ${livro.dataDevolucao.toLocaleString()}.`
    );
  }
}

/**
 * Lista todos os livros que estão atualmente disponíveis para empréstimo.
 */
function listarDisponiveis() {
  const livrosDisponiveis = catalogoLivros.filter((l) => !l.emprestado);
  console.log("\n--- Livros Disponíveis para Empréstimo ---");
  if (livrosDisponiveis.length === 0) {
    console.log("Nenhum livro disponível no momento.");
  } else {
    livrosDisponiveis.forEach((livro) => {
      console.log(`- Título: "${livro.titulo}", Autor: ${livro.autor}`);
    });
  }
}

/**
 * Lista todos os livros do catálogo, mostrando seu status (disponível ou emprestado)
 * e as datas de empréstimo/devolução, se aplicável.
 */
function listarTodosOsLivros() {
  console.log("\n--- Catálogo Completo de Livros ---");
  if (catalogoLivros.length === 0) {
    console.log("O catálogo de livros está vazio.");
  } else {
    catalogoLivros.forEach((livro) => {
      const status = livro.emprestado ? "Emprestado" : "Disponível";
      let detalhes = `
-------------------------------------
  Título: "${livro.titulo}"
  Autor: ${livro.autor}
  Status: ${status}`;

      if (livro.dataEmprestimo) {
        detalhes += `\n  Data de Empréstimo: ${livro.dataEmprestimo.toLocaleString()}`;
      }
      if (livro.dataDevolucao) {
        detalhes += `\n  Data de Devolução: ${livro.dataDevolucao.toLocaleString()}`;
      }
      console.log(detalhes);
    });
    console.log("-------------------------------------");
  }
}

// --- Testando o fluxo do sistema de biblioteca ---

console.log("\n--- Executando o Sistema de Biblioteca ---");

// 1. Cadastrando alguns livros
cadastrarLivro("O Hobbit", "J.R.R. Tolkien");
cadastrarLivro("1984", "George Orwell");
cadastrarLivro("O Código Da Vinci", "Dan Brown");

// 2. Exibindo todos os livros no catálogo
listarTodosOsLivros();

// 3. Listando os livros disponíveis para ver o estado inicial
listarDisponiveis();

// 4. Emprestando um livro
emprestarLivro("1984");

// 5. Tentando emprestar um livro que já está emprestado
emprestarLivro("1984");

// 6. Listando novamente para ver a mudança
listarDisponiveis();

// 7. Devolvendo o livro
devolverLivro("1984");

// 8. Tentando devolver um livro que não está emprestado
devolverLivro("O Hobbit");

// 9. Listando uma última vez para ver o livro devolvido
listarTodosOsLivros();
