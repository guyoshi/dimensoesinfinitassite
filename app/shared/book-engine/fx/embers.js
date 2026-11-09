/* Módulo: brasas, faíscas, cinza e poeira quente (canvas). Independente dos demais módulos de efeitos.
 * Config: DI_BOOK.book.fx.embers = { density:92, motion:52, opacity:86, front:true }. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const weak = matchMedia('(max-width:900px)').matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch {} }
  };
  let cfg = null, key = '', on = true, preset = 'full', layers = [], raf = 0, last = 0, wind = 0, targetWind = 0, nextGust = 0, suspended = false;

  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    layers.forEach(l => { l.canvas.width = Math.round(innerWidth * dpr); l.canvas.height = Math.round(innerHeight * dpr); l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); });
  }
  const limit = front => {
    let d = cfg.density; if (weak) d *= .6; if (preset === 'balanced') d *= .6;
    return Math.round(d * (front ? .24 : 1));
  };
  function spawn(l) {
    const r = Math.random, f = l.front, m = cfg.motion / 100, roll = r();
    const type = roll < .5 ? 'ember' : roll < .78 ? 'ash' : (roll < .86 && !f) ? 'dust' : (roll < .93 ? 'spark' : 'ash');
    const p = { type, x: r() * innerWidth, y: innerHeight + 20 + r() * 80, life: 0, rot: r() * 6.28 };
    if (type === 'ember') Object.assign(p, { vx: (r() - .5) * .25, vy: -(.22 + r() * .48) * (.5 + m), size: (f ? 2.6 : 1) + r() * (f ? 3.8 : 2.8), max: 7500 + r() * 9000, alpha: .25 + r() * .55, fl: r() * 8 });
    if (type === 'spark') Object.assign(p, { vx: (r() - .5) * 1.8, vy: -(2.4 + r() * 3.5), size: f ? 2.2 : 1.3, max: 380 + r() * 600, alpha: .7 + r() * .3, len: 7 + r() * 18 });
    if (type === 'ash') Object.assign(p, { vx: (r() - .5) * .35, vy: -(.12 + r() * .24), size: (f ? 3 : 1.5) + r() * (f ? 6 : 4), max: 9000 + r() * 13000, alpha: .08 + r() * .24, turn: (r() - .5) * .018, fall: .4 + r() * .4 });
    if (type === 'dust') Object.assign(p, { vx: .12 + r() * .4, vy: (r() - .5) * .04, size: 18 + r() * 55, max: 12000 + r() * 13000, alpha: .015 + r() * .04 });
    l.list.push(p);
  }
  function draw(ctx, p, dt) {
    p.life += dt; const t = p.life / p.max;
    if (p.type === 'ash' && t > p.fall) p.vy += .00012 * dt;
    p.x += (p.vx + wind * (p.type === 'dust' ? 1.8 : .6)) * dt / 16; p.y += p.vy * dt / 16; p.rot += (p.turn || .002) * dt;
    const a = (p.alpha || .3) * Math.sin(Math.PI * Math.min(1, t)); if (a <= 0) return;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = a;
    if (p.type === 'ember') { const fl = .75 + .25 * Math.sin(p.life * .012 + p.fl); ctx.fillStyle = `rgb(255,${125 + Math.round(fl * 70)},55)`; ctx.shadowBlur = 6 + p.size; ctx.shadowColor = 'rgba(255,116,35,.65)'; ctx.beginPath(); ctx.arc(0, 0, p.size * fl, 0, 6.283); ctx.fill(); }
    else if (p.type === 'spark') { ctx.strokeStyle = 'rgba(255,196,103,.95)'; ctx.lineWidth = p.size; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-p.vx * p.len, p.len); ctx.stroke(); }
    else if (p.type === 'ash') { ctx.fillStyle = 'rgba(190,176,160,.9)'; ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .66); }
    else { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size); g.addColorStop(0, 'rgba(226,150,82,.55)'); g.addColorStop(1, 'rgba(226,150,82,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, 6.283); ctx.fill(); }
    ctx.restore();
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || suspended) { last = now; return; }
    const dt = Math.min(64, now - last || 16); last = now;
    if (now > nextGust) { targetWind = (Math.random() - .35) * 1.2; nextGust = now + 3000 + Math.random() * 5000; }
    wind += (targetWind - wind) * .01;
    layers.forEach(l => {
      l.ctx.clearRect(0, 0, innerWidth, innerHeight);
      const max = limit(l.front);
      if (l.list.length < max && Math.random() < .6) spawn(l);
      l.list = l.list.filter(p => p.life < p.max && p.y > -60 && p.x > -80 && p.x < innerWidth + 80);
      l.list.forEach(p => draw(l.ctx, p, dt));
    });
  }
  function start() {
    stop(); if (!cfg || !on || reduced || preset === 'performance') { layers.forEach(l => l.canvas.hidden = true); return; }
    layers.forEach((l, i) => { l.canvas.hidden = l.front && (!cfg.front || preset === 'balanced' || weak); });
    last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; layers.forEach(l => { l.list = []; l.ctx.clearRect(0, 0, innerWidth, innerHeight); }); }
  const api = {
    name: 'embers',
    init(B, o) {
      const f = B.book.fx && B.book.fx.embers; if (!f) return;
      cfg = Object.assign({ density: 92, motion: 52, opacity: 86, front: true }, f); key = `di-${B.book.id}-embers-`;
      on = store.get(key + 'on', '1') !== '0';
      const root = (o && o.root) || document.getElementById('fxRoot');
      const mk = (id, front, host) => {
        const c = document.createElement('canvas'); c.id = id; c.className = 'embers-canvas' + (front ? ' embers-front' : ''); c.setAttribute('aria-hidden', 'true');
        c.style.opacity = String((cfg.opacity / 100) * (front ? .58 : .72)); host.append(c);
        return { canvas: c, ctx: c.getContext('2d'), front, list: [] };
      };
      layers = [mk('embersBack', false, root), mk('embersFront', true, document.body)];
      size(); addEventListener('resize', size, { passive: true }); start();
    },
    configure(c) { preset = (c && c.preset) || 'full'; start(); },
    suspend() { suspended = true; }, resume() { suspended = false; },
    settingsHtml() { return cfg ? `<label class="setrow"><span><strong>Brasas e cinzas</strong><small>Brasas, faíscas e cinza subindo pela tela.</small></span><input type="checkbox" id="optEmbers" ${on ? 'checked' : ''}></label>` : ''; },
    bindSettings(root) {
      const box = root && root.querySelector('#optEmbers'); if (!box) return;
      box.addEventListener('change', () => { on = box.checked; store.set(key + 'on', on ? '1' : '0'); start(); });
    }
  };
  (window.DIFX = window.DIFX || { use() {} }).use(api);
})();
