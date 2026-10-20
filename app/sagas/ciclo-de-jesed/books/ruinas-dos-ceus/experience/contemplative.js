(() => {
  'use strict';
  if (document.body.dataset.book !== 'ruinas-dos-ceus') return;
  const base = 'assets/books/ciclo-de-jesed/ruinas-dos-ceus/contemplative/';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let dialog, idleTimer, opener, previousOverflow, ownsFullscreen = false, paused = reduced.matches;
  const image = (file, classes) => `<img class="${classes}" src="${base}${file}.webp" alt="" draggable="false" decoding="async">`;
  function create() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.className = 'eterea-dialog';
    dialog.setAttribute('aria-label', 'Contemplar Etérea ao longo do dia e da noite');
    dialog.innerHTML = `<div class="eterea-world" aria-hidden="true">
      <div class="eterea-layer eterea-heavens" style="--depth:.15">${image('sky-day-v2', 'eterea-sky eterea-sky-day')}${image('sky-dusk-v3', 'eterea-sky eterea-sky-dusk')}${image('sky-night-v3', 'eterea-sky eterea-sky-night')}<div class="eterea-starfield">${Array.from({length:75},(_,i)=>`<i style="left:${(i*37.71+4)%100}%;top:${(i*19.63+7)%67}%;width:${i%6===0?2:1}px;height:${i%6===0?2:1}px;opacity:${.35+(i%7)/11}"></i>`).join('')}</div><div class="eterea-solar-glow"></div><div class="eterea-sun-disc"></div><div class="eterea-moon-disc"></div></div>
      <div class="eterea-layer" style="--depth:.3"><div class="eterea-central">${image('central-v2', 'eterea-central-day')}${image('central-night-v2', 'eterea-central-night')}</div></div>
      <div class="eterea-layer eterea-kites" style="--depth:.38">${[0,1,2,3,4].map(i => `<div class="eterea-kite kite-${i}">${image('vintela-v2', '')}</div>`).join('')}</div>
      <div class="eterea-layer" style="--depth:.45">${image('cloud', 'eterea-cloud rear')}</div>
      <div class="eterea-layer" style="--depth:.7">${image('island', 'eterea-island left')}${image('island', 'eterea-island right')}</div>
      <div class="eterea-layer" style="--depth:1">${image('cloud', 'eterea-cloud front')}${image('cloud', 'eterea-cloud side')}</div>
      <div class="eterea-layer" style="--depth:1.5">${image('rock', 'eterea-rock one')}${image('rock', 'eterea-rock two')}${image('rock', 'eterea-rock three')}</div>
      <div class="eterea-light"></div></div>
      <div class="eterea-ui"><div class="eterea-top"><button type="button" data-eterea-close autofocus>← Voltar</button><div class="eterea-actions"><button type="button" data-eterea-motion aria-pressed="false">Pausar movimentos</button><button type="button" data-eterea-full aria-pressed="false">Tela cheia</button></div></div>
      <div class="eterea-time"><label>Hora de Etérea <input data-time-slider type="range" min="0" max="1430" step="10" value="360" aria-label="Hora de Etérea"></label><output data-time-output>06:00</output><button data-time-pause type="button" aria-pressed="false" aria-label="Pausar o relógio">⏸</button></div>
      <p class="eterea-hint">Mova o cursor ou toque para mostrar os controles · Esc para voltar</p>
      <div class="eterea-bottom"><div><h1 class="eterea-title">Etérea</h1><p class="eterea-subtitle">Ruínas dos Céus · entre a luz e o infinito</p></div>
      <div class="eterea-audio"><button type="button" data-eterea-music aria-pressed="false">♪ Música</button><label>Volume <input data-eterea-volume type="range" min="0" max="1" step="0.01" value="0.35" aria-label="Volume da música"></label></div></div></div>`;
    document.body.append(dialog);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('click', async event => {
      wake();
      if (event.target.closest('[data-eterea-close]')) close();
      if (event.target.closest('[data-eterea-motion]')) { paused = !paused; syncMotion(); }
      if (event.target.closest('[data-eterea-music]')) { document.querySelector('[data-music-power]')?.click(); syncMusic(); }
      if (event.target.closest('[data-eterea-full]')) {
        try {
          if (document.fullscreenElement === dialog) await document.exitFullscreen();
          else if (!document.fullscreenElement) { await dialog.requestFullscreen(); ownsFullscreen = true; }
        } catch { window.DIExperience?.toast('Tela cheia indisponível neste navegador.'); }
      }
    });
    dialog.querySelector('[data-eterea-full]').hidden = !document.fullscreenEnabled;
    dialog.querySelector('[data-eterea-volume]').addEventListener('input', event => {
      const input = document.querySelector('[data-music-volume]');
      if (input) { input.value = event.target.value; input.dispatchEvent(new Event('input', { bubbles: true })); }
      wake();
    });
    dialog.addEventListener('pointermove', event => {
      wake();
      if (paused || reduced.matches || event.pointerType !== 'mouse') return;
      dialog.style.setProperty('--look-x', `${(event.clientX / innerWidth - .5) * -14}px`);
      dialog.style.setProperty('--look-y', `${(event.clientY / innerHeight - .5) * -9}px`);
    }, { passive: true });
    dialog.addEventListener('pointerdown', wake, { passive: true });
    dialog.addEventListener('keydown', wake);
    dialog.addEventListener('focusin', wake);
    dialog.addEventListener('focusout', wake);
    dialog.addEventListener('pointerleave', () => { dialog.style.setProperty('--look-x', '0px'); dialog.style.setProperty('--look-y', '0px'); });
    const player = document.getElementById('bookMusicPlayer');
    if (player) new MutationObserver(syncMusic).observe(player, { subtree: true, attributes: true, attributeFilter: ['aria-pressed', 'disabled', 'data-state'] });
    document.addEventListener('fullscreenchange', () => {
      const full = document.fullscreenElement === dialog;
      if (!full) ownsFullscreen = false;
      dialog.querySelector('[data-eterea-full]').textContent = full ? 'Sair da tela cheia' : 'Tela cheia';
      dialog.querySelector('[data-eterea-full]').setAttribute('aria-pressed', String(full));
    });
    reduced.addEventListener('change', () => { paused = reduced.matches; syncMotion(); });
    syncMotion();
    syncSky(Number(document.querySelector('.topbar [data-time-slider]')?.value || 360));
  }
  // The existing page clock remains the sole owner of time, including manual changes.
  function syncSky(minutes) {
    if (!dialog) return;
    const stops = [[0,0,0],[300,0,.15],[360,.18,.85],[480,1,0],[960,1,0],[1080,.55,1],[1200,0,.2],[1440,0,0]];
    const m = ((minutes % 1440) + 1440) % 1440;
    let a=stops[0],b=stops[1];
    for(let i=0;i<stops.length-1;i++) if(m>=stops[i][0]&&m<=stops[i+1][0]) {a=stops[i];b=stops[i+1];break;}
    const t=(m-a[0])/(b[0]-a[0]);
    const daylight=a[1]+(b[1]-a[1])*t, warmth=a[2]+(b[2]-a[2])*t;
    const night=1-daylight;
    const blendStops=[[0,0,1,0],[300,0,1,0],[360,1,0,.1],[480,0,0,1],[960,0,0,1],[1050,1,0,.2],[1080,1,0,.08],[1140,1,0,.02],[1200,0,1,0],[1440,0,1,0]];
    let low=blendStops[0],high=blendStops[1];
    for(let i=0;i<blendStops.length-1;i++) if(m>=blendStops[i][0]&&m<=blendStops[i+1][0]){low=blendStops[i];high=blendStops[i+1];break;}
    const p=(m-low[0])/(high[0]-low[0]);
    const duskWeight=low[1]+(high[1]-low[1])*p,nightWeight=low[2]+(high[2]-low[2])*p;
    dialog.style.setProperty('--eterea-sky-dusk', (nightWeight>=1?0:duskWeight/(1-nightWeight)).toFixed(4));
    dialog.style.setProperty('--eterea-sky-night', nightWeight.toFixed(4));
    dialog.style.setProperty('--eterea-silhouette', (low[3]+(high[3]-low[3])*p).toFixed(4));
    dialog.style.setProperty('--eterea-day', daylight.toFixed(4));
    dialog.style.setProperty('--eterea-night', night.toFixed(4));
    dialog.style.setProperty('--eterea-brightness', (.31+.69*daylight).toFixed(4));
    dialog.style.setProperty('--eterea-warmth', warmth.toFixed(4));
    dialog.style.setProperty('--eterea-star-alpha', (night*night*.9).toFixed(4));
    dialog.dataset.skyPhase=document.body.dataset.skyPhase || 'dawn';
    dialog.querySelectorAll('[data-time-slider]').forEach(input=>{if(document.activeElement!==input)input.value=Math.round(m/10)*10%1440;});
    const rounded=Math.round(m/10)*10%1440;
    dialog.querySelector('[data-time-output]').textContent=`${String(Math.floor(rounded/60)).padStart(2,'0')}:${String(rounded%60).padStart(2,'0')}`;
  }
  function syncMotion() {
    dialog.classList.toggle('motion-paused', paused || reduced.matches);
    const button = dialog.querySelector('[data-eterea-motion]');
    button.textContent = paused || reduced.matches ? 'Retomar movimentos' : 'Pausar movimentos';
    button.setAttribute('aria-pressed', String(paused || reduced.matches));
    button.disabled = reduced.matches;
    if (reduced.matches) button.textContent = 'Movimento reduzido';
  }
  function syncMusic() {
    if (!dialog) return;
    const source = document.querySelector('[data-music-power]');
    const button = dialog.querySelector('[data-eterea-music]');
    const playing = source?.getAttribute('aria-pressed') === 'true';
    button.textContent = playing ? 'Ⅱ Pausar música' : '♪ Tocar música';
    button.setAttribute('aria-pressed', String(playing));
    button.disabled = !source || source.disabled;
    const volume = document.querySelector('[data-music-volume]');
    if (volume) dialog.querySelector('[data-eterea-volume]').value = volume.value;
  }
  function wake() {
    if (!dialog?.open) return;
    dialog.classList.remove('ui-resting');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!dialog.open) return;
      if (dialog.querySelector(':focus-visible') || dialog.querySelector('input:focus')) return;
      dialog.classList.add('ui-resting');
    }, 5000);
  }
  function open(trigger) {
    create();
    if (dialog.open) return;
    opener = trigger;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    syncSky(Number(document.querySelector('.topbar [data-time-slider]')?.value || 360));
    syncMusic();
    wake();
  }
  function close() {
    if (!dialog?.open) return;
    if (ownsFullscreen && document.fullscreenElement === dialog) document.exitFullscreen().catch(() => {});
    clearTimeout(idleTimer);
    dialog.close();
    document.body.style.overflow = previousOverflow;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  }
  // Capture the existing entry before the legacy scene's delegated listener.
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-contemplative="ruinas"]');
    if (!trigger) return;
    event.preventDefault(); event.stopImmediatePropagation(); open(trigger);
  }, true);
  document.addEventListener('visibilitychange', () => dialog?.classList.toggle('page-hidden', document.hidden));
  document.addEventListener('ruinas:sky-update', event => syncSky(event.detail.minutes));
})();
