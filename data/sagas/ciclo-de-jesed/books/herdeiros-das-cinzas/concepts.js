(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Conceitos e Leis: {id, slug, name, type, summary, definition, origin, knownFunctioning, interpretations[], relatedCharacters[], chapterNumbers[], ambiguities[], evolution[], icon}
  const concepts=[].map(item=>({...item,details:[item.definition,item.origin,item.knownFunctioning],chapterIds:(item.chapterNumbers||[]).map(chapterId),route:`lore-item/concepts/${item.slug}`,sourceRef:item}));
  D.lore=D.lore||{};D.lore.concepts=concepts;C.setCollection(BOOK_ID,'concepts',concepts);
})();
