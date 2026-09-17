(() => {
  'use strict';
  const X=window.JESED_POLAR_CONTEXT;if(!X)return;const {C,D,BOOK_ID,bookSource}=X,items=[];

  // As artes de capítulo vivem numa pasta pública e previsível do site.
  // Assim, novos capítulos só precisam receber a imagem com o número correto.
  const chapters=C.asArray(D.chapters);
  chapters.forEach(item=>{
    const number=Number(item.number);
    item.image=`assets/capitulos/capitulo-${String(number).padStart(2,'0')}.png`;
  });

  // chapters.js já registrou a coleção antes deste arquivo carregar. Recriamos a
  // coleção com as imagens públicas para que cards, detalhes e buscas usem a arte.
  C.setCollection(BOOK_ID,'chapters',chapters.map(item=>{
    const number=Number(item.number),slug=C.stableSlug(item.slug,`capitulo-${number}`);
    return {...item,id:C.stableId(item.id,'chapter',`dp-${String(number).padStart(2,'0')}`,BOOK_ID),slug,name:`Capítulo ${number} — ${C.text(item.title)}`,number,title:C.text(item.title),summary:C.text(item.summary),characterIds:C.asArray(item.characters),placeIds:C.asArray(item.places),route:`chapter/${item.id||number}`,sourceRef:item};
  }));

  // Qualquer imagem já anexada a uma entidade (capa, personagem, lugar ou capítulo)
  // entra na galeria automaticamente — sem lista de inventário fixa para manter.
  const add=(category,type,name,image,route,sourceId,caption='')=>{if(!image)return;items.push({id:C.stableId(null,'gallery',`${category}-${sourceId||name}`,BOOK_ID),slug:C.slugify(`${category}-${sourceId||name}`),name,type,category,image,route:route||'',sourceId:sourceId||null,caption:caption||name});};
  add('cover','Capa',bookSource.name||'Dinastia Polar','assets/books/ciclo-de-jesed/dinastia-polar/cover.webp','inicio',BOOK_ID,'Capa de Dinastia Polar.');
  C.asArray(D.characters).forEach(i=>add('character','Personagem',i.name,i.image,`character/${i.slug}`,i.id,i.summary));
  C.asArray(D.places).forEach(i=>add('place','Lugar',i.name,i.image,`place/${i.slug}`,i.id,i.summary));
  chapters.forEach(i=>add('chapter','Capítulo',`Capítulo ${i.number} — ${i.title}`,i.image,`chapter/${i.id}`,i.id,i.summary));
  const seen=new Set();C.setCollection(BOOK_ID,'gallery',items.filter(i=>{const key=i.image;if(seen.has(key))return false;seen.add(key);return true;}));
})();
