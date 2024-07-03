//variaveis-------------------------------------
const prompt = require("prompt-sync")();
let opcao = 0;
let paciente = {
  nome: "",
  medico: "",
  data: "",
  hora: "",
  status: "",
};
let entradaUsuario;
const CONSULTAS = [];
let escolhaUsuario;
//----------------------------------------------
//funções
function menu() {
  console.log(
    "Seja bem-vindo! O que você deseja fazer agora?\n\t1 - Adicionar consulta\n\t2 - Listar todas as consultas\n\t3 - Atualizar consultas\n\t4 - Cancelar uma consulta\n\t5 - Sair\n"
  );
}
function cadastro() {
  paciente.nome = prompt("Informe o nome do paciente: ");
  paciente.medico = prompt("Agora informe qual médico irá atendê-lo: ");
  paciente.data = prompt("Informe a data da consulta (XX/XX/XXXX): ");
  paciente.hora = prompt("Por fim, qual o horário da consulta?(XX:XX) ");
  console.log("Consulta cadastrada com sucesso!");
  paciente.status = "Agendado";
  CONSULTAS.push(paciente);
  paciente = {
    nome: "",
    medico: "",
    data: "",
    hora: "",
  };
}
function listar() {
  for (let i = 0; i < CONSULTAS.length; i++) {
    if (CONSULTAS[i].status == "Agendado") {
      console.log("--------------------------------------------");
      console.log("Registro", i);
      console.log("\tNome:", CONSULTAS[i].nome);
      console.log("\tMédico responsável:", CONSULTAS[i].medico);
      console.log("\tDia da consulta:", CONSULTAS[i].data);
      console.log("\tHorário agendado:", CONSULTAS[i].hora);
      console.log("--------------------------------------------");
    }
  }
  console.log("\n");
}
function escolhaDadosAlterar(indice){
  let escolhaAlterar = +prompt(`Qual dado deseja alterar?
  [1]Nome
  [2]Médico
  [3]Data
  [4]Horário
  Digite sua opção: `)
  alterar(indice, escolhaAlterar);
}
function alterar(i, dadoAlterar){
  switch(dadoAlterar){
    case 1:
      CONSULTAS[i].nome = prompt("Informe o novo nome do paciente: ");
      break;
    case 2:
      CONSULTAS[i].medico = prompt("Informe o médico que irá atendê-lo: ");
      break;
    case 3:
      CONSULTAS[i].data = prompt("Informe a nova data da consulta: ");
      break;
    case 4:
      CONSULTAS[i].hora = prompt("Informe novo horário da consulta: ");
      break;
    default:
      console.log("Opção inválida, digite novamente: ");
  } 
}
function excluirUsuario(indice){
  CONSULTAS[indice].status = "Cancelado";
  console.log("Consulta cancelada com sucesso!");
}


//----------------------------------------------
//"programa principal"
menu();
process.stdin.on("data", function (data) {
  let input = data.toString().trim();
  if (opcao == 0) {
    opcao = +input;
    if (opcao == 1) {
      cadastro();
      menu();
      opcao = 0;
    } else if (opcao == 2) {
      listar();
      menu();
      opcao = 0;    
    } else if (opcao == 3) {
      listar();
      escolhaUsuario = +prompt("Qual é o registro que deseja cancelar? (digite o número): ");
      escolhaDadosAlterar(escolhaUsuario);
      menu();
      opcao = 0;
      escolhaUsuario = undefined;
    } else if (opcao == 4) {
      listar();
      escolhaUsuario = +prompt("Qual é o registro que deseja alterar? (digite o número): ");
      excluirUsuario(escolhaUsuario);
      menu();
      opcao = 0;
      escolhaUsuario = undefined;
    } else if (opcao == 5) {
      console.log("Deseja mesmo sair?");
    }
  } else {
    switch (opcao) {
//-------------------------------------------------------------------------
      //processo de saída e confirmação de saída
      case 5:
        if (!entradaUsuario) {
          entradaUsuario = input;
        }
        if (entradaUsuario == "sim" || entradaUsuario == "s") {
          console.log("Encerrando sistema...");
          process.exit();
        } else if (
          entradaUsuario == "não" ||
          entradaUsuario == "nao" ||
          entradaUsuario == "n"
        ) {
          opcao = 0;
          entradaUsuario = undefined;
          menu();
        } else {
          console.log("Opção Inválida, comece novamente");
          opcao = 0;
          menu();
        }
        break;
      //-------------------------------------------------------------------------
      default:
        console.log("Opção inválida, tente novamente...");
        opcao = 0;
        menu();
        break;
    }
  }
});
