(()=>{const R=window.RS,{D,E,S,H,charImage,find,linkify}=R,P=R.pages,SOC=window.RUINAS_SOCIAL||{relationshipTypes:[],relationships:[],families:[],organisations:[]};
const findCharacter=name=>find(D.characters,S(name));
const characterButton=(name,cls='social-member')=>{const c=findCharacter(name),src=c?.image||charImage(name);return c?`<button class="${cls}" data-go="personagem/${S(name)}" title="Abrir ${E(name)}"><img src="${E(src)}" alt="${E(name)}" loading="lazy" onerror="this.hidden=true"><span>${E(c.n||name)}</span></button>`:`<span class="${cls}"><span>${E(name)}</span></span>`};
const socialLegend=()=>`<div class="social-legend" aria-label="Legenda dos tipos de relação">${SOC.relationshipTypes.map(type=>`<span class="social-legend-item" data-type="${E(type.key)}" title="${E(type.description)}"><i class="social-legend-swatch"></i>${E(type.label)}</span>`).join('')}</div>`;
P.relacoes=()=>{
  const relationships=SOC.relationships||[];
  const names=[...new Set(relationships.flatMap(r=>[r.from,r.to]))];
  const nodes=names.map((name,i)=>{const angle=(Math.PI*2*i/Math.max(names.length,1))-Math.PI/2;return{name,x:50+Math.cos(angle)*36,y:50+Math.sin(angle)*35}});
  const findNode=name=>nodes.find(n=>n.name===name);
  return H('Pessoas','Mapa de relações','Família, amizade, proteção, influência, lealdade e conflito no Livro I. As cores do mapa seguem a legenda.')+
    socialLegend()+
    `<section class="relationship-canvas ${nodes.length<3?'few-nodes':''}">
      <svg class="relationship-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${relationships.map(rel=>{const a=findNode(rel.from),b=findNode(rel.to);return a&&b?`<line class="${E(rel.typeKey)}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`:''}).join('')}</svg>
      ${nodes.map(n=>{const c=findCharacter(n.name);return`<button class="rel-node" style="left:${n.x}%;top:${n.y}%" data-go="personagem/${S(n.name)}"><img src="${E(c?.image||charImage(n.name))}" alt="" onerror="this.style.display='none'"><strong>${E(n.name)}</strong></button>`}).join('')}
    </section>
    <section class="social-relations-grid">${relationships.map(rel=>`<article class="social-relation-card" data-type="${E(rel.typeKey)}" id="${E(rel.slug)}"><div class="social-relation-pair">${characterButton(rel.from,'social-relation-person')}<span class="social-relation-link" aria-hidden="true">⌁</span>${characterButton(rel.to,'social-relation-person')}</div><h3>${E(rel.type)}</h3><p class="social-relation-state">${E(rel.state)}</p><p>${E(rel.description)}</p><div class="social-perspectives"><p><strong>${E(rel.from)}:</strong> ${E(rel.fromView)}</p><p><strong>${E(rel.to)}:</strong> ${E(rel.toView)}</p></div><div class="social-evolution">${(rel.evolution||[]).map(item=>`<span>${E(item)}</span>`).join('')}</div></article>`).join('')}</section>`;
};
P.familias=()=>{
  const family=SOC.families?.[0];if(!family)return H('Pessoas','Famílias','Nenhuma família registada neste período.');
  return H('Pessoas','Família','Em Ruínas dos Céus, apenas o núcleo Amaréa possui uma ficha familiar própria.')+
    `<section class="social-hero-card"><img src="${E(family.image)}" alt="Imagem atmosférica de ${E(family.name)}" loading="lazy"><div class="social-hero-copy"><p class="eyebrow">Família de Nivelia</p><h2>${E(family.name)}</h2><p>${E(family.summary)}</p><div class="social-member-row">${family.members.map(name=>characterButton(name)).join('')}</div></div></section>
    <section class="social-detail-grid">${family.sections.map(section=>`<article class="social-detail-card"><h3>${E(section.title)}</h3><p>${E(section.text)}</p></article>`).join('')}</section>`;
};
P.organizacoes=()=>H('Pessoas','Organizações','Instituições, ofícios e grupos realmente presentes em Etérea ou formados depois da Queda.')+
  `<section class="social-entity-grid">${SOC.organisations.map(org=>`<article class="social-entity-card"><div class="social-entity-image"><img src="${E(org.image)}" alt="Imagem atmosférica de ${E(org.name)}" loading="lazy"></div><div class="social-entity-copy"><span class="social-entity-type">${E(org.type)}</span><h2>${E(org.name)}</h2><p>${E(org.description)}</p><dl><div><dt>Função</dt><dd>${E(org.function)}</dd></div><div><dt>Atuação</dt><dd>${E(org.activity)}</dd></div></dl><div class="social-member-row">${org.members.map(name=>characterButton(name)).join('')}</div></div></article>`).join('')}</section>`;

function timelineItems(){return [...(D.common?.entities?.timeline||D.timeline||[])].sort((a,b)=>(a.sortKey||0)-(b.sortKey||0));}
const timelineRelationLabel=relation=>({ocorre:'Ocorre no Capítulo',citado:'Citado no Capítulo',recordado:'Recordado no Capítulo',revelado:'Revelado no Capítulo',investigado:'Investigado no Capítulo',consequencia:'Consequência narrada no Capítulo'})[relation]||'Relacionado ao Capítulo';
function timelineFind(id){return timelineItems().find(item=>item.id===id||item.slug===id||(item.legacySlugs||[]).includes(id));}
function timelineSelection(){try{return localStorage.getItem('di-rdc-timeline-selection')||''}catch{return''}}
function saveTimelineSelection(slug){try{localStorage.setItem('di-rdc-timeline-selection',slug)}catch{}}
function chapterLinks(item){return item.chapterLinks?.length?item.chapterLinks:(item.chapterIds||[]).map(chapterId=>({chapterId,relation:'ocorre',note:''}));}
function timelineLinkLine(label,html,empty='Não registado'){return `<div class="rdc-timeline-linked"><strong>${E(label)}</strong><span>${html.length?html.join('<i>·</i>'):E(empty)}</span></div>`;}
P.linha=()=>{
  const selected=timelineSelection();
  return H('História','Linha do Tempo','Cronologia de Jesed organizada pela data real dos acontecimentos, e não pela ordem dos capítulos.')+
    `<section class="rdc-era-guide"><div><strong>A.Q.</strong><span>Antes da Queda</span></div><div><strong>D.Q.</strong><span>Depois da Queda</span></div><p>Datas aproximadas são indicadas quando o manuscrito não estabelece o ciclo ou o mês com precisão.</p></section>
    <section class="rdc-timeline-list">${timelineItems().map(item=>{
      const chapters=chapterLinks(item).map(ref=>{const ch=D.common?.findById?.('chapters',ref.chapterId);return ch?`<button data-go="capitulo/${ch.number}">${E(timelineRelationLabel(ref.relation))} ${ch.number}</button>`:''}).filter(Boolean);
      const characters=(item.characterIds||[]).map(id=>D.common?.findById?.('characters',id)).filter(Boolean).slice(0,5).map(c=>`<button data-go="personagem/${E(c.slug)}">${E(c.name)}</button>`);
      const places=(item.placeIds||[]).map(id=>D.common?.findById?.('places',id)).filter(Boolean).slice(0,4).map(p=>`<button data-go="lugar/${E(p.slug)}">${E(p.name)}</button>`);
      return `<article class="rdc-timeline-card ${selected===item.slug?'selected':''}" data-go="linha/${E(item.slug)}" data-timeline-card="${E(item.slug)}" tabindex="0" role="link" aria-label="Abrir ${E(item.name)}"><div class="rdc-timeline-head"><time>${E(item.dateLabel||item.period||'Data não estabelecida')}</time><span>${E(item.category||'Acontecimento')}</span></div><h2>${E(item.name)}</h2><p>${E(item.summary||'Descrição ainda não registada.')}</p><div class="rdc-timeline-links">${timelineLinkLine('Capítulos',chapters)}${timelineLinkLine('Personagens',characters)}${timelineLinkLine('Lugares',places,'Sem lugar determinado')}</div></article>`;
    }).join('')}</section>`;
};

P.linhaItem=id=>{
  const item=timelineFind(id);if(!item)return R.err();saveTimelineSelection(item.slug);
  const chapters=chapterLinks(item).map(ref=>({ref,ch:D.common?.findById?.('chapters',ref.chapterId)})).filter(x=>x.ch);
  const characters=(item.characterIds||[]).map(characterId=>D.common?.findById?.('characters',characterId)).filter(Boolean);
  const places=(item.placeIds||[]).map(placeId=>D.common?.findById?.('places',placeId)).filter(Boolean);
  const related=(item.relatedEventIds||[]).map(timelineFind).filter(Boolean);
  return `<button class="back" data-go="linha">← Voltar para a Linha do Tempo</button>`+
    H('Linha do Tempo',item.name,item.dateLabel||item.period||'Data não estabelecida')+
    `<section class="rdc-timeline-detail"><article class="panel rdc-timeline-narrative"><p class="eyebrow">${E(item.category||'Acontecimento')}</p><p class="lead">${linkify(item.summary||'Descrição ainda não registada.')}</p>${item.context?`<h2>Contexto</h2><p>${linkify(item.context)}</p>`:''}${item.cause?`<h2>Causa</h2><p>${linkify(item.cause)}</p>`:''}${item.consequences?.length?`<h2>Consequências</h2><ul>${item.consequences.map(x=>`<li>${linkify(x)}</li>`).join('')}</ul>`:''}${(item.publicVersion||item.truth)?`<div class="rdc-truth-grid">${item.publicVersion?`<article><small>Versão pública</small><p>${linkify(item.publicVersion)}</p></article>`:''}${item.truth?`<article class="truth"><small>O que realmente aconteceu</small><p>${linkify(item.truth)}</p></article>`:''}</div>`:''}</article>
      <aside class="rdc-timeline-aside"><article class="panel"><h2>Capítulos relacionados</h2><div class="rdc-reference-list">${chapters.length?chapters.map(({ref,ch})=>`<button data-go="capitulo/${ch.number}"><strong>${E(timelineRelationLabel(ref.relation))} ${ch.number}</strong><span>${E(ch.title)}</span>${ref.note?`<small>${E(ref.note)}</small>`:''}</button>`).join(''):'<p>Nenhum capítulo ligado.</p>'}</div></article>
      <article class="panel"><h2>Personagens relacionados</h2><div class="rdc-entity-list">${characters.length?characters.map(c=>`<button data-go="personagem/${E(c.slug)}"><img src="${E(c.image||charImage(c.name))}" alt="" onerror="this.hidden=true"><span>${E(c.name)}</span></button>`).join(''):'<p>Nenhum personagem registado.</p>'}</div></article>
      <article class="panel"><h2>Lugares relacionados</h2><div class="rdc-reference-list">${places.length?places.map(p=>`<button data-go="lugar/${E(p.slug)}"><strong>${E(p.name)}</strong><span>${E(p.type||'Lugar')}</span></button>`).join(''):'<p>Nenhum lugar determinado.</p>'}</div></article>
      ${related.length?`<article class="panel"><h2>Acontecimentos relacionados</h2><div class="rdc-reference-list">${related.map(e=>`<button data-go="linha/${E(e.slug)}"><strong>${E(e.name)}</strong><span>${E(e.dateLabel||'Data não estabelecida')}</span></button>`).join('')}</div></article>`:''}</aside></section>`;
};

})();