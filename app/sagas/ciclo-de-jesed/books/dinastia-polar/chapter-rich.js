(() => {
  'use strict';

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const icon = name => {
    const paths = {
      person:'<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
      pin:'<path d="M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13z"/><circle cx="12" cy="9" r="2"/>',
      timeline:'<path d="M4 6h12M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.timeline}</svg>`;
  };

  const getData = () => window.DI_DATA || {};
  const getChapter = (D, id) => (D.chapters || []).find(item => item.id === id || String(item.number) === String(id));
  const getCharacter = (D, id) => (D.characters || []).find(item => item.id === id || item.slug === id);
  const getPlace = (D, id) => (D.places || []).find(item => item.id === id || item.slug === id);

  const miniEntity = (title, subtitle, route, stateText = '', image = '', iconName = 'pin') => `<button class="mini-list-item" data-route="${escapeHtml(route)}">
    <span class="mini-icon ${image ? 'has-image' : ''}">${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : icon(iconName)}</span>
    <span class="mini-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(subtitle || 'Informação não registrada')}</small></span>
    ${stateText ? `<span class="mini-state">${escapeHtml(stateText)}</span>` : ''}
  </button>`;

  function chapterEvents(D, chapter) {
    const timeline = (D.timeline && D.timeline.length) ? D.timeline : (D.common?.entities?.timeline || []);
    return timeline.filter(event =>
      event.period === `Capítulo ${chapter.number}` ||
      event.chapterId === chapter.id ||
      (event.chapterIds || []).includes(chapter.id)
    );
  }

  function enrichChapterPage() {
    const match = location.hash.match(/^#\/chapter\/([^/?#]+)/);
    if (!match) return;

    const D = getData();
    const chapter = getChapter(D, decodeURIComponent(match[1]));
    const root = document.querySelector('.chapter-detail-page');
    if (!chapter || !root) return;
    if (root.dataset.richChapter === chapter.id) return;

    const previous = getChapter(D, Number(chapter.number) - 1);
    const next = getChapter(D, Number(chapter.number) + 1);
    const characterIds = chapter.characterIds || chapter.characters || [];
    const placeIds = chapter.placeIds || chapter.places || [];
    const characters = characterIds.map(id => getCharacter(D, id)).filter(Boolean);
    const places = placeIds.map(id => getPlace(D, id)).filter(Boolean);
    const events = chapterEvents(D, chapter);
    const header = root.querySelector('.page-header')?.outerHTML || '';
    const heroImage = chapter.image || characters.find(c => c.image)?.image || '';
    const details = chapter.details || [];

    const navigation = `<nav class="chapter-pagination chapter-pagination-top" aria-label="Navegação entre capítulos">
      ${previous ? `<button class="secondary-button" data-route="chapter/${escapeHtml(previous.id)}">← Capítulo ${previous.number}<small>${escapeHtml(previous.title)}</small></button>` : `<button class="secondary-button" disabled>Primeiro capítulo</button>`}
      ${next ? `<button class="primary-button" data-route="chapter/${escapeHtml(next.id)}">Capítulo ${next.number} →<small>${escapeHtml(next.title)}</small></button>` : `<button class="secondary-button" disabled>Último capítulo</button>`}
    </nav>`;

    const tags = [
      chapter.wordCount ? `${Number(chapter.wordCount).toLocaleString('pt-BR')} palavras no manuscrito` : '',
      chapter.pov ? `POV: ${chapter.pov}` : '',
      chapter.status || '',
      `${characters.length} ${characters.length === 1 ? 'personagem ligado' : 'personagens ligados'}`
    ].filter(Boolean).map(item => `<span class="tag">${escapeHtml(item)}</span>`).join('');

    const characterMarkup = characters.length
      ? characters.map(c => `<button class="context-chip" data-route="character/${escapeHtml(c.slug)}">${c.image ? `<img src="${escapeHtml(c.image)}" alt="">` : icon('person')}<span>${escapeHtml(c.name)}</span></button>`).join('')
      : `<p class="empty-inline">Nenhum personagem ligado.</p>`;

    const placeMarkup = places.length
      ? places.map(p => miniEntity(p.name, p.type || 'Lugar', `place/${p.slug}`, p.region || p.dynasty || 'Lugar relacionado', p.image, 'pin')).join('')
      : `<p class="empty-inline">Nenhum lugar ligado.</p>`;

    const eventMarkup = events.length
      ? `<article class="dark-panel section-card"><h3>Linha do Tempo</h3><div class="mini-list">${events.map(e => miniEntity(e.name, e.category || 'Acontecimento', `timeline/${e.slug}`, e.period || '', '', 'timeline')).join('')}</div></article>`
      : '';

    root.dataset.richChapter = chapter.id;
    root.innerHTML = `${header}
      ${navigation}
      <section class="chapter-hero-panel ${heroImage ? 'has-art' : ''}">
        ${heroImage ? `<img src="${escapeHtml(heroImage)}" alt="Ilustração associada ao capítulo">` : ''}
        <div><p class="eyebrow">Resumo rápido</p><h2>${escapeHtml(chapter.summary || '')}</h2><div class="tag-row">${tags}</div></div>
      </section>
      <section class="chapter-layout">
        <article class="parchment-panel chapter-longform">
          <div class="section-heading"><div><p class="eyebrow">Acontecimentos do capítulo</p><h2>Tudo o que acontece</h2><p>Resumo detalhado dos acontecimentos já escritos no manuscrito.</p></div></div>
          <div class="chapter-prose">${details.length ? details.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('') : `<p class="empty-inline">O resumo detalhado deste capítulo ainda não foi preparado.</p>`}</div>
        </article>
        <aside class="chapter-context-column">
          <article class="dark-panel section-card"><h3>Personagens</h3><div class="context-chip-list">${characterMarkup}</div></article>
          <article class="dark-panel section-card"><h3>Lugares</h3><div class="mini-list">${placeMarkup}</div></article>
          ${eventMarkup}
        </aside>
      </section>`;
  }

  function enrichChapterList() {
    if (!/^#\/chapters(?:$|[/?#])/.test(location.hash)) return;
    const D = getData();
    const cards = [...document.querySelectorAll('.chapter-card')];
    cards.forEach((card, index) => {
      if (card.dataset.richList === '1') return;
      const chapter = D.chapters?.[index];
      if (!chapter) return;
      const count = (chapter.characterIds || chapter.characters || []).length;
      const copy = card.querySelector('.chapter-card-copy');
      if (!copy) return;
      copy.insertAdjacentHTML('beforeend', `<div class="tag-row"><span class="tag">${count} ${count === 1 ? 'personagem' : 'personagens'}</span>${chapter.pov ? `<span class="tag">POV: ${escapeHtml(chapter.pov)}</span>` : ''}</div>`);
      card.dataset.richList = '1';
    });
  }

  function enrich() {
    enrichChapterPage();
    enrichChapterList();
  }

  window.addEventListener('hashchange', () => setTimeout(enrich, 0));
  setTimeout(enrich, 0);
})();
