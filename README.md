# jcmunozmora.co

Personal site of Juan Carlos Muñoz-Mora. Astro, bilingual (English at `/`, Spanish at `/es/`),
deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.

## Everyday updates

| To add… | Edit | Then |
|---|---|---|
| LinkedIn posts already published | nothing here — mark them `estado: publicado` in `jc-linkedin` | `npm run sync` |
| A milestone that did not go through LinkedIn | new file in `src/content/activity/manual/YYYY-MM-DD-slug.md` | — |
| A publication | a BibTeX entry in `src/data/papers.bib` (`selected={true}` puts it on the home page) | — |
| A book or policy report | `src/data/works.ts` (cover in `src/assets/works/`) | — |
| A course | `src/data/teaching.ts` | — |
| A project | `src/data/projects.ts` | — |
| Interface text (both languages) | `src/i18n/ui.ts` | — |

Every change: `npm run build` locally, review, then commit and push. **The push publishes.**

A manual activity entry:

```md
---
title: Keynote at the XYZ conference
date: 2026-10-14
lang: en
source: manual
pilar: tematico        # metodologico | tematico | investigacion | reflexion
url: https://…         # optional
---

One or two paragraphs.
```

## Commands

```sh
npm install      # once
npm run dev      # http://localhost:4321
npm run sync     # mirror published posts from ~/github_repositories/jc-linkedin
npm run check    # type check
npm run build    # production build in dist/
```

`npm run sync` reads the private `jc-linkedin` repo, so it only runs on this machine; the files it
writes in `src/content/activity/linkedin/` are committed. Set `JC_LINKEDIN_DIR` to use another
path.

## Reserved paths

Other repositories publish GitHub project pages under this domain (`/slides/`,
`/sroi-meta-analysis/`, …). Never create a page at those paths; the list is in `astro.config.mjs`.

## Credits

Photographs: Unsplash License, see `src/assets/photos/CREDITS.md`. Portrait and covers: the
author's own.
