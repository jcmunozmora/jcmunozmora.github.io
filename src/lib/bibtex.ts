import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { parse } from '@retorquere/bibtex-parser';

export const SELF = 'Muñoz-Mora';

type Creator = { lastName?: string; firstName?: string; name?: string };

const clean = (v: unknown) =>
  typeof v === 'string' ? v.replace(/\s+/g, ' ').replace(/\s+([.,;:])$/, '').trim() : undefined;

function formatAuthor(c: Creator): string {
  if (c.name) return c.name;
  const first = (c.firstName ?? '').replace(/\s+/g, '');
  return first ? `${first} ${c.lastName ?? ''}`.trim() : (c.lastName ?? '');
}

export async function loadPublications(path = 'src/data/papers.bib') {
  const src = await readFile(path, 'utf8');
  const lib = parse(src, { sentenceCase: false, caseProtection: false });
  if (lib.errors.length) {
    throw new Error(`papers.bib: ${lib.errors.map((e) => e.error).join('; ')}`);
  }
  const seen = new Set<string>();
  return lib.entries.map((e) => {
    if (seen.has(e.key)) throw new Error(`papers.bib: duplicate key "${e.key}"`);
    seen.add(e.key);
    const f = e.fields as Record<string, any>;
    const doi = clean(f.doi);
    const url = clean(f.url) ?? clean(f.html);
    const pdfFile = clean(f.pdf);
    // Only link PDFs that are actually published under public/pdf/papers/.
    const pdf = pdfFile && existsSync(`public/pdf/papers/${pdfFile}`) ? `/pdf/papers/${pdfFile}` : undefined;
    return {
      id: e.key,
      type: e.type,
      title: clean(f.title) ?? e.key,
      year: Number(f.year),
      authors: ((f.author ?? []) as Creator[]).map(formatAuthor),
      venue: clean(f.journal) ?? clean(f.booktitle) ?? clean(f.publisher),
      abbr: clean(f.abbr),
      volume: clean(f.volume),
      number: clean(f.number),
      pages: clean(f.pages)?.replace(/--/g, '–'),
      abstract: clean(f.abstract),
      doi,
      href: doi ? `https://doi.org/${doi}` : url,
      pdf,
      selected: String(f.selected ?? '').toLowerCase() === 'true',
      keywords: (clean(f.keywords) ?? '')
        .split(/[,;]/)
        .map((k) => k.trim())
        .filter(Boolean),
    };
  });
}
