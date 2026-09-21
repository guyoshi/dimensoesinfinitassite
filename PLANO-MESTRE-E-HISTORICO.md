# Plano Mestre e Histórico de Atualizações — Dimensões Infinitas

> **Documento obrigatório para qualquer IA ou pessoa que continue o desenvolvimento do site.**  
> Este arquivo reúne: decisões do autor, escopo completo, ordem das etapas, estado atual, regras de trabalho, tarefas concluídas, tarefas pendentes e o modelo que deve ser atualizado ao encerrar cada etapa.

---

## 1. Identificação do projeto

- **Projeto:** Dimensões Infinitas
- **Saga em desenvolvimento no site:** Ciclo de Jesed
- **Livros atualmente disponíveis:**
  - *Ruínas dos Céus* — Livro I — 24 capítulos — concluído.
  - *Guerras de Sangue* — Livro II — 29 capítulos — concluído.
- **Versão estrutural atual:** Etapa 16 concluída, com correções de navegação, contraste e carregamento visual — pacote 0.16.1.
- **Última atualização deste documento:** 20 de setembro de 2026.

---

## 2. Como este documento deve ser usado

Antes de modificar qualquer arquivo, a IA deve:

1. Ler este documento por completo.
2. Verificar qual é a **próxima etapa pendente**.
3. Trabalhar somente sobre o arquivo ou pasta mais recente enviado pelo autor.
4. Não pesquisar nem alterar o GitHub, salvo pedido explícito do autor.
5. Não repetir uma tarefa já concluída, a menos que seja necessário corrigir regressão.
6. Respeitar as decisões mais recentes deste documento quando houver conflito com versões antigas.
7. Ao concluir a etapa, atualizar:
   - o estado da etapa;
   - a data de conclusão;
   - os arquivos alterados;
   - os arquivos criados;
   - os arquivos removidos;
   - as validações realizadas;
   - os problemas conhecidos;
   - a próxima etapa recomendada.
8. Atualizar também o `README.md` quando a estrutura, instalação, navegação ou comandos mudarem.
9. Devolver **a pasta completa do site**, e não somente os arquivos alterados, salvo pedido contrário.

Este arquivo substitui históricos, relatórios e listas de tarefas separados. Não devem ser criados novos arquivos de progresso concorrentes.

---

## 3. Protocolo obrigatório de trabalho

### 3.1. Fonte de trabalho

- O autor enviará a versão mais recente da pasta do site.
- Essa pasta enviada será a fonte de trabalho da etapa.
- Não usar uma cópia antiga do projeto.
- Não buscar uma versão no GitHub quando o autor já enviou o arquivo mais recente.
- O GitHub será atualizado manualmente pelo autor depois de receber e testar o pacote.

### 3.2. Assets

- Pacotes intermediários podem não conter a pasta `assets`.
- Quando os assets não estiverem presentes:
  - preservar os caminhos existentes;
  - não apagar referências de imagem apenas porque o arquivo não está no pacote;
  - registrar imagens ausentes como aviso, não como erro destrutivo;
  - preparar as ligações para serem conferidas quando a pasta completa for reunida ao GitHub.

### 3.3. Entrega

Ao final de cada etapa, entregar:

- a pasta completa do site em ZIP;
- este documento atualizado;
- `README.md` atualizado, quando necessário;
- validação de sintaxe e integridade;
- nenhuma alteração direta no GitHub.

### 3.4. Limpeza

- Remover arquivos obsoletos apenas depois que seus dados e funções forem migrados.
- Não manter scripts corretivos temporários quando a correção já estiver integrada ao código definitivo.
- Não manter históricos duplicados.
- Não apagar IDs, imagens, dados canônicos ou redirecionamentos ainda necessários.

---

## 4. Princípios gerais do site

### 4.1. Paridade entre os livros

*Ruínas dos Céus* e *Guerras de Sangue* devem ter o mesmo peso no site. *Guerras de Sangue* não pode parecer o único livro principal.

Os dois livros devem compartilhar, quando fizer sentido:

- profundidade de conteúdo;
- qualidade visual;
- modos de visualização;
- pesquisa;
- cartões interativos;
- páginas individuais;
- mapas interativos;
- ligações entre entidades;
- acessibilidade e responsividade.

Categorias incompatíveis não devem ser forçadas. Exemplo: *Ruínas dos Céus* não deve receber clãs apenas para imitar *Guerras de Sangue*.

### 4.2. IDs e compatibilidade

- IDs existentes são permanentes.
- Não renomear IDs porque o nome visível mudou.
- Não reutilizar ID removido.
- Preservar slugs e rotas antigas por redirecionamentos.
- Favoritos, anotações e histórico futuro dependerão desses IDs.

### 4.3. Conteúdo canônico

- Usar somente os livros, documentos de lore e decisões explícitas do autor.
- Não inventar precisão quando o texto não oferece precisão.
- Estimativas solicitadas pelo autor, como população, podem ser criadas com bom senso e marcadas como estimadas.
- Informação de livro futuro não deve entrar na lente dos dois primeiros livros se não tiver sido citada neles.

### 4.4. Interface

- Manter identidade própria de cada livro.
- Corrigir sempre texto claro sobre fundo claro.
- Manter responsividade.
- O botão de modo de desempenho deve permanecer acessível e indicar visualmente se está ligado ou desligado.
- *Ruínas dos Céus* deve manter efeitos de nuvens.
- *Guerras de Sangue* deve manter partículas atrás e à frente do conteúdo.

---

# 5. Estado geral das etapas

| Etapa | Nome | Estado | Conclusão |
|---|---|---|---|
| 1 | Estrutura comum dos dois livros | **CONCLUÍDA** | 21/06/2026 |
| 2 | Remover, fundir e reorganizar seções | **CONCLUÍDA** | 21/06/2026 |
| 3 | Auditoria canônica completa e organização escalável | **CONCLUÍDA** | 21/06/2026 |
| 4 | Nova Linha do Tempo | **CONCLUÍDA** | 21/06/2026 |
| 5 | Lugares e rotas | **CONCLUÍDA** | 21/06/2026 |
| 5.5 | Identidade visual, atmosfera, modo contemplativo e desempenho | **CONCLUÍDA** | 21/06/2026 |
| 6 | Mapas interativos | **CONCLUÍDA** | 21/06/2026 |
| 7 | Páginas iniciais | **CONCLUÍDA** | 21/06/2026 |
| 8 | Personagens | **CONCLUÍDA** | 21/06/2026 |
| 9 | Relações, família, organizações e atmosfera com imagens | CONCLUÍDA | 21/06/2026 |
| 10 | Clãs | **CONCLUÍDA** | 21/06/2026 |
| 11 | Fauna, flora e alimentos | **CONCLUÍDA** | 21/06/2026 |
| 12 | Conceitos | **CONCLUÍDA** | 21/06/2026 |
| 13 | Mistérios | **CONCLUÍDA** | 21/06/2026 |
| 14 | Temas | **CONCLUÍDA** | 21/06/2026 |
| 15 | Galerias | **CONCLUÍDA** | 21/06/2026 |
| 16 | Padronização visual e responsividade | PENDENTE | — |
| 17 | Limpeza técnica final | PENDENTE | — |
| 18 | Validação final | PENDENTE | — |

---

# 6. Etapas concluídas

## Etapa 1 — Estrutura comum dos dois livros

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026

### Objetivo

Padronizar internamente os dados de *Ruínas dos Céus* e *Guerras de Sangue* antes de alterar o visual.

### Estrutura criada

```text
data/
├── common/
│   └── schema.js
├── ruinas-dos-ceus/
│   ├── book.js
│   ├── characters.js
│   ├── relationships.js
│   ├── places.js
│   ├── chapters.js
│   ├── timeline.js
│   ├── mysteries.js
│   ├── themes.js
│   ├── fauna.js
│   ├── flora.js
│   ├── foods.js
│   ├── concepts.js
│   ├── gallery.js
│   └── index.js
└── guerras-de-sangue/
    └── mesmos arquivos
```

> **Nota de arquitetura:** a simetria de coleções criada na Etapa 1 foi preservada, mas os diretórios foram relocados na Etapa 3 para `data/sagas/ciclo-de-jesed/books/<livro>/`, permitindo escalar o projeto para várias sagas e livros.

### O que foi feito

- Criada estrutura física simétrica para os dois livros.
- Criadas coleções equivalentes para:
  - personagens;
  - relações;
  - lugares;
  - capítulos;
  - Linha do Tempo;
  - mistérios;
  - temas;
  - fauna;
  - flora;
  - alimentos;
  - conceitos;
  - galeria.
- Preservados os IDs de *Guerras de Sangue*.
- Criados IDs determinísticos para dados antigos de *Ruínas dos Céus*.
- Preservados campos antigos ainda usados pelo runtime de *Ruínas dos Céus*.
- Incorporadas atualizações dos antigos arquivos `guerras-4d-*` na estrutura permanente.
- Preservados caminhos de imagens.
- Preparada a base para redirecionamentos e índices por ID e slug.

### Decisão importante

Arquivos com nomes temporários como `guerras-4d-*` não fazem parte da arquitetura definitiva e não devem ser recriados.

---

## Etapa 2 — Remover, fundir e reorganizar seções

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026

### Objetivo

Simplificar a estrutura de navegação antes da revisão profunda de conteúdo.

### Removido dos dois livros

- Continuidade.
- Decisões do autor.

### Removido de Guerras de Sangue

- Causa e consequência como seção independente.
- Rotas como seção independente.
- Pacote de cena.

Causas e consequências continuam permitidas dentro das páginas individuais dos acontecimentos.

### Fusão realizada

- Acontecimentos e Linha do Tempo foram fundidos.
- A única seção visível passou a ser **Linha do Tempo**.
- Páginas individuais de acontecimentos foram preservadas.

### Rotas migradas para Lugares

As seguintes rotas foram convertidas em lugares:

- Rio Grande;
- Garganta de Kaendar;
- Garganta Seca;
- Estrada dos Grãos;
- Marcha oculta da aliança.

Os IDs anteriores foram preservados.

### Redirecionamentos criados

Em *Guerras de Sangue*:

- `events` → `timeline`
- `event/*` → página individual na Linha do Tempo
- `acontecimentos` → `timeline`
- `consequences` → `timeline`
- `routes` e `rotas` → `places`
- `route/*` e `rota/*` → `place/*`

Em *Ruínas dos Céus*:

- `acontecimentos` → `linha`
- `events` → `linha`
- `timeline` → `linha`
- `consequencias` → `linha`

### Limpeza realizada

Foram removidos arquivos e resíduos temporários, incluindo:

- scripts corretivos de etapas antigas;
- `etapa4d-ui.js`;
- `ruinas-bridge.js`;
- relatórios antigos;
- históricos duplicados;
- notas intermediárias de extração não usadas;
- estilos exclusivos de seções removidas;
- partes antigas não carregadas do runtime.

### Validação registrada

- *Ruínas dos Céus*: 24 capítulos, 17 lugares e 14 registros da Linha do Tempo.
- *Guerras de Sangue*: 29 capítulos, 23 lugares e 31 registros da Linha do Tempo.
- Redirecionamentos antigos validados.
- Estrutura comum mantida.

---

# 7. Etapas de trabalho — especificação completa

## Etapa 3 — Auditoria canônica completa e organização escalável

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026

### Objetivos cumpridos

- Auditar os dados-base dos dois livros antes das páginas profundas.
- Reorganizar todo o código e conteúdo para permitir várias sagas e dezenas de livros.
- Manter os três endereços públicos atuais sem arquivos de livro espalhados na raiz.

### Nova arquitetura

- A raiz mantém apenas `index.html`, `ruinas.html`, `guerras.html`, documentação, `.nojekyll` e `package.json`.
- Código de interface foi movido para `app/`.
- Código compartilhado foi movido para `app/shared/`.
- Cada livro passou a ocupar `app/sagas/ciclo-de-jesed/books/<livro>/`.
- Cada conjunto de dados passou a ocupar `data/sagas/ciclo-de-jesed/books/<livro>/`.
- O manifesto de IDs foi movido para `data/common/entity-manifest.json`.
- O relatório interno da auditoria foi criado em `data/sagas/ciclo-de-jesed/audits/canonical-etapa-3.json`.

### Correções canônicas aplicadas

Em *Ruínas dos Céus*:

- Capítulo 11: `Sobrevivência`.
- Capítulo 12: `O Homem no Riacho`.
- Capítulo 15: `O Peso do Silêncio`.
- Capítulo 21: `A Leveza e o Peso`.
- Capítulo 24: `O Vale`.
- A criatura conhecida no Livro I apenas como a Fera passou a ser exibida como **Rhaukar**.
- O ID `jesed-fauna-raukhar` e o slug `raukhar` foram preservados para não quebrar links.

Em *Guerras de Sangue*:

- A verdade da morte de Orionus foi confirmada e preservada: Ylvena pretendia envenenar Alyra com Beijo-da-Noite, Orionus bebeu por engano e Daryon destruiu provas e fabricou a inocência de Ylvena.
- Resumos que terminavam no meio de uma frase deixaram de exibir truncamentos abruptos. O aprofundamento completo permanece nas etapas próprias de personagens, clãs e lore.

### Auditoria de imagens e cobertura

- Identificados 15 arquivos de personagens e 17 de lugares de *Ruínas dos Céus*.
- Identificados 43 arquivos de personagens e 18 de lugares de *Guerras de Sangue*.
- Registrados aliases de arquivos para conferência futura: Monthar/Malthar, Prof Talver/Professor Talver, Asteiro/Alesteiro, Lurak/Lurok, Maela/Maelis e variações de Iressa.
- As ligações definitivas aos assets permanecem para quando a pasta `assets` for reunida ao projeto.

### Limitação registrada

O DOCX de *Guerras de Sangue* disponível nesta etapa é uma versão antiga, com capítulos escritos até 14 e resumos posteriores. Ele não pode substituir os dados finais dos 29 capítulos. Os capítulos finais permanecem baseados no conteúdo já consolidado no site e nas decisões mais recentes do autor.

### Arquivos removidos da raiz

Foram retirados da raiz todos os scripts e estilos específicos de livros e do portal, incluindo os antigos `ruinas-*`, `app.js`, `styles.css`, `portal.js`, `portal.css`, `portal-data.js` e arquivos soltos do reprodutor musical. Eles continuam no projeto em suas novas pastas definitivas.

### Validação

- Sintaxe JavaScript validada.
- Referências de HTML validadas.
- IDs e slugs históricos preservados.
- Redirecionamentos da Etapa 2 preservados.
- Ausência da pasta `assets` tratada apenas como aviso.

---

## Etapa 4 — Nova Linha do Tempo

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026  
**Versão do pacote:** 0.8.0

### Objetivo executado

Transformar Acontecimentos e Linha do Tempo numa cronologia histórica real de Jesed, organizada pela data em que cada fato ocorreu e não pela ordem dos capítulos.

### Sistema temporal implantado

- **A.Q. — Antes da Queda**.
- **D.Q. — Depois da Queda**.
- A Queda de Etérea funciona como marco cronológico zero.
- O tempo é contado em **ciclos**, nunca em anos.
- Os meses são ordinais: `1º Mês`, `2º Mês`, `3º Mês` etc.
- Nenhuma data diária foi inventada.
- Datas sem precisão canônica aparecem explicitamente como aproximadas.
- A ordenação usa um `sortKey` numérico oculto, sem depender da leitura do texto visível.

### Decisão sobre Guerras de Sangue

O livro confirma que a guerra ocorre mais de duzentos ciclos D.Q., mas não fornece um ciclo absoluto seguro. Por isso:

- os acontecimentos da narrativa usam **Ciclo da guerra**;
- os meses são estimativas narrativas e aparecem como aproximados;
- acontecimentos anteriores usam relações como “40 ciclos antes da guerra” ou “logo após a morte de Orionus”;
- não foi inventado um número absoluto para o reinado de Orionus, a morte dele ou o exílio de Ylvena.

### Conteúdo criado e atualizado

#### Ruínas dos Céus

A Linha do Tempo passou a conter **30 acontecimentos**, incluindo:

- origem esquecida de Etérea;
- ensinamentos e morte de Yoral;
- exílio de Gabasteres;
- primeiros sinais da Queda;
- nuvem cinzenta;
- profecia e exílio de Yndra;
- confirmação de Talver;
- Queda de Etérea;
- primeiro fogo;
- pegadas e comida roubada;
- incêndio do abrigo;
- reencontro das irmãs;
- entrada de Gabasteres no grupo;
- chegada de Platisa;
- retorno de Malthar;
- origem do nome Polar;
- desaparecimento das reservas;
- ataque do Rhaukar;
- revelação das ruínas;
- desaparecimento de Loutes;
- morte de Malthar;
- sacrifício de Jokara;
- morte de Gabasteres e Nestira;
- chegada de Marv ao Vale.

Todos os acontecimentos possuem descrição, contexto, causa e consequências. Eventos com versões falsas ou incompletas distinguem **Versão pública** de **O que realmente aconteceu**.

#### Guerras de Sangue

A Linha do Tempo passou a conter **38 acontecimentos**, incluindo:

- formação da raiz Polar e de Kaendar;
- ascensão de Orionus;
- execução de Lirron e consolidação da Lei do Portão;
- chegada de Ylvena a Kaendar;
- morte de Orionus;
- exílio de Ylvena e ascensão das gêmeas;
- principais fatos dos 29 capítulos;
- golpe de Kaelina;
- exílio de Alyra;
- desaparecimento de Markoso;
- vinte ciclos posteriores do governo de Kaelina.

A morte de Orionus foi registrada corretamente: Ylvena pretendia envenenar Alyra com Beijo-da-Noite, Orionus bebeu por engano e Daryon destruiu ou falsificou provas para protegê-la.

### Relação entre acontecimento e capítulo

Cada ligação de capítulo informa uma relação específica:

- **Ocorre no Capítulo**;
- **Citado no Capítulo**;
- **Recordado no Capítulo**;
- **Investigado no Capítulo**;
- **Revelado no Capítulo**;
- **Consequência narrada no Capítulo**.

Um acontecimento antigo não aparece como se tivesse ocorrido no capítulo em que sua verdade foi descoberta.

### Interface concluída

Nos dois livros:

- linha vertical e marcadores preservados;
- cartões inteiros clicáveis;
- data, categoria, descrição e relações exibidas sem tags em cápsula;
- capítulos, personagens e lugares clicáveis;
- destaque de hover, foco e seleção;
- seleção persistida ao entrar e voltar da página individual;
- navegação por `Enter` e barra de espaço;
- adaptação responsiva;
- busca integrada à Linha do Tempo.

As páginas individuais apresentam:

- data;
- categoria;
- descrição;
- contexto;
- causa;
- consequências;
- capítulos relacionados e o tipo da relação;
- personagens;
- lugares;
- acontecimentos relacionados;
- versão pública e verdade, quando aplicável.

### Compatibilidade preservada

- IDs históricos mantidos.
- Slugs antigos mantidos ou registrados em `legacySlugs`.
- `events`, `event/*`, `acontecimentos`, `acontecimento/*`, `timeline/*` e demais rotas antigas continuam redirecionando para a Linha do Tempo correta.
- Os slugs antigos dos acontecimentos dos Capítulos 1 a 23 de *Guerras de Sangue* continuam resolvidos.
- Links antigos da morte de Orionus e dos acontecimentos de *Ruínas dos Céus* continuam válidos.

### Arquivos criados

- `data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json`.

### Arquivos atualizados

- `data/common/schema.js`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/timeline.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/timeline.js`;
- páginas e estilos da Linha do Tempo dos dois livros;
- busca de *Ruínas dos Céus*;
- metadados dos dois livros;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`;
- `package.json`.

### Arquivos removidos

- Nenhum. A etapa substituiu os dados da Linha do Tempo dentro dos arquivos permanentes.

### IDs alterados

- **0**.

### Validações realizadas

- sintaxe de todos os arquivos JavaScript;
- ordem crescente de `sortKey`;
- IDs e slugs duplicados;
- capítulos, personagens, lugares e acontecimentos relacionados inexistentes;
- páginas individuais incompletas;
- relações de capítulo inválidas;
- preservação de slugs históricos;
- verdade da morte de Orionus;
- Queda como marco zero;
- referências dos HTMLs;
- carregamento por servidor local com resposta HTTP 200 para `index.html`, `ruinas.html`, `guerras.html` e o relatório da Etapa 4;
- 38 acontecimentos de *Guerras de Sangue* e 30 de *Ruínas dos Céus* confirmados pelo validador.

### Não realizado nesta etapa

- aprofundamento das fichas de lugares;
- inclusão de populações;
- revisão de personagens que passaram por cada lugar;
- mapas e pins;
- ligação definitiva dos assets.

Essas tarefas continuam reservadas para as etapas seguintes.

---

## Etapa 5 — Lugares e rotas

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.0

### Objetivo executado

Padronizar e aprofundar todos os lugares de *Ruínas dos Céus* e *Guerras de Sangue*, incorporar definitivamente as antigas rotas à coleção Lugares e substituir associações genéricas por cenas, personagens e acontecimentos realmente ligados a cada espaço.

### Estrutura comum criada para cada lugar

Quando aplicável, cada ficha agora possui:

- imagem principal ou fallback preparado;
- tipo de lugar;
- região;
- localização dentro do território;
- resumo breve;
- descrição completa em múltiplos parágrafos;
- função narrativa;
- arquitetura ou forma natural;
- clima e atmosfera;
- recursos;
- perigos;
- cultura ou modo de vida;
- população estimada somente quando cabível;
- personagens que passaram pelo lugar;
- capítulos com descrição específica da cena ocorrida ali;
- acontecimentos relacionados da Linha do Tempo.

### Guerras de Sangue

Foram aprofundados **23 lugares**, com **69 cenas localizadas**.

As cinco antigas rotas continuam dentro da coleção Lugares e preservam seus IDs históricos:

- `route-rio-grande` — Rio Grande;
- `route-garganta-kaendar` — Garganta de Kaendar;
- `route-garganta-seca` — Garganta Seca;
- `route-estrada-graos` — Estrada dos Grãos;
- `route-marcha-alianca` — Marcha oculta da aliança.

Foram criadas **12 estimativas de população** somente para cidades, fortalezas, aldeias, acampamentos ou localidades cuja ocupação é narrativamente relevante. Entre elas:

- Kaendar;
- Khar-Tondr;
- Nyn-Harad;
- Velarim, com população atual igual a zero e estimativa histórica;
- Margem dos Zírrios;
- Varkhama;
- Cendar-Vel;
- Urtar-Vesh;
- Acampamento dos Homens das Areias;
- Alesteiro;
- Noreval;
- Nhar-Veyr.

Rios, gargantas, estradas, florestas, regiões agrícolas, túneis, arenas e trajetos militares não exibem população.

### Ruínas dos Céus

Foram aprofundados **17 lugares**, com **48 cenas localizadas**.

A estrutura simplificada anterior foi substituída por fichas equivalentes em profundidade às de *Guerras de Sangue*. Os lugares receberam tipos próprios, como:

- arquipélago suspenso;
- ilha habitada;
- ilha ritual;
- bosque suspenso;
- centro de cura;
- lugar fictício;
- região da superfície;
- assentamento temporário;
- curso de água;
- sítio ancestral;
- região fértil.

Foram criadas **3 estimativas de população ou ocupação**, somente onde a informação é útil:

- Etérea antes da Queda;
- Nivellia antes da Queda;
- Primeiro Abrigo, cuja ocupação varia ao longo da narrativa.

### Personagens que passaram por aqui

O antigo conceito de localização baseada no último estado do personagem deixou de ser usado nas fichas.

A nova seção é:

**Personagens que passaram por aqui**

Os personagens são ligados ao lugar pelas cenas registradas no manuscrito. Cada cartão mostra:

- fotografia ou fallback;
- nome;
- capítulos em que esteve naquele espaço;
- ligação para a ficha individual.

### Capítulos ligados

Os cartões de capítulos não repetem mais o resumo geral do capítulo. Cada ligação descreve somente:

- o que aconteceu naquele lugar;
- quais personagens participaram;
- como o espaço foi utilizado;
- qual mudança narrativa ocorreu ali.

Os cartões são clicáveis e acessíveis por teclado.

### Acontecimentos relacionados

Cada lugar agora cruza seus IDs com a Linha do Tempo da Etapa 4. As fichas exibem os acontecimentos históricos ligados ao espaço, com data, título, resumo e ligação para a página individual.

### Campo Estado

O campo genérico `Estado: Activa` foi removido dos dados enriquecidos de lugares e não é mais usado pela interface.

### População

A população só aparece quando existe uma estimativa coerente. Nenhuma ficha natural recebe mensagens artificiais como “sem população aplicável”. Quando não há população, o campo simplesmente não é exibido.

As estimativas são editoriais, construídas a partir de escala urbana, multidões, número de estruturas, capacidade militar, importância comercial e relatos dos livros. O autor pode ajustá-las posteriormente sem alterar IDs ou estrutura.

### Arquivos criados

- `data/sagas/ciclo-de-jesed/audits/places-etapa-5.json`

### Arquivos alterados

- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/places.js`
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/places.js`
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/book.js`
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/book.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/styles.css`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/places.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/styles/main.css`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js`
- `ruinas.html`
- `scripts/validate-content.js`
- `scripts/audit-content.js`
- `package.json`
- `README.md`
- `AI_UPDATE_RULES.md`
- `PLANO-MESTRE-E-HISTORICO.md`

### Arquivos removidos

- Nenhum.

### Entidades atualizadas

- 23 lugares de *Guerras de Sangue*;
- 17 lugares de *Ruínas dos Céus*;
- 117 cenas específicas associadas a lugares;
- 52 ligações de acontecimentos em cada modelo carregado, considerando que um acontecimento pode aparecer em mais de um lugar;
- 15 estimativas de população ou ocupação aplicáveis nos dois livros.

### IDs alterados

- **0**.

### Redirecionamentos preservados

- `routes` e `rotas` → Lugares;
- `route/<slug>` e `rota/<slug>` → ficha do lugar correspondente;
- todos os slugs e IDs históricos das cinco rotas;
- rotas antigas de acontecimentos e Linha do Tempo da Etapa 4.

### Validações realizadas

- sintaxe de todos os JavaScript alterados;
- 23 lugares em *Guerras de Sangue*;
- 17 lugares em *Ruínas dos Céus*;
- 69 cenas localizadas em *Guerras de Sangue*;
- 48 cenas localizadas em *Ruínas dos Céus*;
- campos obrigatórios de descrição, região, localização, função narrativa, arquitetura e atmosfera;
- referências de capítulos, personagens e acontecimentos;
- inexistência de `Estado: Activa` nos modelos carregados;
- populações somente com rótulo legível;
- cinco rotas históricas incorporadas a Lugares;
- preservação da Linha do Tempo e da auditoria canônica;
- `npm run validate` concluído sem erros;
- `npm run audit` concluído sem erros.

### Referências quebradas

- **0** nas estruturas validadas.

### Assets pendentes de ligação

- A pasta `assets` não fazia parte do pacote de trabalho.
- Os caminhos já existentes foram preservados.
- A ligação definitiva das fotografias e a conferência de nomes serão feitas quando os assets forem reunidos.

### Problemas conhecidos e limites

- As estimativas populacionais são provisórias e podem ser ajustadas pelo autor.
- Alguns lugares ainda não possuem coordenadas de mapa; isso pertence à Etapa 6.
- A Ilha dos Pequenos possui cena e ficha completa, mas não tem um acontecimento direto próprio na Linha do Tempo, pois sua presença é contextual.
- A interação dos mapas de *Ruínas dos Céus* ainda será construída na próxima etapa.

### Não realizado nesta etapa

- revisão de coordenadas e pins;
- criação dos mapas interativos de Etérea e Nadírion;
- inclusão de todos os lugares nos mapas;
- painéis estratégicos do mapa de *Guerras de Sangue*;
- ligação definitiva dos assets.

Essas tarefas permanecem reservadas para a Etapa 6.

---

## Etapa 5.5 — Identidade visual, atmosfera, modo contemplativo e desempenho

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.5

### Objetivo executado

Criar uma fundação atmosférica própria para *Ruínas dos Céus* e *Guerras de Sangue*, mantendo ambos dentro do mesmo sistema, ampliando perfis de desempenho, configurações, áudio e responsividade sem modificar o conteúdo canônico.

### Fundação comum

Foi criado `app/shared/experience/`, responsável por:

- armazenamento seguro de preferências;
- detecção de movimento reduzido;
- detecção de economia de dados e conexão lenta;
- redução automática em dispositivos mais fracos;
- avisos breves de mudança de perfil;
- componentes reutilizáveis de configurações;
- observação do estado do modo desempenho;
- suporte comum aos modos contemplativos.

Os perfis disponíveis são:

- **Completo:** maior densidade, movimento e profundidade;
- **Equilibrado:** efeitos reduzidos e sem excesso de elementos dianteiros;
- **Desempenho:** fundos estáticos, sem partículas dinâmicas, parallax ou névoa frontal;
- **Personalizado:** ativado automaticamente quando o usuário altera controles individuais.

Preferências globais continuam separadas das preferências específicas dos livros.

### Ruínas dos Céus

#### Menu lateral

O menu recebeu:

- textura discreta de céu e pedra suspensa;
- fissuras e raízes partidas;
- fragmentos junto à borda direita;
- névoa suave;
- movimento mínimo no perfil Completo;
- versão reduzida no perfil Equilibrado;
- versão estática no perfil Desempenho;
- identidade preservada quando o menu está recolhido;
- ícones e tooltips permanentes no estado recolhido.

#### Céu e nuvens

Foi implantado um sistema de três profundidades:

- nuvens distantes;
- nuvens intermédias;
- névoa próxima.

As nuvens possuem volumes compostos, duração, escala, altura e opacidade variadas. O sistema reage às fases:

- amanhecer;
- dia;
- entardecer;
- noite.

Sol e lua percorrem trajetórias visuais coerentes. Estrelas, iluminação e sombras das nuvens mudam gradualmente.

#### Relógio temporário

A barra superior de Ruínas possui um controle temporário que:

- seleciona qualquer horário entre 00:00 e 23:59;
- atualiza imediatamente céu, sol, lua e nuvens;
- mostra o horário selecionado;
- permite retornar ao ciclo automático;
- usa apenas o estado da sessão, sem transformar o teste em preferência permanente.

#### Personalidade e contemplação

Também foram adicionados:

- cartões com aparência suspensa;
- pequenos detalhes de vento e fragmentação;
- transição temática de corrente de vento;
- fissuras contextuais mais fortes em páginas de queda e ruínas;
- parallax discreto, desligado no perfil Desempenho;
- modo contemplativo com Etérea, ilhas, raízes, nuvens, sol, lua e música;
- saída por botão ou tecla `Escape`.

### Guerras de Sangue

#### Menu lateral

O menu recebeu:

- textura de couro, pergaminho, madeira e cartografia;
- linhas territoriais e marcas de tinta;
- selos de clã irregulares e de baixa opacidade;
- reação discreta ao entrar na seção Clãs;
- marca contextual do clã aberto;
- marca Fendelar neutra e não heráldica, sem criação de brasão canônico;
- versão estática simplificada no perfil Desempenho.

#### Partículas

O sistema anterior foi ampliado para dois Canvas otimizados:

- camada traseira;
- camada dianteira.

Os tipos são distintos:

- brasas pequenas;
- faíscas rápidas;
- cinzas escuras;
- poeira quente;
- turbulência por rajadas imprevisíveis.

Existem limites rígidos, redução móvel, pausa quando a aba está oculta e limpeza ao mudar de perfil ou fechar o modo contemplativo.

#### Personalidade e contemplação

Foram adicionados:

- textura cartográfica de fundo;
- detalhes de tinta e pigmento;
- reflexo metálico ocasional no perfil Completo;
- transição temática de mapa e cinzas;
- modo contemplativo noturno de Kaendar, com Rio Grande, lua, nuvens, cinzas e iluminação distante;
- saída por botão ou tecla `Escape`.

A imagem de Kaendar é temporária e não pretende substituir a arte canônica.

### Barra superior, áudio e dispositivos móveis

Os controles de utilidade foram agrupados no extremo direito:

- modo desempenho;
- música;
- silenciar;
- volume;
- configurações;
- relógio temporário em Ruínas.

Em telas menores:

- controles são compactados;
- o layout não cria scroll horizontal;
- sliders deixam de ocupar espaço permanente quando necessário;
- os modos contemplativos continuam acessíveis;
- densidade, blur e elementos dianteiros são reduzidos.

O botão de modo desempenho agora possui estado visual inequívoco, tooltip atualizado e aviso breve ao ser ativado ou desativado.

### Acessibilidade e desempenho

Foram preservados ou adicionados:

- foco visível;
- `aria-label` nos controles;
- sliders acessíveis;
- saída com `Escape`;
- ausência de flashes;
- estados ativos que não dependem apenas de cor;
- respeito a `prefers-reduced-motion`;
- detecção de `saveData`;
- redução por hardware e viewport;
- pausa de Canvas e cálculos quando a aba está oculta;
- uso prioritário de `transform`, `opacity`, CSS e Canvas;
- nenhuma biblioteca externa nova.

### Preferências específicas

Chaves de Ruínas usam o prefixo:

`di-ruinas-`

Chaves de Guerras usam o prefixo:

`di-guerras-`

Isso impede que nuvens, céu, brasões, brasas ou cinzas de um livro alterem o outro.

### Recursos temporários

Foram criados:

- `assets/shared/reference/sidebar-sky-stone.webp`;
- `assets/shared/reference/sidebar-leather-map.webp`;
- `assets/shared/reference/eterea-contemplative.webp`;
- `assets/shared/reference/kaendar-night.webp`;
- `assets/shared/reference/fendelar-mark.webp`.

Instruções completas de substituição estão em:

`docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`

Os placeholders são neutros, locais e não canônicos. Não foram incorporados em Base64.

### Arquivos criados

- `app/shared/experience/common.js`
- `app/shared/experience/common.css`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css`
- cinco recursos temporários em `assets/**/temp/`
- `data/sagas/ciclo-de-jesed/audits/visual-etapa-5-5.json`
- `docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`
- dezesseis capturas em `docs/screenshots/`

### Arquivos alterados

- `ruinas.html`
- `guerras.html`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/base.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`
- `scripts/validate-content.js`
- `scripts/audit-content.js`
- `package.json`
- `README.md`
- `AI_UPDATE_RULES.md`
- `PLANO-MESTRE-E-HISTORICO.md`

### Arquivos removidos

- Nenhum.

### Entidades e conteúdo

- Entidades canônicas criadas: **0**.
- Entidades canônicas removidas: **0**.
- IDs alterados: **0**.
- Textos canônicos alterados: **0**.
- Páginas, filtros, relações e funcionalidades removidos: **0**.

### Validações realizadas

- sintaxe de todos os JavaScript;
- `npm run validate`;
- `npm run audit`;
- carregamento dos dois livros sem erros de página;
- menu aberto e recolhido;
- perfis Completo, Equilibrado e Desempenho;
- alteração manual para Personalizado;
- painel de configurações e controles específicos;
- relógio manual, ciclo automático, dia, entardecer e noite;
- abertura e fechamento repetido dos modos contemplativos;
- saída por `Escape`;
- Canvas traseiro e dianteiro;
- ausência de scroll horizontal em viewport de 390 píxeis;
- desktop e simulação móvel;
- ausência de dependências externas novas.

As capturas de revisão estão em `docs/screenshots/`.

### Limitações registradas

- A pasta completa de assets canônicos não acompanhou o pacote de trabalho.
- Etérea e Kaendar usam composições SVG temporárias e neutras.
- O relógio de Ruínas continua temporário até a aprovação visual do ciclo.
- A navegação direta para localhost e `file://` foi bloqueada pelo ambiente de testes; as páginas foram carregadas com todos os recursos locais interceptados pelo navegador, sem erros de console.
- A Etapa 16 continua responsável pela padronização visual detalhada de todas as categorias; a Etapa 5.5 criou a fundação atmosférica e de desempenho.

### Não realizado nesta etapa

- nenhuma alteração canônica;
- ligação definitiva de todas as artes e brasões;
- construção dos mapas interativos;
- reestruturação de páginas de personagens, relações, clãs ou lore;
- publicação ou push para o GitHub.

---

## Etapa 6 — Mapas interativos

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.6

### Objetivo executado

Transformar os mapas dos dois livros em interfaces interativas completas, incluir todos os lugares já existentes, preservar rotas como entidades geográficas e acrescentar a leitura estratégica de *Guerras de Sangue*. A etapa também incorporou dois ajustes solicitados pelo autor: navegação entre capítulos no topo e revisão dos Personagens em foco das páginas iniciais.

### Módulo compartilhado

Foi criado `app/shared/maps/`, contendo:

- `interactive-map.js`;
- `interactive-map.css`.

O módulo oferece:

- aproximação e afastamento;
- deslocamento com rato, toque ou caneta;
- centralização;
- alternância dos nomes;
- tela inteira quando suportada;
- navegação por teclado;
- pins com nomes;
- fichas rápidas;
- abertura da página completa do lugar;
- foco programático a partir de índices e informações estratégicas;
- comportamento responsivo;
- redução de movimento quando solicitada pelo sistema.

### Ruínas dos Céus

Foram mantidos dois mapas separados:

1. **Etérea — Capítulos 1 a 9**;
2. **A Superfície — Capítulos 10 a 24**.

Os textos aparecem integrados sobre cada mapa.

#### Etérea

- Civilização suspensa;
- Harmonia ritual;
- Vento e leveza;
- Sociedade organizada.

#### A Superfície

- Natureza desconhecida;
- Sobrevivência;
- Terra, peso e fome;
- Ausência de civilização humana conhecida.

Resultado cartográfico:

- 17 lugares localizados;
- 11 pins no mapa de Etérea;
- 6 pins no mapa da Superfície;
- todos os lugares criados vinculados a um dos mapas;
- Ilhas Baixas preservadas como localização mítica, sem tratá-las como lugar real;
- índice cartográfico clicável;
- troca de mapa sem alterar a rota pública;
- funcionamento em telas menores.

### Guerras de Sangue

O mapa principal passou a conter os 23 lugares criados no sistema.

As cinco antigas rotas continuam com seus IDs históricos e aparecem como lugares:

- Rio Grande;
- Garganta de Kaendar;
- Garganta Seca;
- Estrada dos Grãos;
- Marcha oculta da aliança.

Foi acrescentada uma camada de linhas para indicar rotas fluviais, terrestres e militares sem criar uma seção independente de Rotas.

A área estratégica mostra apenas categorias com duas ou mais informações. Foram incluídas sete categorias válidas:

- clãs em conflito;
- alianças confirmadas;
- alianças suspeitas;
- territórios disputados;
- rotas ameaçadas;
- recursos estratégicos;
- forças em movimento.

Cada informação estratégica liga novamente aos pins dos lugares relacionados.

### Navegação entre capítulos

Em *Guerras de Sangue*:

- os botões de capítulo anterior e seguinte foram retirados da parte inferior;
- a navegação foi colocada no topo da ficha, logo depois do cabeçalho.

Em *Ruínas dos Céus*:

- foi criada a mesma navegação no topo;
- primeiro e último capítulo recebem estados desativados claros.

### Personagens em foco

Nas páginas iniciais dos dois livros:

- aparecem somente personagens principais;
- o estado do personagem deixou de ser exibido;
- cada personagem recebeu uma descrição leve de no máximo quatro palavras;
- continuam preservadas foto, nome e ligação para a ficha.

Personagens escolhidos em *Ruínas dos Céus*:

- Jokara;
- Nestira;
- Marv;
- Loutes;
- Gabasteres.

Personagens escolhidos em *Guerras de Sangue*:

- Kaelina;
- Alyra;
- Rendar;
- Daryon;
- Nynestra.

### Assets incorporados

Foram incluídas versões WebP otimizadas dos mapas fornecidos pelo autor:

- `assets/maps/ruinas-dos-ceus/Mapa de Etérea.webp`;
- `assets/maps/ruinas-dos-ceus/Mapa de Nadírion (Floresta de Mirval).webp`;
- `assets/books/ciclo-de-jesed/ruinas-dos-ceus/maps/map-combined.webp`;
- `assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp`;
- `assets/books/ciclo-de-jesed/guerras-de-sangue/maps/map-jesed.webp`, mantido como caminho de compatibilidade da página inicial.

### Arquivos criados

- `app/shared/maps/interactive-map.js`
- `app/shared/maps/interactive-map.css`
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/maps.js`
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/maps.js`
- `data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json`
- cinco arquivos WebP em `assets/maps/` e no caminho de compatibilidade.

### Arquivos alterados

- `ruinas.html`
- `guerras.html`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/app.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/places.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/styles/main.css`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/styles.css`
- `scripts/validate-content.js`
- `scripts/audit-content.js`
- `package.json`
- `README.md`
- `AI_UPDATE_RULES.md`
- `PLANO-MESTRE-E-HISTORICO.md`

### Arquivos removidos

- Nenhum.

### Entidades e compatibilidade

- Entidades canônicas criadas: **0**.
- Entidades canônicas removidas: **0**.
- IDs alterados: **0**.
- IDs históricos das rotas preservados: **5**.
- Rotas antigas e páginas de lugares preservadas.
- Conteúdo canônico alterado: **0**.
- GitHub alterado: **não**.

### Validações realizadas

- sintaxe dos arquivos JavaScript;
- `npm run validate`;
- `npm run audit`;
- dois mapas de Ruínas confirmados;
- 17 de 17 lugares de Ruínas mapeados;
- 23 de 23 lugares de Guerras mapeados;
- cinco rotas históricas confirmadas como lugares;
- sete categorias estratégicas com ao menos duas informações;
- imagens de mapa presentes no pacote;
- CSS e JavaScript compartilhados carregados nos dois HTMLs;
- navegação superior entre capítulos confirmada nos dois livros;
- descrições curtas dos Personagens em foco confirmadas;
- páginas servidas localmente com resposta HTTP 200;
- navegador real com 11 pins em Etérea, 6 na Superfície e 23 em Guerras;
- sete cartões estratégicos e cinco linhas de rota renderizados;
- ausência de exceções JavaScript nos mapas;
- ausência de scroll horizontal em 390 píxeis;
- sete capturas de revisão em `docs/screenshots/etapa-6/`.

### Limitações registradas

- As coordenadas de pins que não existiam foram posicionadas editorialmente sobre os mapas e podem receber ajustes visuais finos após revisão do autor.
- O navegador do ambiente bloqueia a abertura direta de endereços locais; os testes visuais foram executados por DevTools com todos os recursos locais interceptados. Os mapas carregaram sem exceções de execução, e a revisão final de gosto visual permanece com o autor.
- A pasta completa de retratos, brasões e demais artes canônicas continua fora deste pacote; os mapas necessários a esta etapa foram incorporados.

### Não realizado nesta etapa

- revisão visual das páginas iniciais além dos Personagens em foco;
- remoção da seção Últimos capítulos;
- criação dos cartões de Lugares nas páginas iniciais;
- alteração das fichas de personagens, relações, clãs ou lore;
- publicação ou push para o GitHub.

---

## Etapa 7 — Páginas iniciais

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.7

### Objetivo executado

Transformar as páginas iniciais dos dois livros em guias de navegação equivalentes, remover a seção redundante de capítulos recentes e alinhar os caminhos de imagens ao inventário WebP real fornecido pelo autor.

### Ruínas dos Céus

- o topo passou a usar a identificação **Ciclo de Jesed — Guia do Livro**;
- os cartões internos foram reduzidos aos quatro caminhos solicitados: Personagens, Relações, Linha do Tempo e Capítulos;
- em desktop, os quatro cartões permanecem numa única linha;
- a seção **Últimos capítulos** foi removida;
- Personagens em foco foi preservado com cinco figuras principais e descrições curtas;
- foi criada a seção **Lugares**, com seis cartões fotográficos, nome, tipo ou região e ligação para a ficha;
- foram adicionadas duas prévias cartográficas separadas: Etérea e A Superfície;
- cada prévia abre o mapa interativo já no período correspondente.

### Guerras de Sangue

- o topo passou a usar a identificação **Ciclo de Jesed — Guia do Livro**;
- os quatro cartões internos são Personagens, Relações, Linha do Tempo e Capítulos;
- o antigo atalho de Acontecimentos não voltou a existir;
- a seção **Últimos capítulos** foi removida;
- Personagens em foco foi preservado com cinco figuras principais e descrições curtas;
- foi criada a seção **Lugares**, com seis cartões fotográficos e ligações para as fichas;
- o mapa grande foi mantido no topo;
- as sete categorias estratégicas da Etapa 6 aparecem como atalhos resumidos, sem duplicar os detalhes da página do mapa.

### Ajuste dos caminhos de imagens

O arquivo fornecido pelo autor foi incorporado como:

`data/common/assets-manifest.json`

Foram corrigidos:

- logos e marcas de `.png` para os nomes WebP reais;
- ilustrações de todos os 29 capítulos de *Guerras de Sangue*;
- ilustrações disponíveis dos capítulos de *Ruínas dos Céus*;
- retratos de *Guerras de Sangue* para `assets/characters/guerras-de-sangue/`;
- caminhos definitivos dos mapas;
- referências usadas pelo portal e pelas páginas dos dois livros.

Os capítulos 19 e 22 de *Ruínas dos Céus* continuam sem imagem porque o inventário não contém arquivos correspondentes. Nenhum caminho foi inventado para eles.

### Arquivos criados

- `data/common/assets-manifest.json`;
- `data/sagas/ciclo-de-jesed/audits/home-assets-etapa-7.json`.

### Arquivos alterados

- páginas iniciais e estilos dos dois livros;
- dados de capítulos e personagens com caminhos de imagem;
- mapas e arquivos do portal que referenciam branding;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`;
- `package.json`.

### Arquivos removidos

- `assets/mapa-guerras-de-sangue.webp`, duplicata temporária da Etapa 6;
- nomes temporários dos mapas `mapa-eterea.webp`, `mapa-superficie.webp` e `mapa-guerras-de-sangue.webp`, substituídos pelos nomes definitivos do inventário.

### IDs alterados

- **0**.

### Validação realizada

- 169 registros no inventário, correspondendo a 168 caminhos únicos;
- 143 referências literais de imagem analisadas no código, com 128 caminhos únicos;
- 124 caminhos canônicos utilizados diretamente e quatro recursos temporários locais utilizados pelo código;
- nenhuma extensão `.png`, `.jpg` ou `.jpeg` mantida nas referências activas;
- nenhum caminho de imagem sem correspondência segura;
- quatro cartões orientadores, cinco personagens em foco e seis lugares em cada página inicial;
- duas prévias cartográficas em *Ruínas dos Céus* e sete atalhos estratégicos em *Guerras de Sangue*;
- zero exceções JavaScript nas duas páginas iniciais no teste Chromium;
- nenhum scroll horizontal em 390 píxeis.

### Princípio preservado

A página inicial orienta e encaminha. Descrições profundas continuam nas páginas de personagens, relações, capítulos, lugares, mapas e Linha do Tempo.

---

## Etapa 8 — Personagens

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.8

### Objetivo executado

Padronizar as páginas de Personagens dos dois livros, oferecer pesquisa e dois modos de visualização equivalentes, aprofundar a Trajetória como ação específica do personagem em cada capítulo e ligar todos os retratos disponíveis no inventário oficial.

### Sistema compartilhado

Foi criado o módulo reutilizável:

- `app/shared/characters/browser.js`;
- `app/shared/characters/browser.css`.

O módulo oferece:

- cartões grandes;
- lista compacta;
- pesquisa textual;
- persistência da visualização separada por livro;
- acessibilidade por teclado;
- responsividade;
- suporte a movimento reduzido.

As preferências usam chaves próprias:

- `di-ruinas-character-view`;
- `di-guerras-character-view`.

A antiga chave de *Guerras de Sangue* é migrada quando encontrada, sem quebrar preferências já guardadas.

### Ruínas dos Céus

- a página passou a usar a frase-guia: **“Habitantes de Etérea e sobreviventes transformados pela Queda, entre a leveza do céu e o peso da superfície.”**;
- foi adicionada pesquisa por nome, subtítulo, descrição e estado;
- foi criada alternância entre cartões grandes e lista compacta;
- os cartões grandes mostram retrato, nome, subtítulo simples e descrição curta;
- subtítulos como “Protagonista e Âncora” aparecem como texto simples, sem cápsula, círculo ou borda própria;
- a lista compacta mostra retrato, nome, subtítulo, resumo e quantidade de capítulos;
- a ficha individual deixou de exibir o campo redundante **Aparições**;
- a aba **Trajetória** mantém capítulos clicáveis e apresenta exclusivamente ações específicas do personagem;
- foram preenchidas as lacunas de trajetória de Marv, Loutes, Sersi e Platisa;
- os 15 personagens possuem retrato ligado ao inventário oficial;
- foram validadas 149 ligações entre personagens e capítulos, sem nenhuma trajetória ausente.

### Guerras de Sangue

- a página passou a usar a frase-guia: **“Figuras de clãs, alianças e rivalidades que atravessam a guerra e disputam memória, território e poder.”**;
- foi adicionada pesquisa equivalente à de *Ruínas dos Céus*;
- os filtros de clã continuam disponíveis e funcionam em conjunto com a pesquisa;
- cartões grandes e lista compacta passaram a utilizar o mesmo sistema compartilhado;
- os cartões exibem retrato, nome, subtítulo e descrição curta;
- a lista mostra mais personagens simultaneamente, mantendo acesso direto à ficha;
- a aba **Trajetória** não utiliza mais o resumo geral do capítulo como fallback;
- foram preenchidas todas as lacunas restantes de trajetória, incluindo aparições presenciais, menções e ausências narrativamente relevantes já registradas nos dados;
- foram validadas 293 ligações entre personagens e capítulos, sem nenhuma trajetória ausente;
- 42 imagens disponíveis foram ligadas;
- a segunda imagem de Orionus foi incorporada como retrato alternativo na visão geral da ficha;
- Eshvar, Maedra e Capitão Lirron continuam com fallback porque não possuem retrato no inventário atual.

### Imagens

Todas as imagens de personagens existentes no inventário foram utilizadas:

- 15 caminhos de *Ruínas dos Céus*;
- 42 caminhos de *Guerras de Sangue*, incluindo o retrato alternativo de Orionus;
- nenhum caminho foi inventado;
- nenhuma imagem disponível ficou sem ligação.

### Arquivos criados

- `app/shared/characters/browser.js`;
- `app/shared/characters/browser.css`;
- `data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json`;
- dez capturas em `docs/screenshots/etapa-8/`, incluindo desktop e dispositivos móveis.

### Arquivos alterados

- `ruinas.html`;
- `guerras.html`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/list.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/detail.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/tabs/trajetoria.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/styles/main.css`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/styles.css`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/trajectory.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/trajectory.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/characters.js`;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`;
- `package.json`.

### Arquivos removidos

- nenhum.

### Entidades e compatibilidade

- personagens canônicos criados: **0**;
- personagens canônicos removidos: **0**;
- IDs alterados: **0**;
- slugs ou rotas alterados: **0**;
- conteúdo canônico reescrito: **0**;
- GitHub alterado: **não**.

### Validações realizadas

- 15 personagens em *Ruínas dos Céus*;
- 45 personagens em *Guerras de Sangue*;
- 57 caminhos de retrato disponíveis e ligados;
- 149 ligações de trajetória em Ruínas;
- 293 ligações de trajetória em Guerras;
- nenhuma trajetória sem texto específico;
- nenhuma reutilização do resumo geral do capítulo como fallback;
- campo Aparições removido da ficha de Ruínas;
- pesquisa e alternância de visualização confirmadas nos dois livros;
- sintaxe de todos os arquivos JavaScript;
- `npm run validate`;
- `npm run audit`;
- visualização em desktop e largura móvel;
- ausência de scroll horizontal em 390 píxeis;
- nenhuma exceção JavaScript registrada nos testes da página de Personagens.

### Limitações registradas

- os binários dos retratos não acompanham o pacote intermediário; os caminhos foram conferidos pelo inventário oficial e funcionarão quando reunidos à pasta `assets` completa;
- Eshvar, Maedra e Capitão Lirron não possuem imagem disponível;
- a revisão estética final das fotografias depende da reunião do pacote com os assets reais.

### Não realizado nesta etapa

- alterações nas páginas de Relações, Famílias ou Organizações;
- criação de novos personagens;
- mudança de cânone;
- publicação ou push para o GitHub.

---

## Etapa 9 — Relações, família, organizações e atmosfera com imagens

**Estado:** CONCLUÍDA EM 21/06/2026  
**Pacote:** 0.9.9

### Relações em Ruínas dos Céus

- criada legenda com oito tipos: família, amizade, proteção, influência, conflito, rivalidade, lealdade e relação rompida;
- as linhas do mapa usam as mesmas categorias visuais da legenda;
- foram estruturadas doze relações com participantes, tipo, estado, descrição, perspectiva de cada personagem e evolução;
- os cartões mostram os dois personagens e permitem abrir suas fichas;
- a aba Relações das fichas individuais passou a usar os mesmos dados enriquecidos.

### Família em Ruínas dos Céus

- mantida somente a ficha **Os Amaréa**;
- membros: Yoral, Mirel, Jokara, Nestira e Loutes como criança acolhida;
- incluídos vida familiar, casa em Nivellia, crenças, Sopro e Peso, perda de Yoral, diferenças entre as irmãs, acolhimento de Loutes e importância para a Queda;
- todos os membros são clicáveis;
- adicionada imagem social substituível em caminho permanente.

### Organizações

Em *Ruínas dos Céus*:

- Oradores da Corrente;
- Ecoantes;
- Tecelões de Vento;
- sobreviventes de Nadírion.

Cada ficha contém imagem, tipo, função, descrição, atuação e membros ligados.

Em *Guerras de Sangue*:

- preservadas três famílias e três organizações já existentes;
- adicionadas imagens, subtítulos, detalhes, função, atuação, temas e membros com retratos clicáveis.

### Atmosfera baseada em imagens

- substituídas referências atmosféricas SVG por WebP locais;
- nuvens de Ruínas agora usam imagens transparentes em três camadas;
- sol, lua, fragmentos, raízes, menu lateral e cenário contemplativo usam imagens rasterizadas;
- partículas de Guerras usam sprites WebP de brasa, faísca e cinza no Canvas;
- poeira quente, fumaça, textura cartográfica, couro, reflexo metálico e cenário de Kaendar usam imagens WebP;
- cartões e fichas de lugares receberam sobreposições atmosféricas próprias por livro;
- nenhum plugin ou dependência externa foi acrescentado;
- os fallbacks anteriores foram preservados para que arquivos ausentes não provoquem falha do site.

### Catálogo de imagens

Criados:

- `docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`;
- `data/common/image-requirements-etapa-9.json`.

Os arquivos registram quarenta imagens com:

- nome;
- pasta e caminho exatos;
- dimensão recomendada;
- necessidade de transparência;
- função;
- instrução de substituição direta.

Todos os quarenta caminhos possuem placeholders WebP locais. As artes definitivas podem substituí-los sem qualquer edição de código.

### Arquivos principais criados

- `app/shared/social/network.css`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/social.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/social.js`;
- `data/sagas/ciclo-de-jesed/audits/social-etapa-9.json`;
- catálogo humano e catálogo de máquina das imagens;
- quarenta placeholders WebP atmosféricos e sociais.

### Arquivos removidos

- antigos SVG temporários de textura, contemplação e marca Fendelar;
- `docs/ETAPA-5.5-RECURSOS-TEMPORARIOS.md`, substituído pelo catálogo completo da Etapa 9;
- pastas temporárias vazias sem uso.

### Validações

- 12 relações enriquecidas em Ruínas;
- 8 tipos de relação;
- 1 família em Ruínas, com 5 membros e 7 blocos narrativos;
- 4 organizações em Ruínas;
- 3 famílias e 3 organizações em Guerras;
- 40 imagens substituíveis com arquivos locais;
- zero referências SVG atmosféricas ativas;
- zero IDs alterados;
- zero mudanças canônicas;
- sintaxe JavaScript validada;
- `npm run validate` e `npm run audit` concluídos;
- teste visual de Relações de Ruínas e Famílias de Guerras sem exceções;
- teste móvel de Relações de Ruínas sem scroll horizontal.

### Limitações conhecidas

- os WebP incluídos são placeholders técnicos, não artes canônicas definitivas;
- as imagens finais de família e organizações dependem das referências visuais que o autor produzir;
- os retratos canônicos completos continuam sendo reunidos com a pasta `assets` principal.

### Não realizado

- nenhuma criação de brasão Fendelar;
- nenhuma mudança de cânone;
- nenhum push ou publicação no GitHub;
- nenhuma alteração da Etapa 10 — Clãs.

---

## Etapa 10 — Clãs

**Estado:** CONCLUÍDA EM 21/06/2026  
**Pacote:** 0.10.0

### Aplicação

A etapa foi aplicada aos oito clãs de *Guerras de Sangue*: Polar, Tondrar, Buldar, Fendelar, Glydar, Vendrar, Cendar e Urtistar.

### Fichas orientadoras

Cada clã recebeu uma ficha principal com:

- origem;
- território;
- cultura;
- economia;
- modo de vida;
- estrutura social;
- alimentação;
- população estimada e explicação;
- força militar estimada e explicação;
- relações com todos os outros clãs;
- forças;
- fragilidades;
- participação na guerra;
- situação ao final do livro.

As estimativas foram registradas como faixas editoriais, sem transformar números aproximados em informação absoluta.

### Relações políticas

- cada ficha apresenta os sete outros clãs;
- quando a seção está registrada no documento do outro povo, a interface usa essa perspectiva sem duplicar a informação;
- nenhuma aliança, hostilidade ou neutralidade nova foi inventada;
- o acesso ao outro clã é clicável.

### Personagens

- os personagens foram movidos para depois dos textos estruturais;
- aparecem horizontalmente em cartões com fotografia, nome e função;
- os cartões são clicáveis e possuem quebra responsiva;
- ausência de retrato utiliza fallback sem imagem quebrada;
- Cendar permanece sem personagem individualizado no manuscrito atual e recebe uma mensagem explícita, sem criação artificial de figura.

### Alimentos, fauna e flora

Foram criadas três seções independentes em cada ficha:

- **Alimentos:** comidas e ingredientes associados ao cotidiano do clã;
- **Fauna:** animais usados, criados, caçados, transportados ou temidos;
- **Flora:** plantas com relevância territorial, alimentar, medicinal ou cultural.

Os cartões apresentam imagem, nome, descrição curta e ligação para a ficha correspondente. O sistema prioriza itens mencionados diretamente no arquivo do clã e depois considera citações e disponibilidade de imagem.

Foram criados fallbacks locais seguros:

- `assets/books/ciclo-de-jesed/shared/lore/temp/food-placeholder.webp`;
- `assets/books/ciclo-de-jesed/shared/lore/temp/fauna-placeholder.webp`;
- `assets/books/ciclo-de-jesed/shared/lore/temp/flora-placeholder.webp`.

### Conteúdo aprofundado preservado

O antigo conteúdo extenso não foi apagado. Ele passou a aparecer como **Arquivo aprofundado do clã**, organizado em grupos recolhíveis. Assim, a ficha inicial orienta a leitura sem sacrificar as dezenas de seções canônicas já existentes.

### Fendelar

- continuam sendo o único clã sem brasão formal;
- `assets/shared/reference/fendelar-mark.webp` permanece apenas como marca contextual neutra;
- nenhum símbolo heráldico novo foi criado.

### Arquivos principais criados

- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/clans.js`;
- `app/shared/clans/presentation.css`;
- `data/sagas/ciclo-de-jesed/audits/clans-etapa-10.json`;
- três placeholders locais para Alimentos, Fauna e Flora;
- capturas em `docs/screenshots/etapa-10/`.

### Arquivos principais alterados

- `guerras.html`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `package.json`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`.

### Validações

- oito clãs com os quinze campos estruturais obrigatórios;
- sete relações políticas apresentadas em cada ficha;
- personagens e rotas internas válidos;
- seções separadas de Alimentos, Fauna e Flora;
- bloco genérico “Lore relacionada” ausente;
- arquivos aprofundados preservados;
- nenhum brasão Fendelar criado;
- nenhum ID alterado;
- nenhuma mudança canônica;
- sintaxe JavaScript validada;
- `npm run validate` e `npm run audit` concluídos;
- páginas de Clãs testadas em desktop e largura móvel sem exceções ou scroll horizontal.

### Limitações conhecidas

- as imagens canônicas completas não acompanham o pacote intermediário; quando ausentes, a interface oculta a imagem ou usa fallback;
- números de população e força militar são estimativas editoriais baseadas nos documentos atuais e podem ser refinados sem mudar IDs;
- a contagem definitiva de citações e a revisão completa de cada item de fauna, flora e alimentos pertencem à Etapa 11.

### Não realizado

- nenhuma criação de brasão Fendelar;
- nenhuma mudança de cânone;
- nenhuma publicação ou push no GitHub;
- nenhuma execução antecipada da Etapa 11.

---

## Etapa 11 — Fauna, flora e alimentos

**Estado:** CONCLUÍDA EM 21/06/2026  
**Versão do pacote:** 0.11.0

### Objetivo executado

Recontar e estruturar todas as fichas de fauna, flora e alimentos com base nos manuscritos canônicos disponíveis, criar listagens e páginas individuais equivalentes nos dois livros, corrigir o ciclo visual do céu e substituir as descrições atmosféricas da seção Livros por sinopses editoriais completas.

### Contagens finais

#### Ruínas dos Céus

- 6 itens de fauna;
- 6 itens de flora;
- 6 alimentos;
- 149 citações localizadas:
  - fauna: 61;
  - flora: 10;
  - alimentos: 78;
- nenhum dos 18 itens está sem citação no manuscrito atual.

#### Guerras de Sangue

- 75 itens de fauna;
- 110 itens de flora;
- 106 alimentos;
- 463 citações localizadas:
  - fauna: 243;
  - flora: 167;
  - alimentos: 53;
- 168 itens ainda não aparecem diretamente no manuscrito:
  - fauna: 32;
  - flora: 62;
  - alimentos: 74.

### Método de recontagem

Foram considerados:

- singular e plural;
- diferenças de acento;
- hífen e espaço;
- aliases registrados;
- grafias alternativas;
- títulos de capítulo;
- nomes indiretos quando o contexto confirma a mesma entidade;
- a Fera como Rhaukar apenas nas passagens em que a criatura de olhos amarelos é realmente a referida.

Menções metafóricas ou referentes a outras criaturas não foram mantidas como Rhaukar. O nome canônico exibido é **Rhaukar**, preservando o ID `jesed-fauna-raukhar`, o slug `raukhar` e “Raukhar” como alias histórico.

### Listagens

Nos dois livros, os cartões de fauna, flora e alimentos mostram somente:

- imagem;
- nome;
- descrição breve;
- total de citações.

O conteúdo integral não aparece antecipadamente na listagem.

Em *Ruínas dos Céus*:

- os 18 cartões receberam imagem ou fallback seguro;
- todos são clicáveis;
- não existe filtro por clã;
- os filtros visíveis anteriores foram removidos;
- permanecem ordenação A–Z, ordenação por citações e exportação de não citados.

Os filtros de Conceitos foram removidos nos dois livros, sem antecipar a criação das fichas individuais de Conceitos em Ruínas, que pertence à Etapa 12.

### Páginas individuais

Cada ficha apresenta:

- imagem;
- descrição completa;
- características;
- habitat ou origem;
- usos;
- relação com povos ou clãs somente quando aplicável;
- total de citações;
- lista completa das menções.

Cada menção contém:

- capítulo;
- título do capítulo;
- trecho citado;
- contexto curto;
- ligação para o capítulo.

O texto “X vezes citado” aparece junto da lista de citações.

### Ciclo do céu de Ruínas dos Céus

O modo automático deixou de acompanhar a hora real do dispositivo.

Agora:

- 24 horas visuais completam uma volta em aproximadamente 10 minutos reais;
- o céu é atualizado a cada meio segundo;
- o simulador temporário altera imediatamente o horário;
- amanhecer, dia, entardecer, noite, sol, lua e iluminação respondem ao slider;
- ao reativar o botão **Ciclo 10 min**, o movimento continua a partir do horário escolhido;
- a preferência permanece apenas na sessão.

No teste de navegador, o relógio avançou aproximadamente cinco minutos visuais em pouco mais de dois segundos reais, coerente com a volta de dez minutos.

### Sinopses editoriais

As páginas acessadas por **Livros → Ruínas dos Céus** e **Livros → Guerras de Sangue** agora mostram sinopses completas, vendáveis e divididas em três parágrafos.

Também foram criados teasers curtos para os cartões da lista. As antigas frases “Céu pálido...” e “Pergaminho escurecido...” deixaram de ser usadas como sinopses visíveis.

### Arquivos criados

- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/lore-stage11.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/lore-stage11.js`;
- `data/sagas/ciclo-de-jesed/audits/lore-etapa-11.json`;
- `docs/screenshots/etapa-11/ruinas-fauna-detalhe.png`;
- `docs/screenshots/etapa-11/guerras-flora-detalhe.png`;
- `docs/screenshots/etapa-11/ruinas-relogio.png`;
- `docs/screenshots/etapa-11/ruinas-sinopse.png`;
- `docs/screenshots/etapa-11/guerras-sinopse.png`.

### Arquivos principais alterados

- `ruinas.html`;
- `guerras.html`;
- `app/portal/data.js`;
- `app/portal/app.js`;
- `app/portal/styles.css`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/base.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/app.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/lore.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/fauna.js`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/flora.js`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/foods.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/runtime.js`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`;
- estilos dos dois livros;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `package.json`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`.

### Arquivos removidos

- nenhum.

### Validações realizadas

- 309 itens estruturados;
- 612 citações com trecho e contexto;
- soma por capítulo conferida contra o total de cada item;
- 71 arquivos JavaScript verificados sintaticamente;
- zero exceções no navegador;
- seis cartões de fauna em Ruínas;
- 110 cartões de flora em Guerras;
- zero filtros visíveis de Conceitos;
- simulador testado em 18:30, com fase de entardecer;
- retorno ao ciclo automático testado;
- três parágrafos de sinopse nos dois livros;
- zero rolagem horizontal em 390 píxeis;
- `npm run validate` concluído;
- `npm run audit` concluído;
- nenhuma alteração no GitHub.

### Limitações e pendências

- 168 itens de *Guerras de Sangue* permanecem sem citação direta; a exportação permite reutilizá-los em livros futuros;
- a pasta completa de assets canônicos não acompanha este pacote intermediário, mas caminhos e fallbacks foram preservados;
- fichas individuais de Conceitos em *Ruínas dos Céus* pertencem à Etapa 12.

### IDs e cânone

- IDs alterados: 0;
- mudanças canônicas: 0;
- redirecionamentos anteriores: preservados;
- GitHub alterado: não.

### Próxima etapa recomendada

- Etapa 12 — Conceitos.

---

## Etapa 12 — Conceitos

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026  
**Pacote:** 0.12.0

### Nos dois livros

- Remover filtros da página de conceitos.

### Ruínas dos Céus

- Transformar conceitos em cartões clicáveis, como em *Guerras de Sangue*.

Cada página pode conter:

- definição;
- origem;
- funcionamento conhecido;
- interpretações;
- personagens relacionados;
- capítulos;
- citações;
- dúvidas preservadas pelo texto.

O Sopro, Etérea e outros elementos ambíguos não devem receber respostas excessivamente fechadas.

### Implementação concluída

- Os filtros continuam removidos nas páginas de Conceitos dos dois livros.
- *Ruínas dos Céus* passou a ter cartões de Conceitos clicáveis e rotas individuais em `#/conceito/<slug>`.
- Foram aprofundados 7 conceitos em *Ruínas dos Céus* e 7 em *Guerras de Sangue*.
- As fichas incluem definição, origem, funcionamento conhecido, interpretações, personagens, capítulos, ambiguidades e evolução durante o livro.
- O Sopro e Etérea permaneceram deliberadamente ambíguos, sem explicação mágica ou científica fechada.
- IDs existentes foram preservados; nenhum redirecionamento anterior foi removido.

### Arquivos principais alterados

- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/concepts.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/concepts.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/lore.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/app.js`;
- `app/shared/experience/common.css`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`.

---

## Etapa 13 — Mistérios

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026  
**Pacote:** 0.13.0

### Revisão completa

Atualizar todos os mistérios dos dois livros.

### Nova estrutura

Cada mistério deve mostrar:

1. como surgiu;
2. primeiras pistas;
3. caminhos de investigação;
4. descobertas intermediárias;
5. pistas falsas ou red herrings;
6. contradições;
7. revelação final;
8. consequências;
9. capítulos relacionados;
10. personagens e lugares relacionados.

### Remover

- “Resposta no ponto escrito”.

Os dois livros estão finalizados, então a ficha deve apresentar a evolução completa.

### Red herrings

- Registrar somente pistas falsas realmente presentes ou sugeridas.
- Não inventar red herrings para preencher campo.
- Omitir o campo quando não houver.

### Ruínas dos Céus

As fichas atuais são simples demais e devem alcançar o nível de profundidade de *Guerras de Sangue*.

### Implementação concluída

- Os 5 mistérios de cada livro foram revistos até o encerramento real de suas histórias.
- Todas as fichas passaram a mostrar origem, primeiras pistas, caminhos de investigação, descobertas intermediárias, contradições, revelação ou estado final, consequências, capítulos, personagens e lugares relacionados.
- Pistas falsas aparecem apenas quando existiam de verdade na narrativa.
- O rótulo antigo “Resposta no ponto escrito” foi removido.
- Em *Guerras de Sangue*, foram atualizadas as respostas sobre Orionus, os dois jovens Polar, o massacre Fendelar, Yvenn e Markoso.
- Em *Ruínas dos Céus*, foram aprofundados Loutes, Ilhas Baixas, queda de Etérea, origem das ruínas e natureza do Sopro.

### Arquivos principais alterados

- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/mysteries.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/mysteries.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/mysteries.js`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`;
- `app/shared/experience/common.css`.

### Validação

- 14 conceitos e 10 mistérios validados pelo modelo comum.
- 11 rotas principais verificadas em teste de execução com JSDOM.
- Nenhuma exceção da aplicação encontrada.
- Relatório criado em `data/sagas/ciclo-de-jesed/audits/concepts-mysteries-etapa-13.json`.

---

## Etapa 13.1 — Portal, relógio, contraste noturno e correção de Guerras

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026  
**Pacote:** 0.13.1

### Tela de Dimensões Infinitas

- Criado avanço contínuo por um campo de 220 estrelas em perspectiva.
- Criados portais azul-bebê em formato oval vertical, aproximando-se do centro para fora e dispersando partículas de energia.
- Adicionada música ambiente procedural, sem dependência externa e com botão fixo para ligar/desligar.
- A preferência de música é guardada; por limitação normal dos navegadores, a reprodução automática só retoma depois da primeira interação do usuário.

### Relógio e legibilidade

- O simulador manual passou a andar em intervalos de 10 minutos.
- O ciclo automático continua fluido e completa 24 horas em cerca de 10 minutos reais.
- Amanhecer, dia, entardecer e noite continuam definidos por faixas horárias.
- Na fase noturna, azul-escuro, preto e cinza foram substituídos por textos claros e superfícies escuras de maior contraste.

### Correção de Guerras de Sangue

- Identificada a ausência da pasta `assets` no pacote recebido como principal origem das imagens quebradas.
- Restaurados mapas, capas, retratos, lugares, brasões e imagens atmosféricas disponíveis nos arquivos do projeto.
- Criados fallbacks temporários WebP para recursos ainda sem arte canônica.
- Removido o carregamento duplicado da folha visual de *Guerras de Sangue*.
- Removido o arquivo obsoleto `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/styles.css`, cuja cópia tinha caminhos relativos incorretos.
- Mantida apenas `experience/styles.css`, com caminhos válidos.
- Verificação estática final: 0 URLs CSS quebradas.
- `npm run validate` e `npm run audit` executados com sucesso.

---

## Etapa 14 — Temas

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026  
**Pacote:** 0.15.0

### Implementação concluída

- Criados 10 temas aprofundados para *Ruínas dos Céus* e 10 para *Guerras de Sangue*.
- Cada tema possui cartão interativo e página individual.
- As fichas apresentam descrição, pergunta central, desenvolvimento, personagens, lugares, capítulos, acontecimentos, símbolos e evolução ao longo do livro.
- As ligações usam IDs estáveis e conduzem às fichas já existentes.
- A interface deixa explícito quando uma leitura permanece interpretativa.
- Sopro, Peso, destino, culpa, justiça, fé e repetição não foram transformados em respostas canônicas fechadas.

### Temas de Ruínas dos Céus

- Peso e Sopro;
- queda e sobrevivência;
- tradição e dúvida;
- fé e interpretação;
- família e legado;
- destino e livre-arbítrio;
- civilização e natureza;
- memória e verdade;
- sacrifício e cuidado;
- reconstrução e repetição.

### Temas de Guerras de Sangue

- paz e violência;
- fome, recursos e poder;
- justiça e vingança;
- herança e legado;
- irmãs, identidade e poder;
- verdade, mentira e narrativa;
- destino e livre-arbítrio;
- aliança e desconfiança;
- centro, periferia e desigualdade;
- ciclo, memória e repetição.

### Arquivos principais

- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/themes.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/themes.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/themes.js`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`;
- `app/shared/themes/presentation.css`.

### Validação

- 20 temas completos.
- Todas as referências de personagens, lugares, capítulos e acontecimentos resolvidas.
- IDs e slugs únicos.
- Nenhuma mudança canônica introduzida.

---

## Etapa 15 — Galerias

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026  
**Pacote:** 0.15.1

### Implementação concluída

- Etapa refeita sobre o inventário real de `assets/` enviado pelo autor.
- Criada a galeria de *Ruínas dos Céus*.
- Padronizada a galeria de *Guerras de Sangue* pelo mesmo sistema compartilhado.
- Os filtros são gerados pelas categorias existentes nos dados.
- Incluída pesquisa textual por nome, tipo e legenda.
- Incluídos gesto de deslizar em telas tácteis, pré-carregamento da imagem vizinha, foco preso no visualizador e botão para abrir a ficha relacionada.
- Os dois livros organizam capas, capítulos, personagens, lugares, mapas, acontecimentos e fauna quando possuem imagem.
- *Guerras de Sangue* inclui clãs e emblemas; *Ruínas dos Céus* não recebeu essa categoria incompatível.
- Flora, Alimentos e Conceitos ficam preparados para aparecer automaticamente quando receberem imagens próprias não temporárias.

### Visualizador em tela cheia

- fundo escuro;
- botão de fechar;
- anterior e seguinte;
- setas esquerda e direita do teclado;
- tecla Esc;
- contador de posição;
- legenda discreta;
- navegação limitada ao filtro ativo.

### Tratamento de imagens ausentes

- Os caminhos de capítulos, logos, mapas e Raukhar foram trocados para os nomes e extensões exactos do inventário enviado.
- Referências a imagens sociais, brasões e placeholders inexistentes foram removidas em vez de apontarem para ficheiros quebrados.
- Cartões cuja imagem não carrega são ocultados automaticamente.
- Imagens quebradas também são retiradas do contador, dos filtros disponíveis e da navegação anterior/seguinte.
- Placeholders temporários repetidos não são usados como obras da galeria.
- As referências de capítulos e acontecimentos sem arte foram preservadas nos dados para ativação automática quando os arquivos forem adicionados.

### Arquivos principais

- `app/shared/gallery/gallery.js`;
- `app/shared/gallery/gallery.css`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/gallery.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/gallery.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/gallery.js`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`;
- `data/sagas/ciclo-de-jesed/audits/themes-galleries-etapa-14-15.json`.

### Métricas

- *Ruínas dos Céus*: 87 registros preparados, 35 cartões com imagem local imediatamente disponível.
- *Guerras de Sangue*: 135 registros preparados, 68 cartões com imagem local imediatamente disponível.
- Total: 222 registros de galeria e 103 cartões locais disponíveis neste pacote.

### Validação

- Sintaxe JavaScript validada.
- Rotas de Temas e Galerias testadas nos dois livros.
- Teclado, filtro ativo, contador e fechamento verificados.
- Nenhuma exceção da aplicação.
- Nenhum push realizado no GitHub.

---

## Etapa 16 — Padronização visual e responsividade

**Estado:** CONCLUÍDA  
**Data de conclusão:** 22/06/2026  
**Versão do pacote:** 0.16.1

### Objetivo executado

Os dois livros passaram a compartilhar uma camada visual responsiva sem perder as identidades próprias. Cartões, fotografias, subtítulos, botões, espaçamentos, estados de foco e fallbacks foram padronizados. Nuvens foram preservadas em *Ruínas dos Céus* e partículas traseiras e dianteiras em *Guerras de Sangue*.

### Correções adicionais 0.16.1

- O breadcrumb de páginas detalhadas de *Ruínas dos Céus* deixou de usar o fallback “Arquivo”.
- O breadcrumb de capítulos agora liga corretamente à listagem `#/capitulos`.
- A navegação entre capítulos mantém o botão anterior à esquerda e o próximo à direita.
- O contraste noturno passou a considerar também a cor das caixas por trás dos textos, especialmente na Linha do Tempo.
- *Guerras de Sangue* voltou a carregar a camada visual compartilhada necessária para a estrutura completa.
- O fundo escuro de *Guerras de Sangue* acompanha toda a altura da página.

### Validações realizadas

- breadcrumb de capítulo verificado com retorno funcional à lista;
- ausência de “Página não encontrada” após o clique;
- botões anterior e próximo medidos em lados opostos;
- cores computadas dos cartões noturnos verificadas;
- estrutura de *Guerras de Sangue* confirmada com sidebar fixa, workspace deslocado e conteúdo renderizado;
- `npm run validate`;
- `npm run audit`;
- nenhum push realizado no GitHub.

---

## Etapa 17 — Limpeza técnica final

**Estado:** PENDENTE

### Objetivo

Remover definitivamente tudo o que ficou obsoleto após as novas páginas funcionarem.

### Remover quando não houver mais uso

- componentes antigos de Acontecimentos;
- componentes antigos de Causa e consequência;
- componentes de Continuidade;
- componentes de Decisões do autor;
- componentes de Rotas;
- filtros removidos;
- estilos CSS órfãos;
- imagens duplicadas;
- scripts obsoletos;
- arquivos temporários;
- dados de teste;
- aliases e bridges que já não sejam necessários.

### Não remover

- imagens ainda não ligadas, mas válidas;
- arquivos canônicos;
- IDs estáveis;
- redirecionamentos necessários;
- dados ainda usados por páginas antigas durante migração;
- assets ausentes do pacote intermediário.

---

## Etapa 18 — Validação final

**Estado:** PENDENTE

### Checklist funcional

- páginas iniciais;
- pesquisa de personagens;
- cartões e lista;
- relações;
- família Amaréa;
- organizações;
- clãs;
- mapas;
- pins;
- todos os lugares;
- rotas incorporadas;
- população somente quando aplicável;
- capítulos por lugar com descrição específica;
- Linha do Tempo;
- datas A.Q. e D.Q.;
- páginas individuais de acontecimentos;
- morte de Orionus;
- citações de fauna, flora e alimentos;
- totais;
- conceitos;
- mistérios;
- temas;
- galerias;
- lightbox e setas;
- responsividade;
- modo de desempenho;
- imagens e fallbacks;
- redirecionamentos;
- links quebrados;
- páginas vazias;
- textos incompletos;
- arquivos obsoletos removidos.

### Critérios técnicos

- JavaScript sem erro de sintaxe.
- HTML carregando somente arquivos existentes.
- IDs duplicados: 0.
- IDs removidos sem redirecionamento: 0.
- Referências quebradas: 0.
- Rotas antigas essenciais funcionando.
- Validador concluído sem erro destrutivo.
- Nenhuma informação útil perdida.

---

# 8. Decisões que substituem pedidos antigos

Quando houver conflito, seguir esta seção.

1. **Acontecimentos e Linha do Tempo:** agora existe apenas Linha do Tempo.
2. **Causa e consequência:** não existe como seção separada.
3. **Rotas:** não existem como seção separada; são Lugares.
4. **Continuidade:** removida.
5. **Decisões do autor:** removida.
6. **Pacote de cena:** removido.
7. **Filtros de fauna, flora e alimentos em Ruínas:** removidos.
8. **Filtros de conceitos:** removidos nos dois livros.
9. **Ordenação e exportação:** podem existir como utilitários sem recriar filtros incompatíveis.
10. **Aparições de personagens:** não repetir quando Trajetória já apresenta o que ocorre em cada capítulo.
11. **População:** somente em lugares onde faz sentido.
12. **Estado: Activa:** não usar como informação de lugar.
13. **Arquivos `guerras-4d-*`:** não recriar.
14. **GitHub:** não alterar diretamente no fluxo atual; entregar ZIP completo ao autor.

---

# 9. Regras narrativas relevantes para o conteúdo do site

O site deve respeitar a identidade do Ciclo de Jesed:

- tema central: destino x livre-arbítrio;
- frase possível da saga: “Tudo nasce, cresce e morre. Para depois recomeçar.”;
- finais com esperança depois de perda pesada;
- mundo cíclico e trágico;
- Jesed não é fantasia medieval genérica;
- magia é rara, ambígua e não explicada como sistema simples;
- Etérea permanece parcialmente misteriosa;
- sem profecia clara de Escolhido;
- sem vilões puramente maus;
- sem respostas excessivamente limpas;
- romance não domina a trama;
- tecnologia até aproximadamente o século XVII;
- política sempre possui custo humano;
- personagens podem cometer atrocidades e continuar compreensíveis;
- Polar são necessários e perigosos;
- Kaendar deve permanecer admirável mesmo quando opressiva;
- o leitor deve poder discordar sobre Alyra, Orionus, Rendar, Kaelina e Mark;
- sonhos, maldições, deuses e Sopro devem preservar ambiguidade.

Essas regras afetam textos de temas, mistérios, conceitos, personagens e acontecimentos.

---

# 10. Modelo obrigatório para concluir cada nova etapa

Ao terminar uma etapa, copiar este bloco para a seção correspondente e preencher:

```text
Estado: CONCLUÍDA
Data de conclusão:
Versão do pacote:

Objetivo executado:

Arquivos criados:
- 

Arquivos alterados:
- 

Arquivos removidos:
- 

Entidades criadas:
- 

Entidades atualizadas:
- 

Entidades removidas:
- 

IDs alterados:
- 0 esperado

Redirecionamentos adicionados ou preservados:
- 

Validações realizadas:
- 

Referências quebradas:
- 0 esperado

Assets pendentes de ligação:
- 

Problemas conhecidos:
- 

Decisões tomadas durante a etapa:
- 

Próxima etapa recomendada:
- 
```

---

# 11. Regra de atualização deste documento

Este documento deve ser atualizado em **toda etapa concluída**.

A atualização deve:

1. mudar o estado da etapa na tabela geral;
2. inserir data de conclusão;
3. registrar exatamente o que foi feito;
4. registrar o que não foi feito;
5. registrar decisões novas que substituam decisões anteriores;
6. registrar arquivos removidos;
7. registrar validações;
8. atualizar a versão estrutural no topo;
9. indicar a próxima etapa pendente;
10. atualizar o README quando necessário.

Não criar outro histórico paralelo.

---

# 12. Próxima etapa oficial

## Etapa 17 — Limpeza técnica final

A próxima IA deve começar pela Etapa 17 usando o pacote completo 0.16.1. Deve preservar as correções de breadcrumb, contraste noturno, navegação entre capítulos, carregamento visual de *Guerras de Sangue*, caminhos reais de assets, IDs estáveis, temas, galerias, conceitos, mistérios, mapas, relações, trajetórias, efeitos atmosféricos e todas as etapas anteriores. O foco seguinte é remover estilos, scripts, aliases, componentes e dados realmente obsoletos sem apagar assets válidos ou compatibilidade ainda necessária. Nenhum push deve ser realizado sem autorização.


### Correcção 0.15.1 — Inventário real de assets

- Fonte de verdade: `data/common/inventario-pasta-assets.csv`.
- Manifesto regenerado com 202 entradas, 162 delas visuais.
- Galerias passam a aceitar somente caminhos presentes no inventário.
- Dependências atmosféricas não presentes no inventário foram substituídas por efeitos CSS, preservando o funcionamento ao usar a pasta `assets` do autor.
- Nenhum push realizado no GitHub.


### 2026-09-14 — Dinastia Polar: Famílias, Relações, Organizações e dez Dinastias

- Preenchidas as páginas de **Famílias**, **Relações** e **Organizações** de `Dinastia Polar` usando o manuscrito oficial até o Capítulo 7 e o cânone consolidado do Livro 3.
- Famílias agora incluem a casa coletiva de Maruva, a casa imediata de Vetarius/Elena/Caeren e a casa vazia de Dareth, preservando como não revelados os familiares que o manuscrito ainda não nomeou.
- Relações receberam retratos quando há asset, tipo, estado, descrição, perspectivas de cada lado e evolução por capítulo, no padrão visual compartilhado com os Livros 1 e 2.
- Organizações agora cobrem Companhia da Balança Azul, Culto da Raiz Eterna, Filhos da Raiz, Casas da Permanência, Câmara dos Onze e a estrutura de Kaes/Calandrir; imagens próprias continuam vazias porque não existem assets canônicos para inventar.
- A seção **Dinastias** foi preenchida com as dez potências canônicas: Polar, Buldar, Cendar, Vendrar, Quendrar, Braidar, Grastar, Leidar, Luzdar e Mardrar, incluindo capital, autoridade, representante do torneio, origem, governo, território, economia, cultura, estrutura social e contradição central.
- `characters.js` foi sincronizado com os Capítulos 6 e 7: Karesis deixa de constar apenas como ausente; Elis, Kalan e Orel recebem aparições do Capítulo 6; Dareth e Vetarius recebem o Capítulo 7; Selina tem o estado ajustado ao retorno de Dareth.
- Adicionadas fichas sem imagem inventada para **Caeren Polar** e **Alveris Polar**, ambos já sustentados pelo manuscrito/cânone.
- IDs existentes preservados; nenhum ID canônico foi renomeado.
- Novo módulo `social.js` carregado antes de `index.js`; cache do Livro 3 atualizado para `20260914a`.

### 2026-09-20 — Dinastia Polar: integração de imagens e capítulos 24–36

- Integrados novos retratos, ilustrações dos capítulos 24–36, imagens de lugares e dois animais a partir dos assets locais do autor.
- Capítulos 24–36 receberam fichas com resumos e ligações a personagens e lugares; as novas imagens entram também na galeria.
- IDs e caminhos já existentes foram preservados. Variações de lugares sem ficha própria aparecem na galeria.
- A imagem do Capítulo 36, recebida junto com o manuscrito, também foi incorporada.
- O validador geral de assets já falhava antes desta atualização por 46 PNGs preexistentes e cópias duplicadas dos capítulos 1–23.

- Conferidos 122 caminhos de imagens referenciadas, 36 capítulos e 33 retratos ligados a personagens, sem arquivos ausentes; capítulos, fichas de personagens, lugares, fauna e galeria foram abertos no navegador local.
- As fichas e a lista de fauna agora exibem suas artes, e os novos personagens foram vinculados às dinastias correspondentes quando cadastradas.
