/* Módulo: nuvens em camadas (distante, média, próxima, frontal) e planadores opcionais.
 * Independente do ciclo de dia e noite (usa as cores publicadas por sky.js quando existem).
 * Config: DI_BOOK.book.fx.clouds = { density:86, gliders:true }. Marcação compatível com o modo contemplativo. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const weak = matchMedia('(max-width:900px)').matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  let cfg = null, key = '', host = null, front = null, flights = null, preset = 'full', on = true, lastSig = '';
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch {} }
  };
  const seeded = (i, o = 0) => { const x = Math.sin((i + 1) * 9301 + o * 49297) * 233280; return x - Math.floor(x); };
  function layer(name, count, baseW, seed) {
    let h = `<div class="cloud-layer cloud-layer-${name}">`;
    for (let i = 0; i < count; i++) {
      const r = seeded(i, seed), r2 = seeded(i, seed + 2), r3 = seeded(i, seed + 5);
      const w = baseW * (.78 + r * .72), top = (name === 'near' ? 8 : name === 'middle' ? 10 : 24) + r2 * (name === 'distant' ? 40 : 52);
      const dur = (name === 'distant' ? 135 : name === 'middle' ? 84 : 50) * (.78 + r3 * .62);
      const op = (name === 'distant' ? .4 : name === 'middle' ? .66 : .34) * (.82 + r2 * .36);
      h += `<div class="natural-cloud natural-cloud-${name}" style="--top:${top}%;--w:${w}px;--duration:${dur}s;--delay:${-r * dur}s;--opacity:${op};--scale:${.82 + r2 * .42};--rise:${-10 + r3 * 22}px"><span class="cloud-body"></span></div>`;
    }
    return h + '</div>';
  }
  const GLIDER = '<svg viewBox="0 0 128 58" aria-hidden="true" focusable="false"><path class="glider-wing" d="M5 23 Q29 5 63 13 Q95 3 123 22 Q105 24 86 23 Q70 19 63 23 Q43 20 26 28 Z"/><path class="glider-rib" d="M5 23 Q65 8 123 22 M26 28 Q64 20 100 28"/><path class="glider-pilot" d="M62 24 L66 24 L64 38 Z"/></svg>';
  const FLIGHTS = [
    { top: '19%', width: 105, duration: 46, delay: -13, dir: 'ltr', alpha: .62 },
    { top: '38%', width: 64, duration: 68, delay: -42, dir: 'rtl', alpha: .46 },
    { top: '56%', width: 82, duration: 55, delay: -28, dir: 'ltr', alpha: .42 }
  ];
  function build() {
    if (!cfg || !host) return;
    const calm = preset === 'performance' || reduced || !on;
    const compact = weak || preset === 'balanced';
    let factor = (cfg.density || 86) / 60; if (compact) factor = Math.min(.6, factor * .44);
    const sig = [calm, compact, factor.toFixed(2), cfg.gliders].join('|'); if (sig === lastSig) return; lastSig = sig;
    let h = '', f = '';
    if (!calm) {
      h += layer('distant', Math.max(2, Math.round(6 * factor)), 560, 1) + layer('middle', Math.max(2, Math.round(8 * factor)), 370, 11);
      if (!compact) { h += layer('near', Math.max(1, Math.round(3 * factor)), 680, 21); f += layer('near', Math.max(1, Math.round(2 * factor)), 760, 31) + layer('middle', Math.max(1, Math.round(2 * factor)), 420, 41); }
    }
    host.innerHTML = h; if (front) front.innerHTML = f;
    if (flights) flights.innerHTML = (!calm && cfg.gliders) ? (compact ? FLIGHTS.slice(0, 2) : FLIGHTS).map(g => `<span class="sky-glider" data-direction="${g.dir}" style="--glider-top:${g.top};--glider-width:${g.width}px;--glider-duration:${g.duration}s;--glider-delay:${g.delay}s;--glider-alpha:${g.alpha}">${GLIDER}</span>`).join('') : '';
  }
  const api = {
    name: 'clouds',
    init(B, o) {
      const f = B.book.fx && B.book.fx.clouds; if (!f) return;
      cfg = Object.assign({ density: 86, gliders: false }, f); key = `di-${B.book.id}-clouds-`;
      on = store.get(key + 'on', '1') !== '0';
      const root = (o && o.root) || document.getElementById('fxRoot');
      host = document.createElement('div'); host.id = 'clouds'; host.className = 'clouds-layer'; host.setAttribute('aria-hidden', 'true'); root.append(host);
      front = document.createElement('div'); front.id = 'cloudsFront'; front.className = 'clouds-layer clouds-layer-front'; front.setAttribute('aria-hidden', 'true'); document.body.append(front);
      flights = root.querySelector('.sky-distant');
      document.addEventListener('visibilitychange', () => [host, front, flights].forEach(e => e && e.classList.toggle('fx-paused', document.hidden)));
      build();
    },
    configure(c) { preset = (c && c.preset) || 'full'; build(); },
    suspend() { [host, front, flights].forEach(e => e && e.classList.add('fx-paused')); },
    resume() { [host, front, flights].forEach(e => e && e.classList.remove('fx-paused')); },
    settingsHtml() { return cfg ? `<label class="setrow"><span><strong>Nuvens</strong><small>Camadas de nuvens ${cfg.gliders ? 'e planadores ' : ''}em movimento.</small></span><input type="checkbox" id="optClouds" ${on ? 'checked' : ''}></label>` : ''; },
    bindSettings(root) {
      const box = root && root.querySelector('#optClouds'); if (!box) return;
      box.addEventListener('change', () => { on = box.checked; store.set(key + 'on', on ? '1' : '0'); lastSig = ''; build(); });
    }
  };
  (window.DIFX = window.DIFX || { use() {} }).use(api);
})();
