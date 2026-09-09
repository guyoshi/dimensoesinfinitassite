(() => {
  'use strict';
  let page=null,cards=[],visible=[],active=0,lastFocus=null,currentFilter='all',query='',touchStartX=null;
  let zoom=1,panX=0,panY=0,isPanning=false,panStartX=0,panStartY=0,panOriginX=0,panOriginY=0,pinchStartDist=0,pinchStartZoom=1;
  const ZOOM_MIN=1,ZOOM_MAX=4,ZOOM_STEP=1.6;
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
  function applyZoomTransform(){
    const box=$('#diGalleryLightbox');if(!box)return;
    const stage=$('.di-gallery-lightbox-stage',box),image=$('[data-gallery-image]',box);
    if(!image)return;
    image.style.transform=`translate(${panX}px,${panY}px) scale(${zoom})`;
    stage.classList.toggle('zoomed',zoom>1);
    const level=$('[data-gallery-zoom-level]',box);if(level)level.textContent=`${Math.round(zoom*100)}%`;
    const zoomOutBtn=$('[data-gallery-zoom-out]',box);if(zoomOutBtn)zoomOutBtn.disabled=zoom<=ZOOM_MIN;
    const zoomInBtn=$('[data-gallery-zoom-in]',box);if(zoomInBtn)zoomInBtn.disabled=zoom>=ZOOM_MAX;
  }
  function resetZoom(){zoom=1;panX=0;panY=0;applyZoomTransform();}
  function setZoom(next,anchorX,anchorY){
    const box=$('#diGalleryLightbox');if(!box)return;
    const stage=$('.di-gallery-lightbox-stage',box);
    const prev=zoom;next=clamp(next,ZOOM_MIN,ZOOM_MAX);
    if(anchorX!=null&&prev!==next){
      const rect=stage.getBoundingClientRect();
      const cx=anchorX-rect.left-rect.width/2,cy=anchorY-rect.top-rect.height/2;
      panX=cx-((cx-panX)*(next/prev));panY=cy-((cy-panY)*(next/prev));
    }
    zoom=next;
    if(zoom<=ZOOM_MIN){panX=0;panY=0;}
    applyZoomTransform();
  }
  function ensureLightbox(){
    let box=$('#diGalleryLightbox');if(box)return box;
    box=document.createElement('div');box.id='diGalleryLightbox';box.className='di-gallery-lightbox';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-hidden','true');box.setAttribute('aria-label','Visualizador de galeria');
    box.innerHTML='<div class="di-gallery-lightbox-top"><div class="di-gallery-lightbox-title"><strong data-gallery-title></strong><small data-gallery-type></small></div><span class="di-gallery-lightbox-count" data-gallery-count></span><button class="di-gallery-close" type="button" data-gallery-close aria-label="Fechar">×</button></div><div class="di-gallery-lightbox-stage"><button class="di-gallery-nav di-gallery-prev" type="button" data-gallery-prev aria-label="Imagem anterior">‹</button><img data-gallery-image alt=""><button class="di-gallery-nav di-gallery-next" type="button" data-gallery-next aria-label="Próxima imagem">›</button><div class="di-gallery-zoom-controls"><button type="button" data-gallery-zoom-out aria-label="Diminuir zoom">−</button><span class="di-gallery-zoom-level" data-gallery-zoom-level>100%</span><button type="button" data-gallery-zoom-in aria-label="Aumentar zoom">+</button></div></div><div class="di-gallery-lightbox-footer"><div class="di-gallery-caption" data-gallery-caption></div><button class="di-gallery-open-record" type="button" data-gallery-open-record hidden>Abrir ficha →</button></div>';
    document.body.appendChild(box);
    box.addEventListener('click',e=>{if(e.target.closest('[data-gallery-zoom-in],[data-gallery-zoom-out]'))return;if(e.target===box||e.target.closest('[data-gallery-close]'))close();else if(e.target.closest('[data-gallery-prev]')){resetZoom();move(-1);}else if(e.target.closest('[data-gallery-next]')){resetZoom();move(1);}else if(e.target.closest('[data-gallery-open-record]'))openRecord();});
    $('[data-gallery-zoom-in]',box).addEventListener('click',()=>setZoom(zoom*ZOOM_STEP));
    $('[data-gallery-zoom-out]',box).addEventListener('click',()=>setZoom(zoom/ZOOM_STEP));
    const stage=$('.di-gallery-lightbox-stage',box),image=$('[data-gallery-image]',box);
    image.addEventListener('dblclick',e=>{e.preventDefault();setZoom(zoom>1?1:2.5,e.clientX,e.clientY);});
    image.addEventListener('wheel',e=>{if(!box.classList.contains('open'))return;e.preventDefault();const delta=e.deltaY<0?ZOOM_STEP:1/ZOOM_STEP;setZoom(zoom*delta,e.clientX,e.clientY);},{passive:false});
    image.addEventListener('mousedown',e=>{if(zoom<=1)return;e.preventDefault();isPanning=true;stage.classList.add('panning');panStartX=e.clientX;panStartY=e.clientY;panOriginX=panX;panOriginY=panY;});
    window.addEventListener('mousemove',e=>{if(!isPanning)return;panX=panOriginX+(e.clientX-panStartX);panY=panOriginY+(e.clientY-panStartY);applyZoomTransform();});
    window.addEventListener('mouseup',()=>{if(!isPanning)return;isPanning=false;stage.classList.remove('panning');});
    stage.addEventListener('touchstart',e=>{
      if(e.touches.length===2){pinchStartDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);pinchStartZoom=zoom;touchStartX=null;}
      else if(e.touches.length===1){touchStartX=e.touches[0].clientX;if(zoom>1){isPanning=true;panStartX=e.touches[0].clientX;panStartY=e.touches[0].clientY;panOriginX=panX;panOriginY=panY;}}
    },{passive:true});
    stage.addEventListener('touchmove',e=>{
      if(e.touches.length===2&&pinchStartDist){
        e.preventDefault();
        const dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        const midX=(e.touches[0].clientX+e.touches[1].clientX)/2,midY=(e.touches[0].clientY+e.touches[1].clientY)/2;
        setZoom(pinchStartZoom*(dist/pinchStartDist),midX,midY);
      }else if(isPanning&&e.touches.length===1){
        panX=panOriginX+(e.touches[0].clientX-panStartX);panY=panOriginY+(e.touches[0].clientY-panStartY);applyZoomTransform();
      }
    },{passive:false});
    stage.addEventListener('touchend',e=>{
      pinchStartDist=0;isPanning=false;
      if(touchStartX===null)return;const dx=(e.changedTouches[0]?.clientX??touchStartX)-touchStartX;touchStartX=null;
      if(zoom<=1&&Math.abs(dx)>48){resetZoom();move(dx<0?1:-1);}
    },{passive:true});
    return box;
  }
  function itemFromCard(card){return{src:card.dataset.gallerySrc,title:card.dataset.galleryTitle,type:card.dataset.galleryType,caption:card.dataset.galleryCaption||card.dataset.galleryTitle,route:card.dataset.galleryRoute||'',card};}
  function normalise(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function matches(card){const category=currentFilter==='all'||card.dataset.galleryCategory===currentFilter;const haystack=normalise(`${card.dataset.galleryTitle} ${card.dataset.galleryType} ${card.dataset.galleryCaption}`);return category&&(!query||haystack.includes(normalise(query)))&&card.dataset.galleryBroken!=='true';}
  function refreshVisible(){visible=cards.filter(card=>!card.hidden&&card.dataset.galleryBroken!=='true').map(itemFromCard);const count=$('[data-gallery-visible-count]',page);if(count)count.textContent=`${visible.length} ${visible.length===1?'imagem':'imagens'}`;const empty=$('[data-gallery-empty]',page);if(empty)empty.hidden=visible.length>0;}
  function refreshFilterAvailability(){if(!page)return;$$('[data-gallery-filter]',page).forEach(btn=>{const filter=btn.dataset.galleryFilter;const available=filter==='all'?cards.some(card=>card.dataset.galleryBroken!=='true'):cards.some(card=>card.dataset.galleryCategory===filter&&card.dataset.galleryBroken!=='true');btn.hidden=!available;});}
  function applyFilters(){cards.forEach(card=>{card.hidden=!matches(card);card.setAttribute('aria-hidden',card.hidden?'true':'false');});$$('[data-gallery-filter]',page).forEach(btn=>{const selected=btn.dataset.galleryFilter===currentFilter;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));});refreshVisible();}
  function applyFilter(filter){currentFilter=filter||'all';applyFilters();}
  function markBroken(card){if(!card||card.dataset.galleryBroken==='true')return;card.dataset.galleryBroken='true';card.hidden=true;card.setAttribute('aria-hidden','true');refreshFilterAvailability();applyFilters();}
  function preload(index){if(visible.length<2)return;[-1,1].forEach(delta=>{const item=visible[(index+delta+visible.length)%visible.length];if(item){const img=new Image();img.src=item.src;}});}
  function show(index){if(!visible.length)return;active=(index+visible.length)%visible.length;const item=visible[active],box=ensureLightbox(),wasOpen=box.classList.contains('open');if(!wasOpen)lastFocus=document.activeElement;resetZoom();const image=$('[data-gallery-image]',box);image.src=item.src;image.alt=item.title;$('[data-gallery-title]',box).textContent=item.title;$('[data-gallery-type]',box).textContent=item.type;$('[data-gallery-caption]',box).textContent=item.caption;$('[data-gallery-count]',box).textContent=`${active+1} / ${visible.length}`;const open=$('[data-gallery-open-record]',box);open.hidden=!item.route;open.dataset.route=item.route||'';box.classList.toggle('single',visible.length<2);box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.classList.add('di-gallery-lock');if(!wasOpen)$('[data-gallery-close]',box).focus();preload(active);}
  function close(){const box=$('#diGalleryLightbox');if(!box||!box.classList.contains('open'))return;resetZoom();box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.classList.remove('di-gallery-lock');if(lastFocus?.focus)lastFocus.focus();lastFocus=null;}
  function move(delta){if(visible.length>1)show(active+delta);}
  function openRecord(){const box=$('#diGalleryLightbox'),route=$('[data-gallery-open-record]',box)?.dataset.route;if(!route)return;close();location.hash=`#/${route}`;}
  function mount(root=document){page=$('.di-gallery-page',root);if(!page)return;cards=$$('[data-gallery-item]',page);currentFilter='all';query='';cards.forEach(card=>{const image=$('img',card);if(image){image.addEventListener('error',()=>markBroken(card),{once:true});if(image.complete&&image.naturalWidth===0)markBroken(card);}card.addEventListener('click',()=>{if(card.dataset.galleryBroken==='true')return;refreshVisible();const idx=visible.findIndex(item=>item.card===card);if(idx>=0)show(idx);});});$$('[data-gallery-filter]',page).forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.galleryFilter)));const search=$('[data-gallery-search]',page);if(search)search.addEventListener('input',()=>{query=search.value;applyFilters();});refreshFilterAvailability();applyFilters();}
  document.addEventListener('keydown',e=>{const box=$('#diGalleryLightbox');if(!box?.classList.contains('open'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft'){resetZoom();move(-1);}else if(e.key==='ArrowRight'){resetZoom();move(1);}else if(e.key==='+'||e.key==='=')setZoom(zoom*ZOOM_STEP);else if(e.key==='-')setZoom(zoom/ZOOM_STEP);else if(e.key==='Tab'){const focusable=$$('button:not([hidden])',box);if(!focusable.length)return;const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  window.DI_GALLERY={mount,close};
})();
