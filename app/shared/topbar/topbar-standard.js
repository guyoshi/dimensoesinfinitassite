/* Barra superior padronizada: um único conjunto de ícones (traço 1.7, 24x24) para todos os livros e sagas. */
(function () {
  'use strict';
  const S = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    book: '<path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4.5A1.5 1.5 0 0 1 3 16.5z"/><path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H14a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/><path d="M6 18h12"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    volume: '<path d="M4 9.5v5h4l5 4v-13l-5 4z"/><path d="M16.5 9a4.2 4.2 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11"/>',
    mute: '<path d="M4 9.5v5h4l5 4v-13l-5 4z"/><path d="M17 9.5l5 5M22 9.5l-5 5"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  const svg = k => `<span class="di-ico" data-di="${k}" aria-hidden="true"><svg viewBox="0 0 24 24">${S[k]}</svg></span>`;
  /* botão -> ícone principal */
  const BTN = {
    '#menuBtn,#mobileMenu,#menu': 'menu',
    '#sagaBtn,#sagaSelector': 'compass',
    '#bookBtn,#bookLens,#bookSwitch': 'book',
    '#searchBtn,#searchButton,#searchTrigger': 'search',
    '#perfBtn,#performanceToggle,#perfToggle': 'gauge',
    '#contBtn': 'eye',
    '#setBtn,#settingsButton': 'gear',
    '.time-mobile-toggle': 'clock'
  };
  const GLYPH = { '▶': 'play', '⏵': 'play', '⏸': 'pause', 'Ⅱ': 'pause', '🔊': 'volume', '🔉': 'volume', '🔇': 'mute', '◷': 'clock', '⌄': 'chevron' };

  function setIcon(btn, key) {
    const cur = btn.querySelector(':scope > .di-ico');
    if (cur && cur.dataset.di === key && !btn.querySelector(':scope > svg, :scope > .selector-icon, :scope > [data-icon]')) return;
    btn.querySelectorAll(':scope > svg, :scope > .selector-icon, :scope > [data-icon], :scope > .di-ico').forEach(n => n.remove());
    const hasLabel = btn.querySelector(':scope > span:not(.di-ico), :scope > kbd');
    if (!hasLabel) {
      /* botão só de ícone: apaga qualquer glifo de texto */
      Array.from(btn.childNodes).forEach(n => { if (n.nodeType === 3) n.remove(); });
    }
    btn.insertAdjacentHTML('afterbegin', svg(key));
  }

  function glyphs(root) {
    root.querySelectorAll('.music-power > span, .music-mute > span, .time-pause-button, i, .chevron, .time-mobile-toggle').forEach(el => {
      if (el.classList && el.classList.contains('di-ico')) return;
      const t = (el.textContent || '').trim();
      const k = GLYPH[t];
      if (!k) return;
      if (el.matches('.time-pause-button,.time-mobile-toggle')) { el.innerHTML = svg(k); return; }
      el.innerHTML = svg(k);
      el.classList.add('di-glyph');
    });
  }

  let queued = false;
  function apply() {
    queued = false;
    for (const sel in BTN) document.querySelectorAll(sel).forEach(b => setIcon(b, BTN[sel]));
    glyphs(document);
  }
  function schedule() { if (queued) return; queued = true; requestAnimationFrame(apply); }

  function init() {
    apply();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
