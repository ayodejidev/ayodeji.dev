import { getBlogPosts, slugFor } from '../lib/content';
import { site } from '../data/site';
export async function GET() {
  const posts = await getBlogPosts();
  return new Response(JSON.stringify({
    version: 'https://jsonfeed.org/version/1.1',
    title: `${site.name} — Blog`,
    home_page_url: site.url,
    feed_url: `${site.url}/feed.json`,
    description: site.description,
    items: posts.map((post) => ({
      id: `${site.url}/blog/${slugFor(post)}`,
      url: `${site.url}/blog/${slugFor(post)}`,
      title: post.data.title,
      summary: post.data.description,
      date_published: post.data.publishedAt.toISOString(),
      tags: post.data.tags,
    })),
  }), { headers: { 'content-type': 'application/feed+json; charset=utf-8' } });
}
