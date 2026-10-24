# Dissecting a Study · Life Course — Revisió editorial

Actualització del tercer estudi, en català, anglès i castellà. **No modifica University Trajectories ni Gender & STEM.**

## Què s'ha canviat

1. **Títols 01–07:** recuperada una paraula en color d'accent rosat/vermell a cada pregunta, mantenint el tractament gràfic del primer *Dissecting*.
2. **01 · The question:** reescrit com a pas de «què pesa més, l'edat o el treball?» a «com canvia amb l'edat l'associació entre treball i graduació?». Ja no repeteix la tipologia de 2017.
3. **02 · Previous work:** ampliat amb recerca internacional sobre estudiants no tradicionals, treball i permanència, incloent Bean & Metzner (1985), Schuetze & Slowey (2002), Bozick (2007) i Carreira & Lopes (2020). Ara la recerca catalana apareix com un antecedent més, en un únic subapartat. S'hi afegeixen enllaços bibliogràfics verificats.
4. **00 · Overview:** subtítol i enllaços de referència reformulats per no donar protagonisme desproporcionat als estudis propis de 2017.
5. **04, 05 i 07:** eliminades referències cronològiques reiteratives als articles anteriors. Es manté la comparació metodològica entre enquestes només a graduats i cohorts de nou accés, i la diferència entre edat categoritzada i contínua.
6. **Metadades:** descripció de pàgina adaptada al tema de *Life Course* (abans conservava incorrectament una descripció de *Gender & STEM*).

La mostra (29.463), els resultats publicats (−2,8 i −7,6 punts percentuals) i els matisos de la inferència estadística **no s'han alterat**. Es manté l'estructura 00–07, els desplegables, la barra de navegació de la web, el selector d'idioma i els ancoratges `#s0` a `#s7`.

## Fitxers modificats

- `dissecting/life-course/index.html` (anglès)
- `ca/dissecting/life-course/index.html` (català)
- `es/dissecting/life-course/index.html` (castellà)

## Instal·lació

Descomprimeix a l'arrel del repositori i substitueix només aquests tres HTML mantenint les carpetes. Després:

```bash
quarto render
```

Comprova que existeixin a `_site/dissecting/life-course/index.html`, `_site/ca/dissecting/life-course/index.html` i `_site/es/dissecting/life-course/index.html` abans de publicar al web habitual.

## Comprovacions efectuades

Navegació i desplegables comprovats a les tres llengües amb Chromium a mides escriptori i mòbil. S'han comprovat els enllaços de literatura, els destacats dels set títols i la conservació de la pantalla de conclusions. ZIP verificat amb comprovació de CRC.

**Nota editorial:** aquesta versió manté el caràcter de *Dissecting a Study* — una lectura guiada de les decisions de recerca — i no s'ha convertit en una eina d'anàlisi o simulació.
