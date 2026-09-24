const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const dataBase = 'data/sagas/ciclo-de-jesed/books';
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'data/common/entity-manifest.json'), 'utf8'));
const canonicalAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/canonical-etapa-3.json'), 'utf8'));
const timelineAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json'), 'utf8'));
const placesAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/places-etapa-5.json'), 'utf8'));
const visualAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/visual-etapa-5-5.json'), 'utf8'));
const mapsAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json'), 'utf8'));
const assetManifest = JSON.parse(fs.readFileSync(path.join(root, 'data/common/assets-manifest.json'), 'utf8'));
const homeAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/home-assets-etapa-7.json'), 'utf8'));
const charactersAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json'), 'utf8'));
const imageRequirements = JSON.parse(fs.readFileSync(path.join(root, 'data/common/image-requirements-etapa-9.json'), 'utf8'));
const socialAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/social-etapa-9.json'), 'utf8'));
const clansAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/clans-etapa-10.json'), 'utf8'));
const loreAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/lore-etapa-11.json'), 'utf8'));
const themesGalleryAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/themes-galleries-etapa-14-15.json'), 'utf8'));
const stage16Audit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/visual-responsive-etapa-16.json'), 'utf8'));
const stage16BrowserAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/visual-responsive-etapa-16-browser.json'), 'utf8'));
const errors = [], warnings = [];
function context(){const c={console,CustomEvent:function(t,i){this.type=t;this.detail=i?.detail},dispatchEvent:()=>{},document:{querySelector:()=>null}};c.window=c;vm.createContext(c);return c;}
function load(c,files){for(const relative of files){const absolute=path.join(root,relative);if(!fs.existsSync(absolute)){errors.push(`Arquivo ausente: ${relative}`);continue;}vm.runInContext(fs.readFileSync(absolute,'utf8'),c,{filename:relative});}}
const common='data/common/schema.js';
const collections=['chapters','characters','timeline','relationships','places','mysteries','themes','fauna','flora','foods','concepts','gallery'];
const collectionFiles=collections.filter(name=>name!=='gallery');
const guerrasFiles=[`${dataBase}/guerras-de-sangue/runtime.js`,`${dataBase}/guerras-de-sangue/trajectory.js`,common,`${dataBase}/guerras-de-sangue/book.js`,`${dataBase}/guerras-de-sangue/canonical.js`,`${dataBase}/guerras-de-sangue/social.js`,`${dataBase}/guerras-de-sangue/clans.js`,`${dataBase}/guerras-de-sangue/lore-stage11.js`,...collectionFiles.map(x=>`${dataBase}/guerras-de-sangue/${x}.js`),`${dataBase}/guerras-de-sangue/maps.js`,`${dataBase}/guerras-de-sangue/gallery.js`,`${dataBase}/guerras-de-sangue/index.js`];
const ruinasFiles=[`${dataBase}/ruinas-dos-ceus/runtime.js`,`${dataBase}/ruinas-dos-ceus/trajectory.js`,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/base.js',common,`${dataBase}/ruinas-dos-ceus/book.js`,`${dataBase}/ruinas-dos-ceus/canonical.js`,`${dataBase}/ruinas-dos-ceus/social.js`,`${dataBase}/ruinas-dos-ceus/lore-stage11.js`,...collectionFiles.map(x=>`${dataBase}/ruinas-dos-ceus/${x}.js`),`${dataBase}/ruinas-dos-ceus/maps.js`,`${dataBase}/ruinas-dos-ceus/gallery.js`,`${dataBase}/ruinas-dos-ceus/index.js`];
const gc=context(),rc=context();load(gc,guerrasFiles);load(rc,ruinasFiles);
const models={'guerras-de-sangue':gc.DI_DATA?.common,'ruinas-dos-ceus':rc.RUINAS_DATA?.common};
for(const [bookId,model] of Object.entries(models)){
  if(!model){errors.push(`${bookId}: modelo comum ausente.`);continue;}
  for(const col of collections)if(!Array.isArray(model.entities?.[col]))errors.push(`${bookId}: coleção ausente (${col}).`);
  for(const [col,items] of Object.entries(model.entities||{})){
    const ids=new Set(),slugs=new Set();
    for(const item of items){
      if(!item.id)errors.push(`${bookId}/${col}: sem ID.`);else if(ids.has(item.id))errors.push(`${bookId}/${col}: ID duplicado ${item.id}.`);else ids.add(item.id);
      if(!item.slug)errors.push(`${bookId}/${col}: sem slug.`);else if(slugs.has(item.slug))errors.push(`${bookId}/${col}: slug duplicado ${item.slug}.`);else slugs.add(item.slug);
    }
  }
  if(model.warnings?.length)warnings.push(...model.warnings.map(w=>`${bookId}: ${w}`));
}
const rdc=models['ruinas-dos-ceus'];
const expectedTitles={11:'Sobrevivência',12:'O Homem no Riacho',15:'O Peso do Silêncio',21:'A Leveza e o Peso',25:'O Vale'};
for(const [number,title] of Object.entries(expectedTitles)){const ch=rdc.entities.chapters.find(x=>x.number===Number(number));if(ch?.title!==title)errors.push(`Ruínas: capítulo ${number} deveria ser “${title}”, encontrado “${ch?.title}”.`);}
const raukhar=rdc.entities.fauna.find(x=>x.id==='jesed-fauna-raukhar');if(!raukhar)errors.push('Ruínas: ID histórico do Raukhar desapareceu.');else{if(raukhar.name!=='Raukhar')errors.push(`Ruínas: nome canônico do Raukhar incorreto (${raukhar.name}).`);if(raukhar.slug!=='raukhar')errors.push('Ruínas: slug histórico raukhar não foi preservado.');}
const gs=gc.DI_DATA;if(gs){const o=gs.mysteries?.find(x=>x.id==='jesed-mystery-orionus');if(!o?.answer?.includes('Ylvena pretendia envenenar Alyra'))errors.push('Guerras: verdade da morte de Orionus não está preservada.');}
const allowedRelations=new Set(['ocorre','citado','recordado','revelado','investigado','consequencia']);
function validateTimeline(bookId,model,expectedCount){
  const items=model?.entities?.timeline||[];
  if(items.length!==expectedCount)errors.push(`${bookId}: esperados ${expectedCount} acontecimentos na Linha do Tempo, encontrados ${items.length}.`);
  const ids=new Set(items.map(x=>x.id));
  let previous=-Infinity;
  for(const event of items){
    if(!event.dateLabel)errors.push(`${bookId}: data visível ausente em ${event.id}.`);
    if(!Number.isFinite(Number(event.sortKey)))errors.push(`${bookId}: sortKey inválido em ${event.id}.`);
    if(Number(event.sortKey)<previous)errors.push(`${bookId}: ordem cronológica quebrada em ${event.id}.`);
    previous=Number(event.sortKey);
    if(!event.summary||!event.context||!event.cause||!Array.isArray(event.consequences)||!event.consequences.length)errors.push(`${bookId}: página individual incompleta em ${event.id}.`);
    for(const link of event.chapterLinks||[]){if(!allowedRelations.has(link.relation))errors.push(`${bookId}: relação de capítulo inválida (${link.relation}) em ${event.id}.`);}
    for(const id of event.relatedEventIds||[]){if(!ids.has(id))errors.push(`${bookId}: evento relacionado ausente (${id}) em ${event.id}.`);}
    if((event.relatedEventIds||[]).length!==new Set(event.relatedEventIds||[]).size)errors.push(`${bookId}: acontecimento relacionado duplicado em ${event.id}.`);
  }
}
validateTimeline('guerras-de-sangue',models['guerras-de-sangue'],timelineAudit.counts['guerras-de-sangue']);
validateTimeline('ruinas-dos-ceus',models['ruinas-dos-ceus'],timelineAudit.counts['ruinas-dos-ceus']);
const gsTimeline=models['guerras-de-sangue'].entities.timeline,rdTimeline=models['ruinas-dos-ceus'].entities.timeline;
const orionus=gsTimeline.find(x=>x.id==='jesed-event-death-orionus');
if(!orionus?.truth?.includes('O veneno era destinado a Alyra'))errors.push('Linha do Tempo: verdade da morte de Orionus incorreta ou ausente.');
if(!orionus?.chapterLinks?.some(x=>x.relation==='revelado'&&x.chapterId==='jesed-chapter-gs-25'))errors.push('Linha do Tempo: revelação da morte de Orionus no Capítulo 25 não registrada.');
const queda=rdTimeline.find(x=>x.id==='jesed-event-rdc-o-cataclisma');if(queda?.sortKey!==0||queda?.date?.era!=='Queda')errors.push('Ruínas: a Queda deve ser o marco cronológico zero.');
const requiredLegacyGS=['morte-de-orionus',...Array.from({length:23},(_,i)=>`acontecimentos-capitulo-${String(i+1).padStart(2,'0')}`)];
const requiredLegacyRDC=['as-primeiras-pedras','o-primeiro-voo-falha','o-cataclisma','primeiro-abrigo-incendiado','reencontro-das-irmas','a-chegada-de-platisa','o-nome-polar','as-ruinas-revelam-a-origem','o-sacrificio-de-jokara','a-ultima-perseguicao','o-vale'];
function validatesLegacy(items,slugs,label){for(const slug of slugs)if(!items.some(x=>x.slug===slug||(x.legacySlugs||[]).includes(slug)))errors.push(`${label}: slug histórico não resolvido (${slug}).`);}
validatesLegacy(gsTimeline,requiredLegacyGS,'Guerras');validatesLegacy(rdTimeline,requiredLegacyRDC,'Ruínas');
function validatePlaces(bookId,model,audit){
  const places=model?.entities?.places||[],chapters=new Set((model?.entities?.chapters||[]).map(x=>x.id)),characters=new Set((model?.entities?.characters||[]).map(x=>x.id)),events=new Set((model?.entities?.timeline||[]).map(x=>x.id));
  if(places.length!==audit.places)errors.push(`${bookId}: esperados ${audit.places} lugares na Etapa 5, encontrados ${places.length}.`);
  const populationCount=places.filter(place=>place.population).length;
  if(populationCount!==audit.populationFields)errors.push(`${bookId}: esperados ${audit.populationFields} campos de população, encontrados ${populationCount}.`);
  const sceneCount=places.reduce((total,place)=>total+(place.chapterScenes||[]).length,0);
  if(sceneCount!==audit.chapterScenes)errors.push(`${bookId}: esperadas ${audit.chapterScenes} cenas localizadas, encontradas ${sceneCount}.`);
  for(const place of places){
    if(place.state==='Activa'||place.state==='Ativa')errors.push(`${bookId}: campo genérico Estado: Activa ainda existe em ${place.id}.`);
    if(!place.summary||!Array.isArray(place.description)||place.description.length<2)errors.push(`${bookId}: descrição aprofundada incompleta em ${place.id}.`);
    if(!place.region||!place.location||!place.narrativeFunction||!place.architecture||!place.atmosphere)errors.push(`${bookId}: ficha estrutural incompleta em ${place.id}.`);
    for(const key of ['resources','dangers','culture','chapterScenes','characterIds','eventIds'])if(!Array.isArray(place[key]))errors.push(`${bookId}: campo ${key} não é uma lista em ${place.id}.`);
    if(place.population&&!place.population.label)errors.push(`${bookId}: população sem apresentação legível em ${place.id}.`);
    for(const scene of place.chapterScenes||[]){
      if(!chapters.has(scene.chapterId))errors.push(`${bookId}: capítulo inexistente ${scene.chapterId} ligado a ${place.id}.`);
      if(!scene.text)errors.push(`${bookId}: cena sem descrição específica em ${place.id}.`);
      for(const id of scene.characterIds||[])if(!characters.has(id))errors.push(`${bookId}: personagem inexistente ${id} ligado à cena de ${place.id}.`);
    }
    for(const id of place.characterIds||[])if(!characters.has(id))errors.push(`${bookId}: personagem inexistente ${id} ligado a ${place.id}.`);
    for(const id of place.eventIds||[])if(!events.has(id))errors.push(`${bookId}: acontecimento inexistente ${id} ligado a ${place.id}.`);
  }
}
validatePlaces('guerras-de-sangue',models['guerras-de-sangue'],placesAudit.books['guerras-de-sangue']);
validatePlaces('ruinas-dos-ceus',models['ruinas-dos-ceus'],placesAudit.books['ruinas-dos-ceus']);
for(const id of placesAudit.books['guerras-de-sangue'].routesIntegrated||[])if(!models['guerras-de-sangue'].entities.places.some(place=>place.id===id))errors.push(`Guerras: rota histórica não foi incorporada a Lugares (${id}).`);
for(const [bookId,items] of [['guerras-de-sangue',gsTimeline],['ruinas-dos-ceus',rdTimeline]]){
  const protectedIds=new Set(manifest.books?.[bookId]?.protectedIds?.timeline||[]);
  const currentIds=new Set(items.map(x=>x.id));
  for(const id of protectedIds)if(!currentIds.has(id))errors.push(`${bookId}: ID protegido da Linha do Tempo desapareceu (${id}).`);
  for(const id of currentIds)if(!protectedIds.has(id))errors.push(`${bookId}: novo ID da Linha do Tempo não foi registrado no manifesto (${id}).`);
}

const requiredVisualFiles=[
  'app/shared/experience/common.css',
  'app/shared/experience/common.js',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js',
  '',
  'docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md',
  ...visualAudit.screenshots
];
for(const file of requiredVisualFiles)if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 5.5: arquivo obrigatório ausente (${file}).`);
const visualSourceFiles=[
  'app/shared/experience/common.js',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js',
  'app/shared/experience/common.css',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css'
];
for(const file of visualSourceFiles){
  const text=fs.readFileSync(path.join(root,file),'utf8');
  if(/https?:\/\//.test(text))errors.push(`Etapa 5.5: dependência externa inesperada em ${file}.`);
}
const ruinasHtml=fs.readFileSync(path.join(root,'ruinas.html'),'utf8');
const guerrasHtml=fs.readFileSync(path.join(root,'guerras.html'),'utf8');
for(const ref of ['app/shared/experience/common.css','app/shared/experience/common.js','app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css','app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'])if(!ruinasHtml.includes(ref))errors.push(`Ruínas: recurso da Etapa 5.5 não carregado (${ref}).`);
for(const ref of ['app/shared/experience/common.css','app/shared/experience/common.js','app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css','app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js'])if(!guerrasHtml.includes(ref))errors.push(`Guerras: recurso da Etapa 5.5 não carregado (${ref}).`);
const ruinasExperience=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'),'utf8');
const guerrasExperience=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js'),'utf8');
if(!ruinasExperience.includes("const P='di-ruinas-';"))errors.push('Ruínas: prefixo de preferências específicas ausente.');
if(!guerrasExperience.includes("const P='di-guerras-';"))errors.push('Guerras: prefixo de preferências específicas ausente.');
if(!ruinasExperience.includes('data-time-slider')||!ruinasExperience.includes('data-time-auto'))errors.push('Ruínas: relógio temporário incompleto.');
if(!ruinasExperience.includes('[data-contemplative="ruinas"]'))errors.push('Ruínas: modo contemplativo não ligado ao botão da página inicial.');
if(!guerrasExperience.includes('[data-contemplative="guerras"]'))errors.push('Guerras: modo contemplativo não ligado ao botão da página inicial.');
if((guerrasExperience.match(/document.createElement\('canvas'\)/g)||[]).length<2)errors.push('Guerras: as duas camadas Canvas de partículas não foram encontradas.');
if(!visualAudit?.global?.performanceButtonAlwaysVisible)errors.push('Etapa 5.5: botão permanente de desempenho não confirmado na auditoria.');
if(visualAudit?.global?.externalDependenciesAdded!==0)errors.push('Etapa 5.5: auditoria registra dependência externa não autorizada.');

for(const html of ['index.html','ruinas.html','guerras.html']){const text=fs.readFileSync(path.join(root,html),'utf8');for(const m of text.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g)){const ref=m[1];if(ref.startsWith('assets/')||/^https?:/.test(ref))continue;if(!fs.existsSync(path.join(root,ref)))errors.push(`${html}: referência ausente (${ref}).`);}}
const forbidden=['app.js','styles.css','portal.js','portal.css','portal-data.js','ruinas-app.js','ruinas-base.js','ruinas-events.js','ruinas.css','ruinas-avatar.css','ruinas-data.js','ruinas-trajetoria-data.js','book-music-loader.js','book-music.js','book-music.css','book-music.config.js'];for(const f of forbidden)if(fs.existsSync(path.join(root,f)))errors.push(`Arquivo antigo ainda solto na raiz: ${f}`);
if(!canonicalAudit?.architecture?.appPattern)errors.push('Relatório canônico da Etapa 3 inválido.');
if(timelineAudit?.stage!==4)errors.push('Relatório da Linha do Tempo da Etapa 4 inválido.');
if(placesAudit?.stage!=='Etapa 5')errors.push('Relatório de Lugares da Etapa 5 inválido.');
if(visualAudit?.stage!=='Etapa 5.5')errors.push('Relatório visual da Etapa 5.5 inválido.');
if(mapsAudit?.stage!=='Etapa 6')errors.push('Relatório de Mapas da Etapa 6 inválido.');
if(homeAudit?.stage!=='Etapa 7')errors.push('Relatório de páginas iniciais e assets da Etapa 7 inválido.');
if(charactersAudit?.stage!=='Etapa 8')errors.push('Relatório de Personagens da Etapa 8 inválido.');
if(socialAudit?.stage!=='Etapa 9')errors.push('Relatório social e atmosférico da Etapa 9 inválido.');

function validateMaps(){
  const ruinas=rc.RUINAS_DATA,guerras=gc.DI_DATA;
  const ruinasMaps=ruinas?.maps||{};
  const warMap=guerras?.maps?.main;
  if(Object.keys(ruinasMaps).length!==2)errors.push(`Etapa 6: Ruínas deveria possuir 2 mapas, encontrados ${Object.keys(ruinasMaps).length}.`);
  for(const id of ['eterea','superficie']){
    const map=ruinasMaps[id];
    if(!map)continue;
    if(!fs.existsSync(path.join(root,map.image)))errors.push(`Etapa 6: imagem de mapa ausente (${map.image}).`);
    if(!Array.isArray(map.context)||map.context.length!==4)errors.push(`Etapa 6: contexto integrado incompleto no mapa ${id}.`);
    for(const placeId of map.placeIds||[]){const place=ruinas.places.find(x=>x.id===placeId);if(!place)errors.push(`Etapa 6: lugar de Ruínas ausente no mapa (${placeId}).`);else if(!place.map||!Number.isFinite(place.map.x)||!Number.isFinite(place.map.y))errors.push(`Etapa 6: coordenada inválida em ${placeId}.`);}
  }
  const ruinasMapped=new Set(Object.values(ruinasMaps).flatMap(map=>map.placeIds||[]));
  if(ruinasMapped.size!==ruinas.places.length)errors.push(`Etapa 6: nem todos os lugares de Ruínas foram mapeados (${ruinasMapped.size}/${ruinas.places.length}).`);
  for(const place of ruinas.places)if(!ruinasMapped.has(place.id))errors.push(`Etapa 6: lugar de Ruínas sem mapa (${place.id}).`);
  if(!warMap)errors.push('Etapa 6: mapa de Guerras de Sangue ausente.');
  else{
    if(!fs.existsSync(path.join(root,warMap.image)))errors.push(`Etapa 6: imagem de Guerras ausente (${warMap.image}).`);
    if((warMap.placeIds||[]).length!==guerras.places.length)errors.push(`Etapa 6: pins de Guerras incompletos (${warMap.placeIds?.length||0}/${guerras.places.length}).`);
    for(const place of guerras.places)if(!place.map||!Number.isFinite(place.map.x)||!Number.isFinite(place.map.y))errors.push(`Etapa 6: lugar de Guerras sem coordenada (${place.id}).`);
    for(const category of warMap.strategicCategories||[])if((category.items||[]).length<2)errors.push(`Etapa 6: categoria estratégica com menos de duas informações (${category.id}).`);
    if((warMap.strategicCategories||[]).length!==mapsAudit['guerras-de-sangue'].strategicCategories)errors.push('Etapa 6: quantidade de categorias estratégicas diverge da auditoria.');
    if(mapsAudit.browserTests?.guerrasPins!==guerras.places.length||mapsAudit.browserTests?.ruinasEtereaPins+mapsAudit.browserTests?.ruinasSuperficiePins!==ruinas.places.length)errors.push('Etapa 6: resultados de navegador divergem das contagens de lugares.');
    if(mapsAudit.browserTests?.runtimeExceptions!==0||mapsAudit.browserTests?.mobileNoHorizontalOverflow!==true)errors.push('Etapa 6: testes de navegador não confirmam execução limpa e responsiva.');
  }
  for(const file of [...(mapsAudit.requiredFiles||[]),...(mapsAudit.screenshots||[])])if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 6: arquivo obrigatório ausente (${file}).`);
  for(const ref of ['app/shared/maps/interactive-map.css','app/shared/maps/interactive-map.js','data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/maps.js'])if(!ruinasHtml.includes(ref))errors.push(`Etapa 6: Ruínas não carrega ${ref}.`);
  for(const ref of ['app/shared/maps/interactive-map.css','app/shared/maps/interactive-map.js','data/sagas/ciclo-de-jesed/books/guerras-de-sangue/maps.js'])if(!guerrasHtml.includes(ref))errors.push(`Etapa 6: Guerras não carrega ${ref}.`);
  const warApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  const rdMain=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js'),'utf8');
  if(!warApp.includes('chapter-pagination chapter-pagination-top'))errors.push('Etapa 6: navegação superior de capítulos ausente em Guerras.');
  if(!rdMain.includes('chapter-pagination chapter-pagination-top'))errors.push('Etapa 6: navegação superior de capítulos ausente em Ruínas.');
  if(warApp.includes('Estado no último ponto realmente escrito'))errors.push('Etapa 6: Personagens em foco de Guerras ainda exibe estado.');
  if(!warApp.includes('Paz sob responsabilidade')||!rdMain.includes('Peso, verdade e sacrifício'))errors.push('Etapa 6: descrições curtas dos personagens em foco não foram preservadas.');
}
validateMaps();

function validateStage7AssetsAndHomes(){
  const canonicalPaths=new Set((assetManifest.assets||[]).map(item=>item.caminho||item.path).filter(Boolean));
  if(assetManifest.count!==(assetManifest.assets||[]).length)errors.push(`Manifesto de assets inconsistente: count=${assetManifest.count}, entradas=${(assetManifest.assets||[]).length}.`);
  if(!(assetManifest.assets||[]).length)errors.push('Manifesto de assets vazio.');
  if(assetManifest.schemaVersion!==2)warnings.push(`Manifesto de assets ainda usa schema ${assetManifest.schemaVersion||'legado'}; esperado 2.`);
  if(homeAudit.sourceManifest!=='data/common/assets-manifest.json')errors.push('Etapa 7: relatório não aponta para o manifesto oficial de assets.');
  if((homeAudit.unresolvedLiteralPaths||[]).length)errors.push(`Etapa 7: caminhos literais não resolvidos: ${homeAudit.unresolvedLiteralPaths.join(', ')}.`);
  if(homeAudit.idsChanged!==0)errors.push('Etapa 7: a auditoria indica alteração indevida de IDs.');

  const isImage=value=>typeof value==='string'&&/^assets\//.test(value)&&/\.(?:webp|svg|png|jpe?g)$/i.test(value);
  const resolved=new Set();
  function visit(value,seen=new WeakSet()){
    if(isImage(value)){resolved.add(value);if(!canonicalPaths.has(value))errors.push(`Etapa 7: caminho de imagem fora do inventário recebido (${value}).`);return;}
    if(!value||typeof value!=='object'||seen.has(value))return;
    seen.add(value);
    if(Array.isArray(value)){for(const item of value)visit(item,seen);return;}
    for(const item of Object.values(value))visit(item,seen);
  }
  visit(gc.DI_DATA);visit(rc.RUINAS_DATA);

  const gsChapters=models['guerras-de-sangue'].entities.chapters;
  const rdChapters=models['ruinas-dos-ceus'].entities.chapters;
  const without=[...gsChapters,...rdChapters].filter(ch=>!ch.image).map(ch=>ch.id);
  if(without.length)errors.push(`Etapa 7: capítulos sem ilustração apesar do inventário recebido (${without.join(', ')}).`);
  for(const ch of [...gsChapters,...rdChapters])if(ch.image&&!canonicalPaths.has(ch.image))errors.push(`Etapa 7: capítulo ${ch.id} usa imagem não listada no inventário (${ch.image}).`);

  const allowedTextExt=new Set(['.js','.css','.html']);
  const unresolved=[];
  function walk(dir){
    for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
      const full=path.join(dir,entry.name);
      if(entry.isDirectory()){
        if(full.includes(`${path.sep}audits`)||full.includes(`${path.sep}screenshots`))continue;
        walk(full);continue;
      }
      if(!allowedTextExt.has(path.extname(entry.name)))continue;
      const text=fs.readFileSync(full,'utf8');
      for(const match of text.matchAll(/assets\/[A-Za-zÀ-ÿ0-9_() .\/-]+\.(?:webp|svg|png|jpe?g)/gi)){
        const assetPath=match[0];
        if(!canonicalPaths.has(assetPath))unresolved.push(`${path.relative(root,full)} → ${assetPath}`);
      }
    }
  }
  for(const relative of ['app','data'])walk(path.join(root,relative));
  for(const html of ['index.html','ruinas.html','guerras.html']){
    const text=fs.readFileSync(path.join(root,html),'utf8');
    for(const match of text.matchAll(/assets\/[A-Za-zÀ-ÿ0-9_() .\/-]+\.(?:webp|svg|png|jpe?g)/gi))if(!canonicalPaths.has(match[0]))unresolved.push(`${html} → ${match[0]}`);
  }
  if(unresolved.length)errors.push(`Etapa 7: referências de imagem não resolvidas no inventário recebido:\n${unresolved.join('\n')}`);

  const rdMain=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js'),'utf8');
  const gsApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  for(const [label,text] of [['Ruínas',rdMain],['Guerras',gsApp]]){
    if(!text.includes('Ciclo de Jesed — Guia do Livro'))errors.push(`Etapa 7: cabeçalho Guia do Livro ausente em ${label}.`);
    if(text.includes('Últimos capítulos'))errors.push(`Etapa 7: bloco Últimos capítulos ainda existe em ${label}.`);
    if(!text.includes('home-guide-grid'))errors.push(`Etapa 7: grade orientadora ausente em ${label}.`);
    if(!text.includes('home-place-grid'))errors.push(`Etapa 7: seção visual de Lugares ausente em ${label}.`);
  }
  if((rdMain.match(/data-map-open=/g)||[]).length<2)errors.push('Etapa 7: prévias separadas dos mapas de Etérea e Superfície ausentes na página inicial de Ruínas.');
  if(!gsApp.includes('home-strategy-strip'))errors.push('Etapa 7: faixa estratégica do mapa ausente na página inicial de Guerras.');
  const expectedHomes={
    'ruinas-dos-ceus':{guideCards:4,focusCharacters:5,placeCards:6,mapPreviews:2},
    'guerras-de-sangue':{guideCards:4,focusCharacters:5,placeCards:6,strategicCategories:7}
  };
  for(const [bookId,expected] of Object.entries(expectedHomes))for(const [key,value] of Object.entries(expected))if(homeAudit.homepages?.[bookId]?.[key]!==value)errors.push(`Etapa 7: ${bookId}/${key} deveria ser ${value}, encontrado ${homeAudit.homepages?.[bookId]?.[key]}.`);
  for(const bookId of Object.keys(expectedHomes))if(homeAudit.homepages?.[bookId]?.lastChaptersRemoved!==true)errors.push(`Etapa 7: remoção de Últimos capítulos não confirmada em ${bookId}.`);
  return {canonicalPaths:canonicalPaths.size,resolvedPaths:resolved.size};
}

function validateStage8Characters(){
  const ruinasModel=models['ruinas-dos-ceus']?.entities;
  const guerrasModel=models['guerras-de-sangue']?.entities;
  const canonicalPaths=new Set((assetManifest.assets||[]).map(item=>item.caminho||item.path).filter(Boolean));
  const ruinasAssets=[...canonicalPaths].filter(value=>value.startsWith('assets/books/ciclo-de-jesed/ruinas-dos-ceus/characters/'));
  const guerrasAssets=[...canonicalPaths].filter(value=>value.startsWith('assets/books/ciclo-de-jesed/guerras-de-sangue/characters/'));
  const ruinasImages=new Set((ruinasModel?.characters||[]).flatMap(character=>[character.image,...(character.alternateImages||[])].filter(Boolean)));
  const guerrasImages=new Set((guerrasModel?.characters||[]).flatMap(character=>[character.image,...(character.alternateImages||[])].filter(Boolean)));

  if((ruinasModel?.characters||[]).length!==charactersAudit['ruinas-dos-ceus'].characters)errors.push(`Etapa 8: quantidade de personagens de Ruínas diverge da auditoria.`);
  if((guerrasModel?.characters||[]).length!==charactersAudit['guerras-de-sangue'].characters)errors.push(`Etapa 8: quantidade de personagens de Guerras diverge da auditoria.`);
  for(const asset of ruinasAssets)if(!ruinasImages.has(asset))errors.push(`Etapa 8: imagem disponível de Ruínas não ligada (${asset}).`);
  for(const asset of guerrasAssets)if(!guerrasImages.has(asset))errors.push(`Etapa 8: imagem disponível de Guerras não ligada (${asset}).`);
  for(const image of [...ruinasImages,...guerrasImages])if(!canonicalPaths.has(image))errors.push(`Etapa 8: retrato fora do inventário oficial (${image}).`);

  let ruinasLinks=0,guerrasLinks=0,ruinasMissing=0,guerrasMissing=0;
  for(const character of ruinasModel?.characters||[]){
    for(const chapterId of character.chapterIds||[]){
      ruinasLinks++;
      const number=String(Number(String(chapterId).split('-').pop()));
      if(!rc.RUINAS_TRAJ?.[character.name]?.[number]){ruinasMissing++;errors.push(`Etapa 8: trajetória ausente em Ruínas (${character.name}/${chapterId}).`);}
    }
  }
  for(const character of guerrasModel?.characters||[]){
    for(const chapterId of character.appearanceChapters||[]){
      guerrasLinks++;
      if(!gc.GUERRAS_TRAJ?.[character.name]?.[chapterId]){guerrasMissing++;errors.push(`Etapa 8: trajetória ausente em Guerras (${character.name}/${chapterId}).`);}
    }
  }
  if(ruinasLinks!==charactersAudit['ruinas-dos-ceus'].trajectoryLinks)errors.push(`Etapa 8: ligações de trajetória de Ruínas deveriam ser ${charactersAudit['ruinas-dos-ceus'].trajectoryLinks}, encontradas ${ruinasLinks}.`);
  if(guerrasLinks!==charactersAudit['guerras-de-sangue'].trajectoryLinks)errors.push(`Etapa 8: ligações de trajetória de Guerras deveriam ser ${charactersAudit['guerras-de-sangue'].trajectoryLinks}, encontradas ${guerrasLinks}.`);
  if(ruinasMissing||guerrasMissing)errors.push(`Etapa 8: ainda existem trajetórias sem texto próprio (Ruínas ${ruinasMissing}; Guerras ${guerrasMissing}).`);

  const sharedJs='app/shared/characters/browser.js',sharedCss='app/shared/characters/browser.css';
  for(const file of [sharedJs,sharedCss,...(charactersAudit.requiredFiles||[]),...(charactersAudit.screenshots||[])])if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 8: arquivo obrigatório ausente (${file}).`);
  for(const [html,label] of [[ruinasHtml,'Ruínas'],[guerrasHtml,'Guerras']])for(const ref of [sharedJs,sharedCss])if(!html.includes(ref))errors.push(`Etapa 8: ${label} não carrega ${ref}.`);

  const ruinasList=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/list.js'),'utf8');
  const ruinasDetail=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/detail.js'),'utf8');
  const ruinasTrajectory=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/tabs/trajetoria.js'),'utf8');
  const guerrasApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  for(const [label,text] of [['Ruínas',ruinasList],['Guerras',guerrasApp]]){
    if(!text.includes('data-character-search'))errors.push(`Etapa 8: pesquisa de personagens ausente em ${label}.`);
    if(!text.includes('data-character-view'))errors.push(`Etapa 8: alternância cartões/lista ausente em ${label}.`);
  }
  if(/aparições/i.test(ruinasDetail))errors.push('Etapa 8: o campo Aparições ainda aparece na ficha de Ruínas.');
  if(/\|\|\s*ch\.(?:s|summary)/.test(ruinasTrajectory)||/\|\|\s*ch\.summary/.test(guerrasApp))errors.push('Etapa 8: a Trajetória ainda reutiliza resumo geral de capítulo como fallback.');
  if(!ruinasList.includes(charactersAudit['ruinas-dos-ceus'].subtitle))errors.push('Etapa 8: frase-guia de Personagens de Ruínas ausente.');
  if(!guerrasApp.includes(charactersAudit['guerras-de-sangue'].subtitle))errors.push('Etapa 8: frase-guia de Personagens de Guerras ausente.');
  if(!guerrasImages.has('assets/books/ciclo-de-jesed/guerras-de-sangue/characters/orionus-polar-2.webp'))errors.push('Etapa 8: retrato alternativo de Orionus não foi ligado.');
  if(charactersAudit.browserTests?.runtimeExceptions!==0||charactersAudit.browserTests?.mobileNoHorizontalOverflow!==true)errors.push('Etapa 8: auditoria de navegador não confirma execução limpa e responsiva.');
  return {ruinasLinks,guerrasLinks,ruinasImages:ruinasImages.size,guerrasImages:guerrasImages.size};
}


function validateStage9SocialAndAtmosphere(){
  const requiredTypes=new Set(['family','friendship','protection','influence','conflict','rivalry','loyalty','broken']);
  const canonicalPaths=new Set((assetManifest.assets||[]).map(item=>item.caminho||item.path).filter(Boolean));
  const ruinasSocial=rc.RUINAS_SOCIAL;
  const guerras=gc.DI_DATA;
  const ruinasCharacters=new Set((rc.RUINAS_DATA?.characters||[]).map(character=>character.name));
  const guerrasCharacters=new Set((guerras?.characters||[]).map(character=>character.id));
  let linkedImages=0;
  const validateOptionalImage=(image,label)=>{if(!image)return;if(!canonicalPaths.has(image))errors.push(`Etapa 9: imagem fora do inventário recebido (${label}: ${image}).`);else linkedImages++;};
  if(!ruinasSocial)errors.push('Etapa 9: RUINAS_SOCIAL ausente.');
  else{
    if((ruinasSocial.relationshipTypes||[]).length!==8)errors.push(`Etapa 9: legenda de relações de Ruínas deveria possuir 8 tipos, encontrados ${(ruinasSocial.relationshipTypes||[]).length}.`);
    for(const type of ruinasSocial.relationshipTypes||[])if(!requiredTypes.has(type.key)||!type.label||!type.description)errors.push(`Etapa 9: tipo de relação inválido em Ruínas (${type.key||'sem chave'}).`);
    if((ruinasSocial.relationships||[]).length!==12)errors.push(`Etapa 9: Ruínas deveria possuir 12 relações enriquecidas, encontradas ${(ruinasSocial.relationships||[]).length}.`);
    for(const relation of ruinasSocial.relationships||[]){
      if(!requiredTypes.has(relation.typeKey))errors.push(`Etapa 9: relação com tipo inválido (${relation.id}).`);
      if(!ruinasCharacters.has(relation.from)||!ruinasCharacters.has(relation.to))errors.push(`Etapa 9: relação aponta para personagem inexistente (${relation.id}).`);
      for(const field of ['type','state','description','fromView','toView'])if(!relation[field])errors.push(`Etapa 9: relação incompleta (${relation.id}/${field}).`);
      if(!Array.isArray(relation.evolution)||relation.evolution.length<2)errors.push(`Etapa 9: evolução insuficiente (${relation.id}).`);
    }
    if((ruinasSocial.families||[]).length!==1)errors.push(`Etapa 9: Ruínas deve exibir somente Os Amaréa; encontradas ${(ruinasSocial.families||[]).length} famílias.`);
    const family=ruinasSocial.families?.[0];
    if(family){
      if(family.id!=='jesed-family-amarea'||family.name!=='Os Amaréa')errors.push('Etapa 9: ficha familiar principal de Ruínas não é Os Amaréa.');
      if((family.members||[]).length!==5)errors.push('Etapa 9: Os Amaréa deveria possuir cinco membros na ficha.');
      for(const member of family.members||[])if(!ruinasCharacters.has(member))errors.push(`Etapa 9: membro familiar inexistente em Ruínas (${member}).`);
      if((family.sections||[]).length<7)errors.push('Etapa 9: ficha Os Amaréa não contém todos os blocos narrativos solicitados.');
      validateOptionalImage(family.image,family.id);
    }
    if((ruinasSocial.organisations||[]).length!==4)errors.push(`Etapa 9: Ruínas deveria possuir 4 organizações reais, encontradas ${(ruinasSocial.organisations||[]).length}.`);
    for(const org of ruinasSocial.organisations||[]){
      for(const field of ['name','type','function','description','activity'])if(!org[field])errors.push(`Etapa 9: organização de Ruínas incompleta (${org.id}/${field}).`);
      validateOptionalImage(org.image,org.id);
      for(const member of org.members||[])if(!ruinasCharacters.has(member))errors.push(`Etapa 9: membro de organização inexistente em Ruínas (${org.id}/${member}).`);
    }
  }
  if((guerras?.families||[]).length!==3)errors.push(`Etapa 9: Guerras deveria manter 3 famílias, encontradas ${(guerras?.families||[]).length}.`);
  for(const family of guerras?.families||[]){
    validateOptionalImage(family.image,family.id);
    if(!family.subtitle||!Array.isArray(family.details)||family.details.length<3)errors.push(`Etapa 9: família de Guerras incompleta (${family.id}).`);
    for(const member of family.members||[])if(!guerrasCharacters.has(member))errors.push(`Etapa 9: membro familiar inexistente em Guerras (${family.id}/${member}).`);
  }
  if((guerras?.organisations||[]).length!==3)errors.push(`Etapa 9: Guerras deveria manter 3 organizações, encontradas ${(guerras?.organisations||[]).length}.`);
  for(const org of guerras?.organisations||[]){
    for(const field of ['function','activity'])if(!org[field])errors.push(`Etapa 9: organização de Guerras incompleta (${org.id}/${field}).`);
    validateOptionalImage(org.image,org.id);
    for(const member of org.members||[])if(!guerrasCharacters.has(member))errors.push(`Etapa 9: membro de organização inexistente em Guerras (${org.id}/${member}).`);
  }
  const requiredRefs={
    'ruinas.html':['app/shared/social/network.css','data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/social.js'],
    'guerras.html':['app/shared/social/network.css','data/sagas/ciclo-de-jesed/books/guerras-de-sangue/social.js']
  };
  for(const [html,refs] of Object.entries(requiredRefs)){const text=fs.readFileSync(path.join(root,html),'utf8');for(const ref of refs)if(!text.includes(ref))errors.push(`Etapa 9: ${html} não carrega ${ref}.`);}
  const activeSources=['app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js','app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js'];
  for(const file of activeSources){const text=fs.readFileSync(path.join(root,file),'utf8');if(text.includes('assets/atmosphere/'))errors.push(`Etapa 9: ${file} ainda depende de assets atmosféricos ausentes do inventário.`);}
  const ruinasExperience=fs.readFileSync(path.join(root,activeSources[0]),'utf8');
  const guerrasExperience=fs.readFileSync(path.join(root,activeSources[1]),'utf8');
  if(!ruinasExperience.includes('cloud-body'))errors.push('Etapa 9: nuvens procedurais de Ruínas não estão ativas.');
  if(!guerrasExperience.includes('particleSources={ember:[],spark:[],ash:[]}'))errors.push('Etapa 9: partículas procedurais de Guerras não estão ativas.');
  return {relationships:ruinasSocial?.relationships?.length||0,families:(ruinasSocial?.families?.length||0)+(guerras?.families?.length||0),organisations:(ruinasSocial?.organisations?.length||0)+(guerras?.organisations?.length||0),images:linkedImages};
}

function validateStage11LoreClockAndSynopses(){
  if(loreAudit.stage!=='Etapa 11'||loreAudit.version!=='0.11.0')errors.push('Etapa 11: relatório de auditoria ausente ou com versão incorreta.');
  const expected={
    'ruinas-dos-ceus':{fauna:6,flora:6,foods:6},
    'guerras-de-sangue':{fauna:75,flora:110,foods:106}
  };
  let totalItems=0,totalCitations=0,uncited=0;
  for(const [bookId,kinds] of Object.entries(expected)){
    const model=models[bookId];
    const chapterNumbers=new Set((model?.entities?.chapters||[]).map(ch=>ch.number));
    for(const [kind,count] of Object.entries(kinds)){
      const items=model?.entities?.[kind]||[];
      if(items.length!==count)errors.push(`Etapa 11: ${bookId}/${kind} deveria possuir ${count} itens, encontrados ${items.length}.`);
      for(const item of items){
        totalItems++;
        const source=item.sourceRef||item;
        for(const field of ['name','slug','summary','fullDescription','characteristics','habitat'])if(!source[field]||!String(source[field]).trim())errors.push(`Etapa 11: campo ${field} ausente em ${bookId}/${kind}/${item.id||item.slug}.`);
        if(!Array.isArray(source.uses)||!source.uses.length)errors.push(`Etapa 11: usos ausentes em ${bookId}/${kind}/${item.id||item.slug}.`);
        if(source.image&&!new Set((assetManifest.assets||[]).map(asset=>(asset.path||asset.caminho))).has(source.image))errors.push(`Etapa 11: imagem fora do inventário recebido em ${bookId}/${kind}/${item.id||item.slug} (${source.image}).`);
        if(!Number.isInteger(source.citations)||source.citations<0)errors.push(`Etapa 11: total de citações inválido em ${bookId}/${kind}/${item.id||item.slug}.`);
        if(!Array.isArray(source.citationDetails)||source.citationDetails.length!==source.citations)errors.push(`Etapa 11: lista de citações divergente em ${bookId}/${kind}/${item.id||item.slug}.`);
        const sum=(source.chapterMentions||[]).reduce((acc,row)=>acc+(Number(row.count)||0),0);
        if(sum!==source.citations)errors.push(`Etapa 11: soma por capítulo divergente em ${bookId}/${kind}/${item.id||item.slug}.`);
        for(const mention of source.citationDetails||[]){
          if(!chapterNumbers.has(Number(mention.chapter)))errors.push(`Etapa 11: capítulo inválido em citação de ${bookId}/${kind}/${item.slug}.`);
          if(!mention.quote||!mention.context)errors.push(`Etapa 11: trecho ou contexto ausente em ${bookId}/${kind}/${item.slug}.`);
        }
        totalCitations+=source.citations||0;if(!(source.citations||0))uncited++;
      }
    }
  }
  const raukhar=models['ruinas-dos-ceus']?.entities?.fauna?.find(item=>item.id==='jesed-fauna-raukhar');
  if(!raukhar||raukhar.name!=='Raukhar'||raukhar.slug!=='raukhar')errors.push('Etapa 11: identidade histórica/canônica do Raukhar não foi preservada.');
  const ruLore=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/lore.js'),'utf8');
  if(ruLore.includes('data-unused'))errors.push('Etapa 11: filtro de itens não citados voltou à interface de Ruínas.');
  if(ruLore.includes('data-go="conceitos/'))errors.push('Etapa 11: conceitos de Ruínas foram antecipadamente transformados em fichas individuais.');
  const gsApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  if(!gsApp.includes('actualKind === "concepts" ? ""'))errors.push('Etapa 11: filtros visíveis de conceitos não foram removidos em Guerras.');
  const clock=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'),'utf8');
  if(!clock.includes('const CYCLE_DURATION_MS=10*60*1000'))errors.push('Etapa 11: ciclo celeste não está configurado para aproximadamente 10 minutos.');
  if(clock.includes('getHours()*60'))errors.push('Etapa 11: relógio ainda depende da hora real.');
  if(!clock.includes('anchorCycle(manualMinutes)'))errors.push('Etapa 11: modo automático não retoma do horário selecionado no simulador.');
  const bookSets=[...(gc.DI_DATA?.books||[]),...(rc.RS?.BOOKS||[])].filter(b=>['ruinas-dos-ceus','guerras-de-sangue'].includes(b.id));
  for(const book of bookSets){
    if(!book.teaser||book.teaser.length<80)errors.push(`Etapa 11: teaser editorial insuficiente em ${book.id}.`);
    if(!book.synopsis||book.synopsis.length<700||book.synopsis.split(/\n\s*\n/).length<3)errors.push(`Etapa 11: sinopse completa insuficiente em ${book.id}.`);
    if(/Céu pálido, espirais de vento|Pergaminho escurecido, vermelho seco/.test(book.synopsis||''))errors.push(`Etapa 11: descrição atmosférica antiga ainda usada como sinopse em ${book.id}.`);
  }
  for(const html of ['ruinas.html','guerras.html']){const text=fs.readFileSync(path.join(root,html),'utf8');if(!text.includes('lore-stage11.js'))errors.push(`Etapa 11: ${html} não carrega o enriquecimento de lore.`);}
  if(loreAudit.books?.['ruinas-dos-ceus']?.items!==18||loreAudit.books?.['guerras-de-sangue']?.items!==291)errors.push('Etapa 11: métricas principais do relatório de lore estão incorretas.');
  return {items:totalItems,citations:totalCitations,uncited};
}

function validateStage10Clans(){
  const D=gc.DI_DATA;
  const clans=D?.clans||[];
  const expected=['polar','tondrar','buldar','fendelar','glydar','vendrar','cendar','urtistar'];
  const requiredText=['populationLabel','populationDetail','militaryLabel','militaryDetail','origin','territory','culture','economy','wayOfLife','socialStructure','food','warRole','finalSituation'];
  if(clansAudit.stage!=='Etapa 10'||clansAudit.version!=='0.10.0')errors.push('Etapa 10: relatório de auditoria ausente ou com versão incorreta.');
  if(clans.length!==8)errors.push(`Etapa 10: esperados 8 clãs, encontrados ${clans.length}.`);
  for(const slug of expected)if(!clans.some(clan=>clan.slug===slug))errors.push(`Etapa 10: clã obrigatório ausente (${slug}).`);
  const clanNames=new Set(clans.map(clan=>clan.name));
  let members=0,loreCards=0,archiveSections=0;
  for(const clan of clans){
    const profile=clan.profile||{};
    for(const field of requiredText)if(!profile[field]||String(profile[field]).trim().length<12)errors.push(`Etapa 10: campo ${field} incompleto em ${clan.slug}.`);
    for(const field of ['strengths','weaknesses'])if(!Array.isArray(profile[field])||profile[field].length<3)errors.push(`Etapa 10: ${field} insuficiente em ${clan.slug}.`);
    if(!clan.placeId||!D.places?.some(place=>place.id===clan.placeId))errors.push(`Etapa 10: território principal inválido em ${clan.slug}.`);
    if(!Array.isArray(clan.sections)||clan.sections.length<10)errors.push(`Etapa 10: arquivo aprofundado insuficiente em ${clan.slug}.`);
    archiveSections+=clan.sections?.length||0;
    const clanMembers=(D.characters||[]).filter(character=>character.clanId===clan.id);
    members+=clanMembers.length;
    for(const member of clanMembers)if(!member.slug)errors.push(`Etapa 10: personagem sem rota no clã ${clan.slug}.`);
    for(const kind of ['foods','fauna','flora']){
      const items=(D.lore?.[kind]||[]).filter(item=>(item.clans||[]).includes(clan.name));
      if(!items.length)errors.push(`Etapa 10: ${kind} sem itens ligados ao clã ${clan.slug}.`);
      loreCards+=Math.min(8,items.length);
      for(const item of items)if(!item.slug)errors.push(`Etapa 10: item de ${kind} sem rota em ${clan.slug}.`);
    }
    const relationTargets=clans.filter(other=>other.id!==clan.id);
    if(relationTargets.length!==7)errors.push(`Etapa 10: relações políticas incompletas em ${clan.slug}.`);
    for(const target of relationTargets)if(!clanNames.has(target.name))errors.push(`Etapa 10: alvo político inválido em ${clan.slug}.`);
  }
  const fendelar=clans.find(clan=>clan.slug==='fendelar');
  if(!fendelar||fendelar.emblem)errors.push('Etapa 10: Fendelar recebeu brasão formal indevidamente.');
  if(fendelar?.contextMark!=='')errors.push('Etapa 10: marca contextual neutra dos Fendelar não foi preservada.');
  const requiredFiles=['data/sagas/ciclo-de-jesed/books/guerras-de-sangue/clans.js','app/shared/clans/presentation.css','','',''];
  for(const file of requiredFiles)if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 10: arquivo obrigatório ausente (${file}).`);
  const html=fs.readFileSync(path.join(root,'guerras.html'),'utf8');
  for(const ref of ['app/shared/clans/presentation.css','data/sagas/ciclo-de-jesed/books/guerras-de-sangue/clans.js'])if(!html.includes(ref))errors.push(`Etapa 10: guerras.html não carrega ${ref}.`);
  const app=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  if(app.includes('Lore relacionada'))errors.push('Etapa 10: bloco genérico “Lore relacionada” voltou à interface.');
  for(const label of ['Alimentos','Fauna','Flora','Arquivo aprofundado do clã','Personagens do clã'])if(!app.includes(label))errors.push(`Etapa 10: seção obrigatória ausente na interface (${label}).`);
  if(!app.includes('D.clans.filter(other => other.id !== clan.id)'))errors.push('Etapa 10: a interface não apresenta os sete outros clãs em cada ficha.');
  if(clansAudit.browserTests?.runtimeExceptions!==0||clansAudit.browserTests?.mobileNoHorizontalOverflow!==true||clansAudit.browserTests?.desktopNoHorizontalOverflow!==true)errors.push('Etapa 10: auditoria de navegador não confirma execução limpa e responsiva.');
  if(clansAudit.clans!==8||clansAudit.profileFields!==15||clansAudit.genericLoreBlockRemoved!==true||clansAudit.archivesPreserved!==true)errors.push('Etapa 10: métricas principais do relatório de clãs estão incorretas.');
  for(const file of clansAudit.screenshots||[])if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 10: captura obrigatória ausente (${file}).`);
  return {clans:clans.length,members,loreCards,archiveSections};
}


function validateStages12And13(){
  const requiredConceptFields=['definition','origin','knownFunctioning','interpretations','relatedCharacters','chapterNumbers','ambiguities','evolution'];
  const requiredMysteryFields=['origin','firstClues','investigationPaths','discoveries','contradictions','finalRevelation','consequences','chapterNumbers','characterIds','placeIds'];
  let concepts=0,mysteries=0;
  for(const [bookId,model] of Object.entries(models)){
    const conceptItems=model?.entities?.concepts||[],mysteryItems=model?.entities?.mysteries||[];
    concepts+=conceptItems.length;mysteries+=mysteryItems.length;
    if(conceptItems.length<6)errors.push(`Etapa 12: conceitos insuficientes em ${bookId}.`);
    for(const item of conceptItems){
      for(const field of requiredConceptFields){
        const value=item[field];
        if(value==null||(Array.isArray(value)&&!value.length)||(!Array.isArray(value)&&String(value).trim().length<3))errors.push(`Etapa 12: campo ${field} incompleto em ${bookId}/${item.slug}.`);
      }
      if(!item.route)errors.push(`Etapa 12: conceito sem rota em ${bookId}/${item.slug}.`);
    }
    if(mysteryItems.length<5)errors.push(`Etapa 13: mistérios insuficientes em ${bookId}.`);
    for(const item of mysteryItems){
      for(const field of requiredMysteryFields){
        const value=item[field];
        if(value==null||(Array.isArray(value)&&!value.length)||(!Array.isArray(value)&&String(value).trim().length<3))errors.push(`Etapa 13: campo ${field} incompleto em ${bookId}/${item.slug}.`);
      }
      if(!item.question||!item.status)errors.push(`Etapa 13: pergunta ou estado ausente em ${bookId}/${item.slug}.`);
      if(item.falseLeads!=null&&!Array.isArray(item.falseLeads))errors.push(`Etapa 13: pistas falsas devem ser lista em ${bookId}/${item.slug}.`);
    }
  }
  const ruLore=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/lore.js'),'utf8');
  const ruMyst=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/mysteries.js'),'utf8');
  const gsApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  if(!ruLore.includes('data-go="${E(target)}"')||!ruLore.includes('R.pages.conceito'))errors.push('Etapa 12: conceitos de Ruínas não estão clicáveis ou não possuem página individual.');
  for(const source of [ruMyst,gsApp])if(source.includes('Resposta no ponto escrito'))errors.push('Etapa 13: rótulo antigo “Resposta no ponto escrito” ainda existe.');
  for(const source of [ruMyst,gsApp])for(const label of ['Primeiras pistas','Caminhos de investigação','Contradições','Consequências'])if(!source.includes(label))errors.push(`Etapa 13: seção ${label} ausente numa das interfaces.`);
  const portalJs=fs.readFileSync(path.join(root,'app/portal/app.js'),'utf8');
  const portalCss=fs.readFileSync(path.join(root,'app/portal/styles.css'),'utf8');
  const portalHtml=fs.readFileSync(path.join(root,'index.html'),'utf8');
  if(!portalJs.includes('buildPortals()')||!portalCss.includes('.dimension-portal'))errors.push('Etapa 13.1: portais animados da tela Dimensões Infinitas ausentes.');
  if(!portalJs.includes('setupPortalMusic()')||!portalHtml.includes('id="portalMusic"'))errors.push('Etapa 13.1: música da tela Dimensões Infinitas ausente.');
  const clock=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'),'utf8');
  if(!clock.includes('step="10"')||!clock.includes('Math.round(Number(e.target.value)/10)*10'))errors.push('Etapa 13.1: relógio temporário não avança em passos de 10 minutos.');
  const nightCss=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css'),'utf8');
  if(!nightCss.includes('body[data-sky-phase="night"]')||!nightCss.includes('--ink:#e8f2f3'))errors.push('Etapa 13.1: contraste noturno adaptativo ausente.');
  const guerrasHtml=fs.readFileSync(path.join(root,'guerras.html'),'utf8');
  const duplicateLinks=(guerrasHtml.match(/guerras-de-sangue\/(?:experience\/)?styles\.css/g)||[]).length;
  if(duplicateLinks!==1)errors.push(`Correção de Guerras: esperado 1 CSS específico, encontrados ${duplicateLinks}.`);
  return {concepts,mysteries};
}


function validateStages14And15(){
  if(themesGalleryAudit.stage!=='Etapas 14 e 15'||themesGalleryAudit.version!=='0.15.1')errors.push('Etapas 14–15: relatório de auditoria ausente ou com versão incorreta.');
  const requiredThemeFields=['name','slug','description','question','development','characterIds','placeIds','chapterIds','eventIds','symbols','evolution','interpretationNote','route'];
  const canonicalPaths=new Set((assetManifest.assets||[]).map(item=>item.caminho||item.path).filter(Boolean));
  let themes=0,galleryItems=0,inventoryGalleryItems=0;
  for(const [bookId,model] of Object.entries(models)){
    const themeItems=model?.entities?.themes||[],gallery=model?.entities?.gallery||[];
    themes+=themeItems.length;galleryItems+=gallery.length;
    const indexes={characters:new Set((model?.entities?.characters||[]).map(x=>x.id)),places:new Set((model?.entities?.places||[]).map(x=>x.id)),chapters:new Set((model?.entities?.chapters||[]).map(x=>x.id)),timeline:new Set((model?.entities?.timeline||[]).map(x=>x.id))};
    if(themeItems.length!==10)errors.push(`Etapa 14: ${bookId} deveria possuir 10 temas, encontrados ${themeItems.length}.`);
    const protectedThemes=new Set(manifest.books?.[bookId]?.protectedIds?.themes||[]),protectedGallery=new Set(manifest.books?.[bookId]?.protectedIds?.gallery||[]);
    for(const item of themeItems)if(!protectedThemes.has(item.id))errors.push(`Etapa 14: ID de tema não registrado no manifesto (${bookId}/${item.id}).`);
    for(const id of protectedThemes)if(!themeItems.some(item=>item.id===id))errors.push(`Etapa 14: ID protegido de tema desapareceu (${bookId}/${id}).`);
    for(const item of gallery)if(!protectedGallery.has(item.id))errors.push(`Etapa 15: ID de galeria não registrado no manifesto (${bookId}/${item.id}).`);
    for(const id of protectedGallery)if(!gallery.some(item=>item.id===id))errors.push(`Etapa 15: ID protegido de galeria desapareceu (${bookId}/${id}).`);
    for(const item of themeItems){
      for(const field of requiredThemeFields){const value=item[field];if(value==null||(Array.isArray(value)&&!value.length)||(!Array.isArray(value)&&String(value).trim().length<3))errors.push(`Etapa 14: campo ${field} incompleto em ${bookId}/${item.slug}.`);}
      const expectedRoute=bookId==='ruinas-dos-ceus'?`tema/${item.slug}`:`theme/${item.slug}`;if(item.route!==expectedRoute)errors.push(`Etapa 14: rota incorreta em ${bookId}/${item.slug} (${item.route}).`);
      for(const [field,collection] of [['characterIds','characters'],['placeIds','places'],['chapterIds','chapters'],['eventIds','timeline']])for(const id of item[field]||[])if(!indexes[collection].has(id))errors.push(`Etapa 14: referência inválida ${id} em ${bookId}/${item.slug}/${field}.`);
      for(const symbol of item.symbols||[])if(!symbol.name||!symbol.meaning)errors.push(`Etapa 14: símbolo incompleto em ${bookId}/${item.slug}.`);
      for(const step of item.evolution||[]){if(!step.phase||!step.title||!step.text)errors.push(`Etapa 14: evolução incompleta em ${bookId}/${item.slug}.`);for(const id of step.chapterIds||[])if(!indexes.chapters.has(id))errors.push(`Etapa 14: capítulo inválido na evolução de ${bookId}/${item.slug} (${id}).`);}
    }
    if(gallery.length<30)errors.push(`Etapa 15: galeria insuficiente em ${bookId} (${gallery.length} itens).`);
    const categories=new Set(gallery.map(item=>item.category));
    for(const category of ['cover','map','chapter','character','place','fauna'])if(!categories.has(category))errors.push(`Etapa 15: categoria ${category} ausente em ${bookId}.`);
    for(const forbidden of ['event','clan','organisation','family'])if(categories.has(forbidden))errors.push(`Etapa 15: categoria ${forbidden} não possui arte no inventário e não deveria aparecer em ${bookId}.`);
    const seenImages=new Set();
    for(const item of gallery){
      if(!item.image||!item.name||!item.type||!item.category||!item.caption)errors.push(`Etapa 15: item de galeria incompleto em ${bookId}/${item.id}.`);
      if(!canonicalPaths.has(item.image))errors.push(`Etapa 15: caminho fora do inventário em ${bookId}/${item.id} (${item.image}).`);else inventoryGalleryItems++;
      if(seenImages.has(item.image))errors.push(`Etapa 15: imagem duplicada na galeria de ${bookId} (${item.image}).`);else seenImages.add(item.image);
    }
    const auditBook=themesGalleryAudit.books?.[bookId];
    if(auditBook?.themes!==themeItems.length||auditBook?.galleryItems!==gallery.length||auditBook?.inventoryAvailableItems!==gallery.length)errors.push(`Etapas 14–15: métricas do relatório divergentes em ${bookId}.`);
    const auditCategories=new Set(auditBook?.categories||[]);for(const category of categories)if(!auditCategories.has(category))errors.push(`Etapas 14–15: categoria ${category} ausente na auditoria de ${bookId}.`);
  }
  const requiredFiles=['app/shared/themes/presentation.css','app/shared/gallery/gallery.css','app/shared/gallery/gallery.js','app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/themes.js','app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/gallery.js'];
  for(const file of requiredFiles)if(!fs.existsSync(path.join(root,file)))errors.push(`Etapas 14–15: arquivo obrigatório ausente (${file}).`);
  const ruinasThemePage=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/themes.js'),'utf8');
  const guerrasApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  for(const source of [ruinasThemePage,guerrasApp])for(const label of ['Desenvolvimento','Símbolos','Evolução ao longo do livro','Personagens','Lugares','Capítulos','Acontecimentos'])if(!source.includes(label))errors.push(`Etapa 14: seção ${label} ausente numa das interfaces.`);
  if(!ruinasThemePage.includes('Limite de interpretação')||!guerrasApp.includes('Limite de interpretação'))errors.push('Etapa 14: limite de interpretação não aparece nas duas interfaces.');
  const ruinasEvents=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js'),'utf8');
  if(!ruinasEvents.includes("type:'Temas'")||!ruinasEvents.includes('[role="link"][data-go]'))errors.push('Etapa 14: pesquisa ou acesso por teclado de Temas ausente em Ruínas.');
  if(!guerrasApp.includes('type:"Temas"')||!guerrasApp.includes("[role='link'][data-route]"))errors.push('Etapa 14: pesquisa ou acesso por teclado de Temas ausente em Guerras.');
  const galleryJs=fs.readFileSync(path.join(root,'app/shared/gallery/gallery.js'),'utf8');
  for(const marker of ["e.key==='Escape'","e.key==='ArrowLeft'","e.key==='ArrowRight'",'data-gallery-count','currentFilter','dataset.galleryBroken','data-gallery-search','touchstart','preload(active)','data-gallery-open-record',"e.key==='Tab'"])if(!galleryJs.includes(marker))errors.push(`Etapa 15: recurso obrigatório do visualizador ausente (${marker}).`);
  for(const html of ['ruinas.html','guerras.html']){const text=fs.readFileSync(path.join(root,html),'utf8');for(const ref of ['app/shared/themes/presentation.css','app/shared/gallery/gallery.css','app/shared/gallery/gallery.js'])if(!text.includes(ref))errors.push(`Etapas 14–15: ${html} não carrega ${ref}.`);}
  const galleryAudit=themesGalleryAudit.gallery||{};
  for(const key of ['activeFilterNavigation','brokenImagesExcludedAtRuntime','searchField','touchSwipe','focusTrap','openRelatedRecord','strictInventory','exactAssetPaths'])if(galleryAudit[key]!==true)errors.push(`Etapa 15: auditoria não confirma ${key}.`);
  if(themesGalleryAudit.themes?.interpretiveAmbiguityPreserved!==true)errors.push('Etapa 14: auditoria não confirma ambiguidade interpretativa.');
  if(themesGalleryAudit.browserTests?.applicationExceptions!==0||themesGalleryAudit.browserTests?.desktopNoHorizontalOverflow!==true||themesGalleryAudit.browserTests?.mobileNoHorizontalOverflow!==true)errors.push('Etapas 14–15: auditoria de navegador não confirma execução limpa e responsiva.');
  return {themes,galleryItems,inventoryGalleryItems};
}


function validateStage16(){
  if(stage16Audit.stage!=='Etapa 16'||!String(stage16Audit.version||'').startsWith('0.16.'))errors.push('Etapa 16: relatório principal ausente ou com versão incorreta.');
  if(!String(stage16BrowserAudit.version||'').startsWith('0.16.'))errors.push('Etapa 16: relatório de navegador ausente ou com versão incorreta.');
  const required=['app/shared/visual-system/standard.css','app/shared/visual-system/standard.js','data/sagas/ciclo-de-jesed/audits/visual-responsive-etapa-16.json','data/sagas/ciclo-de-jesed/audits/visual-responsive-etapa-16-browser.json'];
  for(const file of required)if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 16: arquivo obrigatório ausente (${file}).`);
  for(const html of ['ruinas.html','guerras.html']){
    const source=fs.readFileSync(path.join(root,html),'utf8');
    for(const ref of ['app/shared/visual-system/standard.css','app/shared/visual-system/standard.js'])if(!source.includes(ref))errors.push(`Etapa 16: ${html} não carrega ${ref}.`);
  }
  const css=fs.readFileSync(path.join(root,'app/shared/visual-system/standard.css'),'utf8');
  for(const marker of ['body[data-book="ruinas-dos-ceus"]','body[data-book="guerras-de-sangue"]','.performance-toggle-wrap','.di-logo-fallback','.transition-veil{','overflow-x:clip','@media(max-width:680px)'])if(!css.includes(marker))errors.push(`Etapa 16: marcador visual ausente (${marker}).`);
  const js=fs.readFileSync(path.join(root,'app/shared/visual-system/standard.js'),'utf8');
  for(const marker of ['ensurePerformanceIndicator','fallbackFor(img)','makeClickableCardsKeyboardSafe',"button.getAttribute(\'aria-pressed\') !== pressed",'MutationObserver'])if(!js.includes(marker))errors.push(`Etapa 16: recurso compartilhado ausente (${marker}).`);
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  if(pkg.version!=='0.17.0')errors.push(`Versão de limpeza técnica deveria ser 0.17.0, encontrado ${pkg.version}.`);
  const responsive=stage16Audit.responsive||{};
  if(responsive.routesTested!==78||responsive.horizontalOverflowRoutes!==0||responsive.applicationExceptions!==0)errors.push('Etapa 16: relatório principal não confirma 78 testes sem overflow e sem exceções.');
  if(!responsive.desktopNoHorizontalOverflow||!responsive.tabletNoHorizontalOverflow||!responsive.mobileNoHorizontalOverflow)errors.push('Etapa 16: algum breakpoint ainda apresenta rolagem horizontal.');
  if(stage16BrowserAudit.routesTested!==78||stage16BrowserAudit.horizontalOverflowRoutes!==0||stage16BrowserAudit.applicationExceptions!==0)errors.push('Etapa 16: auditoria de navegador divergente.');
  if(stage16Audit.nightContrast?.tested!==true||stage16Audit.nightContrast?.lightTextApplied!==true)errors.push('Etapa 16: contraste noturno não foi confirmado.');
  if(stage16Audit.performanceToggle?.observerLoopPrevented!==true)errors.push('Etapa 16: prevenção do ciclo do observador de desempenho não confirmada.');
  for(const bookId of ['ruinas-dos-ceus','guerras-de-sangue']){
    const state=stage16Audit.performanceToggle?.[bookId];
    if(state?.pressed!=='true'||state?.state!=='performance'||state?.dot!==true)errors.push(`Etapa 16: estado do botão de desempenho não confirmado em ${bookId}.`);
  }
  if(stage16Audit.idsChanged!==0||stage16Audit.canonicalChanges!==0||stage16Audit.githubChanged!==false)errors.push('Etapa 16: relatório indica alteração indevida de IDs, cânone ou GitHub.');
  return {routes:responsive.routesTested,breakpoints:(responsive.breakpointsTested||[]).length,missingBinaryResponses:stage16BrowserAudit.missingBinaryResponses||0};
}

const stage7Stats=validateStage7AssetsAndHomes();
const stage8Stats=validateStage8Characters();
const stage9Stats=validateStage9SocialAndAtmosphere();
const stage10Stats=validateStage10Clans();
const stage11Stats=validateStage11LoreClockAndSynopses();
const stage13Stats=validateStages12And13();
const stage15Stats=validateStages14And15();
const stage16Stats=validateStage16();
if(!manifest)errors.push('Manifesto de IDs ausente.');
warnings.push('Os caminhos foram sincronizados ao inventario-pasta-assets.csv. Este pacote inclui apenas os binários disponíveis nesta conversa; ao usar a pasta assets completa do autor, os mesmos caminhos serão resolvidos sem renomeação.');
const summary=[`Validação Etapa 16 — ${new Date().toISOString()}`,`Guerras de Sangue: ${models['guerras-de-sangue']?.entities.chapters.length||0} capítulos, ${models['guerras-de-sangue']?.entities.places.length||0} lugares, ${placesAudit.books['guerras-de-sangue'].chapterScenes} cenas localizadas e ${gsTimeline.length} acontecimentos cronológicos.`,`Ruínas dos Céus: ${models['ruinas-dos-ceus']?.entities.chapters.length||0} capítulos, ${models['ruinas-dos-ceus']?.entities.places.length||0} lugares, ${placesAudit.books['ruinas-dos-ceus'].chapterScenes} cenas localizadas e ${rdTimeline.length} acontecimentos cronológicos.`,`Assets: ${stage7Stats.canonicalPaths} caminhos únicos no inventário; ${stage7Stats.resolvedPaths} caminhos resolvidos nos modelos carregados.`,`Páginas iniciais: 4 acessos orientadores, 5 personagens em foco e 6 lugares destacados em cada livro.`,`Personagens: ${models['ruinas-dos-ceus']?.entities.characters.length||0} em Ruínas e ${models['guerras-de-sangue']?.entities.characters.length||0} em Guerras; ${stage8Stats.ruinasLinks+stage8Stats.guerrasLinks} ligações de trajetória validadas; todas as imagens disponíveis ligadas.`,`Etapa 9: ${stage9Stats.relationships} relações enriquecidas em Ruínas, ${stage9Stats.families} famílias, ${stage9Stats.organisations} organizações e ${stage9Stats.images} imagens atmosféricas/sociais substituíveis.`,`Etapa 10: ${stage10Stats.clans} clãs, ${stage10Stats.members} personagens associados, ${stage10Stats.loreCards} cartões territoriais priorizados e ${stage10Stats.archiveSections} seções aprofundadas preservadas.`,`Etapa 11: ${stage11Stats.items} itens revisados, ${stage11Stats.citations} citações localizadas e ${stage11Stats.uncited} itens ainda não citados.`,`Etapas 12–13: ${stage13Stats.concepts} conceitos aprofundados e ${stage13Stats.mysteries} mistérios completos, com portal, relógio e contraste noturno validados.`,`Etapas 14–15: ${stage15Stats.themes} temas aprofundados, ${stage15Stats.galleryItems} registros de galeria e ${stage15Stats.inventoryGalleryItems} cartões ligados a imagens existentes no inventário recebido.`,`Etapa 16: ${stage16Stats.routes} combinações de rota e viewport em ${stage16Stats.breakpoints} tamanhos, sem overflow horizontal nem exceções da aplicação.`];
if(warnings.length){summary.push('','AVISOS:',...warnings.map(x=>`- ${x}`));}
if(errors.length){summary.push('','ERROS:',...errors.map(x=>`- ${x}`));console.error(summary.join('\n'));process.exit(1);}
summary.push('','OK: Etapas 1–16 preservadas; organização canónica de assets e correções de Guerras de Sangue validadas no pacote 0.17.0.');console.log(summary.join('\n'));
