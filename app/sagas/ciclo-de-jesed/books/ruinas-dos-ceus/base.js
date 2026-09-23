(()=>{
const D=window.RUINAS_DATA,$=(q,r=document)=>r.querySelector(q),E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),S=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const AP={'Jokara Amaréa':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],'Nestira Amaréa':[1,2,3,4,5,7,8,9,13,14,15,16,17,18,19,20,21,22,23,24,25],Mariv:[4,12,13,14,15,16,17,18,19,20,21,22,23,24,25],Loutes:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25],Efepar:[1,2,3,5,7,8,9],'Mirel Amaréa':[1,2,3,4,5,7,8,9],Sersi:[2,3,7,8,13,14],Yndra:[4,5,6,8],Yoral:[1,2,4,9,21],Yrisea:[1,3,4,5],'Professor Taliver':[4,5,8,9],Platisa:[3,15,16,17,18,19,20],Liri:[6,7,9,18],Maletar:[8,9,13,14,16,17,18,19,20,21],Gabasteri:[12,13,14,15,16,17,18,19,20,21,22,23,24]};
const REL=[['Jokara Amaréa','Nestira Amaréa','Irmãs: Peso e Sopro'],['Jokara Amaréa','Loutes','Proteção e mistério'],['Jokara Amaréa','Efepar','Amizade e apoio'],['Nestira Amaréa','Mariv','Legado e continuidade'],['Maletar','Gabasteri','Ordem e domínio'],['Jokara Amaréa','Gabasteri','Resistência moral'],['Yoral','Jokara Amaréa','Pai e legado'],['Platisa','Jokara Amaréa','Conhecimento e humanidade']];
const EV=[[1,'As primeiras pedras'],[2,'O Primeiro Voo falha'],[3,'Loutes recebe um nome'],[4,'A profecia de Yndra'],[6,'O livro na caverna'],[7,'A denúncia pública'],[9,'O Cataclisma'],[10,'O primeiro fogo'],[15,'A chegada de Platisa'],[17,'O nome Polar'],[20,'As ruínas revelam a origem'],[22,'A lei do peso'],[23,'O sacrifício de Jokara'],[24,'A última perseguição'],[25,'O Vale']];
const MYS=[['loutes','Quem é Loutes?','Aberto','Uma criança deslocada, ligada ao ciclo e ao tempo; a origem permanece sem explicação.'],['ilhas-baixas','As Ilhas Baixas existiam?','Resolvido','Não. Eram uma mentira institucional usada para ocultar a morte dos exilados.'],['eterea','Por que Etérea caiu?','Parcial','Há sinais físicos e leitura simbólica pelo Peso, mas não uma resposta totalmente fechada.'],['ruinas','Quem construiu as ruínas?','Parcial','Povos da superfície ligados aos ancestrais eterí.'],['sopro','O Sopro é divino ou natural?','Aberto','A narrativa preserva as duas interpretações.']];
const LORE={fauna:[['Nuari',8],['Aranita',2],['Raukhar',5,'assets/books/ciclo-de-jesed/shared/lore/fauna/raukhar.webp','Citado no texto apenas como "a Fera" — é a mesma criatura de Guerras de Sangue.'],['Criatura de escamas negras',2],['Ave branca',1],['Criatura segmentada',1]],flora:[['Selnara',3],['Flor-da-névoa',2],['Seda-das-alturas',2],['Musgos florais',2],['Folha colossal',1],['Raízes vivas',7]],alimentos:[['Carne de nuari',3],['Selnara seca',2],['Mel de flor-aérea',2],['Raízes cozidas',2],['Frutas da superfície',3],['Peixe de riacho',4]],conceitos:[['Sopro',12],['Peso',13],['Primeiro Voo',5],['Círculo do Peso',3],['Verbo da Corrente',2],['Ilhas Baixas',4]]};
const NAV=[['Visão geral',[['inicio','Início'],['livros','Livros']]],['História',[['capitulos','Capítulos'],['linha','Linha do Tempo']]],['Pessoas',[['personagens','Personagens'],['relacoes','Relações'],['familias','Famílias'],['organizacoes','Organizações']]],['Mundo',[['mapa','Mapa'],['lugares','Lugares']]],['Lore',[['fauna','Fauna'],['flora','Flora'],['alimentos','Alimentos'],['conceitos','Conceitos e leis'],['galeria','Galeria']]],['Planejamento',[['temas','Temas'],['misterios','Mistérios'],['canon','Regras canônicas']]]];
const SAGAS=[
  {id:'ciclo-de-jesed',name:'Ciclo de Jesed',status:'active'},
  {id:'diario-sobrenatural',name:'Diário Sobrenatural',status:'locked'},
  {id:'cronicas-de-belfex',name:'Crônicas de Belfex',status:'locked'},
  {id:'spacetheft',name:'Spacetheft',status:'locked'},
  {id:'viajantes-dimensionais',name:'Viajantes Dimensionais',status:'locked'},
  {id:'misterio-oculto',name:'Mistério Oculto',status:'locked'},
  {id:'a-uniao',name:'A União',status:'locked'}
];
const BOOKS=[
  {id:'ruinas-dos-ceus',order:1,name:'Ruínas dos Céus',status:'active',cover:'assets/books/ciclo-de-jesed/ruinas-dos-ceus/cover.webp',visual:'Uma civilização suspensa cai sobre um mundo que jurava não existir.',teaser:"Quando as ilhas de Etérea começam a cair, uma jovem desacreditada precisa carregar a verdade até uma superfície que seu povo jurava não existir.",synopsis:"Em Etérea, ilhas flutuam acima de um mundo que ninguém acredita existir. Entre rituais de leveza, correntes de vento e uma sociedade que aprendeu a tratar todo peso como ameaça, Jokara Amaréa percebe sinais que os Oradores preferem silenciar: pedras começam a cair, os ventos falham e uma criança encontrada no vazio pronuncia palavras que não deveria conhecer. Quando uma mulher condenada anuncia que os céus cairão, Jokara precisa decidir se continuará obedecendo a uma civilização construída sobre certezas ou se aceitará o fardo de uma verdade capaz de destruí-la.\n\nQuando Etérea finalmente se rompe, o povo que jamais tocou o chão desperta numa superfície desconhecida, onde fome, lama, animais e medo substituem os antigos rituais. Ferida e cercada por sobreviventes que disputam o significado de força, Jokara terá de enfrentar não apenas as criaturas da floresta, mas a possibilidade de que o maior perigo seja reconstruir, sob outro nome, as mesmas injustiças que fizeram o céu desabar.\n\nRuínas dos Céus é uma fantasia épica sobre fé, sobrevivência e o nascimento de um legado. Uma história em que leveza e peso deixam de ser opostos, a verdade exige sacrifício e toda queda pode esconder o primeiro passo de um novo ciclo."},
  {id:'guerras-de-sangue',order:2,name:'Guerras de Sangue',status:'active',cover:'assets/books/ciclo-de-jesed/guerras-de-sangue/cover.webp',visual:'Duas soberanas e oito clãs são arrastados por uma guerra construída sobre segredos.',teaser:"Um talismã junto a dois mortos rompe a paz de Jesed e coloca duas soberanas, oito clãs e uma vingança antiga no caminho da guerra.",synopsis:"Mais de duzentos ciclos depois da Queda, a Dinastia Polar mantém Kaendar unida por leis, memória e medo. Mas quando dois jovens Polar são encontrados mortos junto de um talismã Tondrar, a paz construída por Orionus começa a ruir. As soberanas gêmeas Kaelina e Alyra herdam o mesmo trono e respostas opostas: uma acredita que a verdade ainda pode impedir a guerra; a outra sabe que, em Jesed, hesitar pode parecer fraqueza.\n\nEnquanto os clãs medem fome, território e antigas humilhações, Rendar retorna da floresta carregando os nomes de sua família morta e uma vingança que pode incendiar o mundo. Buldar, Tondrar, Vendrar, Glydar, Cendar, Urtistar e Fendelar são arrastados para alianças frágeis, mentiras políticas e batalhas em que ninguém permanece inocente. Por trás dos exércitos, segredos enterrados na morte de Orionus revelam que a guerra talvez tenha sido construída muito antes do primeiro sangue.\n\nGuerras de Sangue é uma fantasia política sobre duas irmãs, um reino cercado e povos que aprenderam a sobreviver cobrando dívidas. Em Jesed, justiça e vingança caminham juntas, a paz também pode oprimir e toda escolha capaz de salvar um povo condena alguém a pagar o preço."},
  {id:'dinastia-polar',order:3,name:'Dinastia Polar',status:'locked',cover:'assets/books/ciclo-de-jesed/dinastia-polar/cover.webp',visual:'Pedra azul-escura, ouro envelhecido, anéis concêntricos e peso institucional.',synopsis:"Kaeliran é uma metrópole de muralhas concêntricas governada pela mais antiga e poderosa linhagem de Jesed: os Polar. A dinastia sobreviveu a guerras, epidemias, revoltas e sucessões violentas, transformando a Raiz em símbolo de fé, ordem e permanência. Para o povo, a Dinastia é a razão pela qual a cidade ainda permanece de pé. Para aqueles que vivem esmagados nos anéis exteriores, porém, sua grandeza tem um preço cada vez mais difícil de suportar.\n\nVetarius Polar herdou o poder ainda criança e governa há décadas sem jamais precisar conquistá-lo. Enquanto trata as tensões entre as dez dinastias como mais uma crise passageira, líderes de toda Jesed aprovam a realização do primeiro Torneio Decenal, uma competição criada para substituir guerras abertas e decidir disputas por meio da força de seus representantes. A arena começa a ser erguida em território Braedar, e Kaeliran prepara seus combatentes para o maior torneio já realizado em Jesed.\n\nEnquanto guerreiros, líderes e peregrinos atravessam o continente em direção à arena, antigas dúvidas voltam a circular entre aqueles que observam os Polar há tempo demais. Soberanos morrem, herdeiros ocupam seus lugares e gerações inteiras desaparecem, mas a Dinastia permanece no centro de Jesed como se o próprio tempo não conseguisse removê-la. Para alguns, isso é prova da proteção da Raiz. Para outros, é apenas o resultado de séculos de poder, medo e histórias cuidadosamente preservadas. Porém, à medida que o torneio se aproxima, torna-se cada vez mais difícil distinguir aquilo que mantém os Polar em seu auge daquilo que poderá, um dia, destruí-los."},
  {id:'herdeiros-das-cinzas',order:4,name:'Herdeiros das Cinzas',status:'locked',cover:'assets/books/ciclo-de-jesed/herdeiros-das-cinzas/cover.webp',visual:'Cinza azulada, neve suja, ruínas partidas e aurora fria sobre um mundo em silêncio.'},
  {id:'coracao-de-poeira',order:5,name:'Coração de Poeira',status:'locked',cover:null,visual:'Areia, poeira suspensa, vazio, espirais temporais e luz quase extinta.'}
];
const charFiles={'Jokara Amaréa':'jokara','Nestira Amaréa':'nestira','Mirel Amaréa':'mirel-amarea','Mariv':'marv','Yrisea':'yrsea','Professor Taliver':'professor-talver','Maletar':'malthar','Gabasteri':'gabasteres'};
const placeFiles={'Nivelia':'nivellia'};
const charImage=name=>`assets/books/ciclo-de-jesed/ruinas-dos-ceus/characters/${charFiles[name]||S(name)}.webp`;
const placeImage=name=>`assets/books/ciclo-de-jesed/ruinas-dos-ceus/places/${placeFiles[name]||S(name)}.webp`;
const initials=name=>String(name).split(' ').map(x=>x[0]).filter(Boolean).slice(0,2).join('');
const media=(src,alt,fallback,cls='',extra='')=>`<div class="${cls}"${extra}><img src="${E(src)}" alt="${E(alt)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><b class="media-fallback" hidden>${E(fallback)}</b></div>`;
const st={route:'',tab:'geral',q:'',sort:'alpha',unused:false,mapPhase:'eterea'},H=(k,t,s='',x='')=>`<div class="head"><div><p class="eyebrow">${E(k)}</p><h1>${E(t)}</h1><p>${E(s)}</p></div>${x}</div>`,go=r=>location.hash='#/'+r,find=(a,id)=>a.find(x=>S(x.n)===id||x.n===id),err=()=>'<div class="empty"><h2>Página não encontrada</h2></div>';
function crumbSegments(){
  const [b,id]=st.route.split('/');
  const detailParents={
    capitulo:{route:'capitulos',label:'Capítulos'},
    personagem:{route:'personagens',label:'Personagens'},
    lugar:{route:'lugares',label:'Lugares'},
    misterio:{route:'misterios',label:'Mistérios'},
    tema:{route:'temas',label:'Temas'},
    conceito:{route:'conceitos',label:'Conceitos e leis'},
    linha:{route:'linha',label:'Linha do Tempo'},
    livro:{route:'livros',label:'Livros'}
  };
  const navEntry=NAV.flatMap(x=>x[1]).find(x=>x[0]===b);
  const parent=id?detailParents[b]:null;
  const baseLabel=parent?.label||navEntry?.[1]||'Início';
  const baseRoute=parent?.route||b;
  const segs=[{label:'Ciclo de Jesed'},{label:'Ruínas dos Céus',go:'inicio'}];
  if(b!=='inicio') segs.push({label:baseLabel,go:id?baseRoute:undefined});
  if(id){
    let detail=null;
    if(b==='personagem'){const c=find(D.characters,id);detail=c?.n;}
    else if(b==='capitulo'){const c=D.chapters[Number(id)-1];detail=c?`Capítulo ${c.n}`:null;}
    else if(b==='lugar'){const p=find(D.places,id);detail=p?.n;}
    else if(b==='misterio'){const m=D.common?.findBySlug?.('mysteries',id);detail=m?.name;}
    else if(b==='tema'){const t=D.common?.findBySlug?.('themes',id);detail=t?.name;}
    else if(b==='conceito'){const c=D.common?.findBySlug?.('concepts',id);detail=c?.name;}
    else if(b==='linha'){const item=D.common?.findBySlug?.('timeline',id);detail=item?.name;}
    if(detail) segs.push({label:detail});
  }
  return segs;
}
const NAV_SYMBOLS={inicio:'⌂',livros:'▥',capitulos:'▤',linha:'⌁',personagens:'◌',relacoes:'⌘',familias:'◇',organizacoes:'⚑',mapa:'⌖',lugares:'◉',fauna:'✣',flora:'❧',alimentos:'◡',conceitos:'◫',galeria:'▧',temas:'◆',misterios:'?',canon:'§'};
function nav(){
  const b=st.route.split('/')[0];
  $('#nav').innerHTML=NAV.map(([g,a])=>`<div class="group"><span>${g}</span>${a.map(([r,l,href])=>{const icon=NAV_SYMBOLS[r]||'•';return href?`<a class="navb" href="${href}" data-tooltip="${E(l)}" title="${E(l)}"><span class="navb-icon" aria-hidden="true">${icon}</span><span class="navb-label">${E(l)}</span></a>`:`<button class="navb ${b===r?'active':''}" data-go="${r}" data-tooltip="${E(l)}" title="${E(l)}"><span class="navb-icon" aria-hidden="true">${icon}</span><span class="navb-label">${E(l)}</span></button>`}).join('')}</div>`).join('');
  const segs=crumbSegments();
  $('#crumb').innerHTML=segs.map((s,i)=>{
    const isLast=i===segs.length-1;
    const inner=(!isLast&&s.go)?`<button data-go="${s.go}">${E(s.label)}</button>`:`<span>${E(s.label)}</span>`;
    return i?`<span class="crumb-sep" aria-hidden="true">›</span>${inner}`:inner;
  }).join('');
}
const ALIASES=[...D.characters.map(c=>({text:c.n,route:`personagem/${S(c.n)}`})),...D.places.map(p=>({text:p.n,route:`lugar/${S(p.n)}`}))]
  .filter(a=>a.text&&a.text.length>2).sort((a,b)=>b.text.length-a.text.length);
const ALIAS_PATTERN=ALIASES.length?new RegExp('('+ALIASES.map(a=>a.text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g'):null;
function linkify(text){
  const raw=String(text??'');
  if(!ALIAS_PATTERN) return E(raw);
  let out='',last=0;
  for(const m of raw.matchAll(ALIAS_PATTERN)){
    const start=m.index??0,hit=m[0];
    out+=E(raw.slice(last,start));
    const found=ALIASES.find(a=>a.text===hit);
    out+=found?`<button class="inline-link" data-go="${found.route}">${E(hit)}</button>`:E(hit);
    last=start+hit.length;
  }
  out+=E(raw.slice(last));
  return out;
}
const BOOK_COVER_FALLBACK={'ruinas-dos-ceus':'assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-eterea.webp','guerras-de-sangue':'assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp'};
window.RS={D,$,E,S,AP,REL,EV,MYS,LORE,NAV,SAGAS,BOOKS,st,H,go,find,err,nav,charImage,placeImage,initials,media,linkify,BOOK_COVER_FALLBACK};
})();
