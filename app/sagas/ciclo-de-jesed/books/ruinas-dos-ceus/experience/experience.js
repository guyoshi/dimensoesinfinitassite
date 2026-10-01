(()=>{
  const X=window.DIExperience;if(!X)return;
  const P='di-ruinas-';
  const defaults={
    'distant-clouds':true,'mid-clouds':true,'near-mist':true,'cloud-front':true,'fragments':true,'menu-motion':true,'sky-cycle':true,'distant-elements':true,'parallax':true,'wind-particles':true,
    'cloud-density':86,'motion-intensity':45,'effect-opacity':92
  };
  const getBool=key=>X.bool(P+key,defaults[key]);
  const getNum=(key,min=0,max=100)=>X.num(P+key,defaults[key],min,max);
  function setDefault(key,value){if(X.storage.get(P+key)===null)X.storage.set(P+key,typeof value==='boolean'?(value?'1':'0'):value)}
  Object.entries(defaults).forEach(([k,v])=>setDefault(k,v));
  // Mobile/weakDevice preserva todas as camadas; buildClouds reduz a densidade em tempo de renderização.

  const atmosphere=document.createElement('div');
  atmosphere.id='ruinasAtmosphere';atmosphere.className='ruinas-atmosphere';atmosphere.setAttribute('aria-hidden','true');
  atmosphere.innerHTML='<div class="ruinas-stars"></div><div class="ruinas-celestial ruinas-sun"></div><div class="ruinas-celestial ruinas-moon"></div><div class="ruinas-distant-elements"></div>';
  document.body.prepend(atmosphere);
  const cloudHost=document.getElementById('clouds');
  const cloudHostFront=document.getElementById('cloudsFront');
  let rebuilding=false;
  function seeded(index,offset=0){const x=Math.sin((index+1)*9301+offset*49297)*233280;return x-Math.floor(x)}
  function cloudHtml(layer,count,baseWidth,seedOffset){
    let html=`<div class="cloud-layer cloud-layer-${layer}">`;
    for(let i=0;i<count;i++){
      const r=seeded(i,seedOffset),r2=seeded(i,seedOffset+2),r3=seeded(i,seedOffset+5);
      const w=baseWidth*(.78+r*.72),top=(layer==='near'?8:layer==='middle'?10:24)+r2*(layer==='distant'?40:52);
      const duration=(layer==='distant'?135:layer==='middle'?84:50)*(.78+r3*.62),opacity=(layer==='distant'?.4:layer==='middle'?.66:.34)*(.82+r2*.36);
      html+=`<div class="natural-cloud natural-cloud-${layer}" style="--top:${top}%;--w:${w}px;--duration:${duration}s;--delay:${-r*duration}s;--opacity:${opacity};--scale:${.82+r2*.42};--rise:${-10+r3*22}px"><span class="cloud-body"></span></div>`;
    }
    return html+'</div>';
  }
  function buildClouds(){
    if(!cloudHost||rebuilding)return;rebuilding=true;
    const performance=document.body.classList.contains('performance-mode');
    const density=getNum('cloud-density');
    let factor=density/60;if(X.weakDevice)factor*=.72;if(X.reduced)factor*=.45;
    let html='',frontHtml='';
    const allowed=!performance&&document.body.classList.contains('no-particles')===false;
    if(allowed){
      if(getBool('distant-clouds'))html+=cloudHtml('distant',Math.max(2,Math.round(6*factor)),560,1);
      if(getBool('mid-clouds'))html+=cloudHtml('middle',Math.max(2,Math.round(8*factor)),370,11);
      if(getBool('near-mist')&&!X.reduced)html+=cloudHtml('near',Math.max(1,Math.round(3*factor)),680,21);
      if(getBool('cloud-front')&&cloudHostFront&&!X.reduced){
        frontHtml+=cloudHtml('near',Math.max(1,Math.round(2*factor)),760,31);
        frontHtml+=cloudHtml('middle',Math.max(1,Math.round(2*factor)),420,41);
      }
    }
    cloudHost.innerHTML=html;
    if(cloudHostFront)cloudHostFront.innerHTML=frontHtml;
    requestAnimationFrame(()=>{rebuilding=false});
  }
  if(cloudHost){new MutationObserver(()=>{if(!rebuilding&&!cloudHost.querySelector('.cloud-layer'))buildClouds()}).observe(cloudHost,{childList:true});}

  const phases={
    dawn:{top:'#426d88',mid:'#aabfc6',bottom:'#e5b889',light:'#fff2d2',shadow:'#708c9b',stars:.12},
    day:{top:'#69a7c2',mid:'#b9d8df',bottom:'#e7dcc0',light:'#ffffff',shadow:'#7c9da8',stars:0},
    dusk:{top:'#3d6681',mid:'#aa8990',bottom:'#e29b67',light:'#ffd8b2',shadow:'#6a7186',stars:.12},
    night:{top:'#081625',mid:'#193247',bottom:'#4b5061',light:'#7792a8',shadow:'#182b3d',stars:.72}
  };
  const SKY_KEYFRAMES=[[300,'dawn'],[480,'day'],[990,'dusk'],[1200,'night']];
  const hexToRgb=h=>{h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]};
  const rgbToHex=([r,g,b])=>'#'+[r,g,b].map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('');
  const lerpColor=(a,b,t)=>{const ca=hexToRgb(a),cb=hexToRgb(b);return rgbToHex(ca.map((v,i)=>v+(cb[i]-v)*t))};
  function skyBlend(minutes){
    const n=SKY_KEYFRAMES.length;let curIdx=n-1;
    for(let i=0;i<n;i++){if(minutes>=SKY_KEYFRAMES[i][0])curIdx=i}
    const nextIdx=(curIdx+1)%n;
    const curAt=SKY_KEYFRAMES[curIdx][0],nextAt=SKY_KEYFRAMES[nextIdx][0];
    const span=nextAt>curAt?nextAt-curAt:nextAt+1440-curAt;
    const pos=minutes>=curAt?minutes-curAt:minutes+1440-curAt;
    const t=Math.max(0,Math.min(1,pos/span));
    const curP=phases[SKY_KEYFRAMES[curIdx][1]],nextP=phases[SKY_KEYFRAMES[nextIdx][1]];
    return{top:lerpColor(curP.top,nextP.top,t),mid:lerpColor(curP.mid,nextP.mid,t),bottom:lerpColor(curP.bottom,nextP.bottom,t),light:lerpColor(curP.light,nextP.light,t),shadow:lerpColor(curP.shadow,nextP.shadow,t),stars:curP.stars+(nextP.stars-curP.stars)*t};
  }
  const session={get(key,fallback=null){try{const v=sessionStorage.getItem(key);return v===null?fallback:v}catch{return fallback}},set(key,value){try{sessionStorage.setItem(key,String(value))}catch{}}};
  const CYCLE_DURATION_MS=10*60*1000;
  let autoTime=session.get(P+'time-mode')!=='manual';
  let manualMinutes=Math.round(Number(session.get(P+'test-minutes',1110)||1110)/10)*10;
  let cycleAnchorReal=Number(session.get(P+'cycle-anchor-real',Date.now())||Date.now());
  let cycleAnchorMinutes=Number(session.get(P+'cycle-anchor-minutes',360)||360);
  let timer=null,dragging=false,paused=false,pausedAtMinutes=manualMinutes;
  const pad=n=>String(n).padStart(2,'0');
  const timeLabel=m=>{m=Math.floor(Number(m)||0);return `${pad(Math.floor(m/60)%24)}:${pad(m%60)}`};
  function currentMinutes(){const elapsed=((Date.now()-cycleAnchorReal)%CYCLE_DURATION_MS+CYCLE_DURATION_MS)%CYCLE_DURATION_MS;return (cycleAnchorMinutes+(elapsed/CYCLE_DURATION_MS)*1440)%1440}
  function anchorCycle(minutes){cycleAnchorMinutes=(Number(minutes)+1440)%1440;cycleAnchorReal=Date.now();session.set(P+'cycle-anchor-minutes',cycleAnchorMinutes);session.set(P+'cycle-anchor-real',cycleAnchorReal)}
  function liveMinutes(){if(dragging)return manualMinutes;if(paused)return pausedAtMinutes;return autoTime?currentMinutes():manualMinutes}
  function phaseFor(m){if(m>=300&&m<480)return'dawn';if(m>=480&&m<990)return'day';if(m>=990&&m<1200)return'dusk';return'night'}
  function updateSky(minutes=liveMinutes()){
    minutes=(minutes+1440)%1440;const phase=phaseFor(minutes),c=skyBlend(minutes),root=document.documentElement;
    root.style.setProperty('--rdc-sky-top',c.top);root.style.setProperty('--rdc-sky-mid',c.mid);root.style.setProperty('--rdc-sky-bottom',c.bottom);root.style.setProperty('--rdc-cloud-light',c.light);root.style.setProperty('--rdc-cloud-shadow',c.shadow);
    root.style.setProperty('--rdc-stars-opacity',c.stars);
    let sunOpacity=0,moonOpacity=0,sunX=50,sunY=70,moonX=50,moonY=70;
    if(minutes>=360&&minutes<=1200){const p=(minutes-360)/840;sunX=6+p*88;sunY=76-Math.sin(Math.PI*p)*62;sunOpacity=Math.min(1,Math.max(0,Math.sin(Math.PI*p)*1.45));}
    if(minutes>=1200||minutes<=360){const elapsed=minutes>=1200?minutes-1200:minutes+240;const p=elapsed/600;moonX=6+p*88;moonY=72-Math.sin(Math.PI*p)*55;moonOpacity=Math.min(1,Math.max(.15,Math.sin(Math.PI*p)*1.2));}
    root.style.setProperty('--rdc-sun-x',sunX+'%');root.style.setProperty('--rdc-sun-y',sunY+'%');root.style.setProperty('--rdc-sun-opacity',sunOpacity);
    root.style.setProperty('--rdc-moon-x',moonX+'%');root.style.setProperty('--rdc-moon-y',moonY+'%');root.style.setProperty('--rdc-moon-opacity',moonOpacity);
    document.body.dataset.skyPhase=phase;
    const displayMinutes=Math.round(minutes/10)*10%1440;
    document.querySelectorAll('[data-time-output]').forEach(o=>o.textContent=timeLabel(displayMinutes));
    document.querySelectorAll('[data-time-slider]').forEach(i=>{if(document.activeElement!==i)i.value=displayMinutes});
    document.querySelectorAll('[data-time-pause]').forEach(b=>{b.classList.toggle('active',paused);b.setAttribute('aria-pressed',String(paused));b.innerHTML=paused?'▶':'⏸';b.title=paused?'Retomar o relógio':'Pausar o relógio';b.setAttribute('aria-label',paused?'Retomar o relógio':'Pausar o relógio')});
  }
  function timeControlHtml(){const m=liveMinutes();return `<div class="time-test-control" data-time-control><label>Hora do dia</label><input data-time-slider type="range" min="0" max="1430" step="10" value="${m}" aria-label="Hora do dia"><output data-time-output>${timeLabel(Math.round(m/10)*10%1440)}</output><button class="time-pause-button" data-time-pause type="button" aria-pressed="${paused}" title="${paused?'Retomar o relógio':'Pausar o relógio'}" aria-label="${paused?'Retomar o relógio':'Pausar o relógio'}">${paused?'▶':'⏸'}</button></div>`}
  function ensureTimeControls(){
    const utility=document.querySelector('.utility-controls');if(!utility)return;
    if(!utility.querySelector('[data-time-control]'))utility.insertAdjacentHTML('afterbegin',timeControlHtml());
    if(!utility.querySelector('.time-mobile-toggle'))utility.querySelector('[data-time-control]')?.insertAdjacentHTML('afterend','<button class="icon-btn time-mobile-toggle" type="button" data-time-mobile aria-label="Abrir relógio do dia" title="Relógio do dia">◷</button>');
  }
  document.addEventListener('input',e=>{if(!e.target.matches('[data-time-slider]'))return;dragging=true;manualMinutes=Math.round(Number(e.target.value)/10)*10;updateSky(manualMinutes)});
  document.addEventListener('change',e=>{
    if(!e.target.matches('[data-time-slider]'))return;
    dragging=false;
    if(paused){pausedAtMinutes=manualMinutes}
    else{anchorCycle(manualMinutes);autoTime=true;session.set(P+'time-mode','auto')}
    updateSky();
  });
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-time-pause]')){
      if(paused){anchorCycle(pausedAtMinutes);paused=false;autoTime=true;session.set(P+'time-mode','auto');X.toast('Relógio retomado')}
      else{pausedAtMinutes=liveMinutes();paused=true;X.toast('Relógio pausado')}
      updateSky();
    }
    const mobile=e.target.closest('[data-time-mobile]');if(mobile){document.querySelector('.topbar [data-time-control]')?.classList.toggle('mobile-open')}
  });
  function startClock(){clearInterval(timer);updateSky();timer=setInterval(()=>{if(!document.hidden)updateSky()},500)}

  function applyVisualSettings(){
    const root=document.documentElement;
    root.style.setProperty('--rdc-atmosphere-opacity',getNum('effect-opacity')/100);
    root.style.setProperty('--rdc-motion-strength',getNum('motion-intensity')/100);
    atmosphere.querySelector('.ruinas-distant-elements').style.display=getBool('distant-elements')?'block':'none';
    document.body.classList.toggle('ruinas-no-fragments',!getBool('fragments'));
    document.body.classList.toggle('ruinas-no-menu-motion',!getBool('menu-motion'));
    document.body.classList.toggle('ruinas-no-parallax',!getBool('parallax'));
    buildClouds();updateSky();syncContemplative();
  }

  const settingsHost=document.getElementById('settingsContent');
  function injectSettings(){
    if(!settingsHost||settingsHost.querySelector('[data-ruinas-experience-settings]'))return;
    settingsHost.insertAdjacentHTML('beforeend',`<section class="experience-settings-section" data-ruinas-experience-settings><h3>Atmosfera de Ruínas dos Céus</h3><p class="experience-settings-note">Controles específicos deste livro. Alterá-los não modifica Guerras de Sangue.</p>${X.makeToggle({key:'distant-clouds',prefix:P,label:'Nuvens distantes',description:'Massas lentas próximas do horizonte.',value:getBool('distant-clouds')})}${X.makeToggle({key:'mid-clouds',prefix:P,label:'Nuvens intermédias',description:'Camada principal com luz e sombra.',value:getBool('mid-clouds')})}${X.makeToggle({key:'near-mist',prefix:P,label:'Névoa próxima',description:'Névoa frontal muito transparente.',value:getBool('near-mist')})}${X.makeToggle({key:'cloud-front',prefix:P,label:'Nuvens à frente',description:'Permite que parte das nuvens passe por cima do conteúdo, como se estivesse imerso nelas.',value:getBool('cloud-front')})}${X.makeToggle({key:'fragments',prefix:P,label:'Fragmentos suspensos',description:'Lascas e fissuras decorativas do menu.',value:getBool('fragments')})}${X.makeToggle({key:'menu-motion',prefix:P,label:'Movimento do menu',description:'Separação quase imperceptível dos fragmentos.',value:getBool('menu-motion')})}${X.makeToggle({key:'sky-cycle',prefix:P,label:'Ciclo do céu',description:'Iluminação automática de amanhecer a noite.',value:getBool('sky-cycle')})}${X.makeToggle({key:'distant-elements',prefix:P,label:'Elementos distantes',description:'Nuaris e vintela quase imperceptíveis.',value:getBool('distant-elements')})}${X.makeToggle({key:'parallax',prefix:P,label:'Parallax de Etérea',description:'Pequena profundidade em dispositivos adequados.',value:getBool('parallax')})}${X.makeRange({key:'cloud-density',prefix:P,label:'Densidade de nuvens',description:'Limite rígido e adaptado ao dispositivo.',value:getNum('cloud-density'),min:15,max:100})}${X.makeRange({key:'motion-intensity',prefix:P,label:'Intensidade do movimento',description:'Amplitude máxima dos movimentos atmosféricos.',value:getNum('motion-intensity'),min:0,max:100})}${X.makeRange({key:'effect-opacity',prefix:P,label:'Opacidade dos efeitos',description:'Visibilidade geral da atmosfera.',value:getNum('effect-opacity'),min:20,max:100})}</section>`);
  }
  if(settingsHost){X.attachSettings(settingsHost,()=>{X.storage.set(P+'customized','1');applyVisualSettings();setTimeout(injectSettings)});new MutationObserver(injectSettings).observe(settingsHost,{childList:true});}

  const profileValues={
    full:{'distant-clouds':1,'mid-clouds':1,'near-mist':1,'cloud-front':1,'fragments':1,'menu-motion':1,'sky-cycle':1,'distant-elements':1,'parallax':1,'cloud-density':100,'motion-intensity':58,'effect-opacity':100},
    normal:{'distant-clouds':1,'mid-clouds':1,'near-mist':1,'cloud-front':1,'fragments':1,'menu-motion':1,'sky-cycle':1,'distant-elements':1,'parallax':0,'cloud-density':86,'motion-intensity':45,'effect-opacity':92},
    performance:{'distant-clouds':0,'mid-clouds':0,'near-mist':0,'cloud-front':0,'fragments':1,'menu-motion':0,'sky-cycle':0,'distant-elements':0,'parallax':0,'cloud-density':15,'motion-intensity':0,'effect-opacity':38}
  };
  function applyProfile(name){const values=profileValues[name];if(!values)return;Object.entries(values).forEach(([k,v])=>X.storage.set(P+k,v));X.storage.set(P+'customized','0');setTimeout(applyVisualSettings,50)}
  document.addEventListener('click',e=>{const p=e.target.closest('[data-bpreset]')?.dataset.bpreset;if(p)applyProfile(p);if(e.target.closest('#perfToggle'))setTimeout(()=>X.toast(document.body.classList.contains('performance-mode')?'Modo desempenho ativado':'Modo equilibrado ativado'),70)});
  X.observePerformance(()=>applyVisualSettings());

  let contemplateShell=null;
  function contemplativeClouds(){const main=cloudHost?.innerHTML||'';return `<div class="clouds-layer">${main}</div>`}
  function createContemplative(){
    if(contemplateShell)return contemplateShell;
    contemplateShell=document.createElement('section');contemplateShell.id='ruinasContemplative';contemplateShell.className='contemplative-shell ruinas-contemplative';contemplateShell.setAttribute('aria-hidden','true');
    contemplateShell.innerHTML=`<div class="contemplative-scene"><div class="ruinas-contemplative-art"></div><div class="ruinas-stars"></div><div class="ruinas-celestial ruinas-sun"></div><div class="ruinas-celestial ruinas-moon"></div><div data-contemplative-clouds></div><div class="ruinas-contemplative-vignette"></div><button class="contemplative-back" type="button" data-close-contemplative title="Voltar à página">← Voltar</button><button class="contemplative-music-action" type="button" data-contemplative-music title="Ligar ou desligar música">♪ Música</button><div class="contemplative-caption">Etérea · beleza suspensa, instabilidade silenciosa</div>${timeControlHtml()}</div>`;
    document.body.append(contemplateShell);return contemplateShell;
  }
  function syncContemplative(){if(!contemplateShell)return;const host=contemplateShell.querySelector('[data-contemplative-clouds]');if(host)host.innerHTML=contemplativeClouds();updateSky()}
  function openContemplative(){const shell=createContemplative();syncContemplative();shell.classList.add('open');shell.setAttribute('aria-hidden','false');document.body.classList.add('contemplative-active');shell.querySelector('.contemplative-back')?.focus();}
  function closeContemplative(){if(!contemplateShell)return;contemplateShell.classList.remove('open');contemplateShell.setAttribute('aria-hidden','true');document.body.classList.remove('contemplative-active');document.querySelector('[data-contemplative="ruinas"]')?.focus()}
  document.addEventListener('click',e=>{if(e.target.closest('[data-contemplative="ruinas"]'))openContemplative();if(e.target.closest('[data-close-contemplative]'))closeContemplative();if(e.target.closest('[data-contemplative-music]'))document.querySelector('[data-music-power]')?.click()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('contemplative-active')){e.preventDefault();closeContemplative()}});

  function routeContext(){const route=location.hash.replace(/^#\/?/,'');const match=route.match(/^capitulo\/(\d+)/);let fracture='low';if(match){const n=Number(match[1]);if(n>=8&&n<=10)fracture='high';else if(n>=20)fracture='medium'}if(/ruinas|queda|cataclisma/.test(route))fracture='high';document.body.dataset.storyFracture=fracture}
  addEventListener('hashchange',routeContext);routeContext();

  let parallaxFrame=0;
  addEventListener('pointermove',e=>{if(X.reduced||X.weakDevice||!getBool('parallax')||document.body.classList.contains('performance-mode'))return;cancelAnimationFrame(parallaxFrame);parallaxFrame=requestAnimationFrame(()=>{const strength=getNum('motion-intensity')/100;const x=(e.clientX/innerWidth-.5)*5*strength,y=(e.clientY/innerHeight-.5)*3*strength;atmosphere.style.transform=`translate3d(${x}px,${y}px,0)`})},{passive:true});
  addEventListener('pointerleave',()=>{atmosphere.style.transform=''});
  document.addEventListener('visibilitychange',()=>{cloudHost?.classList.toggle('experience-paused',document.hidden)});


  const sidebar=document.getElementById('side'),sidebarToggle=document.getElementById('ruinasSidebarToggle');
  let sidebarCollapsed=X.storage.get(P+'sidebar-collapsed','0')==='1';
  function applySidebarState(){if(!sidebar)return;sidebar.classList.toggle('collapsed',sidebarCollapsed);if(sidebarToggle){sidebarToggle.setAttribute('aria-expanded',String(!sidebarCollapsed));sidebarToggle.setAttribute('aria-label',sidebarCollapsed?'Expandir menu':'Recolher menu');sidebarToggle.title=sidebarCollapsed?'Expandir menu':'Recolher menu'}}
  sidebarToggle?.addEventListener('click',()=>{sidebarCollapsed=!sidebarCollapsed;X.storage.set(P+'sidebar-collapsed',sidebarCollapsed?'1':'0');applySidebarState()});
  applySidebarState();

  ensureTimeControls();startClock();applyVisualSettings();injectSettings();
})();
