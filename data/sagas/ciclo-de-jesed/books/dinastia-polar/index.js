(() => {
  const X=window.JESED_POLAR_CONTEXT;
  if(!X)return;
  const model=X.C.finalizeBook(X.BOOK_ID);
  X.D.common=model;
  X.D.commonSchemaVersion=X.C.VERSION;

  const version='20260917chapters1';
  const styleHref=`app/sagas/ciclo-de-jesed/books/dinastia-polar/chapter-rich.css?v=${version}`;
  if(!document.querySelector(`link[href^="app/sagas/ciclo-de-jesed/books/dinastia-polar/chapter-rich.css"]`)){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href=styleHref;
    document.head.appendChild(link);
  }

  const loadScript=src=>new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src=src;
    script.onload=resolve;
    script.onerror=reject;
    document.head.appendChild(script);
  });

  loadScript(`data/sagas/ciclo-de-jesed/books/dinastia-polar/chapter-details-rich.js?v=${version}`)
    .then(()=>loadScript(`app/sagas/ciclo-de-jesed/books/dinastia-polar/chapter-rich.js?v=${version}`))
    .catch(error=>console.error('Falha ao carregar a ficha rica dos capítulos de Dinastia Polar.',error));
})();
