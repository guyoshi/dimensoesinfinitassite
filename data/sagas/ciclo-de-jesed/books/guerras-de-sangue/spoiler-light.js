/* Apresentações das fichas sem spoilers maiores. O texto dos capítulos continua completo. */
(() => {
  const X = window.JESED_GUERRAS_CONTEXT; if (!X) return;
  const { D } = X;
  const P = {
    'kaelina-polar': ['Soberana de Kaendar', 'Uma das duas soberanas de Kaendar. Assume o trono por dever e não por desejo, e tenta entender o método de governo de Orionus sem copiá-lo cegamente.'],
    'alyra-polar': ['Soberana de Kaendar', 'Uma das duas soberanas de Kaendar. Orgulhosa, vê a Dinastia Polar como prova de superioridade e não aceita que ninguém veja os Polar ajoelhados.'],
    'orionus-polar': ['Antigo soberano de Kaendar', 'O maior soberano da memória recente dos Polar. Durante quarenta ciclos manteve a paz aberta e foi amado pelo povo.'],
    'daryon-vess': ['Conselheiro de estratégia', 'Conselheiro de estratégia, diplomacia e influência política. Vem de uma família antiga do anel alto de Kaendar, que serve soberanos como conselheiros e escribas.'],
    'cal-edran-polar': ['Calandrir de Kaendar', 'Ocupa o cargo mais alto de protetor do soberano. Último escudo, conselheiro silencioso e memória viva de Orionus, escuta o governo inteiro sem governar.'],
    'cal-kadrir': ['Primeiro Kae', 'Comandante rígido e competente, ligado à ideia de dever. Mantém a ordem entre os guardas e protege a soberana que reconhece como legítima.'],
    'rendar': ['Caçador Fendelar', 'Um dos melhores caçadores de Velarim. Marido, pai, negociador de rotas e homem que sabe matar sem transformar isso em orgulho.'],
    'vita-fendelar': ['Companheira de Rendar', 'Afetuosa, prática e perceptiva, é o centro emocional da família de Rendar. Conhece a floresta e a escassez, e luta para preservar aquilo que a família tenta manter.'],
    'avara-fendelar': ['Velha de Trilha de Velarim', 'Líder idosa dos Fendelar. Pequena, dura e pragmática, mede acordos pelo que mantêm vivo e enxerga o perigo antes dos outros.'],
    'nara': ['Filha de Rendar e Vita · oito ciclos', 'Filha de oito ciclos de Rendar e Vita. Curiosa e ansiosa por provar que já se move como uma Fendelar, aprende a caminhar sem fazer a madeira ranger e sonha observar a floresta do alto de uma veyra.'],
    'ilo': ['Filho bebê de Rendar e Vita', 'Filho bebê de Rendar e Vita e irmão mais novo de Nara. Ainda não fala: sorri sem dentes, aperta o dedo do pai e dorme numa pequena rede suspensa.'],
    'nynestra-buldar': ['Mão da Colheita', 'Líder dos Buldar. Chegou ao poder por herança, mas se manteve por competência, mesmo pressionada por escassez e disputas internas.'],
    'kharvok': ['Voz dos Tondrar', 'Líder velho, duro e temido dos Tondrar. A ausência do nariz tornou-se parte da sua autoridade: onde outros esconderiam vergonha, ele fez da ferida um símbolo.'],
    'torgun-ossos-de-fome': ['Representante Tondrar', 'Guerreiro e contador prático de escassez, de olhos fundos e pintura negra descendo das pálpebras à mandíbula. Pensa em comida antes de orgulho.'],
    'vorlan-vendrar': ['Líder e negociador Vendrar', 'Capitão mercenário, negociador e rosto externo dos Vendrar. Fala mais que os irmãos e entende como os outros clãs querem ser provocados.'],
    'tavra-vendrar': ['Comandante Vendrar', 'Parece instável, e sabe disso: cultiva a aparência de loucura porque afasta gente fraca e irrita gente séria.'],
    'ossar-glydar': ['Lorde dos Glydar', 'Principal rosto político dos Glydar. Homem de meia-idade, largo de ombros, de olhos sempre desconfiados e roupas melhores que as do povo.'],
    'varael-glydar': ['Sobrinho de Ossar', 'Jovem adulto inteligente, bom nadador e mais próximo do povo baixo do que o tio gostaria. Acha que a entrada dos Glydar na aliança foi um erro.'],
    'saela': ['Glydar da Margem dos Zírrios', 'Mãe de Varael e irmã de Ossar. Prática, protetora e emocionalmente franca, transforma medo em ação.'],
    'markoso': ['Jovem misterioso', 'Jovem sem origem clara, que aparece em Kaendar com conhecimentos e reações que parecem não pertencer inteiramente ao presente.'],
    'ylvena': ['Antiga servidora', 'Inteligente, ferida e orgulhosa. Aprendeu a usar a aparência de serva esquecida como proteção.'],
    'sarkan-boca-partida': ['Líder dos Homens das Areias', 'Exilado Polar que transformou mutilação, fome e ressentimento em autoridade. Brutal, mas não irracional, pergunta sempre quanto vale a promessa.'],
    'veyr-polar': ['Emissário Polar', 'Agente discreto do anel alto, usado por Alyra em tarefas que exigem obediência, silêncio e distância oficial.'],
    'brokan-das-forjas': ['Mestre das forjas', 'Conselheiro responsável por armas, metal e ferramentas de Kaendar. Filho e neto de ferreiros do anel médio.'],
    'iressa-mao-de-sal': ['Conselheira de sal e rações', 'Responsável por sal, conservação de carne, rações e logística alimentar. Nascida no anel externo, subiu ao Conselho pelo trabalho.'],
    'varron-meio-olho': ['Responsável pela fronteira', 'Conselheiro de segurança de fronteira e patrulhas externas. Antigo capitão de patrulha e veterano de conflitos menores, perdeu o olho esquerdo numa emboscada.'],
    'nalia-do-rio': ['Conselheira das rotas fluviais', 'Responsável por rotas fluviais, pesca, irrigação e margens férteis. Vem de uma família de barqueiros e mediadores do anel baixo.'],
    'thoren-dos-graos': ['Conselheiro dos grãos', 'Mestre dos celeiros, colheitas e distribuição agrícola. Ligado às famílias que administram as terras férteis perto de Kaendar.'],
    'odran-porta-baixa': ['Conselheiro de portões e acessos', 'Mestre dos portões secundários e do controle de entrada nos anéis inferiores. Vem de uma linhagem de guardas de portão.'],
    'maelis-das-contagens': ['Conselheira de registros', 'Escriba principal do Conselho, responsável por votos, registros e decretos. Criada numa casa de contadores e copistas do anel médio.'],
    'yvenn-raiz-branca': ['Guardião dos costumes antigos', 'Guardião dos ritos da Raiz, das leis tradicionais e da memória espiritual da dinastia. Vem de uma ordem antiga de intérpretes da Raiz.'],
    'lurok': ['Conselheiro de comércio', 'Conselheiro de comércio externo, acordos menores e favores entre famílias. Aproxima-se de quem estiver no poder.'],
    'seron-das-obras': ['Conselheiro jurídico', 'Mediador de disputas entre anéis, famílias e ofícios. Filho de uma família envolvida em julgamentos e acordos de compensação.'],
    'soren': ['Guarda do anel médio', 'Guarda nervoso, acostumado a circular perto dos aposentos de Alyra e a obedecer ordens sem compreendê-las por inteiro.'],
    'orven': ['Chefe de Canal Buldar', 'Chefe de Canal do setor norte Buldar. Magro e trabalhador, entende de água, comportas e famílias afetadas pela seca.'],
    'hadrun': ['Velho Mestre de Celeiro', 'Ancião Buldar áspero e experiente. Entende de fome, de logística de marcha e do valor de uma panela dividida.'],
    'kahul': ['Capitão Urtistar', 'Capitão ou representante militar de grande peso entre os Urtistar, ligado à Casa Kahvar. Frio, pragmático e fiel à própria fé.'],
    'lutharus': ['Comandante Polar', 'Comandante autoritário, disciplinado e cruel na execução de ordens. Subiu pela obediência e trata povos menores como problemas.'],
    'savel': ['Velho de Noreval', 'Velho pobre de Noreval. Seco e desconfiado, olha a Dinastia a partir de telhado furado e pão caro.'],
    'harrev': ['Guarda de Kaelina', 'Soldado veterano do anel médio, formado sob Cal Edran. Sensível ao custo da guerra, conta corpos e procura nomes.'],
    'odris': ['Guarda de Kaelina', 'Antigo carregador transformado em guarda, largo, forte e veterano do serviço sob Cal Edran. Tem lealdade prática e coragem sem ostentação.'],
    'seyra-vendrar': ['Negociadora Vendrar', 'Figura Vendrar ligada às negociações de metal e fogo. Vê comércio, risco e sobrevivência como partes do mesmo cálculo.'],
    'eshvar': ['Guardião da Boca Seca', 'Guardião Tondrar associado aos acessos de Khar-Tondr e à disciplina da Boca Seca.'],
    'maedra': ['Senhora dos Tambores', 'Figura Tondrar ligada aos tambores, aos sinais coletivos e à organização ritual de Khar-Tondr.'],
    'capitao-lirron': ['Capitão ligado a Orionus', 'Capitão amado pelo povo e amigo de Orionus, lembrado em relatos históricos.']
  };
  const PERS = {
    'saela': ['Prática', 'Protetora', 'Emocionalmente franca'],
    'markoso': ['Reservado', 'Enigmático', 'Observador'],
    'ylvena': ['Inteligente', 'Orgulhosa', 'Reservada'],
    'sarkan-boca-partida': ['Brutal', 'Irônico', 'Calculista'],
    'soren': ['Nervoso', 'Obediente', 'Formal'],
    'savel': ['Seco', 'Desconfiado', 'Amargo'],
    'veyr-polar': ['Discreto', 'Obediente', 'Arrogante'],
    'capitao-lirron': ['Corajoso', 'Impulsivo', 'Intransigente'],
    'daryon-vess': ['Sedutor', 'Paciente', 'Inteligente'],
    'rendar': ['Observador', 'Resistente', 'Afetuoso com a família'],
    'nynestra-buldar': ['Calculista', 'Resiliente', 'Orgulhosa'],
    'cal-kadrir': ['Rígido', 'Competente', 'Leal ao dever']
  };
  D.characters.forEach(c => {
    const p = P[c.slug]; if (p) { c.alias = p[0]; c.summary = p[1]; c.subtitle = p[0]; }
    if (PERS[c.slug]) c.personality = PERS[c.slug];
    delete c.destiny; c.status = '';
  });
})();
