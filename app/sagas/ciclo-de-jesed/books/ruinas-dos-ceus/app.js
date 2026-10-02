(()=>{
  const R=window.RS,{st,$,nav,err}=R,P=R.pages,BOOK_ID='ruinas-dos-ceus';
  function render(preserveScroll){
    const requested=location.hash.replace(/^#\/?/,'')||'inicio';
    const resolved=window.JESED_COMMON?.resolveLegacyRoute(requested,BOOK_ID)||requested;
    if(resolved!==requested) history.replaceState(null,'',`#/${resolved}`);
    st.route=resolved;
    nav();
    const [base,id]=st.route.split('/');
    const pages={
      inicio:P.inicio,livros:P.livros,livro:()=>P.livro(id),
      capitulos:P.capitulos,capitulo:()=>P.capitulo(id),
      personagens:P.personagens,personagem:()=>P.personagem(id),
      relacoes:P.relacoes,familias:P.familias,organizacoes:P.organizacoes,
      linha:id?()=>P.linhaItem(id):P.linha,
      temas:P.temas,tema:()=>P.tema(id),misterios:P.misterios,misterio:()=>P.misterio(id),
      mapa:P.mapa,lugares:P.lugares,lugar:()=>P.lugar(id),
      fauna:id?()=>P.loreItem('fauna',id):()=>P.lore('fauna'),flora:id?()=>P.loreItem('flora',id):()=>P.lore('flora'),
      alimentos:id?()=>P.loreItem('alimentos',id):()=>P.lore('alimentos'),conceitos:()=>P.lore('conceitos'),conceito:()=>P.conceito(id),galeria:P.galeria,
      canon:()=>P.simples('Regras canônicas',[
        ['Sopro','Manter ambiguidade.'],
        ['Tom','Perda pesada e esperança final.'],
        ['Separação','Não usar clãs da era posterior.']
      ])
    };
    const page=pages[base]||err;
    const settings=R.settings;
    if(settings&&settings.transitions&&settings.motion&&settings.preset!=='performance'){
      const veil=$('#transitionVeil');
      if(veil){veil.classList.remove('active');void veil.offsetWidth;veil.classList.add('active');}
    }
    $('#main').innerHTML=page();
    requestAnimationFrame(()=>window.DI_BETA_FEEDBACK?.mount($('#main')));
    if(base==='mapa') requestAnimationFrame(()=>R.mountMap?.());
    if(base==='galeria') requestAnimationFrame(()=>window.DI_GALLERY?.mount($('#main')));
    if(base==='linha'&&!id){
      requestAnimationFrame(()=>document.querySelector('.rdc-timeline-card.selected')?.scrollIntoView({block:'center',behavior:(settings&&settings.motion)?'smooth':'auto'}));
    }else if(!preserveScroll){
      scrollTo({top:0,behavior:(settings&&settings.motion)?'smooth':'auto'});
    }
  }
  R.render=render;
})();