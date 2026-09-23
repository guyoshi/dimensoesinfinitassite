(() => {
  'use strict';
  const D = window.DI_DATA; if (!D || !D.characters) return;
  const splitSentences = text => String(text || '').split(/(?<=\.)\s+/).map(s => s.trim()).filter(Boolean);

  const DATA = {
    "Kaelina Polar": {
      personality: `Kaelina é responsável, empática, analítica e relutante diante do poder. Governa por dever, não por prazer, e tenta compreender pessoas antes de transformá-las em inimigos. Sua prudência nasce tanto de consciência moral quanto do medo de ser responsável por uma guerra. No início, confia demais em leis, testemunhos e boa-fé; ao longo da história, aprende que paz sem consequência também produz vítimas. É capaz de arriscar a própria vida por uma verdade e, quando finalmente assume autoridade plena, torna-se mais firme sem perder a capacidade de reconhecer o custo humano das decisões.`,
      voice: `Kaelina fala de modo ponderado, com perguntas que procuram causa, intenção e consequência. Em público, usa frases completas, evita insultos e tenta nomear o problema antes de decidir. Em privado, admite dúvida e cansaço com mais honestidade. Sob pressão, sua voz se torna baixa e cortante; quando chega a uma decisão, troca explicações por ordens claras. Usa palavras como povo, consequência, verdade, escolha, Kaendar, responsabilidade e custo.`
    },
    "Alyra Polar": {
      personality: `Alyra é orgulhosa, carismática, combativa e profundamente sensível à humilhação. Ama Kaendar, mas mistura a proteção do povo com a necessidade de preservar a superioridade da Dinastia. Tem coragem física, rapidez de decisão e capacidade de comandar, porém transforma medo em desprezo e insegurança em violência. É perspicaz o bastante para compreender fraquezas, mas prefere usá-las contra os outros. Alyra não se vê como cruel; vê-se como a única disposta a fazer aquilo que a sobrevivência exige.`,
      voice: `Alyra fala com rapidez, segurança e ironia agressiva. Usa perguntas retóricas, comparações humilhantes e frases que obrigam o interlocutor a escolher entre parecer forte ou parecer covarde. Gosta de dominar a sala por ritmo, postura e provocação. Em intimidade, a voz pode ficar mais baixa, possessiva e vulnerável. Sob ameaça, fala ainda mais depressa e corta explicações.`
    },
    "Orionus Polar": {
      personality: `Orionus é paciente, estratégico, persistente e capaz de crueldade calculada. Enxerga guerra como consequência de fome, orgulho, medo, tempo e logística, não apenas como choque de exércitos. Sua grande habilidade é alterar condições até que o adversário escolha o resultado que ele deseja. Aceita sacrificar grupos menores e criar exemplos sangrentos quando acredita que Kaendar depende disso.`,
      voice: `Orionus fala baixo, sem pressa e com frases simples que parecem óbvias apenas depois de ditas. Faz perguntas sobre pão, rota, tempo, testemunha, vergonha e saída, desviando a conversa do campo emocional escolhido pelo adversário. Seu humor é seco e sua autoridade dispensa volume. Em negociação, oferece ao outro uma forma de recuar sem perder o rosto.`
    },
    "Daryon Vess": {
      personality: `Daryon é sedutor, paciente, inteligente e perigoso. Cresceu aprendendo que percepção é poder e que uma frase no momento certo pode produzir mais sangue do que uma lâmina. Ama Alyra, mas também ama a soberana que imagina poder construir por meio dela. É habilidoso em fabricar versões, destruir provas e permanecer perto do centro sem parecer responsável pelo movimento.`,
      voice: `Daryon fala com elegância, cortesia e suavidade estratégica. Usa condicionais, concessões e fórmulas como se me permitem, minhas soberanas e é necessário considerar. Frequentemente começa concordando com parte do argumento alheio antes de conduzi-lo para outra conclusão. Quando acuado, oferece verdades parciais e conserva o tom baixo até a máscara quebrar.`
    },
    "Cal Edran Polar": {
      personality: `Cal Edran é disciplinado, leal, paternal e moralmente marcado pelos anos de serviço a Orionus. Age como muralha humana das soberanas, mas entende que proteção não é apenas impedir uma lâmina: é dizer uma verdade desconfortável e lembrar que soberanos também erram. Possui senso prático, coragem e humor seco.`,
      voice: `Edran fala pouco, em voz baixa e firme. Dá ordens militares com precisão, sem adornos, e trata as soberanas com formalidade mesmo em momentos íntimos. Seu humor aparece em respostas secas e discretas. Sob perigo, usa imperativos curtos e posiciona o corpo antes das palavras.`
    },
    "Cal Kadrir": {
      personality: `Cal Kadrir é um comandante rígido, competente e profundamente ligado à ideia de dever. Protege a soberana que reconhece como legítima, mantém ordem entre guardas e assume responsabilidades desagradáveis sem transformá-las em glória. Não é um homem movido por sadismo; é alguém que aprendeu a reduzir o mundo a comando, posição e ameaça.`,
      voice: `Kadrir fala de modo formal, militar e econômico. Responde sim, não, entendido e como ordena com frequência. Quando precisa discordar, faz isso por risco, procedimento ou segurança, não por argumento emocional. Em conversas privadas, a rigidez pode ceder a uma frase curta de preocupação.`
    },
    "Rendar": {
      personality: `Rendar é observador, resistente, afetuoso com a família e consumido por uma vingança que ele tenta transformar em justiça. Como Fendelar, lê rastros, silêncios, cheiros e posições antes de confiar em palavras. Torna-se estrategista da aliança, capaz de usar medo, informação e terreno, mas continua carregando culpa por cada pessoa convertida em peça.`,
      voice: `Rendar fala em frases curtas, observações concretas e perguntas que testam o interlocutor. Não anuncia emoção; deixa-a aparecer em pausas, nomes e gestos. Usa imagens de mata, rastro, presa, raiz, silêncio e retorno. Sob raiva, não grita de imediato: fica mais baixo, preciso e perigoso.`
    },
    "Vita Fendelar": {
      personality: `Vita é afetuosa, prática, perceptiva e responsável pelo centro emocional da família de Rendar. Conhece a floresta, a escassez e o temperamento do marido, mas não permite que a lógica da sobrevivência apague aquilo que estão tentando preservar. Sua força está em manter vínculos.`,
      voice: `Vita fala com calor, objetividade e intimidade. Usa o nome de Rendar quando precisa trazê-lo de volta ao presente e prefere perguntas simples a acusações longas. Sob medo, fala mais depressa, priorizando as crianças, saída e abrigo.`
    },
    "Avara Fendelar": {
      personality: `Avara é a Velha de Trilha de Velarim, uma líder pragmática que mede acordos pelo que mantêm vivo, não pelo que prometem. Pequena, dura e experiente, entende que clã menor sobrevive porque alguém sente medo cedo o bastante. Sua autoridade vem da capacidade de enxergar perigo antes dos outros.`,
      voice: `Avara fala pouco, com frases secas e comparações de floresta, trilha, corda, fome e caça. Faz perguntas práticas: quanto voltou, quanto falta, quem viu, quem ganha. Quando repreende, não levanta a voz; usa uma observação que reduz o orgulho do outro ao tamanho do risco real.`
    },
    "Nara": {
      personality: `Nara é curiosa, corajosa, afetuosa e teimosa. Filha de Rendar e Vita, cresceu em Velarim aprendendo a mover-se com cuidado, reconhecer perigo e transformar o retorno do pai em celebração. Ainda é criança, mas a cultura Fendelar a torna mais atenta ao ambiente do que uma criança protegida por muralhas.`,
      voice: `Nara fala em frases curtas, perguntas diretas e afirmações cheias de certeza infantil. Gosta de medir crescimento, ouvir histórias, desafiar brincadeiras do pai e dizer o que quer sem rodeios. Sob medo, chama pelos pais e concentra-se no que é concreto.`
    },
    "Ilo": {
      personality: `Ilo é um bebê e funciona principalmente como presença afetiva e símbolo de futuro. Sua personalidade aparece por reações físicas: agarra dedos, procura calor, chora diante de desconforto e acalma-se com vozes conhecidas.`,
      voice: `Ilo não tem fala articulada. Seu modo de comunicação é corporal: choro, balbucio, respiração, mãos fechando-se, busca pelo peito da mãe, reação a ruídos e relaxamento quando reconhece colo.`
    },
    "Nynestra Buldar": {
      personality: `Nynestra é calculista, resiliente, orgulhosa e inteiramente orientada para a continuidade dos Buldar. Como Mão da Colheita, pensa em canais, sementes, famílias, estações e no número de pessoas que morrerão primeiro se uma decisão falhar. Pode parecer fria porque transforma sofrimento em contagem, mas essa frieza é uma forma de responsabilidade.`,
      voice: `Nynestra fala baixo, devagar e com perguntas que exigem números, prazos ou consequências. Usa imagens agrícolas: raiz, colheita, semente, canal, terra seca, celeiro e estação. Sob raiva verdadeira, perde parte do cálculo e a fala se torna física e direta.`
    },
    "Kharvok": {
      personality: `Kharvok é uma Voz Tondrar marcada no corpo e no modo de governar. Sobreviveu à violência ritual e incorporou a própria mutilação como centro de autoridade. É duro, desconfiado, teatral quando o povo precisa de espetáculo e pragmático quando a fome ameaça tornar o orgulho inútil.`,
      voice: `Kharvok fala com voz raspada, frases curtas e imagens de boca, fome, sangue, secura e abertura do corpo. Não explica costumes a estrangeiros. Sob ameaça, grita apenas quando o controle é atingido; no restante, sua frieza é mais intimidante.`
    },
    "Torgun Ossos-de-Fome": {
      personality: `Torgun é desconfiado, agressivo, útil e mais capaz de cooperação do que sua aparência sugere. Como representante Tondrar, mede alianças pelo que trazem à Boca Seca e reage mal a qualquer sinal de superioridade externa.`,
      voice: `Torgun fala em frases curtas, desafiadoras e frequentemente mordazes. Usa perguntas que expõem desconfiança e responde a argumentos com a necessidade Tondrar de comida, força e autonomia. Sob perigo, reduz ainda mais as palavras e age.`
    },
    "Vorlan Vendrar": {
      personality: `Vorlan é um dos líderes Vendrar, comerciante de armas e homem acostumado a medir o mundo em risco, preço e vantagem. Mantém calma onde outros exibem força porque sabe que metal necessário fala por ele. Para Vorlan, promessa é contrato e guerra é mercado.`,
      voice: `Vorlan fala com serenidade comercial. Usa termos de preço, entrega, qualidade, acordo, dívida e garantia. Faz ameaças como quem altera condições de venda, sem mudar muito o tom. Sob pressão, torna-se ainda mais formal e econômico.`
    },
    "Tavra Vendrar": {
      personality: `Tavra é jovem, talentosa, orgulhosa e apaixonada por mecanismos de fogo e demonstrações de superioridade. Quer provar que não é apenas a irmã mais nova ou uma herdeira protegida, e por isso assume riscos que os líderes mais velhos evitariam.`,
      voice: `Tavra fala com rapidez, provocação e confiança técnica. Usa imagens de fogo, pressão, metal, falha e mecanismo, e pode explicar uma arma enquanto ameaça alguém com ela. Sob raiva, acelera, aproxima-se e deixa a fala mais pessoal.`
    },
    "Ossar Glydar": {
      personality: `Ossar é orgulhoso, pragmático, protetor e politicamente marcado pela posição frágil dos Glydar diante de clãs maiores. Conhece o rio, entende dependência e tenta preservar a margem sem entregá-la a alianças que podem devorá-la.`,
      voice: `Ossar fala com autoridade sóbria e imagens de rio, margem, corrente, barco e profundidade. Em negociação, pergunta o que sua gente recebe e quem pagará primeiro. Sob luto, repete nomes e desculpas, algo raro nele.`
    },
    "Varael Glydar": {
      personality: `Varael é jovem, responsável e ainda inseguro no exercício de autoridade. Fica encarregado da Margem dos Zírrios durante a ausência de Ossar e tenta proteger o povo sem parecer um rapaz esperando o tio regressar. Possui coragem e consciência da injustiça Polar.`,
      voice: `Varael fala com esforço de firmeza. Responde de modo direto e tenta usar linguagem de líder: nossa aldeia, nossas rotas, nosso rio. Quando pressionado, a indignação rompe a cautela e ele diz verdades sobre cobrança e desigualdade.`
    },
    "Saela": {
      personality: `Saela é mãe de Varael, irmã de Ossar e uma mulher capaz de transformar medo em ação. Tenta interpor-se entre o filho e a violência Polar, oferece-se como refém e mantém a margem unida. É prática, protetora e emocionalmente franca.`,
      voice: `Saela fala com urgência controlada. Em público, tenta parecer razoável para reduzir a ameaça. Em família, torna-se direta. Quando a compostura quebra, a voz fica rasgada, repete o nome de Varael e não tenta esconder a dor.`
    },
    "Marken": {
      personality: `Marken é um jovem sem origem clara que aparece em Kaendar com conhecimento, imagens e reações que não pertencem inteiramente ao presente. Salva Kaelina, recusa-se a oferecer explicações completas e parece compreender o Ciclo por uma perspectiva inacessível aos outros.`,
      voice: `Marken fala pouco, com frases limpas, perguntas inesperadas e aforismos que não explicam sua origem. Em ação, usa imperativos breves: venha comigo, abaixe-se, espere.`
    },
    "Ylvena": {
      personality: `Ylvena é inteligente, ferida, orgulhosa e capaz de atos terríveis nascidos de amor, ressentimento e medo. Não é apenas vítima nem apenas culpada: compreende as manipulações ao redor, preserva segredos e aprendeu a usar a própria aparência de serva esquecida como proteção.`,
      voice: `Ylvena fala com precisão amarga. Não desperdiça emoção em justificativas bonitas e usa fatos íntimos como lâminas. Sua voz carrega cansaço, raiva contida e conhecimento de bastidores. Sob pressão, não grita; torna-se mais pessoal.`
    },
    "Sarkan Boca-Partida": {
      personality: `Sarkan é líder dos Homens das Areias, exilado Polar e sobrevivente que transformou mutilação, fome e ressentimento em autoridade. É brutal, mas não irracional; pergunta quem será morto, quanto recebe e se a promessa tem valor real.`,
      voice: `Sarkan fala de modo seco, irônico e mercantil. Usa nomes completos como teste, chama atenção para quantidade, estação, pagamento e reintegração. Sob traição, a voz ganha insultos curtos e ameaça concreta.`
    },
    "Veyr Polar": {
      personality: `Veyr é um agente discreto do anel alto, usado por Alyra em tarefas que exigem obediência, silêncio e distância oficial. Cresceu perto o bastante do poder para executar ordens sem receber o prestígio de quem as formula.`,
      voice: `Veyr fala com formalidade contida e preocupação constante com quem pode ouvir. Usa frases curtas, confirma instruções e evita registrar intenção em voz alta. Quando precisa explicar-se, recorre à ordem recebida, à rota e ao dever.`
    },
    "Brokan das Forjas": {
      personality: `Brokan é direto, orgulhoso do trabalho e convencido de que problemas devem receber forma por calor, pressão e impacto. Como mestre das forjas, mede a segurança de Kaendar pela quantidade de metal, ferramentas e homens preparados.`,
      voice: `Brokan fala alto, em frases concretas e com metáforas de ferro, ferrugem, martelo, fogo, lâmina e reparo. Não gosta de rodeios e interrompe abstrações perguntando o que será feito.`
    },
    "Iressa Mão-de-Sal": {
      personality: `Iressa é lúcida, prática, austera e profundamente comprometida com a sobrevivência dos anéis inferiores. Administra sal, carne, rações e depósitos, por isso sabe que guerra é consumo antes de ser glória.`,
      voice: `Iressa fala com secura, precisão e vocabulário de estoque: porções, dias, perdas, reposição, sal, boca, depósito e desperdício. Faz contas em voz alta para desmontar discursos de honra.`
    },
    "Varron Meio-Olho": {
      personality: `Varron é veterano, desconfiado, orgulhoso e moldado por trauma de fronteira. Transformou a perda do olho em argumento permanente: para ele, sobreviver significa esperar o pior antes que o pior escolha o momento.`,
      voice: `Varron fala em tom duro, com frases de advertência e referências a emboscada, fronteira, vigia, cicatriz e inimigo. Questiona garantias e insiste em cenários negativos.`
    },
    "Nalia do Rio": {
      personality: `Nalia é reservada, estrutural e consciente de que o poder Polar nasce da geografia tanto quanto da virtude. Conhece rotas, pesca, irrigação e margens, e sabe que rio, passagem e solo fértil explicam desejos que os anéis altos preferem chamar de inveja.`,
      voice: `Nalia fala pouco e espera o momento em que uma frase pode mudar o peso da sala. Usa imagens de corrente, margem, nascente, leito, travessia e água represada. Quando irritada, a voz fica ainda mais calma.`
    },
    "Thoren dos Grãos": {
      personality: `Thoren é cauteloso, avesso ao risco e mais medroso do que cruel. Conhece os limites dos celeiros e teme tanto guerra quanto generosidade mal calculada. Muitas vezes percebe a crueldade de uma decisão, mas acompanha a maioria porque o caos lhe parece pior.`,
      voice: `Thoren fala com hesitações, ressalvas e números aproximados. Usa expressões como não é infinito, não podemos arriscar e talvez seja necessário. Raramente apresenta uma proposta sem indicar o que pode dar errado.`
    },
    "Odran Porta-Baixa": {
      personality: `Odran é prático, desconfiado e obcecado por acessos, cargas e circulação interna. Acredita que toda crise começa por uma porta mal vigiada, um nome não conferido ou um rumor que atravessa anéis antes da ordem oficial.`,
      voice: `Odran fala com objetividade operacional. Pergunta quem entrou, por qual acesso, com que carga, sob qual nome e quem autorizou. Quando discorda, oferece um risco concreto em vez de princípio moral.`
    },
    "Maelis das Contagens": {
      personality: `Maelis é rigorosa, inteligente e comprometida com o registro como forma de realidade política. Dá existência oficial a votos, decretos, inventários e acusações, sabendo que uma frase mal formulada pode sobreviver por gerações.`,
      voice: `Maelis fala com clareza formal, termos exatos e intolerância a ambiguidades. Interrompe para perguntar qual é a proposta, quem está incluído, em que prazo e sob que autoridade. Quando emocionalmente envolvida, fica imóvel antes de falar.`
    },
    "Yvenn Raiz-Branca": {
      personality: `Yvenn é idoso, ritualista e defensor de uma tradição que ainda possui utilidade social. Conhece leis, gestos e costumes da Raiz e entende que pão, sal, água, testemunha e palavra pública existem para impedir que a raiva decida sozinha.`,
      voice: `Yvenn fala devagar, baixo e com vocabulário de raiz, costume, testemunha, nome e memória. Pode murmurar antes de responder, como se consultasse mortos ou precedentes. Em cerimônia, torna-se formal e preciso.`
    },
    "Lurok": {
      personality: `Lurok é adaptável, agradável e oportunista. Conhece comércio, famílias, favores e subornos, e raramente se compromete antes de perceber para onde a sala está inclinada. Sua lealdade termina onde começa a possibilidade de ficar preso ao lado perdedor.`,
      voice: `Lurok fala com cordialidade fácil, concordâncias parciais e mudanças suaves de posição. Evita dizer eu estava errado; prefere afirmar que as condições mudaram. Quando acuado, sorri menos e busca uma formulação que o coloque como intermediário.`
    },
    "Seron das Obras": {
      personality: `Seron é racional, austero e orientado por consequência e precedente. Como conselheiro ligado a leis e mediação, não procura violência pelo prazer, mas acredita que provocações sem resposta ensinam o mundo a repeti-las.`,
      voice: `Seron fala em tom baixo, frases secas e raciocínio jurídico. Usa palavras como precedente, consequência, responsabilidade, resposta e autoridade. Não usa insultos. Sob crise, reduz alternativas e exige decisão registrável.`
    },
    "Soren": {
      personality: `Soren é um guarda do anel médio acostumado a circular perto dos aposentos de Alyra e a obedecer ordens que não deve compreender por inteiro. Não parece naturalmente conspirador; é um homem nervoso, dividido entre lealdade e medo da punição.`,
      voice: `Soren fala com formalidade ansiosa. Usa minha soberana, pede desculpas cedo e tenta responder com não sei, não lembro ou foi ordem. Quando pressionado com fatos concretos, cede em etapas.`
    },
    "Orven": {
      personality: `Orven é Chefe de Canal do setor norte Buldar, um homem magro, trabalhador e incapaz de esconder bem notícias ruins. Entende água, comportas, famílias afetadas e o modo como uma seca se espalha antes de receber nome político.`,
      voice: `Orven fala baixo, direto e em números. Responde quanto, onde, quantas famílias e em quanto tempo, evitando opinião até ser perguntado. Usa vocabulário de canal, nível, fluxo, dobra, campo e seca.`
    },
    "Hadrun": {
      personality: `Hadrun é um ancião Buldar áspero, experiente e mais corajoso do que o corpo cansado sugere. Compreende fome, logística de marcha e o valor de uma panela dividida. Intervém em conflitos sem teatralidade.`,
      voice: `Hadrun fala em frases curtas, secas e práticas. Não pergunta se alguém quer comer; entrega a tigela. Usa imagens de conta, comida, plantio, marcha, tropeço e barriga. Seu humor é velho e discreto.`
    },
    "Kahul": {
      personality: `Kahul é um líder Urtistar imponente, disciplinado e difícil de ler. Observa pessoas como medidas de ameaça, dívida e utilidade, carregando no corpo pedras, cicatrizes e votos que transformam aparência em memória.`,
      voice: `Kahul fala com economia e autoridade. Não eleva a voz para provar poder e oferece informação como quem demonstra que já estava observando antes de ser chamado. Usa termos de rota, inimigo, vigília, acordo e dívida.`
    },
    "Lutharus": {
      personality: `Lutharus é um comandante Polar autoritário, disciplinado e cruel na execução de ordens. Subiu pela obediência antes da inteligência e trata povos menores como problemas que só compreendem corda, confisco e demonstração de força.`,
      voice: `Lutharus fala em comandos, acusações e repetições depreciativas. Repete a resposta do outro como se tivesse mau cheiro e transforma qualquer resistência em justificativa para força. Não grita o tempo todo; a calma administrativa torna-o mais violento.`
    },
    "Savel": {
      personality: `Savel é um velho pobre de Noreval, pai de Daryon e guardião involuntário de uma origem que o filho tentou apagar. Seco, desconfiado e ferido pelo abandono, olha a Dinastia a partir de telhado furado, pão caro e soldados que só aprendem nomes quando precisam de culpado.`,
      voice: `Savel fala com amargura direta e ironia curta. Responde perguntas políticas com realidade material: chuva no teto, preço do pão, tigela vazia. Usa silêncio como recusa e encerra conversas com saia ou chega.`
    },
    "Harrev": {
      personality: `Harrev é um soldado veterano do anel médio, formado sob Cal Edran e escolhido por Kaelina justamente por ser velho o bastante para fazer perguntas antes de obedecer. Sensível ao custo da guerra, conta corpos e procura nomes.`,
      voice: `Harrev fala baixo, respeitoso e concreto. Usa minha soberana, oferece relatórios sem esconder o que não sabe. Sob perigo, dá ordens claras e coloca o corpo na frente.`
    },
    "Odris": {
      personality: `Odris é um antigo carregador transformado em guarda, largo, forte e veterano do serviço sob Cal Edran. Possui lealdade prática e coragem sem ostentação.`,
      voice: `Odris fala pouco, com respeito firme e autoridade de quem não precisa de título para ser ouvido. Em risco, usa imperativos simples: atrás de mim, atrás de Harrev. Não faz discursos antes do sacrifício.`
    }
  };

  for (const character of D.characters) {
    const entry = DATA[character.name];
    if (!entry) continue;
    if (entry.personality) character.personality = splitSentences(entry.personality);
    if (entry.voice) character.voice = entry.voice;
  }
})();
