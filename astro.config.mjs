import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Reserved paths: these are GitHub project pages served under the same domain
// (repos jcmunozmora/<name> with Pages enabled). Never create a page at any of them.
//   /slides/  /bolivia-wb-aper-2026/  /coffee-digital/  /curso-proyectos-sostenibles/
//   /food-perception-rural-colombia/  /Gladis/  /mgis-instrumentos-financiacion/
//   /PulsoSocial_Dash/  /pulso_antioquia/  /sroi-meta-analysis/
export default defineConfig({
  site: 'https://jcmunozmora.co',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
