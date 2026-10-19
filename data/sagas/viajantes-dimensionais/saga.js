/* Fonte única da saga: usada pelo portal e pelas páginas dos livros. */
window.DI_SAGAS = window.DI_SAGAS || {};
window.DI_SAGAS["viajantes-dimensionais"] = {
  "id": "viajantes-dimensionais",
  "name": "Viajantes Dimensionais",
  "symbol": "portal",
  "tagline": "Quatro irmãos, uma quarta dimensão e uma patrulha que não deveria existir.",
  "books": [
    {
      "id": "a-patrulha-de-korvo",
      "order": 1,
      "name": "A Patrulha de Korvo",
      "status": "active",
      "stageLabel": "Livro escrito",
      "entry": "a-patrulha-de-korvo.html",
      "cover": "assets/books/viajantes-dimensionais/a-patrulha-de-korvo/cover.webp",
      "icon": "portal"
    },
    {
      "id": "livro-2",
      "order": 2,
      "name": "Livro 2",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "portal"
    },
    {
      "id": "o-senhor-da-morte",
      "order": 3,
      "name": "O Senhor da Morte",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "portal"
    },
    {
      "id": "livro-4",
      "order": 4,
      "name": "Livro 4",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "portal"
    },
    {
      "id": "livro-5",
      "order": 5,
      "name": "Livro 5",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "portal"
    },
    {
      "id": "livro-6",
      "order": 6,
      "name": "Livro 6",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": null,
      "cover": null,
      "icon": "portal"
    }
  ]
};
window.DI_SAGA = window.DI_SAGAS["viajantes-dimensionais"];
