(() => {
  'use strict';
  const C=window.JESED_COMMON,D=window.CP_DATA;
  if(!C||!D) return console.error('[JESED] Base de Coração de Poeira indisponível.');
  const BOOK_ID='coracao-de-poeira';
  const bookSource=C.asArray(D.books).find(book=>book.id===BOOK_ID)||{};
  const chapterId=number=>{
    const chapter=C.asArray(D.chapters).find(item=>Number(item.number)===Number(number));
    return chapter?.id||`jesed-chapter-cp-${String(number).padStart(2,'0')}`;
  };

  window.JESED_DUST_CONTEXT={C,D,BOOK_ID,bookSource,chapterId};

  C.startBook({
    book:{
      id:BOOK_ID,title:bookSource.name||'Coração de Poeira',order:5,
      sagaId:'ciclo-de-jesed',cover:bookSource.cover||null,sourceGlobal:'CP_DATA'
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
        {from:'dashboard',to:'inicio'}
      ]
    },
    compatibility:{
      sourceGlobal:'CP_DATA',legacyDataPreserved:true,redirectsPrepared:true,redirectsActive:true
    },
    metadata:{
      dataDirectory:'data/sagas/ciclo-de-jesed/books/coracao-de-poeira',optionalCollections:['themes','mysteries'],
      legacySources:['data/sagas/ciclo-de-jesed/books/coracao-de-poeira/runtime.js'],stage:'Fundação'
    }
  });
})();
