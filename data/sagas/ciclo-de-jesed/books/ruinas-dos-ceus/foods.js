(() => {
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,BOOK_ID}=X;
  const items=Object.values(window.RUINAS_LORE_STAGE11?.foods||{});
  C.setCollection(BOOK_ID,'foods',items.map(item=>({...item,id:item.name==='Raukhar'?'jesed-fauna-raukhar':C.stableId(null,'food',item.name,BOOK_ID),route:`alimentos/${item.slug}`,chapterIds:item.chapterMentions.map(m=>`jesed-chapter-rdc-${String(m.chapter).padStart(2,'0')}`),sourceRef:item})));
})();
