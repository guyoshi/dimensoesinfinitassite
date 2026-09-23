(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;
  const {C,BOOK_ID,chapterId,characterId,placeId}=X;
  const items=[
    {
      id:'jesed-mystery-rdc-loutes',slug:'loutes',name:'Quem é Loutes?',status:'Aberto',
      question:'De onde veio Loutes e por que parece conhecer um mundo e um tempo que os eterí não compreendem?',
      summary:'Loutes permanece ligado à superfície, às ruínas e ao ciclo temporal. O livro oferece provas de deslocamento e conhecimento impossível, mas não explica completamente sua origem.',
      origin:'O mistério começa quando uma criança silenciosa é encontrada nos Bosques de Arion, num lugar associado a antigas proibições e à ideia de que algo vindo de baixo alcançou Etérea.',
      firstClues:['Loutes surge sem família, história ou linguagem compreensível.','Pronuncia uma forma antiga de “superfície” antes de os eterí aceitarem que Nadirion existe.','Reconhece caminhos, símbolos e perigos que deveria desconhecer.'],
      investigationPaths:['Sersi, Mirel e Yrisea tentam compreender sua mente e sua origem.','Jokara o ensina a falar e observa as palavras que escapam antes de qualquer aprendizagem.','As ruínas da superfície conectam sua presença ao passado dos eterí e a um ciclo maior.'],
      discoveries:['Loutes não é vazio: escolhe o silêncio e observa intenções.','Ele sobrevive à Queda em condições quase impossíveis.','Sua presença acompanha momentos em que a história precisa continuar, mesmo quando outras vidas se encerram.'],
      contradictions:['É frágil e dependente, mas por vezes parece saber mais do que os adultos.','Precisa ser protegido, mas também conduz sobreviventes a decisões e descobertas.','Pertence emocionalmente a Jokara, embora narrativamente pareça pertencer a outro ponto do ciclo.'],
      finalRevelation:'Ruínas dos Céus não encerra sua identidade. O livro confirma apenas que Loutes não é uma criança comum de Etérea e que sua origem está ligada à superfície, ao tempo e à continuidade do ciclo.',
      consequences:['Jokara encontra um motivo para cuidar de alguém quando sua própria fé se rompe.','A existência de Loutes abre a primeira fissura na certeza de que a superfície era apenas mito.','O mistério permanece como uma ponte para os livros seguintes.'],
      chapterNumbers:[2,3,4,6,7,9,10,12,20,24],
      characterIds:[characterId('Loutes'),characterId('Jokara Amaréa'),characterId('Nestira Amaréa'),characterId('Sersi')],
      placeIds:[placeId('Bosques de Arion'),placeId('Círculo de Nhamari'),placeId('Ruínas')]
    },
    {
      id:'jesed-mystery-rdc-ilhas-baixas',slug:'ilhas-baixas',name:'As Ilhas Baixas existiam?',status:'Resolvido',
      question:'Os exilados eram realmente enviados para ilhas inferiores onde poderiam continuar a viver?',
      summary:'Não como a sociedade ensinava. “Ilhas Baixas” era uma linguagem institucional que escondia o destino mortal reservado aos expulsos.',
      origin:'O mistério nasce da contradição entre a serenidade dos Círculos do Peso e o facto de ninguém regressar das chamadas Ilhas Baixas.',
      firstClues:['Nenhum exilado volta ou envia notícia.','Os Oradores tratam perguntas sobre o destino dos condenados como novo Peso.','A própria geografia de Etérea não oferece provas claras dessas ilhas habitadas.'],
      investigationPaths:['Jokara relaciona o exílio de Yndra aos silêncios dos Oradores.','A Queda revela o que realmente existe sob as ilhas.','Os mecanismos de exclusão passam a ser vistos fora da linguagem ritual que os tornava aceitáveis.'],
      discoveries:['O exílio era apresentado como afastamento, não como execução.','A crença permitia à comunidade conservar a imagem de uma sociedade sem violência.'],
      falseLeads:['A tradição de que os exilados viveriam em ilhas mais baixas, separados apenas por necessidade espiritual.'],
      contradictions:['Etérea afirmava resolver conflitos sem violência, mas eliminava fisicamente quem não podia ser reintegrado.','A leveza coletiva dependia de empurrar para baixo tudo aquilo que ameaçava a narrativa oficial.'],
      finalRevelation:'As Ilhas Baixas eram uma mentira institucional. O nome suavizava o facto de que os exilados eram lançados para um destino que a sociedade não pretendia testemunhar.',
      consequences:['Yndra deixa de parecer apenas uma herege e passa a ser também vítima de uma ordem que precisava silenciá-la.','A moralidade eterí é reinterpretada: a ausência de crime visível não significava ausência de crueldade.'],
      chapterNumbers:[4,5,6,8,9,20],
      characterIds:[characterId('Yndra'),characterId('Jokara Amaréa'),characterId('Yrisea')],
      placeIds:[placeId('Praça da Raiz'),placeId('Ilhas Baixas')]
    },
    {
      id:'jesed-mystery-rdc-eterea',slug:'eterea',name:'Por que Etérea caiu?',status:'Parcial',
      question:'A queda foi causada por uma falha física, pelo Peso acumulado, pelo Sopro ou por todas essas leituras ao mesmo tempo?',
      summary:'O livro revela sinais materiais de perda de sustentação e uma longa negação social, mas mantém aberta a relação entre fenómeno físico, fé e metáfora.',
      origin:'Pedras começam a desprender-se, os ventos falham, a lua desaparece e as ilhas descem enquanto os Oradores insistem em interpretar qualquer alarme como Peso.',
      firstClues:['Erílan perde fragmentos sem corrente capaz de explicar a queda.','Nuaris voam desorientados e os sinos deixam de responder como antes.','Taliver mede mudanças de pressão, velocidade de queda e comportamento dos objetos.','Yndra anuncia que a harmonia será quebrada e os filhos do céu serão engolidos pelo que recusaram ver.'],
      investigationPaths:['Jokara procura o livro escondido no Círculo de Nhamari.','Taliver observa os sinais como fenómeno natural.','Yndra e as escrituras oferecem uma leitura religiosa e cíclica.','As ruínas posteriores revelam que Etérea foi construída como refúgio, não como mundo eterno.'],
      discoveries:['As ilhas estavam a descer e perder sustentação.','Os Oradores conheciam mais sinais do que admitiam publicamente.','A sociedade não caiu apenas por não saber: caiu também por transformar dúvida em pecado.'],
      falseLeads:['A certeza de que Etérea sempre existiu e era naturalmente separada da superfície.','A ideia de que falar da queda poderia causá-la pelo Peso.'],
      contradictions:['Há medições físicas reais, mas também coincidências e imagens proféticas que não recebem explicação simples.','O Peso funciona como doutrina opressiva e, ao mesmo tempo, descreve com precisão certos comportamentos que arrastam a sociedade para baixo.'],
      finalRevelation:'Etérea caiu materialmente porque já não conseguia permanecer suspensa. O livro não determina se o Sopro, o Peso e as profecias são causas sobrenaturais, formas culturais de perceber o fenómeno ou ambas as coisas.',
      consequences:['Quase toda a civilização eterí é destruída.','Os sobreviventes precisam trocar uma identidade de leveza por técnicas de vida no chão.','O trauma da Queda torna-se a origem distante das estruturas que, séculos depois, formarão os Polar.'],
      chapterNumbers:[1,4,5,6,7,8,9,20,21],
      characterIds:[characterId('Jokara Amaréa'),characterId('Professor Taliver'),characterId('Yndra'),characterId('Nestira Amaréa')],
      placeIds:[placeId('Etérea'),placeId('Círculo de Nhamari'),placeId('Planalto de Talyen')]
    },
    {
      id:'jesed-mystery-rdc-ruinas',slug:'ruinas',name:'Quem construiu as ruínas?',status:'Resolvido',
      question:'As estruturas antigas da superfície pertenciam a outro povo ou aos ancestrais dos próprios eterí?',
      summary:'As ruínas pertencem a povos da superfície ligados aos ancestrais de Etérea. Elas provam que o céu foi um refúgio construído, não a origem absoluta da humanidade.',
      origin:'Na superfície, os sobreviventes encontram estruturas que contradizem tudo o que aprenderam sobre Nadirion como terra vazia e rejeitada.',
      firstClues:['As construções apresentam medidas e usos humanos.','Símbolos e formas lembram elementos preservados de maneira distorcida em Etérea.','Objetos indicam uma história anterior à subida das ilhas.'],
      investigationPaths:['Platisa e Jokara observam a arquitetura e os sinais gravados.','O grupo compara os vestígios com mitos eterí.','A história oficial é confrontada com evidências materiais que não dependem dos Oradores.'],
      discoveries:['Humanos viveram na superfície antes de Etérea.','Os eterí descendem de sobreviventes que subiram e depois transformaram a fuga em cosmogonia.','Nadirion não era um castigo criado para os impuros.'],
      falseLeads:['A crença de que as ruínas pertenciam a criaturas ou povos totalmente separados dos eterí.'],
      contradictions:['A religião preservou fragmentos do passado, mas reorganizou-os para sustentar superioridade e isolamento.','Etérea ensinava que a superfície era ausência, embora sua própria cultura carregasse marcas de quem veio de lá.'],
      finalRevelation:'Os construtores eram povos humanos da superfície ligados aos ancestrais eterí. Etérea foi criada como refúgio durante uma antiga crise e, com o tempo, a memória dessa origem foi convertida em mito.',
      consequences:['Jokara compreende que sobreviver no chão não é uma regressão impura.','A autoridade histórica dos Oradores é quebrada.','O título Ruínas dos Céus passa a referir-se tanto à queda física quanto às ruínas de uma verdade construída.'],
      chapterNumbers:[20,21,22],
      characterIds:[characterId('Jokara Amaréa'),characterId('Platisa'),characterId('Maletar'),characterId('Gabasteri')],
      placeIds:[placeId('Ruínas')]
    },
    {
      id:'jesed-mystery-rdc-sopro',slug:'sopro',name:'O Sopro é divino ou natural?',status:'Aberto',
      question:'As Correntes possuem vontade própria ou os eterí deram linguagem religiosa a fenómenos naturais e experiências humanas?',
      summary:'A narrativa preserva as duas interpretações. Há ventos, padrões, sonhos e coincidências que parecem responder, mas nenhuma prova obriga o leitor a aceitar uma entidade consciente.',
      origin:'Toda a cultura eterí nasce da crença de que cada ser carrega um Sopro e que as Correntes orientam vida, morte e destino.',
      firstClues:['O vento parece mudar em momentos emocionalmente significativos.','Rituais às vezes coincidem com respostas naturais.','Profecias e sonhos antecipam acontecimentos reais.','Taliver encontra explicações físicas para parte do colapso.'],
      investigationPaths:['Jokara passa da fé herdada à dúvida e depois a uma relação pessoal menos obediente com o vento.','Nestira mantém a crença mesmo depois de a instituição falhar.','A superfície testa se o Sopro existe longe dos templos, nomes e ritos.'],
      discoveries:['A fé pode orientar coragem sem tornar os Oradores infalíveis.','Fenómenos naturais podem receber significado verdadeiro para os personagens mesmo sem prova sobrenatural.','O silêncio do Sopro não impede que pessoas escolham agir.'],
      contradictions:['As Correntes parecem responder, mas nunca de modo controlável ou verificável.','A religião produz beleza, comunhão e coragem, mas também censura e violência institucional.'],
      finalRevelation:'Não há revelação final objetiva. O Sopro pode ser divindade, natureza, memória coletiva ou uma linguagem humana para o ciclo. A ambiguidade permanece deliberadamente aberta.',
      consequences:['Jokara deixa de depender da aprovação religiosa para agir.','Nestira mostra que conservar fé não exige conservar a mesma instituição.','O leitor pode interpretar os acontecimentos espiritualmente ou materialmente sem que uma leitura anule a outra.'],
      chapterNumbers:[1,2,4,5,8,9,21,23,24],
      characterIds:[characterId('Jokara Amaréa'),characterId('Nestira Amaréa'),characterId('Yndra'),characterId('Professor Taliver')],
      placeIds:[placeId('Etérea'),placeId('Nadirion')]
    }
  ].map(item=>({...item,chapterIds:item.chapterNumbers.map(chapterId),route:`misterio/${item.slug}`,sourceRef:item}));
  C.setCollection(BOOK_ID,'mysteries',items);
})();
