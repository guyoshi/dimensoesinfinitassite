(() => {
  'use strict';
  const X=window.JESED_GUERRAS_CONTEXT;if(!X)return;
  const {C,D,BOOK_ID,chapterId}=X;
  const items=[
    {
      id:'jesed-mystery-orionus',slug:'quem-matou-orionus',name:'Quem matou Orionus?',status:'Resolvido',
      question:'A morte de Orionus foi natural, provocada ou parte de uma conspiração?',
      summary:'O veneno preparado por Ylvena para Alyra foi bebido por Orionus. Daryon não causou o engano, mas apagou provas e protegeu Ylvena durante anos.',
      origin:'O mistério nasce no vazio deixado pela morte súbita do soberano que havia sustentado quarenta ciclos de paz. Ylvena é acusada, depois inocentada por registros que pareciam confiáveis, e desaparece de Kaendar.',
      firstClues:['As ervas atribuídas a Ylvena não correspondiam com precisão ao veneno que matou Orionus.','Daryon participou da correção dos registros e conhecia Ylvena antes de Kaendar.','Em Noreval, Kaelina encontra contradições sobre a origem e o passado dos dois.'],
      investigationPaths:['Kaelina compara os registros de Kaendar com os de Noreval.','Marken conduz Kaelina até a presença escondida de Ylvena.','A confissão de Ylvena é confrontada depois pela confissão pública de Daryon.'],
      discoveries:['Ylvena pretendia matar Alyra com Beijo-da-Noite.','Orionus bebeu o veneno destinado à filha.','Daryon falsificou registros, construiu provas de inocência e manteve Ylvena escondida.'],
      falseLeads:['A versão pública de que Ylvena fora apenas vítima de uma acusação apressada.','A possibilidade de uma morte natural ou de uma conspiração externa contra a Dinastia.'],
      contradictions:['Daryon protegeu Ylvena, mas o amor e a lealdade dele estavam ligados a Alyra.','A inocência oficial de Ylvena era sustentada precisamente por documentos manipulados pelo homem que mais lucrava com controlar a verdade.'],
      finalRevelation:'Ylvena pretendia envenenar Alyra com Beijo-da-Noite, mas Orionus bebeu o veneno destinado à filha. Daryon encobriu o crime, alterou a memória oficial e transformou a morte do soberano numa mentira útil ao seu projeto político.',
      consequences:['Kaelina mata Ylvena após a confissão.','Daryon é desmascarado diante de Kaendar e morre depois de tentar ferir Kaelina.','A memória de Orionus deixa de ser apenas símbolo de estabilidade e passa a carregar a corrupção dos próprios registros Polar.'],
      chapterNumbers:[14,17,18,24,25,27],
      characterIds:['jesed-character-orionus-polar','jesed-character-ylvena','jesed-character-daryon-vess','jesed-character-kaelina-polar','jesed-character-alyra-polar'],
      placeIds:['jesed-place-kaendar','jesed-place-noreval','jesed-place-camara-primeiro-abrigo']
    },
    {
      id:'jesed-mystery-boys',slug:'quem-matou-os-dois-jovens',name:'Quem matou os dois jovens Polar?',status:'Resolvido',
      question:'Quem matou os jovens encontrados no início e plantou o talismã Tondrar?',
      summary:'Ylvena matou os dois jovens e deixou uma prova Tondrar deliberadamente visível para provocar a reação de Kaendar.',
      origin:'O livro começa quando dois Vigias encontram os corpos e um talismã Tondrar numa clareira. A cena parece clara demais e empurra Kaendar para uma resposta imediata.',
      firstClues:['O talismã estava limpo, queimado e colocado para ser encontrado.','Havia rastros demais para uma incursão cuidadosa.','O aproveitamento do balili dava naturalidade a uma cena construída para parecer ataque de fronteira.'],
      investigationPaths:['Kaelina estuda a materialidade do talismã e percebe a encenação.','A cadeia política do crime é reconstruída a partir das ligações entre Ylvena e Daryon.','A confissão final de Ylvena identifica a autora material.'],
      discoveries:['Daryon admitia ter alimentado a guerra, mas negava este assassinato.','Ylvena permaneceu viva e escondida perto do centro do poder.','O crime inicial fazia parte de um plano para romper a hesitação das soberanas e ativar o medo contra os Tondrar.'],
      falseLeads:['A autoria Tondrar sugerida pelo talismã.','A suspeita de que Daryon tivesse executado pessoalmente o crime.'],
      contradictions:['A cena imitava Tondrar, mas violava a lógica de um povo que não deixaria um símbolo tão útil ao inimigo por descuido.','A guerra parecia nascer de uma fronteira externa, embora seu primeiro golpe tivesse sido preparado por dentro de Kaendar.'],
      finalRevelation:'Ylvena matou os jovens e plantou a falsa prova Tondrar. O primeiro sangue da guerra não veio do inimigo apontado por Kaendar, mas de alguém protegido pelas próprias falsificações da Dinastia.',
      consequences:['A morte dos rapazes divide Kaelina e Alyra.','A Lei do Portão é convocada sobre uma premissa falsa.','O crime demonstra que toda a guerra foi construída para transformar luto legítimo em instrumento político.'],
      chapterNumbers:[1,2,4,24,25,27],
      characterIds:['jesed-character-ylvena','jesed-character-kaelina-polar','jesed-character-alyra-polar','jesed-character-daryon-vess'],
      placeIds:['jesed-place-kaendar']
    },
    {
      id:'jesed-mystery-markoso',slug:'quem-e-markoso',name:'Quem é Marken?',status:'Aberto',
      question:'De onde veio Marken e por que conhece acontecimentos que ainda não ocorreram?',
      summary:'O livro confirma que Marken está deslocado da ordem comum do tempo e age para preservar certos acontecimentos, mas não revela inteiramente sua origem nem o preço da missão.',
      origin:'Marken surge nos Túneis Fundos quando Kaelina deveria morrer. Ele fala como alguém que já conhece as consequências das escolhas ainda não feitas.',
      firstClues:['Salva Kaelina num ponto em que não deveria estar.','Entrega um fragmento que diz vir de cima.','Antecipa o uso do fogo por Alyra e trata o destino como uma estrutura que precisa continuar.'],
      investigationPaths:['Kaelina tenta compreender o conhecimento impossível de Marken.','As pinturas e os objetos ligados a ele são comparados aos acontecimentos futuros.','Seu desaparecimento de um espaço fechado elimina explicações comuns.'],
      discoveries:['Marken interfere pouco, mas sempre em momentos que preservam a continuidade do ciclo.','Ele conhece imagens e resultados anteriores à sua ocorrência.','No fim, desaparece de um aposento trancado e deixa pinturas de acontecimentos futuros.'],
      contradictions:['Ele protege Kaelina sem agir como aliado político dos Polar.','Parece lutar contra certas mortes, mas aceita outras como necessárias.','Seu conhecimento sugere liberdade de movimento, enquanto sua fala sugere aprisionamento ao destino.'],
      finalRevelation:'Guerras de Sangue não fecha sua identidade. O que se confirma é que Marken não pertence apenas ao presente narrativo e que sua presença está ligada à preservação do ciclo.',
      consequences:['Kaelina sobrevive a momentos decisivos.','O leitor passa a desconfiar que o tempo de Jesed não é linear.','As pinturas deixadas no fim conectam este livro a acontecimentos ainda não vividos pelos personagens.'],
      chapterNumbers:[8,10,12,18,24,29],
      characterIds:['jesed-character-markoso','jesed-character-kaelina-polar','jesed-character-alyra-polar'],
      placeIds:['jesed-place-kaendar','jesed-place-noreval']
    },
    {
      id:'jesed-mystery-attack-fendelar',slug:'quem-ordenou-massacre-fendelar',name:'Quem ordenou o massacre Fendelar?',status:'Resolvido',
      question:'Quem destruiu Velarim e plantou uma falsa prova Tondrar?',
      summary:'Alyra ordenou o ataque aos Homens das Areias. Sarkan executou a missão, enquanto Daryon lhe deu método, linguagem e cobertura política.',
      origin:'Velarim é destruída e o ataque deixa símbolos que parecem apontar para os Tondrar, transformando a dor de Rendar numa arma contra o inimigo escolhido por Kaendar.',
      firstClues:['O talismã estava visível demais.','O ataque fora executado por homens treinados, não por uma incursão improvisada.','Kaelina vê Daryon reunido com Sarkan.'],
      investigationPaths:['Rendar segue as marcas do massacre e procura o responsável.','Kaelina acompanha as movimentações secretas de Daryon.','As confissões de Ylvena e Daryon revelam a arquitetura interna do ataque.'],
      discoveries:['Os Homens das Areias foram usados como força negável.','Alyra autorizou a destruição para criar uma guerra controlável.','Daryon ajudou a transformar a falsa prova em narrativa política.'],
      falseLeads:['A autoria Tondrar indicada pelos símbolos plantados.'],
      contradictions:['Alyra dizia defender Kaendar, mas fabricou um inimigo ao destruir um povo menor.','Rendar buscava justiça contra os Polar enquanto era conduzido pelas provas criadas pelos próprios Polar.'],
      finalRevelation:'Alyra contratou Sarkan e os Homens das Areias para destruir Velarim. Daryon participou da articulação e do encobrimento, fazendo o massacre parecer uma ação Tondrar.',
      consequences:['Vita, Nara e Ilo morrem.','Rendar reúne os clãs contra Kaendar.','Os Fendelar deixam de ser um povo oculto à margem e tornam-se o centro emocional da guerra.','A pretensão de Alyra de controlar o conflito produz um cerco muito maior do que ela previa.'],
      chapterNumbers:[7,8,10,13,22,25,27],
      characterIds:['jesed-character-alyra-polar','jesed-character-daryon-vess','jesed-character-sarkan-boca-partida','jesed-character-rendar'],
      placeIds:['jesed-place-velarim','jesed-place-kaendar']
    },
    {
      id:'jesed-mystery-yvenn',slug:'quem-envenenou-yvenn',name:'Quem envenenou Yvenn?',status:'Resolvido',
      question:'Quem transformou a Lei do Portão em massacre?',
      summary:'Daryon envenenou Yvenn para quebrar a tentativa de paz e entregar a Alyra a guerra que acreditava que ela desejava.',
      origin:'Yvenn morre durante a cerimônia que deveria provar a possibilidade de trégua. O pânico permite que Alyra converta a Lei do Portão numa matança.',
      firstClues:['A morte favorece imediatamente a ala agressiva de Kaendar.','Os Tondrar parecem genuinamente surpreendidos.','Kaelina conclui que o veneno só podia ter sido colocado por alguém com acesso Polar.'],
      investigationPaths:['Kaelina reconstrói quem podia aproximar-se da comida e da bebida.','O comportamento de Daryon é comparado aos benefícios políticos obtidos.','Alyra força Daryon a revelar até onde foi por ela.'],
      discoveries:['A prova contra os Tondrar não se sustenta.','Daryon não se via como traidor, mas como alguém que dava forma ao desejo de Alyra.','O crime foi pensado para impedir a paz, não apenas para matar Yvenn.'],
      falseLeads:['A suspeita imediata de sabotagem Tondrar durante a própria trégua.'],
      contradictions:['A Lei do Portão foi criada para detectar mentira externa, mas foi destruída por uma mentira interna.','Daryon alegava servir a Dinastia enquanto atacava a autoridade das duas soberanas.'],
      finalRevelation:'Daryon confessa ter envenenado Yvenn. O assassinato foi a intervenção que impediu a trégua e tornou a guerra praticamente inevitável.',
      consequences:['A cerimônia termina em massacre.','Kaelina perde a confiança na segurança dos próprios ritos Polar.','Alyra recebe a guerra que desejava, mas também perde o controle sobre o homem que agia em seu nome.'],
      chapterNumbers:[6,10,13,23,25,27],
      characterIds:['jesed-character-daryon-vess','jesed-character-yvenn-raiz-branca','jesed-character-alyra-polar','jesed-character-kaelina-polar'],
      placeIds:['jesed-place-kaendar']
    }
  ].map(item=>({
    ...item,
    chapterIds:item.chapterNumbers.map(chapterId),
    linkedCharacters:item.characterIds,
    clues:item.firstClues,
    answer:item.finalRevelation,
    readerKnows:item.summary,
    route:`mystery/${item.slug}`,
    sourceRef:item
  }));
  D.mysteries=items;
  C.setCollection(BOOK_ID,'mysteries',items);
})();
