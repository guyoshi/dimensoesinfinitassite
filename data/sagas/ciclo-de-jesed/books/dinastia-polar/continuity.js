(() => {
  'use strict';
  const X=window.JESED_POLAR_CONTEXT;if(!X)return;const {C,D,BOOK_ID}=X;
  const ch=n=>`jesed-chapter-dp-${String(n).padStart(2,'0')}`;

  // Lugares: correções consolidadas do manuscrito atual.
  const places=C.asArray(D.places);
  const patchPlace=(id,changes)=>{const item=places.find(place=>place.id===id);if(item)Object.assign(item,changes);};
  patchPlace('jesed-dp-place-santuario-raiz-eterna',{
    region:'Próximo ao limite entre Cidade Exterior e Cidade Intermediária · Kaeliran',
    summary:'Grande centro religioso da Raiz Eterna, erguido junto ao limite dos anéis urbanos e tratado como autoridade que atravessa as fronteiras internas da cidade. Reúne assistência, cura, registros, interrogatórios e custódia ligados ao Culto.'
  });
  patchPlace('jesed-dp-place-propriedade-dareth',{
    region:'Terras a oeste de Kaeliran',
    summary:'Terras escolhidas por Dareth quando Vetarius lhe ofereceu uma recompensa no início de sua carreira. Ele recusou as residências da Cidade Interna e preferiu distância de Kaendar para proteger a família. Sua filha nasceu ali; anos depois, esposa e filha foram encontradas mortas na propriedade, e Dareth continuou vivendo no mesmo lugar.'
  });
  patchPlace('jesed-dp-place-casa-balanca',{
    region:'Cidade Interna · cais do Rio Grande · Kaeliran',
    summary:'Complexo administrativo e logístico da Companhia da Balança Azul junto ao Rio Grande. Prédio de registros, armazéns, pátios de pesagem, oficinas, currais, guindastes e cais formam um dos maiores sistemas de circulação de mercadorias de Kaeliran.'
  });
  const extraPlaces=[
    {id:'jesed-dp-place-roven',slug:'roven',name:'Roven',type:'Distrito urbano',dynasty:'Polar',region:'Kaeliran',summary:'Distrito ligado a curtumes, trabalhadores e registros da Permanência. Elis nasceu ali pequena demais para guardar memória do lugar. A caixa de consulta de Roven contém a linhagem de Darven e a referência DV-0417 ligada ao passado de Neiva.'},
    {id:'jesed-dp-place-maelya',slug:'maelya',name:'Maelya',type:'Setor urbano e de arquivos',dynasty:'Polar',region:'Cidade Interna · Kaeliran',summary:'Área da Cidade Interna associada aos arquivos onde Vesna recebe acesso temporário ao substituir uma funcionária doente. É ali que ela segue a referência DV-0417 e copia documentos ligados à origem de Neiva.'},
    {id:'jesed-dp-place-casa-ladira',slug:'casa-de-ladira',name:'Casa de Ladira Polar',type:'Residência',dynasty:'Polar',region:'Kaelyr · Cidade Interna · perto da estátua de Teryon',summary:'Residência rica de Ladira Polar, com jardim interno, criados e cômodos preservando vestígios da infância de Neiva. No Capítulo 19, torna-se o lugar em que Elis encontra a avó, conhece a infância da mãe e é atraída para uma armadilha envolvendo os Filhos da Raiz.'}
  ];
  for(const item of extraPlaces){if(!places.some(place=>place.id===item.id))places.push(item);}
  D.places=places;C.setCollection(BOOK_ID,'places',places);

  // Capítulo 19: conteúdo confirmado no manuscrito.
  const chapter19=C.asArray(D.chapters).find(item=>Number(item.number)===19);
  if(chapter19){
    Object.assign(chapter19,{
      title:'A Porta da Frente',status:'Escrito',pov:'Elis',image:'',
      places:['jesed-dp-place-maruva','jesed-dp-place-casa-ladira','jesed-dp-place-kaeliran'],
      characters:['jesed-character-elis','jesed-character-vesna-da-permanencia','jesed-character-ladira-polar','jesed-character-hadris'],
      summary:'Vesna veste Elis para que ela consiga circular pela Cidade Interna sem ser barrada. Depois de três tentativas, Elis entra pela porta da frente da casa de Ladira, que confirma ser mãe de Neiva, conta que a filha pediu formalmente a desvinculação por causa do homem que amava e reconhece Elis e Kalan como seus netos. A promessa de acolhimento se transforma em armadilha quando Ladira chama os Filhos da Raiz e exige saber onde está a caixa desaparecida.',
      details:['Ladira afirma que não sabia da morte de Neiva, mostra a Elis o antigo quarto da filha e promete que não deixará Kalan morrer.','Elis nunca menciona a caixa, mas Ladira pergunta diretamente por ela. Elis foge pelos telhados da Cidade Interna, até Hadris antecipar sua rota e bloqueá-la perto de Teryon: “Desta vez, não há campeão no caminho.”'],
      source:'Dinastia Polar — Capítulo 19'
    });
  }
  const chapterItems=C.asArray(D.chapters).map(item=>{const number=Number(item.number),slug=C.stableSlug(item.slug,`capitulo-${number}`);return{...item,id:C.stableId(item.id,'chapter',`dp-${String(number).padStart(2,'0')}`,BOOK_ID),slug,name:`Capítulo ${number} — ${C.text(item.title)}`,number,title:C.text(item.title),summary:C.text(item.summary),characterIds:C.asArray(item.characters),placeIds:C.asArray(item.places),route:`chapter/${item.id||number}`,sourceRef:item};});
  C.setCollection(BOOK_ID,'chapters',chapterItems);

  // Personagens afetados diretamente pelas revelações do Capítulo 19.
  const characters=C.asArray(D.characters);
  const patchCharacter=(id,changes)=>{const item=characters.find(char=>char.id===id);if(item)Object.assign(item,changes);};
  patchCharacter('jesed-character-elis',{
    status:'Viva',
    summary:'Garota Nular de Maruva e irmã de Kalan. Após a execução dele, Karesis a leva para além das muralhas, onde ela conhece vestígios de Etérea e questiona as categorias de pertencimento de Kaeliran. Mais tarde, segue com Tair as marcas clandestinas da cidade e encontra armas e cargas de ruptura escondidas na antiga casa de Aleris. Durante a celebração da vitória de Dareth, reconhece sinais inquietantes entre as comitivas que entram na cidade.',
    chapterIds:[1,2,6,9,11,12,15,17,19,23,24,26,29,34,36].map(ch),
    knowledge:{knows:['Darven é Polar, conforme os registros de Roven.','Ladira Polar é mãe de Neiva e, portanto, sua avó e avó de Kalan.','Neiva pediu formalmente a própria desvinculação depois que Ladira proibiu o homem que amava de entrar em casa.','O pai de Elis serviu às forças de Kaeliran, provavelmente como batedor ou arqueiro auxiliar, e depois abandonou Neiva.','Ladira sabia da caixa desaparecida sem Elis ter mencionado sua existência.'],suspects:['Ladira possui ligação ou comunicação com o Culto que Elis não compreende.','Karesis sabe mais sobre Neiva e seu pai do que contou.'],falseBeliefs:['Durante parte da visita, acreditou que Ladira realmente pretendia acolher a família e salvar Kalan sem exigir algo em troca.'],unknown:['Como Ladira soube da caixa.','O que acontecerá depois de Hadris cercá-la.','O nome, destino e história completa do pai.'],secrets:['Encontrou a caixa roubada por Kalan e a escondeu nos túneis.','Mentiu para Selina e Ladira sobre saber onde estão os registros.']},
    destiny:{written:'No Capítulo 36, Elis observa a abertura extraordinária de Kaeliran enquanto guarda o conhecimento da rota subterrânea e das cargas ocultas em Maruva.',state:'Em desenvolvimento'}
  });
  patchCharacter('jesed-character-ladira-polar',{
    status:'Viva',
    summary:'Mulher Polar da Cidade Interna e mãe confirmada de Neiva. Recebe Elis com afeto, reconhece nela gestos da filha, sofre ao descobrir que Neiva morreu e aceita imediatamente Elis e Kalan como netos. Conta que Neiva pediu formalmente a desvinculação para viver com um homem que Ladira recusava receber em casa. Depois promete salvar Kalan e acolher os dois, mas envia uma mensagem urgente, chama os Filhos da Raiz e exige que Elis revele onde está a caixa desaparecida.',
    personality:['Controlada','Perceptiva','Afetuosa com a memória de Neiva','Socialmente rígida','Capaz de ocultar intenção'],
    voice:'Maternal e polida mesmo quando transforma ajuda em condição e coerção.',
    chapterIds:[17,19].map(ch),
    knowledge:{knows:['Neiva era sua filha e pediu a desvinculação por escolha própria.','Elis e Kalan são filhos de Neiva e seus netos.','Kalan está preso e corre risco de execução.','Existe uma caixa de registros retirada da Casa da Permanência e Elis pode saber onde ela está.'],suspects:['Elis sabe mais sobre a caixa do que admite.'],falseBeliefs:[],unknown:['A origem, no manuscrito, da informação que recebeu sobre a caixa ainda não foi revelada.'],secrets:['Envia uma mensagem urgente durante a visita de Elis e recebe Filhos da Raiz pouco depois.','Promete ajudar Kalan enquanto condiciona a ajuda à localização da caixa.']},
    destiny:{written:'Ao fim do Capítulo 19, sua relação com Elis muda de reencontro familiar para traição e surge a pergunta de como ela conhecia o segredo da caixa.',state:'Em desenvolvimento'}
  });
  patchCharacter('jesed-character-hadris',{
    summary:'Investigador metódico do Culto que transforma medo, informação e geografia em ferramentas. Depois de usar Elis como ameaça implícita para obter a confissão de Kalan, no Capítulo 19 participa da operação acionada a partir da casa de Ladira. Em vez de perseguir Elis pelos telhados, antecipa que ela usará Teryon como referência e a espera no caminho de fuga.',
    chapterIds:[8,13,14,18,19].map(ch),
    knowledge:{knows:['Kalan confessou.','Elis sabe mais sobre os registros desaparecidos do que admite.','A casa de Ladira é um ponto a partir do qual Elis tentaria descer para a Cidade Intermediária usando Teryon como referência.'],suspects:['Elis pode saber onde a caixa está.'],falseBeliefs:[],unknown:['O esconderijo real da caixa.'],secrets:[]},
    destiny:{written:'Encerra o Capítulo 19 bloqueando a última rota de Elis, depois que Dareth já havia impedido uma captura anterior.',state:'Em desenvolvimento'}
  });
  patchCharacter('jesed-character-vesna-da-permanencia',{
    summary:'Curadora de Maruva que conheceu Neiva e arrisca a própria posição para seguir DV-0417. Depois de encontrar a ligação com Ladira, fornece a Elis roupas sem insígnia capazes de fazê-la passar por uma menina Polar ou criada de casa rica e, assim, atravessar os controles da Cidade Interna quase sem ser questionada.',
    chapterIds:[9,17,19].map(ch),
    knowledge:{knows:['Ladira Polar é mãe de Neiva segundo os documentos e agora também pela confirmação pessoal de Ladira a Elis.','A origem Polar pode sustentar uma contestação jurídica do pertencimento de Kalan.','A aparência e o corte das roupas alteram concretamente a forma como a Cidade Interna trata Elis.'],suspects:[],falseBeliefs:[],unknown:['Se os documentos serão suficientes para suspender o julgamento.','Como Ladira soube da caixa.'],secrets:['Consultou e copiou documentos fora da finalidade para a qual recebeu acesso aos arquivos.','A origem das roupas entregues a Elis não é revelada.']},
    destiny:{written:'Coloca Elis em condições de chegar até Ladira, mas ainda não sabe que a visita terminou numa armadilha.',state:'Em desenvolvimento'}
  });
  D.characters=characters;C.setCollection(BOOK_ID,'characters',characters);

  // Relações: a hipótese familiar vira vínculo confirmado e traição.
  const relationships=C.asArray(D.relationships);
  const rel=relationships.find(item=>item.id==='jesed-dp-rel-elis-ladira');
  if(rel)Object.assign(rel,{
    typeKey:'family',type:'Avó e neta',state:'Reconhecimento familiar seguido de traição',
    description:'Ladira confirma que Neiva era sua filha e reconhece Elis e Kalan como netos. O encontro oferece a Elis histórias da infância da mãe, comida, afeto e a promessa de uma casa. Enquanto a garota acredita ter encontrado família e uma saída para Kalan, Ladira chama os Filhos da Raiz e tenta trocar a salvação do neto pela localização da caixa.',
    fromView:'Elis passa em poucas horas da felicidade de ter uma avó ao choque de perceber que o acolhimento também serviu para mantê-la dentro da casa até a chegada do Culto.',
    toView:'Ladira demonstra afeto real por Neiva e pelos netos, mas coloca a recuperação da caixa e a cooperação com a Raiz acima da confiança recém-formada.',
    evolution:['Cap. 17 · documentos apontam Ladira como provável mãe de Neiva','Cap. 19 · Ladira confirma Neiva como filha e chama Elis de neta','Cap. 19 · promete salvar Kalan e acolher os irmãos','Cap. 19 · chama os Filhos da Raiz e exige a localização da caixa'],
    sources:['Dinastia Polar — Caps. 17 e 19']
  });
  C.setCollection(BOOK_ID,'relationships',relationships);

  // Linha do tempo do novo capítulo.
  const timeline=C.asArray(D.timeline);
  const event19=timeline.find(item=>item.id==='jesed-dp-event-porta-ladira');
  if(event19)Object.assign(event19,{
    name:'Ladira reconhece os netos e entrega Elis à Raiz',category:'Família, pertencimento e traição',period:'Capítulo 19',
    summary:'Elis entra na casa de Ladira, que confirma ser mãe de Neiva, explica a desvinculação e reconhece Elis e Kalan como netos. Depois de prometer salvar Kalan e acolher os dois, Ladira chama os Filhos da Raiz e exige saber onde está a caixa. Elis foge, mas Hadris prevê sua rota e a encurrala.',
    chapterIds:[ch(19)],characterIds:['jesed-character-elis','jesed-character-ladira-polar','jesed-character-vesna-da-permanencia','jesed-character-hadris'],placeIds:['jesed-dp-place-casa-ladira','jesed-dp-place-kaeliran']
  });
  C.setCollection(BOOK_ID,'timeline',timeline);

  // Mistérios: uma parte se resolve, outra nasce no mesmo instante.
  const mysteries=C.asArray(D.mysteries);
  const neiva=mysteries.find(item=>item.id==='jesed-dp-mystery-neiva');
  if(neiva)Object.assign(neiva,{
    status:'Parcialmente resolvido',
    question:'Por que Neiva deixou a família Polar, quem era o pai de Elis e Kalan e quais efeitos jurídicos a desvinculação ainda produz?',
    summary:'O Capítulo 19 confirma que Ladira é mãe de Neiva. Segundo Ladira, Neiva se apaixonou por um homem ligado às forças de Kaeliran, recusou viver numa casa em que ele não pudesse entrar e pediu formalmente a própria desvinculação. A origem materna está confirmada; a identidade do pai, o restante da história e o efeito jurídico sobre os filhos continuam abertos.',
    clues:['Neiva era filha de Ladira Polar.','Neiva pediu formalmente a desvinculação no dia seguinte ao conflito com a mãe.','O homem que amava servia às forças de Kaeliran, provavelmente como batedor ou arqueiro auxiliar.','O homem depois abandonou Neiva, segundo a versão de Ladira.','Ladira reconhece Elis e Kalan como netos.'],
    chapterNumbers:[9,15,17,19],chapterIds:[9,15,17,19].map(ch),characterIds:['jesed-character-elis','jesed-character-karesis','jesed-character-vesna-da-permanencia','jesed-character-ladira-polar','jesed-character-kalan'],placeIds:['jesed-dp-place-roven','jesed-dp-place-maelya','jesed-dp-place-casa-ladira']
  });
  const sentence=mysteries.find(item=>item.id==='jesed-dp-mystery-kalan-sentence');
  if(sentence){
    sentence.chapterNumbers=[13,14,17,18,19];sentence.chapterIds=sentence.chapterNumbers.map(ch);
    sentence.clues=['A pena possível é execução pública.','Hadris ameaça estender consequências a Elis se ela estiver escondendo registros.','A caixa contém a referência que conduz à origem Polar de Neiva.','Selina considera a punição excessiva mesmo reconhecendo a gravidade religiosa do furto.','Ladira afirma que Kalan pode ser salvo se Elis revelar onde está a caixa, reforçando que os registros continuam sendo o centro real da pressão.'];
  }
  if(!mysteries.some(item=>item.id==='jesed-dp-mystery-ladira-caixa'))mysteries.push({
    id:'jesed-dp-mystery-ladira-caixa',slug:'como-ladira-sabia-da-caixa',name:'Como Ladira sabia da caixa?',status:'Aberto',
    question:'Quem contou a Ladira sobre os registros desaparecidos e por que ela estava preparada para chamar a Raiz durante a visita de Elis?',
    summary:'Elis conta sobre Kalan e sobre registros que provam a origem Polar de Neiva, mas nunca menciona a caixa roubada. Mesmo assim, Ladira chama os Filhos da Raiz e pede diretamente que a neta revele onde a caixa está.',
    origin:'Durante a visita do Capítulo 19, Ladira envia discretamente uma mensagem urgente. Pouco depois, Filhos da Raiz chegam à casa e ela condiciona a ajuda a Kalan à entrega da caixa.',
    clues:['Elis nunca menciona a caixa durante a conversa.','Ladira envia um bilhete urgente enquanto mantém Elis ocupada na casa.','Os Filhos da Raiz chegam pouco depois.','Hadris não corre atrás de Elis: prevê que ela usará Teryon como referência e a espera na rota de descida.'],
    chapterNumbers:[19],chapterIds:[ch(19)],characterIds:['jesed-character-ladira-polar','jesed-character-elis','jesed-character-hadris'],placeIds:['jesed-dp-place-casa-ladira'],route:'mystery/como-ladira-sabia-da-caixa'
  });
  D.mysteries=mysteries;C.setCollection(BOOK_ID,'mysteries',mysteries);

  // Temas aprofundados pelo capítulo 19.
  const themes=C.asArray(D.themes);
  const registro=themes.find(item=>item.id==='jesed-theme-dp-registro');
  if(registro){
    registro.chapterIds=[ch(1),ch(2),ch(3),ch(9),ch(13),ch(17),ch(19)];
    registro.description='A condição Polar ou Nular depende de sangue reconhecido e documentação. Tair erra ao transformar uma relação administrativa em linhagem; Kalan rouba documentos para impedir que um papel condene Orel; Hadris afirma que sistemas guardam aquilo que conseguem provar, não a verdade absoluta. DV-0417 leva Elis até Ladira, e no Capítulo 19 o arquivo encontra a memória viva: Ladira confirma Neiva como filha e revela que a desvinculação foi formalmente pedida por ela própria.';
    registro.development=['A quase mutilação de Elis nasce de registros, autorizações e reincidências.','A linhagem de Darven muda o peso social da agressão a Orel.','O desaparecimento da caixa transforma documento em prova, crime e autoridade.','Hadris contrapõe memória e tinta seca.','DV-0417 aponta para a origem Polar de Neiva.','Ladira confirma a filiação e mostra que um documento verdadeiro ainda pode guardar apenas parte da história.'];
    registro.evolution=[...(registro.evolution||[]).filter(e=>e.phase!=='Confirmação'),{phase:'Confirmação',title:'O papel encontra a memória',text:'Ladira confirma que Neiva era sua filha e que pediu a desvinculação por escolha própria, acrescentando contexto humano ao que o registro sozinho não explicava.',chapterIds:[ch(19)]}];
  }
  const protecao=themes.find(item=>item.id==='jesed-theme-dp-protecao');
  if(protecao){
    protecao.chapterIds=[ch(3),ch(4),ch(8),ch(9),ch(13),ch(15),ch(18),ch(19)];
    protecao.development=[...(protecao.development||[]).filter(text=>!String(text).includes('Ladira')),'Ladira promete salvar Kalan e acolher os netos, mas transforma a ajuda em condição: Elis precisa entregar a caixa.'];
    protecao.evolution=[...(protecao.evolution||[]).filter(e=>e.phase!=='Avó'),{phase:'Avó',title:'Eu estou ajudando',text:'Ladira mantém a linguagem de cuidado enquanto chama os Filhos da Raiz e exige a localização da caixa, levando a tensão entre proteção e controle ao vínculo familiar recém-descoberto.',chapterIds:[ch(19)]}];
  }
  D.themes=themes;C.setCollection(BOOK_ID,'themes',themes);
})();
