(() => {
  const X=window.JESED_POLAR_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;
  D.lore.fauna = [
    {id:'jesed-dp-fauna-bravao',slug:'bravao',name:'Bravão',image:'assets/books/ciclo-de-jesed/dinastia-polar/lore/fauna/bravao.webp',summary:'Animal usado para transportar cargas nas ruas de Kaeliran e Maruva.',chapterIds:[chapterId(1),chapterId(2)],sources:['Dinastia Polar — Capítulos 1 e 2']},
    {id:'jesed-dp-fauna-tarrak',slug:'tarrak',name:'Tarrak',image:'assets/books/ciclo-de-jesed/dinastia-polar/lore/fauna/tarrak.webp',summary:'Montaria usada em viagens e por comitivas de Kaeliran.',chapterIds:[chapterId(2),chapterId(5),chapterId(7)],sources:['Dinastia Polar — Capítulos 2, 5 e 7']}
  ];
  C.setCollection(BOOK_ID,'fauna',C.asArray(D.lore?.fauna).map(item=>{const name=item.name||item.title,slug=C.stableSlug(item.slug,name);return{...item,id:C.stableId(item.id,'fauna',name,BOOK_ID),slug,name:C.text(name),summary:C.text(item.summary||item.description),citations:Number(item.citations||0),chapterIds:C.asArray(item.chapterIds).length?C.asArray(item.chapterIds):C.asArray(item.chapterMentions).map(m=>chapterId(m.chapter)),route:`lore-item/fauna/${slug}`,sourceRef:item};}));
})();
