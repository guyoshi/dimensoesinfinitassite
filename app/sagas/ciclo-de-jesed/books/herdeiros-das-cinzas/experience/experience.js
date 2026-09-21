(()=>{
  const X=window.DIExperience;if(!X)return;
  const P='di-cinzas-';
  const defaults={ash:true,shadows:true,smoke:true,'ash-front':true,'ash-density':64,'motion-intensity':46,'effect-opacity':90};
  const getBool=k=>X.bool(P+k,defaults[k]),getNum=(k,min=0,max=100)=>X.num(P+k,defaults[k],min,max);
  Object.entries(defaults).forEach(([k,v])=>{if(X.storage.get(P+k)===null)X.storage.set(P+k,typeof v==='boolean'?(v?'1':'0'):v)});
  if(X.weakDevice&&X.storage.get(P+'auto-reduced')!=='0'){if(X.storage.get(P+'ash-density')===String(defaults['ash-density']))X.storage.set(P+'ash-density','24')}

  /* ---- Cinzas a cair: flocos irregulares, lentos, com balanço e rotação (duas camadas: atrás e à frente do conteúdo) ---- */
  const back=document.createElement('canvas'),front=document.createElement('canvas');
  back.id='hcDustCanvas';front.id='hcDustCanvasFront';
  back.setAttribute('aria-hidden','true');front.setAttribute('aria-hidden','true');
  document.body.prepend(front);document.body.prepend(back);
  const layers=[{canvas:back,ctx:back.getContext('2d'),front:false,particles:[]},{canvas:front,ctx:front.getContext('2d'),front:true,particles:[]}];
  let running=true,last=performance.now(),raf=0;
  function resize(){const dpr=Math.min(devicePixelRatio||1,1.6);for(const layer of layers){layer.canvas.width=Math.round(innerWidth*dpr);layer.canvas.height=Math.round(innerHeight*dpr);layer.canvas.style.width=innerWidth+'px';layer.canvas.style.height=innerHeight+'px';layer.ctx.setTransform(dpr,0,0,dpr,0,0)}}
  addEventListener('resize',resize,{passive:true});resize();
  function maxParticles(isFront){let density=getNum('ash-density');if(X.weakDevice)density*=.65;if(X.reduced)density*=.35;return Math.round(density*(isFront?.34:1.1))}
  /* Cada floco é um polígono irregular de 5–7 vértices com raios variáveis. */
  function makeShape(){
    const n=5+Math.floor(Math.random()*3),pts=[];
    for(let i=0;i<n;i+=1){const a=(i/n)*Math.PI*2+(Math.random()-.5)*.6,r=.55+Math.random()*.6;pts.push([Math.cos(a)*r,Math.sin(a)*r*(.55+Math.random()*.4)])}
    return pts;
  }
  const TONES_LIGHT=['74,86,101','92,104,118','58,68,82','108,98,92'];
  const TONES_DARK=['205,214,224','170,182,196','226,231,237','190,178,170'];
  function spawn(layer,dark){
    const motion=getNum('motion-intensity')/100;
    const tones=dark?TONES_DARK:TONES_LIGHT;
    layer.particles.push({
      x:Math.random()*(innerWidth+120)-60,y:-14-Math.random()*40,life:0,
      vy:(.14+Math.random()*.3)*(.5+motion),vx:(-.16+Math.random()*.1),
      size:(layer.front?2.6:1.6)+Math.random()*(layer.front?5.2:3.6),max:24000+Math.random()*22000,
      alpha:(layer.front?.3:.24)+Math.random()*.36,sway:Math.random()*Math.PI*2,swaySpeed:.0004+Math.random()*.0008,
      rot:Math.random()*Math.PI*2,vr:(-.0009+Math.random()*.0018),shape:makeShape(),tone:tones[Math.floor(Math.random()*tones.length)]
    });
  }
  function drawParticle(targetCtx,p,dt){
    p.life+=dt;const t=p.life/p.max;
    p.x+=(p.vx+Math.sin(p.life*p.swaySpeed+p.sway)*.22)*dt/16;
    p.y+=p.vy*dt/16;p.rot+=p.vr*dt;
    const fade=Math.sin(Math.PI*Math.min(1,t));
    targetCtx.save();targetCtx.globalAlpha=Math.max(0,p.alpha*Math.min(1,fade*1.6));
    targetCtx.translate(p.x,p.y);targetCtx.rotate(p.rot);
    targetCtx.fillStyle=`rgb(${p.tone})`;targetCtx.beginPath();
    p.shape.forEach(([sx,sy],i)=>{const px=sx*p.size,py=sy*p.size;i?targetCtx.lineTo(px,py):targetCtx.moveTo(px,py)});
    targetCtx.closePath();targetCtx.fill();
    targetCtx.restore();
    return t>=1||p.y>innerHeight+30||p.x<-80||p.x>innerWidth+80;
  }
  function active(){return !document.hidden&&!document.body.classList.contains('performance-mode')&&!document.body.classList.contains('no-particles')&&getBool('ash')}
  function frame(now){
    const dt=Math.min(40,now-last);last=now;
    const frontOn=getBool('ash-front');
    const dark=document.body.classList.contains('contemplative-active');
    if(active()&&running){
      for(const layer of layers){
        const ctx=layer.ctx;ctx.clearRect(0,0,innerWidth,innerHeight);
        if(layer.front&&!frontOn){layer.particles.length=0;continue}
        const max=maxParticles(layer.front);
        while(layer.particles.length<max)spawn(layer,false);
        layer.particles=layer.particles.filter(p=>!drawParticle(ctx,p,dt));
      }
    } else {
      for(const layer of layers){if(layer.particles.length){layer.ctx.clearRect(0,0,innerWidth,innerHeight);layer.particles.length=0}}
    }
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
  document.addEventListener('visibilitychange',()=>{last=performance.now()});

  /* ---- Fumaça de cinzas: massas difusas que sobem e derivam ---- */
  const smoke=document.createElement('div');
  smoke.id='hcSmoke';smoke.setAttribute('aria-hidden','true');
  function buildSmoke(){
    smoke.innerHTML='';
    const count=X.mobile?4:7;
    for(let i=0;i<count;i+=1){
      const puff=document.createElement('span');puff.className='hc-puff';
      puff.style.setProperty('--x',`${Math.round(-5+Math.random()*95)}%`);
      puff.style.setProperty('--s',`${Math.round(32+Math.random()*34)}vw`);
      puff.style.setProperty('--a',(.22+Math.random()*.2).toFixed(2));
      puff.style.setProperty('--d',`${Math.round(55+Math.random()*55)}s`);
      puff.style.setProperty('--dl',`${-Math.round(Math.random()*90)}s`);
      puff.style.setProperty('--dx',`${Math.round(-14+Math.random()*28)}vw`);
      smoke.appendChild(puff);
    }
  }
  buildSmoke();document.body.prepend(smoke);

  function applyVisualSettings(){
    document.body.style.setProperty('--hc-effect-opacity',getNum('effect-opacity')/100);
    document.body.classList.toggle('hc-no-smoke',!getBool('smoke'));
    document.body.classList.toggle('hc-no-shadow-drift',!getBool('shadows'));
    for(const layer of layers)layer.particles.length=0;
    syncContemplative();
  }

  const settingsHost=document.getElementById('settingsContent');
  function injectSettings(){
    if(!settingsHost||settingsHost.querySelector('[data-cinzas-experience-settings]'))return;
    settingsHost.insertAdjacentHTML('beforeend',`<section class="experience-settings-section" data-cinzas-experience-settings><h3>Atmosfera de Herdeiros das Cinzas</h3><p class="experience-settings-note">Controlos específicos deste livro. Alterá-los não modifica os outros livros.</p>${X.makeToggle({key:'ash',prefix:P,label:'Cinzas a cair',description:'Flocos de cinza a descer devagar sobre a página.',value:getBool('ash')})}${X.makeToggle({key:'smoke',prefix:P,label:'Fumaça de cinzas',description:'Fumaça difusa e lenta a subir do fundo.',value:getBool('smoke')})}${X.makeToggle({key:'shadows',prefix:P,label:'Sombras lentas',description:'Manchas de sombra a deslocar-se muito lentamente.',value:getBool('shadows')})}${X.makeToggle({key:'ash-front',prefix:P,label:'Cinzas à frente',description:'Permite que parte das cinzas passe por cima do conteúdo, não só por trás.',value:getBool('ash-front')})}${X.makeRange({key:'ash-density',prefix:P,label:'Densidade das cinzas',description:'Quantidade máxima, adaptada ao dispositivo.',value:getNum('ash-density'),min:10,max:100})}${X.makeRange({key:'motion-intensity',prefix:P,label:'Intensidade do movimento',description:'Velocidade geral da queda.',value:getNum('motion-intensity'),min:0,max:100})}${X.makeRange({key:'effect-opacity',prefix:P,label:'Opacidade dos efeitos',description:'Visibilidade geral da atmosfera.',value:getNum('effect-opacity'),min:20,max:100})}</section>`);
  }
  if(settingsHost){X.attachSettings(settingsHost,()=>{X.storage.set(P+'customized','1');applyVisualSettings();setTimeout(injectSettings)});new MutationObserver(injectSettings).observe(settingsHost,{childList:true})}

  const profileValues={
    full:{ash:1,smoke:1,shadows:1,'ash-density':88,'motion-intensity':54,'effect-opacity':100},
    normal:{ash:1,smoke:1,shadows:1,'ash-density':64,'motion-intensity':46,'effect-opacity':90},
    performance:{ash:0,smoke:0,shadows:0,'ash-density':0,'motion-intensity':0,'effect-opacity':28}
  };
  function applyProfile(name){const values=profileValues[name];if(!values)return;Object.entries(values).forEach(([k,v])=>X.storage.set(P+k,v));X.storage.set(P+'customized','0');setTimeout(applyVisualSettings,60)}
  document.addEventListener('click',e=>{const p=e.target.closest('[data-preset]')?.dataset.preset;if(p)applyProfile(p)});
  X.observePerformance(()=>applyVisualSettings());

  /* ---- Modo contemplativo: cena escura sobre a capa, cinzas claras a cair ---- */
  let shell=null,cCanvas=null,cCtx=null,cParticles=[];
  function createContemplative(){
    if(shell)return shell;
    shell=document.createElement('section');
    shell.className='contemplative-shell hc-contemplative';shell.id='hcContemplative';shell.setAttribute('aria-hidden','true');
    shell.innerHTML='<div class="contemplative-scene"><img class="hc-contemplative-backdrop" src="assets/books/ciclo-de-jesed/herdeiros-das-cinzas/cover-clean.webp" alt="" onerror="this.hidden=true"><canvas id="hcContemplativeCanvas" aria-hidden="true"></canvas><button class="contemplative-back" type="button" data-close-contemplative title="Voltar à página">← Voltar</button><button class="contemplative-music-action" type="button" data-contemplative-music title="Ligar ou desligar música">♪ Música</button><div class="contemplative-caption">Herdeiros das Cinzas · Livro IV do Ciclo de Jesed</div></div>';
    document.body.append(shell);
    cCanvas=shell.querySelector('canvas');cCtx=cCanvas.getContext('2d');resizeContemplative();
    return shell;
  }
  function resizeContemplative(){if(!cCanvas)return;const dpr=Math.min(devicePixelRatio||1,1.5);cCanvas.width=innerWidth*dpr;cCanvas.height=innerHeight*dpr;cCtx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resizeContemplative,{passive:true});
  /* spawn escreve em layer.particles; o contemplativo usa um proxy com o mesmo formato. */
  function spawnInto(list,front){const proxy={front,particles:[]};spawn(proxy,true);list.push(...proxy.particles)}
  function drawContemplative(){
    if(!shell?.classList.contains('open')){requestAnimationFrame(drawContemplative);return}
    cCtx.clearRect(0,0,innerWidth,innerHeight);
    const target=Math.max(24,Math.round(maxParticles(false)*.9));
    while(cParticles.length<target)spawnInto(cParticles,Math.random()<.3);
    cParticles=cParticles.filter(p=>!drawParticle(cCtx,p,16));
    requestAnimationFrame(drawContemplative);
  }
  requestAnimationFrame(drawContemplative);
  function syncContemplative(){if(shell&&document.body.classList.contains('performance-mode'))cParticles.length=0}
  function openContemplative(){const s=createContemplative();s.classList.add('open');s.setAttribute('aria-hidden','false');document.body.classList.add('contemplative-active');s.querySelector('.contemplative-back')?.focus()}
  function closeContemplative(){if(!shell)return;shell.classList.remove('open');shell.setAttribute('aria-hidden','true');document.body.classList.remove('contemplative-active');cParticles.length=0;document.querySelector('[data-contemplative="cinzas"]')?.focus()}
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-contemplative="cinzas"]'))openContemplative();
    if(e.target.closest('[data-close-contemplative]'))closeContemplative();
    if(e.target.closest('[data-contemplative-music]'))document.querySelector('[data-music-power]')?.click();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('contemplative-active')){e.preventDefault();closeContemplative()}});

  injectSettings();applyVisualSettings();
})();
