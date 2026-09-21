(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Dinastias de Jesed presentes no livro. Campos: id, slug, name, essence, summary, themes[], sources[],
  // profile:{capital, authority, symbol, colors, religion, origin, government, territory, economy, culture, socialStructure, contradiction, role}.
  const dynasties=[];
  const items=dynasties.map(item=>{const slug=C.stableSlug(item.slug,item.name);return{...item,id:C.stableId(item.id,'dynasty',item.name,BOOK_ID),slug,route:`dynasty/${slug}`,sourceRef:item};});
  D.dynasties=items;
  C.setCollection(BOOK_ID,'dynasties',items);
})();
