"use strict";
// Atividades Práticas
// Opção 2 – Sistema de Biblioteca
// --- Criando um array tipado para armazenar os livros ---
const catalogoLivros = [];
// --- Implementando as funções de gerenciamento ---
/**
 * Cadastra um novo livro no catálogo.
 * @param titulo O título do livro.
 * @param autor O autor do livro.
 */
function cadastrarLivro(titulo, autor) {
    const novoLivro = {
        titulo,
        autor,
        emprestado: false,
        dataEmprestimo: null,
        dataDevolucao: null,
    };
    catalogoLivros.push(novoLivro);
    console.log(`Livro "${titulo}" de ${autor} cadastrado com sucesso.`);
}
/**
 * Empresta um livro se ele estiver disponível, registrando a data.
 * @param titulo O título do livro a ser emprestado.
 */
function emprestarLivro(titulo) {
    const livro = catalogoLivros.find((l) => l.titulo === titulo);
    if (livro) {
        if (livro.emprestado) {
            console.log(`Erro: O livro "${titulo}" já está emprestado.`);
        }
        else {
            livro.emprestado = true;
            livro.dataEmprestimo = new Date();
            livro.dataDevolucao = null; // Garante que a data de devolução seja resetada
            console.log(`Livro "${titulo}" emprestado com sucesso em ${livro.dataEmprestimo.toLocaleString()}.`);
        }
    }
    else {
        console.log(`Erro: Livro "${titulo}" não encontrado no catálogo.`);
    }
}
/**
 * Devolve um livro que foi emprestado, registrando a data.
 * @param titulo O título do livro a ser devolvido.
 */
function devolverLivro(titulo) {
    const livro = catalogoLivros.find((l) => l.titulo === titulo);
    if (livro) {
        if (!livro.emprestado) {
            console.log(`Erro: O livro "${titulo}" não está emprestado.`);
        }
        else {
            livro.emprestado = false;
            livro.dataDevolucao = new Date();
            console.log(`Livro "${titulo}" devolvido com sucesso em ${livro.dataDevolucao.toLocaleString()}.`);
        }
    }
    else {
        console.log(`Erro: Livro "${titulo}" não encontrado no catálogo.`);
    }
}
/**
 * Lista todos os livros que estão disponíveis para empréstimo.
 */
function listarDisponiveis() {
    const livrosDisponiveis = catalogoLivros.filter((l) => !l.emprestado);
    console.log('\n--- Livros Disponíveis para Empréstimo ---');
    if (livrosDisponiveis.length === 0) {
        console.log('Nenhum livro disponível no momento.');
    }
    else {
        livrosDisponiveis.forEach((livro) => {
            console.log(`Título: "${livro.titulo}", Autor: ${livro.autor}`);
        });
    }
}
/**
 * Lista todos os livros, independentemente do status.
 */
function listarTodosOsLivros() {
    console.log('\n--- Todos os Livros do Catálogo ---');
    if (catalogoLivros.length === 0) {
        console.log('O catálogo de livros está vazio.');
    }
    else {
        catalogoLivros.forEach((livro) => {
            console.log(`Título: "${livro.titulo}", Autor: ${livro.autor}, Emprestado: ${livro.emprestado ? 'Sim' : 'Não'}`);
            if (livro.dataEmprestimo) {
                console.log(`   Data de Empréstimo: ${livro.dataEmprestimo.toLocaleString()}`);
            }
            if (livro.dataDevolucao) {
                console.log(`   Data de Devolução: ${livro.dataDevolucao.toLocaleString()}`);
            }
        });
    }
}
// --- Testando o fluxo do sistema de biblioteca ---
console.log('--- Executando o Sistema de Biblioteca ---');
// 1. Cadastrando alguns livros
cadastrarLivro('O Hobbit', 'J.R.R. Tolkien');
cadastrarLivro('1984', 'George Orwell');
cadastrarLivro('O Código Da Vinci', 'Dan Brown');
// 2. Exibindo todos os livros no catálogo
listarTodosOsLivros();
// 3. Listando os livros disponíveis para ver o estado inicial
listarDisponiveis();
// 4. Emprestando um livro
emprestarLivro('1984');
// 5. Tentando emprestar um livro que já está emprestado
emprestarLivro('1984');
// 6. Listando novamente para ver a mudança
listarDisponiveis();
// 7. Devolvendo o livro
devolverLivro('1984');
// 8. Tentando devolver um livro que não está emprestado
devolverLivro('O Hobbit');
// 9. Listando uma última vez para ver o livro devolvido
listarTodosOsLivros();
