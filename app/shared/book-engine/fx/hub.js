/* Central de efeitos: o motor chama window.DIFX; cada módulo (sky, clouds…) se registra aqui.
 * Módulos são independentes: um livro carrega apenas os que usa. Configuração em DI_BOOK.book.fx. */
(() => {
  'use strict';
  if (window.DIFX && window.DIFX.__hub) return;
  const mods = [];
  const each = (name, ...a) => mods.forEach(m => { try { m[name] && m[name](...a); } catch (e) { console.error('[DIFX]', m.name, e); } });
  window.DIFX = {
    __hub: true,
    use(m) { mods.push(m); },
    init(B, o) { this.book = B; this.opts = o; each('init', B, o); },
    configure(c) { this.cfg = c; each('configure', c); },
    transition() { each('transition'); },
    afterRender() { each('afterRender'); },
    contemplate(on) { each('contemplate', on); },
    suspend() { each('suspend'); },
    resume() { each('resume'); },
    settingsHtml() { return mods.map(m => (m.settingsHtml && m.settingsHtml()) || '').join(''); },
    bindSettings(root) { each('bindSettings', root); }
  };
})();
