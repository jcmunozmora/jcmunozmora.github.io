import rss from '@astrojs/rss';
import { SITE, t, type Lang } from '../i18n/ui';
import { activityHref, excerpt, getActivity } from './activity';

export async function activityFeed(lang: Lang, site: URL) {
  const tr = t(lang);
  const posts = await getActivity();
  return rss({
    title: `${SITE.name} — ${tr('activity.title')}`,
    description: tr('activity.lede'),
    site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: excerpt(p.body ?? '', 400),
      link: activityHref(p.data.lang, p.id),
    })),
    customData: `<language>${lang === 'es' ? 'es-co' : 'en'}</language>`,
  });
}
