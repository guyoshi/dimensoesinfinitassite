# AI_UPDATE_RULES — Dimensões Infinitas

Estas regras são obrigatórias para qualquer IA que actualize o conteúdo canónico do site.

## 1. Fonte de verdade

- O site é uma interface de consulta. O cânone é actualizado apenas nos ficheiros do projecto.
- Em **Guerras de Sangue**, considerar apenas o texto efectivamente escrito.
- Não transformar resumos de capítulos futuros em acontecimentos, trajectórias, conhecimento, destinos ou aparições canónicas.
- Quando um capítulo resumido passar a existir como narrativa escrita, ele pode então ser incorporado.
- O livro Guerras de Sangue está completo até o Capítulo 29 — A Raiz que Ficou. Os arquivos permanentes de cada livro ficam em `data/sagas/ciclo-de-jesed/books/<livro>/`. O validador carrega a estrutura completa dos dois livros.

## 2. Nunca inventar

Quando uma informação não estiver definida, usar uma destas opções:

- `null`
- `[]`
- `"Não registado"`, apenas quando o campo exigir texto visível.

Nunca completar aparência, personalidade, conhecimento, destino, localização, relação ou motivação por suposição.

## 3. IDs são permanentes

- Nunca alterar um ID existente porque o nome visível mudou.
- Nunca reutilizar um ID removido para outra entidade.
- Favoritos, anotações e histórico futuro serão ligados ao ID, não ao nome.
- Se duas entidades forem fundidas ou renomeadas, preservar o ID principal e criar um redireccionamento explícito para o ID anterior.

Exemplo:

```json
{
  "oldId": "jesed-character-yvvena",
  "redirectTo": "jesed-character-ylvena"
}
```

## 4. Actualização não destrutiva

- Alterar apenas os campos afectados pela nova fonte.
- Não substituir listas inteiras sem primeiro preservar elementos válidos já existentes.
- Não apagar entidades silenciosamente.
- Não remover relações, fontes, aparições ou registros da Linha do Tempo por ausência numa nova análise parcial.
- Antes de remover qualquer entidade, explicar o motivo no relatório de alterações.

## 5. Tipos de verdade separados

Nunca misturar:

- verdade do autor;
- conhecimento do leitor;
- conhecimento de cada personagem;
- crença cultural;
- rumor;
- ideia provisória.

Uma crença de clã não deve ser registada como verdade do autor.

## 6. Lente do livro

Toda informação temporal deve indicar a qual livro ou período pertence.

- Um estado de personagem em Guerras de Sangue não substitui estados futuros.
- Uma localização posterior não deve aparecer na lente de Guerras de Sangue.
- Não introduzir acontecimentos de Dinastia Polar, Herdeiros das Cinzas ou Coração de Poeira durante actualizações limitadas aos dois primeiros livros.

## 7. Fontes

Toda informação narrativa importante deve apontar para uma fonte:

- livro e capítulo;
- documento de lore;
- decisão explícita do autor.

Não citar um resumo futuro como fonte de acontecimento já ocorrido.

## 8. Contagens

- Contagens de citações devem ser derivadas de referências por capítulo, não alteradas manualmente sem fonte.
- Índices de pesquisa, totais e ficheiros derivados devem ser reconstruídos, não editados manualmente.

## 9. Protecção dos dados pessoais

- Conteúdo canónico e dados pessoais são sistemas separados.
- Nunca guardar favoritos, anotações, histórico ou preferências dentro dos ficheiros canónicos.
- Nunca apagar ou migrar IDs sem manter compatibilidade com dados pessoais ligados a eles.
- A futura base de dados pessoal deve guardar apenas `user_id`, `entity_id`, `entity_type` e os dados pessoais necessários.

## 10. Validação obrigatória

Antes de publicar:

1. validar a sintaxe dos dados;
2. verificar IDs duplicados;
3. comparar o manifesto anterior e o novo;
4. detectar IDs removidos;
5. verificar relações para entidades inexistentes;
6. verificar personagens ligadas a clãs, lugares e capítulos válidos;
7. verificar caminhos de imagens;
8. verificar que nenhum capítulo resumido foi marcado como escrito;
9. gerar relatório de alterações;
10. apresentar prévia antes da publicação definitiva.

## 11. Relatório mínimo

Toda actualização deve informar:

```text
Entidades criadas:
Entidades actualizadas:
Entidades removidas:
IDs alterados: 0 esperado
Referências quebradas: 0 esperado
Campos deixados sem informação:
Fontes consultadas:
Avisos narrativos:
```

## 12. Regra de falha segura

Se a validação detectar corrupção, referência quebrada ou desaparecimento inesperado de ID, a actualização não deve ser publicada.


## 13. Imagens e brasões

- Preservar os caminhos existentes das imagens sempre que a entidade continuar a mesma.
- Não criar brasão para os Fendelar: eles são o único clã sem brasão.
- Quando uma imagem for substituída, manter o ID da entidade e alterar apenas o caminho do asset.
- Validar todos os caminhos antes da publicação.

## 14. Plano mestre obrigatório

- Antes de qualquer alteração, ler `PLANO-MESTRE-E-HISTORICO.md` por completo.
- O arquivo define a ordem das etapas, as decisões mais recentes, o protocolo de trabalho e o estado atual do projeto.
- Trabalhar sempre sobre o pacote mais recente enviado pelo autor.
- Não usar nem alterar o GitHub quando o autor tiver enviado a pasta de trabalho, salvo autorização explícita.
- Atualizar o plano mestre ao concluir cada etapa.
- Não criar outro histórico ou plano paralelo.


## Arquitetura obrigatória desde a Etapa 3

- Não criar scripts ou CSS de livros na raiz.
- Manter na raiz apenas entradas HTML, documentação, `.nojekyll` e `package.json`.
- Código de livro: `app/sagas/<saga>/books/<livro>/`.
- Dados de livro: `data/sagas/<saga>/books/<livro>/`.
- Código reutilizável: `app/shared/`.
- Não voltar a nomes temporários como `4d`, `patch-final`, `novo`, `backup` ou `corrigido` nos arquivos definitivos.
- Novas sagas e livros devem repetir o mesmo padrão, sem arquivos soltos por título na raiz.


## 15. Linha do Tempo desde a Etapa 4

- A Queda é o marco zero entre A.Q. e D.Q.
- Usar ciclos, nunca anos.
- Usar meses ordinais; não inventar dias.
- Toda estimativa deve permanecer explicitamente marcada como aproximada.
- Não confundir a data do acontecimento com o capítulo em que ele foi citado, recordado, investigado ou revelado.
- Preservar `id`, `slug`, `legacySlugs`, `date`, `dateLabel`, `sortKey` e `chapterLinks`.
- Relações de capítulo permitidas: `ocorre`, `citado`, `recordado`, `investigado`, `revelado` e `consequencia`.
- Páginas individuais devem manter descrição, contexto, causa, consequências, participantes, lugares, capítulos e acontecimentos relacionados.
- A verdade da morte de Orionus não pode regredir: Ylvena pretendia envenenar Alyra, Orionus bebeu por engano e Daryon falsificou as provas.
- Rotas históricas de Acontecimentos devem continuar redirecionando para a Linha do Tempo.

## 16. Lugares desde a Etapa 5

- Rotas são lugares e não podem voltar a existir como seção independente.
- Preservar os IDs históricos `route-*` das cinco rotas de *Guerras de Sangue*.
- Não usar `Estado: Activa` ou `Estado: Ativa` nas fichas de lugares.
- Mostrar população somente quando houver estimativa aplicável; quando não houver, omitir o campo.
- Não atribuir população a rios, florestas, estradas, gargantas, rotas, montanhas ou regiões naturais.
- Preservar `region`, `location`, `description`, `narrativeFunction`, `architecture`, `atmosphere`, `resources`, `dangers`, `culture`, `population`, `chapterScenes`, `characterIds` e `eventIds`.
- “Personagens que passaram por aqui” deve ser derivado das cenas do livro, nunca da última localização do personagem.
- Capítulos ligados devem descrever somente a cena ocorrida no lugar, e não repetir o resumo geral do capítulo.
- Estimativas populacionais são editoriais e podem ser corrigidas sem alterar IDs.

## 17. Estado atual

- Etapas 1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9 e 10 concluídas.
- Próxima etapa oficial: **Etapa 11 — Fauna, flora e alimentos**.


## 18. Identidade visual e desempenho desde a Etapa 5.5

- Preservar `app/shared/experience/` como fundação reutilizável.
- Efeitos específicos devem permanecer em `app/sagas/<saga>/books/<livro>/experience/`.
- Preferências globais usam as chaves `di-*`; preferências específicas usam `di-ruinas-*` e `di-guerras-*`.
- Uma preferência específica de um livro não pode alterar a atmosfera do outro.
- Os perfis obrigatórios são Completo, Equilibrado, Desempenho e Personalizado.
- O botão de modo desempenho deve permanecer sempre acessível e seu estado não pode depender apenas de cor.
- Não adicionar biblioteca pesada para nuvens, partículas, parallax ou transições sem justificativa documentada.
- Não criar centenas de elementos HTML para partículas; Guerras utiliza Canvas com limites rígidos.
- Pausar cálculos e Canvas quando a aba estiver oculta ou a experiência não estiver ativa.
- Respeitar `prefers-reduced-motion`, `navigator.connection.saveData`, dispositivos móveis e hardware limitado.
- O modo contemplativo deve poder ser fechado por botão e por `Escape`, sem prender o foco ou iniciar áudio contra a política do navegador.
- Não remover ou contornar preferências de música, volume e silenciar.
- O relógio visual de Ruínas é temporário e deve continuar identificado como ferramenta de teste até aprovação.
- Não criar brasão Fendelar. `assets/shared/reference/fendelar-mark.webp` é somente uma marca neutra e não heráldica.
- Recursos em `assets/**/temp/` são substituíveis, não canônicos e devem permanecer documentados.
- Ao substituir um placeholder, preservar o caminho é preferível; se o caminho mudar, atualizar CSS, documentação e validação.
- A Etapa 5.5 não autoriza mudanças de nomes, descrições ou informações canônicas.
- As Etapas 6, 7, 8, 9, 10 e 11 foram concluídas; a próxima etapa funcional é a Etapa 12 — Conceitos.


## 19. Mapas interativos desde a Etapa 6

- Preservar `app/shared/maps/interactive-map.js` e `app/shared/maps/interactive-map.css` como módulo reutilizável.
- Dados cartográficos específicos permanecem em `data/sagas/<saga>/books/<livro>/maps.js`.
- *Ruínas dos Céus* deve manter dois mapas separados: Etérea e A Superfície.
- Todos os 17 lugares de Ruínas devem continuar associados a um dos dois mapas.
- *Guerras de Sangue* deve manter os 23 lugares no mapa principal.
- As cinco entidades com IDs `route-*` continuam sendo lugares e não podem voltar a uma seção independente de Rotas.
- Não alterar IDs de lugares para ajustar coordenadas. Coordenadas podem ser refinadas sem mudar identidade ou rota.
- A seção estratégica de Guerras só pode exibir categorias com duas ou mais informações.
- Preservar zoom, deslocamento, centralização, nomes, pins, ficha rápida, abertura da ficha e responsividade.
- Os textos de contexto de Etérea e da Superfície devem permanecer integrados às imagens dos mapas.
- A navegação anterior/próximo dos capítulos deve permanecer no topo das fichas nos dois livros.
- Personagens em foco devem mostrar apenas figuras principais, sem estado, e com descrições de no máximo quatro palavras.
- O relatório `data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json` deve continuar válido.


## 20. Páginas iniciais e assets desde a Etapa 7

- `data/common/assets-manifest.json` é a referência oficial para nomes, extensões e pastas das imagens entregues pelo autor.
- Não regredir caminhos WebP para `.png`, `.jpg` ou pastas genéricas.
- Retratos de *Ruínas dos Céus* ficam em `assets/characters/ruinas/`.
- Retratos de *Guerras de Sangue* ficam em `assets/characters/guerras-de-sangue/`.
- Os mapas definitivos usam os caminhos registrados no manifesto.
- Não inventar imagem para entidade sem arquivo correspondente; usar fallback visual.
- Os capítulos 19 e 22 de *Ruínas dos Céus* não possuem ilustração no inventário atual.
- As páginas iniciais dos dois livros devem manter exatamente quatro cartões orientadores: Personagens, Relações, Linha do Tempo e Capítulos.
- A seção Últimos capítulos não pode voltar às páginas iniciais.
- As páginas iniciais devem manter Personagens em foco e a seção Lugares com cartões fotográficos.
- O mapa de Guerras deve permanecer grande e acompanhado de atalhos estratégicos resumidos.
- Ruínas deve preservar as prévias separadas de Etérea e A Superfície.

## 21. Personagens desde a Etapa 8

- Preservar `app/shared/characters/browser.js` e `app/shared/characters/browser.css` como módulo reutilizável.
- Os dois livros devem manter pesquisa de personagens e alternância entre cartões grandes e lista compacta.
- A visualização escolhida é persistida separadamente por livro; não voltar a uma chave global única.
- Cartões grandes exibem retrato, nome, subtítulo simples e descrição curta; a lista mantém acesso rápido e compacto.
- Em *Ruínas dos Céus*, subtítulos como “Protagonista e Âncora” permanecem texto simples abaixo do nome, nunca cápsulas ou tags.
- A ficha de Ruínas não deve recuperar o campo redundante Aparições quando a Trajetória já apresenta os capítulos.
- Trajetória é conteúdo específico do personagem em cada capítulo. É proibido usar o resumo geral do capítulo como fallback.
- Todos os capítulos listados na Trajetória devem permanecer clicáveis.
- Todas as imagens disponíveis no inventário devem permanecer ligadas. A segunda imagem de Orionus é um retrato alternativo, não substituição obrigatória do principal.
- Eshvar, Maedra e Capitão Lirron não possuem retratos no inventário atual; usar fallback e não inventar caminhos.
- Preservar as frases-guia específicas das páginas de Personagens de cada livro.
- O relatório `data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json` deve continuar válido.


## 23. Relações, famílias, organizações e imagens desde a Etapa 9

- Preservar `app/shared/social/network.css` como fundação visual compartilhada.
- Em *Ruínas dos Céus*, a única ficha familiar própria é **Os Amaréa**.
- Não criar famílias genéricas apenas para preencher a seção.
- Os tipos visuais de relações de Ruínas são: família, amizade, proteção, influência, conflito, rivalidade, lealdade e relação rompida.
- Toda relação enriquecida deve manter participantes válidos, tipo, estado, descrição, perspectivas e evolução.
- Organizações devem existir no cânone do livro; não criar instituições por simetria artificial.
- Imagens atmosféricas e sociais substituíveis estão listadas em `docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md` e `data/common/image-requirements-etapa-9.json`.
- Para substituir uma imagem, manter exatamente o mesmo caminho, nome, formato WebP e, quando indicado, canal alfa.
- Não voltar a incorporar SVG atmosférico quando já houver caminho rasterizado definido.
- Sprites de partículas podem falhar sem quebrar o Canvas: preservar o fallback desenhado por código.
- Imagens sociais e texturas devem possuir fundo visual de segurança para evitar áreas vazias ou erro aparente.
- Não usar URLs externas para texturas, nuvens, partículas, famílias ou organizações.

## 24. Clãs desde a Etapa 10

- Preservar `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/clans.js` como camada estruturada das fichas de clã.
- Preservar `app/shared/clans/presentation.css` como apresentação reutilizável; não voltar a espalhar estilos de clã no arquivo principal.
- Os oito clãs devem manter origem, território, cultura, economia, modo de vida, estrutura social, alimentação, relações, forças, fragilidades, participação na guerra e situação final.
- População e força militar são estimativas editoriais e devem permanecer apresentadas como faixas, com explicação e possibilidade de revisão sem alteração de ID.
- Cada ficha deve apresentar os sete outros clãs; quando o texto estiver registrado no documento do outro povo, a interface pode usar essa perspectiva.
- Personagens aparecem depois dos textos, em cartões clicáveis com foto, nome e função. Não inventar personagem para um clã sem figura individualizada.
- É proibido restaurar “Lore relacionada” como bloco genérico. Manter Alimentos, Fauna e Flora em seções independentes.
- Cartões de recursos devem apontar para fichas válidas e usar fallbacks locais quando a imagem não existir.
- Preservar `assets/books/ciclo-de-jesed/shared/lore/temp/food-placeholder.webp`, `fauna-placeholder.webp` e `flora-placeholder.webp` enquanto não houver imagem canônica.
- O Arquivo aprofundado do clã preserva o conteúdo extenso anterior e não pode ser apagado para simplificar a página.
- Os Fendelar continuam sem brasão formal. `assets/shared/reference/fendelar-mark.webp` não é brasão e não pode ser promovido a símbolo canônico.
- A situação final de cada clã deve respeitar o encerramento de *Guerras de Sangue*; não retroceder para estados anteriores ao Capítulo 29.
- O relatório `data/sagas/ciclo-de-jesed/audits/clans-etapa-10.json` deve continuar válido.



## 25. Fauna, flora, alimentos, relógio e sinopses desde a Etapa 11

- Preservar `lore-stage11.js` nos dois livros como camada de contagens, descrições e citações verificadas.
- Toda ficha de fauna, flora ou alimento deve manter imagem, descrição completa, características, habitat, usos, total de citações e lista de menções.
- Cada menção deve conservar capítulo, trecho, contexto curto e ligação para o capítulo.
- Contagens devem considerar singular, plural, variações de acento e hífen, aliases e nomes indiretos somente quando o contexto confirmar a mesma entidade.
- O **Raukhar** de *Ruínas dos Céus* conserva o ID `jesed-fauna-raukhar` e o slug histórico `raukhar`. `Raukhar` é a grafia canônica atual; o identificador técnico antigo não deve ser renomeado.
- Cartões de listagem não devem receber o texto integral da ficha. Mostrar somente foto, nome, descrição breve e total de citações.
- Não restaurar filtro por clã em fauna, flora ou alimentos de *Ruínas dos Céus*.
- Conceitos não devem possuir filtros em nenhum dos dois livros. A criação das fichas clicáveis de conceitos em Ruínas pertence à Etapa 12.
- A exportação de itens não citados pode permanecer como utilitário, separada dos filtros.
- O relógio de Ruínas não usa a hora real. `CYCLE_DURATION_MS` deve permanecer em aproximadamente dez minutos por volta completa de 24 horas.
- O simulador de horário deve interromper o ciclo, aplicar imediatamente o minuto selecionado e atualizar fase do céu, sol, lua e nuvens.
- Ao reativar o ciclo automático, ele deve continuar a partir do horário escolhido no simulador, não saltar para a hora do dispositivo.
- O botão do ciclo deve indicar claramente “Ciclo 10 min” ou formulação equivalente.
- Os dois livros devem manter `teaser` curto para cartões e `synopsis` editorial completa para a página individual de Livros.
- Não voltar a usar descrições puramente atmosféricas como sinopse principal.
- O relatório `data/sagas/ciclo-de-jesed/audits/lore-etapa-11.json` deve continuar válido.


## 26. Reforma linguística e nomes canônicos — 24/09/2026

A reforma linguística aprovada no repositório canônico deve aparecer nos **nomes visíveis** do site sem quebrar IDs, slugs, rotas ou caminhos históricos já persistidos.

### Livro 1 — Ruínas dos Céus

Formas visíveis atuais:

- Gabasteres → **Gabasteri**
- Marv → **Mariv** dentro do recorte eterí e do Livro 1
- Malthar → **Maletar**
- Yrséa / Yriséa → **Yrisea**
- Talver → **Taliver**
- Nivellia → **Nivelia**
- Nadírion → **Nadirion**
- Aelôris → **Aeloris**
- Rhaukar → **Raukhar**

**Atenção:** Marv continua válido como forma histórica pós-Queda. Não substituir globalmente Marv por Mariv fora da lente do Livro 1.

### Livro 2 — Guerras de Sangue

- Markoso → **Marken**
- Alesteiro → **Alestir**
- Rhaukar → **Raukhar**

### Livro 3 — Dinastia Polar

- Braidar → **Braedar**
- Luzdar → **Lusdar**
- Luzhara → **Lushara**
- Rhaukar → **Raukhar**

### Livro 4 — Herdeiros das Cinzas

Quando essas entidades forem incorporadas aos módulos ainda vazios do site, usar:

- Nefestisa → **Nefestra**
- Kedastos → **Kedran**
- Jelatérea → **Jelatira**
- Maltharos → **Maltaren**
- Klaftresos → **Klafres**
- Mentesera → **Mentesra**
- Rhaukar → **Raukhar**

### Compatibilidade obrigatória

- `jesed-character-marv`, `jesed-character-malthar`, `jesed-character-gabasteres`, `jesed-character-yrsea`, `jesed-character-professor-talver`, `jesed-character-markoso`, `jesed-place-nivellia`, `jesed-place-alesteiro`, `jesed-fauna-raukhar` e outros IDs históricos **não devem ser renomeados**.
- Slugs e caminhos de assets antigos podem permanecer quando necessários para compatibilidade.
- Manifestos de assets, inventários e auditorias históricas podem conter a grafia antiga quando ela fizer parte de um filename, ID, slug ou fotografia do estado anterior.
- Textos exibidos ao leitor, fichas, resumos, timeline, trajetórias, relações, mapas e documentação corrente devem usar a forma canônica nova.

### Léxico oficial já sincronizado

- **Nadirion** = nadi + ri + -on, aproximadamente “domínio abaixo” / “região inferior”.
- **Aeloris** = ael + or + -is, aproximadamente “os soprados pela origem”.
- **Kaendar** = Kae + -ndar, “fortaleza de Kae”.
- **khar-** = elemento antigo para cidadela/grande fortificação de pedra.
- **Levis** foi um estágio linguístico completo; no período de Ruínas dos Céus permanece principalmente como língua clássica e ritual.