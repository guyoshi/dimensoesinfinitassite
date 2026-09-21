(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Acontecimentos. Campos obrigatórios: id, slug, name, dateLabel, sortKey. Ciclos (A.Q./D.Q.), nunca anos; estimativas marcadas como aproximadas.
  const events=[];
  D.timeline=events;
  C.setCollection(BOOK_ID,'timeline',events);
})();
