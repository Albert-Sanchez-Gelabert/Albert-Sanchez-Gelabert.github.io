# Dissecting a Study — integració al web multilingüe

Aquest ZIP és una **actualització parcial** del projecte Quarto, no un projecte nou.
Conté els fitxers nous i els fitxers modificats que cal copiar a l'arrel del repositori, **conservant l'estructura de carpetes**.

## Com integrar-ho

1. Fes una còpia de seguretat o un commit de l'estat actual.
2. Descomprimeix el ZIP a l'arrel del projecte `Albert-Sanchez-Gelabert.github.io`. Confirma la substitució dels fitxers inclosos, sense esborrar les altres carpetes.
3. Obre el projecte a RStudio/terminal i executa `quarto render`. Revisa Home, Explore i Publications en els tres idiomes.
4. Publica com ho fas habitualment amb Git/GitHub Pages. Si el lloc es publica a partir de `_site`, assegura't que els HTML estàtics dins de `dissecting/` s'han copiat a `_site`.

### Nou menú Explore

- Research Tools → `tools/index.html`
- Educational Inequality Lab → `tools/educational-inequality-lab/index.html`
- Dissecting a Study → `dissecting/index.html`

La traducció del menú i dels enllaços es gestiona des de `_includes/multilingual-nav.html`.

### Dissecting a Study (col·lecció i estudis)

Pàgina de la col·lecció en `.qmd`: `dissecting/index.qmd`, `ca/dissecting/index.qmd`, `es/dissecting/index.qmd`.

Cada estudi és un HTML **estàtic i autònom**, conscientment desvinculat de la plantilla Quarto: preserva l'estètica pròpia del Pilot 03, la navegació sense scroll continu i els textos que s'han anat acordant. El seu menú intern EN/CA/ES preserva la fase oberta, i un enllaç torna a la col·lecció.

La còpia dels HTML a `_site` s'especifica a `_quarto.yml` via `project.resources`.

| Idioma | Col·lecció | Pilot d'estudi |
|---|---|---|
| EN | `/dissecting/index.html` | `/dissecting/university-trajectories/index.html` |
| CA | `/ca/dissecting/index.html` | `/ca/dissecting/university-trajectories/index.html` |
| ES | `/es/dissecting/index.html` | `/es/dissecting/university-trajectories/index.html` |

### Integracions

- Home: tres entrades (Tools, Lab, Dissecting).
- Research: enllaç discret a la dissecció dins de *Complex Trajectories*.
- Publications: enllaç contextual només per a l'article amb DOI `10.1080/21568235.2025.2556438` en cadascun dels tres `publications.ejs.md`.
- Tools: eliminació del destacat del Lab, mantenint intactes les cinc eines.

**No hem modificat els continguts dels cinc capítols del Lab, les eines individuals, les publicacions bibliogràfiques o els articles de News.**

### Futurs estudis

Afegir una segona dissecció implicarà: una carpeta `dissecting/<slug>/` (amb els equivalents CA/ES), una fitxa nova als tres `dissecting/index.qmd`, tres recursos a `_quarto.yml` i, si escau, un enllaç a la publicació corresponent. No cal crear una nova pestanya principal.

### Nota de verificació

Comprovacions efectuades: sintaxi YAML, estructura HTML, rutes internes i enllaços de llengua, integritat dels materials i anàlisi del JavaScript. Aquest entorn **no té l'executable Quarto**; cal verificar `quarto render` al teu ordinador abans de publicar.
