(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,D,BOOK_ID,bookSource}=X,items=[],draft=window.JESED_BOOK_DRAFTS?.[BOOK_ID]?.entities||{};
  const inventory=new Set([
    "assets/books/ciclo-de-jesed/ruinas-dos-ceus/cover.webp",
    "assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-eterea.webp",
    "assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-nadirion.webp",
    "assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-combined.webp",
    ...Array.from({length:25},(_,i)=>`assets/books/ciclo-de-jesed/ruinas-dos-ceus/chapters/chapter-${String(i+1).padStart(2,'0')}.webp`),
    ...["mirel-amarea","efepar","gabasteres","jokara","liri","loutes","marv","malthar","nestira","platisa","professor-talver","sersi","yndra","yoral","yrsea"].map(x=>`assets/books/ciclo-de-jesed/ruinas-dos-ceus/characters/${x}.webp`),
    ...["bosques-de-arion","circulo-de-nhamari","erilan","estacao-da-leveza","eterea","floresta-de-nadirion","ilha-da-memoria","ilha-dos-pequenos","ilhas-baixas","nadirion","nivellia","vale","planalto-de-talyen","praca-da-raiz","primeiro-abrigo","riacho-de-nadirion","ruinas-de-eterea"].map(x=>`assets/books/ciclo-de-jesed/ruinas-dos-ceus/places/${x}.webp`),
    "assets/books/ciclo-de-jesed/shared/lore/fauna/raukhar.webp"
  ]);
  const add=(category,type,name,image,route,sourceId,caption='')=>{if(!image||!inventory.has(image))return;const slug=C.slugify(`${category}-${sourceId||name}`);items.push({id:`jesed-gallery-rdc-${slug}`,slug,name,type,category,image,route:route||'',sourceId:sourceId||null,caption:caption||name});};
  add('cover','Capa',bookSource.name||'Ruínas dos Céus','assets/books/ciclo-de-jesed/ruinas-dos-ceus/cover.webp','inicio',BOOK_ID,'Capa de Ruínas dos Céus.');
  Object.values(D.maps||{}).forEach(map=>add('map','Mapa',map.title,map.image,'mapa',map.id,map.description));
  C.asArray(D.chapters).forEach(i=>add('chapter','Capítulo',`Capítulo ${i.number??i.n} — ${i.title??i.t}`,i.image||i.img,`capitulo/${i.number??i.n}`,i.id,i.summary||i.s));
  C.asArray(D.characters).forEach(i=>add('character','Personagem',i.name??i.n,i.image,`personagem/${i.slug||C.slugify(i.name??i.n)}`,i.id,i.summary||i.s));
  C.asArray(D.places).forEach(i=>add('place','Lugar',i.name??i.n,i.image,`lugar/${i.slug||C.slugify(i.name??i.n)}`,i.id,i.summary||i.s));
  const rhaukar=C.asArray(draft.fauna).find(i=>(i.slug||'')==='raukhar'||(i.name||'').toLowerCase()==='raukhar');
  if(rhaukar)add('fauna','Fauna',rhaukar.name,'assets/books/ciclo-de-jesed/shared/lore/fauna/raukhar.webp',`fauna/${rhaukar.slug}`,rhaukar.id,rhaukar.summary);
  const seen=new Set();C.setCollection(BOOK_ID,'gallery',items.filter(i=>{const key=i.image;if(seen.has(key))return false;seen.add(key);return true;}));
})();
