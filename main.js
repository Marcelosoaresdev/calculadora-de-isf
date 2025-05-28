const perfis = [
  {
    nome: "O Sobrevivente",
    faixa: [0, 20],
    class: "profile-danger",
    caracteristicas:
      "Dívidas constantes, conta no negativo, vive de salário em salário. A renda mensal é totalmente consumida por despesas básicas, empréstimos ou parcelas, sem espaço para planejamento. Qualquer imprevisto representa um risco real de colapso financeiro.",
    desafios:
      "Enfrenta juros abusivos, nome negativado e uma sensação constante de aperto financeiro. A instabilidade emocional é grande, com impactos diretos na saúde e nos relacionamentos. O ciclo de endividamento tende a se perpetuar se não houver intervenção.",
    mentalidade:
      "Predomina a crença de que 'dinheiro nunca dá', que 'a vida é assim mesmo' ou que 'quem nasce pobre vai morrer pobre'. Há desmotivação para mudar porque o foco está em sobreviver ao mês atual.",
    proximo:
      "É essencial retomar o controle básico das finanças, entender para onde o dinheiro está indo, cortar desperdícios, renegociar dívidas e iniciar um plano para sair do vermelho. A organização e a educação financeira são os primeiros passos para quebrar o ciclo.",
  },
  {
    nome: "O Equilibrista",
    faixa: [20, 40],
    class: "profile-warning",
    caracteristicas:
      "Consegue pagar as contas em dia e evita dívidas, mas vive no limite. Qualquer imprevisto — como um conserto de carro ou uma conta médica — causa desajuste. O planejamento de longo prazo ainda não existe, e o orçamento costuma ser apertado.",
    desafios:
      "Não consegue formar uma reserva de emergência. Pequenas decisões impulsivas geram desperdício de dinheiro, que poderia ser melhor direcionado. Falta clareza sobre metas financeiras e o hábito de poupar ainda não está consolidado.",
    mentalidade:
      "Há uma sensação de alívio por não estar endividado, mas também uma resistência a investir por acreditar que isso exige muito dinheiro ou conhecimento. Frases como 'pelo menos estou em dia' ou 'investimento é coisa de rico' são comuns.",
    proximo:
      "O caminho envolve mapear os gastos com mais precisão, cortar vazamentos financeiros, criar uma reserva de emergência e começar a entender como funciona o mundo dos investimentos. A mudança de mentalidade é tão importante quanto a ação prática.",
  },
  {
    nome: "O Poupador",
    faixa: [40, 60],
    class: "profile-ok",
    caracteristicas:
      "O hábito de gastar menos do que ganha já é um grande passo. Existe uma preocupação em construir reservas e manter certa organização financeira, mas o potencial de crescimento do dinheiro pode não estar sendo explorado plenamente.",
    desafios:
      "Identificar oportunidades para que o dinheiro guardado renda mais e proteger-se contra a desvalorização do tempo e da inflação. Sair da zona de conforto do simples acúmulo e buscar novas formas de fazer o patrimônio evoluir.",
    mentalidade:
      "A disciplina financeira está melhorando, surge a vontade de avançar, aprender mais sobre investimentos e entender como o dinheiro pode trabalhar de forma mais ativa para o futuro.",
    proximo:
      "O próximo passo pode envolver ampliar o conhecimento sobre diferentes tipos de investimento e dar os primeiros passos fora do básico, buscando mais autonomia e segurança para o futuro.",
  },
  {
    nome: "O Investidor",
    faixa: [60, 80],
    class: "profile-ok",
    caracteristicas:
      "Neste estágio, os recursos disponíveis permitem ir além da reserva de emergência. Surge o interesse em usar o dinheiro para conquistar objetivos maiores, seja aprendendo sobre investimentos, buscando novas opções ou dando os primeiros passos fora da poupança.",
    desafios:
      "Consolidar hábitos de investimento e ampliar o conhecimento sobre diferentes produtos financeiros. A ansiedade com oscilações e o medo de perder dinheiro podem aparecer, assim como a dúvida sobre onde e como investir melhor.",
    mentalidade:
      "O olhar se volta para o longo prazo, com o desejo de ver o dinheiro crescer de verdade. A ideia de que o dinheiro pode trabalhar a favor já faz parte do pensamento, mesmo que ainda existam dúvidas e inseguranças.",
    proximo:
      "Aprofundar o aprendizado, experimentar novas estratégias e buscar mais informação ajudam a transformar intenção em prática e a aumentar a confiança como investidor.",
  },
  {
    nome: "O Livre",
    faixa: [80, 100],
    class: "profile-ok",
    caracteristicas:
      "Neste estágio, é comum já ter acumulado grande patrimônio e reduzido bastante os gastos em relação à renda. No entanto, a verdadeira liberdade financeira envolve também ter uma renda passiva estável e suficiente, além de uma mentalidade voltada à autonomia e impacto.",
    desafios:
      "Manter e crescer o patrimônio e a renda passiva, além de pensar em legado e contribuição para outros.",
    mentalidade:
      "O trabalho é uma escolha, não obrigação. O foco pode se voltar para realização pessoal e impacto.",
    proximo:
      "Expandir o impacto, consolidar a segurança e, se desejar, ajudar outros a alcançar esse estágio.",
  },
];

function identificarPerfil(isf) {
  for (const p of perfis) {
    if (
      (isf >= p.faixa[0] && isf < p.faixa[1]) ||
      (p.faixa[1] === 100 && isf === 100)
    ) {
      return p;
    }
  }
  return perfis[0];
}

document.getElementById("formISF").onsubmit = function (e) {
  e.preventDefault();
  const renda = parseFloat(
    document.getElementById("renda").value.replace(",", ".")
  );
  const gastos = parseFloat(
    document.getElementById("gastos").value.replace(",", ".")
  );
  if (isNaN(renda) || isNaN(gastos) || renda <= 0 || gastos < 0) {
    alert("Preencha todos os valores corretamente!");
    return;
  }
  let isf = ((renda - gastos) / renda) * 100;
  isf = Math.max(0, Math.round(isf)); // não pode ser negativo
  const perfil = identificarPerfil(isf);

  // Atualiza resultado
  document.getElementById("isfValue").textContent = `Seu ISF: ${isf}%`;
  const pName = document.getElementById("profileName");
  pName.textContent = perfil.nome;
  pName.className = "profile-name " + perfil.class;
  // Divide o texto do perfil em partes usando <br> como separador
  document.getElementById("profileCaracteristicas").textContent =
    perfil.caracteristicas;
  document.getElementById("profileDesafios").textContent = perfil.desafios;
  document.getElementById("profileMentalidade").textContent =
    perfil.mentalidade;
  document.getElementById("profileProximo").textContent = perfil.proximo;

  // Anima barra
  const bar = document.getElementById("barISF");
  const novoValor = `${Math.min(isf, 100)}%`;

  // Força a barra a voltar para 0% (com transição)
  bar.style.transition = "none"; // remove transição
  bar.style.width = "0%";

  // Aguarda um frame para aplicar a transição
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bar.style.transition = "width 1.2s cubic-bezier(0.62, 0.28, 0.23, 0.99)";
      bar.style.width = novoValor;
    });
  });

  document.getElementById("resultSection").classList.add("active");
  setTimeout(() => {
    document.getElementById("resultSection");
  }, 300);
};
