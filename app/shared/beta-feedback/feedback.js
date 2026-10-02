(()=>{
  const STORAGE_KEY='di.betaFeedback.v1';
  const READER_KEY='di.betaFeedback.reader';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storeRead=()=>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{"responses":{}}')}catch{return {responses:{}}}};
  const storeWrite=s=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s))}catch{}};
  const readerRead=()=>{try{return localStorage.getItem(READER_KEY)||''}catch{return ''}};
  const readerWrite=v=>{try{localStorage.setItem(READER_KEY,String(v||''))}catch{}};
  const rid=(bookId,type,chapter)=>type==='chapter'?bookId+':chapter:'+chapter:bookId+':book';

  function starField(name,label,help){
    let out='<fieldset class="beta-field beta-stars-field"><legend>'+esc(label)+'</legend>';
    if(help) out+='<small>'+esc(help)+'</small>';
    out+='<div class="beta-stars" role="radiogroup" aria-label="'+esc(label)+'">';
    [1,2,3,4,5].forEach(n=>{
      out+='<label title="'+n+' de 5"><input type="radio" name="'+esc(name)+'" value="'+n+'"><span aria-hidden="true">★</span><b>'+n+'</b></label>';
    });
    return out+'</div></fieldset>';
  }

  function readerField(){
    return '<label class="beta-field beta-reader"><span>Seu nome ou apelido <small>opcional</small></span><input type="text" name="reader" autocomplete="nickname" maxlength="80" placeholder="Como quer ser identificado?"></label>';
  }

  function chapterHtml(o){
    const id=rid(o.bookId,'chapter',o.chapter);
    const issueOptions=[['confuso','Confuso'],['arrastado','Arrastado'],['corrido','Rápido demais'],['repetitivo','Repetitivo'],['exposicao','Exposição demais'],['dialogo','Diálogo artificial'],['emocao','Emoção fraca'],['nenhum','Nada disso']];
    let issues='';
    issueOptions.forEach(x=>{issues+='<label><input type="checkbox" name="issues" value="'+x[0]+'"><span>'+x[1]+'</span></label>'});
    return '<section class="beta-feedback panel" data-beta-root>'+
      '<div class="beta-feedback-head"><div><p class="eyebrow">Leitura beta · Capítulo '+esc(o.chapter)+'</p><h2>O que este capítulo deixou em você?</h2><p>Leva menos de dois minutos. Só responda o que fizer sentido.</p></div><span class="beta-feedback-mark" aria-hidden="true">✦</span></div>'+
      '<form class="beta-form" data-beta-form data-feedback-id="'+esc(id)+'" data-feedback-type="chapter" data-book-id="'+esc(o.bookId)+'" data-book-title="'+esc(o.bookTitle)+'" data-chapter="'+esc(o.chapter)+'" data-chapter-title="'+esc(o.chapterTitle)+'">'+
      readerField()+
      '<div class="beta-rating-grid">'+
        starField('overall','Nota geral do capítulo','')+
        starField('continue','Vontade de continuar lendo','1 = pararia aqui · 5 = abriria o próximo agora')+
        starField('clarity','Clareza','1 = fiquei perdido · 5 = tudo fez sentido')+
        starField('impact','Impacto emocional','1 = pouco impacto · 5 = bateu forte')+
      '</div>'+
      '<fieldset class="beta-field"><legend>Como sentiu o ritmo?</legend><div class="beta-segmented">'+
        '<label><input type="radio" name="pace" value="lento"><span>Lento</span></label>'+
        '<label><input type="radio" name="pace" value="equilibrado"><span>No ponto</span></label>'+
        '<label><input type="radio" name="pace" value="corrido"><span>Corrido</span></label>'+
      '</div></fieldset>'+
      '<fieldset class="beta-field"><legend>Alguma coisa incomodou?</legend><div class="beta-chips">'+issues+'</div></fieldset>'+
      '<div class="beta-text-grid">'+
        '<label class="beta-field"><span>Qual foi o momento mais forte?</span><textarea name="strongest" rows="3" maxlength="1200" placeholder="A cena, fala, imagem ou ideia que mais ficou na cabeça…"></textarea></label>'+
        '<label class="beta-field"><span>Algo te confundiu, cansou ou você mudaria?</span><textarea name="problem" rows="3" maxlength="1600" placeholder="Pode ser pequeno. É justamente esse tipo de detalhe que ajuda na revisão."></textarea></label>'+
      '</div>'+
      '<label class="beta-field"><span>Teoria do leitor <small>opcional</small></span><textarea name="prediction" rows="3" maxlength="1400" placeholder="O que você acha que vai acontecer depois? Quem você desconfia? O que acha que determinada pista significa?"></textarea></label>'+
      '<div class="beta-actions"><button class="primary-button" type="submit">Salvar avaliação</button><button class="secondary-button" type="button" data-beta-share>Compartilhar</button><small data-beta-status>As respostas ficam salvas neste navegador.</small></div>'+
      '</form></section>';
  }

  function bookHtml(o){
    const id=rid(o.bookId,'book');
    return '<section class="beta-feedback beta-book-feedback panel" data-beta-root>'+
      '<div class="beta-feedback-head"><div><p class="eyebrow">Leitura beta · Fim do livro</p><h2>Agora vale o panorama inteiro</h2><p>Aqui interessa menos a nota e mais entender o que sobreviveu na sua cabeça depois da última página.</p></div><span class="beta-feedback-mark" aria-hidden="true">★</span></div>'+
      '<form class="beta-form" data-beta-form data-feedback-id="'+esc(id)+'" data-feedback-type="book" data-book-id="'+esc(o.bookId)+'" data-book-title="'+esc(o.bookTitle)+'">'+
      readerField()+
      '<div class="beta-rating-grid">'+
        starField('overall','Nota geral do livro','')+
        starField('ending','Satisfação com o final','')+
        starField('continue','Vontade de ler o próximo livro','')+
        starField('recommend','Vontade de recomendar','')+
      '</div>'+
      '<div class="beta-text-grid">'+
        '<label class="beta-field"><span>Personagem que mais funcionou para você. Por quê?</span><textarea name="bestCharacter" rows="3" maxlength="1400"></textarea></label>'+
        '<label class="beta-field"><span>Personagem que menos funcionou. Por quê?</span><textarea name="weakCharacter" rows="3" maxlength="1400"></textarea></label>'+
        '<label class="beta-field"><span>Melhor momento do livro</span><textarea name="bestMoment" rows="3" maxlength="1600"></textarea></label>'+
        '<label class="beta-field"><span>Parte mais fraca ou que você mudaria</span><textarea name="weakest" rows="3" maxlength="1800"></textarea></label>'+
        '<label class="beta-field"><span>Ficou alguma ponta solta ou algo sem entender?</span><textarea name="looseEnds" rows="3" maxlength="1800"></textarea></label>'+
        '<label class="beta-field"><span>Em uma frase, sobre o que este livro é?</span><textarea name="theme" rows="3" maxlength="1000" placeholder="Não o resumo da trama. O que você acha que a história está dizendo?"></textarea></label>'+
      '</div>'+
      '<label class="beta-field"><span>Comentários finais</span><textarea name="finalThoughts" rows="5" maxlength="3000" placeholder="Qualquer coisa que você diria ao autor depois de terminar o livro."></textarea></label>'+
      '<div class="beta-actions beta-book-actions"><button class="primary-button" type="submit">Salvar avaliação final</button><button class="secondary-button" type="button" data-beta-share>Compartilhar avaliação</button><button class="secondary-button" type="button" data-beta-export>Baixar todas as respostas</button><small data-beta-status>Suas avaliações dos capítulos também podem ser exportadas juntas.</small></div>'+
      '</form></section>';
  }

  function collect(form){
    const fd=new FormData(form);
    const p={version:1,id:form.dataset.feedbackId,type:form.dataset.feedbackType,bookId:form.dataset.bookId,bookTitle:form.dataset.bookTitle,chapter:form.dataset.chapter?Number(form.dataset.chapter):null,chapterTitle:form.dataset.chapterTitle||null,reader:String(fd.get('reader')||'').trim(),answers:{},updatedAt:new Date().toISOString()};
    for(const pair of fd.entries()){
      const key=pair[0],value=pair[1];
      if(key==='reader') continue;
      if(key==='issues'){
        if(!Array.isArray(p.answers.issues))p.answers.issues=[];
        p.answers.issues.push(value);
      }else p.answers[key]=value;
    }
    return p;
  }

  function save(p){
    const s=storeRead();
    s.responses=s.responses||{};
    s.responses[p.id]=p;
    storeWrite(s);
    if(p.reader)readerWrite(p.reader);
  }

  function hydrate(form){
    if(form.dataset.betaHydrated==='1')return;
    form.dataset.betaHydrated='1';
    const saved=storeRead().responses?.[form.dataset.feedbackId];
    const reader=saved?.reader||readerRead();
    if(form.elements.reader&&reader)form.elements.reader.value=reader;
    if(!saved)return;
    Object.entries(saved.answers||{}).forEach(pair=>{
      const key=pair[0],value=pair[1];
      form.querySelectorAll('[name="'+key+'"]').forEach(field=>{
        if(field.type==='radio')field.checked=String(field.value)===String(value);
        else if(field.type==='checkbox')field.checked=Array.isArray(value)&&value.includes(field.value);
        else field.value=value??'';
      });
    });
    const status=form.querySelector('[data-beta-status]');
    if(status)status.textContent='Rascunho recuperado deste navegador.';
  }

  function mount(root){
    (root||document).querySelectorAll('[data-beta-form]').forEach(hydrate);
  }

  function format(p){
    const a=p.answers||{},rows=[];
    rows.push(p.type==='chapter'?'CAPÍTULO '+p.chapter+' — '+(p.chapterTitle||''):'AVALIAÇÃO FINAL — '+p.bookTitle);
    if(p.reader)rows.push('Leitor: '+p.reader);
    const rating=[['overall','Nota geral'],['continue','Vontade de continuar'],['clarity','Clareza'],['impact','Impacto emocional'],['ending','Final'],['recommend','Recomendaria']];
    rating.forEach(x=>{if(a[x[0]])rows.push(x[1]+': '+a[x[0]]+'/5')});
    if(a.pace)rows.push('Ritmo: '+a.pace);
    if(Array.isArray(a.issues)&&a.issues.length)rows.push('Sinais: '+a.issues.join(', '));
    const text=[['strongest','Momento forte'],['problem','Confusão/mudança'],['prediction','Teoria'],['bestCharacter','Personagem que mais funcionou'],['weakCharacter','Personagem que menos funcionou'],['bestMoment','Melhor momento'],['weakest','Parte mais fraca'],['looseEnds','Pontas soltas'],['theme','Sobre o que é o livro'],['finalThoughts','Comentários finais']];
    text.forEach(x=>{if(a[x[0]])rows.push(x[1]+': '+a[x[0]])});
    return rows.join('\n\n');
  }

  async function share(form){
    const p=collect(form);save(p);
    const text=format(p);
    const title=p.type==='chapter'?p.bookTitle+' — Capítulo '+p.chapter:p.bookTitle+' — avaliação final';
    try{
      if(navigator.share)await navigator.share({title:title,text:text});
      else{
        await navigator.clipboard.writeText(text);
        const status=form.querySelector('[data-beta-status]');
        if(status)status.textContent='Avaliação copiada para a área de transferência.';
      }
    }catch(e){
      if(e?.name!=='AbortError'){try{await navigator.clipboard.writeText(text)}catch{}}
    }
  }

  function exportAll(bookId,bookTitle){
    const responses=Object.values(storeRead().responses||{}).filter(x=>x.bookId===bookId);
    const data={schema:'dimensoes-infinitas-beta-feedback',version:1,bookId:bookId,bookTitle:bookTitle,reader:readerRead(),exportedAt:new Date().toISOString(),responses:responses};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=bookId+'-feedback-beta.json';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  document.addEventListener('input',e=>{
    const form=e.target.closest?.('[data-beta-form]');
    if(!form)return;
    const p=collect(form);save(p);
    const status=form.querySelector('[data-beta-status]');
    if(status)status.textContent='Rascunho salvo automaticamente.';
  });
  document.addEventListener('change',e=>{
    const form=e.target.closest?.('[data-beta-form]');
    if(!form)return;
    const p=collect(form);save(p);
    const status=form.querySelector('[data-beta-status]');
    if(status)status.textContent='Rascunho salvo automaticamente.';
  });
  async function sendToEndpoint(p){
    const endpoint=window.DI_BETA_FEEDBACK_ENDPOINT;
    if(!endpoint)return false;
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)});
    if(!response.ok)throw new Error('Feedback endpoint returned '+response.status);
    return true;
  }

  document.addEventListener('submit',async e=>{
    const form=e.target.closest?.('[data-beta-form]');
    if(!form)return;
    e.preventDefault();
    const p=collect(form);save(p);
    const status=form.querySelector('[data-beta-status]');
    if(status)status.textContent='Salvando avaliação…';
    try{
      const sent=await sendToEndpoint(p);
      if(status)status.textContent=sent?'Avaliação enviada ao autor. Obrigado por ajudar na revisão.':'Avaliação salva neste navegador. Use Compartilhar para enviá-la ao autor.';
    }catch(error){
      if(status)status.textContent='O envio falhou, mas a avaliação continua salva neste navegador.';
    }
    form.classList.add('beta-saved');
    setTimeout(()=>form.classList.remove('beta-saved'),1200);
  });
  document.addEventListener('click',e=>{
    const shareButton=e.target.closest?.('[data-beta-share]');
    if(shareButton){const form=shareButton.closest('[data-beta-form]');if(form)share(form);return}
    const exportButton=e.target.closest?.('[data-beta-export]');
    if(exportButton){const form=exportButton.closest('[data-beta-form]');if(form)exportAll(form.dataset.bookId,form.dataset.bookTitle)}
  });

  window.DI_BETA_FEEDBACK={chapterHtml:chapterHtml,bookHtml:bookHtml,mount:mount,exportAll:exportAll};
})();