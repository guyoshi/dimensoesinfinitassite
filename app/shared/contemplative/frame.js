(() => {
  'use strict';
  const book=new URL(location.href).searchParams.get('book');
  const close=()=>parent.postMessage({type:'contemplative:close'},location.origin);
  const style=href=>new Promise((resolve,reject)=>{const link=document.createElement('link');link.rel='stylesheet';link.href=href;link.onload=resolve;link.onerror=reject;document.head.append(link);});
  const script=src=>new Promise((resolve,reject)=>{const node=document.createElement('script');node.src=src;node.onload=resolve;node.onerror=reject;document.head.append(node);});
  document.body.dataset.book=book;
  for(const name of ['performance-mode','no-particles','no-motion'])document.body.classList.toggle(name,parent.document.body.classList.contains(name));
  addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});
  document.addEventListener('click',e=>{if(e.target.closest('[data-close-contemplative],#frameBack')){e.preventDefault();close();}});
  const legacy={'guerras-de-sangue':'guerras','dinastia-polar':'polar','herdeiros-das-cinzas':'cinzas','coracao-de-poeira':'dust'};
  const modern={'a-lenda-da-aurora':['spacetheft','st'],'a-patrulha-de-korvo':['viajantes-dimensionais','vd'],'os-elos-das-sombras':['diario-sobrenatural','ds1'],'a-alvorada-das-ilusoes':['diario-sobrenatural','ds2']};
  async function start(){
    if(book==='ruinas-dos-ceus'){
      const base='app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/';
      await style(base+'styles.css');await style(base+'contemplative.css?v=20261020d');
      await script(base+'contemplative.js?v=20261020d');
    }else if(['os-elos-das-sombras','guerras-de-sangue','a-lenda-da-aurora','dinastia-polar'].includes(book)){
      await style('app/shared/contemplative/landscapes.css?v=20261020g');await script('app/shared/contemplative/landscapes.js?v=20261020g');await window.LANDSCAPE_READY;
    }else if(book==='a-alvorada-das-ilusoes'){
      const base='app/sagas/diario-sobrenatural/books/a-alvorada-das-ilusoes/contemplative/';
      await style(base+'scene.css?v=20261020b');await script(base+'scene.js?v=20261020g');await window.ALVORADA_READY;
    }else if(legacy[book]){
      const base=`app/sagas/ciclo-de-jesed/books/${book}/experience/`;
      await style('app/shared/experience/common.css');await style(base+'styles.css');
      await script('app/shared/experience/common.js');await script(base+'experience.js?v=20261020d');
      const trigger=document.createElement('button');trigger.dataset.contemplative=legacy[book];trigger.hidden=true;document.body.append(trigger);
      const proxy=document.createElement('button');proxy.dataset.musicPower='';proxy.hidden=true;proxy.onclick=()=>parent.document.querySelector('[data-music-power]')?.click();document.body.append(proxy);
      trigger.click();
    }else if(modern[book]){
      const [saga,theme]=modern[book];
      await style('app/shared/book-engine/engine.css');await style(`app/sagas/${saga}/books/${book}/theme.css`);
      await script('app/shared/book-engine/fx.js');await script(`data/sagas/${saga}/books/${book}/book.js`);
      document.body.dataset.theme=theme;
      const root=document.createElement('div');root.className='fx-root';document.body.append(root);
      window.DIFX.init({book:{theme}},{root});window.DIFX.configure({preset:matchMedia('(prefers-reduced-motion: reduce)').matches?'performance':'balanced'});window.DIFX.contemplate(true);
      const overlay=document.createElement('div');overlay.className='contemplate';overlay.style.display='flex';
      const logo=document.createElement('img');logo.className='c-logo';logo.src=window.DI_BOOK.book.logo;logo.alt=window.DI_BOOK.book.name;overlay.append(logo);document.body.append(overlay);
      const back=document.createElement('button');back.id='frameBack';back.textContent='← Voltar';document.body.append(back);
    }else throw Error('Livro desconhecido');
    parent.postMessage({type:'contemplative:ready'},location.origin);
  }
  start().catch(error=>{console.error(error);parent.postMessage({type:'contemplative:error'},location.origin);});
})();
