(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  const items=[];
  // Qualquer imagem já anexada a uma entidade (capa, personagem, lugar ou capítulo) entra na galeria automaticamente.
  const add=(category,type,name,image,route,sourceId,caption='')=>{if(!image)return;items.push({id:C.stableId(null,'gallery',`${category}-${sourceId||name}`,BOOK_ID),slug:C.slugify(`${category}-${sourceId||name}`),name,type,category,image,route:route||'',sourceId:sourceId||null,caption:caption||name});};
  const base='assets/books/ciclo-de-jesed/herdeiros-das-cinzas/';
  add('cover','Capa','Herdeiros das Cinzas',base+'cover.webp','inicio',BOOK_ID+'-cover','Capa de Herdeiros das Cinzas.');
  add('cover','Capa sem logotipo','Herdeiros das Cinzas (sem logotipo)',base+'cover-clean.webp','inicio',BOOK_ID+'-cover-clean','Capa de Herdeiros das Cinzas, sem logotipo.');
  C.asArray(D.characters).forEach(i=>add('character','Personagem',i.name,i.image,`character/${i.slug}`,i.id,i.summary));
  C.asArray(D.places).forEach(i=>add('place','Lugar',i.name,i.image,`place/${i.slug}`,i.id,i.summary));
  C.asArray(D.chapters).forEach(i=>add('chapter','Capítulo',`Capítulo ${i.number} — ${i.title}`,i.image,`chapter/${i.id}`,i.id,i.summary));
  ['fauna','flora','foods'].forEach(kind=>C.asArray(D.lore?.[kind]).forEach(i=>add(kind,kind==='fauna'?'Fauna':kind==='flora'?'Flora':'Alimento',i.name,i.image,`lore-item/${kind}/${i.slug}`,i.id,i.summary)));
  const seen=new Set();C.setCollection(BOOK_ID,'gallery',items.filter(i=>{if(seen.has(i.image))return false;seen.add(i.image);return true;}));
})();
