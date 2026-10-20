(() => {
 'use strict';
 const config={
 'dinastia-polar':{theme:'polar',saga:'ciclo-de-jesed',title:'Kaeliran',subtitle:'Dinastia Polar · à sombra do poder',background:'city-v1',foreground:'balcony-v1',color:'#e2c783',count:26},
 'os-elos-das-sombras':{theme:'carnam',saga:'diario-sobrenatural',title:'Rua dos Afogados',subtitle:'Os Elos das Sombras · diante da casa dos Carnam',background:'house-v1',foreground:'branches-v1',color:'#b4c8d3',count:24},
 'guerras-de-sangue':{theme:'kaendar',saga:'ciclo-de-jesed',title:'Kaendar',subtitle:'Guerras de Sangue · às margens do Rio Grande',background:'city-v1',foreground:'shore-v1',color:'#edbf7f',count:65},
 'a-lenda-da-aurora':{theme:'aurora',saga:'spacetheft',title:'Aurora',subtitle:'A Lenda da Aurora · observatório da Lebargan',background:'space-v1',foreground:'window-v1',color:'#bedfff',count:35}
 }[document.body.dataset.book];
 if(!config)throw Error('Cenário desconhecido');
 const base=`assets/books/${config.saga}/${document.body.dataset.book}/contemplative/`;
 const image=(file,cls)=>`<img class="${cls}" src="${base}${file}.webp" alt="" draggable="false" decoding="async">`;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,raf=0,last=0,width=0,height=0,idleTimer;
 document.body.classList.add('theme-'+config.theme);
 let layers='';
 if(config.theme==='carnam')layers='<div class="scene-clouds"></div><div class="house-light"></div><div class="scene-fog"></div>'+image(config.foreground,'landscape-front');
 if(config.theme==='kaendar')layers='<div class="scene-clouds"></div><div class="river-motion"></div><div class="river-glimmer"></div><div class="city-smoke"></div><div class="scene-fog"></div>'+image(config.foreground,'landscape-front shore-fixed')+image(config.foreground,'landscape-front banner-sway');
 if(config.theme==='aurora')layers=`<div class="white-dwarf"></div><div class="aurora-planet">${image('planet-v1','')}</div>${image('ship-v1','distant-ship')}${image('ship-v1','distant-ship second')}${image('ship-v1','passing-ship')}${image(config.foreground,'landscape-front')}<div class="window-reflection"></div>`;
 if(config.theme==='polar'){
  const lights=[[61.3,44.2],[56.5,39.8],[64.4,39.9],[50.6,63.8],[54.7,63.5],[35.1,79],[39.5,78.6],[27.3,67],[20.9,64],[45.1,73.3],[58.8,83.1],[64.2,74.7],[69,73.7]];
  layers=`<div class="polar-city-plane">${image(config.background,'polar-city')}<div class="polar-cloud-shade"></div>${lights.map(([x,y],i)=>`<i class="polar-flame" style="left:${x}%;top:${y}%;--delay:-${i*1.7}s;--duration:${5+(i%4)}s"></i>`).join('')}<div class="polar-fog polar-fog-far"></div><div class="polar-fog polar-fog-near"></div></div>${image(config.foreground,'landscape-front polar-balcony')}${image('cloth-v1','polar-cloth')}`;
 }
 const background=config.theme==='polar'?'':image(config.background,'landscape-image');
 document.body.innerHTML=`<div class="landscape" aria-hidden="true">${background}${layers}<canvas class="landscape-particles"></canvas><div class="landscape-shade"></div></div><div class="scene-ui"><div class="scene-top"><button data-scene-close type="button">← Voltar</button><div class="scene-actions"><button data-scene-pause type="button" aria-pressed="${paused}">${paused?'Retomar movimentos':'Pausar movimentos'}</button><button data-scene-full type="button">Tela cheia</button></div></div><div class="scene-bottom"><div><h1 class="scene-title">${config.title}</h1><p class="scene-subtitle">${config.subtitle}</p></div><div class="scene-audio"><button data-scene-music type="button">♪ Música</button><label>Volume <input data-scene-volume type="range" min="0" max="1" step=".01" value=".35" aria-label="Volume da música"></label></div></div></div>`;
 const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d'),particles=[];
 const enabled=!parent.document.body.classList.contains('no-particles');
 function resize(){const dpr=Math.min(devicePixelRatio||1,1.5);width=innerWidth;height=innerHeight;canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 function draw(t){raf=0;if(paused||document.hidden||!enabled)return;const dt=Math.min((t-last)||16,48)/16;last=t;ctx.clearRect(0,0,width,height);ctx.fillStyle=config.color;for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x>width+8)p.x=-8;if(p.y< -8)p.y=height+8;ctx.globalAlpha=p.alpha*(.8+.2*Math.sin(t/2200+p.phase));ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;raf=requestAnimationFrame(draw);}
 function start(){cancelAnimationFrame(raf);if(!paused&&!document.hidden&&enabled){last=performance.now();raf=requestAnimationFrame(draw);}}
 resize();for(let i=0;i<(innerWidth<700?Math.round(config.count*.65):config.count);i++)particles.push({x:Math.random()*width,y:Math.random()*height,vx:.04+Math.random()*.2,vy:-(.025+Math.random()*.15),size:.45+Math.random()*(config.theme==='kaendar'?1.5:.7),alpha:.15+Math.random()*(config.theme==='kaendar'?.5:.22),phase:Math.random()*6.3});
 function syncMusic(){const source=parent.document.querySelector('[data-music-power]'),button=document.querySelector('[data-scene-music]'),playing=source?.getAttribute('aria-pressed')==='true';button.textContent=playing?'Ⅱ Pausar música':'♪ Tocar música';button.disabled=!source||source.disabled;if(!source)button.textContent='Música ainda não disponível';document.querySelector('[data-scene-volume]').closest('label').hidden=!source;button.setAttribute('aria-pressed',String(playing));const volume=parent.document.querySelector('[data-music-volume]');if(volume)document.querySelector('[data-scene-volume]').value=volume.value;}
 function wake(){document.body.classList.remove('ui-resting');clearTimeout(idleTimer);idleTimer=setTimeout(()=>{if(!document.querySelector(':focus-visible')&&!document.querySelector('input:focus'))document.body.classList.add('ui-resting');},6000);}
 document.addEventListener('click',async event=>{wake();if(event.target.closest('[data-scene-close]'))parent.postMessage({type:'contemplative:close'},location.origin);if(event.target.closest('[data-scene-pause]')){paused=!paused;document.body.classList.toggle('motion-paused',paused);const button=document.querySelector('[data-scene-pause]');button.textContent=paused?'Retomar movimentos':'Pausar movimentos';button.setAttribute('aria-pressed',String(paused));if(paused)cancelAnimationFrame(raf);else start();}if(event.target.closest('[data-scene-music]')){parent.document.querySelector('[data-music-power]')?.click();syncMusic();}if(event.target.closest('[data-scene-full]')){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{}}});
 document.querySelector('[data-scene-full]').hidden=!document.fullscreenEnabled;
 document.querySelector('[data-scene-volume]').addEventListener('input',event=>{const source=parent.document.querySelector('[data-music-volume]');if(source){source.value=event.target.value;source.dispatchEvent(new parent.Event('input',{bubbles:true}));}wake();});
 for(const event of ['pointermove','pointerdown','keydown','focusin'])document.addEventListener(event,wake,{passive:true});
 addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('motion-paused',document.hidden||paused);if(document.hidden)cancelAnimationFrame(raf);else start();});
 reduced.addEventListener('change',()=>{paused=reduced.matches;document.body.classList.toggle('motion-paused',paused);const button=document.querySelector('[data-scene-pause]');button.textContent=paused?'Retomar movimentos':'Pausar movimentos';button.setAttribute('aria-pressed',String(paused));start();});
 addEventListener('message',event=>{if(event.source===parent&&event.origin===location.origin&&event.data?.type==='contemplative:sync')syncMusic();});
 addEventListener('pagehide',()=>{cancelAnimationFrame(raf);clearTimeout(idleTimer);},{once:true});
 document.body.classList.toggle('motion-paused',paused);syncMusic();wake();
 window.LANDSCAPE_READY=Promise.all([...document.images].map(img=>img.decode())).then(start);
})();

