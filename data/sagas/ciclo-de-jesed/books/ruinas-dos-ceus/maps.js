(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {D}=X;
  const placements={
    'jesed-place-eterea':{mapId:'eterea',x:54,y:14,kind:'region',major:true},
    'jesed-place-nivellia':{mapId:'eterea',x:51.5,y:43.5,kind:'place',major:true},
    'jesed-place-ilha-da-memoria':{mapId:'eterea',x:85.5,y:35,kind:'place',major:true},
    'jesed-place-erilan':{mapId:'eterea',x:13.5,y:34.5,kind:'place',major:true},
    'jesed-place-planalto-de-talyen':{mapId:'eterea',x:84,y:62.5,kind:'place',major:true},
    'jesed-place-bosques-de-arion':{mapId:'eterea',x:14.5,y:62.2,kind:'place',major:true},
    'jesed-place-circulo-de-nhamari':{mapId:'eterea',x:20.5,y:81.5,kind:'place',major:true},
    'jesed-place-praca-da-raiz':{mapId:'eterea',x:31.2,y:41.5,kind:'place',major:true},
    'jesed-place-estacao-da-leveza':{mapId:'eterea',x:61.5,y:50.5,kind:'place',major:false},
    'jesed-place-ilhas-baixas':{mapId:'eterea',x:48,y:91,kind:'myth',major:false},
    'jesed-place-ilha-dos-pequenos':{mapId:'eterea',x:75.8,y:87.5,kind:'place',major:true},
    'jesed-place-nadirion':{mapId:'superficie',x:69,y:62,kind:'region',major:true},
    'jesed-place-primeiro-abrigo':{mapId:'superficie',x:64,y:22,kind:'place',major:true},
    'jesed-place-riacho-de-nadirion':{mapId:'superficie',x:51,y:29,kind:'place',major:true},
    'jesed-place-floresta-de-nadirion':{mapId:'superficie',x:64,y:57.5,kind:'region',major:true},
    'jesed-place-ruinas-de-eterea':{mapId:'superficie',x:15.5,y:64,kind:'place',major:true},
    'jesed-place-vale':{mapId:'superficie',x:5.5,y:72,kind:'place',major:true}
  };
  for(const place of D.places){place.map=placements[place.id]||null;}
  D.maps={
    eterea:{
      id:'eterea',title:'Etérea — Capítulos 1 a 9',shortTitle:'Etérea',
      image:'assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-eterea.webp',ratio:'1450 / 1024',
      description:'O mundo suspenso antes da Queda, organizado por ilhas, ritos e funções comunitárias.',
      context:['Civilização suspensa','Harmonia ritual','Vento e leveza','Sociedade organizada'],
      placeIds:Object.keys(placements).filter(id=>placements[id].mapId==='eterea')
    },
    superficie:{
      id:'superficie',title:'A Superfície — Capítulos 10 a 25',shortTitle:'A Superfície',
      image:'assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-nadirion.webp',ratio:'1450 / 1024',
      description:'A região de Nadírion onde os sobreviventes aprendem a viver sem as certezas de Etérea.',
      context:['Natureza desconhecida','Sobrevivência','Terra, peso e fome','Ausência de civilização humana conhecida'],
      placeIds:Object.keys(placements).filter(id=>placements[id].mapId==='superficie')
    }
  };
})();
