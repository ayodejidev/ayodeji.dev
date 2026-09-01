import rss from '@astrojs/rss';
import { getBlogPosts, slugFor } from '../lib/content';
import { site } from '../data/site';

export async function GET() {
  const posts = await getBlogPosts();
  return rss({
    title: `${site.name} — Blog`,
    description: site.description,
    site: site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${slugFor(post)}`,
      categories: post.data.tags,
    })),
  });
}
