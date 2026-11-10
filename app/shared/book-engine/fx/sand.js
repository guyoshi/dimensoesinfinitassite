/* Módulo: areia ao vento, poeira suspensa, brilhos de ampulheta e espiral temporal (canvas). Independente dos demais módulos de efeitos.
 * Config: DI_BOOK.book.fx.sand = { density:90, motion:45, opacity:80, front:true, spiral:true }. */
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
    const type = roll < .62 ? 'grain' : roll < .86 ? 'wisp' : 'glow';
    const p = { type, x: -30 - r() * 80, y: r() * innerHeight, life: 0, rot: r() * 6.28 };
    if (type === 'grain') Object.assign(p, { vx: (.5 + r() * 1.3) * (.5 + m), vy: (r() - .45) * .25, size: (f ? 1.6 : .7) + r() * (f ? 2.6 : 1.5), max: 9000 + r() * 8000, alpha: .25 + r() * .5 });
    if (type === 'wisp') Object.assign(p, { vx: (.25 + r() * .6) * (.5 + m), vy: (r() - .5) * .1, size: 70 + r() * 150, max: 14000 + r() * 12000, alpha: .035 + r() * .05 });
    if (type === 'glow') Object.assign(p, { x: r() * innerWidth, vx: 0, vy: -.05 - r() * .08, size: 3 + r() * 6, max: 5000 + r() * 5000, alpha: .5 + r() * .4 });
    l.list.push(p);
  }
  function drawP(ctx, p, dt) {
    p.life += dt; const t = p.life / p.max;
    p.x += (p.vx + gust * .9) * dt / 16; p.y += p.vy * dt / 16;
    const a = (p.alpha || .3) * Math.min(1, Math.sin(Math.PI * Math.min(1, t)) * 3); if (a <= 0) return;
    ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = a;
    if (p.type === 'grain') { ctx.fillStyle = 'rgb(214,188,132)'; ctx.fillRect(0, 0, p.size, p.size); }
    else if (p.type === 'wisp') { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size); g.addColorStop(0, 'rgba(200,170,115,.6)'); g.addColorStop(1, 'rgba(200,170,115,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, p.size * 1.6, p.size * .7, 0, 0, 6.283); ctx.fill(); }
    else { ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(255,225,160,.9)'; ctx.fillStyle = 'rgb(255,236,190)'; ctx.beginPath(); ctx.arc(0, 0, p.size * .5, 0, 6.283); ctx.fill(); }
    ctx.restore();
  }
  function deco(ctx, now) {
    if (!cfg.spiral) return;
    const tt = (now - t0) / 1000, cx = innerWidth * .74, cy = innerHeight * .46, R = Math.max(innerWidth, innerHeight) * .55;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(tt * .02 * (cfg.motion / 40)); ctx.lineWidth = 1.2;
    for (let k = 0; k < 2; k++) {
      ctx.save(); ctx.rotate(k * Math.PI); ctx.strokeStyle = `rgba(200,170,115,${.17 - k * .05})`; ctx.beginPath();
      for (let a = 0; a < 12.5; a += .08) { const r = R * (.03 + a / 13); const x = Math.cos(a) * r, y = Math.sin(a) * r; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke(); ctx.restore();
    }
    ctx.restore();
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || suspended) { last = now; return; }
    const dt = Math.min(64, now - last || 16); last = now;
    if (now > nextGust) { tgust = (Math.random() - .4) * 1.4; nextGust = now + 3000 + Math.random() * 5000; }
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
    name: 'sand',
    init(B, o) {
      const f = B.book.fx && B.book.fx.sand; if (!f) return;
      cfg = Object.assign({ density: 90, motion: 45, opacity: 80, front: true, spiral:true }, f); key = `di-${B.book.id}-sand-`;
      on = store.get(key + 'on', '1') !== '0';
      const root = (o && o.root) || document.getElementById('fxRoot');
      const mk = (id, front, deco, host) => {
        const c = document.createElement('canvas'); c.id = id; c.className = 'sand-canvas' + (front ? ' sand-front' : ''); c.setAttribute('aria-hidden', 'true');
        c.style.opacity = String((cfg.opacity / 100) * (front ? .6 : .85)); host.append(c);
        return { canvas: c, ctx: c.getContext('2d'), front, deco, list: [] };
      };
      layers = [mk('sandBack', false, true, root), mk('sandFront', true, false, document.body)];
      size(); addEventListener('resize', size, { passive: true }); start();
    },
    configure(c) { preset = (c && c.preset) || 'full'; start(); },
    suspend() { suspended = true; }, resume() { suspended = false; },
    settingsHtml() { return cfg ? `<label class="setrow"><span><strong>Areia e espiral</strong><small>Areia ao vento, poeira suspensa e espiral do tempo ao fundo.</small></span><input type="checkbox" id="optSand" ${on ? 'checked' : ''}></label>` : ''; },
    bindSettings(root) {
      const box = root && root.querySelector('#optSand'); if (!box) return;
      box.addEventListener('change', () => { on = box.checked; store.set(key + 'on', on ? '1' : '0'); start(); });
    }
  };
  (window.DIFX = window.DIFX || { use() {} }).use(api);
})();
