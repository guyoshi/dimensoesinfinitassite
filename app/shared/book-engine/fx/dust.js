/* Módulo: poeira de pedra, reflexos dourados, fumaça de incenso e anéis concêntricos girando (canvas).
 * Config: DI_BOOK.book.fx.dust = { density:70, motion:40, opacity:80, rings:true, front:true }. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const weak = matchMedia('(max-width:900px)').matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch {} }
  };
  let cfg = null, key = '', on = true, preset = 'full', layers = [], raf = 0, last = 0, t0 = 0, suspended = false;

  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    layers.forEach(l => { l.canvas.width = Math.round(innerWidth * dpr); l.canvas.height = Math.round(innerHeight * dpr); l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); });
  }
  const limit = front => { let d = cfg.density; if (weak) d *= .6; if (preset === 'balanced') d *= .6; return Math.round(d * (front ? .22 : 1)); };
  function spawn(l) {
    const r = Math.random, f = l.front, m = cfg.motion / 100, roll = r();
    const type = roll < .55 ? 'mote' : roll < .78 ? 'glint' : (roll < .9 && !f) ? 'smoke' : 'mote';
    const p = { type, x: r() * innerWidth, y: r() * innerHeight, life: 0 };
    if (type === 'mote') Object.assign(p, { vx: (r() - .5) * .12, vy: -(.03 + r() * .1) * (.5 + m), size: (f ? 1.8 : .7) + r() * (f ? 2.6 : 1.6), max: 9000 + r() * 10000, alpha: .18 + r() * .4, ph: r() * 6.28 });
    if (type === 'glint') Object.assign(p, { vx: 0, vy: 0, size: 6 + r() * 14, max: 2600 + r() * 2600, alpha: .55 + r() * .4, rot: r() * 3 });
    if (type === 'smoke') Object.assign(p, { y: innerHeight + 40, vx: (r() - .5) * .16, vy: -(.1 + r() * .16) * (.5 + m), size: 60 + r() * 110, max: 16000 + r() * 12000, alpha: .035 + r() * .045 });
    l.list.push(p);
  }
  function drawP(ctx, p, dt) {
    p.life += dt; const t = p.life / p.max;
    p.x += p.vx * dt / 16 + (p.type === 'mote' ? Math.sin(p.life * .0007 + p.ph) * .08 : 0); p.y += p.vy * dt / 16;
    const a = (p.alpha || .3) * Math.sin(Math.PI * Math.min(1, t)); if (a <= 0) return;
    ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = a;
    if (p.type === 'mote') { ctx.fillStyle = 'rgb(232,214,168)'; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, 6.283); ctx.fill(); }
    else if (p.type === 'glint') {
      const s = p.size; ctx.strokeStyle = 'rgba(255,230,160,.95)'; ctx.lineWidth = 1; ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(240,200,110,.8)';
      ctx.beginPath(); ctx.moveTo(-s, 0); ctx.lineTo(s, 0); ctx.moveTo(0, -s * .8); ctx.lineTo(0, s * .8); ctx.stroke();
    } else { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size); g.addColorStop(0, 'rgba(180,196,214,.6)'); g.addColorStop(1, 'rgba(180,196,214,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, 6.283); ctx.fill(); }
    ctx.restore();
  }
  function drawRings(ctx, now) {
    const cx = innerWidth * .72, cy = innerHeight * .5, R = Math.max(innerWidth, innerHeight) * .62, tt = (now - t0) / 1000;
    ctx.save(); ctx.translate(cx, cy); ctx.lineCap = 'butt';
    for (let i = 0; i < 7; i++) {
      const r = R * (.16 + i * .135), dir = i % 2 ? -1 : 1, ang = tt * dir * (.012 + i * .004) * (cfg.motion / 40);
      ctx.save(); ctx.rotate(ang); ctx.strokeStyle = `rgba(184,150,86,${.2 - i * .018})`; ctx.lineWidth = i % 3 === 0 ? 2 : 1;
      ctx.setLineDash(i % 2 ? [r * .5, r * .12, 4, r * .1] : [r * 1.4, r * .2, 3, r * .16]);
      ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || suspended) { last = now; return; }
    const dt = Math.min(64, now - last || 16); last = now;
    layers.forEach(l => {
      l.ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (l.rings && cfg.rings && !weak) drawRings(l.ctx, now);
      const max = limit(l.front);
      if (l.list.length < max && Math.random() < .5) spawn(l);
      l.list = l.list.filter(p => p.life < p.max && p.y > -200);
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
    name: 'dust',
    init(B, o) {
      const f = B.book.fx && B.book.fx.dust; if (!f) return;
      cfg = Object.assign({ density: 70, motion: 40, opacity: 80, rings: true, front: true }, f); key = `di-${B.book.id}-dust-`;
      on = store.get(key + 'on', '1') !== '0';
      const root = (o && o.root) || document.getElementById('fxRoot');
      const mk = (id, front, rings, host) => {
        const c = document.createElement('canvas'); c.id = id; c.className = 'dust-canvas' + (front ? ' dust-front' : ''); c.setAttribute('aria-hidden', 'true');
        c.style.opacity = String((cfg.opacity / 100) * (front ? .6 : .85)); host.append(c);
        return { canvas: c, ctx: c.getContext('2d'), front, rings, list: [] };
      };
      layers = [mk('dustBack', false, true, root), mk('dustFront', true, false, document.body)];
      size(); addEventListener('resize', size, { passive: true }); start();
    },
    configure(c) { preset = (c && c.preset) || 'full'; start(); },
    suspend() { suspended = true; }, resume() { suspended = false; },
    settingsHtml() { return cfg ? `<label class="setrow"><span><strong>Poeira e anéis</strong><small>Poeira de pedra, reflexos dourados e anéis girando ao fundo.</small></span><input type="checkbox" id="optDust" ${on ? 'checked' : ''}></label>` : ''; },
    bindSettings(root) {
      const box = root && root.querySelector('#optDust'); if (!box) return;
      box.addEventListener('change', () => { on = box.checked; store.set(key + 'on', on ? '1' : '0'); start(); });
    }
  };
  (window.DIFX = window.DIFX || { use() {} }).use(api);
})();
