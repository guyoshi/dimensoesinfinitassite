(() => {
  "use strict";

  const D = window.DI_DATA;
  const BOOK_ID = 'dinastia-polar';
  const timelineEntries = () => D.common?.entities?.timeline || D.timeline || [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const escapeRegExp = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const slugText = value => String(value || "").toLocaleLowerCase("pt-BR");

  const iconPaths = {
    home: '<path d="M3 11.5L12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/>',
    books: '<path d="M4 4h5v16H4zM10 4h5v16h-5zM16 6h4v14h-4z"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22z"/><path d="M4 5.5V22"/>',
    chapter: '<path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    timeline: '<path d="M4 6h12M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15a5 5 0 0 1 6 5"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
    network: '<circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 11l8-4M8 13l8 4"/>',
    family: '<circle cx="12" cy="7" r="3"/><circle cx="6" cy="11" r="2.5"/><circle cx="18" cy="11" r="2.5"/><path d="M7 21a5 5 0 0 1 10 0M2 21a4 4 0 0 1 5-3.8M22 21a4 4 0 0 0-5-3.8"/>',
    map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    pin: '<path d="M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13z"/><circle cx="12" cy="9" r="2"/>',
    shield: '<path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
    paw: '<circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="19" cy="13" r="2"/><path d="M8 18c0-3 2-5 4-5s4 2 4 5c0 2-1.5 3-4 3s-4-1-4-3z"/>',
    leaf: '<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16z"/><path d="M4 21c3-6 8-10 14-13"/>',
    bowl: '<path d="M4 11h16c0 6-3 9-8 9s-8-3-8-9z"/><path d="M7 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4M17 7c0-2 2-2 2-4"/>',
    scroll: '<path d="M6 4h12v14H8a3 3 0 0 0-3 3h12a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2"/><path d="M8 8h7M8 12h7"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-7 8"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 4.3 2.2c-1.1.7-1.8 1.2-1.8 2.8M12 18h.01"/>',
    law: '<path d="M12 3v18M5 6h14M6 6l-3 6h6zM18 6l-3 6h6zM7 21h10"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3h4v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10v4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/><path d="M6 18h12"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    close: '<path d="M5 5l14 14M19 5L5 19"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 4-4 2 2-4z"/>',
    crown: '<path d="M4 8l4 4 4-7 4 7 4-4-2 11H6z"/>',
    portal: '<circle cx="12" cy="12" r="8"/><path d="M12 4c4 4 4 12 0 16M12 4c-4 4-4 12 0 16M4 12h16"/>',
    eye: '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    wind: '<path d="M3 8h11c2 0 3-1 3-2.5S16 3 14.5 3M3 12h16c1.7 0 3 1.2 3 2.8S20.7 18 19 18M3 16h9"/>',
    'crossed-swords': '<path d="M5 4l7 7M19 4l-7 7M9 14l-5 5M15 14l5 5M4 4l3 1-2 2zM20 4l-3 1 2 2z"/>',
    fortress: '<path d="M4 21V9h3V5h3v4h4V5h3v4h3v12z"/><path d="M9 21v-5h6v5"/>',
    embers: '<path d="M12 3c2 4-1 5 2 8 1-2 3-2 3-5 3 3 4 7 2 11-1.5 3-4 4-7 4s-6-2-7-5c-1-4 2-7 5-9 0 3 1 4 2 5 2-3 0-5 0-9z"/>',
    hourglass: '<path d="M6 3h12M6 21h12M8 3c0 4 1 6 4 9-3 3-4 5-4 9M16 3c0 4-1 6-4 9 3 3 4 5 4 9"/>',
    copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    zoomin: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21M10 7v6M7 10h6"/>',
    zoomout: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21M7 10h6"/>',
    center: '<circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    fullscreen: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    filter: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    labels: '<path d="M4 6h16M4 12h10M4 18h13"/><circle cx="19" cy="12" r="2"/>'
  };
  const icon = (name, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.scroll}</svg>`;

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };

  const state = {
    route: "inicio",
    sidebarCollapsed: storage.get("di-sidebar-collapsed") === "1",
    characterQuery: "",
    chapterQuery: "",
    relationshipFilter: "all",
    loreSort: "alpha",
    loreFilter: "all",
    loreView: storage.get("di-lore-view") || "grid",
    settings: {
      preset: storage.get("di-preset") || "normal",
      particles: storage.get("di-particles") !== "0",
      transitions: storage.get("di-transitions") !== "0",
      textures: storage.get("di-textures") !== "0",
      blur: storage.get("di-blur") !== "0",
      shadows: storage.get("di-shadows") !== "0",
      motion: storage.get("di-motion") !== "0",
      particleAmount: Number(storage.get("di-particle-amount") || 22)
    }
  };

  const refs = {
    portal: $("#portal"), shell: $("#appShell"), sidebar: $("#sidebar"), nav: $("#sidebarNav"),
    main: $("#mainContent"), breadcrumbs: $("#breadcrumbs"), searchModal: $("#searchModal"),
    searchInput: $("#searchInput"), searchResults: $("#searchResults"), settingsDrawer: $("#settingsDrawer"),
    settingsContent: $("#settingsContent"), selectorModal: $("#selectorModal"), selectorContent: $("#selectorContent"),
    creditsModal: $("#creditsModal"),
    transitionVeil: $("#transitionVeil"), particles: $("#particleLayer"), particlesFront: $("#particleLayerFront")
  };

  const getBook = id => D.books.find(item => item.id === id);
  const getCharacter = id => D.characters.find(item => item.id === id || item.slug === id);
  const getDynasty = id => D.dynasties.find(item => item.id === id || item.slug === id);
  const getPlace = id => D.places.find(item => item.id === id || item.slug === id);
  const getChapter = id => D.chapters.find(item => item.id === id || String(item.number) === String(id));
  const getTimelineEntry = id => timelineEntries().find(item => item.id === id || item.slug === id || (item.legacySlugs || []).includes(id));
  const getMystery = id => D.mysteries.find(item => item.id === id || item.slug === id);
  const getTheme = id => D.common?.entities?.themes?.find(item => item.id === id || item.slug === id);
  const getLoreItem = (kind, id) => (D.lore[kind] || []).find(item => item.id === id || item.slug === id);

  const aliasMap = new Map();
  const aliases = [...(D.entityAliases || [])]
    .filter(item => item.text && item.text.length > 2)
    .sort((a, b) => b.text.length - a.text.length);
  aliases.forEach(item => {
    const key = slugText(item.text);
    if (!aliasMap.has(key)) aliasMap.set(key, item.route);
  });
  const aliasPattern = aliases.length
    ? new RegExp(`(${aliases.map(item => escapeRegExp(item.text)).join("|")})`, "giu")
    : null;

  function linkifyText(text = "") {
    if (!aliasPattern) return escapeHtml(text);
    let last = 0;
    let output = "";
    aliasPattern.lastIndex = 0;
    for (const match of text.matchAll(aliasPattern)) {
      const start = match.index ?? 0;
      output += escapeHtml(text.slice(last, start));
      const raw = match[0];
      const route = aliasMap.get(slugText(raw));
      output += route
        ? `<button class="inline-entity-link" data-route="${escapeHtml(route)}">${escapeHtml(raw)}</button>`
        : escapeHtml(raw);
      last = start + raw.length;
    }
    output += escapeHtml(text.slice(last));
    return output;
  }

  function imageOrIcon(src, iconName, alt, cls = "") {
    return src
      ? `<img class="${cls}" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy">`
      : `<span class="${cls} visual-fallback">${icon(iconName)}</span>`;
  }

  function emptyPanel(title, text, actionRoute, actionLabel) {
    return `<div class="dark-panel section-card dp-empty-panel"><div><h2>${escapeHtml(title)}</h2><p class="empty-inline">${escapeHtml(text)}</p>${actionRoute ? `<button class="secondary-button" data-route="${escapeHtml(actionRoute)}">${escapeHtml(actionLabel || "Continuar")}</button>` : ""}</div></div>`;
  }

  const PRESET_VALUES = {
    full: { particles: true, transitions: true, textures: true, blur: true, shadows: true, motion: true, particleAmount: 34 },
    normal: { particles: true, transitions: true, textures: true, blur: true, shadows: true, motion: true, particleAmount: 22 },
    performance: { particles: false, transitions: false, textures: false, blur: false, shadows: false, motion: false }
  };
  function detectPreset() {
    if (storage.get("di-polar-customized") === "1") return "custom";
    const s = state.settings;
    for (const key of Object.keys(PRESET_VALUES)) {
      const values = PRESET_VALUES[key];
      if (Object.keys(values).every(k => s[k] === values[k])) return key;
    }
    return "custom";
  }

  function applySettings() {
    state.settings.preset = detectPreset();
    const body = document.body;
    body.classList.toggle("no-particles", !state.settings.particles || state.settings.preset === "performance");
    body.classList.toggle("no-transitions", !state.settings.transitions);
    body.classList.toggle("no-textures", !state.settings.textures);
    body.classList.toggle("no-blur", !state.settings.blur);
    body.classList.toggle("no-shadows", !state.settings.shadows);
    body.classList.toggle("no-motion", !state.settings.motion);
    body.classList.toggle("performance-mode", state.settings.preset === "performance");
    const perfOn = state.settings.preset === "performance";
    const perfButton = $("#performanceToggle");
    if (perfButton) {
      perfButton.classList.toggle("active", perfOn);
      perfButton.setAttribute("aria-pressed", String(perfOn));
      const label = perfOn ? "Modo desempenho activado" : "Modo desempenho desactivado";
      perfButton.setAttribute("aria-label", label);
      perfButton.title = label;
    }
  }

  function persistSettings() {
    Object.entries(state.settings).forEach(([key, value]) => {
      const storageKey = key === "particleAmount" ? "di-particle-amount" : `di-${key}`;
      storage.set(storageKey, typeof value === "boolean" ? (value ? "1" : "0") : String(value));
    });
    applySettings();
    renderSettings();
  }

  function renderNav() {
    refs.nav.innerHTML = D.navigation.map(group => `
      <section class="nav-group">
        <div class="nav-group-title">${escapeHtml(group.group)}</div>
        ${group.items.map(item => `
          <button class="nav-item" data-route="${item.id}" data-tooltip="${escapeHtml(item.label)}">
            <span class="nav-icon">${icon(item.icon)}</span>
            <span class="nav-label">${escapeHtml(item.label)}</span>
          </button>`).join("")}
      </section>`).join("");
  }

  function setBreadcrumbs(items) {
    refs.breadcrumbs.innerHTML = items.map((item, index) => `${index ? '<span aria-hidden="true">›</span>' : ""}${item.route ? `<button data-route="${item.route}">${escapeHtml(item.label)}</button>` : `<span>${escapeHtml(item.label)}</span>`}`).join("");
  }

  function pageHeader(kicker, title, subtitle, actions = "") {
    return `<header class="page-header">
      <div><p class="eyebrow">${escapeHtml(kicker)}</p>${title ? `<h1>${escapeHtml(title)}</h1>` : ""}${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}</div>
      ${actions ? `<div class="page-actions">${actions}</div>` : ""}
    </header>`;
  }

  function miniEntity(title, subtitle, iconName, route, stateText = "", image = null) {
    return `<button class="mini-list-item" data-route="${escapeHtml(route)}">
      <span class="mini-icon ${image ? "has-image" : ""}">${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : icon(iconName)}</span>
      <span class="mini-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(subtitle || "Informação não registrada")}</small></span>
      ${stateText ? `<span class="mini-state">${escapeHtml(stateText)}</span>` : ""}
    </button>`;
  }

  function dpRingsSvg() {
    return `<svg class="dp-rings" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="var(--di-accent)" stroke-width="1">
        <circle cx="470" cy="120" r="60" stroke-dasharray="18 14 9 30" opacity=".5"/>
        <circle cx="470" cy="120" r="96" stroke-dasharray="40 22" opacity=".35"/>
        <circle cx="470" cy="120" r="140" stroke-dasharray="6 16 60 10" opacity=".22"/>
        <circle cx="90" cy="320" r="50" stroke-dasharray="12 22" opacity=".3"/>
        <circle cx="90" cy="320" r="84" stroke-dasharray="30 18 8 14" opacity=".18"/>
      </g>
    </svg>`;
  }

  function renderInicio() {
    const quick = [
      ["characters", "people", "Personagens", "Vozes ainda por registar dentro da hierarquia."],
      ["relationships", "network", "Relações", "Lealdade, vigilância e dívidas entre os anéis."],
      ["timeline", "timeline", "Linha do Tempo", "Cerimónia, ciclos e decretos do Conselho."],
      ["chapters", "chapter", "Capítulos", "Capítulos ainda por escrever."]
    ];
    const map = D.maps?.main;
    const focus = [
      ["jesed-dp-character-jokara-amarea", "Peso, verdade e sacrifício"],
      ["jesed-dp-character-nestira-amarea", "Sopro, fé e esperança"],
      ["jesed-dp-character-marv", "Construção, cuidado e legado"],
      ["jesed-dp-character-loutes", "Mistério além do tempo"],
      ["jesed-dp-character-gabasteres", "Força transformada em domínio"]
    ].map(([id, description]) => ({ character: getCharacter(id), description })).filter(item => item.character);
    const selectedPlaces = [
      "jesed-dp-place-kaeliran",
      "jesed-dp-place-khar-tondr",
      "jesed-dp-place-aelvar",
      "jesed-dp-place-braivar",
      "jesed-dp-place-avarrast",
      "jesed-dp-place-nyn-harad"
    ].map(getPlace).filter(Boolean);
    const homePlaceCard = place => `<article class="home-place-card" data-route="place/${escapeHtml(place.slug)}" tabindex="0" role="link"><div class="home-place-image ${place.image ? 'has-image' : ''}">${place.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="home-place-fallback" hidden>${icon('pin')}</span>` : `<span class="home-place-fallback">${icon('pin')}</span>`}</div><div class="home-place-copy"><p class="eyebrow">${escapeHtml(place.type || 'Lugar')}</p><h3>${escapeHtml(place.name)}</h3><p>${escapeHtml(place.region || place.summary)}</p></div><span class="home-card-link">Abrir ficha ${icon('arrow')}</span></article>`;
    refs.main.innerHTML = `<div class="page-enter">
      <section class="hero-map-card home-guide-hero">
        ${map?.image ? `<img src="${escapeHtml(map.image)}" alt="Mapa de Kaeliran e da Dinastia Polar" loading="eager">` : `<div class="dp-hero-map-placeholder">${dpRingsSvg()}</div>`}
        <div class="hero-map-content">
          <p class="eyebrow">Ciclo de Jesed — Guia do Livro</p>
          <img class="hero-logo glow-title" src="assets/branding/dinastia-polar/logo-white.webp" alt="Dinastia Polar" onerror="this.replaceWith(Object.assign(document.createElement('h1'),{className:'hero-title',textContent:'Dinastia Polar'}))">
          <p>A raiz cresceu. Os anéis se fecharam. E agora até o poder precisa provar que merece permanecer.</p>
          <div class="hero-actions">
            <button class="primary-button" data-route="map">${icon("map")} Abrir mapa</button>
            <button class="secondary-button" data-route="books">${icon("books")} Ver os cinco livros</button>
            <button class="secondary-button contemplate-button" data-contemplative="polar">${icon("eye")} Modo contemplativo</button>
          </div>
        </div>
      </section>
      <section class="quick-grid home-guide-grid">${quick.map(([route, iconName, label, text]) => `<button class="quick-card home-guide-card" data-route="${route}"><span class="quick-icon">${icon(iconName)}</span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(text)}</small></button>`).join("")}</section>
      <section class="metrics-grid">
        ${[[D.characters.length,"personagens","characters"],[D.dynasties.length,"dinastias","dynasties"],[D.places.length,"lugares","places"],[D.chapters.length,"capítulos escritos","chapters"],[timelineEntries().length,"eventos na linha do tempo","timeline"],[D.mysteries.length,"mistérios","mysteries"]].map(item => `<article class="metric-card" data-route="${item[2]}"><strong>${item[0]}</strong><span>${item[1]}</span></article>`).join("")}
      </section>
      ${focus.length ? `<section class="dark-panel section-card home-focus-section"><div class="section-heading"><div><p class="eyebrow">Vidas centrais</p><h2>Personagens em foco</h2><p>As figuras principais que atravessam a queda, a sobrevivência e o primeiro legado Polar.</p></div><button class="text-button" data-route="characters">Ver todos</button></div><div class="home-focus-grid">${focus.map(({character, description}) => `<button class="home-focus-card" data-route="character/${character.slug}"><span class="home-focus-avatar ${character.image ? 'has-image' : ''}">${character.image ? `<img src="${escapeHtml(character.image)}" alt="Retrato de ${escapeHtml(character.name)}" loading="lazy">` : icon('person')}</span><span><strong>${escapeHtml(character.name)}</strong><small>${escapeHtml(description)}</small></span></button>`).join("")}</div></section>` : ""}
      ${selectedPlaces.length ? `<section class="home-places-section"><div class="section-heading"><div><p class="eyebrow">Território e poder</p><h2>Lugares</h2><p>Capitais, cidades e regiões essenciais para compreender a Dinastia Polar.</p></div><button class="text-button" data-route="places">Ver todos os lugares</button></div><div class="home-place-grid">${selectedPlaces.map(homePlaceCard).join("")}</div></section>` : ""}
      <section class="dp-home-footer">
        ${dpRingsSvg()}
        <div class="dp-home-footer-content">
          <p class="dp-inscription">Nenhuma muralha se recorda de quem carregou as primeiras pedras.</p>
          <div class="dp-footer-links">
            <a href="index.html#/books">${icon("books")} Voltar aos livros</a>
            <button data-route="gallery">${icon("image")} Abrir galeria</button>
            <button data-contemplative="polar">${icon("eye")} Modo contemplativo</button>
            <button data-action="open-book-selector">${icon("book")} Selector de livro</button>
            <button data-action="open-credits">${icon("scroll")} Créditos</button>
          </div>
        </div>
      </section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed"},{label:"Início"}]);
  }

  function synopsisHtml(value) { return String(value || '').split(/\n\s*\n/).filter(Boolean).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join(''); }

  const bookCoverFallback = {
    "guerras-de-sangue": "assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp",
    "ruinas-dos-ceus": "assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-combined.webp"
  };
  function bookCoverHtml(book, cls) {
    if (!book.cover) return `<div class="${cls} book-cover-placeholder">${icon(book.icon)}</div>`;
    const fallback = bookCoverFallback[book.id];
    const onerror = fallback
      ? `this.onerror=function(){this.hidden=true;this.nextElementSibling.hidden=false};this.src='${fallback}'`
      : `this.hidden=true;this.nextElementSibling.hidden=false`;
    return `<img class="${cls}" src="${escapeHtml(book.cover)}" alt="Capa de ${escapeHtml(book.name)}" onerror="${onerror}"><div class="${cls} book-cover-placeholder" hidden>${icon(book.icon)}</div>`;
  }
  function renderBooks() {
    refs.main.innerHTML = `<div class="page-enter books-page">
      ${pageHeader("Ciclo de Jesed", "Os cinco livros", "Abra um livro para ver os detalhes, ou consulte os volumes ainda em preparação.")}
      <section class="bookshelf enhanced-bookshelf" aria-label="Livros do Ciclo de Jesed">
        ${D.books.map(book => {
          const active = book.status === "active" || book.id === BOOK_ID;
          const current = book.id === BOOK_ID;
          const media = bookCoverHtml(book, "book-card-cover");
          const inner = `<div class="book-card-cover-frame">${media}<span class="book-number readable-book-number">Livro ${book.order}</span></div><div class="book-card-copy"><h2>${escapeHtml(book.name)}</h2><p>${escapeHtml(book.teaser || book.visual)}</p></div><div class="book-status"><span>${current ? "Em preparação" : (book.status === "active" ? "Livro concluído" : "Em preparação")}</span><span>${current ? "Você está aqui" : (active ? "Ver detalhes" : "Bloqueado")}</span></div>`;
          return active ? `<div class="book-card cover-book-card active has-cover" data-route="book/${book.id}" tabindex="0" role="link" style="--book-a:${book.palette[0]};--book-b:${book.palette[1]};--book-c:${book.palette[2]}">${inner}</div>` : `<article class="book-card cover-book-card locked ${book.cover ? "has-cover" : ""}" style="--book-a:${book.palette[0]};--book-b:${book.palette[1]};--book-c:${book.palette[2]}" aria-disabled="true">${inner}</article>`;
        }).join("")}
      </section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Livros"}]);
  }

  const externalBookLinks = { "ruinas-dos-ceus": "ruinas.html#/inicio", "guerras-de-sangue": "guerras.html#/dashboard" };
  function renderBook(id) {
    const book = getBook(id) || getBook(BOOK_ID);
    const cover = bookCoverHtml(book, "");
    if (book.id !== BOOK_ID) {
      const href = externalBookLinks[book.id];
      const subtitle = book.status === "active" ? "Livro disponível, com sistema de navegação próprio." : href ? "Em construção — disponível para consulta nesta etapa." : "Ainda em preparação nesta etapa.";
      const eyebrow = book.status === "active" ? "Disponível" : href ? "Em preparação" : "Bloqueado nesta etapa";
      refs.main.innerHTML = `<div class="page-enter">
        ${pageHeader(`Livro ${book.order} · Ciclo de Jesed`, book.name, subtitle)}
        <section class="book-detail-hero"><div class="book-detail-cover">${cover}</div><div class="book-detail-copy"><p class="eyebrow">${eyebrow}</p><h2>${escapeHtml(book.name)}</h2><div class="book-full-synopsis">${synopsisHtml(book.synopsis || book.teaser || book.visual)}</div>${href ? `<div class="hero-actions"><a class="primary-button" href="${href}">${icon("arrow")} Ir para a página do livro</a></div>` : ""}</div></section>
      </div>`;
      setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Livros",route:"books"},{label:book.name}]);
      return;
    }
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader(`Livro ${book.order} · Ciclo de Jesed`, book.name, "Estrutura preparada; fichas, capítulos e mapa ainda por escrever.", `<button class="secondary-button" data-route="chapters">${icon("chapter")} Capítulos</button><button class="primary-button" data-route="map">${icon("map")} Mapa do período</button>`)}
      <section class="book-detail-hero"><div class="book-detail-cover">${cover}</div><div class="book-detail-copy"><p class="eyebrow">Estado editorial</p><h2>Em preparação</h2><div class="book-full-synopsis">${synopsisHtml(book.teaser || book.visual)}</div><div class="tag-row"><span class="tag">${D.chapters.length} capítulos escritos</span><span class="tag">Sem mapa ainda</span><span class="tag">Em preparação</span></div></div></section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Livros",route:"books"},{label:book.name}]);
  }

  function filteredCharacters() {
    const query = state.characterQuery.trim().toLocaleLowerCase("pt-BR");
    if (!query) return D.characters;
    return D.characters.filter(character => `${character.name} ${character.alias || ""} ${character.summary || ""}`.toLocaleLowerCase("pt-BR").includes(query));
  }

  function renderCharacters() {
    const list = filteredCharacters();
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Pessoas", "Personagens", "Vozes da Dinastia Polar — sacerdotes, conselheiros, guardas, prisioneiros e a própria família soberana.")}
      <div class="character-browser-toolbar"><label class="character-browser-search"><span class="sr-only">Pesquisar personagens</span><input type="search" data-character-search autocomplete="off" placeholder="Pesquisar por nome, alcunha ou descrição…" value="${escapeHtml(state.characterQuery)}"><small class="character-browser-search-count">${list.length}/${D.characters.length}</small></label></div>
      <div id="characterList">${list.length ? `<section class="character-browser-grid">${list.map(c => `<button class="character-browser-card" data-route="character/${c.slug}"><span class="character-browser-card-media">${c.image ? `<img src="${escapeHtml(c.image)}" alt="Retrato de ${escapeHtml(c.name)}" loading="lazy">` : `<span class="character-browser-card-fallback">${icon("person")}</span>`}</span><span class="character-browser-card-copy"><h2>${escapeHtml(c.name)}</h2><small class="character-browser-subtitle">${escapeHtml(c.alias || "")}</small></span></button>`).join("")}</section>` : emptyPanel("Ainda sem personagens registados", "As fichas da Dinastia Polar ainda não foram escritas. Esta página já está pronta para recebê-las.")}</div>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Personagens"}]);
  }

  function renderCharacter(slug) {
    const character = getCharacter(slug);
    if (!character) return renderNotFound();
    const dynasty = getDynasty(character.dynastyId);
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Personagem · Dinastia Polar", "", "", `<button class="secondary-button" data-route="relationships">${icon("network")} Relações</button>`)}
      <section class="character-hero">
        <div class="character-portrait ${character.image ? "has-image" : ""}">${imageOrIcon(character.image, "person", character.name, "character-portrait-image")}</div>
        <article class="parchment-panel character-summary"><p class="eyebrow character-clan-eyebrow">${escapeHtml(dynasty?.name || "Sem dinastia registada")}</p><h1>${escapeHtml(character.name)}</h1><span class="alias">${escapeHtml(character.alias || "")}</span></article>
      </section>
      <section class="dark-panel section-card"><h3>Descrição</h3><p>${linkifyText(character.summary || "Informação ainda não registrada.")}</p></section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Personagens",route:"characters"},{label:character.name}]);
  }

  function renderRelationships() {
    const filtered = D.relationships;
    refs.main.innerHTML = `<div class="page-enter relationships-page">
      ${pageHeader("Pessoas", "Relações", "Laços de lealdade, dívida, afecto e ruptura dentro e fora dos anéis.")}
      ${filtered.length ? `<section class="relationship-card-grid">${filtered.map(r => { const a = getCharacter(r.from), b = getCharacter(r.to); if (!a || !b) return ""; return `<article class="relationship-link-card"><div class="relationship-link-people"><button data-route="character/${a.slug}"><span><strong>${escapeHtml(a.name)}</strong></span></button><span class="relationship-link-symbol">${icon("network")}</span><button data-route="character/${b.slug}"><span><strong>${escapeHtml(b.name)}</strong></span></button></div><div class="relationship-link-copy"><p class="eyebrow">${escapeHtml(r.type)}</p><h2>${escapeHtml(r.state)}</h2></div></article>`; }).join("")}</section>` : emptyPanel("Ainda sem relações registadas", "O mapa de relações da Dinastia Polar ficará aqui quando as personagens forem escritas.")}
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Relações"}]);
  }

  function renderFamilies() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Pessoas", "Famílias", "Núcleos familiares dentro da hierarquia Polar.")}${D.families.length ? `<section class="social-entity-grid">${D.families.map(family => `<article class="social-entity-card"><div class="social-entity-copy"><h2>${escapeHtml(family.name)}</h2><p>${escapeHtml(family.summary || "")}</p></div></article>`).join("")}</section>` : emptyPanel("Ainda sem famílias registadas", "Núcleos familiares e linhagens aparecerão aqui.")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Famílias"}]);
  }

  function renderOrganisations() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Pessoas", "Organizações", "Conselho, sacerdócio, guarda e demais instituições que sustentam a Dinastia.")}${D.organisations.length ? `<section class="social-entity-grid">${D.organisations.map(org => `<article class="social-entity-card"><div class="social-entity-copy"><h2>${escapeHtml(org.name)}</h2><p>${escapeHtml(org.summary || "")}</p></div></article>`).join("")}</section>` : emptyPanel("Ainda sem organizações registadas", "Conselhos, sacerdócio e guardas aparecerão aqui.")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Organizações"}]);
  }

  function dynastyProfileCard(title, iconName, text, wide = false) {
    if (!text) return "";
    return `<article class="clan-profile-card ${wide ? "wide" : ""}"><h2>${icon(iconName)} ${escapeHtml(title)}</h2><p>${linkifyText(text)}</p></article>`;
  }

  function renderDynasties() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mundo", "Dinastias", "As casas, linhagens e estruturas de poder de Dinastia Polar. Abra uma ficha para consultar origem, território, cultura e personagens ligadas.")}${D.dynasties.length ? `<section class="clan-overview-grid">${D.dynasties.map(dynasty => `<article class="clan-overview-card" data-route="dynasty/${escapeHtml(dynasty.slug)}" tabindex="0" role="link"><div class="clan-overview-copy"><p class="eyebrow">${escapeHtml(dynasty.essence || "Dinastia")}</p><h2>${escapeHtml(dynasty.name)}</h2><p>${escapeHtml(dynasty.summary || "")}</p></div></article>`).join("")}</section>` : emptyPanel("Ainda sem dinastias registadas", "A Dinastia Polar e quaisquer casas relacionadas ainda não foram escritas. Esta página já está pronta para recebê-las, no mesmo formato usado para os clãs de Guerras de Sangue.")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Dinastias"}]);
  }

  function renderDynasty(slug) {
    const dynasty = getDynasty(slug);
    if (!dynasty) return renderNotFound();
    const profile = dynasty.profile || {};
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Dinastia", dynasty.name, dynasty.essence ? `Essência: ${dynasty.essence}` : "")}
      <section class="clan-profile-grid">
        ${dynastyProfileCard("Origem", "scroll", profile.origin)}
        ${dynastyProfileCard("Território", "map", profile.territory)}
        ${dynastyProfileCard("Cultura", "scroll", profile.culture)}
        ${dynastyProfileCard("Estrutura social", "people", profile.socialStructure)}
      </section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Dinastias",route:"dynasties"},{label:dynasty.name}]);
  }

  function renderChapters() {
    const q = state.chapterQuery.trim().toLocaleLowerCase("pt-BR");
    const filtered = q ? D.chapters.filter(ch => `${ch.number} ${ch.title} ${ch.summary}`.toLocaleLowerCase("pt-BR").includes(q)) : D.chapters;
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Dinastia Polar", "Capítulos", "Os capítulos escritos até agora.")}
      <input class="search" data-chapter-search type="search" placeholder="Pesquisar…" value="${escapeHtml(state.chapterQuery)}">
      ${filtered.length ? `<section class="chapter-grid">${filtered.map(ch => `<article class="chapter-card" data-route="chapter/${ch.id}"><div class="chapter-card-image fallback">${icon("chapter")}</div><div class="chapter-card-copy"><span class="chapter-number">Capítulo ${ch.number}</span><h2>${escapeHtml(ch.title)}</h2><p>${escapeHtml(ch.summary)}</p></div></article>`).join("")}</section>` : emptyPanel("Ainda sem capítulos escritos", "Quando os capítulos forem escritos, aparecerão aqui em ordem, com resumo e personagens ligadas.")}
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Capítulos"}]);
  }

  function renderChapter(id) {
    const chapter = getChapter(id);
    if (!chapter) return renderNotFound();
    refs.main.innerHTML = `<div class="page-enter chapter-detail-page">${pageHeader(`Dinastia Polar · Capítulo ${chapter.number}`, chapter.title, chapter.status)}<article class="parchment-panel chapter-longform"><div class="chapter-prose">${(chapter.details || []).map(paragraph => `<p>${linkifyText(paragraph)}</p>`).join("")}</div></article></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Capítulos",route:"chapters"},{label:`Capítulo ${chapter.number}`}]);
  }

  function renderTimeline() {
    const items = [...timelineEntries()].sort((a,b)=>(a.sortKey||0)-(b.sortKey||0));
    refs.main.innerHTML = `<div class="page-enter timeline-page">${pageHeader("História", "Linha do Tempo", "Cronologia institucional de Dinastia Polar — cerimónias, decretos e rupturas.")}${items.length ? `<section class="timeline-list">${items.map(entry=>`<article class="timeline-item timeline-entry-card" data-route="timeline/${entry.slug}"><div class="timeline-card-heading"><time>${escapeHtml(entry.dateLabel || "Data aproximada")}</time><span>${escapeHtml(entry.category || "Acontecimento")}</span></div><h3>${escapeHtml(entry.name)}</h3><p>${escapeHtml(entry.summary || "")}</p></article>`).join("")}</section>` : emptyPanel("Ainda sem linha do tempo", "Os ciclos, cerimónias e decisões da Dinastia Polar aparecerão aqui em ordem cronológica.")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Linha do Tempo"}]);
  }

  function renderTimelineEntry(slug) {
    const entry = getTimelineEntry(slug);
    if (!entry) return renderNotFound();
    refs.main.innerHTML = `<div class="page-enter timeline-detail-page"><button class="secondary-button timeline-back" data-route="timeline">← Voltar para a Linha do Tempo</button>${pageHeader("Linha do Tempo", entry.name, entry.dateLabel || "Data não estabelecida")}<article class="parchment-panel timeline-narrative"><p class="timeline-lead">${linkifyText(entry.summary || "Descrição ainda não registrada.")}</p></article></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Linha do Tempo",route:"timeline"},{label:entry.name}]);
  }

  function renderMysteries() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento narrativo", "Mistérios", "Origem, pistas e consequências de cada pergunta narrativa ainda em aberto.")}${D.mysteries.length ? `<section class="entity-grid mystery-stage13-grid">${D.mysteries.map(m=>`<article class="entity-card mystery-card" data-route="mystery/${m.slug}"><div class="entity-card-top"><span class="entity-avatar">${icon("question")}</span><div><h3>${escapeHtml(m.name)}</h3><span class="alias mystery-status">${escapeHtml(m.status||"Em aberto")}</span></div></div><p>${escapeHtml(m.question||"")}</p></article>`).join("")}</section>` : emptyPanel("Ainda sem mistérios registados", "Perguntas narrativas, pistas e revelações aparecerão aqui.")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Mistérios"}]);
  }

  function renderMystery(slug) {
    const mystery = getMystery(slug);
    if (!mystery) return renderNotFound();
    refs.main.innerHTML = `<div class="page-enter"><button class="secondary-button mystery-back" data-route="mysteries">← Voltar para Mistérios</button>${pageHeader("Mistério", mystery.name, mystery.status||"")}<section class="mystery-question-panel parchment-panel"><h2>${escapeHtml(mystery.question||"")}</h2><p>${linkifyText(mystery.summary||"")}</p></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Mistérios",route:"mysteries"},{label:mystery.name}]);
  }

  function renderThemes() {
    const items = D.common?.entities?.themes || [];
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Leitura temática", "Temas", "Ideias que atravessam a Dinastia Polar — ordem, peso, memória e merecimento do poder.")}${items.length ? `<section class="theme-stage14-grid">${items.map(item=>`<article class="parchment-panel theme-stage14-card" data-route="theme/${escapeHtml(item.slug)}" tabindex="0" role="link"><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.summary||"")}</p></article>`).join("")}</section>` : emptyPanel("Ainda sem temas registados", "As leituras temáticas do livro aparecerão aqui.")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Temas"}]);
  }

  function renderTheme(slug) {
    const item = getTheme(slug); if (!item) return renderNotFound();
    refs.main.innerHTML = `<div class="page-enter"><button class="secondary-button mystery-back" data-route="themes">← Voltar para Temas</button>${pageHeader(item.category||"Tema", item.name, item.summary||"")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Temas",route:"themes"},{label:item.name}]);
  }

  // ── Lugares ───────────────────────────────────────────────────────────────
  const dynastyOrder = ['Polar','Leidar','Braidar','Luzdar','Grastar','Cendar','Buldar','Vendrar','Mardrar','Quendrar','—'];
  const dynastyLabel = d => d === '—' ? 'Sem Dinastia' : `Dinastia ${d}`;

  function renderPlaces() {
    const places = D.places || [];
    const byDynasty = {};
    for (const p of places) {
      const d = p.dynasty || '—';
      (byDynasty[d] = byDynasty[d] || []).push(p);
    }
    const groups = dynastyOrder
      .filter(d => byDynasty[d]?.length)
      .map(d => {
        const list = byDynasty[d];
        return `<div class="place-dynasty-group">
          <h2 class="place-dynasty-heading">${escapeHtml(dynastyLabel(d))}</h2>
          <section class="entity-grid place-grid">${list.map(place => `
            <article class="entity-card place-card" data-route="place/${place.slug}">
              <div class="entity-card-top">
                <span class="entity-avatar ${place.image ? "has-image" : ""}">${place.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}">` : icon("pin")}</span>
                <div><h3>${escapeHtml(place.name)}</h3><span class="alias">${escapeHtml(place.type || "")}</span></div>
              </div>
              <p>${escapeHtml(place.summary || "")}</p>
              <div class="place-card-facts">
                <div><small>Região</small><strong>${escapeHtml(place.region || "Não estabelecida")}</strong></div>
                ${place.map ? `<div><small>Mapa</small><strong>Localização marcada</strong></div>` : ""}
              </div>
            </article>`).join("")}
          </section>
        </div>`;
      }).join("");
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mundo", "Lugares", "Cidades, capitais, regiões e pontos estratégicos das dez dinastias de Jesed.")}${places.length ? groups : emptyPanel("Ainda sem lugares registados", "Os territórios e capitais das dez dinastias aparecerão aqui.")}</div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Lugares"}]);
  }

  function renderPlace(slug) {
    const place = getPlace(slug); if (!place) return renderNotFound();
    const mapBtn = place.map ? `<button class="primary-button" data-route="map" data-focus-place="${escapeHtml(place.id)}">${icon("map")} Ver no mapa</button>` : "";
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Lugar", place.name, place.type || "", mapBtn)}
      <section class="place-detail-hero">
        <div class="place-illustration">${icon("pin")}</div>
        <article class="parchment-panel place-summary-panel">
          <p class="place-lead">${linkifyText(place.summary || "Descrição ainda não registada.")}</p>
          <div class="place-detail-facts">
            <div><small>Região</small><strong>${escapeHtml(place.region || "Não estabelecida")}</strong></div>
            <div><small>Dinastia</small><strong>${escapeHtml(dynastyLabel(place.dynasty || "—"))}</strong></div>
            <div><small>Tipo</small><strong>${escapeHtml(place.type || "Não classificado")}</strong></div>
            <div><small>Mapa</small><strong>${place.map ? "Localização marcada" : "Coordenada ainda não definida"}</strong></div>
          </div>
        </article>
      </section>
    </div>`;
    if (place.map) {
      refs.main.querySelector('[data-focus-place]')?.addEventListener("click", () => {
        routeTo("map");
        setTimeout(() => {
          const inst = document.getElementById("dpInteractiveMap")?._diMap;
          inst?.focus(place.id, {highlight: true});
        }, 350);
      });
    }
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Lugares",route:"places"},{label:place.name}]);
  }

  // ── Mapa interativo ───────────────────────────────────────────────────────
  function dpMapPin(place) {
    const m = place.map; if (!m) return "";
    // Só pins major recebem label no HTML — o mapa tem 65 pins e mostrar
    // todos os labels ao zoom cria sobreposição ilegível. Pins não-major
    // revelam o nome apenas no popup ao clicar, e via title no hover.
    return `<button class="di-map-pin" type="button"
      style="left:${m.x}%;top:${m.y}%"
      data-di-map-pin="${escapeHtml(place.id)}"
      data-pin-kind="${escapeHtml(m.kind || "place")}"
      data-major="${m.major ? "true" : "false"}"
      title="${escapeHtml(place.name)}"
      aria-label="Abrir ficha rápida de ${escapeHtml(place.name)}">
      <span class="di-map-pin-marker" aria-hidden="true"></span>
      ${m.major ? `<span class="di-map-pin-label">${escapeHtml(place.name)}</span>` : ""}
    </button>`;
  }

  function mountDPMap() {
    const map = D.maps?.main; if (!map) return;
    const root = document.getElementById("dpInteractiveMap"); if (!root) return;
    if (!window.DIMaps) return;
    const places = (D.places || []).filter(p => p.map);
    window.DIMaps.mount({
      root,
      key: 'dp-map',
      initialZoom: 1,
      minZoom: 0.65,
      maxZoom: 3.5,
      getItem: id => (D.places || []).find(p => p.id === id),
      renderPopup: place => `
        <div class="di-map-popup-inner">
          <div class="di-map-popup-header">
            <strong>${escapeHtml(place.name)}</strong>
            <span class="di-map-popup-type">${escapeHtml(place.type || "")}</span>
          </div>
          <p>${escapeHtml(place.summary || "")}</p>
          <div class="di-map-popup-facts">
            <span>${escapeHtml(dynastyLabel(place.dynasty || "—"))}</span>
          </div>
          <button class="di-map-popup-link" data-route="place/${escapeHtml(place.slug)}">${icon("arrow")} Ver ficha</button>
        </div>`
    });
  }

  function renderMap() {
    const map = D.maps?.main;
    if (!map) {
      refs.main.innerHTML = `<div class="page-enter map-page">${pageHeader("Mapa · Livro 3", "Jesed na Dinastia Polar", "O mapa continental de Jesed ainda está a ser preparado.")}${emptyPanel("Mapa ainda não disponível", "O mapa continental de Jesed na época de Dinastia Polar aparecerá aqui com marcadores de todas as capitais, cidades e regiões das dez dinastias.")}</div>`;
      setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Mapa"}]);
      return;
    }
    const places = (D.places || []).filter(p => p.map);
    const majorPlaces = places.filter(p => p.map?.major);
    const routeSvg = (map.routeLines || []).map(r => {
      const pts = r.points.split(" ").map(pt => { const [x,y] = pt.split(","); return `${x}%,${y}%`; }).join(" ");
      return `<polyline class="di-map-route di-map-route--${r.kind}" points="${pts}" fill="none"/>`;
    }).join("");
    const directoryLinks = majorPlaces.map(p =>
      `<button type="button" data-di-global-map-focus="${escapeHtml(p.id)}" data-di-map-root="dpInteractiveMap">${escapeHtml(p.name)}</button>`
    ).join("");
    refs.main.innerHTML = `<div class="page-enter map-page">
      <div id="dpInteractiveMap" class="di-map-shell dp-interactive-map" data-di-map-fullscreen
           style="--di-map-ratio:${escapeHtml(map.ratio)};--di-map-accent:#95743D">
        <div class="di-map-toolbar">
          <button type="button" data-di-map-action="zoom-in" aria-label="Aproximar" title="Aproximar">${icon("zoomin")}</button>
          <button type="button" data-di-map-action="zoom-out" aria-label="Afastar" title="Afastar">${icon("zoomout")}</button>
          <button type="button" data-di-map-action="center" aria-label="Centrar" title="Centrar">${icon("center")}</button>
          <button type="button" data-di-map-action="labels" aria-label="Legendas" title="Legendas">${icon("labels")}</button>
          <button type="button" data-di-map-action="fullscreen" aria-label="Ecrã inteiro" title="Ecrã inteiro">${icon("fullscreen")}</button>
        </div>
        <div class="di-map-viewport" data-di-map-viewport tabindex="0"
             aria-label="Mapa interativo de Jesed na época de Dinastia Polar. Arraste para deslocar, roda do rato para ampliar.">
          <div class="di-map-stage" data-di-map-stage>
            <img src="${escapeHtml(map.image)}" alt="${escapeHtml(map.title)}" draggable="false">
            ${routeSvg ? `<svg class="di-map-route-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${routeSvg}</svg>` : ""}
            ${places.map(dpMapPin).join("")}
          </div>
          <div data-di-map-popup-host></div>
        </div>
        <p class="di-map-helper">Roda do rato para zoom · Clique e arraste para navegar · Duplo clique para aproximar</p>
      </div>
      ${directoryLinks ? `<article class="parchment-panel map-place-directory"><div class="section-heading"><div><p class="eyebrow">${places.length} lugares localizados</p><h2>Capitais e marcos</h2></div></div><div class="map-place-links">${directoryLinks}</div></article>` : ""}
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Mapa"}]);
    requestAnimationFrame(mountDPMap);
  }

  function loreKindInfo(kind) {
    return {
      fauna: ["Fauna", "Animais de Kaeliran e dos territórios Polar.", "paw"],
      flora: ["Flora", "Plantas, raízes e fibras associadas à Dinastia.", "leaf"],
      foods: ["Alimentos", "Preparações e alimentos cerimoniais ou cotidianos.", "bowl"],
      concepts: ["Conceitos e Leis", "Símbolos, costumes e princípios institucionais.", "scroll"]
    }[kind] || ["Lore", "Conteúdo do mundo.", "scroll"];
  }

  function renderLore(kind) {
    const actualKind = kind === "lore" ? "concepts" : kind;
    state.loreKind = actualKind;
    const [title, subtitle, iconName] = loreKindInfo(actualKind);
    const items = [...(D.lore[actualKind] || [])].sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Lore", title, subtitle)}<div id="loreList">${items.length ? `<section class="lore-grid lore-stage11-grid">${items.map(item=>`<article class="lore-card lore-stage11-card has-image" data-route="lore-item/${actualKind}/${item.slug}"><div class="lore-image-placeholder">${icon(iconName)}</div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.summary||"")}</p></article>`).join("")}</section>` : emptyPanel("Ainda sem itens registados", "Este catálogo de lore ainda está vazio, mas já está pronto para receber conteúdo.")}</div></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:title}]);
  }

  function renderLoreItem(kind, slug) {
    const item = getLoreItem(kind, slug); if (!item) return renderNotFound();
    const [title] = loreKindInfo(kind);
    refs.main.innerHTML = `<div class="page-enter">${pageHeader(title, item.name, item.type||"")}<article class="parchment-panel lore-detail"><p class="lore-lead">${linkifyText(item.summary||"")}</p></article></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:title,route:kind==="concepts"?"lore":kind},{label:item.name}]);
  }

  function renderGallery() {
    const items = D.common?.entities?.gallery || [];
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Visual", "Galeria", "Imagens organizadas por categoria. Ainda sem fotografias ou ilustrações enviadas.")}${items.length ? `<section class="di-gallery-page"><div class="di-gallery-grid">${items.map(item=>`<button class="di-gallery-card" type="button" data-gallery-item data-gallery-src="${escapeHtml(item.image)}" data-gallery-title="${escapeHtml(item.name)}"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy"></button>`).join("")}</div></section>` : emptyPanel("Ainda sem imagens", "Quando houver fotografias, mapas e ilustrações, aparecerão aqui organizados por categoria.")}</div>`;
    window.DI_GALLERY?.mount(refs.main);
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"inicio"},{label:"Galeria"}]);
  }

  function renderNotFound() {
    refs.main.innerHTML = `<div class="empty-state page-enter"><div><span class="empty-state-icon">${icon("question")}</span><h2>Entidade não encontrada</h2><p>A referência pode ter sido removida ou ainda não foi introduzida.</p><button class="primary-button" data-route="inicio">Voltar ao início</button></div></div>`;
  }

  function activeNavForRoute(base, parts) {
    const map = { book:"books", character:"characters", chapter:"chapters", timeline:"timeline", mystery:"mysteries", theme:"themes", dynasty:"dynasties", place:"places", "lore-item": parts[0] === "concepts" ? "lore" : parts[0] };
    return map[base] || base;
  }

  function routeTo(route, { replace = false } = {}) {
    if (!route) return;
    const requestedRoute = route;
    route = window.JESED_COMMON?.resolveLegacyRoute(route, BOOK_ID) || route;
    if (route !== requestedRoute) {
      history.replaceState(null, "", `#/${route}`);
      replace = true;
    }
    if (state.settings.transitions && state.settings.motion && state.settings.preset !== "performance") {
      refs.transitionVeil.classList.remove("active");
      void refs.transitionVeil.offsetWidth;
      refs.transitionVeil.classList.add("active");
    }
    state.route = route;
    if (!replace) location.hash = `#/${route}`;
    const [base, ...parts] = route.split("/");
    const renderers = {
      inicio: renderInicio, books: renderBooks, characters: renderCharacters, relationships: renderRelationships,
      families: renderFamilies, organisations: renderOrganisations, chapters: renderChapters,
      timeline: renderTimeline, themes: renderThemes, mysteries: renderMysteries, dynasties: renderDynasties,
      places: renderPlaces, map: renderMap, fauna: () => renderLore("fauna"),
      flora: () => renderLore("flora"), foods: () => renderLore("foods"), lore: () => renderLore("concepts"),
      gallery: renderGallery
    };
    if (base === "book") renderBook(parts[0]);
    else if (base === "character") renderCharacter(parts[0]);
    else if (base === "chapter") renderChapter(parts[0]);
    else if (base === "timeline" && parts[0]) renderTimelineEntry(parts[0]);
    else if (base === "mystery") renderMystery(parts[0]);
    else if (base === "theme") renderTheme(parts[0]);
    else if (base === "dynasty") renderDynasty(parts[0]);
    else if (base === "place") renderPlace(parts[0]);
    else if (base === "lore-item") renderLoreItem(parts[0], parts[1]);
    else if (renderers[base]) renderers[base]();
    else renderNotFound();

    const activeRoute = activeNavForRoute(base, parts);
    $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.route === activeRoute));
    refs.sidebar.classList.remove("mobile-open");
    refs.main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: state.settings.motion ? "smooth" : "auto" });
  }

  function searchableEntities() {
    return [
      ...D.characters.map(item => ({type:"Personagens",name:item.name,subtitle:item.alias,description:item.summary,route:`character/${item.slug}`,icon:"person",image:item.image})),
      ...D.dynasties.map(item => ({type:"Dinastias",name:item.name,subtitle:item.essence,description:item.summary,route:`dynasty/${item.slug}`,icon:"crown"})),
      ...D.places.map(item => ({type:"Lugares",name:item.name,subtitle:item.type,description:item.summary,route:`place/${item.slug}`,icon:"pin"})),
      ...D.chapters.map(item => ({type:"Capítulos",name:`Capítulo ${item.number} — ${item.title}`,subtitle:item.status,description:item.summary,route:`chapter/${item.id}`,icon:"chapter"})),
      ...timelineEntries().map(item => ({type:"Linha do Tempo",name:item.name,subtitle:item.category,description:item.summary,route:`timeline/${item.slug}`,icon:"timeline"})),
      ...D.mysteries.map(item => ({type:"Mistérios",name:item.name,subtitle:item.status,description:item.question,route:`mystery/${item.slug}`,icon:"question"}))
    ];
  }

  function openSearch() {
    refs.searchModal.classList.add("open");
    refs.searchModal.setAttribute("aria-hidden", "false");
    refs.searchInput.value = "";
    renderSearchResults("");
    setTimeout(() => refs.searchInput.focus(), 20);
  }
  function closeSearch() { refs.searchModal.classList.remove("open"); refs.searchModal.setAttribute("aria-hidden", "true"); }
  function renderSearchResults(query) {
    const q = slugText(query.trim());
    let results = searchableEntities();
    if (q) results = results.filter(item => slugText(`${item.name} ${item.subtitle || ""} ${item.description || ""}`).includes(q));
    results = results.slice(0, 80);
    if (!results.length) { refs.searchResults.innerHTML = `<div class="empty-search">Nenhum resultado encontrado. O conteúdo deste livro ainda está a ser escrito.</div>`; return; }
    const grouped = results.reduce((acc,item) => ((acc[item.type] ||= []).push(item),acc),{});
    refs.searchResults.innerHTML = Object.entries(grouped).map(([type, items]) => `<section class="search-result-group"><h3>${escapeHtml(type)}</h3>${items.map(item => `<button class="search-result-item" data-route="${item.route}"><span class="search-result-icon ${item.image ? "has-image" : ""}">${item.image ? `<img src="${item.image}" alt="">` : icon(item.icon)}</span><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.subtitle || "")}</small></span></button>`).join("")}</section>`).join("");
  }

  function openSettings() { renderSettings(); refs.settingsDrawer.classList.add("open"); refs.settingsDrawer.setAttribute("aria-hidden", "false"); }
  function closeSettings() { refs.settingsDrawer.classList.remove("open"); refs.settingsDrawer.setAttribute("aria-hidden", "true"); }
  function settingToggle(key, title, description, enabled) { return `<div class="setting-row"><span class="setting-copy"><strong>${title}</strong><small>${description}</small></span><button class="switch ${enabled ? "on" : ""}" data-setting="${key}" aria-pressed="${enabled}"></button></div>`; }
  function renderSettings() {
    const s = state.settings;
    refs.settingsContent.innerHTML = `<div class="settings-group"><h3>Perfis rápidos</h3><div class="preset-row">${[["full","Completo"],["normal","Equilibrado"],["performance","Desempenho"],["custom","Personalizado"]].map(item => `<button class="preset-button ${s.preset === item[0] ? "active" : ""}" data-preset="${item[0]}">${item[1]}</button>`).join("")}</div></div><div class="settings-group"><h3>Controlo individual</h3>${settingToggle("particles","Poeira e partículas","Poeira fina, reflexos e elementos suspensos.",s.particles)}${settingToggle("transitions","Transições entre páginas","Véu de pedra entre uma página e outra.",s.transitions)}${settingToggle("textures","Texturas e gravações","Anéis, fissuras e marcas na pedra.",s.textures)}${settingToggle("blur","Desfoque de painéis","Efeito de vidro nas barras e janelas.",s.blur)}${settingToggle("shadows","Sombras profundas","Profundidade dos cartões e painéis.",s.shadows)}${settingToggle("motion","Movimento e animações","Entradas, anéis e selos dourados.",s.motion)}<div class="setting-row range-row"><span class="setting-copy"><strong>Quantidade de poeira</strong><small>Ajuste fino do fundo.</small></span><input type="range" min="4" max="50" value="${s.particleAmount}" data-setting-range="particleAmount"></div></div>`;
  }

  function openSelector(type) {
    const books = type === "books";
    const list = books ? D.books : D.sagas;
    const hrefFor = item => books
      ? (item.id === "ruinas-dos-ceus" ? "ruinas.html#/inicio" : item.id === "guerras-de-sangue" ? "guerras.html#/dashboard" : item.id === BOOK_ID ? "" : "")
      : (item.id === "ciclo-de-jesed" ? "index.html#/books" : "");
    refs.selectorContent.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${books ? "Livro" : "Dimensão"}</p><h2>${books ? "Escolher livro" : "Escolher saga"}</h2></div><button class="icon-button" data-action="close-selector">${icon("close")}</button></div><div class="selector-grid">${list.map(item => {
      const isCurrent = books && item.id === BOOK_ID;
      const href = isCurrent ? "" : ((item.status === "active" || (books && item.id === BOOK_ID)) ? hrefFor(item) : "");
      const fallbackImg = books ? bookCoverFallback[item.id] : null;
      const coverOnerror = fallbackImg ? `this.onerror=function(){this.hidden=true;this.nextElementSibling.hidden=false};this.src='${fallbackImg}'` : `this.hidden=true;this.nextElementSibling.hidden=false`;
      const media = item.cover ? `<span class="selector-cover"><img src="${escapeHtml(item.cover)}" alt="Capa de ${escapeHtml(item.name)}" onerror="${coverOnerror}"><span class="selector-cover-fallback" hidden>${icon(item.icon||item.symbol)}</span></span>` : `<span class="selector-cover symbol">${icon(item.icon||item.symbol)}</span>`;
      const inner = `${media}<strong>${escapeHtml(item.name)}</strong><small>${isCurrent ? "Você está aqui" : (href ? "Disponível" : "Bloqueado nesta etapa")}</small>`;
      return isCurrent ? `<div class="selector-card active" aria-current="true">${inner}</div>` : href ? `<a class="selector-card active" href="${href}">${inner}</a>` : `<button class="selector-card locked" disabled>${inner}</button>`;
    }).join("")}</div>`;
    refs.selectorModal.classList.add("open");
    refs.selectorModal.setAttribute("aria-hidden", "false");
  }
  function closeSelector() { refs.selectorModal.classList.remove("open"); refs.selectorModal.setAttribute("aria-hidden", "true"); }
  function openCredits() { refs.creditsModal.classList.add("open"); refs.creditsModal.setAttribute("aria-hidden", "false"); }
  function closeCredits() { refs.creditsModal.classList.remove("open"); refs.creditsModal.setAttribute("aria-hidden", "true"); }

  function showToast(message) {
    let toast = $("#diToast");
    if (!toast) { toast = document.createElement("div"); toast.id = "diToast"; toast.className = "di-toast"; document.body.append(toast); }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.addEventListener("click", event => {
    const enter = event.target.closest("[data-enter-saga]");
    if (enter) { routeTo("inicio"); return; }
    const routeElement = event.target.closest("[data-route]");
    if (routeElement && routeElement.dataset.route) { closeSearch(); closeSelector(); routeTo(routeElement.dataset.route); return; }

    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "open-settings") openSettings();
    if (action === "close-settings") closeSettings();
    if (action === "close-search") closeSearch();
    if (action === "close-selector") closeSelector();
    if (action === "open-book-selector") openSelector("books");
    if (action === "open-credits") openCredits();
    if (action === "close-credits") closeCredits();

    const charFilter = event.target.closest("[data-char-filter]"); if (charFilter) renderCharacters();
    const relFilter = event.target.closest("[data-rel-filter]"); if (relFilter) { state.relationshipFilter = relFilter.dataset.relFilter; renderRelationships(); }
    const setting = event.target.closest("[data-setting]"); if (setting) { const key = setting.dataset.setting; state.settings[key] = !state.settings[key]; storage.set("di-polar-customized","1"); persistSettings(); }
    const preset = event.target.closest("[data-preset]"); if (preset) {
      state.settings.preset = preset.dataset.preset;
      if (state.settings.preset === "custom") { storage.set("di-polar-customized","1"); persistSettings(); }
      else {
        storage.set("di-polar-customized","0");
        if (state.settings.preset === "full") Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:34});
        if (state.settings.preset === "normal") Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:22});
        if (state.settings.preset === "performance") Object.assign(state.settings,{particles:false,transitions:false,textures:false,blur:false,shadows:false,motion:false});
        persistSettings();
      }
    }
  });

  $("#sidebarToggle").addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    refs.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
    storage.set("di-sidebar-collapsed", state.sidebarCollapsed ? "1" : "0");
  });
  $("#mobileMenu").addEventListener("click", () => refs.sidebar.classList.toggle("mobile-open"));
  $("#searchButton").addEventListener("click", openSearch);
  refs.searchInput.addEventListener("input", () => renderSearchResults(refs.searchInput.value));
  refs.main.addEventListener("input", event => {
    if (event.target.matches("[data-character-search]")) {
      state.characterQuery = event.target.value;
      const pos = event.target.selectionStart;
      renderCharacters();
      const el = $("[data-character-search]");
      if (el) { el.focus(); el.setSelectionRange(pos, pos); }
      return;
    }
    if (event.target.matches("[data-chapter-search]")) {
      state.chapterQuery = event.target.value;
      const pos = event.target.selectionStart;
      renderChapters();
      const el = $("[data-chapter-search]");
      if (el) { el.focus(); el.setSelectionRange(pos, pos); }
    }
  });
  $("#settingsButton").addEventListener("click", openSettings);
  $("#performanceToggle").addEventListener("click", () => {
    state.settings.preset = state.settings.preset === "performance" ? "normal" : "performance";
    storage.set("di-polar-customized","0");
    if (state.settings.preset === "performance") Object.assign(state.settings,{particles:false,transitions:false,textures:false,blur:false,shadows:false,motion:false});
    else Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true});
    persistSettings();
    showToast(state.settings.preset === "performance" ? "Modo desempenho activado" : "Modo equilibrado activado");
  });
  $("#sagaSelector").addEventListener("click", () => openSelector("sagas"));
  $("#bookLens").addEventListener("click", () => openSelector("books"));
  refs.settingsContent.addEventListener("input", event => { if (event.target.matches("[data-setting-range]")) { state.settings[event.target.dataset.settingRange] = Number(event.target.value); storage.set("di-polar-customized","1"); persistSettings(); } });
  document.addEventListener("keydown", event => {
    const card = event.target.closest?.("[role='link'][data-route]");
    if (card && (event.key === "Enter" || event.key === " ") && !event.target.closest("button,a")) { event.preventDefault(); routeTo(card.dataset.route); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
    if (event.key === "Escape") { closeSearch(); closeSettings(); closeSelector(); closeCredits(); refs.sidebar.classList.remove("mobile-open"); }
  });
  window.addEventListener("hashchange", () => routeTo(location.hash.replace(/^#\//, "") || "inicio", { replace: true }));

  function initIcons() { $$('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); }); }
  function init() {
    initIcons();
    renderNav();
    refs.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
    applySettings();
    const route = location.hash.replace(/^#\//, "") || "inicio";
    routeTo(route, { replace: true });
  }
  init();
})();
