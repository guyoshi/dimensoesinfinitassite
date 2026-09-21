(() => {
  const X=window.JESED_ASHES_CONTEXT;
  if(!X)return;
  const model=X.C.finalizeBook(X.BOOK_ID);
  X.D.common=model;
  X.D.commonSchemaVersion=X.C.VERSION;

  const version='20260921hc1';
  const styleHref=`app/sagas/ciclo-de-jesed/books/herdeiros-das-cinzas/chapter-rich.css?v=${version}`;
  if(!document.querySelector(`link[href^="app/sagas/ciclo-de-jesed/books/herdeiros-das-cinzas/chapter-rich.css"]`)){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href=styleHref;
    document.head.appendChild(link);
  }
  const script=document.createElement('script');
  script.src=`app/sagas/ciclo-de-jesed/books/herdeiros-das-cinzas/chapter-rich.js?v=${version}`;
  script.onerror=()=>console.error('Falha ao carregar a ficha rica dos capítulos de Herdeiros das Cinzas.');
  document.head.appendChild(script);
})();
