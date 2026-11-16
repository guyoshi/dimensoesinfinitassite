(()=>{
  if(window.__bookMusicLoaded) return;
  window.__bookMusicLoaded = true;
  const current = document.currentScript?.src || new URL('app/shared/book-music/loader.js', document.baseURI).href;
  const base = new URL('./', current);
  const cacheVersion = new URL(current).searchParams.get('v');
  const assetUrl = name => {
    const url = new URL(name, base);
    if(cacheVersion) url.searchParams.set('v', cacheVersion);
    return url.href;
  };
  if(!document.getElementById('bookMusicStyles')){
    const link = document.createElement('link');
    link.id = 'bookMusicStyles';
    link.rel = 'stylesheet';
    link.href = assetUrl('styles.css');
    document.head.appendChild(link);
  }
  const load = file => new Promise((resolve,reject)=>{
    const script = document.createElement('script');
    script.src = assetUrl(file);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  load('config.js').then(()=>load('player.js')).catch(()=>{});
})();
