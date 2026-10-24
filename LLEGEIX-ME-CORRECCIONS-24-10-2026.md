# Dissecting a Study — dues correccions (24/10/2026)

Aquest ZIP és una actualització **puntual** per incorporar al teu repositori Quarto; no cal substituir la resta del web.

## Què s'ha corregit?

1. **University Trajectories**: els tres HTML (EN, CA, ES) inclouen la barra de navegació principal *Albert Sánchez-Gelabert* amb enllaços a Home/Inici, Research/Recerca, Publications/Publicacions, News/Actualitat, Explore/Explora i CV. En mòbil, els mateixos enllaços són accessibles a *Menu/Menú*. La capçalera pròpia de Dissecting i la navegació de les vuit etapes es mantenen.
2. **Gender & STEM**: a **07 — The conclusions**, al desplegable *Profiles change the picture* (i equivalents CA/ES), s'elimina el bloc gràfic **PUBLISHED STUDENT PROFILES** amb les vuit targetes de clústers. Se'n manté l'explicació textual. Els vuit perfils continuen formant part de l'explicació metodològica i dels resultats; no s'han eliminat de l'article o del relat.

## Fitxers que cal substituir

- `dissecting/university-trajectories/index.html`
- `ca/dissecting/university-trajectories/index.html`
- `es/dissecting/university-trajectories/index.html`
- `dissecting/gender-stem/index.html`
- `ca/dissecting/gender-stem/index.html`
- `es/dissecting/gender-stem/index.html`

## Publicació (important per a la barra superior)

1. Copia els sis HTML **a l'arrel del repositori original**, respectant exactament les carpetes. Fes un commit dels sis fitxers.
2. Comprova que `_quarto.yml`, dins `project.resources`, inclou explícitament els sis `index.html` enumerats més amunt. El paquet complet també inclou l'exemple configurat.
3. Executa `quarto render` i comprova que els sis fitxers apareixen actualitzats a `_site/dissecting/...`, `_site/ca/dissecting/...` i `_site/es/dissecting/...`.
4. Publica **el directori o la branca que GitHub Pages serveix realment**. Canviar els fitxers font sense publicar l'HTML generat no actualitza el lloc visible.
5. Obre el web públic, actualitza forçant la recàrrega (Ctrl/Cmd + Maj + R) i confirma que a `dissecting/university-trajectories/` apareixen a dalt la marca *Albert Sánchez-Gelabert* i el menú.

**Com distingir versions:** el nou HTML d'University Trajectories conté la metadada `<meta name="dissecting-site-nav-revision" ...>` amb el valor `2026-10-24-navigation-republished`. Si no hi apareix en veure el codi font del web publicat, probablement s'està servint una versió antiga o no s'ha actualitzat la branca/directori de publicació.

## Verificacions

S'han comprovat els sis HTML: presència de la barra principal, del menú mòbil, de les vuit pantalles, de la navegació entre apartats, i l'absència del gràfic de vuit targetes a les conclusions de Gender & STEM. Les proves s'han fet amb Chromium sobre còpies locals; la publicació remota queda a càrrec de l'usuari.
