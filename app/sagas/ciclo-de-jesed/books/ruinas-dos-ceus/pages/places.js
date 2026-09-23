(()=>{
  const R=window.RS,{D,E,S,st,H,find,err,placeImage,media,linkify}=R,P=R.pages;
  const getCharacter=id=>D.characters.find(character=>character.id===id);
  const getChapter=id=>D.chapters.find(chapter=>chapter.id===id);
  const getTimeline=id=>(D.common?.entities?.timeline||D.timeline||[]).find(entry=>entry.id===id||entry.slug===id);
  const populationLabel=place=>place?.population?.label||'';

  const featureBlock=(title,values)=>{
    const list=(Array.isArray(values)?values:[]).filter(Boolean);
    if(!list.length)return'';
    return `<article class="place-feature-card"><h3>${E(title)}</h3><ul>${list.map(value=>`<li>${linkify(value)}</li>`).join('')}</ul></article>`;
  };

  const characterCards=place=>{
    const ids=[...new Set(place.characterIds||[])];
    if(!ids.length)return'<p class="empty-inline">Nenhum personagem tem uma cena direta registada neste lugar.</p>';
    return `<div class="place-character-grid">${ids.map(id=>{
      const character=getCharacter(id);if(!character)return'';
      const scenes=(place.chapterScenes||[]).filter(scene=>(scene.characterIds||[]).includes(id));
      const chapters=scenes.map(scene=>getChapter(scene.chapterId)?.number).filter(Boolean);
      const note=chapters.length?`Presente nas cenas dos capítulos ${chapters.join(', ')}.`:'Presença ligada a este lugar.';
      return `<button class="place-character-card" data-go="personagem/${S(character.n)}">${media(R.charImage(character.n),`Retrato de ${character.n}`,R.initials(character.n),'place-character-media')}<span><strong>${E(character.n)}</strong><small>${E(note)}</small></span></button>`;
    }).join('')}</div>`;
  };

  const chapterCards=place=>{
    const scenes=place.chapterScenes||[];
    if(!scenes.length)return'<p class="empty-inline">O lugar faz parte da lore, mas não recebe uma cena direta no manuscrito deste livro.</p>';
    return `<div class="place-scene-list">${scenes.map(scene=>{
      const chapter=getChapter(scene.chapterId);if(!chapter)return'';
      const relation=scene.relation&&scene.relation!=='ocorre'?`<span class="place-scene-relation">${E(scene.relation)}</span>`:'';
      return `<article class="place-scene-card click" data-go="capitulo/${chapter.number}" tabindex="0" role="link"><div class="place-scene-heading"><div><p class="eyebrow">Capítulo ${chapter.number}</p><h3>${E(chapter.title)}</h3></div>${relation}</div><p>${linkify(scene.text)}</p></article>`;
    }).join('')}</div>`;
  };

  const eventCards=place=>{
    const events=(place.eventIds||[]).map(getTimeline).filter(Boolean);
    if(!events.length)return'<p class="empty-inline">Nenhum acontecimento da Linha do Tempo está ligado diretamente a este lugar.</p>';
    return `<div class="place-event-list">${events.map(entry=>`<button class="place-event-card" data-go="linha/${entry.slug}"><span class="place-event-date">${E(entry.dateLabel||entry.period||'Data não estabelecida')}</span><strong>${E(entry.name)}</strong><small>${E(entry.summary)}</small></button>`).join('')}</div>`;
  };

  P.lugares=()=>{
    const query=st.q.toLowerCase();
    const places=D.places.filter(place=>`${place.n} ${place.s} ${place.region||''} ${(place.description||[]).join(' ')}`.toLowerCase().includes(query));
    return H('Mundo','Lugares','Ilhas, regiões, rotas e espaços narrativos de Etérea e Nadirion.',`<input class="search" data-search placeholder="Pesquisar…" value="${E(st.q)}">`)+`<div class="grid place-grid-expanded">${places.map(place=>{
      const population=populationLabel(place);
      return `<article class="card click place-list-card" data-go="lugar/${place.slug||S(place.n)}">${media(placeImage(place.n),`Ilustração de ${place.n}`,'✦','placepic symbol')}<div class="place-list-heading"><div><h3>${E(place.n)}</h3><span>${E(place.type||'Lugar')}</span></div></div><p>${E(place.s)}</p><div class="place-card-facts"><div><small>Região</small><strong>${E(place.region||'Não estabelecida')}</strong></div>${population?`<div><small>População estimada</small><strong>${E(population)}</strong></div>`:''}</div></article>`;
    }).join('')}</div>`;
  };

  P.lugar=id=>{
    const place=find(D.places,id);
    if(!place)return err();
    const population=populationLabel(place);
    const description=Array.isArray(place.description)&&place.description.length?place.description:[place.s];
    const features=[
      featureBlock('Arquitetura e forma',place.architecture?[place.architecture]:[]),
      featureBlock('Clima e atmosfera',place.atmosphere?[place.atmosphere]:[]),
      featureBlock('Recursos',place.resources),
      featureBlock('Perigos',place.dangers),
      featureBlock('Cultura e modo de vida',place.culture)
    ].filter(Boolean).join('');
    return `<button class="back" data-go="lugares">← Voltar</button>
      <section class="detailhero place-detail place-detail-rich">${media(placeImage(place.n),`Ilustração de ${place.n}`,'✦','place-detail-media symbol big')}<article class="panel place-summary-panel"><p class="eyebrow">${E(place.type||'Lugar do Livro I')}</p><h1>${E(place.n)}</h1><p class="lead">${linkify(place.s)}</p><div class="place-detail-facts"><div><small>Região</small><strong>${E(place.region||'Não estabelecida')}</strong></div><div><small>Localização</small><strong>${E(place.location||'Não estabelecida')}</strong></div>${population?`<div><small>População estimada</small><strong>${E(population)}</strong></div>`:''}<div><small>Livro</small><strong>Ruínas dos Céus</strong></div></div></article></section>
      <section class="panel place-content-section"><p class="eyebrow">Descrição completa</p><h2>Sobre ${E(place.n)}</h2>${description.map(paragraph=>`<p>${linkify(paragraph)}</p>`).join('')}${place.narrativeFunction?`<div class="place-narrative-function"><small>Função narrativa</small><p>${linkify(place.narrativeFunction)}</p></div>`:''}</section>
      <section class="place-feature-grid">${features}</section>
      <section class="panel place-characters-section"><div class="section-heading"><div><p class="eyebrow">Presenças no livro</p><h2>Personagens que passaram por aqui</h2></div></div>${characterCards(place)}</section>
      <section class="place-linked-grid"><article class="panel"><div class="section-heading"><div><p class="eyebrow">Cenas localizadas</p><h2>Capítulos com cenas neste lugar</h2></div></div>${chapterCards(place)}</article><article class="panel"><div class="section-heading"><div><p class="eyebrow">Cronologia</p><h2>Acontecimentos relacionados</h2></div></div>${eventCards(place)}</article></section>`;
  };

  const mapControl=(action,label,symbol)=>`<button type="button" data-di-map-action="${action}" aria-label="${E(label)}" title="${E(label)}"><span aria-hidden="true">${symbol}</span></button>`;
  const mapPin=place=>{
    const point=place.map;if(!point)return'';
    return `<button class="di-map-pin" style="left:${point.x}%;top:${point.y}%" data-di-map-pin="${E(place.id)}" data-map-x="${point.x}" data-map-y="${point.y}" data-pin-kind="${E(point.kind||'place')}" data-major="${point.major?'true':'false'}" aria-label="Abrir ficha rápida de ${E(place.n)}"><span class="di-map-pin-marker" aria-hidden="true"></span><span class="di-map-pin-label">${E(place.n)}</span></button>`;
  };
  R.mountMap=()=>{
    const phase=st.mapPhase==='nadirion'?'superficie':st.mapPhase;
    const config=D.maps?.[phase]||D.maps?.eterea;
    const root=document.getElementById('ruinasInteractiveMap');
    if(!root||!config||!window.DIMaps)return;
    window.DIMaps.mount({
      root,key:'ruinasInteractiveMap',initialZoom:1,minZoom:.72,maxZoom:3.25,
      getItem:id=>D.places.find(place=>place.id===id),
      renderPopup:place=>`<p class="eyebrow">${E(place.type||'Lugar')}</p><h2>${E(place.n)}</h2><p>${E(place.s)}</p><div class="di-map-popup-facts"><div><small>Região</small><strong>${E(place.region||'Não estabelecida')}</strong></div><div><small>Período</small><strong>${E(config.title)}</strong></div></div><div class="di-map-popup-actions"><button class="primary-button" data-go="lugar/${E(place.slug||S(place.n))}">Abrir ficha</button></div>`
    });
  };

  P.mapa=()=>{
    const requested=st.mapPhase==='nadirion'?'superficie':st.mapPhase;
    const phase=D.maps?.[requested]?requested:'eterea';
    st.mapPhase=phase;
    const config=D.maps?.[phase];
    if(!config)return H('Mundo','Mapas','Os dados cartográficos ainda não foram carregados.');
    const places=config.placeIds.map(id=>D.places.find(place=>place.id===id)).filter(Boolean);
    return H('Mundo','Mapas interativos','Do céu organizado de Etérea à sobrevivência na superfície.')+
      `<section class="di-map-section ruinas-map-section" data-di-map-fullscreen>
        <div class="di-map-tabs" role="tablist" aria-label="Períodos cartográficos">${Object.values(D.maps).map(map=>`<button type="button" class="${map.id===phase?'active':''}" data-map-phase="${E(map.id)}" role="tab" aria-selected="${map.id===phase}">${E(map.title)}</button>`).join('')}</div>
        <div id="ruinasInteractiveMap" class="di-map-shell ruinas-interactive-map" style="--di-map-ratio:${E(config.ratio)};--di-map-accent:#3e8192">
          <div class="di-map-toolbar" aria-label="Controles do mapa">${mapControl('zoom-in','Aproximar','+')} ${mapControl('zoom-out','Afastar','−')} ${mapControl('center','Centralizar','◎')} ${mapControl('labels','Mostrar ou ocultar nomes','Aa')} ${mapControl('fullscreen','Tela inteira','⛶')}</div>
          <div class="di-map-context"><p>${E(config.description)}</p><h2>${E(config.title)}</h2><div class="di-map-context-list">${config.context.map(text=>`<span>${E(text)}</span>`).join('')}</div></div>
          <div class="di-map-viewport" data-di-map-viewport tabindex="0" aria-label="Mapa interativo de ${E(config.shortTitle)}. Arraste para deslocar e use os controles para ampliar.">
            <div class="di-map-stage" data-di-map-stage><img src="${E(config.image)}" alt="Mapa de ${E(config.shortTitle)}" draggable="false">${places.map(mapPin).join('')}</div>
            <div data-di-map-popup-host></div>
          </div>
          <div class="di-map-helper">Arraste para deslocar · use a roda ou os botões para ampliar · selecione um marcador</div>
        </div>
        <article class="panel map-period-summary"><p class="eyebrow">${places.length} lugares localizados</p><h2>${E(config.shortTitle)}</h2><p>${E(config.description)}</p><div class="map-place-links">${places.map(place=>`<button data-di-global-map-focus="${E(place.id)}" data-di-map-root="ruinasInteractiveMap">${E(place.n)}</button>`).join('')}</div></article>
      </section>`;
  };
})();
