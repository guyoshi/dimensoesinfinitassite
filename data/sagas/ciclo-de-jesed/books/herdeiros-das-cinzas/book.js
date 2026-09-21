(() => {
  'use strict';
  const C=window.JESED_COMMON,D=window.HC_DATA;
  if(!C||!D) return console.error('[JESED] Base de Herdeiros das Cinzas indisponível.');
  const BOOK_ID='herdeiros-das-cinzas';
  const bookSource=C.asArray(D.books).find(book=>book.id===BOOK_ID)||{};
  const chapterId=number=>{
    const chapter=C.asArray(D.chapters).find(item=>Number(item.number)===Number(number));
    return chapter?.id||`jesed-chapter-hc-${String(number).padStart(2,'0')}`;
  };

  window.JESED_ASHES_CONTEXT={C,D,BOOK_ID,bookSource,chapterId};

  C.startBook({
    book:{
      id:BOOK_ID,title:bookSource.name||'Herdeiros das Cinzas',order:4,
      sagaId:'ciclo-de-jesed',cover:bookSource.cover||null,sourceGlobal:'HC_DATA'
    },
    routes:{
      canonical:{
        characters:'characters',relationships:'relationships',places:'places',chapters:'chapters',
        timeline:'timeline',mysteries:'mysteries',themes:'themes',fauna:'fauna',flora:'flora',
        foods:'foods',concepts:'lore',gallery:'gallery'
      },
      legacyAliases:[
        {from:'events',to:'timeline'},
        {fromPrefix:'event/',toPrefix:'timeline/'},
        {from:'acontecimentos',to:'timeline'},
        {fromPrefix:'acontecimento/',toPrefix:'timeline/'},
        {from:'clans',to:'dynasties'},
        {fromPrefix:'clan/',toPrefix:'dynasty/'},
        {from:'clas',to:'dynasties'},
        {fromPrefix:'cla/',toPrefix:'dynasty/'},
        {from:'dashboard',to:'inicio'}
      ]
    },
    compatibility:{
      sourceGlobal:'HC_DATA',legacyDataPreserved:true,redirectsPrepared:true,redirectsActive:true
    },
    metadata:{
      dataDirectory:'data/sagas/ciclo-de-jesed/books/herdeiros-das-cinzas',optionalCollections:['themes','mysteries'],
      legacySources:['data/sagas/ciclo-de-jesed/books/herdeiros-das-cinzas/runtime.js'],stage:'Em preparação · 0 capítulos'
    }
  });
})();