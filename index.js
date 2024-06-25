let mensagemInicial =
  "Seja bem-vindo! O que você deseja fazer agora?\n\t1 - Adicionar consulta\n\t2 - Listar todas as consultas\n\t3 - Atualizar consultas\n\t4 - Cancelar uma consulta\n\t5 - Sair\n";
let opcao = 0;
let paciente = {
  nome: "",
  médico: "",
  data: "",
  hora: "",
};
let entradaUsuario;
const CONSULTAS = [];
console.log(mensagemInicial);
process.stdin.on("data", function (data) {
  if (opcao == 0) {
    opcao = +data.toString().trim();
    if (opcao == 1) {
      console.log("Informe o nome do paciente:");
    }
  }else{
   switch (opcao) {
//processo de adicionar consultas    
      case 1:
        if (!paciente.nome) {
          console.log("aq chegou")  
          paciente.nome = data.toString().trim();
          console.log("Agora informe qual médico irá atendê-lo:");
        } else if (!paciente.médico) {
          paciente.médico = data.toString().trim();
          console.log("Informe a data da consulta:");
        } else if (!paciente.data) {
          paciente.data = data.toString().trim();
          console.log("Por fim, qual o horário da consulta?");
        } else if (!paciente.hora) {
          paciente.hora = data.toString().trim();
          console.log("Consulta cadastrada com sucesso!");
          CONSULTAS.push(paciente);
          paciente = {
              nome: "",
              médico: "",
              data: "",
              hora: "",
            };
          console.log(mensagemInicial);
//---------------------------------------------------------
        }
        break;

      default:
        break;
    }
  }
});