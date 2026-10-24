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

Cada estudi continua sent un HTML **estàtic i autònom** (no es renderitza amb la plantilla de Quarto), però **ara està visualment integrat en la navegació del web**: incorpora a la part superior la marca «Albert Sánchez-Gelabert» i els enllaços a Inici/Home, Recerca/Research, Publicacions/Publications, Actualitat/News, Explora/Explore i CV. El menú Explore obre les tres seccions (Eines / Research Tools, Educational Inequality Lab i Dissecting a Study). En pantalles petites, aquests enllaços apareixen agrupats en un menú mòbil. Les rutes i els textos s’adapten a l’idioma de cada versió (EN/CA/ES).

Per sota es manté **intacta la capçalera pròpia de Dissecting**, amb l’enllaç a la col·lecció, el distintiu del pilot i el selector de llengua. També es preserven els continguts, el funcionament per fases, la navegació sense scroll continu i l’estètica del Pilot 03. El menú intern EN/CA/ES continua preservant la fase oberta (fragment `#s0`–`#s7`).

**Nota tècnica:** la navegació general dels estudis s’inclou dins de cadascun dels tres HTML, perquè són recursos estàtics: no hereten automàticament `_quarto.yml` ni `_includes/multilingual-nav.html`. Quan en el futur canviï el menú principal o s’afegeixin estudis, caldrà traslladar aquesta navegació als nous HTML i mantenir-la sincronitzada amb la capçalera Quarto. No s’hi afegeixen dependències de CSS o JS externes.

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

Comprovacions efectuades sobre aquesta revisió: estructura HTML, rutes i enllaços de navegació en EN/CA/ES, canvi de fase, selector de llengua i presentació d’escriptori/mòbil. Els continguts de les vuit pantalles de cada estudi es conserven. Aquest entorn **no té l’executable Quarto**; cal verificar `quarto render` al teu ordinador abans de publicar.
