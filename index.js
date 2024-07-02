const PromptSync = require("prompt-sync");

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
let achou = 0;
let indice;
let excluirUsuario;
let escolhaUsuario;
let rodou = 0;
//----------------------------------------------
//funções
function menu() {
  console.log(
    "Seja bem-vindo! O que você deseja fazer agora?\n\t1 - Adicionar consulta\n\t2 - Listar todas as consultas\n\t3 - Atualizar consultas\n\t4 - Cancelar uma consulta\n\t5 - Sair\n"
  );
}
function cadastro() {
  paciente.nome = prompt("Informe o nome do paciente:");
  paciente.medico = prompt("Agora informe qual médico irá atendê-lo");
  paciente.data = prompt("Informe a data da consulta (XX/XX/XXXX):");
  paciente.hora = prompt("Por fim, qual o horário da consulta?(XX:XX)");
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
    }
  }
  console.log("\n");
}


//----------------------------------------------
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
      escolhaUsuario = +prompt("Qual é o registro que deseja alterar? (digite o número):");
      alterar(escolhaUsuario);
    } else if (opcao == 4) {
      console.log("Informe o nome do paciente que deseja cancelar:");
    } else if (opcao == 5) {
      console.log("Deseja mesmo sair?");
    }
  } else {
    switch (opcao) {
    //------------------------------------------------------------------------
      //processo de exclusão
      case 4:
        if (!excluirUsuario) {
          excluirUsuario = input;
          console.log("Pressione ENTER para continuar");
        } else if (rodou == 0) {
          for (let i = 0; i < CONSULTAS.length; i++) {
            if (
              excluirUsuario == CONSULTAS[i].nome &&
              CONSULTAS[i].status == "Agendado"
            ) {
              console.log("Registro", i, "\n", CONSULTAS[i]);
              indice = i;
              achou++;
              rodou = 1;
            }
          }
          if (achou > 1) {
            console.log("Qual registro você deseja apagar?");
          }
        } else if (achou > 1) {
          //if caso tenha mais de um paciente com o mesmo nome
          if (!escolhaUsuario) {
            escolhaUsuario = data.toString().trim();
            console.log("Consulta cancelada!");
            CONSULTAS[escolhaUsuario].status = "Cancelado";
            rodou = 0;
            opcao = 0;
            achou = 0;
            escolhaUsuario = "";
            menu();
          }
        } else if (achou == 1) {
          //if caso tenha encontrado somente 1 paciente com o nome;
          console.log("Consulta cancelada!");
          CONSULTAS[indice].status = "Cancelado";
          opcao = 0;
          rodou = 0;
          achou = 0;
          menu();
        } else {
          console.log("Registro não encontrado!\n");
          opcao = 0;
          achou = 0;
          rodou = 0;
          menu();
        }
        break;

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
