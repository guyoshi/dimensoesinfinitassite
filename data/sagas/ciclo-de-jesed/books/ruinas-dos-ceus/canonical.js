(() => {
  'use strict';
  const D=window.RUINAS_DATA;if(!D)return;
  const chapterTitles={11:'Sobrevivência',12:'O Homem no Riacho',15:'O Peso do Silêncio',21:'A Leveza e o Peso',25:'O Vale'};
  for(const chapter of D.chapters||[]){if(chapterTitles[Number(chapter.n??chapter.number)]){const title=chapterTitles[Number(chapter.n??chapter.number)];chapter.t=title;chapter.title=title;}}
  const fauna=window.RS?.LORE?.fauna||[];
  for(const item of fauna){if(item[0]==='Raukhar'){item[0]='Criatura de olhos amarelos';item[3]='Citado no Livro I apenas como "a Fera" ou pela descrição dos olhos amarelos — o nome usado em Guerras de Sangue não é revelado neste livro.';}}
  D.canonicalAudit=D.canonicalAudit||{};
  D.canonicalAudit.stage=3;
})();
