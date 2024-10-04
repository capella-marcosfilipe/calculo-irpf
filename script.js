// Marcos Filipe Capella - PPW - UNICAP

function calcularAliquota(salario, impostoDevido) {
  return (impostoDevido / salario) * 100;
}

function calcularImpostoDevido(salario) {
  // Faixas tributáveis de acordo com a Lei 14.848/2024
  const faixasIRPF = [
    { limite: 27110.4, aliquota: 0 }, // Faixa de isenção
    { limite: 33919.8, aliquota: 0.075 }, // 7,5% para rendas acima de 27.110,40 até 33.919,80
    { limite: 45012.6, aliquota: 0.15 }, // 15% para rendas acima de 33.919,80 até 45.012,60
    { limite: 55976.16, aliquota: 0.225 }, // 22,5% para rendas acima de 45.012,60 até 55.976,16
    { limite: Infinity, aliquota: 0.275 }, // 27,5% para rendas acima de 55.976,16
  ];

  let impostoAPagar = 0;
  let limiteAnterior = 0;

  for (const faixa of faixasIRPF) {
    // Verifica se a renda está acima do limite anterior
    if (salario > limiteAnterior) {
      // A renda tributável é a diferença entre a renda e o limite anterior, mas não pode ultrapassar o limite da faixa atual
      const rendaTributavel = Math.min(salario, faixa.limite) - limiteAnterior;
      // Calcula o imposto a pagar multiplicando a renda tributável pela alíquota
      impostoAPagar += rendaTributavel * faixa.aliquota;
      // Atualiza o limiteAnterior com a atual para a próxima iteração
      limiteAnterior = faixa.limite;
    }
  }

  return impostoAPagar;
}

function calculateIRPF() {
  const renda = parseFloat(document.getElementById("income").value); // Captura o valor da renda do input
  const output = document.getElementById("output"); // Captura o elemento de saída

  // Verifica se a renda é um número válido ou não negativo
  if (isNaN(renda) || renda < 0) {
    output.innerHTML = "Insira uma renda válida.";
    return;
  }

  // Calcula o imposto devido chamando calcularImpostoDevido
  const impostoDevido = calcularImpostoDevido(renda);
  // Calcula a alíquota efetiva usando o salário e o impostoDevido
  const aliquotaEfetiva = calcularAliquota(renda, impostoDevido);

  output.style.backgroundColor = "#ffccf2";
  output.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  // Atualiza a saída com os valores calculados
  output.innerHTML = `<b>Imposto a pagar será de:</b> R$ ${impostoDevido.toFixed(
    2
  )}<br>
                        <b>Alíquota efetiva:</b> ${aliquotaEfetiva.toFixed(
                          2
                        )}%`;
}
