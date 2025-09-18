"use strict";
// Atividades Práticas
// Definir Interface
// Criar interface com todos os campos (obrigatórios, opcionais e que aceitam null)
// Criar Array Tipado
// Implementar array tipado com a interface para armazenar os registros
// Implementar CRUD
// Desenvolver funções de CRUD (cadastrar, listar, atualizar, excluir/concluir)
// Testar Fluxo
// Criar alguns objetos e executar no console para validar funcionamento
// --- Criando um array tipado para armazenar as consultas ---
const consultas = [];
// --- Implementando as funções CRUD ---
/**
 * Agendar uma nova consulta.
 * @param paciente O nome do paciente.
 * @param data A data e hora da consulta.
 * @param observacoes Observações opcionais sobre a consulta.
 */
function agendarConsulta(paciente, data, observacoes) {
    const novaConsulta = {
        id: `consulta-${consultas.length + 1}`,
        paciente,
        data,
        status: 'agendada',
        observacoes,
        dataCancelamento: null, // Inicialmente null
    };
    consultas.push(novaConsulta);
    console.log(`Consulta para ${paciente} agendada com sucesso! ID: ${novaConsulta.id}`);
}
/**
 * Lista todas as consultas existentes no sistema.
 */
function listarConsultas() {
    console.log('\n--- Lista de Todas as Consultas ---');
    if (consultas.length === 0) {
        console.log('Nenhuma consulta encontrada.');
    }
    else {
        consultas.forEach((consulta) => {
            console.log(`ID: ${consulta.id}, Paciente: ${consulta.paciente}, Data: ${consulta.data.toLocaleString()}, Status: ${consulta.status}`);
            if (consulta.observacoes) {
                console.log(`   Observações: ${consulta.observacoes}`);
            }
            if (consulta.dataCancelamento) {
                console.log(`   Cancelada em: ${consulta.dataCancelamento.toLocaleString()}`);
            }
        });
    }
}
/**
 * Filtra e lista consultas com base no seu status.
 * @param status O status pelo qual as consultas serão filtradas ("agendada" | "concluída" | "cancelada").
 */
function listarPorStatus(status) {
    const consultasFiltradas = consultas.filter((consulta) => consulta.status === status);
    console.log(`\n--- Consultas com Status: ${status} ---`);
    if (consultasFiltradas.length === 0) {
        console.log(`Nenhuma consulta encontrada com o status "${status}".`);
    }
    else {
        consultasFiltradas.forEach((consulta) => {
            console.log(`ID: ${consulta.id}, Paciente: ${consulta.paciente}, Data: ${consulta.data.toLocaleString()}`);
        });
    }
}
/**
 * Cancela uma consulta pelo seu ID, atualizando o status e a data de cancelamento.
 * @param id O ID da consulta a ser cancelada.
 */
function cancelarConsulta(id) {
    const consulta = consultas.find((c) => c.id === id);
    if (consulta) {
        if (consulta.status === 'cancelada') {
            console.log(`A consulta ${id} já está cancelada.`);
        }
        else {
            consulta.status = 'cancelada';
            consulta.dataCancelamento = new Date(); // Atribui a data de cancelamento
            console.log(`Consulta ${id} cancelada com sucesso em ${consulta.dataCancelamento.toLocaleString()}.`);
        }
    }
    else {
        console.log(`Erro: Consulta com ID ${id} não encontrada.`);
    }
}
/**
 * Marca uma consulta como concluída pelo seu ID.
 * @param id O ID da consulta a ser concluída.
 */
function concluirConsulta(id) {
    const consulta = consultas.find((c) => c.id === id);
    if (consulta) {
        if (consulta.status === 'concluída') {
            console.log(`A consulta ${id} já está concluída.`);
        }
        else {
            consulta.status = 'concluída';
            console.log(`Consulta ${id} marcada como concluída.`);
        }
    }
    else {
        console.log(`Erro: Consulta com ID ${id} não encontrada.`);
    }
}
// --- Testando o fluxo do sistema no console ---
// 1. Agendando algumas consultas
console.log('--- Executando o Sistema de Agendamento ---');
agendarConsulta('João da Silva', new Date(2025, 9, 20, 10, 0), 'Exame de rotina');
agendarConsulta('Maria Oliveira', new Date(2025, 9, 21, 14, 30));
agendarConsulta('Pedro Santos', new Date(2025, 9, 22, 9, 0), 'Avaliação inicial');
agendarConsulta('Ana Paula', new Date(2025, 9, 23, 11, 0));
// 2. Exibindo todas as consultas agendadas inicialmente
listarConsultas();
// 3. Cancelando uma consulta
cancelarConsulta('consulta-2');
// 4. Marcando uma consulta como concluída
concluirConsulta('consulta-1');
// 5. Tentando cancelar uma consulta inexistente
cancelarConsulta('consulta-99');
// 6. Listando todas as consultas para ver o resultado das operações
listarConsultas();
// 7. Listando consultas por status para verificar o filtro
listarPorStatus('agendada');
listarPorStatus('concluída');
listarPorStatus('cancelada');
