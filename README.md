# Dimensões Infinitas — site pessoal

Versão estrutural: **0.17.1 — Etapa 16 concluída, organização 0.17 preservada e cânone linguístico sincronizado**.

## Atualização 0.17.1 — reforma linguística

- nomes visíveis de *Ruínas dos Céus*, *Guerras de Sangue* e *Dinastia Polar* sincronizados com a reforma linguística do repositório canônico;
- IDs, slugs e caminhos históricos preservados para compatibilidade;
- grafia canônica atual: Raukhar, Nadirion, Aeloris, Yrisea, Taliver, Nivelia, Gabasteri, Maletar, Mariv, Marken, Alestir, Braedar, Lusdar e Lushara;
- etimologias oficiais de Nadirion, Aeloris, Kaendar e khar- incorporadas às fichas existentes;
- regras internas e validador atualizados para impedir regressões de grafia.

## Correção 0.16.1

- corrigido o breadcrumb de páginas detalhadas de *Ruínas dos Céus*, removendo o link inválido “Arquivo”;
- capítulos agora regressam corretamente para `#/capitulos`;
- navegação entre capítulos posiciona o capítulo anterior à esquerda e o próximo à direita;
- contraste noturno revisto por superfície, incluindo cartões da Linha do Tempo;
- restaurada a camada visual compartilhada exigida por *Guerras de Sangue*;
- o fundo escuro de *Guerras de Sangue* agora acompanha toda a altura do conteúdo;
- nenhum push foi realizado no GitHub.

## Entradas públicas

- `index.html` — portal de Dimensões Infinitas.
- `ruinas.html` — *Ruínas dos Céus*.
- `guerras.html` — *Guerras de Sangue*.

Esses arquivos permanecem na raiz para preservar os endereços publicados. Código, dados e experiências visuais ficam organizados por saga e livro.

## Arquitetura

```text
app/
├── portal/
├── shared/
│   ├── book-music/
│   ├── experience/
│   ├── maps/
│   ├── characters/
│   ├── social/
│   ├── themes/
│   └── gallery/
└── sagas/
    └── ciclo-de-jesed/
        └── books/
            ├── ruinas-dos-ceus/
            │   └── experience/
            └── guerras-de-sangue/
                └── experience/

data/
├── common/
└── sagas/
    └── ciclo-de-jesed/
        ├── audits/
        └── books/
            ├── ruinas-dos-ceus/
            └── guerras-de-sangue/
```

Padrão para novos livros:

- interface: `app/sagas/<saga>/books/<livro>/`;
- experiência visual específica: `app/sagas/<saga>/books/<livro>/experience/`;
- conteúdo: `data/sagas/<saga>/books/<livro>/`;
- módulos reutilizáveis: `app/shared/`;
- auditorias da saga: `data/sagas/<saga>/audits/`.

## Instalação

Extraia o pacote completo sobre a pasta do site. Esta entrega contém os mapas usados na Etapa 6 e os assets temporários criados na Etapa 5.5. Ao mesclar no projeto principal, preserve também os demais assets canônicos já existentes.

## Comandos

```bash
npm run validate
npm run audit
npm run serve
```

## Documentação obrigatória

Leia `PLANO-MESTRE-E-HISTORICO.md` antes de alterar o projeto. Ele é a fonte oficial para decisões, etapas concluídas e tarefas futuras.


## Etapas 12 e 13 — Conceitos e Mistérios

- 7 conceitos aprofundados em cada livro;
- conceitos clicáveis também em *Ruínas dos Céus*;
- definição, origem, funcionamento, interpretações, capítulos, personagens, ambiguidades e evolução;
- 5 mistérios aprofundados em cada livro;
- evolução completa das pistas até o encerramento dos livros;
- falsas pistas apenas quando realmente existentes;
- remoção de “Resposta no ponto escrito”.

## Pacote 0.13.1 — melhorias adicionais

- portal de Dimensões Infinitas com viagem contínua por estrelas;
- portais azul-bebê ovais com dispersão de energia;
- música ambiente procedural com controlo de reprodução;
- simulador manual do céu em passos de 10 minutos;
- ciclo automático contínuo de 24 horas em cerca de 10 minutos reais;
- contraste adaptativo para textos durante a noite;
- restauração de assets ausentes e fallbacks temporários;
- correção da página de *Guerras de Sangue*, com remoção da folha CSS duplicada e obsoleta.

A música do portal respeita a política de autoplay dos navegadores: quando a preferência estiver guardada, ela volta depois da primeira interação do usuário.

## Etapas 4 e 5 preservadas

- Linha do Tempo cronológica em A.Q. e D.Q.;
- 30 acontecimentos em *Ruínas dos Céus*;
- 38 acontecimentos em *Guerras de Sangue*;
- 17 lugares e 48 cenas localizadas em *Ruínas dos Céus*;
- 23 lugares e 69 cenas localizadas em *Guerras de Sangue*;
- cinco antigas rotas incorporadas definitivamente a Lugares.

Relatórios:

- `data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json`;
- `data/sagas/ciclo-de-jesed/audits/places-etapa-5.json`.

## Etapa 5.5 — identidade visual e desempenho

### Ruínas dos Céus

- menu de céu, pedra suspensa, fissuras, raízes e fragmentos;
- identidade preservada no menu recolhido;
- três camadas de nuvens;
- amanhecer, dia, entardecer e noite;
- sol e lua com trajetória visual;
- relógio temporário de teste com retorno ao modo automático;
- cartões suspensos, transição de vento e fissuras contextuais;
- modo contemplativo próprio;
- controles específicos com prefixo `di-ruinas-`.

### Guerras de Sangue

- menu histórico, cartográfico e territorial;
- marcas de clã irregulares e contexto da página de clã;
- Canvas traseiro e dianteiro;
- brasas, faíscas, cinzas, poeira quente e turbulência;
- modo contemplativo noturno de Kaendar;
- controles específicos com prefixo `di-guerras-`.

### Sistema comum

- perfis Completo, Equilibrado, Desempenho e Personalizado;
- estado visível do modo desempenho;
- preferências globais separadas das preferências de cada livro;
- respeito a movimento reduzido, economia de dados, aba oculta e dispositivos mais fracos;
- ausência de bibliotecas externas novas;
- controles de áudio, desempenho e configurações agrupados no extremo direito;
- suporte a desktop e dispositivos móveis.

Relatório:

`data/sagas/ciclo-de-jesed/audits/visual-etapa-5-5.json`

Recursos temporários:

`docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`

Capturas de revisão:

`docs/screenshots/`

## Etapa 6 — mapas interativos

### Ruínas dos Céus

- dois mapas separados: Etérea e A Superfície;
- 17 lugares localizados;
- textos de contexto integrados às imagens;
- zoom, deslocamento, centralização, nomes, pins e fichas rápidas;
- funcionamento em desktop e dispositivos móveis.

### Guerras de Sangue

- 23 lugares localizados;
- cinco rotas preservadas como lugares geográficos;
- camada visual das rotas;
- sete categorias estratégicas com duas ou mais informações;
- zoom, deslocamento, centralização, nomes, pins e fichas rápidas.

### Ajustes associados

- botões de capítulo anterior e seguinte movidos para o topo em *Guerras de Sangue*;
- navegação equivalente criada em *Ruínas dos Céus*;
- Personagens em foco agora mostram apenas figuras principais, sem estado e com descrição de até quatro palavras.

Relatório:

`data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json`

Capturas de revisão:

`docs/screenshots/etapa-6/`

## Etapa 7 — páginas iniciais e inventário de imagens

- os caminhos de branding, capítulos, personagens e mapas foram alinhados ao inventário WebP fornecido pelo autor;
- o inventário completo foi incorporado em `data/common/assets-manifest.json`;
- *Ruínas dos Céus* possui quatro cartões internos em uma linha no desktop: Personagens, Relações, Linha do Tempo e Capítulos;
- *Guerras de Sangue* usa a mesma estrutura orientadora;
- a seção Últimos capítulos foi removida dos dois livros;
- os dois livros receberam uma seção Lugares com seis cartões fotográficos e ligações para as fichas;
- *Ruínas dos Céus* recebeu prévias separadas dos mapas de Etérea e da Superfície;
- *Guerras de Sangue* mantém o mapa grande e exibe as sete categorias estratégicas como atalhos resumidos;
- nenhuma informação canônica ou ID foi alterado.

Relatório:

`data/sagas/ciclo-de-jesed/audits/home-assets-etapa-7.json`

Validação da Etapa 7:

- nenhuma referência activa com `.png`, `.jpg` ou `.jpeg`;
- nenhum caminho de imagem sem correspondência no inventário ou nos recursos temporários documentados;
- zero exceções nas duas páginas iniciais;
- layout sem scroll horizontal a 390 píxeis.

## Etapa 8 — personagens

- os dois livros possuem pesquisa própria de personagens;
- os dois livros alternam entre cartões grandes e lista compacta;
- a preferência de visualização é preservada separadamente por livro;
- cartões grandes mostram retrato, nome, subtítulo simples e descrição curta;
- a lista compacta mantém acesso rápido e mais personagens visíveis;
- as páginas receberam frases-guia específicas para cada livro;
- os subtítulos dos cartões de *Ruínas dos Céus* deixaram de parecer tags;
- a ficha de Ruínas não apresenta mais o campo redundante Aparições;
- todos os capítulos da Trajetória possuem texto específico sobre a ação do personagem;
- os capítulos da Trajetória continuam clicáveis;
- as 15 imagens disponíveis de Ruínas e as 42 imagens disponíveis de Guerras foram ligadas;
- a segunda imagem de Orionus é exibida como retrato alternativo;
- Eshvar, Maedra e Capitão Lirron permanecem sem imagem porque o inventário não contém retratos para eles.

Relatório:

`data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json`

Capturas de revisão:

`docs/screenshots/etapa-8/`


## Etapa 9 — relações, família, organizações e atmosfera com imagens

### Relações

- *Ruínas dos Céus* recebeu oito tipos visuais de relação: família, amizade, proteção, influência, conflito, rivalidade, lealdade e relação rompida;
- o mapa usa linhas coerentes com a legenda;
- doze relações possuem os dois personagens, tipo, estado, descrição, perspectivas e evolução;
- os personagens são clicáveis;
- *Guerras de Sangue* preserva o mapa e as relações já existentes, agora com legenda visual equivalente.

### Família e organizações

- *Ruínas dos Céus* exibe somente a família **Os Amaréa**, com Yoral, Mirel, Jokara, Nestira e Loutes como criança acolhida;
- a ficha contém vida familiar, casa em Nivelia, crenças, Sopro e Peso, perda de Yoral, diferenças entre as irmãs, acolhimento de Loutes e importância para a Queda;
- Ruínas possui quatro organizações reais: Oradores da Corrente, Ecoantes, Tecelões de Vento e sobreviventes de Nadirion;
- *Guerras de Sangue* mantém três famílias e três organizações, agora com imagens, função, atuação, temas e membros clicáveis.

### Atmosfera baseada em imagens

- nuvens de Ruínas usam arquivos WebP transparentes em três camadas;
- sol, lua, fragmentos, raízes, menu e modo contemplativo usam imagens rasterizadas locais;
- brasas, faíscas e cinzas de Guerras usam sprites WebP no Canvas, com desenho vetorial apenas como fallback técnico;
- menus, poeira, fumaça, reflexo metálico, mapas e cartões de lugares receberam texturas WebP;
- todos os SVG atmosféricos anteriores foram removidos;
- nenhuma dependência externa foi adicionada;
- se uma imagem opcional falhar, gradientes, cores e desenho de fallback mantêm o site funcional.

### Catálogo obrigatório de imagens

A lista exata das imagens que podem ser substituídas pelas artes definitivas está em:

`docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`

A versão para leitura por máquinas está em:

`data/common/image-requirements-etapa-9.json`

Cada entrada informa caminho, nome, pasta, dimensão, transparência e função. Para substituir, basta conservar o mesmo caminho e nome do arquivo WebP.

Relatório:

`data/sagas/ciclo-de-jesed/audits/social-etapa-9.json`

Capturas:

`docs/screenshots/etapa-9/`

## Etapa 10 — clãs

- os oito clãs de *Guerras de Sangue* possuem fichas orientadoras completas;
- cada ficha apresenta origem, território, cultura, economia, modo de vida, estrutura social e alimentação;
- população e força militar aparecem como estimativas explicitamente identificadas;
- relações políticas são exibidas em cartões próprios, incluindo a perspectiva registrada pelo outro clã quando necessário;
- forças, fragilidades, participação na guerra e situação ao final do livro foram organizadas em blocos distintos;
- personagens do clã aparecem depois dos textos, em uma faixa horizontal de cartões com fotografia, nome e função;
- Alimentos, Fauna e Flora possuem seções independentes com imagens e links para as fichas;
- o antigo bloco genérico “Lore relacionada” foi removido;
- todo o conteúdo aprofundado anterior foi preservado como Arquivo aprofundado do clã, organizado em grupos recolhíveis;
- os Fendelar continuam sem brasão formal; a marca usada pela interface permanece neutra e não canônica;
- os placeholders de alimentos, fauna e flora garantem que imagens ausentes não produzam erro visual.

Arquivos principais:

- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/clans.js`;
- `app/shared/clans/presentation.css`;
- `data/sagas/ciclo-de-jesed/audits/clans-etapa-10.json`.

Capturas:

`docs/screenshots/etapa-10/`

## Etapa 11 — fauna, flora, alimentos, ciclo celeste e sinopses

- 18 itens de fauna, flora e alimentos de *Ruínas dos Céus* foram estruturados em cartões e fichas individuais;
- 291 itens de *Guerras de Sangue* foram recontados e enriquecidos;
- foram localizadas 612 citações: 149 em *Ruínas dos Céus* e 463 em *Guerras de Sangue*;
- cada citação possui capítulo, trecho, contexto curto e ligação para o capítulo;
- singular, plural, acentos, hífens, aliases e nomes indiretos foram considerados;
- a Fera do primeiro livro usa a grafia canônica **Raukhar**, preservando o ID `jesed-fauna-raukhar` e o slug histórico `raukhar`;
- as listagens mostram somente imagem, nome, descrição breve e total de citações;
- as fichas mostram descrição completa, características, habitat, usos, relações com povos ou clãs quando aplicável e lista integral de menções;
- filtros visíveis foram removidos de fauna, flora e alimentos em Ruínas e de Conceitos nos dois livros;
- ordenação A–Z, por citações e exportação de itens não citados foram preservadas onde aplicáveis;
- o céu de Ruínas não acompanha a hora real: completa um ciclo de 24 horas em aproximadamente 10 minutos reais;
- o simulador temporário altera imediatamente horário, fase, sol, lua e iluminação;
- ao retornar ao ciclo automático, ele continua a partir do horário selecionado;
- as páginas de Livros agora exibem sinopses editoriais completas, divididas em três parágrafos, nos dois livros.

Arquivos principais:

- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/lore-stage11.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/lore-stage11.js`;
- `data/sagas/ciclo-de-jesed/audits/lore-etapa-11.json`.

Capturas:

`docs/screenshots/etapa-11/`

## Etapas 12 e 13 — conceitos, mistérios e melhorias adicionais

- os Conceitos dos dois livros possuem fichas individuais com definição, origem, funcionamento conhecido, interpretações, ambiguidades e evolução;
- os Mistérios acompanham a narrativa completa, desde as primeiras pistas até a revelação ou estado final;
- a tela de Dimensões Infinitas recebeu avanço estelar, portais azul-bebê e música procedural;
- o relógio manual de Ruínas avança em passos de dez minutos e o contraste noturno adapta a leitura;
- a folha visual duplicada de Guerras de Sangue foi removida e os recursos disponíveis foram restaurados.

Relatório:

`data/sagas/ciclo-de-jesed/audits/concepts-mysteries-etapa-13.json`

## Etapa 14 — temas

- cada livro possui dez temas com cartões interativos e páginas próprias;
- as fichas apresentam descrição, pergunta central, desenvolvimento, personagens, lugares, capítulos, acontecimentos, símbolos e evolução;
- os temas de *Ruínas dos Céus* incluem Peso e Sopro, queda, tradição, fé, família, destino, natureza, memória, sacrifício e reconstrução;
- os temas de *Guerras de Sangue* incluem paz, fome, justiça, herança, identidade, verdade, destino, alianças, desigualdade e repetição;
- interpretações ambíguas permanecem explicitamente abertas, sem converter leitura temática em resposta canônica absoluta.

Arquivos principais:

- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/themes.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/themes.js`;
- `app/shared/themes/presentation.css`.

## Etapa 15 — galerias

- *Ruínas dos Céus* recebeu uma galeria completa e *Guerras de Sangue* foi padronizada pelo mesmo sistema;
- os filtros são gerados apenas para categorias realmente presentes;
- Guerras preserva a categoria exclusiva de clãs e emblemas;
- o visualizador abre a imagem em tela cheia, sobre fundo escuro, sem navegar para outra página;
- há botões de fechar, anterior e seguinte, setas do teclado, tecla Esc, contador e legenda;
- anterior e seguinte respeitam o filtro ativo;
- imagens ausentes são retiradas dos cartões e da navegação automaticamente;
- placeholders temporários repetidos não entram na galeria; Flora, Alimentos e Conceitos surgirão como filtros quando receberem arte própria.

Arquivos principais:

- `app/shared/gallery/gallery.js`;
- `app/shared/gallery/gallery.css`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/gallery.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/gallery.js`;
- `data/sagas/ciclo-de-jesed/audits/themes-galleries-etapa-14-15.json`.

## Próxima etapa

**Etapa 16 — Padronização visual e responsividade.**


## Inventário de assets

A versão 0.15.1 usa `data/common/inventario-pasta-assets.csv` como fonte de verdade para nomes, extensões e pastas. As galerias só registam imagens presentes nesse inventário. Ao substituir a pasta `assets`, preserve exactamente maiúsculas, acentos, espaços e extensões indicados no CSV.

## Organização de imagens — 0.17.0

As imagens do site ficam exclusivamente em `assets/`, em **WebP** e com nomes ASCII em `kebab-case`.
A estrutura principal é `assets/books/ciclo-de-jesed/<livro>/<categoria>/`, com recursos compartilhados em `assets/books/ciclo-de-jesed/shared/` e elementos de interface em `assets/shared/`.

Para importar ou normalizar novas imagens, execute:

```bash
python scripts/migrate_assets.py
npm run validate:all
```
