import { getCollection } from 'astro:content';
import { routes, type Lang } from '../i18n/ui';

export async function getActivity() {
  const posts = await getCollection('activity');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export const activityHref = (lang: Lang, id: string) => `${routes.activity[lang]}${id}/`;

// Pillar colour signals: teal = method, green = territory, navy = the intersection.
export function pillarClass(pilar?: string) {
  if (pilar === 'metodologico') return 'pillar-method';
  if (pilar === 'tematico') return 'pillar-territory';
  return 'pillar-both';
}

export function plainText(md: string) {
  return md
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Text after the first line (which already serves as the title), cut at a word boundary.
export function excerpt(md: string, max = 220) {
  const lines = md.replace(/<!--[\s\S]*?-->/g, '').split('\n').map((l) => l.trim()).filter(Boolean);
  const rest = plainText(lines.slice(1).join(' '));
  if (rest.length <= max) return rest;
  const cut = rest.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
}
