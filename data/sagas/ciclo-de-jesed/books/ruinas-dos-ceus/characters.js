(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,D,R,BOOK_ID,chapterId}=X;
  const renamedCompat={
    'Mariv':{id:'jesed-character-marv',slug:'marv'},
    'Yrisea':{id:'jesed-character-yrsea',slug:'yrsea'},
    'Professor Taliver':{id:'jesed-character-professor-talver',slug:'professor-talver'},
    'Maletar':{id:'jesed-character-malthar',slug:'malthar'},
    'Gabasteri':{id:'jesed-character-gabasteres',slug:'gabasteres'}
  };
  const items=C.asArray(D.characters).map(item=>{
    const name=C.text(item.n??item.name),compat=renamedCompat[name]||{},slug=C.stableSlug(item.slug||compat.slug,name);
    Object.assign(item,{id:item.id||compat.id||C.stableId(null,'character',name,BOOK_ID),slug,name,subtitle:C.text(item.a??item.subtitle),summary:C.text(item.s??item.summary),status:C.text(item.st??item.status),image:item.image||R.charImage(name)});
    return {...item,chapterIds:C.asArray(R.AP[name]).map(chapterId),placeIds:C.asArray(item.placeIds),route:`personagem/${slug}`,sourceRef:item};
  });
  C.setCollection(BOOK_ID,'characters',items);
})();
