(() => {
  'use strict';
  const X=window.JESED_ASHES_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;

  // Relações, famílias e organizações. Tipos visuais de relação disponíveis:
  const relationshipTypes={family:'Família',friendship:'Amizade',protection:'Proteção',influence:'Influência',conflict:'Conflito',rivalry:'Rivalidade',loyalty:'Lealdade',broken:'Ruptura',trust:'Confiança'};
  // relação: {id, slug, from:<id personagem>, to:<id personagem>, typeKey, type, state, description, fromView, toView, evolution[]}
  const relationships=[];
  // família: {id, slug, name, subtitle, summary, image, details[], members:[{id, role}]}
  const families=[];
  // organização: {id, slug, name, type, image, summary, function, activity, themes[], members:[{id, role}]}
  const organisations=[];
  D.relationshipTypes=relationshipTypes;D.relationships=relationships;D.families=families;D.organisations=organisations;
  C.setCollection(BOOK_ID,'relationships',relationships);C.setCollection(BOOK_ID,'families',families);C.setCollection(BOOK_ID,'organisations',organisations);
})();
