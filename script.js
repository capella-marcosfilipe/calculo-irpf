function calculateIRPF(renda) {
    // Faixas tributáveis de acordo com Lei 14.848/2024
    const faixasIRPF = [
        { limite: 27110.4, aliquota: 0 },
        { limite: 33919.8, aliquota: 0.075 },
        { limite: 45012.6, aliquota: 0.15 },
        { limite: 55976.16, aliquota: 0.225 },
        { limite: Infinity, aliquota: 0.275 } // Acima de R$4.664,68 mensais
    ];

    let impostoAPagar = 0;
    let limiteAnterior = 0;

    for (const faixa of faixasIRPF) {
        // Se a renda é maior que a faixa do limite anterior,  entra nesta
        if (renda > limiteAnterior) {
            // Se a renda preenche esta faixa, rendaTributavel é a diferença desta faixa com a anterir, se for menor que a faixa, será a diferença da renda em si menos a anterior. 
            const rendaTributavel = Math.min(renda, faixa.limite) - limiteAnterior;
            // impostoAPagar é a parte tributável multiplicada pela alíquota da faixa atual.
            impostoAPagar += rendaTributavel * faixa.aliquota;
            // Atualizo o limiteAnterior com a atual para a próxima iteração.
            limiteAnterior = faixa.limite;
        }
    }

    return impostoAPagar;
}