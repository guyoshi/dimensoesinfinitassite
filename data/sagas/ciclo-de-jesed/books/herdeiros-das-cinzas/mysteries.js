(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Mistérios: {id, slug, name, status, question, summary, origin, clues[], chapterNumbers[], characterIds[], placeIds[]}
  const mysteries=[].map(item=>({...item,chapterIds:(item.chapterNumbers||[]).map(n=>`jesed-chapter-hc-${String(n).padStart(2,'0')}`),route:`mystery/${item.slug}`,sourceRef:item}));
  D.mysteries=mysteries;
  C.setCollection(BOOK_ID,'mysteries',mysteries);
})();
