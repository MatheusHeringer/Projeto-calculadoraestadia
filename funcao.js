document.getElementById("calcular").addEventListener("click", function () {
  // Obtendo os valores de entrada
  const dataEntrada = new Date(document.getElementById("dataEntrada").value);
  const dataSaida = new Date(document.getElementById("dataSaida").value);
  const valorHora = parseFloat(document.getElementById("valorHora").value);
  const freetime = document.getElementById("freetime").value;

  // Verificando se os campos obrigatórios estão preenchidos
  if (!dataEntrada || !dataSaida || !valorHora || !freetime) {
      alert("Por favor, preencha todos os campos.");
      return;
  }

  // Validação de valorHora
  if (isNaN(valorHora) || valorHora <= 0) {
      alert("Por favor, insira um valor válido para a hora.");
      return;
  }

  // Verificando se a data de entrada é anterior à data de saída
  if (dataEntrada >= dataSaida) {
      alert("A data e hora de entrada devem ser anteriores à data e hora de saída.");
      return;
  }

  // Calculando o tempo total em minutos
  const minutosTotais = (dataSaida - dataEntrada) / 60000;

  // Extraindo as horas e minutos do freetime
  const freetimeSplit = freetime.split(":");
  const freetimeHoras = parseInt(freetimeSplit[0], 10) || 0;
  const freetimeMinutos = parseInt(freetimeSplit[1], 10) || 0;

  // Convertendo o freetime para minutos
  const minutosFreetime = (freetimeHoras * 60) + freetimeMinutos;

  // Calculando os minutos cobrados
  const minutosCobrados = minutosTotais - minutosFreetime;

  // Verificando se o freetime é maior que o tempo total
  if (minutosCobrados < 0) {
      alert("O tempo de freetime não pode ser maior que o tempo total de estadia.");
      return;
  }

  // Calculando as horas cobradas e o valor total
  const horasCobradas = minutosCobrados / 60;
  const valorTotal = horasCobradas * valorHora;

  // Exibindo os resultados
  document.getElementById("horasCobradas").innerText = horasCobradas.toFixed(2);
  document.getElementById("valorTotal").innerText = valorTotal.toFixed(2);
});
