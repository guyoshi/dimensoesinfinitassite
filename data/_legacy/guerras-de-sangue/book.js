(() => {
  'use strict';
  const C=window.JESED_COMMON,D=window.DI_DATA;
  if(!C||!D) return console.error('[JESED] Base de Guerras de Sangue indisponível.');
  const BOOK_ID='guerras-de-sangue';
  const bookSource=C.asArray(D.books).find(book=>book.id===BOOK_ID)||{};
  const chapterId=number=>{
    const chapter=C.asArray(D.chapters).find(item=>Number(item.number)===Number(number));
    return chapter?.id||`jesed-chapter-gs-${String(number).padStart(2,'0')}`;
  };
  const chapterIdsFromPeriod=period=>{
    const result=[];
    for(const match of String(period||'').matchAll(/Capítulo\s+(\d+)/gi)) result.push(chapterId(Number(match[1])));
    return [...new Set(result)];
  };

  window.JESED_GUERRAS_CONTEXT={C,D,BOOK_ID,bookSource,chapterId,chapterIdsFromPeriod};

  C.startBook({
    book:{
      id:BOOK_ID,title:bookSource.name||'Guerras de Sangue',order:2,
      sagaId:'ciclo-de-jesed',cover:bookSource.cover||null,sourceGlobal:'DI_DATA'
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
        {from:'consequences',to:'timeline'},
        {from:'consequencias',to:'timeline'},
        {from:'routes',to:'places'},
        {from:'rotas',to:'places'},
        {fromPrefix:'route/',toPrefix:'place/'},
        {fromPrefix:'rota/',toPrefix:'place/'},
        {from:'continuity',to:'dashboard'},
        {from:'continuidade',to:'dashboard'},
        {from:'decisions',to:'dashboard'},
        {from:'decisoes',to:'dashboard'},
        {from:'scene-pack',to:'dashboard'}
      ]
    },
    compatibility:{
      sourceGlobal:'DI_DATA',legacyDataPreserved:true,redirectsPrepared:true,redirectsActive:true
    },
    metadata:{
      dataDirectory:'data/sagas/ciclo-de-jesed/books/guerras-de-sangue',optionalCollections:['themes'],
      legacySources:['data/sagas/ciclo-de-jesed/books/guerras-de-sangue/runtime.js'],stage:'Etapa 5'
    }
  });
})();
