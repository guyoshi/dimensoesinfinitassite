(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Mapa do livro. Quando existir a imagem, defina D.maps.main = {id,title,image,ratio,placeIds,routeLines,strategicCategories:[]}
  // e os pins em `placements` (x,y em % da imagem; kind: capital|city|place|ruin|nature|passage; major: true = pin grande).
  // Imagem prevista: assets/books/ciclo-de-jesed/herdeiros-das-cinzas/maps/map.webp
  const placements={};
  const routeLines=[];
  D.places.forEach(place=>{if(placements[place.id])place.map=placements[place.id];});
  D.maps={main:null};
})();
