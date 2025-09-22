"use strict";
/**
 * @author: Matheus Pereira
 * @date: 21/09/2025
 *
 * Este arquivo implementa um gerenciador de tarefas (to-do list) avançado.
 *
 * Funcionalidades:
 * - Definir uma interface `Tarefa` com campos opcionais para categoria e data de conclusão.
 * - Adicionar, concluir e listar tarefas.
 * - Separar a listagem entre tarefas pendentes e concluídas.
 *
 * Conceitos aplicados:
 * - Interfaces com propriedades opcionais (`?`).
 * - Tipos `string | undefined` e `Date | null`.
 * - Geração de IDs sequenciais.
 * - Funções para manipulação de um array de objetos.
 */
// --- Criando um array tipado para armazenar as tarefas ---
/**
 * `listaDeTarefas` é o array que armazena todos os objetos do tipo `Tarefa`.
 * Funciona como o nosso banco de dados em memória.
 */
const listaDeTarefas = [];
/**
 * `proximoIdTarefa` ajuda a gerar um ID numérico único para cada nova tarefa.
 */
let proximoIdTarefa = 1;
// --- Implementando as funções de gerenciamento ---
/**
 * Adiciona uma nova tarefa à lista, com o status inicial de "pendente".
 *
 * @param {string} descricao - A descrição da tarefa.
 * @param {string} [categoria] - A categoria opcional da tarefa.
 */
function adicionarTarefa(descricao, categoria) {
    const novaTarefa = {
        id: proximoIdTarefa++,
        descricao,
        categoria,
        concluida: false,
        dataConclusao: null,
    };
    listaDeTarefas.push(novaTarefa);
    console.log(`\n> Tarefa "${descricao}" adicionada com sucesso.`);
}
/**
 * Marca uma tarefa como concluída, registrando a data de conclusão.
 *
 * @param {number} id - O ID da tarefa a ser concluída.
 */
function concluirTarefa(id) {
    const tarefa = listaDeTarefas.find((t) => t.id === id);
    if (!tarefa) {
        console.log(`\nErro: Tarefa com ID ${id} não encontrada.`);
        return;
    }
    if (tarefa.concluida) {
        console.log(`\nAviso: A tarefa "${tarefa.descricao}" já está concluída.`);
    }
    else {
        tarefa.concluida = true;
        tarefa.dataConclusao = new Date();
        console.log(`\n> Tarefa "${tarefa.descricao}" concluída em ${tarefa.dataConclusao.toLocaleString()}.`);
    }
}
/**
 * Lista todas as tarefas que ainda estão pendentes.
 */
function listarPendentes() {
    const pendentes = listaDeTarefas.filter((t) => !t.concluida);
    console.log("\n--- Tarefas Pendentes ---");
    if (pendentes.length === 0) {
        console.log("Nenhuma tarefa pendente. Bom trabalho!");
    }
    else {
        pendentes.forEach((tarefa) => {
            const categoriaInfo = tarefa.categoria ? ` (${tarefa.categoria})` : "";
            console.log(`[ID: ${tarefa.id}] - ${tarefa.descricao}${categoriaInfo}`);
        });
    }
}
/**
 * Lista todas as tarefas que já foram concluídas, mostrando a data de conclusão.
 */
function listarConcluidas() {
    const concluidas = listaDeTarefas.filter((t) => t.concluida);
    console.log("\n--- Tarefas Concluídas ---");
    if (concluidas.length === 0) {
        console.log("Nenhuma tarefa foi concluída ainda.");
    }
    else {
        concluidas.forEach((tarefa) => {
            var _a;
            // O `?` (optional chaining) garante que `toLocaleString` só será chamado se `dataConclusao` não for null.
            const dataFormatada = ((_a = tarefa.dataConclusao) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || "Data indisponível";
            console.log(`[ID: ${tarefa.id}] - ${tarefa.descricao} (Concluída em: ${dataFormatada})`);
        });
    }
}
// --- Testando o fluxo do sistema ---
console.log("\n--- Executando o Gerenciador de Tarefas ---");
// 1. Adicionando algumas tarefas
adicionarTarefa("Fazer compras", "Pessoal");
adicionarTarefa("Responder e-mails do trabalho");
adicionarTarefa("Ligar para o dentista", "Saúde");
adicionarTarefa("Finalizar relatório do projeto");
// 2. Listando as tarefas pendentes
listarPendentes();
// 3. Concluindo algumas tarefas
concluirTarefa(1);
concluirTarefa(4);
// 4. Tentando concluir uma tarefa que já foi concluída
concluirTarefa(1);
// 5. Tentando concluir uma tarefa que não existe
concluirTarefa(99);
// 6. Listando as tarefas pendentes e concluídas para ver o resultado
listarPendentes();
listarConcluidas();
