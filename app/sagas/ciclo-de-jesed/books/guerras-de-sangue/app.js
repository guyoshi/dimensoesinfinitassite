(() => {
  "use strict";

  const D = window.DI_DATA;
  const BOOK_ID = 'guerras-de-sangue';
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
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15a5 5 0 0 1 6 5"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
    network: '<circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 11l8-4M8 13l8 4"/>',
    family: '<circle cx="12" cy="7" r="3"/><circle cx="6" cy="11" r="2.5"/><circle cx="18" cy="11" r="2.5"/><path d="M7 21a5 5 0 0 1 10 0M2 21a4 4 0 0 1 5-3.8M22 21a4 4 0 0 0-5-3.8"/>',
    banner: '<path d="M5 22V3"/><path d="M6 4h12l-2 4 2 4H6"/>',
    map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    pin: '<path d="M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13z"/><circle cx="12" cy="9" r="2"/>',
    shield: '<path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
    paw: '<circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="19" cy="13" r="2"/><path d="M8 18c0-3 2-5 4-5s4 2 4 5c0 2-1.5 3-4 3s-4-1-4-3z"/>',
    leaf: '<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16z"/><path d="M4 21c3-6 8-10 14-13"/>',
    grain: '<path d="M12 22V5"/><path d="M12 8c-4 0-6-2-6-5 4 0 6 2 6 5zM12 12c4 0 6-2 6-5-4 0-6 2-6 5zM12 16c-4 0-6-2-6-5 4 0 6 2 6 5zM12 20c4 0 6-2 6-5-4 0-6 2-6 5z"/>',
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
    root: '<path d="M12 3v18M12 8c-4-4-7-1-8 2 4 0 6 1 8 4M12 10c4-4 7-1 8 2-4 0-6 1-8 4M12 15c-2 2-4 4-4 6M12 15c2 2 4 4 4 6"/>',
    skull: '<path d="M6 15v-3a6 6 0 1 1 12 0v3l-2 2v3H8v-3z"/><circle cx="9.5" cy="12" r="1"/><circle cx="14.5" cy="12" r="1"/><path d="M10 17h4"/>',
    copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    zoomin: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21M10 7v6M7 10h6"/>',
    zoomout: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21M7 10h6"/>',
    center: '<circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    fullscreen: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    bone: '<path d="M7 5a2 2 0 1 0-3-1 2 2 0 1 0 1 3l12 12a2 2 0 1 0 3 1 2 2 0 1 0-1-3z"/>',
    water: '<path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    blade: '<path d="M18 3l3 3-11 11-4 1 1-4z"/><path d="M5 17l2 2-3 3-2-2z"/>',
    filter: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    chevron: '<path d="M8 10l4 4 4-4"/>',
    location: '<path d="M12 21s6-5.2 6-12a6 6 0 1 0-12 0c0 6.8 6 12 6 12z"/><circle cx="12" cy="9" r="2"/>',
    labels: '<path d="M4 6h16M4 12h10M4 18h13"/><circle cx="19" cy="12" r="2"/>'
  };
  const icon = (name, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.scroll}</svg>`;

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };

  // O site deve abrir sempre em modo desempenho em mobile, em qualquer página do livro.
  const isMobileDevice = matchMedia("(max-width: 760px)").matches;
  if (isMobileDevice) storage.set("di-guerras-customized", "0");

  const state = {
    route: "portal",
    sidebarCollapsed: storage.get("di-sidebar-collapsed") === "1",
    viewMode: window.DI_CHARACTER_BROWSER?.readView("guerras-de-sangue", "di-character-view") || storage.get("di-character-view") || "grid",
    characterTab: "overview",
    characterQuery: "",
    characterFilter: "all",
    searchMode: "titles",
    relationshipFilter: "all",
    chapterQuery: "",
    loreSort: "alpha",
    loreFilter: "all",
    loreView: storage.get("di-lore-view") || "grid",
    timelineSelection: storage.get("di-gs-timeline-selection") || "",
    settings: isMobileDevice ? {
      preset: "performance",
      particles: false,
      transitions: false,
      textures: false,
      blur: false,
      shadows: false,
      motion: false,
      particleAmount: Number(storage.get("di-particle-amount") || 22)
    } : {
      preset: storage.get("di-preset") || "normal",
      particles: storage.get("di-particles") !== "0",
      transitions: storage.get("di-transitions") !== "0",
      textures: storage.get("di-textures") !== "0",
      blur: storage.get("di-blur") !== "0",
      shadows: storage.get("di-shadows") !== "0",
      motion: storage.get("di-motion") !== "0",
      particleAmount: Number(storage.get("di-particle-amount") || 22)
    },
    map: { zoom: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0 }
  };

  const refs = {
    portal: $("#portal"), shell: $("#appShell"), sidebar: $("#sidebar"), nav: $("#sidebarNav"),
    main: $("#mainContent"), breadcrumbs: $("#breadcrumbs"), searchModal: $("#searchModal"),
    searchInput: $("#searchInput"), searchResults: $("#searchResults"), settingsDrawer: $("#settingsDrawer"),
    settingsContent: $("#settingsContent"), selectorModal: $("#selectorModal"), selectorContent: $("#selectorContent"),
    transitionVeil: $("#transitionVeil"), particles: $("#particleLayer"), particlesFront: $("#particleLayerFront")
  };

  const getBook = id => D.books.find(item => item.id === id);
  const getCharacter = id => D.characters.find(item => item.id === id || item.slug === id);
  const getClan = id => D.clans.find(item => item.id === id || item.slug === id);
  const getPlace = id => D.places.find(item => item.id === id || item.slug === id);
  const getChapter = id => D.chapters.find(item => item.id === id || String(item.number) === String(id));
  const getTimelineEntry = id => timelineEntries().find(item => item.id === id || item.slug === id || (item.legacySlugs || []).includes(id));
  const getMystery = id => D.mysteries.find(item => item.id === id || item.slug === id);
  const getTheme = id => D.common?.entities?.themes?.find(item => item.id === id || item.slug === id);
  const getLoreItem = (kind, id) => (D.lore[kind] || []).find(item => item.id === id || item.slug === id);
  const routeForEntityId = id => {
    const c = getCharacter(id); if (c) return `character/${c.slug}`;
    const p = getPlace(id); if (p) return `place/${p.slug}`;
    const cl = getClan(id); if (cl) return `clan/${cl.slug}`;
    const entry = getTimelineEntry(id); if (entry) return `timeline/${entry.slug}`;
    return null;
  };

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

  function fillParticleLayer(layer, count, sizeMin, sizeMax) {
    layer.innerHTML = "";
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.setProperty("--size", `${sizeMin + Math.random() * (sizeMax - sizeMin)}px`);
      particle.style.setProperty("--duration", `${12 + Math.random() * 24}s`);
      particle.style.setProperty("--delay", `${-Math.random() * 25}s`);
      particle.style.setProperty("--sway", `${-90 + Math.random() * 180}px`);
      layer.appendChild(particle);
    }
  }

  function createParticles() {
    refs.particles.innerHTML = "";
    if (refs.particlesFront) refs.particlesFront.innerHTML = "";
    if (!state.settings.particles || state.settings.preset === "performance") return;
    const count = Math.max(4, Math.min(50, state.settings.particleAmount));
    fillParticleLayer(refs.particles, count, 1, 4.5);
    if (refs.particlesFront) fillParticleLayer(refs.particlesFront, Math.max(2, Math.round(count * .4)), 2.5, 6);
  }

  const PRESET_VALUES = {
    full: { particles: true, transitions: true, textures: true, blur: true, shadows: true, motion: true, particleAmount: 34 },
    normal: { particles: true, transitions: true, textures: true, blur: true, shadows: true, motion: true, particleAmount: 22 },
    performance: { particles: false, transitions: false, textures: false, blur: false, shadows: false, motion: false }
  };
  function detectPreset() {
    if (storage.get("di-guerras-customized") === "1") return "custom";
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
    createParticles();
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

  function renderPortal() {
    refs.portal.innerHTML = `
      <div class="dimension-orbit" aria-hidden="true"></div>
      <div class="portal-wrap page-enter">
        <p class="portal-kicker">Arquivo pessoal do autor</p>
        <h1 class="portal-title">Dimensões Infinitas</h1>
        <p class="portal-subtitle">Um arquivo interligado de personagens, relações, mundos, acontecimentos e consequências.</p>
        <section class="saga-grid">
          ${D.sagas.map(saga => `
            <article class="saga-card ${saga.status}" ${saga.status === "active" ? 'data-enter-saga="1"' : ""}>
              <span class="saga-icon-large">${icon(saga.symbol)}</span>
              <h2>${escapeHtml(saga.name)}</h2>
              <p>${escapeHtml(saga.description)}</p>
              <span class="saga-state">${saga.status === "active" ? "Disponível" : "Em preparação"}</span>
              ${saga.status === "active" ? `<button class="saga-enter" data-enter-saga="1">Entrar ${icon("arrow")}</button>` : ""}
            </article>`).join("")}
        </section>
      </div>`;
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

  function canonNotice() {
    return "";
  }

  function miniEntity(title, subtitle, iconName, route, stateText = "", image = null) {
    return `<button class="mini-list-item" data-route="${escapeHtml(route)}">
      <span class="mini-icon ${image ? "has-image" : ""}">${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : icon(iconName)}</span>
      <span class="mini-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(subtitle || "Informação não registrada")}</small></span>
      ${stateText ? `<span class="mini-state">${escapeHtml(stateText)}</span>` : ""}
    </button>`;
  }

  function renderDashboard() {
    const quick = [
      ["characters", "people", "Personagens", "Vozes, escolhas e trajetórias"],
      ["relationships", "network", "Relações", "Alianças, afetos e rupturas"],
      ["timeline", "timeline", "Linha do Tempo", "Antecedentes e guerra"],
      ["chapters", "chapter", "Capítulos", `${D.chapters.length} capítulos escritos`]
    ];
    const focus=[
      ["jesed-character-kaelina-polar","Paz sob responsabilidade"],
      ["jesed-character-alyra-polar","Orgulho, poder e domínio"],
      ["jesed-character-rendar","Caçador movido por vingança"],
      ["jesed-character-daryon-vess","Estratégia, segredo e manipulação"],
      ["jesed-character-nynestra-buldar","Colheita, cálculo e comando"]
    ].map(([id,description])=>({character:getCharacter(id),description})).filter(item=>item.character);
    const selectedPlaces=["jesed-place-kaendar","jesed-place-khar-tondr","jesed-place-nyn-harad","jesed-place-velarim","jesed-place-varkhama","jesed-place-margem-zirrios"].map(getPlace).filter(Boolean);
    const strategic=(D.maps?.main?.strategicCategories||[]).filter(category=>(category.items||[]).length>=2);
    const homePlaceCard=place=>`<article class="home-place-card" data-route="place/${escapeHtml(place.slug)}" tabindex="0" role="link"><div class="home-place-image ${place.image?'has-image':''}">${place.image?`<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="home-place-fallback" hidden>${icon('pin')}</span>`:`<span class="home-place-fallback">${icon('pin')}</span>`}</div><div class="home-place-copy"><p class="eyebrow">${escapeHtml(place.type||'Lugar')}</p><h3>${escapeHtml(place.name)}</h3><p>${escapeHtml(place.region||place.summary)}</p></div><span class="home-card-link">Abrir ficha ${icon('arrow')}</span></article>`;
    refs.main.innerHTML = `<div class="page-enter">
      ${canonNotice()}
      <section class="hero-map-card home-guide-hero">
        <img src="assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp" alt="Mapa de Jesed na época de Guerras de Sangue">
        <div class="hero-map-content">
          <p class="eyebrow">Ciclo de Jesed — Guia do Livro</p>
          <img class="hero-logo glow-title" src="assets/branding/guerras-de-sangue/logo-light.webp" alt="Guerras de Sangue">
          <p>Um guia cartográfico de pessoas, clãs, territórios, segredos e consequências.</p>
          <div class="hero-actions"><button class="primary-button" data-route="map">${icon("map")} Abrir mapa</button><button class="secondary-button" data-route="books">${icon("books")} Ver os cinco livros</button><button class="secondary-button contemplate-button" data-contemplative="guerras">${icon("eye")} Contemplar este mundo</button></div>
        </div>
      </section>
      <section class="home-strategy-strip" aria-label="Leitura estratégica do mapa"><div><p class="eyebrow">Leitura política do território</p><strong>Informações estratégicas</strong></div><div class="home-strategy-links">${strategic.map(category=>`<button data-route="map"><span>${escapeHtml(category.label)}</span><small>${category.items.length} informações</small></button>`).join("")}</div></section>
      <section class="quick-grid home-guide-grid">${quick.map(item => `<button class="quick-card home-guide-card" data-route="${item[0]}"><span class="quick-icon">${icon(item[1])}</span><strong>${item[2]}</strong><small>${item[3]}</small></button>`).join("")}</section>
      <section class="metrics-grid">
        ${[[D.characters.length,"personagens","characters"],[D.clans.length,"clãs","clans"],[D.places.length,"lugares","places"],[D.chapters.length,"capítulos escritos","chapters"],[timelineEntries().length,"eventos na linha do tempo","timeline"],[D.mysteries.length,"mistérios","mysteries"]].map(item => `<article class="metric-card" data-route="${item[2]}"><strong>${item[0]}</strong><span>${item[1]}</span></article>`).join("")}
      </section>
      <section class="dark-panel section-card home-focus-section"><div class="section-heading"><div><p class="eyebrow">Pessoas no centro da guerra</p><h2>Personagens em foco</h2><p>As figuras principais que sustentam, provocam ou tentam encerrar o conflito.</p></div><button class="text-button" data-route="characters">Ver todos</button></div><div class="home-focus-grid">${focus.map(({character,description})=>`<button class="home-focus-card" data-route="character/${character.slug}"><span class="home-focus-avatar ${character.image?'has-image':''}">${character.image?`<img src="${escapeHtml(character.image)}" alt="Retrato de ${escapeHtml(character.name)}" loading="lazy">`:icon('person')}</span><span><strong>${escapeHtml(character.name)}</strong><small>${escapeHtml(description)}</small></span></button>`).join("")}</div></section>
      <section class="home-places-section"><div class="section-heading"><div><p class="eyebrow">Território e poder</p><h2>Lugares</h2><p>Cidades, fortalezas e regiões que ajudam a compreender a guerra.</p></div><button class="text-button" data-route="places">Ver todos os lugares</button></div><div class="home-place-grid">${selectedPlaces.map(homePlaceCard).join("")}</div></section>
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
      ${canonNotice()}
      <section class="bookshelf enhanced-bookshelf" aria-label="Livros do Ciclo de Jesed">
        ${D.books.map(book => {
          const active=book.status === "active";
          const previewable=book.id === "dinastia-polar"||book.id === "herdeiros-das-cinzas";
          const clickable=active||previewable;
          const current=book.id === BOOK_ID;
          const media=bookCoverHtml(book, "book-card-cover");
          const inner=`<div class="book-card-cover-frame">${media}<span class="book-number readable-book-number">Livro ${book.order}</span></div><div class="book-card-copy"><h2>${escapeHtml(book.name)}</h2><p>${escapeHtml(book.teaser || book.synopsis || book.visual)}</p></div><div class="book-status"><span>${active ? "Livro concluído" : "Em preparação"}</span><span>${active ? (current ? "Você está aqui" : "Ver detalhes") : (clickable ? "Ver detalhes" : "Bloqueado")}</span></div>`;
          return clickable?`<div class="book-card cover-book-card active has-cover" data-route="book/${book.id}" tabindex="0" role="link" style="--book-a:${book.palette[0]};--book-b:${book.palette[1]};--book-c:${book.palette[2]}">${inner}</div>`:`<article class="book-card cover-book-card locked ${book.cover ? "has-cover" : ""}" style="--book-a:${book.palette[0]};--book-b:${book.palette[1]};--book-c:${book.palette[2]}" aria-disabled="true">${inner}</article>`;
        }).join("")}
      </section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Livros"}]);
  }

  function renderBook(id) {
    const book = getBook(id) || getBook("guerras-de-sangue");
    const cover = bookCoverHtml(book, "");
    if (book.id !== "guerras-de-sangue") {
      const externalLinks = { "ruinas-dos-ceus": "ruinas.html", "dinastia-polar": "dinastia-polar.html", "herdeiros-das-cinzas": "herdeiros-das-cinzas.html" };
      const bookLogos = { "ruinas-dos-ceus": "assets/branding/ruinas-dos-ceus/logo-light.webp" };
      const previewable = book.id === "dinastia-polar" || book.id === "herdeiros-das-cinzas";
      const href = externalLinks[book.id];
      const logo = bookLogos[book.id];
      const titleHtml = logo ? `<img class="hero-logo" src="${logo}" alt="${escapeHtml(book.name)}">` : `<h2>${escapeHtml(book.name)}</h2>`;
      const subtitle = book.status === "active" ? "Livro disponível, com sistema de navegação próprio." : previewable ? "Em construção — capa, capítulos e conteúdo chegam em breve." : "Ainda em preparação nesta etapa.";
      const eyebrow = book.status === "active" ? "Disponível" : previewable ? "Em preparação" : "Bloqueado nesta etapa";
      refs.main.innerHTML = `<div class="page-enter">
        ${pageHeader(`Livro ${book.order} · Ciclo de Jesed`, book.name, subtitle)}
        <section class="book-detail-hero"><div class="book-detail-cover">${cover}</div><div class="book-detail-copy"><p class="eyebrow">${eyebrow}</p>${titleHtml}<div class="book-full-synopsis">${synopsisHtml(book.synopsis || book.visual)}</div>${href ? `<div class="hero-actions"><a class="primary-button" href="${href}#/inicio">${icon("arrow")} Ir para a página do livro</a></div>` : ""}</div></section>
      </div>`;
      setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Livros",route:"books"},{label:book.name}]);
      return;
    }
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader(`Livro ${book.order} · Ciclo de Jesed`, book.name, "Livro concluído, organizado em todos os seus capítulos.", `<button class="secondary-button" data-route="chapters">${icon("chapter")} Capítulos</button><button class="primary-button" data-route="map">${icon("map")} Mapa do período</button>`)}
      ${canonNotice()}
      <section class="book-detail-hero"><div class="book-detail-cover">${cover}</div><div class="book-detail-copy"><p class="eyebrow">Estado editorial</p><h2>${D.chapters.length} capítulos escritos</h2><div class="book-full-synopsis">${synopsisHtml(book.synopsis || book.visual)}</div><div class="tag-row"><span class="tag">${D.chapters[D.chapters.length - 1].number} capítulos no total</span><span class="tag">Mapa disponível</span><span class="tag">Livro concluído</span></div></div></section>
      <section class="metrics-grid">${[[D.chapters.length,"capítulos escritos","chapters"],[D.characters.length,"personagens","characters"],[timelineEntries().length,"eventos na linha do tempo","timeline"],[D.mysteries.length,"mistérios","mysteries"],[D.clans.length,"clãs","clans"],[D.places.length,"lugares","places"]].map(item => `<article class="metric-card" data-route="${item[2]}"><strong>${item[0]}</strong><span>${item[1]}</span></article>`).join("")}</section>
      <section class="dark-panel section-card"><div class="section-heading"><div><h2>Capítulos escritos</h2><p>O Capítulo ${D.chapters[D.chapters.length - 1].number} é o limite actual.</p></div></div><div class="mini-list">${D.chapters.map(ch => miniEntity(`Capítulo ${ch.number} — ${ch.title}`, ch.summary, "chapter", `chapter/${ch.id}`, `${ch.wordCount.toLocaleString("pt-BR")} palavras`)).join("")}</div></section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Livros",route:"books"},{label:book.name}]);
  }

  function characterShortText(value, max = 178) {
    return window.DI_CHARACTER_BROWSER?.shortText(value, max) || String(value || "");
  }

  function filteredCharacters() {
    const query = state.characterQuery.trim();
    return D.characters.filter(character => {
      const clan = getClan(character.clanId);
      const clanMatches = state.characterFilter === "all" || character.clanId === state.characterFilter;
      const searchMatches = window.DI_CHARACTER_BROWSER?.matches(character, query, [clan?.name, character.importance])
        ?? `${character.name} ${character.alias} ${character.summary} ${clan?.name || ""}`.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR"));
      return clanMatches && searchMatches;
    });
  }

  function renderCharacters() {
    const list = filteredCharacters();
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Pessoas", "Personagens", "Figuras de clãs, alianças e rivalidades que atravessam a guerra e disputam memória, território e poder.")}
      <div class="character-browser-toolbar guerras-character-toolbar">
        <label class="character-browser-search"><span class="sr-only">Pesquisar personagens</span><input type="search" data-character-search autocomplete="off" placeholder="Pesquisar por nome, subtítulo, clã ou descrição…" value="${escapeHtml(state.characterQuery)}"><small class="character-browser-search-count">${list.length}/${D.characters.length}</small></label>
        <div class="character-view-toggle" role="group" aria-label="Modo de visualização"><button class="character-view-button ${state.viewMode === "grid" ? "active" : ""}" data-character-view="grid" aria-pressed="${state.viewMode === "grid"}" title="Cartões grandes">${icon("image")}<span class="sr-only">Cartões grandes</span></button><button class="character-view-button ${state.viewMode === "list" ? "active" : ""}" data-character-view="list" aria-pressed="${state.viewMode === "list"}" title="Lista compacta">${icon("timeline")}<span class="sr-only">Lista compacta</span></button></div>
      </div>
      <div class="filter-toolbar character-clan-filters"><button class="filter-chip ${state.characterFilter === "all" ? "active" : ""}" data-char-filter="all">Todos</button>${D.clans.map(clan => `<button class="filter-chip ${state.characterFilter === clan.id ? "active" : ""}" data-char-filter="${clan.id}">${escapeHtml(clan.name)}</button>`).join("")}</div>
      <div id="characterList">${characterListHtml(list)}</div>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Personagens"}]);
  }

  function characterListHtml(list) {
    if (!list.length) return `<div class="character-browser-empty dark-panel"><h2>Nenhum personagem encontrado</h2><p>Tente outro nome, clã, função ou descrição.</p></div>`;
    if (state.viewMode === "list") {
      return `<div class="character-browser-list">${list.map(c => { const clan=getClan(c.clanId); return `<button class="character-browser-row guerras-character-row" data-route="character/${c.slug}"><span class="character-browser-row-media">${c.image ? `<img src="${escapeHtml(c.image)}" alt="Retrato de ${escapeHtml(c.name)}" loading="lazy">` : `<span class="character-browser-card-fallback">${icon("person")}</span>`}</span><span class="character-browser-row-name"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.alias)}</small></span><span class="character-browser-row-description">${escapeHtml(characterShortText(c.summary, 150))}</span><span class="character-browser-row-meta">${escapeHtml(clan?.name || "Sem clã")} · ${(c.appearanceChapters || []).length} capítulos</span></button>`; }).join("")}</div>`;
    }
    return `<section class="character-browser-grid">${list.map(c => `<button class="character-browser-card guerras-character-card" data-route="character/${c.slug}"><span class="character-browser-card-media">${c.image ? `<img src="${escapeHtml(c.image)}" alt="Retrato de ${escapeHtml(c.name)}" loading="lazy">` : `<span class="character-browser-card-fallback">${icon("person")}</span>`}</span><span class="character-browser-card-copy"><h2>${escapeHtml(c.name)}</h2><small class="character-browser-subtitle">${escapeHtml(c.alias)}</small><span class="character-browser-description">${escapeHtml(characterShortText(c.summary))}</span></span></button>`).join("")}</section>`;
  }

  function renderCharacter(slug) {
    const character = getCharacter(slug);
    if (!character) return renderNotFound();
    const clan = getClan(character.clanId);
    const currentPlace = getPlace(character.locationId);
    const homePlace = currentPlace || (clan ? clanTerritory(clan) : null);
    const placeLabel = currentPlace ? "Abrir localização" : "Cidade-casa";
    const actions = `<button class="secondary-button" data-route="relationships">${icon("network")} Relações</button>${homePlace ? `<button class="primary-button" data-route="place/${homePlace.slug}">${icon("pin")} ${placeLabel}</button>` : ""}`;
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Personagem · Guerras de Sangue", "", "", actions)}
      <section class="character-hero">
        <div class="character-portrait ${character.image ? "has-image" : ""}" ${character.image ? `data-lightbox-image="${escapeHtml(character.image)}" data-lightbox-caption="${escapeHtml(character.name)}" role="button" tabindex="0"` : ""}>${imageOrIcon(character.image, "person", character.name, "character-portrait-image")}</div>
        <article class="parchment-panel character-summary"><p class="eyebrow character-clan-eyebrow">${clan?.emblem ? `<img class="character-clan-emblem" src="${escapeHtml(clan.emblem)}" alt="">` : ""}${escapeHtml(clan?.name || "Sem clã registado")}</p><h1>${escapeHtml(character.name)}</h1><span class="alias">${escapeHtml(character.alias)}</span><div class="character-meta-grid"><div class="character-meta"><small>Estado</small><strong>${escapeHtml(character.status)}</strong></div><div class="character-meta"><small>Última aparição</small><strong>${escapeHtml(character.lastSeen.chapter)}</strong></div></div></article>
      </section>
      <div class="tabs">${[["overview","Visão geral"],["trajectory","Trajetória"],["relations","Relações"],["destiny","Destino"]].map(tab => `<button class="tab-button ${state.characterTab === tab[0] ? "active" : ""}" data-character-tab="${tab[0]}" data-character-slug="${character.slug}">${tab[1]}</button>`).join("")}</div>
      <section class="dark-panel tab-panel">${characterTabHtml(character, state.characterTab)}</section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Personagens",route:"characters"},{label:character.name}]);
  }

  function characterTabHtml(character, tab) {
    const relationships = D.relationships.filter(r => r.from === character.id || r.to === character.id);
    if (tab === "overview") {
      const alternates = (character.alternateImages || []).length ? `<div class="info-box wide-info"><h3>Outras representações disponíveis</h3><div class="character-alternate-gallery">${character.alternateImages.map((src,index)=>`<figure><img src="${escapeHtml(src)}" alt="Representação alternativa ${index+1} de ${escapeHtml(character.name)}" loading="lazy"><figcaption>Imagem alternativa ${index+1}</figcaption></figure>`).join("")}</div></div>` : "";
      return `<div class="info-columns"><div class="info-box wide-info"><h3>Descrição</h3><p>${linkifyText(character.summary)}</p></div><div class="info-box"><h3>Personalidade</h3>${character.personality.length ? `<ul>${character.personality.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : `<p class="empty-inline">Informação ainda não registrada.</p>`}</div><div class="info-box"><h3>Modo de falar</h3><p>${escapeHtml(character.voice || "Informação ainda não registrada.")}</p></div>${alternates}</div>`;
    }
    if (tab === "trajectory") {
      const chapters = character.appearanceChapters.map(getChapter).filter(Boolean);
      return chapters.length ? `<div class="timeline-list">${chapters.map(ch => {
        const companions = ch.characters.filter(id => id !== character.id).map(getCharacter).filter(Boolean).slice(0, 5);
        const chPlaces = ch.places.map(getPlace).filter(Boolean);
        const traj = window.GUERRAS_TRAJ && window.GUERRAS_TRAJ[character.name];
        const eventText = (traj && traj[ch.id]) || "Trajetória específica ainda não registrada para este capítulo.";
        const photoTag = (name, image, fallbackIcon) => image
          ? `<span class="tag photo-tag"><img src="${escapeHtml(image)}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="photo-tag-fallback" hidden>${icon(fallbackIcon)}</span>${escapeHtml(name)}</span>`
          : `<span class="tag photo-tag">${icon(fallbackIcon)}${escapeHtml(name)}</span>`;
        return `<article class="timeline-item character-trajectory-card" tabindex="0" data-route="chapter/${ch.id}"><small>Capítulo ${ch.number}</small><h3>${escapeHtml(ch.title)}</h3><p>${escapeHtml(eventText)}</p><div class="tag-row">${chPlaces.map(p => photoTag(p.name, p.image, "pin")).join("")}${companions.map(c => photoTag(c.name, c.image, "person")).join("")}</div></article>`;
      }).join("")}</div>` : `<p class="empty-inline">Trajetória ainda não registrada.</p>`;
    }
    if (tab === "relations") return relationships.length ? `<div class="relationship-detail-list">${relationships.map(r => { const other = getCharacter(r.from === character.id ? r.to : r.from); return `<article class="relationship-detail-card"><button class="relationship-person" data-route="character/${other?.slug || ""}">${other?.image ? `<img src="${other.image}" alt="">` : icon("person")}<span><strong>${escapeHtml(other?.name || "Entidade não encontrada")}</strong><small>${escapeHtml(r.type)}</small></span></button><p><strong>Estado:</strong> ${escapeHtml(r.state)}</p><p>${escapeHtml(r.from === character.id ? r.fromView : r.toView)}</p><div class="tag-row">${r.evolution.map(item => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div></article>`; }).join("")}</div>` : `<p class="empty-inline">Nenhuma relação registrada neste período.</p>`;
    return `<div class="info-columns"><div class="info-box wide-info"><h3>Destino escrito</h3><p>${escapeHtml(character.destiny.written)}</p></div></div>`;
  }

  function relationshipCategory(relationship) {
    const text = `${relationship.type} ${relationship.state}`.toLocaleLowerCase("pt-BR");
    if (/irmã|pai|filha|família|companheiro/.test(text)) return "family";
    if (/amor|influência|cumplicidade|legado/.test(text)) return "influence";
    if (/aliança|aliad|táctic/.test(text)) return "alliance";
    if (/vingança|rival|ódio|ruptura|inimig/.test(text)) return "conflict";
    return "other";
  }

  function renderRelationships() {
    const filtered = state.relationshipFilter === "all" ? D.relationships : D.relationships.filter(r => relationshipCategory(r) === state.relationshipFilter);
    const people=[...new Set(filtered.flatMap(r=>[r.from,r.to]))].map(getCharacter).filter(Boolean);
    const portrait=c=>c.image?`<img src="${escapeHtml(c.image)}" alt="Retrato de ${escapeHtml(c.name)}" loading="lazy">`:`<span class="relationship-avatar-fallback">${icon("person")}</span>`;
    const nodes=people.map((c,i)=>{const angle=(Math.PI*2*i/Math.max(people.length,1))-Math.PI/2;return{c,x:50+Math.cos(angle)*36,y:50+Math.sin(angle)*35};});
    const findNode=id=>nodes.find(n=>n.c.id===id);
    const linesSvg=filtered.map(r=>{const a=findNode(r.from),b=findNode(r.to);return a&&b?`<line class="${relationshipCategory(r)}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`:"";}).join("");
    const canvas=nodes.length?`<section class="relationship-canvas ${nodes.length<3?"few-nodes":""}" aria-label="Mapa de relações"><svg class="relationship-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${linesSvg}</svg>${nodes.map(n=>`<button class="rel-node" style="left:${n.x}%;top:${n.y}%" data-route="character/${n.c.slug}">${n.c.image?`<img src="${escapeHtml(n.c.image)}" alt="">`:icon("person")}<strong>${escapeHtml(n.c.shortName||n.c.name)}</strong></button>`).join("")}</section>`:"";
    refs.main.innerHTML = `<div class="page-enter relationships-page">
      ${pageHeader("Pessoas", "Relações", "Laços familiares, alianças, influência e conflitos — com o mapa de ligações e o detalhe de cada par.")}
      <div class="social-legend" aria-label="Legenda dos tipos de relação">${[["family","Família"],["influence","Influência"],["alliance","Aliança"],["conflict","Conflito e vingança"],["other","Outras relações"]].map(item=>`<span class="social-legend-item" data-type="${item[0]}"><i class="social-legend-swatch"></i>${item[1]}</span>`).join("")}</div>
      <div class="filter-toolbar relationship-filter-toolbar">${[["all","Todas"],["family","Família"],["influence","Influência"],["alliance","Aliança"],["conflict","Conflito e vingança"]].map(item => `<button class="filter-chip ${state.relationshipFilter === item[0] ? "active" : ""}" data-rel-filter="${item[0]}">${item[1]}</button>`).join("")}</div>
      ${canvas}
      <section class="relationship-overview" aria-label="Pessoas presentes no filtro"><div><strong>${filtered.length}</strong><span>relações</span></div><div><strong>${people.length}</strong><span>personagens ligados</span></div><div class="relationship-people-strip">${people.slice(0,12).map(c=>`<button data-route="character/${c.slug}" title="${escapeHtml(c.name)}">${portrait(c)}<span>${escapeHtml(c.shortName||c.name)}</span></button>`).join("")}</div></section>
      <section class="relationship-card-grid">${filtered.length?filtered.map(r=>{const a=getCharacter(r.from),b=getCharacter(r.to),category=relationshipCategory(r);if(!a||!b)return"";return `<article class="relationship-link-card ${category}" id="${escapeHtml(r.id)}"><div class="relationship-link-people"><button data-route="character/${a.slug}">${portrait(a)}<span><strong>${escapeHtml(a.name)}</strong><small>${escapeHtml(a.alias||"")}</small></span></button><span class="relationship-link-symbol">${icon("network")}</span><button data-route="character/${b.slug}">${portrait(b)}<span><strong>${escapeHtml(b.name)}</strong><small>${escapeHtml(b.alias||"")}</small></span></button></div><div class="relationship-link-copy"><p class="eyebrow">${escapeHtml(r.type)}</p><h2>${escapeHtml(r.state)}</h2><div class="relation-perspectives"><p><strong>${escapeHtml(a.shortName||a.name)}:</strong> ${escapeHtml(r.fromView)}</p><p><strong>${escapeHtml(b.shortName||b.name)}:</strong> ${escapeHtml(r.toView)}</p></div>${r.evolution?.length?`<ol class="relationship-evolution">${r.evolution.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ol>`:""}</div></article>`;}).join(""):`<div class="empty-state"><h2>Nenhuma relação neste filtro</h2><p>Escolha outra categoria para continuar.</p></div>`}</section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Relações"}]);
  }

  function renderFamilies() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Pessoas", "Famílias", "Núcleos familiares com membros clicáveis, memória e impacto narrativo.")}<section class="social-entity-grid">${D.families.map(family => `<article class="social-entity-card"><div class="social-entity-image">${family.image?`<img src="${escapeHtml(family.image)}" alt="Imagem atmosférica de ${escapeHtml(family.name)}" loading="lazy">`:""}</div><div class="social-entity-copy"><span class="social-entity-type">${escapeHtml(family.subtitle||`${family.members.length} membros registados`)}</span><h2>${escapeHtml(family.name)}</h2><p>${escapeHtml(family.summary)}</p>${family.details?.length?`<div class="social-detail-grid">${family.details.map(item=>`<article class="social-detail-card"><p>${escapeHtml(item)}</p></article>`).join("")}</div>`:""}<div class="social-member-row">${family.members.map(id => { const c = getCharacter(id); return c ? `<button class="social-member" data-route="character/${c.slug}" title="${escapeHtml(c.name)}">${c.image ? `<img src="${c.image}" alt="${escapeHtml(c.name)}">` : icon("person")}<span>${escapeHtml(c.shortName || c.name)}</span></button>` : ""; }).join("")}</div></div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Famílias"}]);
  }

  function renderOrganisations() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Pessoas", "Organizações", "Conselhos, grupos e alianças com função, atuação e membros interligados.")}<section class="social-entity-grid">${D.organisations.map(org => `<article class="social-entity-card"><div class="social-entity-image">${org.image?`<img src="${escapeHtml(org.image)}" alt="Imagem atmosférica de ${escapeHtml(org.name)}" loading="lazy">`:""}</div><div class="social-entity-copy"><span class="social-entity-type">${escapeHtml(org.type)}</span><h2>${escapeHtml(org.name)}</h2><p>${escapeHtml(org.summary)}</p><dl>${org.function?`<div><dt>Função</dt><dd>${escapeHtml(org.function)}</dd></div>`:""}${org.activity?`<div><dt>Atuação</dt><dd>${escapeHtml(org.activity)}</dd></div>`:""}</dl>${org.themes?.length?`<div class="tag-row">${org.themes.map(item=>`<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>`:""}<div class="social-member-row">${org.members.slice(0, 12).map(id => { const c = getCharacter(id); return c ? `<button class="social-member" data-route="character/${c.slug}" title="${escapeHtml(c.name)}">${c.image ? `<img src="${c.image}" alt="${escapeHtml(c.name)}">` : icon("person")}<span>${escapeHtml(c.shortName || c.name)}</span></button>` : ""; }).join("")}</div></div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Organizações"}]);
  }

  function renderChapters() {
    const q = state.chapterQuery.trim().toLocaleLowerCase("pt-BR");
    const filtered = q ? D.chapters.filter(ch => `${ch.number} ${ch.title} ${ch.summary}`.toLocaleLowerCase("pt-BR").includes(q)) : D.chapters;
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Guerras de Sangue", "Capítulos", `Os ${D.chapters.length} capítulos com narrativa escrita. Os capítulos ainda existentes apenas como resumo futuro ficam fora desta lista.`)}
      ${canonNotice()}
      <input class="search" data-chapter-search type="search" placeholder="Pesquisar…" value="${escapeHtml(state.chapterQuery)}">
      <section class="chapter-grid">${filtered.length ? filtered.map(ch => {
        const heroImage = ch.image || ch.characters.map(getCharacter).find(c => c?.image)?.image;
        return `<article class="chapter-card" data-route="chapter/${ch.id}">${heroImage ? `<img class="chapter-card-image" src="${escapeHtml(heroImage)}" alt="">` : `<div class="chapter-card-image fallback">${icon("chapter")}</div>`}<div class="chapter-card-copy"><span class="chapter-number">Capítulo ${ch.number}</span><h2>${escapeHtml(ch.title)}</h2><p>${escapeHtml(ch.summary)}</p><div class="tag-row"><span class="tag">${ch.wordCount.toLocaleString("pt-BR")} palavras</span><span class="tag">${ch.characters.length} personagens ligados</span></div></div></article>`;
      }).join("") : `<p class="empty-inline">Nenhum capítulo encontrado.</p>`}</section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Capítulos"}]);
  }

  function renderChapter(id) {
    const chapter = getChapter(id);
    if (!chapter) return renderNotFound();
    const previous = getChapter(chapter.number - 1);
    const next = getChapter(chapter.number + 1);
    const characters = chapter.characters.map(getCharacter).filter(Boolean);
    const places = chapter.places.map(getPlace).filter(Boolean);
    const events = timelineEntries().filter(event => event.period === `Capítulo ${chapter.number}` || event.chapterId === chapter.id || (event.chapterIds || []).includes(chapter.id));
    const heroImage = chapter.image || characters.find(c => c.image)?.image;
    const chapterNavigation = `<nav class="chapter-pagination chapter-pagination-top" aria-label="Navegação entre capítulos">${previous ? `<button class="secondary-button" data-route="chapter/${previous.id}">← Capítulo ${previous.number}<small>${escapeHtml(previous.title)}</small></button>` : `<button class="secondary-button" disabled>Primeiro capítulo</button>`}${next ? `<button class="primary-button" data-route="chapter/${next.id}">Capítulo ${next.number} →<small>${escapeHtml(next.title)}</small></button>` : `<button class="secondary-button" disabled>Último capítulo</button>`}</nav>`;
    refs.main.innerHTML = `<div class="page-enter chapter-detail-page">
      ${pageHeader(`Guerras de Sangue · Capítulo ${chapter.number}`, chapter.title, chapter.status)}
      ${chapterNavigation}
      <section class="chapter-hero-panel ${heroImage ? "has-art" : ""}">${heroImage ? `<img src="${escapeHtml(heroImage)}" alt="Ilustração associada ao capítulo">` : ""}<div><p class="eyebrow">Resumo rápido</p><h2>${escapeHtml(chapter.summary)}</h2><div class="tag-row"><span class="tag">${chapter.wordCount.toLocaleString("pt-BR")} palavras no manuscrito</span><span class="tag">${chapter.status}</span></div></div></section>
      <section class="chapter-layout">
        <article class="parchment-panel chapter-longform"><div class="section-heading"><div><p class="eyebrow">Acontecimentos do capítulo</p><h2>Tudo o que acontece</h2><p>Clique nos nomes destacados para abrir personagens, lugares, clãs, animais, plantas, alimentos ou conceitos.</p></div></div><div class="chapter-prose">${chapter.details.map(paragraph => `<p>${linkifyText(paragraph)}</p>`).join("")}</div></article>
        <aside class="chapter-context-column">
          <article class="dark-panel section-card"><h3>Personagens</h3><div class="context-chip-list">${characters.length ? characters.map(c => `<button class="context-chip" data-route="character/${c.slug}">${c.image ? `<img src="${c.image}" alt="">` : icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join("") : `<p class="empty-inline">Nenhum personagem ligado.</p>`}</div></article>
          <article class="dark-panel section-card"><h3>Lugares</h3><div class="mini-list">${places.length ? places.map(p => miniEntity(p.name, p.type, "pin", `place/${p.slug}`, p.population?.label || p.region || "Lugar relacionado", p.image)).join("") : `<p class="empty-inline">Nenhum lugar ligado.</p>`}</div></article>
          ${events.length ? `<article class="dark-panel section-card"><h3>Linha do Tempo</h3><div class="mini-list">${events.map(e => miniEntity(e.name, e.category, "timeline", `timeline/${e.slug}`, e.period)).join("")}</div></article>` : ""}
        </aside>
      </section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Capítulos",route:"chapters"},{label:`Capítulo ${chapter.number}`}]);
  }

  const timelineRelationLabel = relation => ({
    ocorre:"Ocorre no Capítulo",citado:"Citado no Capítulo",recordado:"Recordado no Capítulo",
    revelado:"Revelado no Capítulo",investigado:"Investigado no Capítulo",consequencia:"Consequência narrada no Capítulo"
  })[relation] || "Relacionado ao Capítulo";

  function timelineChapterLinks(entry) {
    if (entry.chapterLinks?.length) return entry.chapterLinks;
    return (entry.chapterIds || []).map(chapterId => ({chapterId,relation:"ocorre",note:""}));
  }

  function timelineInlineLinks(label, items, emptyText = "Não registado") {
    return `<div class="timeline-linked-line"><strong>${escapeHtml(label)}</strong><span>${items.length ? items.join('<span class="timeline-separator">·</span>') : escapeHtml(emptyText)}</span></div>`;
  }

  function renderTimeline() {
    const items = [...timelineEntries()].sort((a,b)=>(a.sortKey||0)-(b.sortKey||0));
    const phaseOf=entry=>{
      const key=entry.sortKey||0;
      if(key<200000000) return "before";
      if(key>=220000000 || /Consequência posterior|Reordenação|Pena e ruptura/i.test(entry.category||"")) return "after";
      return "war";
    };
    const phases=[
      {id:"before",title:"Antes da guerra",description:"Origens, leis, perdas e decisões que prepararam o conflito."},
      {id:"war",title:"O ciclo da guerra",description:"Da morte dos jovens Polar ao colapso da aliança dentro de Kaendar."},
      {id:"after",title:"Consequências",description:"Exílio, reconstrução e a nova concentração de poder."}
    ];
    const card=entry=>{
      const chapters=timelineChapterLinks(entry).map(link=>{const ch=getChapter(link.chapterId);return ch?`<button class="timeline-text-link" data-route="chapter/${ch.id}">Cap. ${ch.number}</button>`:"";}).filter(Boolean);
      const participants=(entry.characterIds||[]).map(getCharacter).filter(Boolean).slice(0,4).map(c=>`<button class="timeline-text-link" data-route="character/${c.slug}">${escapeHtml(c.shortName||c.name)}</button>`);
      const places=(entry.placeIds||[]).map(getPlace).filter(Boolean).slice(0,3).map(p=>`<button class="timeline-text-link" data-route="place/${p.slug}">${escapeHtml(p.name)}</button>`);
      const selected=state.timelineSelection===entry.slug;
      return `<article class="timeline-item timeline-entry-card ${selected?'selected':''}" data-route="timeline/${entry.slug}" data-timeline-card="${entry.slug}" tabindex="0" role="link" aria-label="Abrir ${escapeHtml(entry.name)}"><div class="timeline-card-heading"><time>${escapeHtml(entry.dateLabel || entry.period || "Data aproximada")}</time><span>${escapeHtml(entry.category || "Acontecimento")}</span></div><h3>${escapeHtml(entry.name)}</h3><p>${escapeHtml(entry.summary || "Descrição ainda não registada.")}</p><div class="timeline-compact-links">${chapters.length?`<span><strong>Capítulos</strong>${chapters.join("")}</span>`:""}${participants.length?`<span><strong>Pessoas</strong>${participants.join("")}</span>`:""}${places.length?`<span><strong>Lugares</strong>${places.join("")}</span>`:""}</div></article>`;
    };
    refs.main.innerHTML = `<div class="page-enter timeline-page">${pageHeader("História", "Linha do Tempo", "Cronologia de Jesed agrupada por fase, com datas aproximadas quando o manuscrito não fixa um ciclo exacto.")}<section class="timeline-era-guide" aria-label="Sistema de datas"><div><strong>A.Q.</strong><span>Antes da Queda</span></div><div><strong>D.Q.</strong><span>Depois da Queda</span></div><p>As datas não são inventadas: quando falta precisão, o sistema mostra apenas o intervalo sustentado pelo livro.</p></section><div class="timeline-phases">${phases.map(phase=>{const phaseItems=items.filter(item=>phaseOf(item)===phase.id);return phaseItems.length?`<details class="timeline-phase" open><summary><span><small>${phaseItems.length} acontecimentos</small><strong>${phase.title}</strong><em>${phase.description}</em></span><b>⌄</b></summary><section class="timeline-list">${phaseItems.map(card).join("")}</section></details>`:"";}).join("")}</div></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Linha do Tempo"}]);
    requestAnimationFrame(()=>document.querySelector('.timeline-entry-card.selected')?.scrollIntoView({block:'center',behavior:state.settings.motion?'smooth':'auto'}));
  }

  function renderTimelineEntry(slug) {
    const entry = getTimelineEntry(slug);
    if (!entry) return renderNotFound();
    state.timelineSelection=entry.slug; storage.set("di-gs-timeline-selection",entry.slug);
    const places=(entry.placeIds||[]).map(getPlace).filter(Boolean);
    const participants=(entry.characterIds||[]).map(getCharacter).filter(Boolean);
    const related=(entry.relatedEventIds||[]).map(getTimelineEntry).filter(Boolean);
    const chapterLinks=timelineChapterLinks(entry).map(link=>({link,chapter:getChapter(link.chapterId)})).filter(x=>x.chapter);
    const consequences=entry.consequences||[];
    refs.main.innerHTML=`<div class="page-enter timeline-detail-page">
      <button class="secondary-button timeline-back" data-route="timeline">← Voltar para a Linha do Tempo</button>
      ${pageHeader("Linha do Tempo",entry.name,entry.dateLabel||entry.period||"Data não estabelecida")}
      <section class="timeline-detail-grid"><article class="parchment-panel timeline-narrative">
        <p class="eyebrow">${escapeHtml(entry.category||"Acontecimento")}</p>
        <p class="timeline-lead">${linkifyText(entry.summary||"Descrição ainda não registrada.")}</p>
        ${entry.context?`<h2>Contexto</h2><p>${linkifyText(entry.context)}</p>`:""}
        ${entry.cause?`<h2>Causa</h2><p>${linkifyText(entry.cause)}</p>`:""}
        ${consequences.length?`<h2>Consequências</h2><ul class="timeline-consequence-list">${consequences.map(item=>`<li>${linkifyText(item)}</li>`).join("")}</ul>`:""}
        ${(entry.publicVersion||entry.truth)?`<section class="timeline-truth-grid">${entry.publicVersion?`<article><small>Versão pública</small><p>${linkifyText(entry.publicVersion)}</p></article>`:""}${entry.truth?`<article class="truth"><small>O que realmente aconteceu</small><p>${linkifyText(entry.truth)}</p></article>`:""}</section>`:""}
      </article><aside class="timeline-context-column">
        <article class="dark-panel section-card"><h2>Capítulos relacionados</h2><div class="timeline-reference-list">${chapterLinks.length?chapterLinks.map(({link,chapter})=>`<button class="timeline-reference" data-route="chapter/${chapter.id}"><strong>${escapeHtml(timelineRelationLabel(link.relation))} ${chapter.number}</strong><span>${escapeHtml(chapter.title)}</span>${link.note?`<small>${escapeHtml(link.note)}</small>`:""}</button>`).join(""):`<p class="empty-inline">Nenhum capítulo ligado.</p>`}</div></article>
        <article class="dark-panel section-card"><h2>Personagens relacionados</h2><div class="context-chip-list">${participants.length?participants.map(c=>`<button class="context-chip" data-route="character/${c.slug}">${c.image?`<img src="${escapeHtml(c.image)}" alt="">`:icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join(""):`<p class="empty-inline">Nenhum personagem registado.</p>`}</div></article>
        <article class="dark-panel section-card"><h2>Lugares relacionados</h2><div class="mini-list">${places.length?places.map(p=>miniEntity(p.name,p.type||"Lugar","pin",`place/${p.slug}`,"",p.image)).join(""):`<p class="empty-inline">Nenhum lugar determinado.</p>`}</div></article>
        ${related.length?`<article class="dark-panel section-card"><h2>Acontecimentos relacionados</h2><div class="mini-list">${related.map(e=>miniEntity(e.name,e.dateLabel||"Data não estabelecida","timeline",`timeline/${e.slug}`)).join("")}</div></article>`:""}
      </aside></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Linha do Tempo",route:"timeline"},{label:entry.name}]);
  }

  function mysteryList(items, ordered = false) {
    if (!items?.length) return "";
    const tag = ordered ? "ol" : "ul";
    return `<${tag} class="mystery-rich-list">${items.map(item => `<li>${linkifyText(item)}</li>`).join("")}</${tag}>`;
  }

  function mysteryBlock(title, items, options = {}) {
    if (!items || (Array.isArray(items) && !items.length)) return "";
    const body = Array.isArray(items) ? mysteryList(items, options.ordered) : `<p>${linkifyText(items)}</p>`;
    return `<section class="mystery-rich-block ${options.accent ? "accent" : ""}"><p class="eyebrow">${escapeHtml(title)}</p>${body}</section>`;
  }

  function renderMysteries() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento narrativo", "Mistérios", "Origem, pistas, investigação, revelações e consequências de cada pergunta narrativa.")}<section class="entity-grid mystery-stage13-grid">${D.mysteries.map(m => {
      const clueCount=(m.firstClues||m.clues||[]).length;
      const chapterCount=(m.chapterNumbers||m.chapterIds||[]).length;
      return `<article class="entity-card mystery-card" data-route="mystery/${m.slug}"><div class="entity-card-top"><span class="entity-avatar">${icon("question")}</span><div><h3>${escapeHtml(m.name)}</h3><span class="alias mystery-status ${m.status==='Resolvido'?'resolved':'open'}">${escapeHtml(m.status)}</span></div></div><p>${escapeHtml(m.question)}</p><div class="tag-row"><span class="tag">${clueCount} pistas iniciais</span><span class="tag">${chapterCount} capítulos</span></div></article>`;
    }).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Mistérios"}]);
  }

  function renderMystery(slug) {
    const mystery = getMystery(slug);
    if (!mystery) return renderNotFound();
    const characterIds=mystery.characterIds||mystery.linkedCharacters||[];
    const linked = characterIds.map(getCharacter).filter(Boolean);
    const places=(mystery.placeIds||[]).map(getPlace).filter(Boolean);
    const chapters=(mystery.chapterNumbers||[]).map(number=>D.chapters.find(ch=>Number(ch.number)===Number(number))).filter(Boolean);
    refs.main.innerHTML = `<div class="page-enter mystery-stage13-detail">
      <button class="secondary-button mystery-back" data-route="mysteries">← Voltar para Mistérios</button>
      ${pageHeader("Mistério", mystery.name, mystery.status)}
      <section class="mystery-question-panel parchment-panel"><p class="eyebrow">Pergunta central</p><h2>${escapeHtml(mystery.question)}</h2><p class="mystery-summary">${linkifyText(mystery.summary||mystery.readerKnows||"")}</p></section>
      <section class="mystery-stage13-layout"><div class="mystery-stage13-main">
        ${mysteryBlock("Como surgiu",mystery.origin)}
        ${mysteryBlock("Primeiras pistas",mystery.firstClues||mystery.clues,{ordered:true})}
        ${mysteryBlock("Caminhos de investigação",mystery.investigationPaths)}
        ${mysteryBlock("Descobertas intermediárias",mystery.discoveries)}
        ${mysteryBlock("Falsas pistas",mystery.falseLeads)}
        ${mysteryBlock("Contradições",mystery.contradictions)}
        ${mysteryBlock(mystery.status==='Resolvido'?"Revelação final":"Estado da revelação",mystery.finalRevelation||mystery.answer,{accent:true})}
        ${mysteryBlock("Consequências",mystery.consequences)}
      </div><aside class="mystery-stage13-context">
        <article class="dark-panel section-card"><h3>Capítulos relacionados</h3><div class="mini-list">${chapters.length?chapters.map(ch=>miniEntity(`Capítulo ${ch.number}`,ch.title,"chapter",`chapter/${ch.id}`)).join(""):`<p class="empty-inline">Nenhum capítulo ligado.</p>`}</div></article>
        <article class="dark-panel section-card"><h3>Personagens ligadas</h3><div class="context-chip-list">${linked.length?linked.map(c => `<button class="context-chip" data-route="character/${c.slug}">${c.image ? `<img src="${escapeHtml(c.image)}" alt="">` : icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join(""):`<p class="empty-inline">Nenhuma personagem registada.</p>`}</div></article>
        <article class="dark-panel section-card"><h3>Lugares relacionados</h3><div class="mini-list">${places.length?places.map(p=>miniEntity(p.name,p.type||"Lugar","pin",`place/${p.slug}`,"",p.image)).join(""):`<p class="empty-inline">Nenhum lugar determinado.</p>`}</div></article>
      </aside></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Mistérios",route:"mysteries"},{label:mystery.name}]);
  }

  const foldText = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

  function clanMarkImage(clan) {
    return clan.emblem || clan.contextMark || "";
  }

  function clanTerritory(clan) {
    return getPlace(clan.placeId);
  }

  function clanProfileCard(title, iconName, text, wide = false) {
    if (!text) return "";
    return `<article class="clan-profile-card ${wide ? "wide" : ""}"><h2>${icon(iconName)} ${escapeHtml(title)}</h2><p>${linkifyText(text)}</p></article>`;
  }

  function clanRelationshipEntries(clan) {
    const relationSection = (sourceClan, targetClan) => {
      const own = foldText(sourceClan.name);
      const target = foldText(targetClan.name);
      return (sourceClan.sections || []).find(section => {
        if (!(section.paragraphs || []).length) return false;
        const title = foldText(section.title);
        return title === target
          || title.includes(`relacao com ${target}`)
          || title.includes(`${own} e ${target}`)
          || title.includes(`${target} e ${own}`)
          || (title.includes(target) && (title.includes("relacao") || title.includes("outros clas")));
      });
    };
    return D.clans.filter(other => other.id !== clan.id).map(other => {
      const direct = relationSection(clan, other);
      const reverse = direct ? null : relationSection(other, clan);
      const section = direct || reverse;
      return {
        clan: other,
        text: section?.paragraphs?.join(" ") || `A relação entre ${clan.name} e ${other.name} ainda não foi descrita separadamente nos documentos de clã.`,
        reverse: Boolean(reverse)
      };
    });
  }

  function clanRelationGrid(clan) {
    const entries = clanRelationshipEntries(clan);
    if (!entries.length) return `<p class="empty-inline">As relações políticas ainda não foram individualizadas.</p>`;
    return `<div class="clan-relations-grid">${entries.map(entry => `<article class="clan-relation-card"><h3><button class="inline-entity-link" data-route="clan/${escapeHtml(entry.clan.slug)}">${escapeHtml(entry.clan.name)}</button></h3><p>${linkifyText(characterShortText(entry.text, 360))}</p></article>`).join("")}</div>`;
  }

  function clanMembers(clan) {
    const characters = D.characters.filter(character => character.clanId === clan.id);
    if (!characters.length) return `<div class="clan-empty-members">Nenhum personagem individualizado deste clã participa diretamente do manuscrito atual.</div>`;
    return `<div class="clan-member-strip" aria-label="Personagens do clã ${escapeHtml(clan.name)}">${characters.map(character => `<button class="clan-member-card" data-route="character/${escapeHtml(character.slug)}"><span class="clan-member-media">${character.image ? `<img src="${escapeHtml(character.image)}" alt="Retrato de ${escapeHtml(character.name)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${icon("person")}</span>` : icon("person")}</span><span class="clan-member-copy"><strong>${escapeHtml(character.name)}</strong><small>${escapeHtml(character.alias || character.importance || "Integrante do clã")}</small></span></button>`).join("")}</div>`;
  }

  function clanLoreItems(clan, kind, limit = 8) {
    const source = foldText((clan.sections || []).flatMap(section => [section.title, ...(section.paragraphs || [])]).join(" "));
    return (D.lore[kind] || [])
      .filter(item => (item.clans || []).includes(clan.name))
      .map(item => ({
        ...item,
        kind,
        clanScore: (source.includes(foldText(item.name)) ? 1000 : 0) + Number(item.citations || 0) * 4 + (item.image ? 30 : 0)
      }))
      .sort((a, b) => b.clanScore - a.clanScore || a.name.localeCompare(b.name, "pt-BR"))
      .slice(0, limit);
  }

  function clanLoreSection(clan, kind, title, iconName, categoryRoute) {
    const items = clanLoreItems(clan, kind);
    const fallback = {
      foods: "",
      fauna: "",
      flora: ""
    }[kind];
    return `<section class="clan-lore-section"><div class="clan-lore-section-header"><div><h2>${icon(iconName)} ${escapeHtml(title)}</h2><p>${kind === "foods" ? "Comidas e ingredientes ligados ao cotidiano do clã." : kind === "fauna" ? "Animais usados, caçados, criados ou temidos no território." : "Plantas com relevância territorial, alimentar, medicinal ou cultural."}</p></div><button class="secondary-button" data-route="${categoryRoute}">Ver categoria</button></div>${items.length ? `<div class="clan-lore-grid">${items.map(item => { const src = item.image || fallback; return `<button class="clan-lore-card" data-route="lore-item/${kind}/${escapeHtml(item.slug)}"><span class="clan-lore-media"><img src="${escapeHtml(src)}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(fallback)}'"></span><span class="clan-lore-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(characterShortText(item.summary || item.type, 112))}</small></span></button>`; }).join("")}</div>` : `<p class="empty-inline">Nenhum item diretamente ligado foi registrado.</p>`}</section>`;
  }

  function clanArchiveGroups(clan) {
    const groups = new Map();
    for (const section of clan.sections || []) {
      const rootNumber = String(section.number || "").split(".")[0] || "0";
      if (!groups.has(rootNumber)) groups.set(rootNumber, { number: rootNumber, title: "Arquivo do clã", sections: [] });
      const group = groups.get(rootNumber);
      if (!String(section.number || "").includes(".") && section.title) group.title = section.title;
      group.sections.push(section);
    }
    return [...groups.values()].sort((a, b) => Number(a.number) - Number(b.number));
  }

  function clanArchive(clan) {
    const groups = clanArchiveGroups(clan);
    return `<section class="clan-archive"><header><p class="eyebrow">Documento de referência</p><h2>Arquivo aprofundado do clã</h2><p>O conteúdo extenso anterior foi preservado e reorganizado em grupos recolhíveis. Ele complementa a ficha orientadora sem esconder as informações canônicas já registradas.</p></header>${groups.map(group => `<details class="clan-archive-group"><summary><span>${escapeHtml(group.number)}. ${escapeHtml(group.title)}</span><small>${group.sections.length} ${group.sections.length === 1 ? "parte" : "partes"}</small></summary><div class="clan-archive-content">${group.sections.map(section => `<section class="clan-archive-subsection"><h3>${escapeHtml(section.number)} · ${escapeHtml(section.title)}</h3>${(section.paragraphs || []).length ? section.paragraphs.map(paragraph => `<p>${linkifyText(paragraph)}</p>`).join("") : `<p class="empty-inline">Seção introdutória do grupo.</p>`}</section>`).join("")}</div></details>`).join("")}</section>`;
  }

  function renderClans() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mundo", "Clãs", "Oito povos moldados por território, memória, trabalho, fome e guerra. Abra uma ficha para consultar cultura, economia, personagens e recursos ligados ao clã.")}<section class="clan-overview-grid">${D.clans.map(clan => {
      const place = clanTerritory(clan);
      const profile = clan.profile || {};
      const mark = clanMarkImage(clan);
      return `<article class="clan-overview-card" style="--clan-color:${escapeHtml(clan.colour)}" data-route="clan/${escapeHtml(clan.slug)}" tabindex="0" role="link"><div class="clan-overview-landscape">${place?.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}" loading="lazy" onerror="this.hidden=true">` : ""}</div><div class="clan-overview-top"><span class="clan-overview-mark"><img src="${escapeHtml(mark)}" alt="${clan.emblem ? `Brasão do clã ${escapeHtml(clan.name)}` : `Marca contextual dos ${escapeHtml(clan.name)}`}" loading="lazy" onerror="this.hidden=true"></span><span class="clan-overview-type">Clã de ${escapeHtml(clan.essence)}</span></div><div class="clan-overview-copy"><p class="eyebrow">${escapeHtml(place?.name || "Território não registrado")}</p><h2>${escapeHtml(clan.name)}</h2><p>${escapeHtml(characterShortText(clan.summary, 165))}</p><div class="clan-overview-facts"><span>População<strong>${escapeHtml(profile.populationLabel || "Não estimada")}</strong></span><span>Força de batalha<strong>${escapeHtml(profile.militaryLabel || "Não estimada")}</strong></span></div></div></article>`;
    }).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Clãs"}]);
  }

  function renderClan(slug) {
    const clan = getClan(slug);
    if (!clan) return renderNotFound();
    const place = clanTerritory(clan);
    const profile = clan.profile || {};
    const mark = clanMarkImage(clan);
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Clã", clan.name, `Essência: ${clan.essence}`, `<button class="secondary-button" data-route="relationships">${icon("network")} Relações políticas</button>${place ? `<button class="primary-button" data-route="place/${place.slug}">${icon("pin")} Território</button>` : ""}`)}
      <section class="clan-stage10-hero" style="--clan-color:${escapeHtml(clan.colour)}"><div class="clan-stage10-hero-bg">${place?.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}" onerror="this.hidden=true">` : ""}</div><div class="clan-stage10-mark"><div class="clan-stage10-mark-frame"><img src="${escapeHtml(mark)}" alt="${clan.emblem ? `Brasão do clã ${escapeHtml(clan.name)}` : `Marca contextual dos ${escapeHtml(clan.name)}`}" onerror="this.hidden=true"></div></div><div class="clan-stage10-hero-copy"><p class="eyebrow">${clan.emblem ? "Brasão e território" : "Clã sem brasão formal"}</p><h1>${escapeHtml(clan.name)}</h1><p>${escapeHtml(clan.summary)}</p><div class="clan-stage10-core"><div><small>Território principal</small><strong>${escapeHtml(place?.name || "Não registrado")}</strong></div><div><small>População estimada</small><strong>${escapeHtml(profile.populationLabel || "Não estimada")}</strong></div><div><small>Força de batalha</small><strong>${escapeHtml(profile.militaryLabel || "Não estimada")}</strong></div><div><small>Essência</small><strong>${escapeHtml(clan.essence)}</strong></div></div></div></section>
      <section class="clan-profile-grid">
        ${clanProfileCard("Origem", "root", profile.origin)}
        ${clanProfileCard("Território", "map", profile.territory)}
        ${clanProfileCard("Cultura", "scroll", profile.culture)}
        ${clanProfileCard("Modo de vida", "home", profile.wayOfLife)}
        ${clanProfileCard("Economia", "grain", profile.economy)}
        ${clanProfileCard("Estrutura social", "people", profile.socialStructure)}
        ${clanProfileCard("Alimentação", "bowl", profile.food, true)}
        <article class="clan-profile-card wide"><h2>${icon("network")} Relações com outros clãs</h2>${clanRelationGrid(clan)}</article>
      </section>
      <section class="clan-strength-grid"><article class="clan-list-panel strengths"><h2>Forças</h2><ul>${(profile.strengths || []).map(item => `<li>${linkifyText(item)}</li>`).join("")}</ul></article><article class="clan-list-panel weaknesses"><h2>Fragilidades</h2><ul>${(profile.weaknesses || []).map(item => `<li>${linkifyText(item)}</li>`).join("")}</ul></article></section>
      <section class="clan-profile-grid">${clanProfileCard("Participação na guerra", "crossed-swords", profile.warRole, true)}${clanProfileCard("Situação ao final do livro", "timeline", profile.finalSituation, true)}</section>
      <div class="clan-section-heading"><div><p class="eyebrow">Pessoas</p><h2>Personagens do clã</h2><p>Fotos, nomes e funções aparecem depois dos textos gerais, em cartões clicáveis.</p></div><button class="secondary-button" data-route="characters">Ver personagens</button></div>
      ${clanMembers(clan)}
      <div class="clan-section-heading"><div><p class="eyebrow">Território e cotidiano</p><h2>Alimentos, fauna e flora</h2><p>Itens associados ao clã aparecem separados por função, e não como um bloco genérico de lore.</p></div></div>
      <div class="clan-lore-groups">${clanLoreSection(clan,"foods","Alimentos","bowl","foods")}${clanLoreSection(clan,"fauna","Fauna","paw","fauna")}${clanLoreSection(clan,"flora","Flora","leaf","flora")}</div>
      ${clanArchive(clan)}
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Clãs",route:"clans"},{label:clan.name}]);
  }

  function placePopulationLabel(place) {
    return place?.population?.label || "";
  }

  function placeFeatureBlock(title, values) {
    const list = Array.isArray(values) ? values.filter(Boolean) : [];
    if (!list.length) return "";
    return `<article class="place-feature-card"><h3>${escapeHtml(title)}</h3><ul>${list.map(value => `<li>${linkifyText(value)}</li>`).join("")}</ul></article>`;
  }

  function placeCharacterCards(place) {
    const ids = [...new Set(place.characterIds || [])];
    if (!ids.length) return `<p class="empty-inline">Nenhum personagem tem uma cena direta registrada neste lugar.</p>`;
    return `<div class="place-character-grid">${ids.map(id => {
      const character = getCharacter(id);
      if (!character) return "";
      const scenes = (place.chapterScenes || []).filter(scene => (scene.characterIds || []).includes(id));
      const chapters = scenes.map(scene => getChapter(scene.chapterId)?.number).filter(Boolean);
      const note = chapters.length ? `Presente nas cenas dos capítulos ${chapters.join(", ")}.` : "Presença ligada a este lugar.";
      return `<button class="place-character-card" data-route="character/${character.slug}">${character.image ? `<img src="${escapeHtml(character.image)}" alt="${escapeHtml(character.name)}">` : `<span class="place-character-fallback">${icon("person")}</span>`}<span><strong>${escapeHtml(character.name)}</strong><small>${escapeHtml(note)}</small></span></button>`;
    }).join("")}</div>`;
  }

  function placeChapterSceneCards(place) {
    const scenes = place.chapterScenes || [];
    if (!scenes.length) return `<p class="empty-inline">O lugar faz parte da lore, mas não recebe uma cena direta no manuscrito deste livro.</p>`;
    return `<div class="place-scene-list">${scenes.map(scene => {
      const chapter = getChapter(scene.chapterId);
      if (!chapter) return "";
      const relation = scene.relation && scene.relation !== "ocorre" ? `<span class="place-scene-relation">${escapeHtml(scene.relation)}</span>` : "";
      return `<article class="place-scene-card" data-route="chapter/${chapter.id}" tabindex="0" role="link"><div class="place-scene-heading"><div><p class="eyebrow">Capítulo ${chapter.number}</p><h3>${escapeHtml(chapter.title)}</h3></div>${relation}</div><p>${linkifyText(scene.text)}</p></article>`;
    }).join("")}</div>`;
  }

  function placeTimelineCards(place) {
    const events = (place.eventIds || []).map(getTimelineEntry).filter(Boolean);
    if (!events.length) return `<p class="empty-inline">Nenhum acontecimento da Linha do Tempo está ligado diretamente a este lugar.</p>`;
    return `<div class="place-event-list">${events.map(entry => `<button class="place-event-card" data-route="timeline/${entry.slug}"><span class="place-event-date">${escapeHtml(entry.dateLabel || entry.period || "Data não estabelecida")}</span><strong>${escapeHtml(entry.name)}</strong><small>${escapeHtml(entry.summary)}</small></button>`).join("")}</div>`;
  }

  function renderPlaces() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mundo", "Lugares", "Cidades, aldeias, regiões, rotas e espaços narrativos de Guerras de Sangue.")}<section class="entity-grid place-grid">${D.places.map(place => {
      const clan = getClan(place.clanId);
      const population = placePopulationLabel(place);
      return `<article class="entity-card place-card" data-route="place/${place.slug}"><div class="entity-card-top"><span class="entity-avatar ${place.image ? "has-image" : ""}">${place.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}">` : icon("pin")}</span><div><h3>${escapeHtml(place.name)}</h3><span class="alias">${escapeHtml(place.type)}</span></div></div><p>${escapeHtml(place.summary)}</p><div class="place-card-facts"><div><small>Região</small><strong>${escapeHtml(place.region || "Não estabelecida")}</strong></div>${population ? `<div><small>População estimada</small><strong>${escapeHtml(population)}</strong></div>` : `<div><small>Vínculo territorial</small><strong>${escapeHtml(clan?.name || "Sem população permanente")}</strong></div>`}</div></article>`;
    }).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Lugares"}]);
  }

  function renderPlace(slug) {
    const place = getPlace(slug);
    if (!place) return renderNotFound();
    const clan = getClan(place.clanId);
    const population = placePopulationLabel(place);
    const description = Array.isArray(place.description) && place.description.length ? place.description : [place.summary];
    const featureCards = [
      placeFeatureBlock("Arquitetura e forma", place.architecture ? [place.architecture] : []),
      placeFeatureBlock("Clima e atmosfera", place.atmosphere ? [place.atmosphere] : []),
      placeFeatureBlock("Recursos", place.resources),
      placeFeatureBlock("Perigos", place.dangers),
      placeFeatureBlock("Cultura e modo de vida", place.culture)
    ].filter(Boolean).join("");
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Lugar", place.name, place.type, place.x != null ? `<button class="primary-button" data-route="map">${icon("map")} Ver no mapa</button>` : "")}
      <section class="place-detail-hero"><div class="place-illustration ${place.image ? "has-photo" : ""}">${place.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}">` : clan?.emblem ? `<img src="${escapeHtml(clan.emblem)}" alt="Brasão ${escapeHtml(clan.name)}">` : icon("fortress")}</div><article class="parchment-panel place-summary-panel"><p class="place-lead">${linkifyText(place.summary)}</p><div class="place-detail-facts"><div><small>Região</small><strong>${escapeHtml(place.region || "Não estabelecida")}</strong></div><div><small>Localização</small><strong>${escapeHtml(place.location || "Não estabelecida")}</strong></div>${population ? `<div><small>População estimada</small><strong>${escapeHtml(population)}</strong></div>` : ""}<div><small>Clã associado</small><strong>${escapeHtml(clan?.name || "Nenhum")}</strong></div><div><small>Mapa</small><strong>${place.x != null ? "Localização marcada" : "Coordenada ainda não definida"}</strong></div></div></article></section>
      <section class="place-content-section parchment-panel"><p class="eyebrow">Descrição completa</p><h2>Sobre ${escapeHtml(place.name)}</h2>${description.map(paragraph => `<p>${linkifyText(paragraph)}</p>`).join("")}${place.narrativeFunction ? `<div class="place-narrative-function"><small>Função narrativa</small><p>${linkifyText(place.narrativeFunction)}</p></div>` : ""}</section>
      <section class="place-feature-grid">${featureCards}</section>
      <section class="dark-panel section-card place-characters-section"><div class="section-heading"><div><p class="eyebrow">Presenças no livro</p><h2>Personagens que passaram por aqui</h2></div></div>${placeCharacterCards(place)}</section>
      <section class="place-linked-grid"><article class="dark-panel section-card"><div class="section-heading"><div><p class="eyebrow">Cenas localizadas</p><h2>Capítulos com cenas neste lugar</h2></div></div>${placeChapterSceneCards(place)}</article><article class="dark-panel section-card"><div class="section-heading"><div><p class="eyebrow">Cronologia</p><h2>Acontecimentos relacionados</h2></div></div>${placeTimelineCards(place)}</article></section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Lugares",route:"places"},{label:place.name}]);
  }

  const mapControl = (action,label,iconName) => `<button type="button" data-di-map-action="${action}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">${icon(iconName)}</button>`;

  function warMapPin(place) {
    const point=place.map;
    if(!point) return "";
    return `<button class="di-map-pin" style="left:${point.x}%;top:${point.y}%" data-di-map-pin="${escapeHtml(place.id)}" data-map-x="${point.x}" data-map-y="${point.y}" data-pin-kind="${escapeHtml(point.kind || "place")}" data-major="${point.major ? "true" : "false"}" aria-label="Abrir ficha rápida de ${escapeHtml(place.name)}"><span class="di-map-pin-marker" aria-hidden="true"></span><span class="di-map-pin-label">${escapeHtml(place.name)}</span></button>`;
  }

  function mountWarMap() {
    const map=D.maps?.main;
    const root=document.getElementById("guerrasInteractiveMap");
    if(!root || !map || !window.DIMaps) return;
    window.DIMaps.mount({
      root,
      key:"guerrasInteractiveMap",
      initialZoom:1,
      minZoom:.72,
      maxZoom:3.25,
      getItem:id=>D.places.find(place=>place.id===id),
      renderPopup:place=>{
        const clan=getClan(place.clanId);
        return `<p class="eyebrow">${escapeHtml(place.type || "Lugar")}</p><h2>${escapeHtml(place.name)}</h2><p>${escapeHtml(place.summary)}</p><div class="di-map-popup-facts"><div><small>Região</small><strong>${escapeHtml(place.region || "Não estabelecida")}</strong></div>${place.population?.label ? `<div><small>População</small><strong>${escapeHtml(place.population.label)}</strong></div>` : `<div><small>Clã associado</small><strong>${escapeHtml(clan?.name || "Nenhum")}</strong></div>`}</div><div class="di-map-popup-actions"><button class="primary-button" data-route="place/${place.slug}">Abrir ficha</button></div>`;
      }
    });
  }

  function renderMap() {
    const map=D.maps?.main;
    if(!map){refs.main.innerHTML=`<div class="page-enter">${pageHeader("Mapa temporal · Livro 2","Jesed em Guerras de Sangue","Os dados cartográficos ainda não foram carregados.")}</div>`;return;}
    const places=map.placeIds.map(id=>D.places.find(place=>place.id===id)).filter(Boolean);
    const strategic=(map.strategicCategories || []).filter(category=>(category.items || []).length>=2);
    const routes=(map.routeLines || []).map(route=>`<polyline class="${route.kind === "water" ? "water-route" : route.kind === "military" ? "military-route" : "land-route"}" points="${escapeHtml(route.points)}" aria-hidden="true"></polyline>`).join("");
    const strategyHtml=strategic.map(category=>`<article class="di-map-strategy-card"><h3>${escapeHtml(category.label)}</h3><div class="di-map-strategy-list">${category.items.map(item=>`<div class="di-map-strategy-item"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small><div class="di-map-strategy-places">${(item.placeIds || []).map(id=>{const place=D.places.find(candidate=>candidate.id===id);return place?`<button type="button" data-di-global-map-focus="${escapeHtml(place.id)}" data-di-map-root="guerrasInteractiveMap">${escapeHtml(place.name)}</button>`:"";}).join("")}</div></div>`).join("")}</div></article>`).join("");
    refs.main.innerHTML=`<div class="page-enter map-page">${pageHeader("Mapa temporal · Livro 2",map.title,"Todos os lugares, rotas e regiões do livro. Arraste para mover, use os controles para ampliar e selecione um marcador para abrir a ficha.")}
      <section class="di-map-section guerras-map-section">
        <div id="guerrasInteractiveMap" class="di-map-shell guerras-interactive-map" data-di-map-fullscreen style="--di-map-ratio:${escapeHtml(map.ratio)};--di-map-accent:#8d4939">
          <div class="di-map-toolbar" aria-label="Controles do mapa">${mapControl("zoom-in","Aproximar","zoomin")}${mapControl("zoom-out","Afastar","zoomout")}${mapControl("center","Centralizar","center")}${mapControl("labels","Mostrar ou ocultar nomes","labels")}${mapControl("fullscreen","Tela inteira","fullscreen")}</div>
          <div class="di-map-context"><p>Mapa político e territorial</p><h2>${escapeHtml(map.title)}</h2></div>
          <div class="di-map-viewport" data-di-map-viewport tabindex="0" aria-label="Mapa interativo de Jesed em Guerras de Sangue. Arraste para deslocar e use os controles para ampliar.">
            <div class="di-map-stage" data-di-map-stage><img src="${escapeHtml(map.image)}" alt="Mapa de Jesed na época de Guerras de Sangue" draggable="false"><svg class="di-map-route-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${routes}</svg>${places.map(warMapPin).join("")}</div>
            <div data-di-map-popup-host></div>
          </div>
          <div class="di-map-helper">Arraste para deslocar · use a roda ou os botões para ampliar · selecione um marcador</div>
        </div>
        <article class="parchment-panel map-place-directory"><div class="section-heading"><div><p class="eyebrow">${places.length} lugares localizados</p><h2>Índice cartográfico</h2></div></div><div class="map-place-links">${places.map(place=>`<button type="button" data-di-global-map-focus="${escapeHtml(place.id)}" data-di-map-root="guerrasInteractiveMap">${escapeHtml(place.name)}</button>`).join("")}</div></article>
        ${strategic.length ? `<section class="di-map-strategy"><div class="section-heading"><div><p class="eyebrow">Leitura política do território</p><h2>Informações estratégicas</h2><p>São exibidas apenas categorias com duas ou mais informações relevantes.</p></div></div><div class="di-map-strategy-grid">${strategyHtml}</div></section>` : ""}
        <div class="book-slider"><button class="book-step" onclick="location.href='ruinas.html#/mapa'"><small>Livro 1</small><strong>Ruínas dos Céus</strong></button><button class="book-step active" data-route="map"><small>Livro 2</small><strong>Guerras de Sangue</strong></button><button class="book-step" disabled><small>Livro 3</small><strong>Dinastia Polar</strong></button><button class="book-step" disabled><small>Livro 4</small><strong>Herdeiros das Cinzas</strong></button><button class="book-step" disabled><small>Livro 5</small><strong>Coração de Poeira</strong></button></div>
      </section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Mapa"}]);
    requestAnimationFrame(mountWarMap);
  }

  function loreKindInfo(kind) {
    return {
      fauna: ["Fauna", "Animais de Jesed, seus usos, perigos e aparições.", "paw"],
      flora: ["Flora", "Plantas, raízes, árvores, fungos e fibras da época.", "leaf"],
      foods: ["Alimentos", "Preparações, ingredientes, clãs usuários e citações.", "bowl"],
      concepts: ["Conceitos e leis", "Símbolos, costumes e princípios de Jesed.", "scroll"]
    }[kind] || ["Lore", "Conteúdo do mundo.", "scroll"];
  }

  function loreSortedItems(kind) {
    let items = [...(D.lore[kind] || [])];
    if (state.loreFilter !== "all" && kind !== "concepts") items = items.filter(item => item.clans.includes(state.loreFilter));
    items.sort(state.loreSort === "count" ? (a,b) => (b.citations||0)-(a.citations||0) || a.name.localeCompare(b.name,"pt-BR") : (a,b) => a.name.localeCompare(b.name,"pt-BR"));
    return items;
  }

  function renderLore(kind) {
    const actualKind = kind === "lore" ? "concepts" : kind;
    state.loreKind = actualKind;
    const [title, subtitle, iconName] = loreKindInfo(actualKind);
    const items = loreSortedItems(actualKind);
    const clanFilters = actualKind === "concepts" ? "" : `<div class="filter-toolbar lore-clan-filter"><span class="filter-label">${icon("filter")} Filtrar por clã:</span><button class="filter-chip ${state.loreFilter === "all" ? "active" : ""}" data-lore-filter="all" data-lore-kind="${actualKind}">Todos</button>${D.clans.map(clan => `<button class="filter-chip ${state.loreFilter === clan.name ? "active" : ""}" data-lore-filter="${clan.name}" data-lore-kind="${actualKind}">${escapeHtml(clan.name)}</button>`).join("")}</div>`;
    const orderTools = actualKind === "concepts" ? "" : `<div class="filter-toolbar lore-order-tools"><span class="filter-label">Ordenar:</span><button class="filter-chip ${state.loreSort === "alpha" ? "active" : ""}" data-lore-sort="alpha" data-lore-kind="${actualKind}">A–Z</button><button class="filter-chip ${state.loreSort === "count" ? "active" : ""}" data-lore-sort="count" data-lore-kind="${actualKind}">Mais citados</button><button class="secondary-button" data-lore-export="${actualKind}">Exportar não citados</button><div class="lore-view-toggle" role="group" aria-label="Modo de visualização"><button class="lore-view-button ${state.loreView === "grid" ? "active" : ""}" data-lore-view="grid" aria-pressed="${state.loreView === "grid"}" title="Ver em quadrados">${icon("image")}<span class="sr-only">Quadrados</span></button><button class="lore-view-button ${state.loreView === "list" ? "active" : ""}" data-lore-view="list" aria-pressed="${state.loreView === "list"}" title="Ver em lista">${icon("timeline")}<span class="sr-only">Lista</span></button></div></div>`;
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Lore", title, subtitle)}${clanFilters}${orderTools}<div id="loreList">${loreListHtml(actualKind, items, iconName)}</div></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:title}]);
  }

  function loreListHtml(kind, items, iconName = loreKindInfo(kind)[2]) {
    if (!items.length) return `<div class="character-browser-empty dark-panel"><h2>Nenhum item encontrado</h2><p>Tente outro filtro ou outra ordenação.</p></div>`;
    const media = item => item.image ? `<img class="lore-card-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="lore-card-image lore-image-placeholder" hidden>${icon(iconName)}</div>` : `<div class="lore-card-image lore-image-placeholder">${icon(iconName)}</div>`;
    if (state.loreView === "list") {
      return `<div class="lore-list-view">${items.map(item => `<button class="lore-list-row" data-route="lore-item/${kind}/${item.slug}"><span class="lore-list-media">${media(item)}</span><span class="lore-list-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(characterShortText(item.summary,150))}</small></span><span class="citation-count">${item.citations||0} ${(item.citations||0)===1?"citação":"citações"}</span></button>`).join("")}</div>`;
    }
    return `<section class="lore-grid lore-stage11-grid">${items.map(item => `<article class="lore-card lore-stage11-card has-image" data-route="lore-item/${kind}/${item.slug}">${media(item)}<span class="citation-count">${item.citations||0} ${(item.citations||0)===1?"citação":"citações"}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(characterShortText(item.summary,190))}</p></article>`).join("")}</section>`;
  }

  function renderLoreItem(kind, slug) {
    const item = getLoreItem(kind, slug);
    if (!item) return renderNotFound();
    const [title,,iconName] = loreKindInfo(kind);
    const fallback = '';
    const mentions = item.citationDetails || [];
    const isConcept=kind==="concepts";
    const fields = isConcept ? [
      ["Definição",item.definition],["Origem",item.origin],["Funcionamento conhecido",item.knownFunctioning]
    ] : [
      ["Características", item.characteristics],["Habitat e origem", item.habitat],["Usos", Array.isArray(item.uses) ? item.uses.join("\n") : item.uses]
    ];
    const relatedCharacters=(item.relatedCharacters||[]).map(getCharacter).filter(Boolean);
    const relatedChapters=(item.chapterNumbers||[]).map(number=>D.chapters.find(ch=>Number(ch.number)===Number(number))).filter(Boolean);
    const richList=(label,values)=>values?.length?`<section class="concept-rich-block"><h2>${escapeHtml(label)}</h2><ul>${values.map(value=>`<li>${linkifyText(value)}</li>`).join("")}</ul></section>`:"";
    refs.main.innerHTML = `<div class="page-enter">${pageHeader(title, item.name, item.type)}
      <section class="lore-detail-layout lore-stage11-detail concept-stage12-detail"><article class="parchment-panel lore-detail">
        ${item.image ? `<img class="lore-detail-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.hidden=true">` : `<div class="lore-detail-image lore-image-placeholder">${icon(iconName)}</div>`}
        <p class="lore-lead">${linkifyText(item.summary)}</p>
        ${fields.filter(([,value])=>value).map(([label,value])=>`<section class="concept-rich-block"><h2>${escapeHtml(label)}</h2>${String(value).split(/\n\s*\n/).filter(Boolean).map(x=>`<p>${linkifyText(x)}</p>`).join("")}</section>`).join("")}
        ${isConcept?`${richList("Interpretações",item.interpretations)}${richList("Ambiguidades",item.ambiguities)}${richList("Evolução no livro",item.evolution)}`:`<div class="lore-full-description">${String(item.fullDescription||item.details?.join("\n\n")||item.summary||"").split(/\n\s*\n/).filter(Boolean).map(paragraph=>`<p>${linkifyText(paragraph)}</p>`).join("")}</div>`}
      </article><aside class="dark-panel section-card"><h3>Relação com povos e clãs</h3><div class="tag-row">${item.clans?.length ? item.clans.map(name => { const clan = getClan(slugText(name).replaceAll(" ","-")); return `<button class="tag clickable-tag" ${clan ? `data-route="clan/${clan.slug}"` : ""}>${escapeHtml(name)}</button>`; }).join("") : `<span class="empty-inline">Nenhum povo ou clã específico registado.</span>`}</div>
        ${isConcept?`<h3>Personagens relacionadas</h3><div class="context-chip-list">${relatedCharacters.length?relatedCharacters.map(c=>`<button class="context-chip" data-route="character/${c.slug}">${c.image?`<img src="${escapeHtml(c.image)}" alt="">`:icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join(""):`<p class="empty-inline">Nenhuma personagem ligada.</p>`}</div><h3>Capítulos relacionados</h3><div class="mini-list">${relatedChapters.length?relatedChapters.map(ch=>miniEntity(`Capítulo ${ch.number}`,ch.title,"chapter",`chapter/${ch.id}`)).join(""):`<p class="empty-inline">Nenhum capítulo ligado.</p>`}</div>`:""}
      </aside></section>
      ${isConcept?"":`<section class="parchment-panel lore-citations-section"><div class="section-heading"><div><p class="eyebrow">Citações no livro</p><h2>${item.citations||0} ${(item.citations||0)===1?"vez citado":"vezes citado"}</h2><p>Todas as menções localizadas no manuscrito canônico usado nesta etapa.</p></div></div>${mentions.length ? `<div class="lore-citation-list">${mentions.map(m=>{const ch=getChapter(m.chapter);return `<article class="lore-citation"><button class="lore-citation-chapter" data-route="chapter/${ch?.id||m.chapter}">Capítulo ${m.chapter} — ${escapeHtml(ch?.title||m.chapterTitle||"")}</button><blockquote>“${escapeHtml(m.quote)}”</blockquote><p>${escapeHtml(m.context||"")}</p></article>`}).join("")}</div>` : `<p class="empty-inline">Este item ainda não foi citado diretamente no manuscrito.</p>`}</section>`}
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:title,route:kind === "concepts" ? "lore" : kind},{label:item.name}]);
  }

  function themeList(title, values) {
    if (!values?.length) return "";
    return `<section class="parchment-panel theme-stage14-block"><h2>${escapeHtml(title)}</h2><ul>${values.map(value => `<li>${linkifyText(value)}</li>`).join("")}</ul></section>`;
  }

  function renderThemes() {
    const items=D.common?.entities?.themes||[];
    refs.main.innerHTML=`<div class="page-enter">${pageHeader("Leitura temática","Temas","Ideias que atravessam a guerra sem transformar interpretação em resposta única.")}<section class="theme-stage14-grid">${items.map(item=>`<article class="parchment-panel theme-stage14-card" data-route="theme/${escapeHtml(item.slug)}" tabindex="0" role="link"><p class="eyebrow">${escapeHtml(item.category||"Tema")}</p><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.summary)}</p><div class="theme-stage14-counts"><span>${(item.chapterIds||[]).length} capítulos</span><span>${(item.characterIds||[]).length} personagens</span><span>${(item.symbols||[]).length} símbolos</span></div><p class="theme-question">${escapeHtml(item.question||"")}</p><span class="theme-open">Aprofundar tema ${icon("arrow")}</span></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Temas"}]);
  }

  function renderTheme(slug) {
    const item=getTheme(slug);if(!item)return renderNotFound();
    const chars=(item.characterIds||[]).map(getCharacter).filter(Boolean);
    const places=(item.placeIds||[]).map(getPlace).filter(Boolean);
    const chapters=(item.chapterIds||[]).map(getChapter).filter(Boolean);
    const events=(item.eventIds||[]).map(getTimelineEntry).filter(Boolean);
    const evolution=(item.evolution||[]).map(step=>`<article class="theme-stage14-step"><small>${escapeHtml(step.phase)}</small><div><h3>${escapeHtml(step.title)}</h3><p>${linkifyText(step.text)}</p>${step.chapterIds?.length?`<div class="tag-row">${step.chapterIds.map(getChapter).filter(Boolean).map(ch=>`<button class="tag clickable-tag" data-route="chapter/${ch.id}">Cap. ${ch.number}</button>`).join("")}</div>`:""}</div></article>`).join("");
    refs.main.innerHTML=`<div class="page-enter"><button class="secondary-button mystery-back" data-route="themes">← Voltar para Temas</button>${pageHeader(item.category||"Tema",item.name,item.summary)}<article class="parchment-panel theme-stage14-block"><p class="theme-stage14-question">${escapeHtml(item.question||"")}</p><p>${linkifyText(item.description||item.summary)}</p></article><section class="theme-stage14-detail"><div class="theme-stage14-main">${themeList("Desenvolvimento",item.development)}${item.symbols?.length?`<section class="parchment-panel theme-stage14-block"><h2>Símbolos</h2><div class="theme-stage14-symbols">${item.symbols.map(symbol=>`<article class="theme-stage14-symbol"><strong>${escapeHtml(symbol.name)}</strong><span>${linkifyText(symbol.meaning)}</span></article>`).join("")}</div></section>`:""}${evolution?`<section class="parchment-panel theme-stage14-block"><h2>Evolução ao longo do livro</h2><div class="theme-stage14-evolution">${evolution}</div></section>`:""}${item.interpretationNote?`<aside class="theme-stage14-note"><strong>Limite de interpretação:</strong> ${escapeHtml(item.interpretationNote)}</aside>`:""}</div><aside class="theme-stage14-context"><article class="dark-panel theme-stage14-context-card"><h2>Personagens</h2><div class="mini-list">${chars.length?chars.map(c=>miniEntity(c.name,c.alias||c.importance,"person",`character/${c.slug}`,"",c.image)).join(""):`<p class="empty-inline">Nenhuma personagem ligada.</p>`}</div></article><article class="dark-panel theme-stage14-context-card"><h2>Lugares</h2><div class="mini-list">${places.length?places.map(p=>miniEntity(p.name,p.type||p.region||"Lugar","pin",`place/${p.slug}`)).join(""):`<p class="empty-inline">Nenhum lugar ligado.</p>`}</div></article><article class="dark-panel theme-stage14-context-card"><h2>Capítulos</h2><div class="mini-list">${chapters.length?chapters.map(ch=>miniEntity(`Capítulo ${ch.number}`,ch.title,"chapter",`chapter/${ch.id}`)).join(""):`<p class="empty-inline">Nenhum capítulo ligado.</p>`}</div></article><article class="dark-panel theme-stage14-context-card"><h2>Acontecimentos</h2><div class="mini-list">${events.length?events.map(event=>miniEntity(event.name,event.dateLabel||event.period||"Acontecimento","timeline",`timeline/${event.slug}`)).join(""):`<p class="empty-inline">Nenhum acontecimento ligado.</p>`}</div></article></aside></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Temas",route:"themes"},{label:item.name}]);
  }

  function renderGallery() {
    const items=D.common?.entities?.gallery||[];
    const labels={cover:"Capas",chapter:"Capítulos",character:"Personagens",place:"Lugares",map:"Mapas",event:"Acontecimentos",fauna:"Fauna",flora:"Flora",foods:"Alimentos",concepts:"Conceitos",clan:"Clãs e emblemas"};
    const categories=[...new Set(items.map(item=>item.category).filter(Boolean))];
    refs.main.innerHTML=`<div class="page-enter">${pageHeader("Visual","Galeria","Imagens organizadas por categoria. Clique para ampliar sem abrir páginas de detalhes.")}<section class="di-gallery-page"><div class="di-gallery-toolbar"><label class="di-gallery-search-wrap"><span>Pesquisar</span><input type="search" data-gallery-search placeholder="Pesquisar imagens" autocomplete="off"></label><button class="di-gallery-filter active" data-gallery-filter="all" aria-pressed="true">Todas</button>${categories.map(category=>`<button class="di-gallery-filter" data-gallery-filter="${escapeHtml(category)}" aria-pressed="false">${escapeHtml(labels[category]||category)}</button>`).join("")}<span class="di-gallery-count" data-gallery-visible-count></span></div><div class="di-gallery-grid">${items.map(item=>`<button class="di-gallery-card" type="button" data-gallery-item data-gallery-category="${escapeHtml(item.category)}" data-gallery-src="${escapeHtml(item.image)}" data-gallery-title="${escapeHtml(item.name)}" data-gallery-type="${escapeHtml(item.type)}" data-gallery-caption="${escapeHtml(item.caption||item.name)}" data-gallery-route="${escapeHtml(item.route||'')}"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy"><span class="di-gallery-card-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.type)}</small></span></button>`).join("")}</div><p class="di-gallery-empty" data-gallery-empty hidden>Nenhuma imagem disponível neste filtro.</p></section></div>`;
    window.DI_GALLERY?.mount(refs.main);
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Galeria"}]);
  }



  function renderCanon() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento", "Regras canónicas", "Manual de limites para futuras actualizações por IA.", `<button class="primary-button" data-action="copy-canon">${icon("copy")} Copiar regras</button>`)}<section class="lore-grid">${D.canonRules.map(rule => `<article class="lore-card"><span class="lore-icon">${icon("law")}</span><span class="citation-count">${escapeHtml(rule.category)}</span><h3>${escapeHtml(rule.category)}</h3><p>${escapeHtml(rule.text)}</p></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Regras canónicas"}]);
  }


  function renderNotFound() {
    refs.main.innerHTML = `<div class="empty-state page-enter"><div><span class="empty-state-icon">${icon("question")}</span><h2>Entidade não encontrada</h2><p>A referência pode ter sido removida ou ainda não foi introduzida.</p><button class="primary-button" data-route="dashboard">Voltar ao início</button></div></div>`;
  }

  function activeNavForRoute(base, parts) {
    const map = { book:"books", character:"characters", chapter:"chapters", timeline:"timeline", mystery:"mysteries", theme:"themes", clan:"clans", place:"places", "lore-item": parts[0] === "concepts" ? "lore" : parts[0] };
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
    if (route === "portal") {
      state.route = "portal";
      refs.shell.classList.add("is-hidden");
      refs.portal.classList.remove("is-hidden");
      if (!replace) location.hash = "#/portal";
      renderPortal();
      return;
    }
    if (state.settings.transitions && state.settings.motion && state.settings.preset !== "performance") {
      refs.transitionVeil.classList.remove("active");
      void refs.transitionVeil.offsetWidth;
      refs.transitionVeil.classList.add("active");
    }
    refs.portal.classList.add("is-hidden");
    refs.shell.classList.remove("is-hidden");
    state.route = route;
    if (!replace) location.hash = `#/${route}`;
    const [base, ...parts] = route.split("/");
    const renderers = {
      dashboard: renderDashboard, books: renderBooks, characters: renderCharacters, relationships: renderRelationships,
      families: renderFamilies, organisations: renderOrganisations, chapters: renderChapters,
      timeline: renderTimeline, themes: renderThemes, mysteries: renderMysteries, clans: renderClans,
      places: renderPlaces, map: renderMap, fauna: () => renderLore("fauna"),
      flora: () => renderLore("flora"), foods: () => renderLore("foods"), lore: () => renderLore("concepts"),
      gallery: renderGallery, canon: renderCanon
    };
    if (base === "book") renderBook(parts[0]);
    else if (base === "character") renderCharacter(parts[0]);
    else if (base === "chapter") renderChapter(parts[0]);
    else if (base === "timeline" && parts[0]) renderTimelineEntry(parts[0]);
    else if (base === "mystery") renderMystery(parts[0]);
    else if (base === "theme") renderTheme(parts[0]);
    else if (base === "clan") renderClan(parts[0]);
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
    const lore = ["fauna","flora","foods","concepts"].flatMap(kind => D.lore[kind].map(item => ({ type:loreKindInfo(kind)[0], name:item.name, subtitle:item.type, description:[item.summary,...item.details].join(" "), route:`lore-item/${kind}/${item.slug}`, icon:item.icon })));
    return [
      ...D.characters.map(item => ({type:"Personagens",name:item.name,subtitle:item.alias,description:[item.summary,...item.personality].join(" "),route:`character/${item.slug}`,icon:"person",image:item.image})),
      ...D.clans.map(item => ({type:"Clãs",name:item.name,subtitle:item.essence,description:item.summary,route:`clan/${item.slug}`,icon:item.icon,image:item.emblem})),
      ...D.places.map(item => ({type:"Lugares",name:item.name,subtitle:item.type,description:`${item.summary||""} ${item.region||""} ${(item.description||[]).join(" ")}`,route:`place/${item.slug}`,icon:"pin"})),
      ...D.chapters.map(item => ({type:"Capítulos",name:`Capítulo ${item.number} — ${item.title}`,subtitle:item.status,description:[item.summary,...item.details].join(" "),route:`chapter/${item.id}`,icon:"chapter"})),
      ...timelineEntries().map(item => ({type:"Linha do Tempo",name:item.name,subtitle:item.category,description:[item.summary || item.cause,...(item.consequences || [])].join(" "),route:`timeline/${item.slug}`,icon:"timeline"})),
      ...D.mysteries.map(item => ({type:"Mistérios",name:item.name,subtitle:item.status,description:[item.question,item.answer,...item.clues].join(" "),route:`mystery/${item.slug}`,icon:"question"})),
      ...(D.common?.entities?.themes||[]).map(item => ({type:"Temas",name:item.name,subtitle:item.category||"Tema",description:[item.summary,item.question,...(item.development||[])].join(" "),route:`theme/${item.slug}`,icon:"law"})),
      ...lore
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
    if (q) results = results.filter(item => slugText(`${item.name} ${item.subtitle} ${state.searchMode === "deep" ? item.description : ""}`).includes(q));
    results = results.slice(0, 80);
    if (!results.length) { refs.searchResults.innerHTML = `<div class="empty-search">Nenhum resultado encontrado.</div>`; return; }
    const grouped = Object.groupBy ? Object.groupBy(results, item => item.type) : results.reduce((acc,item) => ((acc[item.type] ||= []).push(item),acc),{});
    refs.searchResults.innerHTML = Object.entries(grouped).map(([type, items]) => `<section class="search-result-group"><h3>${escapeHtml(type)}</h3>${items.map(item => `<button class="search-result-item" data-route="${item.route}"><span class="search-result-icon ${item.image ? "has-image" : ""}">${item.image ? `<img src="${item.image}" alt="">` : icon(item.icon)}</span><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.subtitle || "")}</small></span></button>`).join("")}</section>`).join("");
  }

  function openSettings() { renderSettings(); refs.settingsDrawer.classList.add("open"); refs.settingsDrawer.setAttribute("aria-hidden", "false"); }
  function closeSettings() { refs.settingsDrawer.classList.remove("open"); refs.settingsDrawer.setAttribute("aria-hidden", "true"); }
  function settingToggle(key, title, description, enabled) { return `<div class="setting-row"><span class="setting-copy"><strong>${title}</strong><small>${description}</small></span><button class="switch ${enabled ? "on" : ""}" data-setting="${key}" aria-pressed="${enabled}"></button></div>`; }
  function renderSettings() {
    const s = state.settings;
    refs.settingsContent.innerHTML = `<div class="settings-group"><h3>Perfis rápidos</h3><div class="preset-row">${[["full","Completo"],["normal","Equilibrado"],["performance","Desempenho"],["custom","Personalizado"]].map(item => `<button class="preset-button ${s.preset === item[0] ? "active" : ""} ${item[0] === "custom" ? "preset-custom" : ""}" data-preset="${item[0]}" >${item[1]}</button>`).join("")}</div></div><div class="settings-group"><h3>Controlo individual</h3>${settingToggle("particles","Partículas","Poeira e elementos suspensos.",s.particles)}${settingToggle("transitions","Transições temáticas","Véu de pergaminho entre páginas.",s.transitions)}${settingToggle("textures","Texturas","Grão, papel e marcas sobre superfícies.",s.textures)}${settingToggle("blur","Desfoque de painéis","Efeito de vidro nas barras e janelas.",s.blur)}${settingToggle("shadows","Sombras profundas","Profundidade dos cartões.",s.shadows)}${settingToggle("motion","Movimento e animações","Entradas, deslocamentos e efeitos.",s.motion)}<div class="setting-row range-row"><span class="setting-copy"><strong>Quantidade de partículas</strong><small>Ajuste fino do fundo.</small></span><input type="range" min="4" max="50" value="${s.particleAmount}" data-setting-range="particleAmount"></div></div>`;
  }

  function openSelector(type) {
    const books = type === "books";
    const list = books ? D.books : D.sagas;
    const hrefFor=item=>books?(item.id==="ruinas-dos-ceus"?"ruinas.html#/inicio":item.id==="guerras-de-sangue"?"guerras.html#/dashboard":item.id==="dinastia-polar"?"dinastia-polar.html#/inicio":item.id==="herdeiros-das-cinzas"?"herdeiros-das-cinzas.html#/inicio":""):item.id==="ciclo-de-jesed"?"index.html#/books":"";
    refs.selectorContent.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${books ? "Livro" : "Dimensão"}</p><h2>${books ? "Escolher livro" : "Escolher saga"}</h2></div><button class="icon-button" data-action="close-selector">${icon("close")}</button></div><div class="selector-grid">${list.map(item => {const href=(item.status==="active"||item.id==="dinastia-polar"||item.id==="herdeiros-das-cinzas")?hrefFor(item):"";const fallbackImg=books?bookCoverFallback[item.id]:null;const coverOnerror=fallbackImg?`this.onerror=function(){this.hidden=true;this.nextElementSibling.hidden=false};this.src='${fallbackImg}'`:`this.hidden=true;this.nextElementSibling.hidden=false`;const media=item.cover?`<span class="selector-cover"><img src="${escapeHtml(item.cover)}" alt="Capa de ${escapeHtml(item.name)}" onerror="${coverOnerror}"><span class="selector-cover-fallback" hidden>${icon(item.icon||item.symbol)}</span></span>`:`<span class="selector-cover symbol">${icon(item.icon||item.symbol)}</span>`;const inner=`${media}<strong>${escapeHtml(item.name)}</strong><small>${href?(item.id==="herdeiros-das-cinzas"?"Em preparação":"Disponível"):"Bloqueado nesta etapa"}</small>`;return href?`<a class="selector-card active" href="${href}">${inner}</a>`:`<button class="selector-card locked" disabled>${inner}</button>`;}).join("")}</div>`;
    refs.selectorModal.classList.add("open");
    refs.selectorModal.setAttribute("aria-hidden", "false");
  }

  function closeSelector() { refs.selectorModal.classList.remove("open"); refs.selectorModal.setAttribute("aria-hidden", "true"); }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); showToast("Copiado para a área de transferência"); }
    catch { const area = document.createElement("textarea"); area.value = text; document.body.append(area); area.select(); document.execCommand("copy"); area.remove(); showToast("Copiado para a área de transferência"); }
  }
  function copyCharacter(id) {
    const c = getCharacter(id); if (!c) return;
    copyText(`PERSONAGEM: ${c.name}\nSAGA: Ciclo de Jesed\nLIVRO: Guerras de Sangue\nESTADO: ${c.status}\nLOCALIZAÇÃO: ${getPlace(c.locationId)?.name || "não registrada"}\nESTADO EMOCIONAL: ${c.lastSeen.emotional}\nOBJECTIVO: ${c.lastSeen.objective}\nÚLTIMA DECISÃO: ${c.lastSeen.decision}\nÚLTIMA APARIÇÃO: ${c.lastSeen.chapter}\nDESCRIÇÃO: ${c.summary}\nREGRA: não inventar campos ausentes e não usar resumos de capítulos futuros.`);
  }
  function copyChapter(id) {
    const ch = getChapter(id); if (!ch) return;
    copyText(`CAPÍTULO ${ch.number} — ${ch.title}\n\nRESUMO RÁPIDO\n${ch.summary}\n\nACONTECIMENTOS\n${ch.details.join("\n\n")}`);
  }
  function showToast(message) {
    let toast = $("#diToast");
    if (!toast) { toast = document.createElement("div"); toast.id = "diToast"; toast.className = "di-toast"; document.body.append(toast); }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function openLightbox(src, caption) {
    let box = document.getElementById("imageLightbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "imageLightbox";
      box.className = "image-lightbox";
      box.innerHTML = `<div class="image-lightbox-backdrop" data-lightbox-close></div><figure><img alt=""><figcaption></figcaption><button type="button" class="image-lightbox-close" data-lightbox-close aria-label="Fechar">${icon("close")}</button></figure>`;
      document.body.appendChild(box);
    }
    box.querySelector("img").src = src;
    box.querySelector("figcaption").textContent = caption || "";
    box.classList.add("open");
  }
  function closeLightbox() { document.getElementById("imageLightbox")?.classList.remove("open"); }

  document.addEventListener("click", event => {
    const lightboxTrigger = event.target.closest("[data-lightbox-image]");
    if (lightboxTrigger) { openLightbox(lightboxTrigger.dataset.lightboxImage, lightboxTrigger.dataset.lightboxCaption); return; }
    if (event.target.closest("[data-lightbox-close]")) { closeLightbox(); return; }
    const enter = event.target.closest("[data-enter-saga]");
    if (enter) { routeTo("dashboard"); return; }
    const externalLink = event.target.closest("[data-external-href]");
    if (externalLink) { window.location.href = externalLink.dataset.externalHref; return; }
    const routeElement = event.target.closest("[data-route]");
    if (routeElement && routeElement.dataset.route) { closeSearch(); closeSelector(); routeTo(routeElement.dataset.route); return; }

    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "open-settings") openSettings();
    if (action === "close-settings") closeSettings();
    if (action === "close-search") closeSearch();
    if (action === "close-selector") closeSelector();
    if (action === "copy-canon") copyText(D.canonRules.map(x => `${x.category}: ${x.text}`).join("\n"));

    const charCopy = event.target.closest("[data-copy-character]"); if (charCopy) copyCharacter(charCopy.dataset.copyCharacter);
    const chapterCopy = event.target.closest("[data-copy-chapter]"); if (chapterCopy) copyChapter(chapterCopy.dataset.copyChapter);
    const view = event.target.closest("[data-character-view]"); if (view) { state.viewMode = window.DI_CHARACTER_BROWSER?.writeView("guerras-de-sangue", view.dataset.characterView) || view.dataset.characterView; renderCharacters(); }
    const charFilter = event.target.closest("[data-char-filter]"); if (charFilter) { state.characterFilter = charFilter.dataset.charFilter; renderCharacters(); }
    const tab = event.target.closest("[data-character-tab]"); if (tab) { state.characterTab = tab.dataset.characterTab; renderCharacter(tab.dataset.characterSlug); }
    const relFilter = event.target.closest("[data-rel-filter]"); if (relFilter) { state.relationshipFilter = relFilter.dataset.relFilter; renderRelationships(); }
    const loreFilter = event.target.closest("[data-lore-filter]"); if (loreFilter) { state.loreFilter = loreFilter.dataset.loreFilter; renderLore(loreFilter.dataset.loreKind); }
    const loreSort = event.target.closest("[data-lore-sort]"); if (loreSort) { state.loreSort = loreSort.dataset.loreSort; renderLore(loreSort.dataset.loreKind); }
    const loreView = event.target.closest("[data-lore-view]"); if (loreView) { state.loreView = loreView.dataset.loreView; storage.set("di-lore-view", state.loreView); renderLore(state.loreKind); }
    const loreExport = event.target.closest("[data-lore-export]"); if (loreExport) { const kind=loreExport.dataset.loreExport; const names=(D.lore[kind]||[]).filter(item=>(item.citations||0)===0).map(item=>item.name); const blob=new Blob([names.join("\n")],{type:"text/plain"}); const link=document.createElement("a"); link.href=URL.createObjectURL(blob); link.download=`guerras-${kind}-nao-citados.txt`; link.click(); URL.revokeObjectURL(link.href); }
    const searchMode = event.target.closest("[data-search-mode]"); if (searchMode) { state.searchMode = searchMode.dataset.searchMode; $$("[data-search-mode]").forEach(x => x.classList.toggle("active", x === searchMode)); renderSearchResults(refs.searchInput.value); }
    const setting = event.target.closest("[data-setting]"); if (setting) { const key = setting.dataset.setting; state.settings[key] = !state.settings[key]; storage.set("di-guerras-customized","1"); persistSettings(); }
    const preset = event.target.closest("[data-preset]"); if (preset) { state.settings.preset = preset.dataset.preset; if(state.settings.preset === "custom"){storage.set("di-guerras-customized","1");persistSettings();} else {storage.set("di-guerras-customized","0"); if (state.settings.preset === "full") Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:34}); if (state.settings.preset === "normal") Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:22}); if (state.settings.preset === "performance") Object.assign(state.settings,{particles:false,transitions:false,textures:false,blur:false,shadows:false,motion:false}); persistSettings();} }
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
    storage.set("di-guerras-customized","0");
    if (state.settings.preset === "performance") Object.assign(state.settings,{particles:false,transitions:false,textures:false,blur:false,shadows:false,motion:false});
    else Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true});
    persistSettings();
  });
  $("#sagaSelector").addEventListener("click", () => openSelector("sagas"));
  $("#bookLens").addEventListener("click", () => openSelector("books"));
  refs.settingsContent.addEventListener("input", event => { if (event.target.matches("[data-setting-range]")) { state.settings[event.target.dataset.settingRange] = Number(event.target.value); storage.set("di-guerras-customized","1"); persistSettings(); } });
  document.addEventListener("keydown", event => { const card=event.target.closest?.("[role='link'][data-route], [data-timeline-card], .place-scene-card[data-route]"); if(card && (event.key==="Enter" || event.key===" ") && !event.target.closest("button,a")){event.preventDefault();routeTo(card.dataset.route);} const lightboxCard=event.target.closest?.("[data-lightbox-image]"); if(lightboxCard && (event.key==="Enter" || event.key===" ")){event.preventDefault();openLightbox(lightboxCard.dataset.lightboxImage,lightboxCard.dataset.lightboxCaption);} if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); } if (event.key === "Escape") { closeSearch(); closeSettings(); closeSelector(); closeLightbox(); refs.sidebar.classList.remove("mobile-open"); } });
  window.addEventListener("hashchange", () => routeTo(location.hash.replace(/^#\//, "") || "dashboard", { replace: true }));

  function initIcons() { $$('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); }); }
  function init() {
    initIcons();
    renderNav();
    refs.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
    applySettings();
    const route = location.hash.replace(/^#\//, "") || "dashboard";
    routeTo(route, { replace: true });
  }
  init();
})();
