(() => {
  'use strict';

  const body = document.body;
  if (!body) return;

  const inferredBook = location.pathname.includes('guerras') ? 'guerras-de-sangue' : location.pathname.includes('ruinas') ? 'ruinas-dos-ceus' : '';
  if (inferredBook && !body.dataset.book) body.dataset.book = inferredBook;

  function ensurePerformanceIndicator() {
    const button = document.querySelector('#perfToggle, #performanceToggle');
    if (!button) return;

    let wrap = button.closest('.performance-toggle-wrap');
    if (!wrap) {
      wrap = document.createElement('span');
      wrap.className = 'performance-toggle-wrap';
      button.parentNode.insertBefore(wrap, button);
      wrap.appendChild(button);
    }

    let dot = wrap.querySelector('.performance-state-dot');
    if (!dot) {
      dot = document.createElement('span');
      dot.className = 'performance-state-dot';
      dot.setAttribute('aria-hidden', 'true');
      wrap.appendChild(dot);
    }

    let text = wrap.querySelector('.performance-state-text');
    if (!text) {
      text = document.createElement('span');
      text.className = 'performance-state-text';
      text.setAttribute('aria-hidden', 'true');
      wrap.appendChild(text);
    }

    const sync = () => {
      const active = body.classList.contains('performance-mode') || button.getAttribute('aria-pressed') === 'true';
      const stateText = active ? 'Desempenho' : 'Normal';
      const pressed = active ? 'true' : 'false';
      const label = active ? 'Modo de desempenho ligado' : 'Modo de desempenho desligado';
      const state = active ? 'performance' : 'normal';
      if (text.textContent !== stateText) text.textContent = stateText;
      if (button.getAttribute('aria-pressed') !== pressed) button.setAttribute('aria-pressed', pressed);
      if (button.getAttribute('aria-label') !== label) button.setAttribute('aria-label', label);
      if (button.getAttribute('title') !== label) button.setAttribute('title', label);
      if (wrap.dataset.state !== state) wrap.dataset.state = state;
    };

    sync();
    new MutationObserver(sync).observe(body, { attributes: true, attributeFilter: ['class'] });
    new MutationObserver(sync).observe(button, { attributes: true, attributeFilter: ['aria-pressed', 'title'] });
    button.addEventListener('click', () => requestAnimationFrame(sync));
  }

  function fallbackFor(img) {
    if (!(img instanceof HTMLImageElement) || img.dataset.diFallbackHandled === '1') return;
    img.dataset.diFallbackHandled = '1';
    img.classList.add('di-image-error');
    img.setAttribute('aria-hidden', 'true');

    const isLogo = img.matches('.hero-logo, .portal-logo, .saga-logo, .detail-logo, [class*=\"logo\"]');
    if (isLogo) {
      const fallback = document.createElement(img.closest('.hero-map-content') ? 'h1' : 'strong');
      fallback.className = 'di-logo-fallback';
      fallback.textContent = img.alt || 'Dimensões Infinitas';
      img.insertAdjacentElement('afterend', fallback);
      return;
    }

    const existing = img.parentElement?.querySelector(':scope > .media-fallback, :scope > .home-place-fallback, :scope > .character-browser-card-fallback, :scope > .place-character-fallback');
    if (existing) {
      existing.hidden = false;
      return;
    }

    const fallback = document.createElement('span');
    fallback.className = 'media-fallback di-auto-fallback';
    fallback.textContent = img.alt ? `Imagem indisponível — ${img.alt}` : 'Imagem indisponível';
    img.insertAdjacentElement('afterend', fallback);
  }

  function watchImages(root = document) {
    root.querySelectorAll?.('img').forEach(img => {
      img.addEventListener('error', () => fallbackFor(img), { once: true });
      if (img.complete && img.naturalWidth === 0) fallbackFor(img);
    });
  }

  function makeClickableCardsKeyboardSafe(root = document) {
    root.querySelectorAll?.('[data-route]:not(button):not(a), [role="link"][tabindex="0"]').forEach(card => {
      if (card.dataset.diKeyboardReady === '1') return;
      card.dataset.diKeyboardReady = '1';
      card.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        card.click();
      });
    });
  }

  function enhance(root = document) {
    watchImages(root);
    makeClickableCardsKeyboardSafe(root);
  }

  // Um único comportamento de gaveta móvel para as páginas do Ciclo de Jesed.
  // Os motores antigos usam body.menu; os mais novos usam .sidebar.mobile-open.
  function enhanceMobileNavigation() {
    const side = document.querySelector('#side.sidebar, #sidebar.sidebar');
    const trigger = document.querySelector('#menu, #mobileMenu');
    if (!side || !trigger || !body.dataset.book) return;

    const backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'di-mobile-nav-backdrop';
    backdrop.setAttribute('aria-label', 'Fechar menu de navegação');
    backdrop.hidden = true;
    body.appendChild(backdrop);
    if (!side.id) side.id = 'di-book-sidebar';
    trigger.setAttribute('aria-controls', side.id);

    const isMobile = () => window.matchMedia('(max-width: 860px)').matches;
    const isOpen = () => isMobile() && (
      body.classList.contains('menu') ||
      body.classList.contains('menu-open') ||
      side.classList.contains('mobile-open')
    );
    let wasOpen = false;
    const sync = () => {
      const open = isOpen();
      if (open !== wasOpen) {
        wasOpen = open;
        backdrop.hidden = !open;
        body.classList.toggle('di-mobile-nav-open', open);
      }
      trigger.setAttribute('aria-expanded', String(open));
      trigger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    const close = () => {
      body.classList.remove('menu', 'menu-open');
      side.classList.remove('mobile-open');
      sync();
    };

    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && isOpen()) {
        close();
        trigger.focus({ preventScroll: true });
      }
    });
    window.addEventListener('hashchange', close);
    window.addEventListener('resize', () => {
      if (!isMobile()) close();
      else sync();
    }, { passive: true });
    // Fecha inclusive quando o leitor escolhe a secção já ativa (sem hashchange).
    side.addEventListener('click', event => {
      if (event.target.closest('[data-go], [data-route], a[href]')) close();
    });

    new MutationObserver(sync).observe(body, { attributes: true, attributeFilter: ['class'] });
    new MutationObserver(sync).observe(side, { attributes: true, attributeFilter: ['class'] });
    sync();
  }

  enhanceMobileNavigation();

  ensurePerformanceIndicator();
  enhance();

  const observer = new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (!(node instanceof Element)) return;
      if (node.matches('img')) {
        node.addEventListener('error', () => fallbackFor(node), { once: true });
        if (node.complete && node.naturalWidth === 0) fallbackFor(node);
      }
      enhance(node);
    }));
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
