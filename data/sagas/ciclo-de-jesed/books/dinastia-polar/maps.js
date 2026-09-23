(() => {
  'use strict';
  const X=window.JESED_POLAR_CONTEXT;if(!X)return;const {D}=X;

  // ── Coordenadas dos pins no mapa ──────────────────────────────────────────
  // x, y = percentagem (0–100) da imagem do mapa (esquerda→direita, topo→base)
  // kind: 'capital' | 'city' | 'place' | 'ruin' | 'nature' | 'passage'
  // major: true → pin grande e sempre visível
  const placements = {
    // Polar — centro-sul
    'jesed-dp-place-kaeliran':          {x:48.0, y:62.5, kind:'capital', major:true},
    'jesed-dp-place-fortaleza-kaendar': {x:48.3, y:62.0, kind:'place',   major:false},
    'jesed-dp-place-khar-tondr':        {x:60.5, y:66.5, kind:'city',    major:true},
    'jesed-dp-place-ardelar':           {x:55.5, y:73.5, kind:'city',    major:false},
    'jesed-dp-place-porto-salmora':     {x:42.5, y:83.0, kind:'place',   major:false},
    'jesed-dp-place-salinas-arvessa':   {x:47.5, y:87.5, kind:'nature',  major:false},
    'jesed-dp-place-garganta-kaendar':  {x:57.0, y:62.0, kind:'passage', major:false},
    'jesed-dp-place-urtar-vesh':        {x:53.0, y:76.5, kind:'ruin',    major:false},

    // Leidar — extremo norte
    'jesed-dp-place-aelvar':            {x:42.0, y:9.0,  kind:'capital', major:true},
    'jesed-dp-place-grandes-lagos-nael':{x:40.0, y:16.0, kind:'nature',  major:false},
    'jesed-dp-place-queda-aram-zir':    {x:46.5, y:22.0, kind:'nature',  major:false},
    'jesed-dp-place-ruinas-antigas':    {x:37.5, y:12.0, kind:'ruin',    major:false},

    // Braedar — noroeste
    'jesed-dp-place-braivar':           {x:27.5, y:24.0, kind:'capital', major:true},
    'jesed-dp-place-altar-dez-estandares':{x:31.0,y:17.5,kind:'place',   major:true},
    'jesed-dp-place-seykar':            {x:23.5, y:20.5, kind:'city',    major:false},
    'jesed-dp-place-valenor':           {x:30.5, y:21.5, kind:'city',    major:false},
    'jesed-dp-place-campos-ardren':     {x:27.0, y:21.0, kind:'nature',  major:false},

    // Lusdar — noroeste e oeste
    'jesed-dp-place-luzhara':           {x:19.5, y:33.5, kind:'capital', major:true},
    'jesed-dp-place-veyl-sar':          {x:17.0, y:38.0, kind:'city',    major:false},
    'jesed-dp-place-vale-essar':        {x:15.0, y:41.5, kind:'nature',  major:false},
    'jesed-dp-place-jardins-narev':     {x:21.0, y:38.5, kind:'place',   major:false},

    // Grastar — oeste
    'jesed-dp-place-avarrast':          {x:16.5, y:51.0, kind:'capital', major:true},
    'jesed-dp-place-degraus-grast':     {x:20.5, y:54.5, kind:'passage', major:false},
    'jesed-dp-place-nhal':              {x:23.0, y:51.0, kind:'city',    major:false},
    'jesed-dp-place-campos-fibra-alta': {x:18.0, y:47.0, kind:'nature',  major:false},
    'jesed-dp-place-patamar-dez-estradas':{x:26.5,y:46.0,kind:'place',   major:false},
    'jesed-dp-place-deserto-veshkar':   {x:16.0, y:72.0, kind:'nature',  major:true},

    // Cendar — centro-oeste
    'jesed-dp-place-cendar-vel':        {x:34.5, y:52.0, kind:'capital', major:true},
    'jesed-dp-place-oficinas-mairen':   {x:39.0, y:49.5, kind:'city',    major:false},
    'jesed-dp-place-campos-orven':      {x:35.5, y:56.0, kind:'nature',  major:false},
    'jesed-dp-place-passagem-lendros':  {x:31.5, y:49.0, kind:'passage', major:false},
    'jesed-dp-place-pantanos-surran':   {x:29.5, y:59.0, kind:'nature',  major:false},
    'jesed-dp-place-bosque-roldanas':   {x:37.0, y:47.0, kind:'nature',  major:false},
    'jesed-dp-place-vardel':            {x:28.5, y:53.0, kind:'city',    major:false},

    // Buldar — centro-norte e centro-leste
    'jesed-dp-place-nyn-harad':         {x:51.0, y:35.5, kind:'capital', major:true},
    'jesed-dp-place-margem-zirrios':    {x:44.5, y:43.0, kind:'city',    major:false},
    'jesed-dp-place-celeiros-harrak':   {x:54.0, y:40.5, kind:'place',   major:false},
    'jesed-dp-place-canais-maldrin':    {x:56.0, y:45.5, kind:'place',   major:false},
    'jesed-dp-place-dorran':            {x:58.0, y:49.5, kind:'city',    major:false},
    'jesed-dp-place-nharvo-alto':       {x:46.0, y:47.0, kind:'city',    major:false},
    'jesed-dp-place-veyra-agua':        {x:47.0, y:50.5, kind:'city',    major:false},
    'jesed-dp-place-mavren-baixa':      {x:49.5, y:53.0, kind:'place',   major:false},
    'jesed-dp-place-terra-preta':       {x:52.5, y:42.0, kind:'nature',  major:false},
    'jesed-dp-place-vale-semente-rubra':{x:57.5, y:43.5, kind:'nature',  major:false},

    // Vendrar — centro-norte e nordeste
    'jesed-dp-place-varkhama':          {x:63.0, y:30.5, kind:'capital', major:true},
    'jesed-dp-place-forja-aberta':      {x:66.5, y:33.5, kind:'place',   major:false},
    'jesed-dp-place-mercado-pecas':     {x:65.0, y:27.5, kind:'city',    major:false},
    'jesed-dp-place-tres-bocas':        {x:69.0, y:25.5, kind:'place',   major:false},
    'jesed-dp-place-pedra-rachada':     {x:70.5, y:30.0, kind:'city',    major:false},
    'jesed-dp-place-casa-oleo':         {x:66.0, y:22.5, kind:'place',   major:false},
    'jesed-dp-place-campos-frios':      {x:57.5, y:33.5, kind:'nature',  major:false},
    'jesed-dp-place-monte-varkhama':    {x:64.0, y:28.0, kind:'nature',  major:true},

    // Mardrar — extremo nordeste e leste
    'jesed-dp-place-mard-aren':         {x:76.5, y:21.5, kind:'capital', major:true},
    'jesed-dp-place-sar-meral':         {x:79.5, y:27.5, kind:'city',    major:false},
    'jesed-dp-place-mina-kelvar':       {x:74.0, y:25.0, kind:'place',   major:false},
    'jesed-dp-place-casa-dez-vozes':    {x:75.5, y:18.5, kind:'place',   major:false},
    'jesed-dp-place-passo-quen-mard':   {x:79.0, y:36.5, kind:'passage', major:false},

    // Quendrar — leste e sudeste
    'jesed-dp-place-harquen':           {x:77.0, y:53.5, kind:'capital', major:true},
    'jesed-dp-place-var-mir':           {x:72.5, y:59.5, kind:'city',    major:false},
    'jesed-dp-place-passo-kharvos':     {x:81.0, y:49.0, kind:'passage', major:false},
    'jesed-dp-place-campos-mirval':     {x:69.5, y:62.5, kind:'nature',  major:false},
    'jesed-dp-place-currais-nhar':      {x:73.0, y:65.0, kind:'place',   major:false},

    // Naturais
    'jesed-dp-place-mar-arvessa':       {x:48.0, y:92.0, kind:'nature',  major:true},
    'jesed-dp-place-montanhas-karvoss': {x:66.5, y:73.5, kind:'nature',  major:false},
    'jesed-dp-place-montanhas-orientais':{x:83.5,y:44.5, kind:'nature',  major:false},
    'jesed-dp-place-espinha-varkhama':  {x:67.5, y:25.0, kind:'nature',  major:false},
  };

  for (const place of D.places) {
    const m = placements[place.id];
    if (m) { place.map = m; place.x = m.x; place.y = m.y; }
  }

  // ── Rotas fluviais e terrestres ───────────────────────────────────────────
  const routeLines = [
    {
      id: 'rota-rio-grande',
      kind: 'water',
      label: 'Rio Grande',
      points: '40,16 42,22 43,30 44,38 44,45 45,50 46,55 47,62 46,70 44,78 43,83 42,88'
    },
    {
      id: 'rota-rio-varkhan',
      kind: 'water',
      label: 'Rio Varkhan',
      points: '64,28 63,35 60,42 57,48 54,54 52,58 50,62'
    },
    {
      id: 'rota-rio-caldran',
      kind: 'water',
      label: 'Rio Caldran',
      points: '51,35 53,40 55,45 57,49 58,54 58,60 57,65 58,70 60,66'
    },
    {
      id: 'rota-rio-surran',
      kind: 'water',
      label: 'Rio Surran',
      points: '30,45 30,50 29,56 28,62 29,66 31,70 34,75 38,80 42,83'
    },
    {
      id: 'rota-raiz',
      kind: 'road',
      label: 'Rota da Raiz',
      points: '48,62 54,64 60,66'
    },
    {
      id: 'rota-laminas',
      kind: 'road',
      label: 'Rota das Lâminas',
      points: '60,66 57,71 54,76 54,80 53,83'
    },
    {
      id: 'rota-cinzas',
      kind: 'road',
      label: 'Rota das Cinzas',
      points: '63,30 62,36 60,41 57,47 54,52 51,56 49,60 48,62'
    },
    {
      id: 'caminho-torneio',
      kind: 'road',
      label: 'Caminho do Torneio',
      points: '48,62 42,55 35,48 31,38 31,27 31,18'
    }
  ];

  D.maps = {
    main: {
      id: 'dinastia-polar',
      title: 'Jesed · Época da Dinastia Polar',
      image: 'assets/books/ciclo-de-jesed/dinastia-polar/maps/map.webp',
      ratio: '1536 / 1024',
      placeIds: Object.keys(placements),
      routeLines,
      strategicCategories: []
    }
  };
})();
