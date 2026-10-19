# Novos sites — Etapa 1: esqueleto, tema, guias, efeitos e cores

Status: **aprovada com ajustes (guias, ciano em Viajantes, textura de desenho)**. Nada foi publicado no GitHub. O único arquivo novo no Site é `data/common/sagas-registry.json`, ainda não ligado ao portal.

Escopo: Spacetheft 1, Viajantes Dimensionais 1 a 6 (só o 1 aberto), Diário Sobrenatural 1 e 2.

---

## 1. Estrutura

### O que será reaproveitado (nada disso é reescrito)

| Peça existente | Uso nos novos livros |
|---|---|
| Portal (`app/portal`: estrelas, portais ovais, música) | Os três cards de saga passam de "Bloqueada" a "Disponível"; cada um abre sua grade de livros. |
| Motor de livro de Herdeiros das Cinzas / Dinastia Polar (`app.js`, ~79 KB) | Vira um motor único em `app/shared/book-engine/`, com nome da saga, seções do menu e rótulos vindos de configuração. Hoje ele tem "Ciclo de Jesed" fixo em 33 pontos. |
| `app/shared/*` (galeria, personagens, relações, mapas, temas, música, feedback beta, sistema visual, perfis de desempenho) | Usados como estão. |
| `data/common/schema.js` | Mesmas coleções (personagens, capítulos, lugares, linha do tempo, etc.). |
| `sync_book_assets.py` + `PUBLICAR_IMAGENS.cmd` | Ganham a descoberta de capa, logos, personagens, lugares e capítulos nas pastas novas (etapa 5). |

### O que é novo

```text
app/shared/book-engine/                      motor único (derivado de Herdeiros)
app/sagas/<saga>/books/<livro>/              só tema (styles.css) e efeitos (experience.js)
data/sagas/<saga>/books/<livro>/             conteúdo, gerado dos capítulos e do canon (etapa 4)
data/common/sagas-registry.json              sagas, livros, status, capas, paletas (criado agora)
assets/books/<saga>/<livro>/                 cover.webp, chapters/, characters/, places/ (convenção já documentada)
assets/branding/<saga>/                      marca e logos
a-lenda-da-aurora.html                       entradas na raiz, com o slug do livro
a-patrulha-de-korvo.html
os-elos-das-sombras.html
a-alvorada-das-ilusoes.html
```

### Portal
- Rota nova `#/saga/<id>`; `#/books` continua apontando para Ciclo de Jesed (as páginas dos livros já usam esse link).
- Saga com 1 livro aberto ainda mostra a grade completa; os demais aparecem como cards "Em preparação", como Herdeiros das Cinzas e Coração de Poeira hoje.
- Crônicas de Belfex, Mistério Oculto e A União continuam bloqueadas.

### Livros configurados (registro criado)

| Saga | Livro | Status | Capítulos |
|---|---|---|---|
| Spacetheft | 1 · A Lenda da Aurora | **aberto** | 22 |
| Spacetheft | 2 a 6 · Livro N | bloqueado | — |
| Viajantes Dimensionais | 1 · A Patrulha de Korvo | **aberto** | 23 |
| Viajantes Dimensionais | 2 · Livro 2, 3 · O Senhor da Morte, 4 · Livro 4, 5 · Livro 5, 6 · Livro 6 | bloqueados | — |
| Diário Sobrenatural | 1 · Os Elos das Sombras | **aberto** | 38 |
| Diário Sobrenatural | 2 · A Alvorada das Ilusões | **aberto, em desenvolvimento** | 31 arquivos (26 e 28 são rascunhos curtos; 30 e 31 estão vazios) |
| Diário Sobrenatural | 3 · O Limiar da Noite, 4, 5 | bloqueados | — |

Bloqueados seguem o livro 5 de Ciclo de Jesed (Coração de Poeira): nome, ícone, sem capa, "Em preparação". O nome é o que já existe nas pastas; os sem título aparecem como "Livro N".

---

## 2. Guias laterais (aprovados)

| Saga | Guias |
|---|---|
| Spacetheft | Início · Livros · Capítulos · Linha do Tempo · Personagens · Lugares · Galeria |
| Viajantes Dimensionais | Início · Livros · Capítulos · Linha do Tempo · **Mapa** · Personagens · Lugares · Galeria (a Galeria é suposição: sua lista terminava em "Lugares,") |
| Diário Sobrenatural | mesma lista do Spacetheft; o filtro por **narrador** fica dentro de Capítulos e de Personagens |

Seções do canon que ficaram de fora do menu (Povos e Facções, Criaturas, Tecnologia/Magia/Elos, Cultura, Glossário, Mistérios) podem entrar depois como abas dentro de Lugares e Personagens, sem mudar o menu. Regras herdadas: só entra o que está **escrito** nos capítulos (AI_UPDATE_RULES). O "Guia de Voz e Estilo" do Diário é ferramenta de autoria e não será publicado.

---

## 3. Tema, cores e efeitos

Cada saga tem identidade própria, tirada da capa do livro 1. Todos usam os perfis Completo, Equilibrado e Desempenho, respeitam movimento reduzido e usam chaves de preferência separadas por livro (`di-<livro>-…`). Sem bibliotecas externas e sem fontes baixadas: pilhas de fontes do sistema.

### Spacetheft — "Carta estelar"
- **Cores:** noite-índigo `#090521`, ultramarino `#1a0f5c`, magenta `#d23fa5`, brasa `#ff8a2a`, ouro `#e9b44c` (a bússola e o autor na capa), texto lavanda `#f3ecff`.
- **Superfície:** tema escuro; cartões de vidro índigo com fio dourado, como carta de navegação. Menu lateral com bússola dourada.
- **Efeitos:**
  - campo de estrelas em paralaxe e nebulosas à deriva (reuso do portal);
  - vórtice espiral girando devagar atrás do herói da página;
  - o galeão pirata cruza o céu de tempos em tempos;
  - estrelas cadentes raras;
  - transição entre páginas em "salto hiperespacial" (riscos de luz);
  - Contemplar este mundo: viagem pelas estrelas com a nave.

### Viajantes Dimensionais — "Portais e fraturas" (ciano e brilho de portal em primeiro plano)
- **Cores:** ciano do portal `#46d3f2` e `#9cf0ff` como cor dominante, petróleo `#0b2433`, âmbar `#f2922e` só como contraste, creme `#fff0d2`, raiz escura `#1c2733`.
- **Textura de desenho:** contorno grosso de tinta, sombra dura deslocada, cantos levemente tortos, papel granulado nos cartões e retícula de pontos ciano no fundo, como ilustração de livro infantojuvenil.
- **Superfície:** menu lateral petróleo com borda de luz ciano; item ativo em ciano cheio; cartões creme com contorno de tinta.
- **Efeitos:**
  - portal oval ciano grande, pulsando e soltando energia ao redor da capa (o componente `dimension-portal` já existe no portal);
  - brilho ciano que vaza do portal para a página inteira, mais partículas de luz ciano;
  - fagulhas âmbar correndo pelos trilhos curvos;
  - raízes escuras que brotam nas bordas do portal;
  - transição entre páginas em ondulação ciano ("passar pela Quarta Dimensão");
  - Contemplar este mundo: passeio pelos trilhos com esferas de luz.

### Diário Sobrenatural — "Diário oculto"
- **Cores (livro 1, Os Elos das Sombras):** preto-tinta `#0c0807`, brasa `#d4501e`, entardecer `#6e2414`, papel `#eadfc9`, vela `#f2b765`.
- **Superfície:** fundo escuro; cartões como páginas de diário em papel, com pauta fina e anotações em letra manuscrita (fonte cursiva do sistema). Cada narrador tem uma cor de destaque nas etiquetas de capítulo: Junior, Priscila, Pedro, Kelly, Vini e Jennifer (no livro 2 entram Glenda e Filipo).
- **Efeitos:**
  - luz que falha e volta, ligada ao capítulo 1 ("Não Apague as Luzes");
  - tentáculos de tinta preta que rastejam das bordas e recuam ao passar o mouse;
  - poeira na luz de lâmpada e grão leve de filme de 2002;
  - **Lanterna** (opcional, desligada por padrão): o escuro cobre a tela e a luz segue o cursor;
  - transição de página como virar de folha.
- **Livro 2, A Alvorada das Ilusões:** mesma base, paleta de amanhecer `#120d14`, ouro-aurora `#e6b567`, névoa violeta `#7b5a8f`, rosa `#c97a6b`. Efeito próprio: miragem (leve ondulação do ar sobre os cartões) no lugar das tintas.

---

## 4. Decisões

1. **Título do Viajantes 1:** em aberto por enquanto. Os modelos usam "A Patrulha de Korvo" (pastas e manuscrito); a capa diz "A Ascensão de Korvo".
2. **Livros bloqueados:** resolvido. Só os livros abertos têm página; os demais seguem o livro 5 de Ciclo de Jesed (nome e ícone, sem capa, "Em preparação").
3. **Diário 2:** a capa já está em `02 - Assets/Capas/` do livro.
4. **Viajantes 1, capítulos 22 e 23:** sem título nos arquivos; aparecem como "Capítulo 22" e "Capítulo 23" até você nomeá-los.
5. **Frases de apresentação das sagas:** propostas minhas, editáveis.
6. **Galeria em Viajantes:** incluída por suposição.

## 5. Etapa 2 (modelos)

Quatro imagens da página inicial, em `docs/mockups-etapa-2/`: Spacetheft 1, Viajantes 1, Diário 1 e Diário 2. Capas, logos e retratos são os reais; textos e números são provisórios.
