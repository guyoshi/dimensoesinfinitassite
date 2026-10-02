# Sincronização de imagens do site

As imagens canônicas dos livros ficam nas pastas `Ciclo de Jesed/<livro>/02 - Assets` da cópia local de **Dimensões Infinitas**. O site guarda cópias WebP para publicação; um site público não consegue ler diretamente os arquivos do OneDrive do computador.

O arquivo `data/common/book-assets-source-map.json` liga **276 imagens** do site às respectivas fontes. Para publicar, dê um clique duplo em **`PUBLICAR_IMAGENS.cmd`** na pasta `Site`. O programa detecta quais fontes mudaram, atualiza as cópias WebP e os inventários do site, cria um commit apenas com essas alterações e envia o site ao GitHub. Também pode ser executado pelo terminal:

```powershell
python scripts/publicar_imagens.py
```

Execute com a branch `main` e sem outras alterações locais pendentes. Se o GitHub estiver indisponível, o commit local é preservado; execute novamente quando a conexão voltar. Antes de publicar, é possível apenas conferir o que mudaria:

```powershell
python scripts/sync_book_assets.py --check
```

As **57 imagens restantes** do inventário não têm fonte canônica vinculada. São sobretudo marcas, efeitos visuais, imagens temporárias e algumas ilustrações que existem apenas no site. Elas permanecem intactas. A lista exata está em `siteOnly` no mapa. A criação de um novo asset também exige registrar sua correspondência nesse mapa e no inventário do site; o processo não adivinha a identidade de uma imagem nova.

Não use `scripts/migrate_assets.py` como substituto desta sincronização para as imagens já mapeadas: ele atende à importação/normalização, enquanto `scripts/sync_book_assets.py` acompanha as fontes canônicas existentes.
