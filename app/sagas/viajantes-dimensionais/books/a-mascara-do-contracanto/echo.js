/* Ecos do Contracanto: um clique no fundo da página solta duas ondas (ouro e violeta). Desligado no modo Desempenho e com movimento reduzido. */
(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const KEY = 'di-a-mascara-do-contracanto-preset';
  let last = 0;
  addEventListener('pointerdown', e => {
    let preset = 'full'; try { preset = localStorage.getItem(KEY) || 'full'; } catch {}
    if (preset === 'performance' || document.hidden) return;
    if (e.target.closest('a,button,input,select,textarea,label,[data-lightbox],.modal-panel')) return;
    const now = performance.now(); if (now - last < 250) return; last = now;
    [false, true].forEach(v => {
      const d = document.createElement('i'); d.className = 'vd2-echo' + (v ? ' v' : '');
      d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px';
      d.addEventListener('animationend', () => d.remove(), { once: true });
      document.body.appendChild(d);
    });
  }, { passive: true });
})();
