// Atividades Práticas
// Sistema de Agendamento de Consultas
// Descrição: Criar um programa que gerencie consultas médicas ou de serviços.

// Definir Interface - ok
// Criar interface com todos os campos (obrigatórios, opcionais e que aceitam null)

// Criar Array Tipado
// Implementar array tipado com a interface para armazenar os registros

// Interface Consulta
// Campos obrigatórios: id (string), paciente (string), data (Date)
// Campos opcionais: observacoes?: string, dataCancelamento?: Date | null
// Status: status: "agendada" | "concluída" | "cancelada"

// Implementar CRUD
// Desenvolver funções de CRUD (cadastrar, listar, atualizar, excluir/concluir)

// Funções
// agendarConsulta() → cria uma nova consulta
// cancelarConsulta() → recebe id e atribui dataCancelamento
// listarConsultas() → exibe todas as consultas com status
// listarPorStatus(status: string) → filtra por status
// Uso de null/undefined e union: dataCancelamento inicia como null e só recebe valor quando cancelada. observacoes é opcional e pode ser undefined.

// Testar Fluxo
// Criar alguns objetos e executar no console para validar funcionamento

//-----------------------------------------------------

/**
 * `Consulta`
 * Define a estrutura de um objeto de consulta, garantindo a consistência dos dados.
 *
 * id - Identificador único da consulta.
 * paciente - Nome do paciente.
 * data - Data e hora da consulta.
 * status {'agendada' | 'concluída' | 'cancelada'} - O status atual da consulta, usando um union type para limitar as opções.
 * observacoes - Campo opcional para notas adicionais sobre a consulta.
 * dataCancelamento {Date | null} - Data de cancelamento da consulta, opcional e pode ser null se a consulta não foi cancelada.
 */
interface Consulta {
  id: string;
  paciente: string;
  data: Date;
  status: 'agendada' | 'concluída' | 'cancelada';
  observacoes?: string;
  dataCancelamento?: Date | null;
}

/**
 * `consultas`
 * Um array tipado que atua como o banco de dados em memória para armazenar os objetos `Consulta`.
 */
const consultas: Consulta[] = [];

// --- Funções de Operações (CRUD) ---

/**
 * `agendarConsulta`
 * Cria e adiciona uma nova consulta ao array `consultas`.
 *
 * paciente - O nome do paciente para o qual a consulta será agendada.
 * data - O objeto Date contendo a data e hora da consulta.
 * observacoes - Um campo opcional para anotações sobre a consulta.
 *
 * Um ID simples é gerado para este exemplo, usando o tamanho atual do array.
 *
 * dataCancelamento é definido como `null` por padrão, pois a consulta é agendada com sucesso.
 */
function agendarConsulta(
  paciente: string,
  data: Date,
  observacoes?: string
): void {
  const novaConsulta: Consulta = {
    id: `consulta-${consultas.length + 1}`,
    paciente,
    data,
    status: 'agendada',
    observacoes,
    dataCancelamento: null,
  };
  consultas.push(novaConsulta);
  console.log(
    `\n> Consulta para "${paciente}" agendada com sucesso!\n> ID: ${novaConsulta.id}`
  );
}

/**
 * `listarConsultas`
 * Exibe todas as consultas cadastradas no console, incluindo detalhes como status,
 * observações e data de cancelamento, se aplicável.
 */
function listarConsultas(): void {
  console.log('\n--- Lista Completa de Consultas ---');
  if (consultas.length === 0) {
    console.log('Nenhuma consulta encontrada no sistema.');
    return;
  }
  consultas.forEach((consulta) => {
    // A formatação de data é um ponto importante para a legibilidade, usando toLocaleString().
    let detalhes = `ID: ${consulta.id} | Paciente: ${
      consulta.paciente
    } | Data: ${consulta.data.toLocaleString()} | Status: ${consulta.status}`;
    // Verificação de campos opcionais (`?` e `null`) antes de exibi-los.
    if (consulta.observacoes) {
      detalhes += `\nObservações: ${consulta.observacoes}`;
    }
    if (consulta.dataCancelamento) {
      detalhes += `\nCancelada em: ${consulta.dataCancelamento.toLocaleString()}`;
    }
    console.log(detalhes);
  });
}

/**
 * `listarPorStatus`
 * Filtra e exibe consultas com base em um status específico.
 *
 * status {'agendada' | 'concluída' | 'cancelada'} - O status pelo qual as consultas serão filtradas.
 */
function listarPorStatus(status: 'agendada' | 'concluída' | 'cancelada'): void {
  const consultasFiltradas = consultas.filter(
    (consulta) => consulta.status === status
  );
  console.log(`\n--- Consultas com Status "${status}" ---`);
  if (consultasFiltradas.length === 0) {
    console.log(`\nNenhuma consulta encontrada com o status "${status}".`);
  } else {
    consultasFiltradas.forEach((consulta) => {
      console.log(
        `ID: ${consulta.id} | Paciente: ${
          consulta.paciente
        } | Data: ${consulta.data.toLocaleString()}`
      );
    });
  }
}

/**
 * `cancelarConsulta`
 * Encontra uma consulta pelo ID e altera seu status para "cancelada",
 * atribuindo a data de cancelamento.
 */
function cancelarConsulta(id: string): void {
  const consulta = consultas.find((c) => c.id === id);
  if (!consulta) {
    console.log(`\nErro: Consulta com ID "${id}" não encontrada.`);
    return;
  }

  if (consulta.status === 'cancelada') {
    console.log(`\nA consulta com ID "${id}" já está cancelada.`);
    return;
  }

  // Atualização dos campos `status` e `dataCancelamento`.
  consulta.status = 'cancelada';
  consulta.dataCancelamento = new Date();
  console.log(
    `\nConsulta com ID "${id}" cancelada com sucesso em ${consulta.dataCancelamento.toLocaleString()}.`
  );
}

/**
 * `concluirConsulta`
 * Encontra uma consulta pelo ID e altera seu status para "concluída".
 */
function concluirConsulta(id: string): void {
  const consulta = consultas.find((c) => c.id === id);
  if (!consulta) {
    console.log(`\nErro: Consulta com ID "${id}" não encontrada.`);
    return;
  }

  if (consulta.status === 'concluída') {
    console.log(`\nA consulta com ID "${id}" já está concluída.`);
    return;
  }

  // Atualização do campo `status`.
  consulta.status = 'concluída';
  console.log(`\nConsulta com ID "${id}" marcada como concluída.`);
}

// --- Teste de Fluxo ---

console.log('\n--- Iniciando o Sistema de Agendamento ---');

// 1. Agendando consultas
agendarConsulta(
  'João da Silva',
  new Date(2025, 9, 20, 10, 0),
  'Exame de rotina'
);
agendarConsulta('Maria Oliveira', new Date(2025, 9, 21, 14, 30));
agendarConsulta(
  'Pedro Santos',
  new Date(2025, 9, 22, 9, 0),
  'Avaliação inicial'
);
agendarConsulta('Ana Paula', new Date(2025, 9, 23, 11, 0));

// 2. Exibindo o estado inicial das consultas
listarConsultas();

// 3. Operações de atualização de status
cancelarConsulta('consulta-2');
concluirConsulta('consulta-1');
cancelarConsulta('consulta-4'); // Cancelando mais uma para testar

// 4. Tentando operações em IDs inexistentes ou já alterados
concluirConsulta('consulta-1'); // Tentando concluir uma já concluída
cancelarConsulta('consulta-99'); // ID inexistente

// 5. Verificando o estado final
listarConsultas();

// 6. Listando por status para verificar o filtro
listarPorStatus('agendada');
listarPorStatus('concluída');
listarPorStatus('cancelada');
