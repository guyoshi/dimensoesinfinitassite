(() => {
  'use strict';
  const instances = new Map();
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function mount(options = {}) {
    const root = typeof options.root === 'string' ? document.querySelector(options.root) : options.root;
    if (!root) return null;
    const key = root.id || options.key || `map-${instances.size + 1}`;
    instances.get(key)?.destroy?.();

    const viewport = root.querySelector('[data-di-map-viewport]');
    const stage = root.querySelector('[data-di-map-stage]');
    const popupHost = root.querySelector('[data-di-map-popup-host]');
    if (!viewport || !stage) return null;

    const state = {
      zoom: Number(options.initialZoom || 1),
      x: 0,
      y: 0,
      minZoom: Number(options.minZoom || .72),
      maxZoom: Number(options.maxZoom || 3.2),
      dragging: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      labels: options.labels !== false,
      selectedId: ''
    };
    const cleanup = [];
    const on = (target, event, handler, config) => {
      target.addEventListener(event, handler, config);
      cleanup.push(() => target.removeEventListener(event, handler, config));
    };

    function limits() {
      const rect = viewport.getBoundingClientRect();
      const extraX = Math.max(0, rect.width * (state.zoom - 1) / 2) + 90;
      const extraY = Math.max(0, rect.height * (state.zoom - 1) / 2) + 90;
      return { x: extraX, y: extraY };
    }
    let _lastAppliedZoom = -1;
    function apply() {
      const lim = limits();
      state.x = clamp(state.x, -lim.x, lim.x);
      state.y = clamp(state.y, -lim.y, lim.y);
      stage.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.zoom})`;
      // Only update CSS vars and classes when zoom actually changes — avoids
      // recalculating all pin transforms on every pointermove during pan
      if (state.zoom !== _lastAppliedZoom) {
        _lastAppliedZoom = state.zoom;
        root.style.setProperty('--di-map-zoom', state.zoom.toFixed(2));
        root.style.setProperty('--di-map-inverse', (1 / state.zoom).toFixed(3));
        root.classList.toggle('map-zoomed', state.zoom > 1.12);
        root.classList.toggle('map-high-zoom', state.zoom > 2.4);
      }
      root.classList.toggle('labels-hidden', !state.labels);
    }
    function closePopup() {
      if (popupHost) popupHost.innerHTML = '';
      root.querySelectorAll('[data-di-map-pin].selected').forEach(pin => pin.classList.remove('selected'));
      state.selectedId = '';
    }
    function itemFor(id) {
      return typeof options.getItem === 'function' ? options.getItem(id) : null;
    }
    function openPin(pin) {
      if (!pin) return;
      const id = pin.dataset.diMapPin;
      const item = itemFor(id);
      if (!item || !popupHost) return;
      root.querySelectorAll('[data-di-map-pin].selected').forEach(el => el.classList.remove('selected'));
      pin.classList.add('selected');
      state.selectedId = id;
      const viewportRect = viewport.getBoundingClientRect();
      const pinRect = pin.getBoundingClientRect();
      const width = Math.min(350, Math.max(260, viewportRect.width - 28));
      const left = clamp(pinRect.left - viewportRect.left + 24, 12, Math.max(12, viewportRect.width - width - 12));
      const top = clamp(pinRect.top - viewportRect.top - 36, 72, Math.max(72, viewportRect.height - 290));
      const content = typeof options.renderPopup === 'function' ? options.renderPopup(item) : '';
      popupHost.innerHTML = `<article class="di-map-popup" style="left:${left}px;top:${top}px;width:${width}px"><button class="di-map-popup-close" type="button" data-di-map-close aria-label="Fechar ficha rápida">×</button>${content}</article>`;
      popupHost.querySelector('[data-di-map-close]')?.focus({preventScroll:true});
    }
    function focus(id, config = {}) {
      const escaped = window.CSS?.escape ? CSS.escape(String(id)) : String(id).replace(/["\\]/g, "\\$&");
      const pin = root.querySelector(`[data-di-map-pin="${escaped}"]`);
      if (!pin) return false;
      const x = Number(pin.dataset.mapX || parseFloat(pin.style.left));
      const y = Number(pin.dataset.mapY || parseFloat(pin.style.top));
      if (Number.isFinite(x) && Number.isFinite(y)) {
        const rect = viewport.getBoundingClientRect();
        const targetZoom = clamp(Number(config.zoom || Math.max(state.zoom, 1.45)), state.minZoom, state.maxZoom);
        state.zoom = targetZoom;
        state.x = (50 - x) / 100 * rect.width * targetZoom;
        state.y = (50 - y) / 100 * rect.height * targetZoom;
        apply();
      }
      pin.focus({preventScroll:true});
      if (config.open !== false) openPin(pin);
      return true;
    }
    function reset() {
      state.zoom = Number(options.initialZoom || 1);
      state.x = 0;
      state.y = 0;
      closePopup();
      apply();
    }
    function zoom(delta) {
      state.zoom = clamp(state.zoom + delta, state.minZoom, state.maxZoom);
      apply();
    }

    on(root, 'click', event => {
      const action = event.target.closest('[data-di-map-action]')?.dataset.diMapAction;
      if (action) {
        if (action === 'zoom-in') zoom(.22);
        if (action === 'zoom-out') zoom(-.22);
        if (action === 'center') reset();
        if (action === 'labels') { state.labels = !state.labels; apply(); }
        if (action === 'fullscreen') {
          const target = root.closest('[data-di-map-fullscreen]') || root;
          if (document.fullscreenElement) document.exitFullscreen?.(); else target.requestFullscreen?.();
        }
        return;
      }
      const pin = event.target.closest('[data-di-map-pin]');
      if (pin) { event.stopPropagation(); openPin(pin); return; }
      if (event.target.closest('[data-di-map-close]')) { closePopup(); return; }
      const focusButton = event.target.closest('[data-di-map-focus]');
      if (focusButton) focus(focusButton.dataset.diMapFocus);
    });

    // Prevent browser native drag (image/element drag ghost) on the whole map
    on(viewport, 'dragstart', event => event.preventDefault());
    on(stage, 'dragstart', event => event.preventDefault());

    on(viewport, 'pointerdown', event => {
      if (event.button !== 0 || event.target.closest('[data-di-map-pin],button,a,.di-map-popup')) return;
      state.dragging = true;
      state.pointerId = event.pointerId;
      state.startX = event.clientX - state.x;
      state.startY = event.clientY - state.y;
      viewport.classList.add('dragging');
      viewport.setPointerCapture?.(event.pointerId);
    });
    on(viewport, 'pointermove', event => {
      if (!state.dragging || (state.pointerId != null && event.pointerId !== state.pointerId)) return;
      state.x = event.clientX - state.startX;
      state.y = event.clientY - state.startY;
      closePopup();
      apply();
    });
    const finishDrag = event => {
      if (!state.dragging) return;
      state.dragging = false;
      viewport.classList.remove('dragging');
      if (event?.pointerId != null) viewport.releasePointerCapture?.(event.pointerId);
      state.pointerId = null;
    };
    on(viewport, 'pointerup', finishDrag);
    on(viewport, 'pointercancel', finishDrag);
    // Throttle wheel via RAF — batches rapid scroll events into one apply() per frame,
    // reducing CSS var recalculation across all pins
    let _wheelRafId = null;
    let _wheelAccum = 0;
    on(viewport, 'wheel', event => {
      event.preventDefault();
      _wheelAccum += event.deltaY < 0 ? .14 : -.14;
      if (!_wheelRafId) {
        _wheelRafId = requestAnimationFrame(() => {
          zoom(_wheelAccum);
          _wheelAccum = 0;
          _wheelRafId = null;
        });
      }
    }, {passive:false});
    on(viewport, 'dblclick', event => {
      if (event.target.closest('[data-di-map-pin],button,a')) return;
      zoom(.28);
    });
    on(root, 'keydown', event => {
      if (event.key === 'Escape') closePopup();
      if (event.target === viewport || event.target.closest('[data-di-map-stage]')) {
        const step = event.shiftKey ? 48 : 24;
        if (event.key === 'ArrowLeft') state.x += step;
        else if (event.key === 'ArrowRight') state.x -= step;
        else if (event.key === 'ArrowUp') state.y += step;
        else if (event.key === 'ArrowDown') state.y -= step;
        else return;
        event.preventDefault(); apply();
      }
    });
    on(window, 'resize', apply);
    apply();

    const api = {
      root, state, apply, reset, focus, closePopup,
      destroy() { cleanup.splice(0).forEach(fn => fn()); closePopup(); instances.delete(key); }
    };
    root._diMap = api;
    instances.set(key, api);
    return api;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-di-global-map-focus]');
    if (!button) return;
    const key = button.dataset.diMapRoot;
    const instance = instances.get(key) || document.getElementById(key)?._diMap;
    instance?.focus(button.dataset.diGlobalMapFocus);
  });

  window.DIMaps = {
    mount,
    get(key) { return instances.get(key); },
    focus(key, id, config) { return instances.get(key)?.focus(id, config) || false; },
    destroy(key) { instances.get(key)?.destroy?.(); }
  };
})();
