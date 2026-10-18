# Educational Inequality Lab — Quarto v2 (landing + chapter 1)

This revision separates **The Journey / Beyond merit** landing page from the **Does school context matter?** interactive chapter. It corrects the earlier overlapping two-column layout and suppresses Quarto's duplicate page title.

## Installation in your existing website

Copy the whole `educational-inequality-lab` directory into the `tools` folder of your website, keeping this structure:

```text
tools/
  educational-inequality-lab/
    index.qmd                <-- Lab home / overview
    lab-home.css
    chapter-1/
      index.qmd              <-- Interactive chapter
      lab.css
      lab.js
```

**Replace** the three existing chapter-1 files (`index.qmd`, `lab.css`, `lab.js`). No other tools need to change.

From the root of the website project:

```bash
quarto preview tools/educational-inequality-lab/index.qmd
```

The chapter can be opened via **Start with Chapter 1**, or directly previewed:

```bash
quarto preview tools/educational-inequality-lab/chapter-1/index.qmd
```

The homepage is `tools/educational-inequality-lab/index.html`; the chapter is `tools/educational-inequality-lab/chapter-1/index.html` after rendering.

**Important:** This package does **not** change `tools/index.qmd` or your site's `_quarto.yml`. To list the Lab on your Tools page, add a link to `/tools/educational-inequality-lab/` using the route conventions of your site.

## What's different

- Introductory **Beyond merit** section and chapter directory now live on a dedicated homepage.
- The chapter has a compact breadcrumb back to **All chapters** and a single-column layout.
- **Quarto's duplicate page heading is disabled** with `title: false`; `pagetitle` sets the browser tab title.
- All five discovery scenes, interactive controls and empirical data in `lab.js` are unchanged.
- Later chapters are shown as **Coming soon**, without broken links.

## Methodological note

The plotted values are adjusted predicted probabilities from the user's existing research tool. School composition is not randomly assigned; associations between context and academic transitions should not be interpreted as causal effects. The Lab links thematically distinct studies, not longitudinal records for the same students.

## Testing

The HTML/CSS/JS interaction can be checked in a local browser; the actual Quarto theme and layout should be confirmed using `quarto preview` in your site. This package does not publish or modify your online site.
