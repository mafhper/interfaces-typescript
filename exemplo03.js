"use strict";
// Atividades Práticas
// Opção 3 – Gerenciador de Tarefas Avançado
// --- Criando um array tipado para armazenar as tarefas ---
const listaDeTarefas = [];
// --- Implementando as funções de gerenciamento ---
/**
 * Adiciona uma nova tarefa à lista.
 * @param descricao A descrição da tarefa.
 * @param categoria A categoria opcional da tarefa.
 */
function adicionarTarefa(descricao, categoria) {
    const novaTarefa = {
        id: listaDeTarefas.length + 1,
        descricao,
        categoria,
        concluida: false,
        dataConclusao: null,
    };
    listaDeTarefas.push(novaTarefa);
    console.log(`Tarefa "${descricao}" adicionada.`);
}
/**
 * Marca uma tarefa como concluída pelo seu ID e registra a data de conclusão.
 * @param id O ID da tarefa a ser concluída.
 */
function concluirTarefa(id) {
    const tarefa = listaDeTarefas.find((t) => t.id === id);
    if (tarefa) {
        if (tarefa.concluida) {
            console.log(`A tarefa "${tarefa.descricao}" já está concluída.`);
        }
        else {
            tarefa.concluida = true;
            tarefa.dataConclusao = new Date();
            console.log(`Tarefa "${tarefa.descricao}" concluída em ${tarefa.dataConclusao.toLocaleString()}.`);
        }
    }
    else {
        console.log(`Erro: Tarefa com ID ${id} não encontrada.`);
    }
}
/**
 * Lista todas as tarefas que ainda não foram concluídas.
 */
function listarPendentes() {
    const pendentes = listaDeTarefas.filter((t) => !t.concluida);
    console.log('\n--- Tarefas Pendentes ---');
    if (pendentes.length === 0) {
        console.log('Nenhuma tarefa pendente.');
    }
    else {
        pendentes.forEach((tarefa) => {
            console.log(`[ID: ${tarefa.id}] ${tarefa.descricao} ${tarefa.categoria ? `(${tarefa.categoria})` : ''}`);
        });
    }
}
/**
 * Lista todas as tarefas que já foram concluídas.
 */
function listarConcluidas() {
    const concluidas = listaDeTarefas.filter((t) => t.concluida);
    console.log('\n--- Tarefas Concluídas ---');
    if (concluidas.length === 0) {
        console.log('Nenhuma tarefa concluída.');
    }
    else {
        concluidas.forEach((tarefa) => {
            var _a;
            console.log(`[ID: ${tarefa.id}] ${tarefa.descricao} - Concluída em: ${(_a = tarefa.dataConclusao) === null || _a === void 0 ? void 0 : _a.toLocaleString()}`);
        });
    }
}
// --- Testando o fluxo do sistema ---
console.log('--- Executando o Gerenciador de Tarefas ---');
// 1. Adicionando algumas tarefas
adicionarTarefa('Fazer compras', 'Pessoal');
adicionarTarefa('Responder e-mails do trabalho');
adicionarTarefa('Ligar para o dentista', 'Saúde');
adicionarTarefa('Finalizar relatório do projeto');
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
