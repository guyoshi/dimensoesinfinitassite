# Sincronização de imagens do site

As imagens canônicas dos livros ficam nas pastas `<série>/<livro>/02 - Assets` da cópia local de **Dimensões Infinitas**. O site guarda cópias WebP para publicação; um site público não consegue ler diretamente os arquivos do OneDrive do computador.

O arquivo `data/common/book-assets-source-map.json` liga **306 imagens** do site às respectivas fontes, incluindo *Ruínas dos Céus*, *Guerras de Sangue*, *Dinastia Polar* e as capas de *Herdeiros das Cinzas*. Para publicar, dê um clique duplo em **`PUBLICAR_IMAGENS.cmd`** na pasta `Site`. O programa detecta quais fontes mudaram, atualiza as cópias WebP e os inventários do site, cria um commit apenas com essas alterações e envia o site ao GitHub. Também pode ser executado pelo terminal:

```powershell
python scripts/publicar_imagens.py
```

Execute com a branch `main` e sem outras alterações locais pendentes. Se o GitHub estiver indisponível, o commit local é preservado; execute novamente quando a conexão voltar. Antes de publicar, é possível apenas conferir o que mudaria:

```powershell
python scripts/sync_book_assets.py --check
```

Ao criar um novo site de livro, da mesma série ou de outra, use a estrutura `Site/assets/books/<serie>/<livro>/` e mantenha a fonte em `<série>/<livro>/02 - Assets`. O comando descobre automaticamente novos livros e imagens WebP já colocadas no Site quando há correspondência **exata e única dentro daquele livro** (por exemplo, `Capitulos/Capítulo 1.png` ↔ `chapters/chapter-01.webp`). Também acrescenta essas imagens ao inventário se ainda não constarem. Uma imagem nova que ainda não foi colocada nem referenciada no Site não é publicada automaticamente; a página do novo livro precisa ser criada normalmente.

As **58 imagens WebP restantes** não têm fonte canônica vinculada. São sobretudo marcas, efeitos visuais, imagens temporárias e algumas ilustrações que existem apenas no site. Elas permanecem intactas. A lista exata está em `siteOnly` no mapa. Uma identidade ambígua exige vínculo manual; o processo não adivinha a identidade de imagens parecidas.

Há ainda 23 PNG antigos em `assets/books/ciclo-de-jesed/dinastia-polar/Capitulos/` que duplicam artes já disponíveis como WebP em `chapters/`; não são usados nas páginas nem entram neste fluxo. Um logo isolado na raiz de `assets/` está entre os 58 WebP sem fonte vinculada. Esses arquivos legados devem ser tratados separadamente, sem assumir que sejam versões canônicas.

Não use `scripts/migrate_assets.py` como substituto desta sincronização para as imagens já mapeadas: ele atende à importação/normalização, enquanto `scripts/sync_book_assets.py` acompanha as fontes canônicas existentes.
