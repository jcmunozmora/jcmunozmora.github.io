# jcmunozmora.co

Personal site of Juan Carlos Muñoz-Mora. Astro, bilingual (English at `/`, Spanish at `/es/`),
deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.

## Where every piece of content comes from

The site never holds the only copy of a fact. Each section reads from the system where that
fact already lives; `npm run sync` pulls everything local sources can give and writes it into
the repo, and CI only builds what is committed.

| Section | Source of truth | How it gets here | Output in the repo |
|---|---|---|---|
| About, education, appointments, grants, reports, working papers, seminars | CV in Overleaf (`~/Library/CloudStorage/Dropbox/Apps/Overleaf/CV - JC/CV-MunozMora-{EN,ES}.tex`) | `npm run sync:cv` (parses both languages, copies the PDFs) | `src/data/cv.json`, `public/cv/*.pdf` |
| Activity | Posts marked `estado: publicado` in `~/github_repositories/jc-linkedin/drafts/linkedin/` | `npm run sync:activity` | `src/content/activity/linkedin/` |
| Talks & class slides | `~/github_repositories/slides/slides.yml` (the hub at `/slides/`) | `npm run sync:talks` | `src/data/talks.json` |
| Papers in progress, current projects | Notion › Projects, rows with **Homepage** ticked (integration `Claude_JC`, token in `~/.claude/scripts/.env.quijote`) | `npm run sync:notion` | `src/data/notion.json` |
| Journal articles with abstracts | `src/data/papers.bib` (new entries: CV + Crossref by DOI) | edited by hand | — |
| SSRN ids not in the CV | `src/data/ssrn.ts` (verified through Crossref, DOI `10.2139/ssrn.<id>`) | edited by hand | — |
| Books, chapters, policy reports | `src/data/works.ts` (CV for facts, previous site for covers) | edited by hand | — |
| Course sites | `src/data/teaching.ts` (READMEs of the public course repos) | edited by hand | — |
| Open project sites | `src/data/projects.ts` (GitHub repository descriptions) | edited by hand | — |

What each sync never publishes: Notion notes, next actions, budgets, stakeholders, team, local
paths, AI-generated summaries, journals of papers under review, and anything of type `P&D`;
LinkedIn production notes (`<!-- -->` blocks and everything after the first `##`); hub entries
of kind `propuesta` or `otro`.

## Automation

- The CV decides what the site lists: books, chapters and reports come from `src/data/cv.json`;
  `src/data/works.ts` only adds covers, summaries and PDFs to the matching CV entry (`cv:`).
- `npm run covers` finds a cover for every CV work that has none (page `og:image`, or the first
  page of its PDF) and saves it as `src/assets/covers/<slug>.jpg`. It is part of `npm run sync`.
- `npm run pending` lists work found in OpenAlex (ORCID), SSRN (Crossref) or Notion that is not
  yet in the CV → `reports/pending.md`. `/sanson-propagar` runs the full update cascade.
- `scripts/auto-update.sh` is the unattended weekly run (sync → covers → check → build → commit
  and push generated files only). Install it once with a launchd agent (see below).

## Topics and search

Every item is tagged automatically with the taxonomy in `src/data/topics.ts` (patterns in English
and Spanish; `src/lib/catalog.ts` builds the unified catalogue, with `overrides` for exceptions).
Topic pages live at `/topics/<slug>/` and `/es/temas/<slug>/`. Search is Pagefind, built after
Astro by `npm run build`, one index per language.

## Everyday updates

1. Update the source (the CV in Overleaf, a post in jc-linkedin, a deck in the slides hub, the
   Homepage checkbox in Notion).
2. `npm run sync` — each script reports what changed.
3. `npm run build`, review locally with `npm run preview`.
4. Commit and push. **The push publishes.**

A milestone that did not go through LinkedIn goes in
`src/content/activity/manual/YYYY-MM-DD-slug.md`:

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
npm install        # once
npm run dev        # http://localhost:4321
npm run sync       # all local sources (activity, CV, talks, Notion)
npm run check      # type check
npm run build      # production build in dist/
```

Paths can be overridden with `JC_LINKEDIN_DIR`, `CV_DIR`, `SLIDES_DIR` and `NOTION_API_KEY`.

## Reserved paths

Other repositories publish GitHub project pages under this domain (`/slides/`,
`/curso-proyectos-sostenibles/`, `/sroi-meta-analysis/`, …). Never create a page at those paths;
the list is in `astro.config.mjs`.

## Credits

Photographs: Unsplash License, see `src/assets/photos/CREDITS.md`. Portrait and covers: the
author's own.
