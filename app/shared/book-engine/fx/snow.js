/* Módulo: neve suja, cinza caindo, névoa fria e aurora ao fundo (canvas). Independente dos demais módulos de efeitos.
 * Config: DI_BOOK.book.fx.snow = { density:80, motion:40, opacity:80, front:true, aurora:true }. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const weak = matchMedia('(max-width:900px)').matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch {} }
  };
  let cfg = null, key = '', on = true, preset = 'full', layers = [], raf = 0, last = 0, t0 = 0, suspended = false, gust = 0, tgust = 0, nextGust = 0;
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    layers.forEach(l => { l.canvas.width = Math.round(innerWidth * dpr); l.canvas.height = Math.round(innerHeight * dpr); l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); });
  }
  const limit = front => { let d = cfg.density; if (weak) d *= .6; if (preset === 'balanced') d *= .6; return Math.round(d * (front ? .22 : 1)); };
  function spawn(l) {
    const r = Math.random, f = l.front, m = cfg.motion / 100, roll = r();
    const type = roll < .62 ? 'flake' : roll < .88 ? 'ash' : 'mist';
    const p = { type, x: r() * (innerWidth + 200) - 100, y: -20 - r() * 60, life: 0, rot: r() * 6.28, ph: r() * 6.28 };
    if (type === 'flake') Object.assign(p, { vx: -.05 + r() * .1, vy: (.25 + r() * .55) * (.5 + m), size: (f ? 2 : .9) + r() * (f ? 3.4 : 2), max: 16000 + r() * 12000, alpha: .3 + r() * .5 });
    if (type === 'ash') Object.assign(p, { vx: (r() - .5) * .2, vy: (.18 + r() * .3) * (.5 + m), size: (f ? 3 : 1.4) + r() * (f ? 5 : 3), max: 18000 + r() * 12000, alpha: .12 + r() * .25, turn: (r() - .5) * .01 });
    if (type === 'mist') Object.assign(p, { y: r() * innerHeight, x: -140, vx: .1 + r() * .22, vy: 0, size: 90 + r() * 140, max: 22000 + r() * 14000, alpha: .03 + r() * .04 });
    l.list.push(p);
  }
  function drawP(ctx, p, dt) {
    p.life += dt; const t = p.life / p.max;
    p.x += (p.vx + gust * (p.type === 'mist' ? .8 : .5) + Math.sin(p.life * .0009 + p.ph) * .12) * dt / 16; p.y += p.vy * dt / 16; p.rot += (p.turn || .003) * dt;
    const a = (p.alpha || .3) * Math.min(1, Math.sin(Math.PI * Math.min(1, t)) * 3); if (a <= 0) return;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = a;
    if (p.type === 'flake') { ctx.fillStyle = 'rgb(226,234,242)'; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, 6.283); ctx.fill(); }
    else if (p.type === 'ash') { ctx.fillStyle = 'rgb(150,160,172)'; ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .62); }
    else { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size); g.addColorStop(0, 'rgba(170,190,210,.55)'); g.addColorStop(1, 'rgba(170,190,210,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, 6.283); ctx.fill(); }
    ctx.restore();
  }
  function deco(ctx, now) {
    if (!cfg.aurora) return;
    const tt = (now - t0) / 1000, w = innerWidth, h = innerHeight;
    for (let i = 0; i < 3; i++) {
      const y = h * (.12 + i * .1), amp = 38 + i * 16, ph = tt * (.12 + i * .05) + i * 2, a = .1 - i * .025;
      const g = ctx.createLinearGradient(0, y - 80, 0, y + 120);
      g.addColorStop(0, 'rgba(120,200,190,0)'); g.addColorStop(.45, `rgba(${i ? 130 : 110},${i ? 170 : 210},${i ? 220 : 200},${a})`); g.addColorStop(1, 'rgba(120,150,210,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, y + 120);
      for (let x = 0; x <= w; x += 40) ctx.lineTo(x, y + Math.sin(x * .0042 + ph) * amp + Math.sin(x * .011 - ph * 1.7) * amp * .35);
      ctx.lineTo(w, y + 120); ctx.closePath(); ctx.fill();
    }
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || suspended) { last = now; return; }
    const dt = Math.min(64, now - last || 16); last = now;
    if (now > nextGust) { tgust = (Math.random() - .4) * .5; nextGust = now + 3000 + Math.random() * 5000; }
    gust += (tgust - gust) * .01;
    layers.forEach(l => {
      l.ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (l.deco && !weak) deco(l.ctx, now);
      const max = limit(l.front);
      if (l.list.length < max && Math.random() < .6) spawn(l);
      l.list = l.list.filter(p => p.life < p.max && p.y > -240 && p.y < innerHeight + 240 && p.x > -240 && p.x < innerWidth + 240);
      l.list.forEach(p => drawP(l.ctx, p, dt));
    });
  }
  function start() {
    stop(); if (!cfg || !on || reduced || preset === 'performance') { layers.forEach(l => l.canvas.hidden = true); return; }
    layers.forEach(l => { l.canvas.hidden = l.front && (!cfg.front || preset === 'balanced' || weak); });
    last = t0 = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; layers.forEach(l => { l.list = []; l.ctx.clearRect(0, 0, innerWidth, innerHeight); }); }
  const api = {
    name: 'snow',
    init(B, o) {
      const f = B.book.fx && B.book.fx.snow; if (!f) return;
      cfg = Object.assign({ density: 80, motion: 40, opacity: 80, front: true, aurora:true }, f); key = `di-${B.book.id}-snow-`;
      on = store.get(key + 'on', '1') !== '0';
      const root = (o && o.root) || document.getElementById('fxRoot');
      const mk = (id, front, deco, host) => {
        const c = document.createElement('canvas'); c.id = id; c.className = 'snow-canvas' + (front ? ' snow-front' : ''); c.setAttribute('aria-hidden', 'true');
        c.style.opacity = String((cfg.opacity / 100) * (front ? .6 : .85)); host.append(c);
        return { canvas: c, ctx: c.getContext('2d'), front, deco, list: [] };
      };
      layers = [mk('snowBack', false, true, root), mk('snowFront', true, false, document.body)];
      size(); addEventListener('resize', size, { passive: true }); start();
    },
    configure(c) { preset = (c && c.preset) || 'full'; start(); },
    suspend() { suspended = true; }, resume() { suspended = false; },
    settingsHtml() { return cfg ? `<label class="setrow"><span><strong>Neve e cinza</strong><small>Neve suja, cinza caindo e aurora fria ao fundo.</small></span><input type="checkbox" id="optSnow" ${on ? 'checked' : ''}></label>` : ''; },
    bindSettings(root) {
      const box = root && root.querySelector('#optSnow'); if (!box) return;
      box.addEventListener('change', () => { on = box.checked; store.set(key + 'on', on ? '1' : '0'); start(); });
    }
  };
  (window.DIFX = window.DIFX || { use() {} }).use(api);
})();
