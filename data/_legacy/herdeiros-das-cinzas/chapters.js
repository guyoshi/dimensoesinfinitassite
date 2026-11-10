(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Um objeto por capítulo já ESCRITO. Só entram aqui capítulos que existem como texto (regra 1 de AI_UPDATE_RULES.md).
  // Campos: number, title, status, pov, summary, details[], characters[], places[], image, source.
  // Exemplo de imagem: assets/books/ciclo-de-jesed/herdeiros-das-cinzas/chapters/chapter-01.webp
  const chapters=[];
  D.chapters=chapters;
  const items=chapters.map(item=>{const number=Number(item.number),slug=C.stableSlug(item.slug,`capitulo-${number}`);return{...item,id:C.stableId(item.id,'chapter',`hc-${String(number).padStart(2,'0')}`,BOOK_ID),slug,name:`Capítulo ${number} — ${C.text(item.title)}`,number,title:C.text(item.title),summary:C.text(item.summary),characterIds:C.asArray(item.characters),placeIds:C.asArray(item.places),route:`chapter/${item.id||number}`,sourceRef:item};});
  C.setCollection(BOOK_ID,'chapters',items);
})();
