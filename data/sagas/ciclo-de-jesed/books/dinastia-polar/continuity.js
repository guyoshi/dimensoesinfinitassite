(() => {
  'use strict';
  const X=window.JESED_POLAR_CONTEXT;if(!X)return;const {C,D,BOOK_ID}=X;
  const places=C.asArray(D.places);
  const patch=(id,changes)=>{const item=places.find(place=>place.id===id);if(item)Object.assign(item,changes);};

  patch('jesed-dp-place-santuario-raiz-eterna',{
    region:'Próximo ao limite entre Cidade Exterior e Cidade Intermediária · Kaeliran',
    summary:'Grande centro religioso da Raiz Eterna, erguido junto ao limite dos anéis urbanos e tratado como autoridade que atravessa as fronteiras internas da cidade. Reúne assistência, cura, registros, interrogatórios e custódia ligados ao Culto.'
  });

  patch('jesed-dp-place-propriedade-dareth',{
    region:'Terras a oeste de Kaeliran',
    summary:'Terras escolhidas por Dareth quando Vetarius lhe ofereceu uma recompensa no início de sua carreira. Ele recusou as residências da Cidade Interna e preferiu distância de Kaendar para proteger a família. Sua filha nasceu ali; anos depois, esposa e filha foram encontradas mortas na propriedade, e Dareth continuou vivendo no mesmo lugar.'
  });

  patch('jesed-dp-place-casa-balanca',{
    region:'Cidade Interna · cais do Rio Grande · Kaeliran',
    summary:'Complexo administrativo e logístico da Companhia da Balança Azul junto ao Rio Grande. Prédio de registros, armazéns, pátios de pesagem, oficinas, currais, guindastes e cais formam um dos maiores sistemas de circulação de mercadorias de Kaeliran.'
  });

  const extra=[
    {id:'jesed-dp-place-roven',slug:'roven',name:'Roven',type:'Distrito urbano',dynasty:'Polar',region:'Kaeliran',summary:'Distrito ligado a curtumes, trabalhadores e registros da Permanência. Elis nasceu ali pequena demais para guardar memória do lugar. A caixa de consulta de Roven contém a linhagem de Darven e a referência DV-0417 ligada ao passado de Neiva.'},
    {id:'jesed-dp-place-maelya',slug:'maelya',name:'Maelya',type:'Setor urbano e de arquivos',dynasty:'Polar',region:'Cidade Interna · Kaeliran',summary:'Área da Cidade Interna associada aos arquivos onde Vesna recebe acesso temporário ao substituir uma funcionária doente. É ali que ela consegue seguir a referência DV-0417 e copiar documentos ligados à origem de Neiva.'}
  ];
  for(const item of extra){if(!places.some(place=>place.id===item.id))places.push(item);}

  D.places=places;
  C.setCollection(BOOK_ID,'places',places);
})();
