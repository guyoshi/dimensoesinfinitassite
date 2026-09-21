(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Itens de foods: {id, slug, name, image, summary, chapterIds[], sources[]}
  D.lore=D.lore||{};D.lore.foods=D.lore.foods||[];
  C.setCollection(BOOK_ID,'foods',C.asArray(D.lore?.foods).map(item=>{const name=item.name||item.title,slug=C.stableSlug(item.slug,name);return{...item,id:C.stableId(item.id,'foods',name,BOOK_ID),slug,name:C.text(name),summary:C.text(item.summary||item.description),citations:Number(item.citations||0),chapterIds:C.asArray(item.chapterIds).length?C.asArray(item.chapterIds):C.asArray(item.chapterMentions).map(m=>chapterId(m.chapter)),route:`lore-item/foods/${slug}`,sourceRef:item};}));
})();
