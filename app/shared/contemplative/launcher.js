(() => {
  'use strict';
  const frameURL = new URL('frame.html', document.currentScript.src);
  frameURL.searchParams.set('v','20261020e');
  const pauseStyle=document.createElement('style');
  pauseStyle.textContent='body.contemplative-frame-active *{animation-play-state:paused!important}';
  document.head.append(pauseStyle);
  let shell, frame, opener, overflow, audioObserver;
  const send = data => frame?.contentWindow?.postMessage({ type:'contemplative:sync', ...data }, location.origin);
  function sync(detail) {
    if (!frame) return;
    const root=document.documentElement, style=getComputedStyle(root), variables={};
    for (let i=0;i<root.style.length;i++) { const key=root.style[i]; if(key.startsWith('--rdc-')) variables[key]=style.getPropertyValue(key); }
    send({variables, minutes:detail?.minutes ?? Number(document.querySelector('.topbar [data-time-slider]')?.value || 360),phase:document.body.dataset.skyPhase});
  }
  function close() {
    if (!shell) return;
    audioObserver?.disconnect(); audioObserver=null;
    // Removing the browsing context releases its DOM, decoded scene images, timers and animation loops.
    frame.remove();frame=null;shell.close();shell.remove();shell=null;
    document.body.style.overflow=overflow;
    document.body.classList.remove('contemplative-frame-active');
    window.DIFX?.resume?.();
    if(opener?.isConnected)opener.focus({preventScroll:true});
  }
  document.addEventListener('click', event => {
    const trigger=event.target.closest('[data-contemplative],[data-contemplate],#contBtn');
    if(!trigger)return;
    event.preventDefault();event.stopImmediatePropagation();
    if(shell)return;
    opener=trigger;overflow=document.body.style.overflow;document.body.style.overflow='hidden';
    shell=document.createElement('dialog');shell.setAttribute('aria-label','Modo contemplativo');
    Object.assign(shell.style,{position:'fixed',inset:'0',width:'100%',height:'100%',maxWidth:'none',maxHeight:'none',margin:'0',padding:'0',border:'0',background:'#081522',color:'white'});
    const status=document.createElement('p');status.textContent='Carregando cenário…';status.setAttribute('role','status');status.style.cssText='position:absolute;inset:45% 0;text-align:center;font:16px system-ui';
    const back=document.createElement('button');back.textContent='← Voltar';back.style.cssText='position:absolute;top:16px;left:16px;z-index:2;padding:12px;border:1px solid #fff5;border-radius:30px;background:#152d38;color:white;cursor:pointer';back.onclick=close;
    frame=document.createElement('iframe');frame.title='Cenário contemplativo';frame.allow='fullscreen';frame.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;opacity:0';
    const url=new URL(frameURL);url.searchParams.set('book',document.body.dataset.book);frame.src=url.href;
    shell.append(status,back,frame);document.body.append(shell);shell.addEventListener('cancel',e=>{e.preventDefault();close();});shell.showModal();
    document.body.classList.add('contemplative-frame-active');window.DIFX?.suspend?.();
    frame.addEventListener('load',()=>{sync();});
    shell._back=back;shell._status=status;
  },true);
  addEventListener('message',event=>{
    if(!frame||event.source!==frame.contentWindow||event.origin!==location.origin)return;
    if(event.data?.type==='contemplative:close'){close();return;}
    if(event.data?.type==='contemplative:ready'){
      frame.style.opacity='1';shell._status.remove();shell._back.hidden=true;sync();frame.contentWindow.focus();
      const player=document.getElementById('bookMusicPlayer');
      if(player){audioObserver=new MutationObserver(()=>send({music:true}));audioObserver.observe(player,{subtree:true,attributes:true,attributeFilter:['aria-pressed','disabled','data-state']});}
    }
    if(event.data?.type==='contemplative:error'){shell._status.textContent='Não foi possível abrir o cenário. Volte e tente novamente.';}
  });
  document.addEventListener('ruinas:sky-update',event=>sync(event.detail));
})();
