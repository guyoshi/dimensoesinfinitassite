(() => {
  'use strict';
  const C=window.JESED_COMMON,D=window.RUINAS_DATA,R=window.RS;
  if(!C||!D||!R) return console.error('[JESED] Base de Ruínas dos Céus indisponível.');
  const BOOK_ID='ruinas-dos-ceus';
  const bookSource=C.asArray(R.BOOKS).find(book=>book.id===BOOK_ID)||{};
  const chapterId=number=>`jesed-chapter-rdc-${String(number).padStart(2,'0')}`;
  const characterId=name=>C.stableId(null,'character',name,BOOK_ID);
  const placeId=name=>C.stableId(null,'place',name,BOOK_ID);

  window.JESED_RUINAS_CONTEXT={C,D,R,BOOK_ID,bookSource,chapterId,characterId,placeId};

  C.startBook({
    book:{
      id:BOOK_ID,title:bookSource.name||'Ruínas dos Céus',order:1,
      sagaId:'ciclo-de-jesed',cover:bookSource.cover||null,sourceGlobal:'RUINAS_DATA'
    },
    routes:{
      canonical:{
        characters:'personagens',relationships:'relacoes',places:'lugares',chapters:'capitulos',
        timeline:'linha',mysteries:'misterios',themes:'temas',fauna:'fauna',flora:'flora',
        foods:'alimentos',concepts:'conceitos',gallery:'galeria'
      },
      legacyAliases:[
        {from:'acontecimentos',to:'linha'},
        {fromPrefix:'acontecimento/',toPrefix:'linha/'},
        {from:'events',to:'linha'},
        {fromPrefix:'event/',toPrefix:'linha/'},
        {from:'timeline',to:'linha'},
        {fromPrefix:'timeline/',toPrefix:'linha/'},
        {from:'consequencias',to:'linha'},
        {from:'consequences',to:'linha'},
        {from:'continuidade',to:'inicio'},
        {from:'continuity',to:'inicio'},
        {from:'decisoes',to:'inicio'},
        {from:'decisions',to:'inicio'}
      ]
    },
    compatibility:{
      sourceGlobal:'RUINAS_DATA',legacyDataPreserved:true,redirectsPrepared:true,redirectsActive:true
    },
    metadata:{
      dataDirectory:'data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus',optionalCollections:['themes'],
      legacyFieldsPreserved:['n','t','s','img','a','st'],stage:'Etapa 5'
    }
  });
})();
