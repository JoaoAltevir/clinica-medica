//variaveis-------------------------------------
let mensagemInicial =
  "Seja bem-vindo! O que você deseja fazer agora?\n\t1 - Adicionar consulta\n\t2 - Listar todas as consultas\n\t3 - Atualizar consultas\n\t4 - Cancelar uma consulta\n\t5 - Sair\n";
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
console.log(mensagemInicial);
process.stdin.on("data", function (data) {
  let input = data.toString().trim();
  if (opcao == 0) {
    opcao = +input;
    if (opcao == 1) {
      console.log("Informe o nome do paciente:");
    }else if(opcao == 2){
      console.log("Pressione ENTER para aparecer")
    }else if(opcao == 4){
      console.log("Informe o nome do paciente que deseja cancelar:")
    }else if(opcao == 5){
      console.log("Deseja mesmo sair?")
    }
  }else{
   switch (opcao) {
//-------------------------------------------------------------------------
//processo de adicionar consultas    
      case 1:
        if (!paciente.nome) { 
          paciente.nome = input;
          console.log("Agora informe qual médico irá atendê-lo:");
        } else if (!paciente.medico) {
          paciente.medico = input;
          console.log("Informe a data da consulta:");
        } else if (!paciente.data) {
          paciente.data = input;
          console.log("Por fim, qual o horário da consulta?");
        } else if (!paciente.hora) {
          paciente.hora = input;
          console.log("Consulta cadastrada com sucesso!");
          paciente.status = "Agendado"
          CONSULTAS.push(paciente);
          paciente = {
              nome: "",
              medico: "",
              data: "",
              hora: "",
            };
          console.log(mensagemInicial);
          opcao = 0
        }
        break;
//-------------------------------------------------------------------------
//processo de listagem conforme status da consulta;
        case 2:
          for(let i = 0;i < CONSULTAS.length;i++){
            if(CONSULTAS[i].status == "Agendado"){
              console.log(CONSULTAS[i])
            }  
          }
          console.log("\n", mensagemInicial); 
          opcao = 0;
        break;
//-------------------------------------------------------------------------
//processo de exclusão
        case 4:
          if(!excluirUsuario){
            excluirUsuario = data.toString().trim();
            console.log("Pressione ENTER para continuar")
          }else if(rodou == 0){
          for(let i = 0; i < CONSULTAS.length;i++){
              if(excluirUsuario == CONSULTAS[i].nome){
                console.log("Registro", i, "\n", CONSULTAS[i]);
                indice = i;
                achou++
                rodou = 1;
              }
            }if(achou > 1){//if caso tenha mais de um paciente com o mesmo nome
              console.log("Qual registro você deseja apagar?")
              if(!escolhaUsuario){
                escolhaUsuario = +data.toString().trim();
              }else{
                console.log("Consulta cancelada!");
                CONSULTAS[escolhaUsuario].status = "Cancelado";
                rodou = 0;
                opcao = 0;
                console.log(mensagemInicial);
              }
            }else if(achou == 1){//if caso tenha encontrado somente 1 paciente com o nome;
              console.log("Consulta cancelada!")
              CONSULTAS[indice].status = "Cancelado"
              opcao = 0;
              console.log(mensagemInicial);
            }else{
              console.log("Registro não encontrado!\n");
              opcao = 0;
              console.log(mensagemInicial);
            }
          }
          break;
          
//-------------------------------------------------------------------------
//processo de saída e confirmação de saída
        case 5:
          if(!entradaUsuario){
            entradaUsuario = data.toString().trim().toLowerCase();
          }if(entradaUsuario == "sim" || entradaUsuario == "s"){
            console.log("Encerrando sistema...")
            process.exit();
          }else if(entradaUsuario == "não" || entradaUsuario == "nao" || entradaUsuario == "n"){
            opcao = 0;
            console.log(mensagemInicial);
          }else{
            console.log("Opção Inválida, comece novamente");
            opcao = 0;
            console.log(mensagemInicial);
          }
          break;
//-------------------------------------------------------------------------
      default:
        console.log("Opção inválida, tente novamente...");
        opcao = 0;
        console.log(mensagemInicial)
        break;
    }
  }
});