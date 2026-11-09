/* Fonte única da saga: usada pelas páginas dos livros. */
window.DI_SAGAS = window.DI_SAGAS || {};
window.DI_SAGAS["ciclo-de-jesed"] = {
  "id": "ciclo-de-jesed",
  "name": "Ciclo de Jesed",
  "symbol": "compass",
  "tagline": "Tudo nasce, cresce e morre. Para depois recomeçar.",
  "books": [
    {
      "id": "ruinas-dos-ceus",
      "order": 1,
      "name": "Ruínas dos Céus",
      "status": "active",
      "stageLabel": "Livro escrito",
      "entry": "ruinas.html",
      "cover": "assets/books/ciclo-de-jesed/ruinas-dos-ceus/cover.webp",
      "icon": "compass"
    },
    {
      "id": "guerras-de-sangue",
      "order": 2,
      "name": "Guerras de Sangue",
      "status": "active",
      "stageLabel": "Livro escrito",
      "entry": "guerras.html",
      "cover": "assets/books/ciclo-de-jesed/guerras-de-sangue/cover.webp",
      "icon": "compass"
    },
    {
      "id": "dinastia-polar",
      "order": 3,
      "name": "Dinastia Polar",
      "status": "active",
      "stageLabel": "Livro em andamento",
      "entry": "dinastia-polar.html",
      "cover": "assets/books/ciclo-de-jesed/dinastia-polar/cover.webp",
      "icon": "compass"
    },
    {
      "id": "herdeiros-das-cinzas",
      "order": 4,
      "name": "Herdeiros das Cinzas",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": "assets/books/ciclo-de-jesed/herdeiros-das-cinzas/cover.webp",
      "icon": "compass"
    },
    {
      "id": "coracao-de-poeira",
      "order": 5,
      "name": "Coração de Poeira",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "compass"
    }
  ]
};
window.DI_SAGA = window.DI_SAGAS["ciclo-de-jesed"];
