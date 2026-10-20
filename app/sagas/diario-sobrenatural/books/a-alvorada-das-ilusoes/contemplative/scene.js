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
 function schedule(first){clearTimeout(nextTimer);if(paused||document.hidden)return;nextTimer=setTimeout(()=>reveal(false),first?rand(900,1800):rand(1200,5500));}
 // Vários pedaços da cena (céu, casas, rua, torre…) piscam de uma vez, com corte seco.
 function place(big){
  const n=big?1:1+Math.floor(Math.random()*3),img=[],size=[],pos=[];
  for(let i=0;i<n;i++){
   const kind=big?3:Math.floor(Math.random()*4);
   let w,h;
   if(kind===0){w=rand(14,34);h=rand(14,34);}          // retalho pequeno
   else if(kind===1){w=rand(50,95);h=rand(5,16);}      // faixa horizontal (glitch)
   else if(kind===2){w=rand(8,20);h=rand(35,80);}      // faixa vertical
   else {w=big?100:rand(45,80);h=big?100:rand(40,75);} // pedaço grande
   const x=rand(0,100-w),y=rand(0,100-h);
   img.push('radial-gradient(ellipse closest-side at 50% 50%,#000 48%,rgba(0,0,0,.55) 74%,transparent 100%)');size.push(w.toFixed(1)+'% '+h.toFixed(1)+'%');
   pos.push((w>=99.5?0:x/(100-w)*100).toFixed(1)+'% '+(h>=99.5?0:y/(100-h)*100).toFixed(1)+'%');
  }
  const st=failure.style;
  for(const pre of ['','-webkit-']){st.setProperty(pre+'mask-image',img.join(','));st.setProperty(pre+'mask-size',size.join(','));st.setProperty(pre+'mask-position',pos.join(','));st.setProperty(pre+'mask-repeat','no-repeat');}
 }
 const on=(goat)=>{failure.style.transition=apparition.style.transition='none';failure.classList.add('visible');if(goat)apparition.classList.add('visible');};
 const off=()=>{failure.style.transition=apparition.style.transition='none';failure.classList.remove('visible');apparition.classList.remove('visible');};
 const fadeOut=(sec)=>{failure.style.transition=apparition.style.transition='opacity '+sec+'s ease-in-out';failure.classList.remove('visible');apparition.classList.remove('visible');};
 // Mesmo pedaço pisca várias vezes (como um bug), fixa 1–2 s e some em fade suave; só então outro pedaço aparece.
 function placeFull(){const st=failure.style;for(const pre of ['','-webkit-']){st.setProperty(pre+'mask-image','none');}}
 function burst(goat){
  const full=Math.random()<.2;           // às vezes a tela inteira pisca e muda de uma vez
  const showGoat=goat||Math.random()<.4; // a aparição pode surgir em qualquer piscada
  const n=2+Math.floor(Math.random()*4);let t=0;
  for(let i=0;i<n;i++){
   const last=i===n-1,onMs=rand(35,110),offMs=rand(40,170);
   later(()=>{if(i===0){full?placeFull():place(false);}on(showGoat&&(last||i>=n-2));},t);
   if(last){const hold=full?rand(2200,4200):rand(1000,2000),out=rand(.7,1.2);t+=hold;later(()=>fadeOut(out),t);t+=out*1000;}
   else{t+=onMs;later(off,t);t+=offMs;}
  }
  return t;
 }
 function reveal(manual){
  if(document.hidden)return;
  clearTimeout(nextTimer);timers.forEach(clearTimeout);timers=[];sequence++;
  let total;
  if(manual){place(true);on(true);later(()=>fadeOut(.8),1300);total=2300;}
  else total=burst(false);
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
