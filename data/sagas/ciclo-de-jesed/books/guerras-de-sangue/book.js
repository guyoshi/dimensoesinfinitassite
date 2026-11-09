/* Metadados de Guerras de Sangue (motor único). O conteúdo fica nos demais arquivos desta pasta. */
window.DI_BOOK = Object.assign(window.DI_BOOK || {}, { saga: window.DI_SAGA }, {
  "book": {
    "id": "guerras-de-sangue",
    "name": "Guerras de Sangue",
    "numeral": "II",
    "theme": "gs",
    "kicker": "CICLO DE JESED · LIVRO II",
    "tagline": "Duas soberanas e oito clãs são arrastados por uma guerra construída sobre segredos.",
    "statusLabel": "Livro concluído",
    "heroY": "30%",
    "cover": "assets/books/ciclo-de-jesed/guerras-de-sangue/cover.webp",
    "logo": "assets/branding/guerras-de-sangue/logo-light.webp",
    "brandAssets": {
      "logo": "assets/branding/dimensoes-infinitas/dimensoes-infinitas-logo-branco.png",
      "seal": "assets/branding/dimensoes-infinitas/dimensoes-infinitas-selo-n-branco.png",
      "authorSignature": "assets/branding/dimensoes-infinitas/guilherme-s-l-anjos-branco.png"
    },
    "transitionLabel": "Labareda varrendo a tela ao trocar de página",
    "lanternOption": false,
    "compactAppearances": true,
    "fx": {
      "embers": {
        "density": 92,
        "motion": 52,
        "opacity": 86,
        "front": true
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
        "personagens",
        "clas"
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
  "mapText": "Jesed, seus clãs e rotas",
  "maps": [
    {
      "id": "jesed",
      "title": "Jesed em Guerras de Sangue",
      "shortTitle": "Jesed",
      "image": "assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp",
      "ratio": "1536 / 1024",
      "description": "Territórios, cidades, passagens e forças políticas na época da guerra.",
      "pins": [
        {
          "place": "kaendar",
          "x": 38.7,
          "y": 71.2,
          "kind": "place",
          "major": true
        },
        {
          "place": "khar-tondr",
          "x": 80.8,
          "y": 72,
          "kind": "place",
          "major": true
        },
        {
          "place": "nyn-harad",
          "x": 63.8,
          "y": 51.2,
          "kind": "place",
          "major": true
        },
        {
          "place": "velarim",
          "x": 61.8,
          "y": 65.5,
          "kind": "place",
          "major": true
        },
        {
          "place": "margem-dos-zirrios",
          "x": 46.5,
          "y": 30,
          "kind": "place",
          "major": true
        },
        {
          "place": "varkhama",
          "x": 75,
          "y": 20.4,
          "kind": "place",
          "major": true
        },
        {
          "place": "cendar-vel",
          "x": 28.9,
          "y": 21.7,
          "kind": "place",
          "major": true
        },
        {
          "place": "urtar-vesh",
          "x": 24.8,
          "y": 56.3,
          "kind": "place",
          "major": true
        },
        {
          "place": "homens-das-areias",
          "x": 12.3,
          "y": 86.1,
          "kind": "place",
          "major": true
        },
        {
          "place": "marco-das-tres-pedras",
          "x": 65.5,
          "y": 68.2,
          "kind": "place",
          "major": false
        },
        {
          "place": "alesteiro",
          "x": 48.5,
          "y": 62.5,
          "kind": "place",
          "major": false
        },
        {
          "place": "noreval",
          "x": 43.8,
          "y": 59.8,
          "kind": "place",
          "major": false
        },
        {
          "place": "nhar-veyr",
          "x": 69.5,
          "y": 59.2,
          "kind": "place",
          "major": false
        },
        {
          "place": "plataforma-do-sol-alto",
          "x": 80.1,
          "y": 69.1,
          "kind": "place",
          "major": false
        },
        {
          "place": "veias-de-barro",
          "x": 82.2,
          "y": 75.3,
          "kind": "place",
          "major": false
        },
        {
          "place": "camara-do-primeiro-abrigo",
          "x": 37.4,
          "y": 68.4,
          "kind": "place",
          "major": false
        },
        {
          "place": "terra-preta",
          "x": 65.2,
          "y": 45.8,
          "kind": "region",
          "major": true
        },
        {
          "place": "floresta-de-mirval",
          "x": 60,
          "y": 62,
          "kind": "region",
          "major": true
        },
        {
          "place": "rio-grande",
          "x": 36.5,
          "y": 45.5,
          "kind": "route",
          "major": true
        },
        {
          "place": "garganta-de-kaendar",
          "x": 48,
          "y": 69.5,
          "kind": "route",
          "major": true
        },
        {
          "place": "garganta-seca",
          "x": 70.8,
          "y": 79.2,
          "kind": "route",
          "major": true
        },
        {
          "place": "estrada-dos-graos",
          "x": 87.2,
          "y": 48.2,
          "kind": "route",
          "major": true
        },
        {
          "place": "marcha-oculta-da-alianca",
          "x": 67,
          "y": 65.8,
          "kind": "route",
          "major": true
        }
      ],
      "routes": [
        {
          "place": "rio-grande",
          "kind": "water",
          "points": "39,1 40,17 41,31 38,43 35,56 33,72 31,91"
        },
        {
          "place": "garganta-de-kaendar",
          "kind": "land",
          "points": "43,70 48,69.5 52,72"
        },
        {
          "place": "garganta-seca",
          "kind": "land",
          "points": "68,77 71,79 76,75"
        },
        {
          "place": "estrada-dos-graos",
          "kind": "land",
          "points": "78,43 84,45 87,48 88,57"
        },
        {
          "place": "marcha-oculta-da-alianca",
          "kind": "military",
          "points": "81,72 70,66 64,56 57,62 49,68 39,71"
        }
      ],
      "notes": [
        {
          "label": "Clãs em conflito",
          "items": [
            {
              "title": "Polar e Tondrar",
              "description": "A morte de Yvenn transforma a negociação em guerra aberta.",
              "places": [
                "kaendar",
                "khar-tondr",
                "marco-das-tres-pedras"
              ]
            },
            {
              "title": "Polar e Buldar",
              "description": "Grãos, cerco e autoridade colocam Kaendar contra a Terra Preta.",
              "places": [
                "kaendar",
                "nyn-harad",
                "terra-preta"
              ]
            },
            {
              "title": "Polar e sobreviventes Fendelar",
              "description": "Velarim converte a vingança de Rendar em ameaça direta ao trono.",
              "places": [
                "kaendar",
                "velarim"
              ]
            }
          ]
        },
        {
          "label": "Alianças confirmadas",
          "items": [
            {
              "title": "Tondrar, Buldar e Fendelar",
              "description": "Forças distintas marcham juntas contra Kaendar, sem se tornarem um exército único.",
              "places": [
                "khar-tondr",
                "nyn-harad",
                "velarim",
                "marcha-oculta-da-alianca"
              ]
            },
            {
              "title": "Polar e Urtistar",
              "description": "Alyra obtém apoio Urtistar para a defesa de Kaendar.",
              "places": [
                "kaendar",
                "urtar-vesh"
              ]
            },
            {
              "title": "Kaelina e Homens das Areias",
              "description": "Um acordo temporário muda o equilíbrio durante a invasão da fortaleza.",
              "places": [
                "kaendar",
                "homens-das-areias"
              ]
            }
          ]
        },
        {
          "label": "Alianças suspeitas",
          "items": [
            {
              "title": "Daryon e Homens das Areias",
              "description": "Os encontros secretos precedem a revelação do papel de Daryon na guerra.",
              "places": [
                "kaendar",
                "homens-das-areias"
              ]
            },
            {
              "title": "Tavra e a força invasora",
              "description": "A presença Vendrar favorece o ataque, mas não representa decisão formal de todo o clã.",
              "places": [
                "varkhama",
                "kaendar"
              ]
            }
          ]
        },
        {
          "label": "Territórios disputados",
          "items": [
            {
              "title": "Marco das Três Pedras",
              "description": "Terreno de trégua entre rotas Polar e Tondrar.",
              "places": [
                "marco-das-tres-pedras"
              ]
            },
            {
              "title": "Nhar-Veyr",
              "description": "Vila de autoridade ambígua na fronteira de três territórios.",
              "places": [
                "nhar-veyr"
              ]
            },
            {
              "title": "Floresta de Mirval",
              "description": "A floresta oculta Velarim entre interesses Buldar e Tondrar.",
              "places": [
                "floresta-de-mirval",
                "velarim"
              ]
            }
          ]
        },
        {
          "label": "Rotas ameaçadas",
          "items": [
            {
              "title": "Rio Grande",
              "description": "A rota fluvial e o cais tornam-se caminho de invasão e abastecimento.",
              "places": [
                "rio-grande",
                "kaendar",
                "margem-dos-zirrios"
              ]
            },
            {
              "title": "Garganta de Kaendar",
              "description": "A principal defesa terrestre perde importância quando o inimigo escolhe outro acesso.",
              "places": [
                "garganta-de-kaendar",
                "kaendar"
              ]
            },
            {
              "title": "Estrada dos Grãos",
              "description": "O bloqueio ou atraso das cargas ameaça Kaendar antes da batalha.",
              "places": [
                "estrada-dos-graos",
                "nyn-harad",
                "terra-preta"
              ]
            },
            {
              "title": "Garganta Seca",
              "description": "A passagem controla a saída Tondrar e a formação da marcha.",
              "places": [
                "garganta-seca",
                "khar-tondr"
              ]
            }
          ]
        },
        {
          "label": "Recursos estratégicos",
          "items": [
            {
              "title": "Grãos da Terra Preta",
              "description": "A produção Buldar sustenta cidades e serve como instrumento político.",
              "places": [
                "terra-preta",
                "nyn-harad",
                "estrada-dos-graos"
              ]
            },
            {
              "title": "Água do Rio Grande",
              "description": "Água, pesca, transporte e acesso ao mar atravessam vários territórios.",
              "places": [
                "rio-grande",
                "margem-dos-zirrios",
                "kaendar"
              ]
            },
            {
              "title": "Metal e fogo Vendrar",
              "description": "As forjas de Varkhama produzem mecanismos capazes de alterar o campo de batalha.",
              "places": [
                "varkhama",
                "alesteiro",
                "kaendar"
              ]
            }
          ]
        },
        {
          "label": "Forças em movimento",
          "items": [
            {
              "title": "Marcha da aliança",
              "description": "Tondrar, Buldar e sobreviventes Fendelar convergem para Kaendar por trajetos separados.",
              "places": [
                "marcha-oculta-da-alianca",
                "khar-tondr",
                "nyn-harad",
                "kaendar"
              ]
            },
            {
              "title": "Urtistar rumo à fortaleza",
              "description": "O apoio negociado por Alyra desloca combatentes para a defesa Polar.",
              "places": [
                "urtar-vesh",
                "kaendar"
              ]
            },
            {
              "title": "Homens das Areias dentro de Kaendar",
              "description": "Sarkan muda de posição e conduz sua força para o interior da cidade.",
              "places": [
                "homens-das-areias",
                "kaendar"
              ]
            }
          ]
        }
      ]
    }
  ]
});
