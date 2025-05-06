document.getElementById("calcular").addEventListener("click", function () {
    const modo = document.querySelector('input[name="modo"]:checked').value;
    const dataEntrada = new Date(document.getElementById("dataEntrada").value);
    const dataSaida = new Date(document.getElementById("dataSaida").value);
    const valor = parseFloat(document.getElementById("valor").value);
    const freetime = document.getElementById("freetime").value.trim();
  
    if (!dataEntrada || !dataSaida || !valor || !freetime) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    if (isNaN(valor) || valor <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }
  
    if (dataEntrada >= dataSaida) {
      alert("A data de entrada deve ser anterior à de saída.");
      return;
    }
  
    const diffMin = (dataSaida - dataEntrada) / 60000;
  
    if (modo === "hora") {
      if (diffMin < 60) {
        alert("A operação durou menos de 1h, cálculo de estadia somente a partir de uma hora completa.");
        return;
      }
  
      const [fh, fm] = freetime.split(":").map(Number);
      const freetimeMin = (isNaN(fh) ? 0 : fh * 60) + (isNaN(fm) ? 0 : fm);
  
      const cobradosMin = diffMin - freetimeMin;
      if (cobradosMin <= 0) {
        alert("O tempo de freetime é maior ou igual ao tempo total.");
        return;
      }
  
      const horasCobradas = cobradosMin / 60;
      const valorTotal = horasCobradas * valor;
  
      document.getElementById("horasCobradas").innerText = horasCobradas.toFixed(2);
      document.getElementById("valorTotal").innerText = valorTotal.toFixed(2);
    }
  
    if (modo === "dia") {
      const diffDias = (dataSaida - dataEntrada) / (1000 * 60 * 60 * 24);
      const freetimeDias = parseFloat(freetime);
      if (isNaN(freetimeDias) || freetimeDias < 0) {
        alert("Insira o freetime em dias (ex: 2 ou 0.5).");
        return;
      }
  
      let diasCobrados = diffDias - freetimeDias;
      if (diasCobrados <= 0) {
        alert("O tempo de freetime é maior ou igual ao tempo total.");
        return;
      }
  
      diasCobrados = Math.ceil(diasCobrados); // arredonda pra cima
      const valorTotal = diasCobrados * valor;
  
      document.getElementById("horasCobradas").innerText = diasCobrados;
      document.getElementById("valorTotal").innerText = valorTotal.toFixed(2);
    }
  });
  