import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { loadPublications } from './lib/bibtex';

const publications = defineCollection({
  loader: () => loadPublications(),
  schema: z.object({
    type: z.string(),
    title: z.string(),
    year: z.number().int().min(1990).max(2100),
    authors: z.array(z.string()).min(1),
    venue: z.string().optional(),
    abbr: z.string().optional(),
    volume: z.string().optional(),
    number: z.string().optional(),
    pages: z.string().optional(),
    abstract: z.string().optional(),
    doi: z.string().optional(),
    href: z.string().optional(),
    selected: z.boolean(),
    keywords: z.array(z.string()),
  }),
});

// Posts synced from jc-linkedin (generated) and hand-written milestones (manual).
// .strict() keeps production-only fields from the private repo out of the public site.
const activity = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/activity',
    generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.md$/, ''),
  }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      lang: z.enum(['es', 'en']),
      source: z.enum(['linkedin', 'manual']),
      perfil: z.enum(['profesor', 'investigador', 'experto']).optional(),
      pilar: z.enum(['metodologico', 'tematico', 'investigacion', 'reflexion']).optional(),
      url: z.string().optional(),
      sourceFile: z.string().optional(),
      generated: z.boolean().optional(),
    })
    .strict(),
});

export const collections = { publications, activity };
