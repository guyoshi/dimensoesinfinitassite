/* Layout padrão da página inicial: cartões de contagem + painel de personagens e lista de capítulos. */
(function(){
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.DI_HOME={
    esc,
    /* items: [{route,label,text,icon}] */
    counts(items,attr,iconFn){
      return `<section class="quick-grid home-guide-grid home-count-grid">${items.map(i=>`<button class="quick-card home-guide-card" ${attr}="${esc(i.route)}">${iconFn?`<span class="quick-icon">${iconFn(i.icon)}</span>`:''}<strong>${esc(i.label)}</strong><small>${esc(i.text)}</small></button>`).join('')}</section>`;
    },
    /* chapters: [{route,number,title}] */
    chapters(chapters,attr,listRoute,limit){
      if(!chapters||!chapters.length)return '';
      const first=chapters.slice(0,limit||5);
      return `<section class="dark-panel section-card home-chapters-panel"><div class="section-heading"><div><h2>Capítulos</h2></div><button class="text-button" ${attr}="${esc(listRoute)}">Ver todos</button></div><ol class="home-chapter-list">${first.map(c=>`<li><button type="button" ${attr}="${esc(c.route)}"><b>${esc(c.number)}</b><span>${esc(c.title)}</span></button></li>`).join('')}</ol><button class="text-button home-chapter-all" ${attr}="${esc(listRoute)}">Todos os ${chapters.length} capítulos →</button></section>`;
    },
    split(focusHtml,chaptersHtml){
      if(!focusHtml&&!chaptersHtml)return '';
      return `<div class="home-split${focusHtml&&chaptersHtml?'':' single'}">${focusHtml||''}${chaptersHtml||''}</div>`;
    }
  };
})();
