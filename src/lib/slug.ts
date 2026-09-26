// Stable file-name slug for a title. scripts/fetch-covers.mjs uses the same rule, so a cover
// saved as src/assets/covers/<slug>.jpg is found by the site without any other wiring.
export function titleSlug(title: string) {
  const s = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (s.length <= 64) return s;
  const cut = s.slice(0, 64);
  return cut.slice(0, cut.lastIndexOf('-'));
}
