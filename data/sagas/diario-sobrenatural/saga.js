/* Fonte única da saga: usada pelo portal e pelas páginas dos livros. */
window.DI_SAGAS = window.DI_SAGAS || {};
window.DI_SAGAS["diario-sobrenatural"] = {
  "id": "diario-sobrenatural",
  "name": "Diário Sobrenatural",
  "symbol": "journal",
  "tagline": "Seis vozes, uma casa e o que ficou preso nela.",
  "books": [
    {
      "id": "os-elos-das-sombras",
      "order": 1,
      "name": "Os Elos das Sombras",
      "status": "active",
      "stageLabel": "Livro escrito",
      "entry": "os-elos-das-sombras.html",
      "cover": "assets/books/diario-sobrenatural/os-elos-das-sombras/cover.webp",
      "icon": "diary"
    },
    {
      "id": "a-alvorada-das-ilusoes",
      "order": 2,
      "name": "A Alvorada das Ilusões",
      "status": "active",
      "stageLabel": "Em desenvolvimento",
      "entry": "a-alvorada-das-ilusoes.html",
      "cover": "assets/books/diario-sobrenatural/a-alvorada-das-ilusoes/cover.webp",
      "icon": "diary"
    },
    {
      "id": "o-limiar-da-noite",
      "order": 3,
      "name": "O Limiar da Noite",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "diary"
    },
    {
      "id": "livro-4",
      "order": 4,
      "name": "Livro 4",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "diary"
    },
    {
      "id": "livro-5",
      "order": 5,
      "name": "Livro 5",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "diary"
    }
  ]
};
window.DI_SAGA = window.DI_SAGAS["diario-sobrenatural"];
