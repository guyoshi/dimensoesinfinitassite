/* Seletor de séries: o botão com o nome da saga (topo) abre esta janela para trocar de série. */
(() => {
  'use strict';
  const ENTRY = {
    'ciclo-de-jesed': 'ruinas.html#/inicio',
    'spacetheft': 'a-lenda-da-aurora.html#/inicio',
    'viajantes-dimensionais': 'a-patrulha-de-korvo.html#/inicio',
    'diario-sobrenatural': 'os-elos-das-sombras.html#/inicio'
  };
  const FALLBACK = [
    { id: 'ciclo-de-jesed', name: 'Ciclo de Jesed', status: 'active' },
    { id: 'diario-sobrenatural', name: 'Diário Sobrenatural', status: 'active' },
    { id: 'spacetheft', name: 'Spacetheft', status: 'active' },
    { id: 'viajantes-dimensionais', name: 'Viajantes Dimensionais', status: 'active' },
    { id: 'edelin-lys', name: 'Édelin Lys', status: 'locked' },
    { id: 'misterio-oculto', name: 'Mistério Oculto', status: 'locked' },
    { id: 'a-uniao', name: 'A União', status: 'locked' }
  ];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const currentSaga = () => document.body.dataset.saga || (document.body.dataset.theme === 'jesed' ? 'ciclo-de-jesed' : '');

  function ensureModal() {
    let box = document.getElementById('diSagaSwitcher');
    if (box) return box;
    box = document.createElement('div');
    box.id = 'diSagaSwitcher';
    box.className = 'dss';
    box.setAttribute('aria-hidden', 'true');
    box.innerHTML = '<div class="dss-bd" data-dss-close></div><section class="dss-panel" role="dialog" aria-modal="true" aria-labelledby="dssTitle"></section>';
    document.body.append(box);
    box.addEventListener('click', e => { if (e.target.closest('[data-dss-close]')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    return box;
  }
  function sagas() {
    const list = (window.PORTAL_DATA && window.PORTAL_DATA.sagas) || FALLBACK;
    return list.map(s => ({ id: s.id, name: s.name, status: ENTRY[s.id] ? 'active' : 'locked' }));
  }
  function open() {
    const box = ensureModal();
    const here = currentSaga();
    box.querySelector('.dss-panel').innerHTML =
      '<div class="dss-head"><div><p>Dimensões Infinitas</p><h2 id="dssTitle">Escolher série</h2></div><button type="button" class="dss-x" data-dss-close aria-label="Fechar">✕</button></div>' +
      '<div class="dss-list">' + sagas().map(s => {
        const inner = `<b>${esc(s.name.charAt(0))}</b><span><strong>${esc(s.name)}</strong><small>${s.id === here ? 'Você está aqui' : s.status === 'active' ? 'Abrir série' : 'Em breve'}</small></span>`;
        if (s.id === here) return `<div class="dss-item here" aria-current="true">${inner}</div>`;
        return s.status === 'active' ? `<a class="dss-item" href="${esc(ENTRY[s.id])}">${inner}</a>` : `<div class="dss-item lock">${inner}</div>`;
      }).join('') + '</div>' +
      '<a class="dss-all" href="index.html">Ver todas na página inicial</a>';
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
  }
  function close() {
    const box = document.getElementById('diSagaSwitcher');
    if (!box) return;
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
  }
  function load(cb) {
    if (window.PORTAL_DATA) return cb();
    const s = document.createElement('script');
    s.src = 'app/portal/data.js';
    s.onload = s.onerror = cb;
    document.head.append(s);
  }
  document.addEventListener('click', e => {
    const trigger = e.target.closest('#sagaSelector, [data-saga-switch]');
    if (!trigger) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    load(open);
  }, true);
  window.DI_SAGA_SWITCHER = { open: () => load(open), close };
})();
