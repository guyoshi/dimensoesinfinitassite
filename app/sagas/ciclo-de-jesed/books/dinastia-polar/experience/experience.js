(()=>{
  const X=window.DIExperience;if(!X)return;
  const P='di-polar-';
  const defaults={dust:true,glints:true,shadows:true,lights:true,smoke:true,'ring-motion':true,'dust-front':true,'dust-density':70,'motion-intensity':46,'effect-opacity':92};
  const getBool=k=>X.bool(P+k,defaults[k]),getNum=(k,min=0,max=100)=>X.num(P+k,defaults[k],min,max);
  Object.entries(defaults).forEach(([k,v])=>{if(X.storage.get(P+k)===null)X.storage.set(P+k,typeof v==='boolean'?(v?'1':'0'):v)});
  // maxParticles reduz a densidade em weakDevice sem desligar nem persistir uma versão empobrecida da atmosfera.

  /* ---- Poeira fina, lenta e descendente (duas camadas: atrás e à frente do conteúdo) ---- */
  const back=document.createElement('canvas'),front=document.createElement('canvas');
  back.id='dpDustCanvas';front.id='dpDustCanvasFront';
  back.setAttribute('aria-hidden','true');front.setAttribute('aria-hidden','true');
  document.body.prepend(front);document.body.prepend(back);
  const layers=[{canvas:back,ctx:back.getContext('2d'),front:false,particles:[]},{canvas:front,ctx:front.getContext('2d'),front:true,particles:[]}];
  let running=true,last=performance.now(),raf=0;
  function resize(){const dpr=Math.min(devicePixelRatio||1,1.6);for(const layer of layers){layer.canvas.width=Math.round(innerWidth*dpr);layer.canvas.height=Math.round(innerHeight*dpr);layer.canvas.style.width=innerWidth+'px';layer.canvas.style.height=innerHeight+'px';layer.ctx.setTransform(dpr,0,0,dpr,0,0)}}
  addEventListener('resize',resize,{passive:true});resize();
  function maxParticles(isFront){let density=getNum('dust-density');if(X.weakDevice)density*=.65;if(X.reduced)density*=.35;return Math.round(density*(isFront?.32:1.1))}
  function spawn(layer){
    const motion=getNum('motion-intensity')/100;
    layer.particles.push({
      x:Math.random()*innerWidth,y:-10-Math.random()*40,life:0,
      vy:(.1+Math.random()*.2)*(.5+motion),vx:(-.06+Math.random()*.12),
      size:(layer.front?2.2:1.6)+Math.random()*(layer.front?4.4:3.6),max:18000+Math.random()*16000,
      alpha:(layer.front?.18:.14)+Math.random()*.34,sway:Math.random()*Math.PI*2
    });
  }
  function drawParticle(targetCtx,p,dt){
    p.life+=dt;const t=p.life/p.max;
    p.x+=(p.vx+Math.sin(p.life*.0003+p.sway)*.04)*dt/16;
    p.y+=p.vy*dt/16;
    const fade=Math.sin(Math.PI*Math.min(1,t));
    targetCtx.save();targetCtx.globalAlpha=Math.max(0,p.alpha*fade);
    const g=targetCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*4);
    g.addColorStop(0,'rgba(232,212,163,.9)');g.addColorStop(1,'rgba(232,212,163,0)');
    targetCtx.fillStyle=g;targetCtx.beginPath();targetCtx.arc(p.x,p.y,p.size*4,0,Math.PI*2);targetCtx.fill();
    targetCtx.restore();
    return t>=1||p.y>innerHeight+40;
  }
  function active(){return !document.hidden&&!document.body.classList.contains('performance-mode')&&!document.body.classList.contains('no-particles')&&getBool('dust')}
  function frame(now){
    const dt=Math.min(40,now-last);last=now;
    const frontOn=getBool('dust-front');
    if(active()&&running){
      for(const layer of layers){
        const ctx=layer.ctx;ctx.clearRect(0,0,innerWidth,innerHeight);
        if(layer.front&&!frontOn){layer.particles.length=0;continue}
        const max=maxParticles(layer.front);
        while(layer.particles.length<max)spawn(layer);
        layer.particles=layer.particles.filter(p=>!drawParticle(ctx,p,dt));
      }
    } else {
      for(const layer of layers){if(layer.particles.length){layer.ctx.clearRect(0,0,innerWidth,innerHeight);layer.particles.length=0}}
    }
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
  document.addEventListener('visibilitychange',()=>{last=performance.now()});

  /* ---- Luzes distantes de Kaeliran ---- */
  const lights=document.createElement('div');
  lights.id='dpDistantLights';lights.setAttribute('aria-hidden','true');
  document.body.prepend(lights);
  function buildLights(){
    lights.innerHTML='';
    const count=X.mobile?9:16;
    for(let i=0;i<count;i+=1){
      const dot=document.createElement('span');
      dot.style.left=`${4+Math.random()*92}%`;
      dot.style.top=`${48+Math.random()*42}%`;
      dot.style.setProperty('--dp-light-duration',`${7+Math.random()*9}s`);
      dot.style.setProperty('--dp-light-delay',`${-Math.random()*12}s`);
      dot.style.setProperty('--dp-light-size',`${1.4+Math.random()*1.8}px`);
      lights.appendChild(dot);
    }
  }
  buildLights();

  /* ---- Fumo / névoa discreta ---- */
  const smoke=document.createElement('div');
  smoke.id='dpSmoke';smoke.setAttribute('aria-hidden','true');
  document.body.prepend(smoke);

  function applyVisualSettings(){
    document.body.style.setProperty('--dp-effect-opacity',getNum('effect-opacity')/100);
    lights.style.display=getBool('lights')&&!document.body.classList.contains('performance-mode')?'block':'none';
    smoke.style.display=getBool('smoke')&&!document.body.classList.contains('performance-mode')?'block':'none';
    document.body.classList.toggle('dp-no-glints',!getBool('glints'));
    document.body.classList.toggle('dp-no-shadow-drift',!getBool('shadows'));
    document.body.classList.toggle('dp-no-ring-motion',!getBool('ring-motion'));
    for(const layer of layers)layer.particles.length=0;
    syncContemplative();
  }

  const settingsHost=document.getElementById('settingsContent');
  function injectSettings(){
    if(!settingsHost||settingsHost.querySelector('[data-polar-experience-settings]'))return;
    settingsHost.insertAdjacentHTML('beforeend',`<section class="experience-settings-section" data-polar-experience-settings><h3>Atmosfera de Dinastia Polar</h3><p class="experience-settings-note">Controlos específicos deste livro. Alterá-los não modifica os outros livros.</p>${X.makeToggle({key:'dust',prefix:P,label:'Poeira',description:'Poeira fina e lenta a descer sobre a pedra.',value:getBool('dust')})}${X.makeToggle({key:'glints',prefix:P,label:'Reflexos dourados',description:'Pequenos reflexos a atravessar inscrições e bordas.',value:getBool('glints')})}${X.makeToggle({key:'shadows',prefix:P,label:'Sombras lentas',description:'Sombras a deslocar-se muito lentamente sobre a pedra.',value:getBool('shadows')})}${X.makeToggle({key:'lights',prefix:P,label:'Luzes distantes',description:'Luzes de Kaeliran a acender e apagar ao fundo.',value:getBool('lights')})}${X.makeToggle({key:'smoke',prefix:P,label:'Fumo discreto',description:'Névoa muito subtil de lamparinas e braseiros.',value:getBool('smoke')})}${X.makeToggle({key:'ring-motion',prefix:P,label:'Anéis em movimento',description:'Os anéis deslocam-se ligeiramente ao abrir uma página.',value:getBool('ring-motion')})}${X.makeToggle({key:'dust-front',prefix:P,label:'Poeira à frente',description:'Permite que parte da poeira passe por cima do conteúdo, não só por trás.',value:getBool('dust-front')})}${X.makeRange({key:'dust-density',prefix:P,label:'Densidade da poeira',description:'Quantidade máxima, adaptada ao dispositivo.',value:getNum('dust-density'),min:10,max:100})}${X.makeRange({key:'motion-intensity',prefix:P,label:'Intensidade do movimento',description:'Velocidade geral da poeira.',value:getNum('motion-intensity'),min:0,max:100})}${X.makeRange({key:'effect-opacity',prefix:P,label:'Opacidade dos efeitos',description:'Visibilidade geral da atmosfera.',value:getNum('effect-opacity'),min:20,max:100})}</section>`);
  }
  if(settingsHost){X.attachSettings(settingsHost,()=>{X.storage.set(P+'customized','1');applyVisualSettings();setTimeout(injectSettings)});new MutationObserver(injectSettings).observe(settingsHost,{childList:true})}

  const profileValues={
    full:{dust:1,glints:1,shadows:1,lights:1,smoke:1,'ring-motion':1,'dust-density':88,'motion-intensity':54,'effect-opacity':100},
    normal:{dust:1,glints:1,shadows:1,lights:1,smoke:1,'ring-motion':1,'dust-density':70,'motion-intensity':46,'effect-opacity':92},
    performance:{dust:0,glints:0,shadows:0,lights:0,smoke:0,'ring-motion':0,'dust-density':0,'motion-intensity':0,'effect-opacity':28}
  };
  function applyProfile(name){const values=profileValues[name];if(!values)return;Object.entries(values).forEach(([k,v])=>X.storage.set(P+k,v));X.storage.set(P+'customized','0');setTimeout(applyVisualSettings,60)}
  document.addEventListener('click',e=>{const p=e.target.closest('[data-preset]')?.dataset.preset;if(p)applyProfile(p)});
  X.observePerformance(()=>applyVisualSettings());

  /* ---- Contexto de dinastia na barra lateral ---- */
  function updateDynastyContext(){
    const sidebar=document.getElementById('sidebar');if(!sidebar)return;
    const route=location.hash.replace(/^#\/?/,'');
    const match=route.match(/^dynasty\/([^/]+)/);
    let name='';
    if(match){const dynasty=(window.DI_DATA?.dynasties||[]).find(d=>d.slug===match[1]||d.id===match[1]);name=dynasty?.name||match[1].replaceAll('-',' ')}
    sidebar.dataset.dynastyContext=name;
  }
  addEventListener('hashchange',updateDynastyContext);updateDynastyContext();

  /* ---- Modo contemplativo ---- */
  let shell=null,cCanvas=null,cCtx=null,cParticles=[];
  function createContemplative(){
    if(shell)return shell;
    shell=document.createElement('section');
    shell.className='contemplative-shell dp-contemplative';shell.id='dpContemplative';shell.setAttribute('aria-hidden','true');
    shell.innerHTML='<div class="contemplative-scene"><div class="dp-contemplative-rings">'+`<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#e8b753" stroke-width="1"><circle cx="300" cy="210" r="90" stroke-dasharray="20 16 10 34" opacity=".4"/><circle cx="300" cy="210" r="150" stroke-dasharray="46 24" opacity=".26"/><circle cx="300" cy="210" r="210" stroke-dasharray="8 20 70 12" opacity=".16"/></g></svg>`+'</div><canvas id="dpContemplativeCanvas" aria-hidden="true"></canvas><button class="contemplative-back" type="button" data-close-contemplative title="Voltar à página">← Voltar</button><button class="contemplative-music-action" type="button" data-contemplative-music title="Ligar ou desligar música">♪ Música</button><div class="contemplative-caption">Kaeliran · vigília silenciosa sobre os anéis</div></div>';
    document.body.append(shell);
    cCanvas=shell.querySelector('canvas');cCtx=cCanvas.getContext('2d');resizeContemplative();
    return shell;
  }
  function resizeContemplative(){if(!cCanvas)return;const dpr=Math.min(devicePixelRatio||1,1.5);cCanvas.width=innerWidth*dpr;cCanvas.height=innerHeight*dpr;cCtx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resizeContemplative,{passive:true});
  function drawContemplative(){
    if(!shell?.classList.contains('open')){requestAnimationFrame(drawContemplative);return}
    cCtx.clearRect(0,0,innerWidth,innerHeight);
    while(cParticles.length<Math.max(10,Math.round(maxParticles(false)*.5))){
      cParticles.push({x:Math.random()*innerWidth,y:-10,vy:.06+Math.random()*.14,vx:-.03+Math.random()*.06,size:1+Math.random()*2.4,life:0,max:20000+Math.random()*16000,alpha:.06+Math.random()*.16,sway:Math.random()*6});
    }
    cParticles=cParticles.filter(p=>!drawParticle(cCtx,p,16));
    requestAnimationFrame(drawContemplative);
  }
  requestAnimationFrame(drawContemplative);
  function syncContemplative(){if(shell&&document.body.classList.contains('performance-mode'))cParticles.length=0}
  function openContemplative(){const s=createContemplative();s.classList.add('open');s.setAttribute('aria-hidden','false');document.body.classList.add('contemplative-active');s.querySelector('.contemplative-back')?.focus()}
  function closeContemplative(){if(!shell)return;shell.classList.remove('open');shell.setAttribute('aria-hidden','true');document.body.classList.remove('contemplative-active');cParticles.length=0;document.querySelector('[data-contemplative="polar"]')?.focus()}
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-contemplative="polar"]'))openContemplative();
    if(e.target.closest('[data-close-contemplative]'))closeContemplative();
    if(e.target.closest('[data-contemplative-music]'))document.querySelector('[data-music-power]')?.click();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('contemplative-active')){e.preventDefault();closeContemplative()}});

  injectSettings();applyVisualSettings();
})();
