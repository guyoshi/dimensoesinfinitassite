# Novos sites — Etapa 3: construção

Status: **construída e testada localmente; não publicada no GitHub.** Spacetheft, Viajantes Dimensionais e Diário Sobrenatural estão liberados no portal.

## O que existe

| Peça | Local |
|---|---|
| Motor único dos livros novos | `app/shared/book-engine/` (`engine.js`, `engine.css`, `fx.js`) |
| Tema e efeitos de cada livro | `app/sagas/<saga>/books/<livro>/theme.css` (Diário 2 importa o do Diário 1 e troca a paleta) |
| Dados da saga (portal + livros) | `data/sagas/<saga>/saga.js` |
| Dados de cada livro | `data/sagas/<saga>/books/<livro>/` → `book.js`, `chapters.js`, `characters.js`, `places.js`, `timeline.js`, `gallery.js`, `images.js` |
| Entradas | `a-lenda-da-aurora.html`, `a-patrulha-de-korvo.html`, `os-elos-das-sombras.html`, `a-alvorada-das-ilusoes.html` |
| Capas e logos | `assets/books/<saga>/<livro>/cover.webp`, `assets/branding/<livro>/logo-light.webp` |
| Portal | `index.html`, `app/portal/app.js`, `app/portal/data.js` (rota `#/saga/<id>`; `#/books` segue sendo Ciclo de Jesed) |

O motor é novo e enxuto (não herda o `app.js` de Herdeiros das Cinzas, que tem "Ciclo de Jesed" fixo em 33 pontos). Reaproveitado de Jesed: o portal, o padrão de pastas/assets, a convenção de nomes e as regras de validação.

## Páginas de cada livro
Rotas: `#/inicio`, `#/livros`, `#/capitulos`, `#/capitulo/N`, `#/linha-do-tempo`, `#/personagens`, `#/personagem/<slug>`, `#/lugares`, `#/lugar/<slug>`, `#/galeria` e, só em Viajantes, `#/mapa`.
Também: pesquisa (Ctrl K), seletor de livro, configurações visuais (Completo, Equilibrado, Desempenho; transições; Lanterna no Diário 1), Contemplar este mundo, menu lateral recolhível no celular, estados vazios para seções sem conteúdo. Preferências guardadas por livro (`di-<livro>-…`). Sem música por enquanto (não há trilhas).

## Efeitos
- **Spacetheft:** estrelas em paralaxe (canvas), nebulosas, vórtice girando no herói, galeão cruzando o céu, estrelas cadentes, transição em salto hiperespacial.
- **Viajantes:** portal ciano pulsando com anéis expansivos, brilho ciano, partículas, fagulhas âmbar nos trilhos, raízes, transição em ondulação, textura de desenho (contorno de tinta, sombra dura, papel granulado).
- **Diário 1:** luz que falha, tinta nas bordas (recua com o mouse), poeira, grão, vinheta, Lanterna opcional, transição como virar de folha.
- **Diário 2:** amanhecer que respira, névoa, miragem sobre os cartões, mesma estrutura do Diário 1.
Modo Desempenho (ou movimento reduzido do sistema) desliga canvas e animações; Equilibrado reduz as partículas.

## Conteúdo já carregado
- Capítulos: títulos e narradores lidos dos `livro.json` (ST 22, VD 23 com 22 e 23 nomeados, DS1 38, DS2 29 com 26 e 28 marcados "Rascunho"; 30 e 31, vazios, ficam fora).
- Capas e logos (versão branca) convertidas para WebP. Os demais logos (preto, colorido) entram na etapa 5.
- Resumos, personagens, lugares, linha do tempo e galeria: **etapa 4**. As páginas mostram estado vazio até lá.

## Pendências
1. Etapa 4: ler capítulos, resumir, montar personagens/lugares/linha do tempo e importar imagens.
2. Etapa 5: estender `sync_book_assets.py` para descobrir capas com nomes livres, imagens de capítulos, personagens e lugares dos livros novos e gerar o `images.js` de cada livro. Enquanto isso, rode `PUBLICAR_IMAGENS.cmd` para reconciliar `assets-manifest.json` e o inventário com as capas e logos novos.
3. Publicação no GitHub é passo seu.
