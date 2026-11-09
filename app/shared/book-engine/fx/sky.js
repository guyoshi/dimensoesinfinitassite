/* Módulo: ciclo de dia e noite. Calcula fase, cores do céu, sol/luas e estrelas; publica variáveis CSS,
 * body[data-sky-phase] (dawn|day|dusk|night) e o evento 'ruinas:sky-update' (usado pelo modo contemplativo).
 * Livros ligam com DI_BOOK.book.fx.sky = { ... }. O tema pode reagir a body[data-sky-phase="night"]. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DEF = {
    varPrefix: 'rdc', cycleMinutes: 10, startMinutes: 360, moonSmall: true, stars: true,
    phases: {
      dawn: { top: '#426d88', mid: '#aabfc6', bottom: '#e5b889', light: '#fff2d2', shadow: '#708c9b', stars: .12 },
      day: { top: '#69a7c2', mid: '#b9d8df', bottom: '#e7dcc0', light: '#ffffff', shadow: '#7c9da8', stars: 0 },
      dusk: { top: '#3d6681', mid: '#aa8990', bottom: '#e29b67', light: '#ffd8b2', shadow: '#6a7186', stars: .12 },
      night: { top: '#081625', mid: '#193247', bottom: '#4b5061', light: '#7792a8', shadow: '#182b3d', stars: .72 }
    },
    keyframes: [[300, 'dawn'], [480, 'day'], [990, 'dusk'], [1200, 'night']]
  };
  let cfg = null, key = '', timer = null, dragging = false, paused = false, manual = 1110, pausedAt = 0, anchorReal = 0, anchorMin = 0, enabled = true, mobileSlow = false;
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch {} }
  };
  const ses = {
    get(k, d = null) { try { const v = sessionStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { sessionStorage.setItem(k, String(v)); } catch {} }
  };
  const hex = h => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const toHex = a => '#' + a.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const x = hex(a), y = hex(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)); };
  const pad = n => String(n).padStart(2, '0');
  const label = m => { m = Math.floor(Number(m) || 0); return `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`; };
  const cycleMs = () => cfg.cycleMinutes * 60 * 1000;
  const nowMin = () => { const el = ((Date.now() - anchorReal) % cycleMs() + cycleMs()) % cycleMs(); return (anchorMin + el / cycleMs() * 1440) % 1440; };
  const anchor = m => { anchorMin = (Number(m) + 1440) % 1440; anchorReal = Date.now(); ses.set(key + 'anchor-min', anchorMin); ses.set(key + 'anchor-real', anchorReal); };
  const live = () => dragging ? manual : paused ? pausedAt : nowMin();
  const phaseFor = m => (m >= 300 && m < 480) ? 'dawn' : (m >= 480 && m < 990) ? 'day' : (m >= 990 && m < 1200) ? 'dusk' : 'night';
  function blend(m) {
    const K = cfg.keyframes, n = K.length; let cur = n - 1;
    for (let i = 0; i < n; i++) if (m >= K[i][0]) cur = i;
    const nxt = (cur + 1) % n, a = K[cur][0], b = K[nxt][0];
    const span = b > a ? b - a : b + 1440 - a, pos = m >= a ? m - a : m + 1440 - a, t = Math.max(0, Math.min(1, pos / span));
    const P = cfg.phases[K[cur][1]], Q = cfg.phases[K[nxt][1]];
    const o = {}; for (const k of ['top', 'mid', 'bottom', 'light', 'shadow']) o[k] = mix(P[k], Q[k], t);
    o.stars = P.stars + (Q.stars - P.stars) * t; return o;
  }
  function update(minutes = live()) {
    if (!cfg || !enabled) return;
    minutes = (minutes + 1440) % 1440;
    const phase = phaseFor(minutes), c = blend(minutes), st = document.documentElement.style, p = '--' + cfg.varPrefix + '-';
    st.setProperty(p + 'sky-top', c.top); st.setProperty(p + 'sky-mid', c.mid); st.setProperty(p + 'sky-bottom', c.bottom);
    st.setProperty(p + 'cloud-light', c.light); st.setProperty(p + 'cloud-shadow', c.shadow); st.setProperty(p + 'stars-opacity', cfg.stars ? c.stars : 0);
    let sunO = 0, moonO = 0, smO = 0, sx = 50, sy = 70, mx = 50, my = 70, smx = 50, smy = 70;
    if (minutes >= 360 && minutes <= 1200) { const q = (minutes - 360) / 840; sx = 6 + q * 88; sy = 76 - Math.sin(Math.PI * q) * 62; sunO = Math.min(1, Math.max(0, Math.sin(Math.PI * q) * 1.45)); }
    if (minutes >= 1200 || minutes <= 360) {
      const el = minutes >= 1200 ? minutes - 1200 : minutes + 240, q = el / 600;
      mx = 6 + q * 88; my = 72 - Math.sin(Math.PI * q) * 55; moonO = Math.min(1, Math.max(.15, Math.sin(Math.PI * q) * 1.2));
      if (cfg.moonSmall) { const sec = (el / 465 + .16) % 1; smx = -8 + sec * 116; smy = 70 - Math.sin(Math.PI * sec) * 39; smO = Math.max(0, Math.min(.78, Math.min(1, sec * 12, (1 - sec) * 12) * .78)); }
    }
    st.setProperty(p + 'sun-x', sx + '%'); st.setProperty(p + 'sun-y', sy + '%'); st.setProperty(p + 'sun-opacity', sunO);
    st.setProperty(p + 'moon-x', mx + '%'); st.setProperty(p + 'moon-y', my + '%'); st.setProperty(p + 'moon-opacity', moonO);
    st.setProperty(p + 'moon-small-x', smx + '%'); st.setProperty(p + 'moon-small-y', smy + '%'); st.setProperty(p + 'moon-small-opacity', smO);
    if (document.body.dataset.skyPhase !== phase) document.body.dataset.skyPhase = phase;
    document.dispatchEvent(new CustomEvent('ruinas:sky-update', { detail: { minutes, phase } }));
    const disp = Math.round(minutes / 10) * 10 % 1440;
    document.querySelectorAll('[data-time-output]').forEach(o => o.textContent = label(disp));
    document.querySelectorAll('[data-time-slider]').forEach(i => { if (document.activeElement !== i) i.value = disp; });
    document.querySelectorAll('[data-time-pause]').forEach(b => { b.setAttribute('aria-pressed', String(paused)); b.textContent = paused ? '▶' : '⏸'; b.title = paused ? 'Retomar o relógio' : 'Pausar o relógio'; b.setAttribute('aria-label', b.title); });
  }
  function controls() {
    const ctrl = document.querySelector('.ctrl'); if (!ctrl || ctrl.querySelector('[data-time-control]')) return;
    const m = live();
    ctrl.insertAdjacentHTML('afterbegin', `<div class="time-control" data-time-control><span class="tc-ico" aria-hidden="true">◐</span><input data-time-slider type="range" min="0" max="1430" step="10" value="${Math.round(m / 10) * 10 % 1440}" aria-label="Hora do dia"><output data-time-output>${label(m)}</output><button type="button" data-time-pause aria-pressed="false" aria-label="Pausar o relógio">⏸</button></div>`);
  }
  function startClock() { clearInterval(timer); update(); timer = setInterval(() => { if (!document.hidden && enabled) update(); }, mobileSlow ? 2500 : 1200); }
  const api = {
    name: 'sky',
    init(B, o) {
      const f = B.book.fx && B.book.fx.sky; if (!f) return;
      cfg = Object.assign({}, DEF, f); cfg.phases = Object.assign({}, DEF.phases, f.phases || {}); key = `di-${B.book.id}-sky-`;
      enabled = store.get(key + 'on', '1') !== '0';
      mobileSlow = matchMedia('(max-width:900px)').matches;
      manual = Number(ses.get(key + 'manual', 1110)); pausedAt = manual;
      anchorMin = Number(ses.get(key + 'anchor-min', cfg.startMinutes)); anchorReal = Number(ses.get(key + 'anchor-real', Date.now()));
      const root = (o && o.root) || document.getElementById('fxRoot');
      const el = document.createElement('div'); el.id = 'skyAtmos'; el.className = 'sky-atmos'; el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<div class="sky-stars"></div><div class="sky-celestial sky-sun"></div><div class="sky-celestial sky-moon"></div>' + (cfg.moonSmall ? '<div class="sky-celestial sky-moon-small"></div>' : '') + '<div class="sky-distant"></div>';
      root.prepend(el);
      controls(); document.documentElement.classList.toggle('sky-off', !enabled);
      document.addEventListener('input', e => { if (!e.target.matches('[data-time-slider]')) return; dragging = true; manual = Math.round(Number(e.target.value) / 10) * 10; update(manual); });
      document.addEventListener('change', e => {
        if (!e.target.matches('[data-time-slider]')) return; dragging = false;
        if (paused) pausedAt = manual; else anchor(manual); ses.set(key + 'manual', manual); update();
      });
      document.addEventListener('click', e => {
        if (!e.target.closest('[data-time-pause]')) return;
        if (paused) { anchor(pausedAt); paused = false; } else { pausedAt = live(); paused = true; }
        update();
      });
      document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
      startClock();
    },
    configure(c) { document.body.classList.toggle('sky-calm', !!c && c.preset === 'performance'); },
    settingsHtml() { return cfg ? `<label class="setrow"><span><strong>Ciclo de dia e noite</strong><small>Céu, sol, luas e tema que escurece à noite.</small></span><input type="checkbox" id="optSky" ${enabled ? 'checked' : ''}></label>` : ''; },
    bindSettings(root) {
      const box = root && root.querySelector('#optSky'); if (!box) return;
      box.addEventListener('change', () => {
        enabled = box.checked; store.set(key + 'on', enabled ? '1' : '0');
        document.documentElement.classList.toggle('sky-off', !enabled);
        if (enabled) update(); else delete document.body.dataset.skyPhase;
      });
    }
  };
  (window.DIFX = window.DIFX || { use() {} }).use(api);
})();
