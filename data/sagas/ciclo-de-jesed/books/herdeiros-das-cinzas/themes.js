(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Temas: {id, slug, name, category, summary, question, description, development[], chapterIds[], evolution[]}
  const items=[];
  D.themes=items;C.setCollection(BOOK_ID,'themes',items);
})();
