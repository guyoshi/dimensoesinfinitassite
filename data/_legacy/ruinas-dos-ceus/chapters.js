(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,D,R,BOOK_ID,chapterId}=X;
  const items=C.asArray(D.chapters).map(item=>{
    const number=Number(item.n??item.number),title=C.text(item.t??item.title),slug=C.stableSlug(item.slug,`capitulo-${number}`);
    Object.assign(item,{id:item.id||chapterId(number),slug,number,title,summary:C.text(item.s??item.summary),image:item.image||item.img||null});
    return {...item,name:`Capítulo ${number} — ${title}`,
      characterIds:C.asArray(D.characters).filter(c=>C.asArray(R.AP[c.n??c.name]).includes(number)).map(c=>c.id||C.stableId(null,'character',c.n??c.name,BOOK_ID)),
      placeIds:C.asArray(item.placeIds),route:`capitulo/${number}`,sourceRef:item};
  });
  C.setCollection(BOOK_ID,'chapters',items);
})();
