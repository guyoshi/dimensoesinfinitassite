(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Lugares. Campos: id, slug, name, type, dynasty (nome curto da dinastia, ex.: nome da dinastia; '—' se não houver), region, summary,
  // image, featured (true = aparece na página inicial), map:{x,y,kind,major} definido em maps.js.
  const IMG='assets/books/ciclo-de-jesed/herdeiros-das-cinzas/places/';
  const places=[];
  D.places=places;
  C.setCollection(BOOK_ID,'places',places);
})();
