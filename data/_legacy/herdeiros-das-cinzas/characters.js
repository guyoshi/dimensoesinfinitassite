(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Fichas de personagens. Campos usados pelo site: id, slug, name, shortName, alias, status, image, dynastyId, summary,
  // featured (true = aparece em "Personagens em foco"), focus (frase curta), appearanceChapters[].
  const IMG='assets/books/ciclo-de-jesed/herdeiros-das-cinzas/characters/';
  const characters=[];
  const items=characters.map(item=>{const slug=C.stableSlug(item.slug,item.name);return{...item,id:C.stableId(item.id,'character',item.name,BOOK_ID),slug,name:C.text(item.name),subtitle:C.text(item.alias||item.subtitle),summary:C.text(item.summary),status:C.text(item.status),chapterIds:C.asArray(item.appearanceChapters),placeIds:[],route:`character/${slug}`,sourceRef:item};});
  D.characters=items;
  C.setCollection(BOOK_ID,'characters',items);
})();
