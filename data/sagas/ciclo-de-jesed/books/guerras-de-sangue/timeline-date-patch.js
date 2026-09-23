(() => {
  'use strict';
  const D = window.DI_DATA; if (!D || !D.timeline) return;
  const DATES = {
    'jesed-event-origin-polar': ['Ciclo 1 D.Q. — início da organização da Raiz Polar e da futura Kaendar.', 1000000],
    'jesed-event-night-garganta': ['Ciclo 760 D.Q. — Noite da Garganta, morte de Reckaro e ascensão de Orionus.', 160000000],
    'jesed-event-lirron-law': ['Início do reinado de Orionus, por volta de 760–761 D.Q.', 160001000],
    'jesed-event-ylvena-arrives': ['Ciclo 785 D.Q. — Ylvena e Daryon deixam Noreval e entram em Kaendar.', 180000000],
    'jesed-event-death-orionus': ['Ciclo 800 D.Q. — Orionus morre após beber o veneno destinado a Alyra.', 199000000],
    'jesed-event-exile-ylvena': ['Ciclo 800 D.Q. — Ylvena é expulsa e Kaelina e Alyra tornam-se soberanas conjuntas.', 199001000],
    'jesed-event-chapter-01': ['803 D.Q. · 1º mês · Dia 1 — Dois jovens Polar são encontrados mortos.', 200000100],
    'jesed-event-chapter-02': ['803 D.Q. · 1º mês · Noite do Dia 1 — Kaelina invoca a Lei do Portão.', 200000200],
    'jesed-event-chapter-03': ['803 D.Q. · 1º mês · Dias 2–3 — Veyr entrega o ultimato Polar a Velarim.', 200000300],
    'jesed-event-chapter-04': ['803 D.Q. · 1º mês · Dia 2 — A Câmara aprova a aplicação da Lei do Portão.', 200000400],
    'jesed-event-chapter-05': ['803 D.Q. · 1º mês · Dias 5–6 — Alyra contrata os Homens das Areias.', 200000500],
    'jesed-event-chapter-07': ['803 D.Q. · 1º mês · Dia 8 — Velarim é destruída.', 200000600],
    'jesed-event-chapter-06': ['803 D.Q. · 1º mês · Dia 9 — A Lei do Portão termina em massacre.', 200000700],
    'jesed-event-chapter-09': ['803 D.Q. · 1º mês · Dias 10–11 — Rendar leva a queda de Velarim aos Buldar.', 200000800],
    'jesed-event-chapter-08': ['803 D.Q. · 1º mês · Dias 10–13 — Kaelina retorna ao povo e encontra Marken.', 200000900],
    'jesed-event-chapter-10': ['803 D.Q. · 1º mês · Dia 14 — Alyra fortalece a mentira que sustenta a guerra.', 200001000],
    'jesed-event-chapter-11': ['803 D.Q. · 1º mês · Dias 14–19 — A guerra recebe o fogo Vendrar.', 200001100],
    'jesed-event-chapter-12': ['803 D.Q. · 1º mês · Dias 20–21 — O rio é contaminado e Alestir é incendiada.', 200001200],
    'jesed-event-chapter-13': ['803 D.Q. · 1º mês · Dia 22 — Cal Edran morre e Kaelina começa a seguir as contradições.', 200001300],
    'jesed-event-chapter-15': ['803 D.Q. · 1º mês · Dias 23–24 — Torgun morre durante a emboscada Urtistar.', 200001400],
    'jesed-event-chapter-14': ['803 D.Q. · 1º mês · Dias 23–27 — A crise da água rompe o equilíbrio interno de Kaendar.', 200001500],
    'jesed-event-chapter-16': ['803 D.Q. · 1º mês · Dias 24–28 — Tavra chega à Terra Preta e reforça a aliança.', 200001600],
    'jesed-event-chapter-17': ['803 D.Q. · 1º mês · Dia 28 — A origem do poder de Daryon entra na investigação.', 200001700],
    'jesed-event-chapter-18': ['803 D.Q. · 1º mês · Dias 29–30 — Kaelina encontra em Noreval a origem comum de Daryon e Ylvena.', 200001800],
    'jesed-event-chapter-19': ['803 D.Q. · transição do 1º para o 2º mês — Kaelina é capturada e levada a Khar-Tondr.', 200001900],
    'jesed-event-chapter-20': ['803 D.Q. · transição entre os meses — A ocupação Polar da Margem dos Zírrios é destruída.', 200002000],
    'jesed-event-chapter-21': ['803 D.Q. · 2º mês · Dias 4–6 — Kaelina é transformada em refém contra Alyra.', 200002100],
    'jesed-event-chapter-22': ['803 D.Q. · 2º mês · Dias 6–7 — A aliança inicia a marcha final contra Kaendar.', 200002200],
    'jesed-event-chapter-23': ['803 D.Q. · 2º mês · Noite do Dia 8 — Começa o cerco de Kaendar.', 200002300],
    'jesed-event-return-kaendar': ['803 D.Q. · 2º mês · Noite do Dia 8 — Kaelina regressa a Kaendar durante o cerco.', 200002400],
    'jesed-event-confession-ylvena': ['803 D.Q. · 2º mês · Noite do Dia 8 — Ylvena revela a verdade sobre Orionus.', 200002500],
    'jesed-event-tavra-fall': ['803 D.Q. · 2º mês · Madrugada do Dia 9 — Tavra cai da torre de Kaendar.', 200002600],
    'jesed-event-daryon-confesses': ['803 D.Q. · 2º mês · Amanhecer do Dia 9 — Daryon confessa e morre.', 200002700],
    'jesed-event-rendar-death': ['803 D.Q. · 2º mês · Amanhecer do Dia 9 — Rendar é morto sob palavra de passagem.', 200002800],
    'jesed-event-kaelina-coup': ['803 D.Q. · 2º mês · Dia 16 — Kaelina suspende a Mesa e assume a soberania.', 200002900],
    'jesed-event-alyra-exile': ['803 D.Q. · 2º mês · Dia 19 — Alyra é exilada de Kaendar.', 200003000],
    'jesed-event-markoso-disappears': ['803 D.Q. · 2º mês · Dia 20 — Marken desaparece da galeria oeste.', 200003100],
    'jesed-event-kaelina-reign': ['803–823 D.Q. — Vinte ciclos de reconstrução e estabilidade sob Kaelina.', 220000000]
  };
  for (const entry of D.timeline) {
    const fix = DATES[entry.id];
    if (!fix) continue;
    entry.dateLabel = fix[0];
    entry.period = fix[0];
    entry.sortKey = fix[1];
  }
  D.timeline.sort((a, b) => a.sortKey - b.sortKey || a.name.localeCompare(b.name, 'pt-BR'));
})();
