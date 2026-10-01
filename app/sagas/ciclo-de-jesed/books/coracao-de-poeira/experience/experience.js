(()=>{
  const X=window.DIExperience;if(!X)return;
  const P='je-dust-';
  const defaults={sand:true,spiral:true,shadows:true,lights:true,haze:true,'sand-front':true,'sand-density':65,'motion-intensity':38,'effect-opacity':86};
  const getBool=k=>X.bool(P+k,defaults[k]),getNum=(k,min=0,max=100)=>X.num(P+k,defaults[k],min,max);
  Object.entries(defaults).forEach(([k,v])=>{if(X.storage.get(P+k)===null)X.storage.set(P+k,typeof v==='boolean'?(v?'1':'0'):v)});
  // maxParticles reduz a densidade em weakDevice sem desligar nem persistir uma versão empobrecida da atmosfera.

  /* ---- Grãos de areia e poeira (duas camadas) ---- */
  const back=document.createElement('canvas'),front=document.createElement('canvas');
  back.id='cpSandCanvas';front.id='cpSandCanvasFront';
  back.setAttribute('aria-hidden','true');front.setAttribute('aria-hidden','true');
  document.body.prepend(front);document.body.prepend(back);
  const layers=[{canvas:back,ctx:back.getContext('2d'),front:false,particles:[]},{canvas:front,ctx:front.getContext('2d'),front:true,particles:[]}];
  let running=true,last=performance.now();
  function resize(){const dpr=Math.min(devicePixelRatio||1,1.6);for(const layer of layers){layer.canvas.width=Math.round(innerWidth*dpr);layer.canvas.height=Math.round(innerHeight*dpr);layer.canvas.style.width=innerWidth+'px';layer.canvas.style.height=innerHeight+'px';layer.ctx.setTransform(dpr,0,0,dpr,0,0)}}
  addEventListener('resize',resize,{passive:true});resize();
  function maxParticles(isFront){let density=getNum('sand-density');if(X.weakDevice)density*=.6;if(X.reduced)density*=.35;return Math.round(density*(isFront?.30:1.0))}
  function spawn(layer){
    const motion=getNum('motion-intensity')/100;
    // areia deriva horizontalmente mais do que cai
    layer.particles.push({
      x:Math.random()*innerWidth,y:Math.random()*innerHeight,life:0,
      vy:(-.04+Math.random()*.08)*(.3+motion),
      vx:(.04+Math.random()*.18)*(.6+motion)*(Math.random()<.5?1:-1),
      size:(layer.front?1.4:0.9)+Math.random()*(layer.front?2.8:2.4),
      max:12000+Math.random()*20000,
      alpha:(layer.front?.12:.09)+Math.random()*.22,
      sway:Math.random()*Math.PI*2,
      spiralAngle:Math.random()*Math.PI*2,
      spiralRadius:6+Math.random()*20,
      spiralSpeed:(.001+Math.random()*.003)*(Math.random()<.5?1:-1)
    });
  }
  function drawParticle(targetCtx,p,dt){
    p.life+=dt;const t=p.life/p.max;
    p.spiralAngle+=p.spiralSpeed*dt;
    p.x+=(p.vx+Math.cos(p.spiralAngle)*p.spiralRadius*.001+Math.sin(p.life*.0002+p.sway)*.03)*dt/16;
    p.y+=(p.vy+Math.sin(p.spiralAngle)*p.spiralRadius*.001)*dt/16;
    if(p.x<0)p.x+=innerWidth;if(p.x>innerWidth)p.x-=innerWidth;
    const fade=Math.sin(Math.PI*Math.min(1,t));
    targetCtx.save();targetCtx.globalAlpha=Math.max(0,p.alpha*fade);
    const g=targetCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3.8);
    g.addColorStop(0,'rgba(215,197,155,.88)');g.addColorStop(.6,'rgba(168,139,88,.5)');g.addColorStop(1,'rgba(168,139,88,0)');
    targetCtx.fillStyle=g;targetCtx.beginPath();targetCtx.arc(p.x,p.y,p.size*3.8,0,Math.PI*2);targetCtx.fill();
    targetCtx.restore();
    return t>=1;
  }
  function active(){return !document.hidden&&!document.body.classList.contains('performance-mode')&&!document.body.classList.contains('no-particles')&&getBool('sand')}
  function frame(now){
    const dt=Math.min(40,now-last);last=now;
    const frontOn=getBool('sand-front');
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
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  document.addEventListener('visibilitychange',()=>{last=performance.now()});

  /* ---- Anel temporal rotativo ---- */
  const ring=document.createElement('div');
  ring.id='cpTemporalRing';ring.setAttribute('aria-hidden','true');
  ring.innerHTML='<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="none" stroke="#a88b58" stroke-width="0.8"><circle cx="200" cy="200" r="160" stroke-dasharray="40 20 8 32" opacity=".6"/><circle cx="200" cy="200" r="130" stroke-dasharray="6 18 60 10" opacity=".4"/><circle cx="200" cy="200" r="100" stroke-dasharray="24 14" opacity=".28"/><circle cx="200" cy="200" r="70" stroke-dasharray="4 12 36 8" opacity=".18"/></g></svg>';
  document.body.prepend(ring);

  /* ---- Luzes âmbar quase extintas ---- */
  const lights=document.createElement('div');
  lights.id='cpDistantLights';lights.setAttribute('aria-hidden','true');
  document.body.prepend(lights);
  function buildLights(){
    lights.innerHTML='';
    const count=X.mobile?8:14;
    for(let i=0;i<count;i++){
      const dot=document.createElement('span');
      dot.style.left=`${3+Math.random()*94}%`;
      dot.style.top=`${40+Math.random()*48}%`;
      dot.style.setProperty('--cp-light-duration',`${11+Math.random()*12}s`);
      dot.style.setProperty('--cp-light-delay',`${-Math.random()*16}s`);
      dot.style.setProperty('--cp-light-size',`${1.0+Math.random()*1.5}px`);
      lights.appendChild(dot);
    }
  }
  buildLights();

  /* ---- Névoa de areia ---- */
  const haze=document.createElement('div');
  haze.id='cpHaze';haze.setAttribute('aria-hidden','true');
  document.body.prepend(haze);

  function applyVisualSettings(){
    document.body.style.setProperty('--cp-effect-opacity',getNum('effect-opacity')/100);
    lights.style.display=getBool('lights')&&!document.body.classList.contains('performance-mode')?'block':'none';
    haze.style.display=getBool('haze')&&!document.body.classList.contains('performance-mode')?'block':'none';
    ring.style.display=getBool('spiral')&&!document.body.classList.contains('performance-mode')?'grid':'none';
    document.body.classList.toggle('cp-no-shadow-drift',!getBool('shadows'));
    for(const layer of layers)layer.particles.length=0;
  }

  const settingsHost=document.getElementById('settingsContent');
  function injectSettings(){
    if(!settingsHost||settingsHost.querySelector('[data-dust-experience-settings]'))return;
    settingsHost.insertAdjacentHTML('beforeend',`<section class="experience-settings-section" data-dust-experience-settings><h3>Atmosfera de Coração de Poeira</h3><p class="experience-settings-note">Controlos específicos deste livro.</p>${X.makeToggle({key:'sand',prefix:P,label:'Areia e poeira',description:'Grãos de areia e poeira em deriva lenta.',value:getBool('sand')})}${X.makeToggle({key:'spiral',prefix:P,label:'Anel temporal',description:'Anel de espirais temporais a rodar muito lentamente.',value:getBool('spiral')})}${X.makeToggle({key:'shadows',prefix:P,label:'Sombras',description:'Sombras a deslocar-se lentamente.',value:getBool('shadows')})}${X.makeToggle({key:'lights',prefix:P,label:'Luz quase extinta',description:'Pontos de luz âmbar a pulsarem ao fundo.',value:getBool('lights')})}${X.makeToggle({key:'haze',prefix:P,label:'Névoa de areia',description:'Névoa horizontal de areia suspensa.',value:getBool('haze')})}${X.makeToggle({key:'sand-front',prefix:P,label:'Areia à frente',description:'Permite que parte da areia passe por cima do conteúdo.',value:getBool('sand-front')})}${X.makeRange({key:'sand-density',prefix:P,label:'Densidade da areia',description:'Quantidade de grãos em suspensão.',value:getNum('sand-density'),min:10,max:100})}${X.makeRange({key:'motion-intensity',prefix:P,label:'Intensidade do movimento',description:'Velocidade de deriva dos grãos.',value:getNum('motion-intensity'),min:0,max:100})}${X.makeRange({key:'effect-opacity',prefix:P,label:'Opacidade dos efeitos',description:'Visibilidade geral da atmosfera.',value:getNum('effect-opacity'),min:20,max:100})}</section>`);
  }
  if(settingsHost){X.attachSettings(settingsHost,()=>{X.storage.set(P+'customized','1');applyVisualSettings();setTimeout(injectSettings)});new MutationObserver(injectSettings).observe(settingsHost,{childList:true})}

  const profileValues={
    full:{sand:1,spiral:1,shadows:1,lights:1,haze:1,'sand-front':1,'sand-density':84,'motion-intensity':48,'effect-opacity':100},
    normal:{sand:1,spiral:1,shadows:1,lights:1,haze:1,'sand-front':1,'sand-density':65,'motion-intensity':38,'effect-opacity':86},
    performance:{sand:0,spiral:0,shadows:0,lights:0,haze:0,'sand-front':0,'sand-density':0,'motion-intensity':0,'effect-opacity':28}
  };
  function applyProfile(name){const values=profileValues[name];if(!values)return;Object.entries(values).forEach(([k,v])=>X.storage.set(P+k,v));X.storage.set(P+'customized','0');setTimeout(applyVisualSettings,60)}
  document.addEventListener('click',e=>{const p=e.target.closest('[data-preset]')?.dataset.preset;if(p)applyProfile(p)});
  X.observePerformance(()=>applyVisualSettings());

  /* ---- Modo contemplativo ---- */
  let shell=null,cCanvas=null,cCtx=null,cParticles=[];
  function createContemplative(){
    if(shell)return shell;
    shell=document.createElement('section');
    shell.className='contemplative-shell cp-contemplative';shell.id='cpContemplative';shell.setAttribute('aria-hidden','true');
    shell.innerHTML='<div class="contemplative-scene"><canvas id="cpContemplativeCanvas" aria-hidden="true"></canvas><button class="contemplative-back" type="button" data-close-contemplative title="Voltar à página">← Voltar</button><button class="contemplative-music-action" type="button" data-contemplative-music title="Ligar ou desligar música">♪ Música</button><div class="contemplative-caption">Coração de Poeira · silêncio entre os grãos do tempo</div></div>';
    document.body.append(shell);
    cCanvas=shell.querySelector('canvas');cCtx=cCanvas.getContext('2d');resizeContemplative();
    return shell;
  }
  function resizeContemplative(){if(!cCanvas)return;const dpr=Math.min(devicePixelRatio||1,1.5);cCanvas.width=innerWidth*dpr;cCanvas.height=innerHeight*dpr;cCtx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resizeContemplative,{passive:true});
  function drawContemplative(){
    if(!shell?.classList.contains('open')){requestAnimationFrame(drawContemplative);return}
    cCtx.clearRect(0,0,innerWidth,innerHeight);
    while(cParticles.length<Math.max(8,Math.round(maxParticles(false)*.4))){
      cParticles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vy:(-.02+Math.random()*.04)*.5,vx:(.02+Math.random()*.1)*(Math.random()<.5?1:-1),size:.6+Math.random()*1.8,life:0,max:16000+Math.random()*18000,alpha:.04+Math.random()*.12,sway:Math.random()*6,spiralAngle:Math.random()*Math.PI*2,spiralRadius:4+Math.random()*12,spiralSpeed:(.0008+Math.random()*.002)*(Math.random()<.5?1:-1)});
    }
    cParticles=cParticles.filter(p=>!drawParticle(cCtx,p,16));
    requestAnimationFrame(drawContemplative);
  }
  requestAnimationFrame(drawContemplative);
  function openContemplative(){const s=createContemplative();s.classList.add('open');s.setAttribute('aria-hidden','false');document.body.classList.add('contemplative-active');s.querySelector('.contemplative-back')?.focus()}
  function closeContemplative(){if(!shell)return;shell.classList.remove('open');shell.setAttribute('aria-hidden','true');document.body.classList.remove('contemplative-active');cParticles.length=0;document.querySelector('[data-contemplative="dust"]')?.focus()}
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-contemplative="dust"]'))openContemplative();
    if(e.target.closest('[data-close-contemplative]'))closeContemplative();
    if(e.target.closest('[data-contemplative-music]'))document.querySelector('[data-music-power]')?.click();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('contemplative-active')){e.preventDefault();closeContemplative()}});

  injectSettings();applyVisualSettings();
})();
