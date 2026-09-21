(() => {
  const sagas = window.PORTAL_DATA.sagas;
  const books = window.PORTAL_DATA.books;
  const sagaGrid = document.getElementById('sagaGrid');
  const bookGrid = document.getElementById('bookGrid');
  const detailView = document.getElementById('detailView');
  const views = {
    sagas: document.getElementById('sagaView'),
    books: document.getElementById('bookView'),
    detail: detailView
  };
  const externalPages = { 'ruinas-dos-ceus': 'ruinas.html', 'guerras-de-sangue': 'guerras.html', 'dinastia-polar': 'dinastia-polar.html', 'herdeiros-das-cinzas': 'herdeiros-das-cinzas.html' };
  const previewableBooks = new Set(['dinastia-polar', 'herdeiros-das-cinzas']);
  const bookLogos = { 'ruinas-dos-ceus': 'assets/branding/ruinas-dos-ceus/logo-light.webp', 'guerras-de-sangue': 'assets/branding/guerras-de-sangue/logo-light.webp' };
  const icons = { compass: '✦', journal: '✦', crown: '♕', stars: '✧', portal: '◎', eye: '◉', union: '⬡', wind: '☁', 'crossed-swords': '⚔', fortress: '⛁', embers: '♨', hourglass: '⏳' };
  const synopsisHtml = value => String(value || '').split(/\n\s*\n/).filter(Boolean).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function showView(name) {
    Object.entries(views).forEach(([key, el]) => el && el.classList.toggle('is-hidden', key !== name));
  }

  function renderSagas() {
    sagaGrid.innerHTML = sagas.map(s => {
      const active = s.status === 'active';
      return `<article class="dim-card ${active ? 'active' : 'locked'}" ${active ? `data-saga="${escapeHtml(s.id)}"` : ''}>
        <div class="dim-icon">${icons[s.symbol] || '✦'}</div>
        <h3>${escapeHtml(s.name)}</h3>
        <p>${escapeHtml(s.tagline || s.theme)}</p>
        <div class="dim-state">${active ? 'Disponível' : 'Bloqueada'}</div>
      </article>`;
    }).join('');
  }

  function renderBooks() {
    bookGrid.innerHTML = books.map(b => {
      const href = (b.status === 'active' || previewableBooks.has(b.id)) ? externalPages[b.id] : '';
      const cover = b.cover ? `<img class="portal-book-cover" src="${escapeHtml(b.cover)}" alt="Capa de ${escapeHtml(b.name)}" loading="lazy">` : `<div class="portal-book-cover portal-cover-placeholder">${icons[b.icon] || '✦'}</div>`;
      const stateLabel = href ? (b.status === 'active' ? 'Abrir livro' : 'Em preparação') : 'Em preparação';
      const inner = `${cover}<div class="portal-book-overlay"></div><div class="portal-book-copy"><span>Livro ${b.order}</span><h3>${escapeHtml(b.name)}</h3><p>${escapeHtml(b.teaser || b.synopsis || b.visual)}</p><strong class="dim-state">${stateLabel}</strong></div>`;
      return href ? `<a class="dim-card book-dim-card active" href="${href}#/${b.id === 'ruinas-dos-ceus' ? 'inicio' : 'dashboard'}">${inner}</a>` : `<article class="dim-card book-dim-card locked" aria-disabled="true">${inner}</article>`;
    }).join('');
  }

  function renderDetail(id) {
    const b = books.find(x => x.id === id);
    if (!b) { showView('books'); renderBooks(); return; }
    const href = externalPages[b.id];
    const logo = bookLogos[b.id];
    const titleHtml = logo ? `<img class="detail-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(b.name)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><h2 class="section-title detail-logo-fallback" hidden>${escapeHtml(b.name)}</h2>` : `<h2 class="section-title">${escapeHtml(b.name)}</h2>`;
    detailView.innerHTML = `<button class="back-link" data-back="books">← Voltar</button><div class="detail-card">${b.cover ? `<img class="detail-cover" src="${escapeHtml(b.cover)}" alt="Capa de ${escapeHtml(b.name)}">` : ''}<p class="kicker">Livro ${b.order} · Ciclo de Jesed</p>${titleHtml}<div class="subtitle book-full-synopsis">${synopsisHtml(b.synopsis || b.visual)}</div>${href ? `<a class="go-button" href="${href}#/${b.id === 'ruinas-dos-ceus' ? 'inicio' : 'dashboard'}">Ir para a página do livro</a>` : '<p class="subtitle">Ainda em preparação.</p>'}</div>`;
  }

  function route() {
    const hash = location.hash.replace(/^#\//, '');
    const [base, id] = hash.split('/');
    if (base === 'books') { renderBooks(); showView('books'); }
    else if (base === 'book' && id) { renderDetail(id); showView('detail'); }
    else { renderSagas(); showView('sagas'); }
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', event => {
    const sagaCard = event.target.closest('[data-saga]');
    if (sagaCard) { location.hash = '#/books'; return; }
    const back = event.target.closest('[data-back]');
    if (back) { location.hash = back.dataset.back === 'sagas' ? '#/' : '#/books'; return; }
    const goHref = event.target.closest('[data-go-href]');
    if (goHref) { window.location.href = goHref.dataset.goHref; return; }
  });

  window.addEventListener('hashchange', route);

  function buildStars() {
    const layer = document.getElementById('stars');
    if (!layer) return;
    const count = 220;
    for (let i = 0; i < count; i += 1) {
      const star = document.createElement('span');
      star.className = 'star';
      const leftPct = Math.random() * 100;
      const topPct = Math.random() * 100;
      const dx = leftPct - 50;
      const dy = topPct - 50;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const travel = 48 + Math.random() * 92;
      const tx = (dx / dist) * travel;
      const ty = (dy / dist) * travel;
      star.style.left = `${leftPct}%`;
      star.style.top = `${topPct}%`;
      star.style.setProperty('--s', `${1 + Math.random() * 2.3}px`);
      star.style.setProperty('--tx', `${tx.toFixed(2)}vw`);
      star.style.setProperty('--ty', `${ty.toFixed(2)}vh`);
      star.style.setProperty('--dur', `${5.5 + Math.random() * 10}s`);
      star.style.setProperty('--delay', `${-Math.random() * 22}s`);
      layer.appendChild(star);
    }
  }

  function buildPortals() {
    const field = document.getElementById('portalField');
    if (!field || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const maxPortals = 7;
    const spawn = () => {
      if (document.hidden || field.childElementCount >= maxPortals) return;
      const portal = document.createElement('span');
      portal.className = 'dimension-portal';
      const angle = Math.random() * Math.PI * 2;
      const radiusX = 34 + Math.random() * 54;
      const radiusY = 28 + Math.random() * 48;
      portal.style.setProperty('--portal-x', `${Math.cos(angle) * radiusX}vw`);
      portal.style.setProperty('--portal-y', `${Math.sin(angle) * radiusY}vh`);
      portal.style.setProperty('--portal-scale', `${3.2 + Math.random() * 5.8}`);
      portal.style.setProperty('--portal-dur', `${7 + Math.random() * 7}s`);
      portal.style.setProperty('--rot', `${-18 + Math.random() * 36}deg`);
      for (let i = 0; i < 7; i += 1) {
        const energy = document.createElement('i');
        energy.className = 'portal-energy';
        const eAngle = (Math.PI * 2 * i / 7) + Math.random() * .5;
        const distance = 24 + Math.random() * 34;
        energy.style.setProperty('--ex', `${Math.cos(eAngle) * distance}px`);
        energy.style.setProperty('--ey', `${Math.sin(eAngle) * distance}px`);
        energy.style.setProperty('--energy-delay', `${-Math.random() * 1.6}s`);
        portal.appendChild(energy);
      }
      portal.addEventListener('animationend', () => portal.remove(), { once: true });
      field.appendChild(portal);
    };
    for (let i = 0; i < 3; i += 1) setTimeout(spawn, i * 1100);
    setInterval(spawn, 1800);
  }

  function setupPortalMusic() {
    const button = document.getElementById('portalMusic');
    if (!button) return;
    const audio = new Audio('assets/dimensoes-infinitas.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.0001;
    let playing = false;
    let fadeTimer = null;
    const clearFade = () => { if (fadeTimer) { clearInterval(fadeTimer); fadeTimer = null; } };
    const fadeTo = (target, duration) => {
      clearFade();
      const start = audio.volume, startTime = performance.now();
      fadeTimer = setInterval(() => {
        const t = Math.min(1, (performance.now() - startTime) / duration);
        audio.volume = start + (target - start) * t;
        if (t >= 1) clearFade();
      }, 30);
    };
    const setState = value => {
      playing = value;
      button.setAttribute('aria-pressed', String(value));
      button.title = value ? 'Desligar música ambiente' : 'Ligar música ambiente';
      const label = button.querySelector('.music-label');
      if (label) label.textContent = value ? 'Música ligada' : 'Música';
    };
    const stop = () => {
      fadeTo(0.0001, 500);
      setTimeout(() => audio.pause(), 550);
      setState(false);
      try { localStorage.setItem('di-portal-music', '0'); } catch {}
    };
    const start = () => {
      const promise = audio.play();
      if (promise && typeof promise.catch === 'function') {
        promise.then(() => fadeTo(0.28, 1200)).catch(() => {});
      } else {
        fadeTo(0.28, 1200);
      }
      setState(true);
      try { localStorage.setItem('di-portal-music', '1'); } catch {}
    };
    button.addEventListener('click', () => playing ? stop() : start());
    // A música continua tocando ao trocar de aba/guia — não pausamos em visibilitychange.
    document.addEventListener('visibilitychange', () => {
      if (!playing || !document.hidden) return;
      audio.play().catch(() => {});
    });
    // Navegadores bloqueiam som sem interação. A preferência salva é retomada no primeiro gesto do usuário.
    let preferred = true;
    try { const stored = localStorage.getItem('di-portal-music'); preferred = stored === null ? true : stored === '1'; } catch {}
    if (preferred) {
      const resumeOnce = () => { start(); document.removeEventListener('pointerdown', resumeOnce); document.removeEventListener('keydown', resumeOnce); };
      document.addEventListener('pointerdown', resumeOnce, { once: true });
      document.addEventListener('keydown', resumeOnce, { once: true });
    }
  }

  buildStars();
  buildPortals();
  setupPortalMusic();
  route();
})();
