/**
 * @author: Matheus Pereira
 * @date: 21/09/2025
 *
 * Este arquivo implementa um sistema de agendamento de consultas.
 *
 * Funcionalidades:
 * - Definir uma interface `Consulta` com campos obrigatórios e opcionais.
 * - Agendar, cancelar, concluir e listar consultas.
 * - Utilizar um array tipado para armazenar os dados em memória.
 *
 * Conceitos aplicados:
 * - Interfaces
 * - Tipos (string, Date, union types)
 * - Propriedades opcionais (?)
 * - Arrays tipados
 * - Funções com parâmetros tipados
 */

//-----------------------------------------------------

/**
 * A interface `Consulta` define o formato dos objetos de agendamento.
 * Ela serve como um contrato que garante que todos os objetos de consulta
 * tenham as propriedades necessárias e os tipos corretos.
 *
 * @property {string} id - Identificador único para a consulta (ex: "consulta-1").
 * @property {string} paciente - Nome do paciente.
 * @property {Date} data - Data e hora em que a consulta ocorrerá.
 * @property {"agendada" | "concluída" | "cancelada"} status - O estado atual da consulta.
 *           O uso de `union types` restringe os valores possíveis, evitando erros.
 * @property {string} [observacoes] - Um campo opcional para anotações. O `?` indica que a propriedade pode não existir.
 * @property {Date | null} [dataCancelamento] - Data em que a consulta foi cancelada.
 *           É opcional e pode ser `null` se a consulta estiver ativa ou concluída.
 */
interface Consulta {
  id: string;
  paciente: string;
  data: Date;
  status: "agendada" | "concluída" | "cancelada";
  observacoes?: string;
  dataCancelamento?: Date | null;
}

/**
 * `consultas` é o nosso "banco de dados" em memória.
 * É um array que armazena objetos do tipo `Consulta`, garantindo
 * que todos os itens dentro dele sigam a estrutura definida pela interface.
 */
const consultas: Consulta[] = [];

/**
 * `proximoIdConsulta` é usado para gerar IDs únicos de forma simples.
 * Em uma aplicação real, isso seria gerenciado por um banco de dados.
 */
let proximoIdConsulta = 1;

// --- Funções de Operações (CRUD) ---

/**
 * Agenda uma nova consulta, criando um objeto `Consulta` e adicionando-o ao array `consultas`.
 *
 * @param {string} paciente - O nome do paciente.
 * @param {Date} data - A data e hora da consulta.
 * @param {string} [observacoes] - Anotações opcionais sobre a consulta.
 */
function agendarConsulta(paciente: string, data: Date, observacoes?: string) {
  const novaConsulta: Consulta = {
    id: `consulta-${proximoIdConsulta++}`,
    paciente,
    data,
    status: "agendada",
    observacoes,
    dataCancelamento: null,
  };
  consultas.push(novaConsulta);
  console.log(
    `\n> Consulta para "${paciente}" agendada com sucesso!\n> ID: ${novaConsulta.id}`
  );
}

/**
 * Exibe no console a lista de todas as consultas agendadas.
 * Formata a saída para facilitar a leitura, tratando campos opcionais.
 */
function listarConsultas() {
  console.log("\n--- Lista Completa de Consultas ---");
  if (consultas.length === 0) {
    console.log("Nenhuma consulta encontrada no sistema.");
    return;
  }
  consultas.forEach((consulta) => {
    // Uso de template literals para uma formatação de string mais limpa.
    let detalhes = `
----------------------------------------
  ID: ${consulta.id}
  Paciente: ${consulta.paciente}
  Data: ${consulta.data.toLocaleString()}
  Status: ${consulta.status}`;

    // Adiciona informações opcionais apenas se elas existirem.
    if (consulta.observacoes) {
      detalhes += `\n  Observações: ${consulta.observacoes}`;
    }
    if (consulta.dataCancelamento) {
      detalhes += `\n  Cancelada em: ${consulta.dataCancelamento.toLocaleString()}`;
    }
    console.log(detalhes);
  });
  console.log("----------------------------------------");
}

/**
 * Filtra e exibe as consultas que correspondem a um status específico.
 *
 * @param {"agendada" | "concluída" | "cancelada"} status - O status a ser usado como filtro.
 */
function listarPorStatus(status: "agendada" | "concluída" | "cancelada") {
  const consultasFiltradas = consultas.filter(
    (consulta) => consulta.status === status
  );
  console.log(`\n--- Consultas com Status "${status}" ---`);
  if (consultasFiltradas.length === 0) {
    console.log(`Nenhuma consulta encontrada com o status "${status}".`);
  } else {
    consultasFiltradas.forEach((consulta) => {
      console.log(
        `- ID: ${consulta.id} | Paciente: ${
          consulta.paciente
        } | Data: ${consulta.data.toLocaleString()}`
      );
    });
  }
}

/**
 * Cancela uma consulta, alterando seu status para "cancelada" e registrando a data do cancelamento.
 *
 * @param {string} id - O ID da consulta a ser cancelada.
 */
function cancelarConsulta(id: string) {
  const consulta = consultas.find((c) => c.id === id);
  if (!consulta) {
    console.log(`\nErro: Consulta com ID "${id}" não encontrada.`);
    return;
  }

  if (consulta.status === "cancelada" || consulta.status === "concluída") {
    console.log(
      `\nAviso: A consulta com ID "${id}" não pode ser cancelada, pois já está no estado "${consulta.status}".`
    );
    return;
  }

  // Atualiza o status e define a data de cancelamento.
  consulta.status = "cancelada";
  consulta.dataCancelamento = new Date();
  console.log(
    `\n> Consulta com ID "${id}" cancelada com sucesso em ${consulta.dataCancelamento.toLocaleString()}.`
  );
}

/**
 * Conclui uma consulta, alterando seu status para "concluída".
 *
 * @param {string} id - O ID da consulta a ser concluída.
 */
function concluirConsulta(id: string) {
  const consulta = consultas.find((c) => c.id === id);
  if (!consulta) {
    console.log(`\nErro: Consulta com ID "${id}" não encontrada.`);
    return;
  }

  if (consulta.status === "concluída" || consulta.status === "cancelada") {
    console.log(
      `\nAviso: A consulta com ID "${id}" não pode ser concluída, pois já está no estado "${consulta.status}".`
    );
    return;
  }

  // Atualiza o status.
  consulta.status = "concluída";
  console.log(`\n> Consulta com ID "${id}" marcada como concluída.`);
}

// --- Teste de Fluxo ---

console.log("\n--- Iniciando o Sistema de Agendamento ---");

// 1. Agendando consultas
agendarConsulta(
  "João da Silva",
  new Date(2025, 9, 20, 10, 0),
  "Exame de rotina"
);
agendarConsulta("Maria Oliveira", new Date(2025, 9, 21, 14, 30));
agendarConsulta(
  "Pedro Santos",
  new Date(2025, 9, 22, 9, 0),
  "Avaliação inicial"
);
agendarConsulta("Ana Paula", new Date(2025, 9, 23, 11, 0));

// 2. Exibindo o estado inicial das consultas
listarConsultas();

// 3. Operações de atualização de status
cancelarConsulta("consulta-2");
concluirConsulta("consulta-1");
cancelarConsulta("consulta-4"); // Cancelando mais uma para testar

// 4. Tentando operações em IDs inexistentes ou já alterados
concluirConsulta("consulta-1"); // Tentando concluir uma já concluída
cancelarConsulta("consulta-99"); // ID inexistente

// 5. Verificando o estado final
listarConsultas();

// 6. Listando por status para verificar o filtro
listarPorStatus("agendada");
listarPorStatus("concluída");
listarPorStatus("cancelada");
