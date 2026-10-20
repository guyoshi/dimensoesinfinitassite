(() => {
 'use strict';
 const base='assets/books/diario-sobrenatural/a-alvorada-das-ilusoes/contemplative/';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=reduced.matches,sequence=0,nextTimer,clearTimer,idleTimer;
 const image=(file,cls)=>`<img class="${cls}" src="${base}${file}.webp" alt="" draggable="false" decoding="async">`;
 document.body.innerHTML=`<div class="alvorada-scene" aria-hidden="true">${image('city-day-v1','alvorada-image')}<div class="alvorada-failure">${image('city-night-v2','alvorada-image')}<div class="alvorada-fog"></div></div>${image('goat-v1','alvorada-apparition')}<div class="alvorada-pollen">${Array.from({length:22},(_,i)=>`<i style="left:${(i*43.3+7)%100}%;top:${(i*27.1+5)%100}%;--duration:${18+i%9}s;--delay:-${i%15}s"></i>`).join('')}</div><div class="alvorada-shade"></div></div>
 <div class="alvorada-ui"><div class="alvorada-top"><button type="button" data-alvorada-close>← Voltar</button><div class="alvorada-actions"><button type="button" data-alvorada-pause aria-pressed="${paused}">${paused?'Falhas pausadas':'Pausar falhas'}</button><button type="button" data-alvorada-reveal>Revelar por um instante</button><button type="button" data-alvorada-full>Tela cheia</button></div></div><p class="alvorada-hint">Alvorada Alegre · há algo por trás da paisagem</p><div class="alvorada-bottom"><div><h1 class="alvorada-title">Alvorada Alegre</h1><p class="alvorada-subtitle">A Alvorada das Ilusões · Diário Sobrenatural</p></div><div class="alvorada-audio"><button type="button" data-alvorada-music>♪ Música</button><label>Volume <input data-alvorada-volume type="range" min="0" max="1" step=".01" value=".35" aria-label="Volume da música"></label></div></div></div>`;
 const failure=document.querySelector('.alvorada-failure'),apparition=document.querySelector('.alvorada-apparition');
 let timers=[];
 const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id);return id;};
 const rand=(a,b)=>a+Math.random()*(b-a);
 const stop=()=>{clearTimeout(nextTimer);timers.forEach(clearTimeout);timers=[];failure.classList.remove('visible');apparition.classList.remove('visible');};
 // Primeira falha logo no começo; depois a cada 4–12 s, de forma irregular.
 function schedule(first){clearTimeout(nextTimer);if(paused||document.hidden)return;nextTimer=setTimeout(()=>reveal(false),first?rand(1800,3200):rand(4000,12000));}
 function place(){
  const w=rand(34,62),h=rand(34,62),x=rand(0,100-w),y=rand(4,96-h);
  // janela suave (bordas esfumadas), nunca um recorte seco
  failure.style.setProperty('--mx',x+'%');failure.style.setProperty('--my',y+'%');
  failure.style.setProperty('--mw',w+'%');failure.style.setProperty('--mh',h+'%');
 }
 function setFade(sec){failure.style.setProperty('--fade',sec+'s');apparition.style.setProperty('--fade',sec+'s');}
 // Lampejo: 2 a 4 piscadas rápidas, como um bug da realidade.
 function burst(withGoat){
  place();const n=2+Math.floor(Math.random()*3);let t=0;
  for(let i=0;i<n;i++){
   const on=rand(60,190),off=rand(50,230);
   later(()=>{setFade(.09);failure.classList.add('visible');if(withGoat&&i===n-1){apparition.style.setProperty('--fade','.25s');apparition.classList.add('visible');}},t);
   t+=on;
   later(()=>{setFade(i===n-1?.55:.09);failure.classList.remove('visible');apparition.classList.remove('visible');},t);
   t+=off;
  }
  return t+600;
 }
 // Aparição lenta: surge e some em fade bem suave.
 function soft(withGoat,manual){
  place();if(manual)failure.style.setProperty('--mx','12%'),failure.style.setProperty('--my','10%'),failure.style.setProperty('--mw','76%'),failure.style.setProperty('--mh','80%');
  const inT=rand(1.1,1.7),hold=manual?3200:rand(1200,2400),outT=rand(1.6,2.4);
  setFade(inT);failure.classList.add('visible');if(withGoat)apparition.classList.add('visible');
  later(()=>{setFade(outT);failure.classList.remove('visible');apparition.classList.remove('visible');},inT*1000+hold);
  return (inT+outT)*1000+hold+200;
 }
 function reveal(manual){
  if(document.hidden)return;
  clearTimeout(nextTimer);timers.forEach(clearTimeout);timers=[];sequence++;
  const goat=manual||sequence%4===0;
  const total=manual?soft(true,true):Math.random()<.7?burst(goat):soft(goat,false);
  later(()=>schedule(false),total);
 }
 function wake(){document.body.classList.remove('controls-hidden');clearTimeout(idleTimer);idleTimer=setTimeout(()=>{if(!document.querySelector(':focus-visible')&&!document.querySelector('input:focus'))document.body.classList.add('controls-hidden');},6000);}
 function syncMusic(){const source=parent.document.querySelector('[data-music-power]'),playing=source?.getAttribute('aria-pressed')==='true';const button=document.querySelector('[data-alvorada-music]');button.textContent=playing?'Ⅱ Pausar música':'♪ Tocar música';button.disabled=!source||source.disabled;button.setAttribute('aria-pressed',String(playing));const volume=parent.document.querySelector('[data-music-volume]');if(volume)document.querySelector('[data-alvorada-volume]').value=volume.value;}
 document.addEventListener('click',async event=>{
  wake();
  if(event.target.closest('[data-alvorada-close]'))parent.postMessage({type:'contemplative:close'},location.origin);
  if(event.target.closest('[data-alvorada-pause]')){paused=!paused;stop();document.body.classList.toggle('effects-paused',paused);const button=document.querySelector('[data-alvorada-pause]');button.textContent=paused?'Retomar falhas':'Pausar falhas';button.setAttribute('aria-pressed',String(paused));schedule();}
  if(event.target.closest('[data-alvorada-reveal]'))reveal(true);
  if(event.target.closest('[data-alvorada-music]')){parent.document.querySelector('[data-music-power]')?.click();syncMusic();}
  if(event.target.closest('[data-alvorada-full]')){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{}}
 });
 document.querySelector('[data-alvorada-full]').hidden=!document.fullscreenEnabled;
 document.querySelector('[data-alvorada-volume]').addEventListener('input',event=>{const source=parent.document.querySelector('[data-music-volume]');if(source){source.value=event.target.value;source.dispatchEvent(new parent.Event('input',{bubbles:true}));}wake();});
 for(const event of ['pointermove','pointerdown','keydown','focusin'])document.addEventListener(event,wake,{passive:true});
 document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('effects-paused',document.hidden||paused);if(document.hidden)stop();else schedule();});
 reduced.addEventListener('change',()=>{paused=reduced.matches;stop();document.body.classList.toggle('effects-paused',paused);const button=document.querySelector('[data-alvorada-pause]');button.textContent=paused?'Retomar falhas':'Pausar falhas';button.setAttribute('aria-pressed',String(paused));schedule();});
 addEventListener('message',event=>{if(event.source===parent&&event.origin===location.origin&&event.data?.type==='contemplative:sync')syncMusic();});
 addEventListener('pagehide',()=>{stop();clearTimeout(idleTimer);},{once:true});
 if(parent.document.body.classList.contains('no-particles'))document.querySelector('.alvorada-pollen').remove();
 document.body.classList.toggle('effects-paused',paused);syncMusic();wake();
 window.ALVORADA_READY=Promise.all([...document.images].map(img=>img.decode())).then(()=>schedule(true));
})();
