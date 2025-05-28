const perfis = [
  {
    nome: "O Sobrevivente",
    faixa: [0, 20],
    class: "profile-danger",
    caracteristicas:
      "Dívidas constantes, conta no negativo, vive de salário em salário",
    desafios: "Juros de cartão, nome sujo, ansiedade financeira constante.",
    mentalidade: "“Nunca sobra nada”, “Rico nasce pronto”.",
    proximo: "Controle básico de gastos e quitação de dívidas emergenciais.",
  },
  {
    nome: "O Equilibrista",
    faixa: [20, 40],
    class: "profile-warning",
    caracteristicas: "Qualquer imprevisto vira crise, sem planejamento futuro.",
    desafios: "Falta de reserva e gastos desnecessários.",
    mentalidade: "“Pelo menos não devo”, “Investir é para quem ganha mais”.",
    proximo: "Criar reserva de emergência e cortar vazamentos.",
  },
  {
    nome: "O Poupador",
    faixa: [40, 60],
    class: "profile-ok",
    caracteristicas:
      "Neste estágio, uma reserva financeira já foi construída, trazendo certa tranquilidade. No entanto, o dinheiro pode estar parado ou rendendo pouco, e a segurança da poupança pode dar a sensação de que não é preciso avançar mais.",
    desafios:
      "O desafio é perceber que só acumular não basta: a inflação pode corroer o valor guardado e o medo de investir pode limitar conquistas futuras.",
    mentalidade:
      "A busca por segurança predomina, ainda que isso signifique abrir mão de maiores ganhos. Investimentos diferentes da poupança ainda parecem arriscados ou distantes da realidade.",
    proximo:
      "O próximo passo envolve buscar mais conhecimento sobre investimentos, superar crenças limitantes e diversificar para que o dinheiro realmente trabalhe a seu favor.",
  },
  {
    nome: "O Investidor",
    faixa: [60, 80],
    class: "profile-ok",
    caracteristicas:
      "Aqui, investir já faz parte da rotina: existe uma carteira, há planejamento e os aportes são constantes. Ainda assim, alcançar a verdadeira independência financeira pode depender de refinar estratégias e manter a disciplina ao longo do tempo.",
    desafios:
      "A necessidade de otimizar rendimentos e acelerar a jornada pode surgir. Novas dúvidas aparecem: será que a estratégia atual é a melhor para seus objetivos? É hora de revisar planos e buscar mais eficiência.",
    mentalidade:
      "O entendimento de que o tempo e os juros compostos são aliados já está presente. O foco se volta para o longo prazo e para o aumento do patrimônio.",
    proximo:
      "Aprofundar-se em estratégias avançadas, aumentar os aportes e manter-se informado podem ser caminhos para transformar planos em realizações concretas.",
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
