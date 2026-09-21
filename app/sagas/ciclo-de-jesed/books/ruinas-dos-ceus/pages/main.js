(()=>{const R=window.RS,{D,E,S,AP,REL,EV,MYS,st,H,find,err,BOOKS,charImage,media,initials,linkify,BOOK_COVER_FALLBACK}=R;
function synopsisHtml(value){return String(value||'').split(/\n\s*\n/).filter(Boolean).map(paragraph=>`<p>${E(paragraph)}</p>`).join('')}
function livros(){
  return H('Ciclo de Jesed','Os cinco livros','Clique num livro para ver os detalhes.')+`<div class="bookshelf">${BOOKS.map(b=>{
    const active=b.status==='active';
    const previewable=b.id==='dinastia-polar'||b.id==='herdeiros-das-cinzas';
    const clickable=active||previewable;
    const current=b.id==='ruinas-dos-ceus';
    const coverUrl=b.cover||BOOK_COVER_FALLBACK[b.id];
    return `<article class="book-card ${clickable?'active':'locked'} ${current?'current':''} ${clickable?'click':''}" ${clickable?`data-go="livro/${b.id}"`:'disabled'}>
      <div class="book-card-cover-frame">${coverUrl?`<img class="book-card-cover" src="${E(coverUrl)}" alt="" onerror="this.remove()">`:''}<span class="book-number">Livro ${b.order}</span></div>
      <div class="book-card-copy"><h3>${E(b.name)}</h3><p>${E(b.teaser||b.visual)}</p></div>
      <div class="book-status"><span>${active?'Livro concluído':'Em preparação'}</span><span>${active?(current?'Você está aqui':'Ver detalhes'):(clickable?'Ver detalhes':'Bloqueado')}</span></div>
    </article>`;
  }).join('')}</div>`;
}
function livro(id){
  const b=BOOKS.find(x=>x.id===id);
  if(!b) return err();
  const current=b.id==='ruinas-dos-ceus';
  const externalLinks={'guerras-de-sangue':'guerras.html','dinastia-polar':'dinastia-polar.html','herdeiros-das-cinzas':'herdeiros-das-cinzas.html'};
  const bookLogos={'guerras-de-sangue':'assets/branding/guerras-de-sangue/logo-light.webp'};
  const previewable=b.id==='dinastia-polar'||b.id==='herdeiros-das-cinzas';
  const href=!current?externalLinks[b.id]:null;
  const logo=bookLogos[b.id];
  const titleHtml=logo?`<img class="hero-logo" src="${E(logo)}" alt="${E(b.name)}">`:`<h1>${E(b.name)}</h1>`;
  const stats=current?`<div class="stats"><span class="stat">${D.chapters.length} capítulos</span><span class="stat">${D.characters.length} personagens</span><span class="stat">${D.places.length} lugares</span></div>`:'';
  const eyebrowState=b.status==='active'?(current?'Você está aqui':'Disponível'):previewable?'Em preparação':'Bloqueado nesta etapa';
  return `<button class="back" data-go="livros">← Voltar</button><section class="detailhero">${media(b.cover||BOOK_COVER_FALLBACK[b.id],`Capa de ${b.name}`,'✦','portrait avatar big')}<article class="panel"><p class="eyebrow">Livro ${b.order} · ${eyebrowState}</p>${titleHtml}<div class="lead book-full-synopsis">${synopsisHtml(b.synopsis||b.visual)}</div>${stats}${href?`<div class="hero-actions"><button class="primary-button" data-selector-href="${href}">Ir para a página do livro</button></div>`:''}</article></section>`;
}
function inicio(){
  const focusDescriptors={'Jokara Amaréa':'Peso, verdade e sacrifício','Nestira Amaréa':'Sopro, fé e esperança','Marv':'Construção, cuidado e legado','Loutes':'Mistério além do tempo','Gabasteres':'Força transformada em domínio'};
  const focusChars=['Jokara Amaréa','Nestira Amaréa','Marv','Loutes','Gabasteres'].map(name=>D.characters.find(c=>c.n===name)).filter(Boolean);
  const quick=[['personagens','Personagens','Vidas transformadas pela Queda'],['relacoes','Relações','Laços, rupturas e legados'],['linha','Linha do Tempo','Antes e depois da Queda'],['capitulos','Capítulos',`${D.chapters.length} capítulos escritos`]];
  const selectedPlaces=['Etérea','Nivellia','Bosques de Arion','Nadírion','Primeiro Abrigo','Vale'].map(name=>D.places.find(place=>place.n===name)).filter(Boolean);
  const placeCard=place=>`<article class="home-place-card click" data-go="lugar/${E(place.slug||S(place.n))}" tabindex="0" role="link">${media(place.image,`Ilustração de ${place.n}`,'✦','home-place-media')}<div class="home-place-copy"><p class="eyebrow">${E(place.type||place.region||'Lugar')}</p><h3>${E(place.n)}</h3><p>${E(place.region||place.s)}</p></div><span class="home-card-link">Abrir ficha →</span></article>`;
  return `<section class="hero-map-card home-guide-hero ruinas-split-map-hero">
    <div class="ruinas-hero-map-stack">
      <img class="ruinas-hero-map-base" src="assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-nadirion.webp" alt="Mapa da Superfície">
      <img class="ruinas-hero-map-fade" src="assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-eterea.webp" alt="Mapa de Etérea">
    </div>
    <div class="hero-map-content"><p class="eyebrow">Ciclo de Jesed — Guia do Livro</p><img class="hero-logo glow-title" src="assets/branding/ruinas-dos-ceus/logo-light.webp" alt="Ruínas dos Céus"><p class="lead">A queda de Etérea e o nascimento da primeira raiz Polar.</p><div class="hero-actions"><button class="primary-button" data-go="mapa">Abrir mapas</button><button class="secondary-button" data-go="livros">Ver os cinco livros</button><button class="secondary-button contemplate-button" data-contemplative="ruinas">✦ Contemplar este mundo</button></div></div>
  </section>
  <section class="section home-guide-section"><div class="section-heading home-section-heading"><div><p class="eyebrow">Comece por aqui</p><h2>Navegue pelo livro</h2><p>Quatro caminhos para compreender a história sem repetir o conteúdo das fichas.</p></div></div><div class="grid quick-grid home-guide-grid">${quick.map(x=>`<article class="card click home-guide-card" data-go="${x[0]}" tabindex="0" role="link"><span class="home-guide-mark" aria-hidden="true">${x[0]==='personagens'?'◌':x[0]==='relacoes'?'⌘':x[0]==='linha'?'⌁':'▤'}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('')}</div></section>
  <section class="section home-map-overview"><div class="section-heading home-section-heading"><div><p class="eyebrow">Dois períodos cartográficos</p><h2>Etérea e A Superfície</h2><p>O mapa muda com a Queda: primeiro a civilização suspensa; depois a floresta desconhecida.</p></div><button class="secondary-button home-light-button" data-go="mapa">Abrir mapas interativos</button></div><div class="home-map-preview-grid"><button class="home-map-preview" data-map-open="eterea"><img src="assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-eterea.webp" alt="Mapa de Etérea"></button><button class="home-map-preview" data-map-open="superficie"><img src="assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-nadirion.webp" alt="Mapa da Superfície"></button></div></section>
  <div class="section metrics-grid">${[[D.characters.length,'personagens'],[D.places.length,'lugares'],[D.chapters.length,'capítulos'],[(D.common?.entities?.timeline||D.timeline||[]).length,'eventos na linha do tempo'],[MYS.length,'mistérios']].map(x=>`<article class="metric-card"><strong>${x[0]}</strong><span>${x[1]}</span></article>`).join('')}</div>
  <section class="section panel home-focus-section"><div class="section-heading home-section-heading"><div><p class="eyebrow">Vidas centrais</p><h2>Personagens em foco</h2><p>As figuras principais que atravessam a queda, a sobrevivência e o primeiro legado Polar.</p></div><button class="home-text-button" data-go="personagens">Ver todos</button></div><div class="home-focus-grid">${focusChars.map(c=>`<button class="home-focus-card" data-go="personagem/${S(c.n)}">${media(charImage(c.n),`Retrato de ${c.n}`,initials(c.n),'home-focus-avatar')}<span><strong>${E(c.n)}</strong><small>${E(focusDescriptors[c.n])}</small></span></button>`).join('')}</div></section>
  <section class="section home-places-section"><div class="section-heading home-section-heading"><div><p class="eyebrow">Céu, queda e sobrevivência</p><h2>Lugares</h2><p>Espaços essenciais para orientar a leitura do Livro I.</p></div><button class="home-text-button" data-go="lugares">Ver todos os lugares</button></div><div class="home-place-grid">${selectedPlaces.map(placeCard).join('')}</div></section>`;
}
function capitulos(){let a=D.chapters.filter(x=>`${x.n} ${x.t} ${x.s}`.toLowerCase().includes(st.q.toLowerCase()));return H('História','Capítulos','Os 24 capítulos escritos.',`<input class="search" data-search placeholder="Pesquisar…" value="${E(st.q)}">`)+`<div class="grid">${a.map(x=>`<article class="card click" data-go="capitulo/${x.n}">${x.img?`<img class="chapter-thumb" src="${encodeURI(x.img)}" alt="" loading="lazy">`:''}<p class="meta">Capítulo ${x.n}</p><h3>${E(x.t)}</h3><p>${E(x.s)}</p></article>`).join('')}</div>`}
function miniEntity(title,subtitle,route,stateText=''){
  return `<button class="mini-related-button" data-go="${E(route)}"><strong>${E(title)}</strong>${subtitle?`<small>${E(subtitle)}</small>`:''}${stateText?`<small>${E(stateText)}</small>`:''}</button>`;
}
function capitulo(id){
  const c=D.chapters[Number(id)-1];if(!c)return err();
  const chars=D.characters.filter(x=>(AP[x.n]||[]).includes(c.n));
  const places=(D.common?.entities?.places||[]).filter(p=>(p.chapterIds||[]).includes(c.id));
  const events=(D.common?.entities?.timeline||[]).filter(ev=>(ev.chapterIds||[]).includes(c.id));
  const ev=EV.find(x=>x[0]===c.n);
  const idx=EV.findIndex(x=>x[0]===c.n);
  const causa=idx>0?EV[idx-1][1]:(idx===0?'A estabilidade aparente de Etérea.':null);
  const previous=D.chapters[c.n-2],next=D.chapters[c.n];
  const navigation=`<nav class="chapter-pagination chapter-pagination-top" aria-label="Navegação entre capítulos">${previous?`<button class="secondary-button" data-go="capitulo/${previous.n}">← Capítulo ${previous.n}<small>${E(previous.t)}</small></button>`:`<button class="secondary-button" disabled>Primeiro capítulo</button>`}${next?`<button class="primary-button" data-go="capitulo/${next.n}">Capítulo ${next.n} →<small>${E(next.t)}</small></button>`:`<button class="secondary-button" disabled>Último capítulo</button>`}</nav>`;
  return `<button class="back" data-go="capitulos">← Voltar</button>${navigation}
    <section class="chapter-hero-panel ${c.img?'has-art':''}">${c.img?`<img src="${encodeURI(c.img)}" alt="">`:''}<div><p class="eyebrow">Resumo rápido${ev?` · ${E(ev[1])}`:''}</p><h2>${E(c.s)}</h2>${causa?`<div class="tags"><span class="tag">Vem de: ${E(causa)}</span></div>`:''}</div></section>
    <section class="chapter-layout">
      <article class="panel chapter-longform"><div class="section-heading"><div><p class="eyebrow">Acontecimentos do capítulo</p><h2>Tudo o que acontece</h2></div></div><div class="chapter-prose">${(window.RUINAS_CHAPTER_DETAILS?.[c.n]||[c.s]).map(p=>`<p>${linkify(p)}</p>`).join('')}</div></article>
      <aside class="chapter-context-column">
        <article class="panel section-card"><h3>Personagens</h3><div class="social-member-row">${chars.length?chars.map(x=>`<button class="social-member" data-go="personagem/${S(x.n)}"><img src="${E(charImage(x.n))}" alt="${E(x.n)}" loading="lazy" onerror="this.hidden=true"><span>${E(x.n)}</span></button>`).join(''):'<p class="empty-inline">Nenhum personagem ligado.</p>'}</div></article>
        <article class="panel section-card"><h3>Lugares</h3><div class="mini-related-list">${places.length?places.map(p=>miniEntity(p.name,p.type||'Lugar',`lugar/${p.slug}`)).join(''):'<p class="empty-inline">Nenhum lugar ligado.</p>'}</div></article>
        ${events.length?`<article class="panel section-card"><h3>Linha do Tempo</h3><div class="mini-related-list">${events.map(e=>miniEntity(e.name,e.category||'Acontecimento',`linha/${e.slug}`)).join('')}</div></article>`:''}
      </aside>
    </section>`;
}
R.pages={inicio,capitulos,capitulo,livros,livro};})();