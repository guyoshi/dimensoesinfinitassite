(()=>{
  if(window.DIExperience) return;
  const storage={
    get(key,fallback=null){try{const v=localStorage.getItem(key);return v===null?fallback:v}catch{return fallback}},
    set(key,value){try{localStorage.setItem(key,String(value))}catch{}},
    remove(key){try{localStorage.removeItem(key)}catch{}}
  };
  const bool=(key,fallback=true)=>storage.get(key,fallback?'1':'0')!=='0';
  const num=(key,fallback,min,max)=>Math.max(min,Math.min(max,Number(storage.get(key,fallback))||fallback));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const saveData=!!connection?.saveData;
  const slowConnection=['slow-2g','2g'].includes(connection?.effectiveType);
  const mobile=matchMedia('(max-width: 760px)').matches;
  const weakDevice=(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)||(navigator.deviceMemory&&navigator.deviceMemory<=4)||mobile||saveData||slowConnection;
  // O site deve abrir sempre em modo desempenho em mobile, seja qual for a página do livro (dinastia, ruínas, etc).
  // Reforço central: garante o modo desempenho mesmo em páginas cujo app.js não tenha essa lógica própria.
  if(mobile){
    document.body.classList.add('performance-mode','no-particles','no-transitions','no-textures','no-blur','no-shadows','no-motion');
  }
  function toast(message){
    let node=document.getElementById('experienceToast');
    if(!node){node=document.createElement('div');node.id='experienceToast';node.className='experience-toast';node.setAttribute('role','status');node.setAttribute('aria-live','polite');document.body.append(node)}
    node.textContent=message;node.classList.add('show');clearTimeout(node._timer);node._timer=setTimeout(()=>node.classList.remove('show'),2200);
  }
  function makeToggle({key,label,description,value,prefix='di-'}){
    return `<div class="setting-row experience-setting-row"><span class="setting-copy"><strong>${label}</strong><small>${description}</small></span><button class="switch ${value?'on':''}" data-experience-setting="${key}" data-experience-prefix="${prefix}" aria-pressed="${value}"></button></div>`;
  }
  function makeRange({key,label,description,value,min=0,max=100,step=1,prefix='di-'}){
    return `<div class="setting-row range-row experience-setting-row"><span class="setting-copy"><strong>${label}</strong><small>${description}</small></span><div class="experience-range-wrap"><input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-experience-range="${key}" data-experience-prefix="${prefix}" aria-label="${label}"><output>${value}</output></div></div>`;
  }
  function attachSettings(root,onChange){
    root.addEventListener('click',e=>{
      const btn=e.target.closest('[data-experience-setting]');if(!btn)return;
      const key=btn.dataset.experienceSetting,prefix=btn.dataset.experiencePrefix||'di-';
      const next=btn.getAttribute('aria-pressed')!=='true';storage.set(prefix+key,next?'1':'0');btn.setAttribute('aria-pressed',String(next));btn.classList.toggle('on',next);onChange?.(key,next,'toggle');
    });
    root.addEventListener('input',e=>{
      const input=e.target.closest('[data-experience-range]');if(!input)return;
      const key=input.dataset.experienceRange,prefix=input.dataset.experiencePrefix||'di-';storage.set(prefix+key,input.value);input.parentElement?.querySelector('output')?.replaceChildren(input.value);onChange?.(key,Number(input.value),'range');
    });
  }
  function observePerformance(onChange){
    let last=document.body.classList.contains('performance-mode');
    const check=()=>{const next=document.body.classList.contains('performance-mode');if(next!==last){last=next;onChange(next)}};
    new MutationObserver(check).observe(document.body,{attributes:true,attributeFilter:['class']});
    document.addEventListener('click',e=>{if(e.target.closest('#perfToggle,#performanceToggle'))setTimeout(check,40)});
  }
  function intersectionPause(node,callback){
    if(!('IntersectionObserver'in window)){callback(true);return()=>{}};
    const observer=new IntersectionObserver(entries=>callback(entries[0]?.isIntersecting!==false),{threshold:0});observer.observe(node);return()=>observer.disconnect();
  }
  window.DIExperience={storage,bool,num,reduced,saveData,slowConnection,mobile,weakDevice,toast,makeToggle,makeRange,attachSettings,observePerformance,intersectionPause};
})();
