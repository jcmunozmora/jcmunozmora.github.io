import type { APIContext } from 'astro';
import { activityFeed } from '../lib/rss';

export const GET = (ctx: APIContext) => activityFeed('en', ctx.site!);
