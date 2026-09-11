(() => {
  'use strict';
  const X=window.JESED_POLAR_CONTEXT;if(!X)return;const {C,D,BOOK_ID,bookSource}=X,items=[];
  // Qualquer imagem já anexada a uma entidade (capa, personagem, lugar ou capítulo)
  // entra na galeria automaticamente — sem lista de inventário fixa para manter.
  const add=(category,type,name,image,route,sourceId,caption='')=>{if(!image)return;items.push({id:C.stableId(null,'gallery',`${category}-${sourceId||name}`,BOOK_ID),slug:C.slugify(`${category}-${sourceId||name}`),name,type,category,image,route:route||'',sourceId:sourceId||null,caption:caption||name});};
  add('cover','Capa',bookSource.name||'Dinastia Polar','assets/books/ciclo-de-jesed/dinastia-polar/cover.webp','inicio',BOOK_ID,'Capa de Dinastia Polar.');
  C.asArray(D.characters).forEach(i=>add('character','Personagem',i.name,i.image,`character/${i.slug}`,i.id,i.summary));
  C.asArray(D.places).forEach(i=>add('place','Lugar',i.name,i.image,`place/${i.slug}`,i.id,i.summary));
  C.asArray(D.chapters).forEach(i=>add('chapter','Capítulo',`Capítulo ${i.number} — ${i.title}`,i.image,`chapter/${i.id}`,i.id,i.summary));
  const seen=new Set();C.setCollection(BOOK_ID,'gallery',items.filter(i=>{const key=i.image;if(seen.has(key))return false;seen.add(key);return true;}));
})();
