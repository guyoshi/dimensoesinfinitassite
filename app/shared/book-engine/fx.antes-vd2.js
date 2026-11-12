/* Efeitos por tema (st, vd, ds1, ds2). Sem bibliotecas. Respeita perfil Completo/Equilibrado/Desempenho e movimento reduzido. */
(() => {
  'use strict';
  const rnd = (a, b) => a + Math.random() * (b - a);
  let theme = 'st', root = null, cvs = null, ctx = null, W = 0, H = 0, raf = 0, last = 0, run = false;
  let cfg = { preset: 'full', lantern: false };
  let parts = [], shoots = [], mouse = { x: .5, y: .5 }, sprites = {}, timers = [];

  const SPR = {
    st: [['#ffffff', 1], ['#ffe9c2', 1.3], ['#c9b8ff', 1.1]],
    vd: [['#9cf0ff', 1], ['#46d3f2', 1.2], ['#ffc46b', .8]],
    ds1: [['#f2b765', 1], ['#d4501e', .8], ['#eadfc9', .7]],
    ds2: [['#e6b567', 1], ['#efe3d0', .8], ['#c97a6b', .7]]
  };
  function sprite(col) {
    if (sprites[col]) return sprites[col];
    const c = document.createElement('canvas'); c.width = c.height = 32;
    const g = c.getContext('2d'), gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, col); gr.addColorStop(.35, col + 'aa'); gr.addColorStop(1, col + '00');
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32);
    return (sprites[col] = c);
  }
  function count() {
    const base = { st: 150, vd: 70, ds1: 55, ds2: 55 }[theme] || 60;
    return cfg.preset === 'full' ? base : Math.round(base * .45);
  }
  function seed() {
    parts = [];
    const n = count(), pal = SPR[theme];
    for (let i = 0; i < n; i++) {
      const [col, k] = pal[i % pal.length];
      const z = theme === 'st' ? rnd(.2, 1) : rnd(.3, 1);
      parts.push({ x: rnd(0, W), y: rnd(0, H), z, col, s: rnd(2.5, 9) * k * (theme === 'st' ? .45 : 1), vx: 0, vy: 0, ph: rnd(0, 6.28), tw: rnd(.6, 2.2) });
      const p = parts[i];
      if (theme === 'vd') { p.vx = rnd(-8, 8); p.vy = rnd(-22, -6); }
      else if (theme === 'ds1' || theme === 'ds2') { p.vx = rnd(-5, 5); p.vy = rnd(-4, 4); }
      else { p.vx = -rnd(1, 4) * z; p.vy = 0; }
    }
  }
  function resize() {
    if (!cvs) return;
    const d = Math.min(devicePixelRatio || 1, cfg.preset === 'full' ? 1.5 : 1);
    W = innerWidth; H = innerHeight; cvs.width = W * d; cvs.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0); seed();
  }
  function frame(t) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((t - last) / 1000, .05); if (cfg.preset === 'balanced' && t - last < 32) return;
    last = t;
    ctx.clearRect(0, 0, W, H);
    const mx = (mouse.x - .5), my = (mouse.y - .5), tw = performance.now() / 1000;
    for (const p of parts) {
      p.x += p.vx * dt * (theme === 'st' ? 1 : p.z); p.y += p.vy * dt * p.z;
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
      let a = theme === 'st' ? .35 + .65 * Math.abs(Math.sin(tw * p.tw + p.ph)) : .25 + .55 * Math.abs(Math.sin(tw * p.tw * .6 + p.ph));
      if (theme === 'ds1' || theme === 'ds2') a *= .6;
      const ox = theme === 'st' ? -mx * 40 * p.z : 0, oy = theme === 'st' ? -my * 24 * p.z : 0;
      ctx.globalAlpha = a * (theme === 'st' ? p.z : 1);
      const s = p.s * (theme === 'st' ? p.z + .3 : p.z);
      ctx.drawImage(sprite(p.col), p.x + ox - s / 2, p.y + oy - s / 2, s, s);
    }
    if (theme === 'st') {
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i]; s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt;
        const k = 1 - s.life / s.max; if (k <= 0) { shoots.splice(i, 1); continue; }
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * .12, s.y - s.vy * .12);
        g.addColorStop(0, `rgba(255,255,255,${k})`); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * .12, s.y - s.vy * .12); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
  function start() {
    if (run || cfg.preset === 'performance' || document.hidden || !cvs) return;
    run = true; cvs.style.display = ''; last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { run = false; cancelAnimationFrame(raf); if (ctx) ctx.clearRect(0, 0, W, H); if (cvs) cvs.style.display = 'none'; }

  /* ---------- camadas DOM por tema ---------- */
  const rootHTML = {
    st: () => `<div class="fx-layer fx-nebula"></div><div class="fx-ship" id="fxShip"><svg viewBox="0 0 120 80" aria-hidden="true"><path d="M8 52h104l-14 18H24z" fill="#1a0f3a"/><path d="M58 8v44M58 12c20 4 32 18 34 34H58zM58 16c-16 4-26 16-28 30h28z" fill="#2a1a6e" stroke="#e9b44c" stroke-width="1.4"/><path d="M58 8l14 4-14 4z" fill="#d23fa5"/></svg></div><div class="fx-layer fx-hyper" id="fxHyper"></div>`,
    vd: () => `<div class="fx-layer fx-glow"></div><div class="fx-layer fx-dots"></div>`,
    ds1: () => `<div class="fx-layer fx-vignette"></div><div class="fx-layer fx-grain"></div><div class="fx-layer fx-flicker" id="fxFlicker"></div>${ink()}`,
    ds2: () => `<div class="fx-layer fx-dawn"></div><div class="fx-layer fx-mist"></div><div class="fx-layer fx-vignette"></div><div class="fx-layer fx-grain"></div><svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="di-mirage"><feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="1" seed="3"><animate attributeName="baseFrequency" dur="14s" values="0.008 0.02;0.012 0.028;0.008 0.02" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="4"/></filter></svg>`
  };
  function ink() {
    const p = 'M0,0 C60,40 20,110 90,160 C130,190 60,240 120,300 L0,300 Z';
    const s = (cls, extra = '') => `<svg class="fx-ink ${cls}" viewBox="0 0 170 330" aria-hidden="true"><path d="${p}" fill="#030101"/><path d="M0,150 C40,170 70,160 100,200 C120,225 90,250 130,280" fill="none" stroke="#030101" stroke-width="7" stroke-linecap="round"/>${extra}</svg>`;
    return s('ink-l') + s('ink-r') + `<svg class="fx-ink ink-b" viewBox="0 0 1180 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0,160 C120,100 180,150 300,112 C420,70 520,150 640,118 C780,85 880,150 1020,110 C1100,90 1150,125 1180,100 L1180,160 Z" fill="#030101"/></svg>`;
  }
  const heroHTML = {
    st: () => `<div class="fx-vortex"></div>`,
    vd: () => `<div class="fx-portal"><div class="core"></div><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div></div>
      <svg class="fx-rail" viewBox="0 0 1100 140" preserveAspectRatio="none" aria-hidden="true"><path id="railA" d="M-10,120 C150,40 260,150 420,70 C560,0 660,130 820,60 C940,10 1040,60 1110,30" fill="none" stroke="#f2922e" stroke-width="7" stroke-linecap="round" opacity=".85"/><path d="M-10,138 C150,58 260,168 420,88 C560,18 660,148 820,78 C940,28 1040,78 1110,48" fill="none" stroke="#f2922e" stroke-width="4" stroke-linecap="round" opacity=".5"/></svg>
      ${[0, 1, 2, 3, 4].map(i => `<i class="fx-spark" style="animation-delay:-${i * 1.7}s"></i>`).join('')}
      <svg class="fx-roots" viewBox="0 0 430 150" aria-hidden="true"><g stroke="#10202b" stroke-width="5" fill="none" stroke-linecap="round"><path d="M120,150 C110,100 80,90 70,40 M105,110 C80,100 50,110 30,80 M130,140 C150,90 140,60 170,20 M150,100 C190,90 210,60 230,30"/><path d="M300,150 C310,100 340,90 360,40 M315,110 C340,100 370,112 400,80 M290,140 C270,90 280,60 250,20"/></g></svg>`,
    ds1: () => '',
    ds2: () => `<div class="fx-herodawn"></div>`
  };

  function schedule() {
    timers.forEach(clearTimeout); timers = [];
    if (cfg.preset === 'performance') return;
    const loop = (fn, a, b) => { const go = () => { if (!document.hidden && cfg.preset !== 'performance') fn(); timers.push(setTimeout(go, rnd(a, b))); }; timers.push(setTimeout(go, rnd(a * .4, b * .6))); };
    if (theme === 'st') {
      loop(() => { shoots.push({ x: rnd(W * .2, W), y: rnd(0, H * .4), vx: -rnd(500, 800), vy: rnd(260, 420), life: 0, max: rnd(.7, 1.1) }); }, 7000, 16000);
      loop(() => { const s = document.getElementById('fxShip'); if (!s) return; s.classList.remove('go'); void s.offsetWidth; s.style.top = rnd(8, 40) + '%'; s.classList.add('go'); }, 38000, 70000);
    }
    if (theme === 'ds1') {
      loop(() => { const f = document.getElementById('fxFlicker'); if (!f) return; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }, 9000, 22000);
    }
  }

  window.DIFX = {
    init(B, o) {
      theme = B.book.theme; root = o.root;
      root.innerHTML = '<canvas id="fxCanvas"></canvas>' + (rootHTML[theme]?.() || '');
      cvs = root.querySelector('#fxCanvas'); ctx = cvs.getContext('2d');
      document.body.classList.add('fx-' + theme);
      addEventListener('resize', () => { clearTimeout(window.__dfx); window.__dfx = setTimeout(resize, 150); });
      addEventListener('mousemove', e => {
        mouse.x = e.clientX / innerWidth; mouse.y = e.clientY / innerHeight;
        if (theme === 'ds1') document.body.classList.toggle('ink-away', e.clientX > innerWidth - 230 || e.clientY > innerHeight - 150 || e.clientX < 300);
        if (cfg.lantern) { document.body.style.setProperty('--lx', e.clientX + 'px'); document.body.style.setProperty('--ly', e.clientY + 'px'); }
      }, { passive: true });
      document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
      resize();
    },
    configure(c) {
      const prev = cfg.preset; cfg = Object.assign(cfg, c);
      document.body.classList.toggle('fx-light', cfg.preset === 'balanced');
      if (!cvs) return;
      if (cfg.preset === 'performance') stop(); else { if (prev !== cfg.preset) { resize(); } start(); }
      schedule();
    },
    afterRender() {
      const h = document.getElementById('heroFx');
      if (h) h.innerHTML = heroHTML[theme]?.() || '';
    },
    transition() {
      if (theme === 'st') { const hz = document.getElementById('fxHyper'); if (hz) { hz.classList.remove('go'); void hz.offsetWidth; hz.classList.add('go'); } }
    },
    suspend() { stop(); timers.forEach(clearTimeout); timers=[]; },
    resume() { start(); schedule(); },
    contemplate(on) {
      document.body.classList.toggle('fx-max', on);
    }
  };
})();
