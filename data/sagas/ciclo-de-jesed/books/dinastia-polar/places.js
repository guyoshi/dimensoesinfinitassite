(() => {
  'use strict';
  const X = window.JESED_POLAR_CONTEXT;
  if (!X) return;
  const { C, D, BOOK_ID } = X;

  // Geografia canônica consolidada para o início de Dinastia Polar.
  // IDs e slugs históricos são preservados quando um nome antigo possui
  // equivalente canônico direto, protegendo favoritos e rotas já guardadas.
  const p = (id, name, slug, type, dynasty, region, summary) => ({
    id: `jesed-dp-place-${id}`, name, slug, type, dynasty, region, summary
  });

  const places = [
    // Polar — centro-sul
    p('kaeliran','Kaeliran','kaeliran','Capital','Polar','Centro-sul · Rio Grande','Metrópole Polar de cerca de 62 mil habitantes. Três faixas muradas e onze distritos convergem para Kaendar; riqueza monumental e pobreza comprimida coexistem na mesma cidade.'),
    p('fortaleza-kaendar','Kaendar','fortaleza-kaendar','Palácio-fortaleza','Polar','Núcleo soberano de Kaeliran','Palácio-fortaleza no ponto mais alto, com pátios, arquivos, câmaras de governo e defesas imediatas. Kaendar já não nomeia a metrópole inteira.'),
    p('khar-tondr','Khar-Kaelyr','khar-tondr','Cidade fortificada e mineira','Polar','Leste do território Polar','Antiga Khar-Tondr, tomada pelos Polar. Conserva arquitetura subterrânea e costumes absorvidos; controla passagens orientais e a extração de dravenito.'),
    p('porto-salmora','Porto de Salmora','porto-salmora','Porto','Polar','Baixo Rio Grande · próximo ao Mar de Arvessa','Porto meridional ligado ao baixo Rio Grande, às salinas e ao comércio marítimo. Kaeliran fica distante do litoral.'),
    p('salinas-arvessa','Salinas de Arvessa','salinas-arvessa','Região produtiva','Polar','Litoral sul','Lâminas rasas de evaporação, depósitos brancos e postos de vigilância sustentam a maior fonte direta de riqueza Polar.'),
    p('garganta-kaendar','Garganta de Kaendar','garganta-kaendar','Passagem defensiva','Polar','Eixo oriental','Passagem rochosa fortificada que protege as aproximações orientais e concentra estradas, postos e memória militar.'),
    p('urtar-vesh','Urtar-Vesh','urtar-vesh','Ruína','—','Antigas terras Urtistar','Ruína sem autoridade territorial unificada, ocupada por pequenos grupos e atravessada por rotas perigosas.'),
    p('caminho-permanencia','Caminho da Permanência','caminho-permanencia','Avenida cerimonial','Polar','Kaeliran','Rota monumental, limpa e iluminada, que sobe dos anéis urbanos a Kaendar e recebe procissões, delegações, condenados e celebrações.'),
    p('santuario-raiz-eterna','Santuário da Raiz Eterna','santuario-raiz-eterna','Santuário','Polar','Cidade Interna · Kaeliran','Centro religioso dominante, marcado pela Raiz Polar, torres, pedra escura e cerimônias de legitimidade.'),
    p('olho-kaeliran','Olho de Kaeliran','olho-kaeliran','Monumento e torre de vigilância','Polar','Kaeliran','Monumento de observação e propaganda erguido para afirmar que nada entra na capital sem ser visto.'),
    p('patio-namar','Pátio de Namar','patio-namar','Praça pública','Polar','Entre Vardeno e Kaelyr · Kaeliran','Praça de comunicados, registros e apresentações que, em momentos excepcionais, recebe julgamentos e execuções.'),
    p('casa-ferro-baixo','Casa do Ferro Baixo','casa-ferro-baixo','Prisão','Polar','Vardeno · Kaeliran','Prisão central ligada aos tribunais, ao trabalho penal e ao percurso de condenados.'),
    p('casa-balanca','Casa da Balança','casa-balanca','Sede comercial','Polar','Talarim · Kaeliran','Sede monumental da Companhia da Balança Azul, com arquivos, escritórios, pátios de carga e armazéns.'),
    p('casa-bandeiras-fechadas','Casa das Bandeiras Fechadas','casa-bandeiras-fechadas','Hospedaria diplomática','Polar','Talarim · Kaeliran','Hospedaria fortificada onde estandartes estrangeiros permanecem recolhidos para não sugerir posse territorial.'),
    p('maruva','Casa coletiva de Maruva','maruva','Moradia coletiva','Polar','Maruva · Cidade Exterior','Residência superlotada de trabalhadores e Nular, com cozinhas, oficinas domésticas, vigilância e responsabilidade coletiva.'),
    p('propriedade-dareth','Propriedade rural de Dareth','propriedade-dareth','Propriedade rural','Polar','Além de Alysen · oeste de Kaeliran','Terra herdada e antes abandonada, ligada à estrada ocidental; lugar de silêncio e memória familiar.'),

    // Leidar — extremo norte
    p('aelvar','Aelvar','aelvar','Capital','Leidar','Extremo norte · vale fluvial','Cidade que desce pelas encostas até o rio, com telhados inclinados, canais, escadarias, plataformas habitadas e pontes altas.'),
    p('ponte-quatro-aguas','Ponte das Quatro Águas','ponte-quatro-aguas','Marco arquitetônico','Leidar','Aelvar','Grande travessia elevada e principal marco de Aelvar, unindo níveis urbanos e cursos de água sem aparência futurista.'),
    p('neran','Neran','neran','Cidade lacustre','Leidar','Terras Leidar','Cidade em torno de um lago profundo, com bairros sobre estacas, docas, viveiros, barcos, defumadores e criação de peixes.'),
    p('salyren','Salyren','salyren','Cidade de pomares','Leidar','Terras Leidar','Pomares planejados, enxertia, frutas, bebidas, pátios de secagem, conservação e depósitos frescos.'),
    p('porto-bri','Porto Bri','porto-bri','Cidade fortificada e porto fluvial','Leidar','Alto Rio Grande','Principal centro aduaneiro, comercial e militar do norte, fortificado nas margens do alto Rio Grande.'),
    p('ruinas-antigas','Ruínas Fundas','ruinas-antigas','Ruína','—','Sul de Aelvar','Área antiga, perigosa, saqueada e parcialmente enterrada, ligada ao Povo dos Céus; não é uma cidade viva.'),
    p('grandes-lagos-nael','Grandes Lagos e Nascentes Altas','grandes-lagos-nael','Região natural','Leidar','Norte de Jesed','Lagos profundos, nascentes, florestas frias e cursos superiores que alimentam o Rio Grande.'),
    p('queda-aram-zir','Queda de Aram-Zír','queda-aram-zir','Queda d’água e fronteira','—','Fronteira Leidar–Buldar','Grande queda d’água de nome Glydar, marco natural de uma fronteira agrícola disputada.'),

    // Braidar — noroeste
    p('braivar','Braivar','braivar','Capital','Braidar','Noroeste','Capital extensa, cheia de oficinas, mercados cobertos, depósitos, hospedarias, pátios de montagem e ruas para carroças.'),
    p('torre-revier','Torre Revier','torre-revier','Marco arquitetônico','Braidar','Praça central de Braivar','Três torres inclinadas partem de bases distintas e se unem no alto, simbolizando Produção, Rotas e Registros.'),
    p('seykar','Seykar','seykar','Cidade manufatureira','Braidar','Território Braidar','Centro de papel com canais rasos, tanques de fibras, prensas, moinhos, varais, depósitos e bairros operários.'),
    p('valenor','Valenor','valenor','Cidade comercial','Braidar','Território Braidar','Entrepostos, adegas, frutas Leidar, especiarias, conversão de moedas e grandes depósitos.'),
    p('campos-ardren','Campos de Ardren','campos-ardren','Região agrícola','Braidar','Fronteira Leidar','Campos, criação, plantas fibrosas e povoados marcados por antigas disputas de fronteira.'),
    p('estrada-duas-origens','Estrada das Duas Origens','estrada-duas-origens','Rota comercial','Braidar','Entre Braidar e Luzdar','Estrada de carroças que transporta papel, medicamentos, recipientes e curadores.'),
    p('altar-dez-estandares','Altar dos Dez Estandartes','altar-dez-estandares','Arena do Torneio Decenal','Braidar','Cume fora de Braivar','Arena circular de pedra com dez entradas, dez estandartes, arquibancadas em níveis e acampamentos separados.'),

    // Luzdar — noroeste e oeste
    p('luzhara','Luzhara','luzhara','Capital','Luzdar','Noroeste e oeste','Capital medicinal num vale com canais, jardins em terraços, mercados de ervas, casas de tratamento, escolas e arquivos.'),
    p('biblioteca-sete-caminhos','Biblioteca dos Sete Caminhos','biblioteca-sete-caminhos','Biblioteca','Luzdar','Luzhara','Principal marco de Luzhara, reunindo arquivos, salas de estudo, professores, tradutores e escribas.'),
    p('veyl-sar','Seylara','veyl-sar','Cidade das águas','Luzdar','Território Luzdar','Cidade clara e verde, com canais, jardins escalonados, pontes de pedra e piscina pública de água corrente.'),
    p('jardins-narev','Meraval','jardins-narev','Cidade de jardins medicinais','Luzdar','Território Luzdar','Centro de cultivo, enxertia, sementes medicinais e plantas adaptadas a áreas secas.'),
    p('orvenar','Orvenar','orvenar','Cidade comercial','Luzdar','Rotas Braidar e Cendar','Mercados de especiarias e perfumes, oficinas de recipientes e postos de inspeção de preparados.'),
    p('vale-essar','Vale de Namar','vale-essar','Vale protegido','Luzdar','Território Luzdar','Nascentes, pequenas comunidades, áreas pantanosas e locais protegidos de coleta de espécies raras.'),

    // Grastar — oeste
    p('avarrast','Avarrast','avarrast','Capital','Grastar','Alto planalto ocidental','Capital baixa, larga e presa à pedra por cabos, pesos e redes; pátios, cisternas e ruas protegidas resistem ao vento.'),
    p('degraus-grast','Degraus de Grast','degraus-grast','Acesso fortificado','Grastar','Encostas do planalto','Rampas, patamares, curvas defensivas, portões e pontes removíveis tornam a subida longa e controlável.'),
    p('nhal','Nhal','nhal','Cidade','Grastar','Leste do planalto','Cidade de tecelagens, cordas, redes, tendas, escalada, equipes de resgate e fortificações.'),
    p('vessar','Vessar','vessar','Cidade de fronteira','Grastar','Sul do planalto · Deserto de Veshkar','Cisternas, animais resistentes, alimentos secos e caravanas ligam a cidade aos pequenos clãs do deserto.'),
    p('deserto-veshkar','Deserto de Veshkar','deserto-veshkar','Região natural','—','Sudoeste','Deserto de rotas esparsas, cisternas vitais, pequenos clãs e antigas influências Urtistar.'),
    p('vardel-alta','Ruínas de Vardel Alta','vardel-alta','Ruína e ferida de guerra','—','Fronteira Grastar–Cendar','Três elevações partidas, fundações quebradas, reservatórios secos e plataformas desabadas.'),

    // Cendar — centro-oeste
    p('cendar-vel','Cendar-Vel','cendar-vel','Capital','Cendar','Centro-oeste','Capital vertical presa a dois maciços, com pontes recolhíveis, elevadores, plataformas, oficinas e drenagem.'),
    p('dois-pilares','Dois Pilares','dois-pilares','Marco natural e arquitetônico','Cendar','Cendar-Vel','Formações centrais da identidade política, ritual e arquitetônica da capital.'),
    p('pantanos-surran','Pântanos de Eldur','pantanos-surran','Região alagada','Cendar','Sudoeste Cendar','Águas baixas, caminhos flutuantes, drenagem, fibras, palafitas e rotas ocultas.'),
    p('rio-cendar','Rio Cendar','rio-cendar','Rio','Cendar','Território Cendar','Antigo Rio Surran; alimenta rotas, oficinas, drenagem e comunidades de margem.'),
    p('bosque-roldanas','Bosque das Rolindas','bosque-roldanas','Bosque produtivo','Cendar','Território Cendar','Bosque de madeira flexível, fibras e resinas, usado para testar mecanismos suspensos.'),
    p('oficinas-mairen','Thiorin','oficinas-mairen','Cidade-oficina','Cendar','Território Cendar','Centro de produção, ensino técnico, inspeção e contratos, sucessor das antigas Oficinas de Mairen.'),
    p('campos-orven','Omier','campos-orven','Cidade agrícola e de testes','Cendar','Território Cendar','Áreas elevadas e drenadas, ligadas por canais, onde mecanismos são testados em campo.'),
    p('passagem-lendros','Lendros','passagem-lendros','Cidade e sistema de passagem','Cendar','Território Cendar','Passagem estratégica de pontes, postos e mecanismos cuja abertura pode mudar comércio e campanhas.'),
    p('varehti','Varehti','varehti','Mercado de rotas','Cendar','Território Cendar','Cidade aberta a estrangeiros, com pousos, caravanas e registro rigoroso de cargas e mapas.'),
    p('vardel','Nova Vardel','vardel','Cidade militar e memorial','Cendar','Fronteira Grastar','Cidade fundada por sobreviventes de Vardel Alta, sede de uma Casa deslocada e centro militar.'),

    // Buldar — centro-norte e centro-leste
    p('nyn-harad','Nyn-Harad','nyn-harad','Capital','Buldar','Centro-norte','Capital ampla e horizontal, com ruas de carroças, mercados de grãos, canais, depósitos e pátios de negociação.'),
    p('canais-maldrin','Maldrin-Alta','canais-maldrin','Fortaleza e celeiros','Buldar','Território Buldar','Fortaleza de emergência, reservas de sementes e maior complexo de celeiros protegidos.'),
    p('terra-preta','Terra Preta','terra-preta','Região produtiva','Buldar','Coração Buldar','Imensa paisagem de grãos e raízes, drenada por canais e marcada por celeiros e campos contínuos.'),
    p('margem-zirrios','Margem dos Zírrios','margem-zirrios','Porto fluvial','Buldar','Rio Grande','Antiga capital Glydar convertida em porto Buldar, ainda viva em barcos, pesca e memória de perda territorial.'),
    p('nharvo-alto','Margens de Lediara','nharvo-alto','Região ribeirinha','Buldar','Acima da Margem dos Zírrios','Canais, pesca, barqueiros e comunidades Glydar subordinadas ocupam as margens.'),
    p('dorran','Campos de Ardel','dorran','Região de criação','Buldar','Território Buldar','Campos de bravões, darruvas e animais de carga, atravessados por carroças e currais.'),
    p('vale-semente-rubra','Terras Vermelhas','vale-semente-rubra','Região agrícola ritual','Buldar','Território Buldar','Solo vermelho, raízes e sementes cultivadas para cerimônias familiares.'),

    // Vendrar — centro-norte e nordeste
    p('varkhama','Varkhama','varkhama','Capital','Vendrar','Centro-norte','Cidade-forja de encosta com cerca de vinte mil residentes, oficinas, depósitos, túneis, mercados e casas de mercenários.'),
    p('forja-aberta','Forja Aberta','forja-aberta','Região mineira e de forjas','Vendrar','Território Vendrar','Fendas quentes, túneis, câmaras subterrâneas, poços minerais e oficinas escavadas.'),
    p('campos-frios','Campos Frios','campos-frios','Região','Vendrar','Oeste e sul de Varkhama','Campos frios de criação, depósitos e agricultura limitada, em contraste com a zona vulcânica.'),
    p('mercado-pecas','Vale do Varkhan','mercado-pecas','Vale produtivo e fluvial','Vendrar','Território Vendrar','Rio, madeira, carvão, caça, transporte e povoados sustentam rotas e oficinas.'),
    p('tres-bocas','Florestas do Varkhan','tres-bocas','Região florestal','Vendrar','Território Vendrar','Florestas frias de madeira e carvão, com povoamento esparso e rotas de caça.'),
    p('pedra-rachada','Rota das Cinzas','pedra-rachada','Rota comercial','Vendrar','Território Vendrar','Estrada de cargas entre minas, forjas, mercados e fronteiras, marcada por cinza e carroças.'),
    p('monte-varkhama','Monte Varkhama','monte-varkhama','Maciço vulcânico','Vendrar','Território Vendrar','Vulcão que domina a silhueta da capital e organiza minas, túneis e canais de calor.'),
    p('espinha-varkhama','Espinha de Varkhama','espinha-varkhama','Cadeia montanhosa','Vendrar','Centro-norte','Cadeia fria e mineral que delimita o território Vendrar e suas rotas.'),

    // Mardrar — extremo nordeste e leste
    p('mard-aren','Mari-Aren','mard-aren','Capital','Mardrar','Extremo nordeste e leste','Capital planejada entre árvores antigas, jardins, corredores verdes, canais, terraços e pedra escura.'),
    p('sar-meral','Sul-Merul','sar-meral','Cidade cosmopolita','Mardrar','Sul do território Mardrar','Pátios de caravanas, mercados de animais, hospedarias, depósitos, escribas e tribunais comerciais.'),
    p('mina-kelvar','Mina de Kelma','mina-kelvar','Complexo mineiro','Mardrar','Território Mardrar','Rede de túneis, povoados, oficinas, depósitos e postos militares; não deve ser confundida com Kelvar.'),
    p('casa-dez-vozes','Colina dos Veios','casa-dez-vozes','Lugar memorial','Mardrar','Território Mardrar','Colina dos encontros dos clãs fundadores, com memoriais, arquivos de pedra e cerimônias.'),
    p('passo-quen-mard','Passo de Quia-Mal','passo-quen-mard','Passagem fortificada','—','Fronteira Mardrar–Quendrar','Abrigos de inverno, fortes, postos de cobrança, ruínas de batalhas e trilhas clandestinas.'),
    p('kelvar','Kelvar','kelvar','Cidade-fortaleza ocupada','Mardrar','Fronteira Vendrar–Mardrar','Antiga cidade Vendrar de passagem, mercados e jazidas menores, hoje sob administração Mardrar.'),

    // Quendrar — leste e sudeste
    p('harquen','Harquen','harquen','Capital','Quendrar','Leste e sudeste','Cidade gigantesca que sobe a montanha em níveis murados; campos e currais ficam aos pés, árvores antigas nos terraços.'),
    p('var-mir','Wa-Mil','var-mir','Cidade produtiva e religiosa','Quendrar','Entre florestas e campos','Curtumes afastados, queijarias, oficinas de couro, mercados, hospitais e casas de Anfitriões de Omu.'),
    p('campos-mirval','Campos de Mirval','campos-mirval','Clareiras e pastagens','Quendrar','Floresta de Mirval','Clareiras, vales, vilas e pastagens dentro de uma floresta ainda 95% preservada.'),
    p('currais-nhar','Campos de Nalum','currais-nhar','Região leiteira','Quendrar','Território Quendrar','Pastagens úmidas, povoados, rebanhos, casas de maturação e mercados sazonais de queijos.'),
    p('passo-kharvos','Passo de Koranis','passo-kharvos','Passagem montanhosa','Quendrar','Montanhas orientais','Passagem usada por comércio, migração e defesa entre as montanhas e as rotas orientais.'),
    p('estrada-bramido','Estrada do Bramido','estrada-bramido','Rota de rebanhos','Quendrar','Em direção às fronteiras Polar','Caminho de animais, carroças e cargas com campos de contenção, água e postos de descanso.'),
    p('ruinas-sem-pegadas','Ruínas sem Pegadas','ruinas-sem-pegadas','Ruína antiga','—','Floresta de Mirval','Restos Fendelar incorporados à mata, evitados por instabilidade e pela presença próxima de um Raukhar.'),
    p('floresta-mirval','Floresta de Mirval','floresta-mirval','Região natural','Quendrar','Leste e sudeste','Vasta floresta antiga, densa e perigosa, da qual cerca de 95% permanece em pé.'),

    // Eixos naturais
    p('mar-arvessa','Mar de Arvessa','mar-arvessa','Região natural','—','Sul de Jesed','Mar meridional que recebe o Rio Grande e banha o litoral das salinas e do Porto de Salmora.'),
    p('rio-grande','Rio Grande','rio-grande','Rio e rota principal','—','De Leidar ao Mar de Arvessa','Eixo geográfico, comercial e político que atravessa o continente e passa por Kaeliran.'),
    p('montanhas-karvoss','Montanhas de Karvoss','montanhas-karvoss','Cadeia montanhosa','—','Sudeste','Barreira mineral entre territórios Polar, Quendrar e as regiões orientais.'),
    p('montanhas-orientais','Montanhas Orientais','montanhas-orientais','Cadeia montanhosa','—','Extremo leste','Altas montanhas atrás de Harquen, associadas à fuga Quendrar e às passagens orientais.')
  ];

  const populations = {
    'jesed-dp-place-kaeliran': '~ 62.000 habitantes',
    'jesed-dp-place-varkhama': '~ 20.000 residentes permanentes'
  };
  for (const place of places) {
    if (populations[place.id]) place.population = { label: populations[place.id] };
  }

  // Ilustrações já recebidas (pasta 02 - Assets/Lugares do projeto do livro).
  const IMG = 'assets/books/ciclo-de-jesed/dinastia-polar/places/';
  const images = {
    'jesed-dp-place-aelvar': 'aelvar.webp',
    'jesed-dp-place-altar-dez-estandares': 'altar-dez-estandares.webp',
    'jesed-dp-place-avarrast': 'avarrast.webp',
    'jesed-dp-place-braivar': 'braivar.webp',
    'jesed-dp-place-cendar-vel': 'cendar-vel.webp',
    'jesed-dp-place-fortaleza-kaendar': 'fortaleza-kaendar.webp',
    'jesed-dp-place-harquen': 'harquen.webp',
    'jesed-dp-place-maruva': 'maruva.webp',
    'jesed-dp-place-kaeliran': 'kaeliran.webp',
    'jesed-dp-place-kelvar': 'kelvar.webp',
    'jesed-dp-place-khar-tondr': 'khar-tondr.webp',
    'jesed-dp-place-passagem-lendros': 'passagem-lendros.webp',
    'jesed-dp-place-luzhara': 'luzhara.webp',
    'jesed-dp-place-mard-aren': 'mard-aren.webp',
    'jesed-dp-place-nhal': 'nhal.webp',
    'jesed-dp-place-nyn-harad': 'nyn-harad.webp',
    'jesed-dp-place-campos-orven': 'campos-orven.webp',
    'jesed-dp-place-porto-salmora': 'porto-salmora.webp',
    'jesed-dp-place-bosque-roldanas': 'bosque-roldanas.webp',
    'jesed-dp-place-seykar': 'seykar.webp',
    'jesed-dp-place-veyl-sar': 'veyl-sar.webp',
    'jesed-dp-place-valenor': 'valenor.webp',
    'jesed-dp-place-varkhama': 'varkhama.webp',
    'jesed-dp-place-vessar': 'vessar.webp'
  };
  for (const place of places) {
    if (images[place.id]) place.image = IMG + images[place.id];
  }

  D.places = places;
  C.setCollection(BOOK_ID, 'places', places);
})();
