/* Fonte única da saga: usada pelo portal e pelas páginas dos livros. */
window.DI_SAGAS = window.DI_SAGAS || {};
window.DI_SAGAS["edelin-lys"] = {
  "id": "edelin-lys",
  "name": "Édelin Lys",
  "symbol": "crown",
  "tagline": "",
  "books": [
    {
      "id": "promessas-do-mar",
      "order": 1,
      "name": "Promessas do Mar",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": "edelin-lys-promessas-do-mar.html",
      "cover": null,
      "icon": "crown"
    },
    {
      "id": "memorias-do-fogo",
      "order": 2,
      "name": "Memórias do Fogo",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": "edelin-lys-memorias-do-fogo.html",
      "cover": null,
      "icon": "crown"
    },
    {
      "id": "segredos-do-gelo",
      "order": 3,
      "name": "Segredos do Gelo",
      "status": "locked",
      "stageLabel": "Em preparação",
      "entry": "edelin-lys-segredos-do-gelo.html",
      "cover": null,
      "icon": "crown"
    }
  ]
};
window.DI_SAGA = window.DI_SAGAS["edelin-lys"];
