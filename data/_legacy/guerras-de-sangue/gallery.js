(() => {
  'use strict';
  const X=window.JESED_GUERRAS_CONTEXT;if(!X)return;const {C,D,BOOK_ID}=X,items=[],draft=window.JESED_BOOK_DRAFTS?.[BOOK_ID]?.entities||{};
  const inventory=new Set([
    "assets/books/ciclo-de-jesed/guerras-de-sangue/cover.webp",
    "assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp",
    ...Array.from({length:29},(_,i)=>`assets/books/ciclo-de-jesed/guerras-de-sangue/chapters/chapter-${String(i+1).padStart(2,'0')}.webp`),
    ...["hadrun","harrev","kahul","lurok","lutharus","nara-e-ilo","odran-porta-baixa","odris","orionus-polar-2","orven","saela","savel","seron-das-obras","soren","tavra-vendrar","thoren-dos-graos","varael-glydar","veyr-polar","yvenn-raiz-branca","daryon-polar","iressa-maos-de-sal","kaelina","kharvok","lorde-ossar-glydar","maelis-das-contagens","markoso","nynestra","rendar","sarkan","seyra-vendrar","torgun","varron-meio-olho","vita-fendelar","vorlan-vendrar","ylvena","alyra","avara-fendelar","brokan-das-forjas","cal-edran","cal-kadrir","orionus-polar","nalia-do-rio"].map(x=>`assets/books/ciclo-de-jesed/guerras-de-sangue/characters/${x}.webp`),
    ...["acampamento-dos-homens-das-areias","alesteiro","cendar-vel","kaendar","khar-tondr","camara-do-primeiro-abrigo","floresta-de-mirval","marco-das-tres-pedras","margem-dos-zirrios","noreval","nyn-harad","urtar-vesh","varkhama","velarim"].map(x=>`assets/books/ciclo-de-jesed/guerras-de-sangue/places/${x}.webp`),
    "assets/books/ciclo-de-jesed/shared/lore/fauna/raukhar.webp"
  ]);
  const add=(category,type,name,image,route,sourceId,caption='')=>{if(!image||!inventory.has(image))return;items.push({id:C.stableId(null,'gallery',`${category}-${sourceId||name}`,BOOK_ID),slug:C.slugify(`${category}-${sourceId||name}`),name,type,category,image,route:route||'',sourceId:sourceId||null,caption:caption||name});};
  const activeBook=C.asArray(D.books).find(i=>i.id===BOOK_ID)||C.asArray(D.books).find(i=>i.status==='active')||C.asArray(D.books)[0];
  if(activeBook)add('cover','Capa',activeBook.name,'assets/books/ciclo-de-jesed/guerras-de-sangue/cover.webp',`book/${activeBook.id}`,activeBook.id,activeBook.synopsis||activeBook.visual);
  Object.values(D.maps||{}).forEach(map=>add('map','Mapa',map.title,map.image,'map',map.id,map.description));
  C.asArray(D.characters).forEach(i=>{add('character','Personagem',i.name,i.image,`character/${i.slug}`,i.id,i.summary);C.asArray(i.alternateImages).forEach((src,index)=>add('character','Personagem',`${i.name} — alternativa ${index+1}`,src,`character/${i.slug}`,`${i.id}-alt-${index+1}`,`Representação alternativa de ${i.name}.`));});
  C.asArray(D.places).forEach(i=>add('place','Lugar',i.name,i.image,`place/${i.slug}`,i.id,i.summary));
  C.asArray(D.chapters).forEach(i=>add('chapter','Capítulo',`Capítulo ${i.number} — ${i.title}`,i.image,`chapter/${i.id}`,i.id,i.summary));
  const rhaukar=C.asArray(draft.fauna).find(i=>(i.slug||'')==='raukhar'||(i.name||'').toLowerCase()==='raukhar');
  if(rhaukar)add('fauna','Fauna',rhaukar.name,'assets/books/ciclo-de-jesed/shared/lore/fauna/raukhar.webp',`lore-item/fauna/${rhaukar.slug}`,rhaukar.id||rhaukar.slug,rhaukar.summary);
  const seen=new Set();C.setCollection(BOOK_ID,'gallery',items.filter(i=>{const key=i.image;if(seen.has(key))return false;seen.add(key);return true;}));
})();
