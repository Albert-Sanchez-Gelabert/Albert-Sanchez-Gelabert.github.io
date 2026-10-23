# Integració multilingüe consolidada (EN · CA · ES)

Aquest ZIP conté **totes** les pàgines de la prova pilot i de l'ampliació, i el **selector d'idiomes corregit**. Substitueix els ZIPs anteriors: no cal instal·lar-los per separat.

## Instal·lació

1. Desa una còpia de seguretat dels fitxers actuals o fes `git commit` abans de continuar.
2. Descomprimeix el contingut del ZIP **a l'arrel del projecte de la web Quarto**, just al costat de l'`index.qmd` principal i `_quarto.yml`, **conservant l'estructura de carpetes**. Cal combinar les carpetes `ca/` i `es/` (no substituir-les per una carpeta buida).
3. Accepta substituir `_quarto.yml`, `_includes/multilingual-nav.html` i `styles.css`, i els fitxers `ca/index.qmd`, `ca/research.qmd`, `es/index.qmd` i `es/research.qmd` si cal. Les pàgines angleses originals i els cinc capítols del Lab no se substitueixen.
4. Verifica que ara existeixen `ca/publications.qmd`, `ca/news.qmd`, `ca/cv.qmd`, `ca/tools/index.qmd`, `ca/tools/educational-inequality-lab/index.qmd` i els equivalents d'`es/`. També `ca/publications.ejs.md` i `es/publications.ejs.md`.
5. Renderitza **el projecte complet** des de l'arrel (no només un fitxer):

   ```bash
   quarto render
   quarto preview
   ```

6. Comprova al navegador aquestes rutes:
   - `/ca/publications.html` i `/es/publications.html`
   - `/ca/news.html` i `/es/news.html`
   - `/ca/tools/index.html` i `/es/tools/index.html`
   - `/ca/tools/educational-inequality-lab/index.html` i `/es/tools/educational-inequality-lab/index.html`
7. Força la recàrrega amb `Ctrl+F5` si el menú mostra el comportament anterior.

## Què queda en anglès

Els cinc capítols interactius del Lab i les eines individuals continuen en anglès. Les portades traduïdes enllacen explícitament a aquestes versions.

## Important

El problema de "Not Found" indicat per l'usuari era degut al fet que les carpetes `ca/` i `es/` contenien únicament les pàgines Home i Research de la prova pilot. El ZIP del selector només contenia `_quarto.yml` i `_includes/multilingual-nav.html`; no aportava les pàgines noves.

El paquet s'ha comprovat estructuralment (fitxers, rutes i configuració de Quarto), però no es disposa de l'executable Quarto en aquest entorn per certificar-ne el resultat renderitzat al navegador.
