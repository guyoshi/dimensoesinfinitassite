/* Motor único dos livros de Spacetheft, Viajantes Dimensionais e Diário Sobrenatural.
 * Lê window.DI_BOOK (data/sagas/<saga>/books/<livro>/*.js) e desenha todas as páginas.
 * Rotas: #/inicio #/livros #/capitulos #/capitulo/N #/linha-do-tempo #/personagens #/personagem/slug
 *        #/lugares #/lugar/slug #/mapa #/galeria */
(() => {
  'use strict';
  const B = window.DI_BOOK;
  if (!B) { console.error('[DI] DI_BOOK ausente.'); return; }
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = v => String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch {} }
  };
  const KEY = `di-${B.book.id}-`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 900px)').matches;
  const weak = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4) || mobile;

  const P = {
    home: '<path d="M3 11.5L12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/>',
    books: '<path d="M4 4h5v16H4zM10 4h5v16h-5zM16 6h4v14h-4z"/>',
    chapter: '<path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    timeline: '<path d="M4 6h12M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15a5 5 0 0 1 6 5"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
    pin: '<path d="M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13z"/><circle cx="12" cy="9" r="2"/>',
    map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-7 8"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/><path d="M6 18h12"/>',
    eye: '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    close: '<path d="M5 5l14 14M19 5L5 19"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    back: '<path d="M19 12H5M10 7l-5 5 5 5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 4-4 2 2-4z"/>',
    portal: '<circle cx="12" cy="12" r="8"/><path d="M12 4c4 4 4 12 0 16M12 4c-4 4-4 12 0 16M4 12h16"/>',
    journal: '<path d="M6 3h12v18H6z"/><path d="M6 7H4M6 12H4M6 17H4M10 8h5"/>',
    menu: '<path d="M4 7h16M4 12h10M4 17h16"/>'
  };
  const icon = (n, c = '') => `<svg class="${c}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P[n] || P.chapter}</svg>`;

  const SECTIONS = {
    inicio: ['home', 'Início'], livros: ['books', 'Livros'], capitulos: ['chapter', 'Capítulos'],
    'linha-do-tempo': ['timeline', 'Linha do Tempo'], personagens: ['people', 'Personagens'],
    lugares: ['pin', 'Lugares'], mapa: ['map', 'Mapa'], galeria: ['image', 'Galeria']
  };
  const EMPTY = {
    capitulos: 'Os capítulos deste livro serão listados aqui.',
    'linha-do-tempo': 'Os acontecimentos, em ordem, entram aqui conforme forem registrados.',
    personagens: 'As fichas dos personagens entram aqui em seguida.',
    lugares: 'Os lugares do livro entram aqui em seguida.',
    galeria: 'As imagens do livro aparecem aqui assim que forem adicionadas à pasta de assets.',
    mapa: 'O mapa ainda está em preparação.'
  };

  const A = B.arrays = {
    chapters: B.chapters || [], characters: B.characters || [], places: B.places || [],
    timeline: B.timeline || [], gallery: B.gallery || []
  };
  const IMG = B.images || { chapters: {}, characters: {}, places: {}, gallery: [] };
  const pad = n => String(n).padStart(2, '0');
  const narrColor = who => (B.narrators && B.narrators[who]) || null;
  const written = () => A.chapters.filter(c => c.status !== 'draft' && c.status !== 'empty');
  const chapterImage = c => (IMG.chapters && (IMG.chapters[c.number] || IMG.chapters[pad(c.number)])) || c.image || null;
  const charImage = c => (IMG.characters && IMG.characters[c.slug]) || c.image || null;
  const placeImage = p => (IMG.places && IMG.places[p.slug]) || p.image || null;
  const paragraphs = t => String(t || '').split(/\n\s*\n/).filter(Boolean).map(p => `<p>${esc(p)}</p>`).join('');

  const state = {
    q: '', narrator: 'all', sidebar: store.get('di-sidebar-collapsed') === '1',
    preset: store.get(KEY + 'preset') || (weak ? 'balanced' : 'full'),
    transitions: store.get(KEY + 'transitions') !== '0',
    lantern: store.get(KEY + 'lantern') === '1'
  };
  const FX = () => window.DIFX;

  function applySettings() {
    const b = document.body;
    b.classList.toggle('perf', state.preset === 'performance' || reduced);
    b.classList.toggle('no-transitions', !state.transitions || reduced);
    b.classList.toggle('lantern-on', state.lantern && state.preset !== 'performance');
    FX()?.configure?.({ preset: reduced ? 'performance' : state.preset, lantern: state.lantern });
    const perf = $('#perfBtn'); if (perf) { perf.setAttribute('aria-pressed', String(state.preset === 'performance')); perf.title = state.preset === 'performance' ? 'Modo desempenho ativado' : 'Modo desempenho desativado'; }
  }
  function saveSettings() {
    store.set(KEY + 'preset', state.preset); store.set(KEY + 'transitions', state.transitions ? '1' : '0'); store.set(KEY + 'lantern', state.lantern ? '1' : '0');
    applySettings();
  }

  /* ---------- shell ---------- */
  function shell() {
    const nav = B.nav.map(g => `<section class="nav-group"><div class="sec">${esc(g.group)}</div>${g.items.map(id => {
      const s = SECTIONS[id]; return `<a class="nav-item" href="#/${id}" data-nav="${id}">${icon(s[0], 'ni')}<span>${s[1]}</span></a>`;
    }).join('')}</section>`).join('');
    const bk = B.book;
    document.body.dataset.theme = bk.theme; document.body.dataset.book = bk.id; document.body.dataset.saga = B.saga.id;
    document.getElementById('app').innerHTML = `
      <div class="fx-root" id="fxRoot" aria-hidden="true"></div>
      <div class="app">
        <aside class="sb" id="sb" aria-label="Navegação principal">
          <a class="brand" href="#/inicio"><span class="sigil">${icon(B.saga.symbol)}</span><span class="brand-copy"><b class="h-font">${esc(B.saga.name)}</b><small>${esc(bk.name)} · ${esc(bk.numeral)}</small></span></a>
          <nav class="nav" id="nav">${nav}</nav>
          <div class="sbf"><a class="exit" href="index.html#/saga/${esc(B.saga.id)}">${icon('back', 'ni')}<span>Dimensões Infinitas</span></a><div class="status"><span class="dot"></span>${esc(bk.statusLabel)}</div></div>
        </aside>
        <div class="sb-backdrop" id="sbBackdrop"></div>
        <div class="ws">
          <header class="top">
            <button class="ico mobile-only" id="menuBtn" aria-label="Abrir menu">${icon('menu')}</button>
            <a class="pill" href="index.html#/saga/${esc(B.saga.id)}">${icon(B.saga.symbol, 'pi')}<span>${esc(B.saga.name)}</span></a>
            <button class="pill" id="bookBtn" aria-haspopup="dialog">${icon('books', 'pi')}<span>${esc(bk.name)}</span><i>⌄</i></button>
            <button class="search" id="searchBtn" aria-label="Pesquisar">${icon('search', 'pi')}<span>Pesquisar</span><kbd>Ctrl K</kbd></button>
            <div class="ctrl">
              <button class="ico" id="perfBtn" aria-label="Modo desempenho" aria-pressed="false">${icon('gauge')}</button>
              <button class="ico" id="contBtn" aria-label="Contemplar este mundo" title="Contemplar este mundo">${icon('eye')}</button>
              <button class="ico" id="setBtn" aria-label="Configurações">${icon('settings')}</button>
            </div>
          </header>
          <div class="crumb" id="crumb"></div>
          <main class="main" id="main" tabindex="-1"></main>
          <footer class="foot"><span>${esc(B.saga.name)} · ${esc(bk.name)}</span><span>Autoria, mundo e texto: Guilherme S. L. Anjos</span></footer>
        </div>
      </div>
      <div class="veil" id="veil" aria-hidden="true"></div>
      <div class="contemplate" id="contemplate" aria-hidden="true"><img class="c-logo" src="${esc(bk.logo)}" alt="${esc(bk.name)}"><p>Esc para voltar</p></div>
      <div class="modal" id="modal" aria-hidden="true"><div class="modal-bd" data-close></div><section class="modal-panel" id="modalPanel" role="dialog" aria-modal="true"></section></div>`;
  }

  /* ---------- helpers de página ---------- */
  function crumb(items) {
    $('#crumb').innerHTML = [['Dimensões Infinitas', `index.html`], [B.saga.name, `index.html#/saga/${B.saga.id}`], ...items].map((it, i, a) =>
      (i ? '<span>›</span>' : '') + (it[1] ? `<a href="${it[1]}">${esc(it[0])}</a>` : `<span class="cur">${esc(it[0])}</span>`)).join('');
  }
  const head = (kicker, title, sub = '', actions = '') => `<header class="phead"><div><p class="kicker">${esc(kicker)}</p><h1 class="h-font">${esc(title)}</h1>${sub ? `<p class="sub">${esc(sub)}</p>` : ''}</div>${actions ? `<div class="pact">${actions}</div>` : ''}</header>`;
  const empty = (id) => `<div class="panel empty"><p>${esc(EMPTY[id] || 'Em preparação.')}</p></div>`;
  const chip = who => who ? `<span class="chip" style="${narrColor(who) ? `background:${narrColor(who)}` : ''}">${esc(who)}</span>` : '';
  const thumb = (src, alt, fb) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fb',innerHTML:this.dataset.fb}))" data-fb="${esc(icon(fb))}">` : `<span class="fb">${icon(fb)}</span>`;
  const chapLabel = c => `Capítulo ${c.number}`;

  /* ---------- páginas ---------- */
  function pageInicio() {
    const bk = B.book, ch = A.chapters, w = written();
    const drafts = ch.length - w.length;
    const cards = [
      ['personagens', 'Personagens', A.characters.length ? `${A.characters.length} fichas` : 'Quem são e onde ficaram'],
      ['linha-do-tempo', 'Linha do Tempo', A.timeline.length ? `${A.timeline.length} acontecimentos` : 'Eventos e antecedentes'],
      B.nav.some(g => g.items.includes('mapa')) ? ['mapa', 'Mapa', B.mapText || 'Onde tudo acontece'] : ['lugares', 'Lugares', A.places.length ? `${A.places.length} lugares` : 'Onde tudo acontece'],
      ['capitulos', 'Capítulos', `${w.length} capítulos escritos${drafts ? ` · ${drafts} rascunho${drafts > 1 ? 's' : ''}` : ''}`]
    ];
    const feat = (A.characters.filter(c => c.featured).length ? A.characters.filter(c => c.featured) : A.characters).slice(0, 5);
    const first = w.slice(0, 5);
    $('#main').innerHTML = `<div class="page">
      <section class="hero" style="--bgy:${esc(bk.heroY || '40%')}">
        <div class="hero-bg" style="background-image:url('${esc(bk.cover)}')"></div><div class="hero-shade"></div>
        <div class="hero-fx" id="heroFx"></div>
        <div class="copy"><p class="kicker">${esc(bk.kicker)}</p><img class="logo" src="${esc(bk.logo)}" alt="${esc(bk.name)}"><p class="tagline">${esc(bk.tagline)}</p>
          <div class="btns"><a class="btn primary" href="#/capitulos">${icon('chapter')} Abrir capítulos</a><a class="btn" href="#/personagens">${icon('people')} Ver personagens</a><button class="btn" data-contemplate>${icon('eye')} Contemplar este mundo</button></div></div>
        <figure class="coverwrap"><img src="${esc(bk.cover)}" alt="Capa de ${esc(bk.name)}" data-lightbox></figure>
      </section>
      <section class="cards">${cards.map(([id, t, d]) => `<a class="card" href="#/${id}"><h4 class="h-font">${t}</h4><p>${esc(d)}</p></a>`).join('')}</section>
      <section class="row2">
        <div class="panel"><div class="ph3"><h3 class="h-font">Personagens</h3><a href="#/personagens">Ver todos</a></div>
          ${feat.length ? `<div class="strip">${feat.map(c => `<a class="pc" href="#/personagem/${esc(c.slug)}"><span class="phimg">${thumb(charImage(c), c.name, 'person')}</span><b>${esc(c.name)}</b><small>${esc(c.subtitle || '')}</small></a>`).join('')}</div>` : `<p class="muted">${esc(EMPTY.personagens)}</p>`}</div>
        <div class="panel"><div class="ph3"><h3 class="h-font">Capítulos</h3><a href="#/capitulos">Ver todos</a></div>
          ${first.length ? first.map(c => `<a class="crow" href="#/capitulo/${c.number}"><em>${c.number}</em><span>${esc(c.title)}</span>${chip(c.pov)}</a>`).join('') + `<p class="muted small">Todos os ${w.length} capítulos →</p>` : `<p class="muted">${esc(EMPTY.capitulos)}</p>`}</div>
      </section></div>`;
    crumb([['Início']]);
    $$('[data-lightbox]').forEach(i => i.addEventListener('click', () => lightbox([{ src: bk.cover, title: bk.name }], 0)));
  }

  function pageLivros() {
    const books = B.saga.books;
    $('#main').innerHTML = `<div class="page">${head(B.saga.name, `Os ${books.length === 1 ? 'livro' : 'livros'} de ${B.saga.name}`, 'Abra um livro para ver os detalhes, ou consulte os volumes ainda em preparação.')}
      <section class="shelf">${books.map(b => {
        const open = b.status === 'active', cur = b.id === B.book.id;
        const inner = `<div class="bcover">${b.cover ? `<img src="${esc(b.cover)}" alt="Capa de ${esc(b.name)}" loading="lazy">` : `<span class="fb">${icon(open ? 'books' : 'lock')}</span>`}<span class="bnum">Livro ${b.order}</span></div><div class="bcopy"><h2 class="h-font">${esc(b.name)}</h2><p>${esc(b.stageLabel || '')}</p></div><div class="bstat"><span>${cur ? 'Você está aqui' : open ? 'Abrir livro' : 'Em preparação'}</span></div>`;
        return open ? `<a class="book ${cur ? 'cur' : ''}" href="${esc(b.entry)}#/inicio">${inner}</a>` : `<article class="book locked" aria-disabled="true">${inner}</article>`;
      }).join('')}</section></div>`;
    crumb([['Livros']]);
  }

  function pageCapitulos() {
    const list = A.chapters;
    const nar = B.narrators ? Object.keys(B.narrators).filter(n => list.some(c => c.pov === n)) : [];
    const draw = () => {
      const q = norm(state.q);
      const rows = list.filter(c => (state.narrator === 'all' || c.pov === state.narrator) && (!q || norm(c.title).includes(q) || norm(String(c.number)).includes(q) || norm(c.pov).includes(q)));
      $('#chList').innerHTML = rows.length ? rows.map(c => {
        const img = chapterImage(c);
        return `<a class="chcard ${c.status === 'draft' ? 'draft' : ''}" href="#/capitulo/${c.number}">${img ? `<span class="chimg">${thumb(img, c.title, 'chapter')}</span>` : ''}<span class="chnum">${c.number}</span><span class="chbody"><strong>${esc(c.title)}</strong>${c.summary ? `<small>${esc(String(c.summary).split(/\n\s*\n/)[0].slice(0, 170))}…</small>` : ''}</span>${c.status === 'draft' ? '<span class="chip draft-chip">Rascunho</span>' : ''}${chip(c.pov)}</a>`;
      }).join('') : '<div class="panel empty"><p>Nenhum capítulo encontrado.</p></div>';
    };
    $('#main').innerHTML = `<div class="page">${head(B.book.name, 'Capítulos', `${written().length} capítulos escritos${A.chapters.length > written().length ? `, mais ${A.chapters.length - written().length} em rascunho` : ''}.`)}
      ${list.length ? `<div class="tools"><label class="field">${icon('search')}<input id="chQ" type="search" placeholder="Buscar capítulo…" value="${esc(state.q)}"></label>${nar.length ? `<div class="chips"><button class="fchip ${state.narrator === 'all' ? 'on' : ''}" data-nar="all">Todos</button>${nar.map(n => `<button class="fchip ${state.narrator === n ? 'on' : ''}" data-nar="${esc(n)}" style="--c:${narrColor(n)}">${esc(n)}</button>`).join('')}</div>` : ''}</div><div class="chlist" id="chList"></div>` : empty('capitulos')}</div>`;
    if (list.length) {
      draw();
      $('#chQ').addEventListener('input', e => { state.q = e.target.value; draw(); });
      $$('[data-nar]').forEach(b => b.addEventListener('click', () => { state.narrator = b.dataset.nar; $$('[data-nar]').forEach(x => x.classList.toggle('on', x === b)); draw(); }));
    }
    crumb([['Capítulos']]);
  }

  function pageCapitulo(n) {
    const i = A.chapters.findIndex(c => String(c.number) === String(n));
    if (i < 0) return notFound();
    const c = A.chapters[i], prev = A.chapters[i - 1], next = A.chapters[i + 1], img = chapterImage(c);
    const chars = (c.characters || []).map(s => A.characters.find(x => x.slug === s)).filter(Boolean);
    const places = (c.places || []).map(s => A.places.find(x => x.slug === s)).filter(Boolean);
    $('#main').innerHTML = `<div class="page chapter">
      <div class="chnav">${prev ? `<a class="btn" href="#/capitulo/${prev.number}">${icon('back')} Capítulo ${prev.number}</a>` : '<span></span>'}<a class="btn ghost" href="#/capitulos">Todos os capítulos</a>${next ? `<a class="btn" href="#/capitulo/${next.number}">Capítulo ${next.number} ${icon('arrow')}</a>` : '<span></span>'}</div>
      ${head(`${chapLabel(c)} · ${B.book.name}`, c.title, '', chip(c.pov) + (c.status === 'draft' ? '<span class="chip draft-chip">Rascunho</span>' : ''))}
      ${img ? `<figure class="chfig"><img src="${esc(img)}" alt="${esc(c.title)}" data-lightbox></figure>` : ''}
      <section class="panel prose">${c.summary ? `<h3 class="h-font">Resumo</h3>${paragraphs(c.summary)}` : `<p class="muted">O resumo deste capítulo está em preparação.</p>`}</section>
      ${(chars.length || places.length) ? `<section class="panel"><div class="tagrow">${chars.map(x => `<a class="tag" href="#/personagem/${esc(x.slug)}">${esc(x.name)}</a>`).join('')}${places.map(x => `<a class="tag" href="#/lugar/${esc(x.slug)}">${esc(x.name)}</a>`).join('')}</div></section>` : ''}
    </div>`;
    crumb([['Capítulos', '#/capitulos'], [`Capítulo ${c.number}`]]);
    $$('[data-lightbox]').forEach(el => el.addEventListener('click', () => lightbox([{ src: img, title: c.title }], 0)));
  }

  function simpleGrid(kind, label, list, getImg, routeBase, fbIcon) {
    const draw = () => {
      const q = norm(state.q);
      const rows = list.filter(x => !q || norm(x.name).includes(q) || norm(x.subtitle || '').includes(q));
      $('#grid').innerHTML = rows.length ? rows.map(x => `<a class="ecard" href="#/${routeBase}/${esc(x.slug)}"><span class="eimg">${thumb(getImg(x), x.name, fbIcon)}</span><span class="ecopy"><strong>${esc(x.name)}</strong><small>${esc(x.subtitle || '')}</small>${x.summary ? `<p>${esc(String(x.summary).slice(0, 140))}</p>` : ''}</span></a>`).join('') : '<div class="panel empty"><p>Nada encontrado.</p></div>';
    };
    $('#main').innerHTML = `<div class="page">${head(B.book.name, label, list.length ? `${list.length} registros.` : '')}${list.length ? `<div class="tools"><label class="field">${icon('search')}<input id="gQ" type="search" placeholder="Buscar…" value="${esc(state.q)}"></label></div><div class="egrid" id="grid"></div>` : empty(kind)}</div>`;
    if (list.length) { draw(); $('#gQ').addEventListener('input', e => { state.q = e.target.value; draw(); }); }
    crumb([[label]]);
  }
  function entityPage(list, slug, label, routeBase, getImg, fbIcon) {
    const x = list.find(e => e.slug === slug);
    if (!x) return notFound();
    const apps = A.chapters.filter(c => (c[routeBase === 'personagem' ? 'characters' : 'places'] || []).includes(x.slug));
    $('#main').innerHTML = `<div class="page entity">
      <div class="chnav"><a class="btn ghost" href="#/${routeBase === 'personagem' ? 'personagens' : 'lugares'}">${icon('back')} ${label}</a></div>
      <section class="ehero"><figure class="efig">${getImg(x) ? `<img src="${esc(getImg(x))}" alt="${esc(x.name)}" data-lightbox>` : `<span class="fb">${icon(fbIcon)}</span>`}</figure>
        <div class="etext"><p class="kicker">${esc(x.subtitle || label)}</p><h1 class="h-font">${esc(x.name)}</h1>${x.pov ? chip(x.pov) : ''}<div class="prose">${x.description ? paragraphs(x.description) : '<p class="muted">Ficha em preparação.</p>'}</div>
        ${apps.length ? `<h3 class="h-font small-h">Aparece em</h3><div class="tagrow">${apps.map(c => `<a class="tag" href="#/capitulo/${c.number}">Cap. ${c.number} · ${esc(c.title)}</a>`).join('')}</div>` : ''}</div></section></div>`;
    crumb([[label, `#/${routeBase === 'personagem' ? 'personagens' : 'lugares'}`], [x.name]]);
    $$('[data-lightbox]').forEach(el => el.addEventListener('click', () => lightbox([{ src: getImg(x), title: x.name }], 0)));
  }

  function pageTimeline() {
    const t = A.timeline;
    $('#main').innerHTML = `<div class="page">${head(B.book.name, 'Linha do Tempo', t.length ? `${t.length} acontecimentos.` : '')}${t.length ? `<ol class="tl">${t.map(e => `<li class="tl-item"><span class="tl-date">${esc(e.date || '')}</span><div class="panel"><h3 class="h-font">${esc(e.title)}</h3>${e.summary ? `<p>${esc(e.summary)}</p>` : ''}${(e.chapters || []).length ? `<div class="tagrow">${e.chapters.map(n => `<a class="tag" href="#/capitulo/${n}">Cap. ${n}</a>`).join('')}</div>` : ''}</div></li>`).join('')}</ol>` : empty('linha-do-tempo')}</div>`;
    crumb([['Linha do Tempo']]);
  }

  function pageMapa() {
    const m = B.map;
    $('#main').innerHTML = `<div class="page">${head(B.book.name, 'Mapa', m?.caption || '')}${m && (IMG.map || m.image) ? `<figure class="mapfig"><img src="${esc(IMG.map || m.image)}" alt="Mapa" data-lightbox></figure>` : empty('mapa')}</div>`;
    crumb([['Mapa']]);
    $$('[data-lightbox]').forEach(el => el.addEventListener('click', () => lightbox([{ src: IMG.map || m.image, title: 'Mapa' }], 0)));
  }

  function pageGaleria() {
    const items = [{ src: B.book.cover, title: `Capa · ${B.book.name}`, type: 'Capa' }, ...(IMG.gallery || []), ...A.gallery].filter((x, i, a) => x.src && a.findIndex(y => y.src === x.src) === i);
    $('#main').innerHTML = `<div class="page">${head(B.book.name, 'Galeria', `${items.length} ${items.length === 1 ? 'imagem' : 'imagens'}.`)}<div class="gal">${items.map((g, i) => `<button class="gi" data-i="${i}"><img src="${esc(g.src)}" alt="${esc(g.title || '')}" loading="lazy"><span>${esc(g.title || '')}</span></button>`).join('')}</div></div>`;
    $$('.gi').forEach(b => b.addEventListener('click', () => lightbox(items, Number(b.dataset.i))));
    crumb([['Galeria']]);
  }
  const notFound = () => { $('#main').innerHTML = `<div class="page">${head(B.book.name, 'Página não encontrada')}<div class="panel empty"><p>Esta página não existe. <a href="#/inicio">Voltar ao início</a></p></div></div>`; crumb([['Não encontrado']]); };

  /* ---------- lightbox ---------- */
  function lightbox(items, i) {
    let box = $('#lb');
    if (!box) {
      box = document.createElement('div'); box.id = 'lb'; box.className = 'lb';
      box.innerHTML = '<button class="lb-x" aria-label="Fechar">✕</button><button class="lb-p" aria-label="Anterior">‹</button><img alt=""><button class="lb-n" aria-label="Próxima">›</button><div class="lb-c"></div>';
      document.body.append(box);
      box.addEventListener('click', e => { if (e.target === box || e.target.closest('.lb-x')) box.classList.remove('open'); });
    }
    const show = k => { i = (k + items.length) % items.length; $('img', box).src = items[i].src; $('.lb-c', box).textContent = `${items[i].title || ''}${items.length > 1 ? ` · ${i + 1}/${items.length}` : ''}`; };
    $('.lb-p', box).onclick = () => show(i - 1); $('.lb-n', box).onclick = () => show(i + 1);
    $('.lb-p', box).hidden = $('.lb-n', box).hidden = items.length < 2;
    show(i); box.classList.add('open');
  }

  /* ---------- modais ---------- */
  function openModal(html, cls = '') {
    $('#modalPanel').className = 'modal-panel ' + cls; $('#modalPanel').innerHTML = html;
    $('#modal').classList.add('open'); $('#modal').setAttribute('aria-hidden', 'false');
  }
  function closeModal() { $('#modal').classList.remove('open'); $('#modal').setAttribute('aria-hidden', 'true'); }
  function openSearch() {
    openModal(`<div class="sbox">${icon('search')}<input id="sq" type="search" placeholder="Pesquisar capítulos, personagens, lugares…" autocomplete="off"><kbd>Esc</kbd></div><div class="sres" id="sres"><p class="muted">Digite para buscar.</p></div>`, 'search-panel');
    const inp = $('#sq'); inp.focus();
    inp.addEventListener('input', () => {
      const q = norm(inp.value); if (!q) { $('#sres').innerHTML = '<p class="muted">Digite para buscar.</p>'; return; }
      const r = [
        ...A.chapters.filter(c => norm(c.title).includes(q) || norm(c.pov).includes(q)).map(c => [`Capítulo ${c.number} · ${c.title}`, `#/capitulo/${c.number}`, 'Capítulo']),
        ...A.characters.filter(c => norm(c.name).includes(q)).map(c => [c.name, `#/personagem/${c.slug}`, 'Personagem']),
        ...A.places.filter(c => norm(c.name).includes(q)).map(c => [c.name, `#/lugar/${c.slug}`, 'Lugar'])
      ].slice(0, 30);
      $('#sres').innerHTML = r.length ? r.map(([t, h, k]) => `<a href="${h}" data-close><strong>${esc(t)}</strong><small>${k}</small></a>`).join('') : '<p class="muted">Nada encontrado.</p>';
    });
  }
  function openBooks() {
    openModal(`<div class="mhead"><h2 class="h-font">${esc(B.saga.name)}</h2><button class="ico" data-close aria-label="Fechar">${icon('close')}</button></div><div class="mlist">${B.saga.books.map(b => b.status === 'active'
      ? `<a href="${esc(b.entry)}#/inicio"><strong>Livro ${b.order} · ${esc(b.name)}</strong><small>${b.id === B.book.id ? 'Você está aqui' : 'Abrir livro'}</small></a>`
      : `<div class="lk">${icon('lock', 'ni')}<span><strong>Livro ${b.order} · ${esc(b.name)}</strong><small>Em preparação</small></span></div>`).join('')}</div>`);
  }
  function openSettings() {
    const presets = [['full', 'Completo'], ['balanced', 'Equilibrado'], ['performance', 'Desempenho']];
    openModal(`<div class="mhead"><h2 class="h-font">Configurações visuais</h2><button class="ico" data-close aria-label="Fechar">${icon('close')}</button></div>
      <p class="muted">Preferências guardadas só neste navegador.</p>
      <div class="seg">${presets.map(([k, l]) => `<button class="fchip ${state.preset === k ? 'on' : ''}" data-preset="${k}">${l}</button>`).join('')}</div>
      <label class="setrow"><span><strong>Transições entre páginas</strong><small>${esc(B.book.transitionLabel || 'Efeito ao trocar de página')}</small></span><input type="checkbox" id="optTr" ${state.transitions ? 'checked' : ''}></label>
      ${B.book.lanternOption ? `<label class="setrow"><span><strong>Lanterna</strong><small>O escuro cobre a tela e a luz segue o cursor.</small></span><input type="checkbox" id="optLa" ${state.lantern ? 'checked' : ''}></label>` : ''}`);
    $$('[data-preset]').forEach(b => b.addEventListener('click', () => { state.preset = b.dataset.preset; saveSettings(); openSettings(); }));
    $('#optTr').addEventListener('change', e => { state.transitions = e.target.checked; saveSettings(); });
    $('#optLa')?.addEventListener('change', e => { state.lantern = e.target.checked; saveSettings(); });
  }

  /* ---------- rota ---------- */
  let lastRoute = null;
  function route(first) {
    const raw = location.hash.replace(/^#\/?/, '') || 'inicio';
    const [base, arg] = raw.split('/');
    if (base === 'mapa' && !B.nav.some(g => g.items.includes('mapa'))) { location.hash = '#/inicio'; return; }
    const go = () => {
      switch (base) {
        case 'inicio': pageInicio(); break;
        case 'livros': pageLivros(); break;
        case 'capitulos': state.q = ''; state.narrator = 'all'; pageCapitulos(); break;
        case 'capitulo': pageCapitulo(arg); break;
        case 'linha-do-tempo': pageTimeline(); break;
        case 'personagens': state.q = ''; simpleGrid('personagens', 'Personagens', A.characters, charImage, 'personagem', 'person'); break;
        case 'personagem': entityPage(A.characters, arg, 'Personagens', 'personagem', charImage, 'person'); break;
        case 'lugares': state.q = ''; simpleGrid('lugares', 'Lugares', A.places, placeImage, 'lugar', 'pin'); break;
        case 'lugar': entityPage(A.places, arg, 'Lugares', 'lugar', placeImage, 'pin'); break;
        case 'mapa': pageMapa(); break;
        case 'galeria': pageGaleria(); break;
        default: notFound();
      }
      const active = { capitulo: 'capitulos', personagem: 'personagens', lugar: 'lugares' }[base] || base;
      $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.nav === active));
      $('#main').scrollTop = 0; window.scrollTo(0, 0);
      document.title = `${B.book.name} — ${B.saga.name}`;
      FX()?.afterRender?.();
      closeSidebar();
    };
    if (first || !state.transitions || reduced || state.preset === 'performance' || lastRoute === null) { go(); }
    else { const v = $('#veil'); v.className = 'veil go'; FX()?.transition?.(); setTimeout(() => { go(); }, 200); setTimeout(() => { v.className = 'veil'; }, 620); }
    lastRoute = raw;
  }
  function closeSidebar() { $('#sb')?.classList.remove('open'); $('#sbBackdrop')?.classList.remove('open'); }

  function contemplate(on) {
    document.body.classList.toggle('contemplating', on);
    $('#contemplate').setAttribute('aria-hidden', String(!on));
    FX()?.contemplate?.(on);
    if (on) { try { document.documentElement.requestFullscreen?.().catch(() => {}); } catch {} } else if (document.fullscreenElement) document.exitFullscreen?.();
  }

  function init() {
    shell(); applySettings();
    FX()?.init?.(B, { root: $('#fxRoot'), state });
    applySettings();
    $('#menuBtn').addEventListener('click', () => { $('#sb').classList.add('open'); $('#sbBackdrop').classList.add('open'); });
    $('#sbBackdrop').addEventListener('click', closeSidebar);
    $('#searchBtn').addEventListener('click', openSearch);
    $('#bookBtn').addEventListener('click', openBooks);
    $('#setBtn').addEventListener('click', openSettings);
    $('#perfBtn').addEventListener('click', () => { state.preset = state.preset === 'performance' ? (weak ? 'balanced' : 'full') : 'performance'; saveSettings(); });
    $('#contBtn').addEventListener('click', () => contemplate(true));
    document.addEventListener('click', e => {
      if (e.target.closest('[data-contemplate]')) contemplate(true);
      if (e.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === 'Escape') { closeModal(); $('#lb')?.classList.remove('open'); if (document.body.classList.contains('contemplating')) contemplate(false); }
      if ($('#lb')?.classList.contains('open')) { if (e.key === 'ArrowLeft') $('.lb-p', $('#lb')).click(); if (e.key === 'ArrowRight') $('.lb-n', $('#lb')).click(); }
    });
    $('#contemplate').addEventListener('click', () => contemplate(false));
    window.addEventListener('hashchange', () => route(false));
    route(true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
