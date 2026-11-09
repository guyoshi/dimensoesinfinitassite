/* Metadados de Ruínas dos Céus (motor único). O conteúdo fica nos demais arquivos desta pasta. */
window.DI_BOOK = Object.assign(window.DI_BOOK || {}, { saga: window.DI_SAGA }, {
  "book": {
    "id": "ruinas-dos-ceus",
    "name": "Ruínas dos Céus",
    "numeral": "I",
    "theme": "ru",
    "kicker": "CICLO DE JESED · LIVRO I",
    "tagline": "Quando as ilhas de Etérea começam a cair, uma jovem desacreditada precisa carregar a verdade até uma superfície que seu povo jurava não existir.",
    "statusLabel": "Livro escrito",
    "heroY": "38%",
    "cover": "assets/books/ciclo-de-jesed/ruinas-dos-ceus/cover.webp",
    "logo": "assets/branding/ruinas-dos-ceus/logo-light.webp",
    "brandAssets": {
      "logo": "assets/branding/dimensoes-infinitas/dimensoes-infinitas-logo-branco.png",
      "seal": "assets/branding/dimensoes-infinitas/dimensoes-infinitas-selo-n-branco.png",
      "authorSignature": "assets/branding/dimensoes-infinitas/guilherme-s-l-anjos-branco.png"
    },
    "transitionLabel": "Rajada de vento ao trocar de página",
    "lanternOption": false,
    "compactAppearances": true,
    "fx": {
      "sky": {
        "varPrefix": "rdc"
      },
      "clouds": {
        "density": 86,
        "gliders": true
      }
    }
  },
  "nav": [
    {
      "group": "Visão geral",
      "items": [
        "inicio"
      ]
    },
    {
      "group": "História",
      "items": [
        "capitulos",
        "linha-do-tempo"
      ]
    },
    {
      "group": "Pessoas",
      "items": [
        "personagens"
      ]
    },
    {
      "group": "Mundo",
      "items": [
        "mapa",
        "lugares"
      ]
    },
    {
      "group": "Arquivo",
      "items": [
        "galeria"
      ]
    }
  ],
  "mapText": "Etérea e a Superfície",
  "maps": [
    {
      "id": "eterea",
      "title": "Etérea — Capítulos 1 a 9",
      "shortTitle": "Etérea",
      "image": "assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-eterea.webp",
      "ratio": "1450 / 1024",
      "description": "O mundo suspenso antes da Queda, organizado por ilhas, ritos e funções comunitárias.",
      "context": [
        "Civilização suspensa",
        "Harmonia ritual",
        "Vento e leveza",
        "Sociedade organizada"
      ],
      "pins": [
        {
          "place": "eterea",
          "x": 54,
          "y": 14,
          "kind": "region",
          "major": true
        },
        {
          "place": "nivellia",
          "x": 51.5,
          "y": 43.5,
          "kind": "place",
          "major": true
        },
        {
          "place": "ilha-da-memoria",
          "x": 85.5,
          "y": 35,
          "kind": "place",
          "major": true
        },
        {
          "place": "erilan",
          "x": 13.5,
          "y": 34.5,
          "kind": "place",
          "major": true
        },
        {
          "place": "planalto-de-talyen",
          "x": 84,
          "y": 62.5,
          "kind": "place",
          "major": true
        },
        {
          "place": "bosques-de-arion",
          "x": 14.5,
          "y": 62.2,
          "kind": "place",
          "major": true
        },
        {
          "place": "circulo-de-nhamari",
          "x": 20.5,
          "y": 81.5,
          "kind": "place",
          "major": true
        },
        {
          "place": "praca-da-raiz",
          "x": 31.2,
          "y": 41.5,
          "kind": "place",
          "major": true
        },
        {
          "place": "estacao-da-leveza",
          "x": 61.5,
          "y": 50.5,
          "kind": "place",
          "major": false
        },
        {
          "place": "ilhas-baixas",
          "x": 48,
          "y": 91,
          "kind": "myth",
          "major": false
        },
        {
          "place": "ilha-dos-pequenos",
          "x": 75.8,
          "y": 87.5,
          "kind": "place",
          "major": true
        }
      ]
    },
    {
      "id": "superficie",
      "title": "A Superfície — Capítulos 10 a 25",
      "shortTitle": "A Superfície",
      "image": "assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-nadirion.webp",
      "ratio": "1450 / 1024",
      "description": "A região de Nadirion onde os sobreviventes aprendem a viver sem as certezas de Etérea.",
      "context": [
        "Natureza desconhecida",
        "Sobrevivência",
        "Terra, peso e fome",
        "Ausência de civilização humana conhecida"
      ],
      "pins": [
        {
          "place": "nadirion",
          "x": 69,
          "y": 62,
          "kind": "region",
          "major": true
        },
        {
          "place": "primeiro-abrigo",
          "x": 64,
          "y": 22,
          "kind": "place",
          "major": true
        },
        {
          "place": "riacho-de-nadirion",
          "x": 51,
          "y": 29,
          "kind": "place",
          "major": true
        },
        {
          "place": "floresta-de-nadirion",
          "x": 64,
          "y": 57.5,
          "kind": "region",
          "major": true
        },
        {
          "place": "ruinas-de-eterea",
          "x": 15.5,
          "y": 64,
          "kind": "place",
          "major": true
        },
        {
          "place": "vale",
          "x": 5.5,
          "y": 72,
          "kind": "place",
          "major": true
        }
      ]
    }
  ]
});
