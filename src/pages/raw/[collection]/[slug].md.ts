import { getCollection } from 'astro:content';
import { getBlogPosts, getEvents, getFeatured, getProjects, slugFor } from '../../../lib/content';

type FieldValue = string | number | boolean | string[] | undefined;
interface RawEntry { collection: string; slug: string; fields: Record<string, FieldValue>; body: string; }

function serialize(entry: RawEntry) {
  const fields = Object.entries(entry.fields).filter(([, value]) => value !== undefined);
  const header = fields.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
  const mediaBase = `/content-media/${entry.collection}/${entry.slug}/`;
  const body = entry.body.replace(/(\]\()\.\/([^\s)]+)(\))/gu, `$1${mediaBase}$2$3`);
  return `---\n${header}\n---\n\n${body.trim()}\n`;
}

export async function getStaticPaths() {
  const [blog, events, featured, projects, pages] = await Promise.all([
    getBlogPosts(), getEvents(), getFeatured(), getProjects(), getCollection('pages', ({ data }) => !data.draft),
  ]);
  const entries: RawEntry[] = [
    ...blog.map((entry) => ({ collection: 'blog', slug: slugFor(entry), body: entry.body ?? '', fields: { title: entry.data.title, description: entry.data.description, publishedAt: entry.data.publishedAt.toISOString(), updatedAt: entry.data.updatedAt?.toISOString(), author: entry.data.author, tags: entry.data.tags, aliases: entry.data.aliases, related: entry.data.related, cover: entry.data.cover?.src, coverAlt: entry.data.coverAlt, originalUrl: entry.data.originalUrl, readingMinutes: entry.data.readingMinutes } })),
    ...events.map((entry) => ({ collection: 'events', slug: slugFor(entry), body: entry.body ?? '', fields: { title: entry.data.title, description: entry.data.description, date: entry.data.date.toISOString(), location: entry.data.location, event: entry.data.event, tags: entry.data.tags, aliases: entry.data.aliases, related: entry.data.related, cover: entry.data.cover?.src, coverAlt: entry.data.coverAlt, slidesUrl: entry.data.slidesUrl, videoUrl: entry.data.videoUrl, eventUrl: entry.data.eventUrl } })),
    ...featured.map((entry) => ({ collection: 'featured', slug: slugFor(entry), body: entry.body ?? '', fields: { title: entry.data.title, description: entry.data.description, date: entry.data.date.toISOString(), type: entry.data.type, url: entry.data.url, publisher: entry.data.publisher, tags: entry.data.tags, related: entry.data.related, image: entry.data.image?.src, imageAlt: entry.data.imageAlt } })),
    ...projects.map((entry) => ({ collection: 'projects', slug: slugFor(entry), body: entry.body ?? '', fields: { title: entry.data.title, description: entry.data.description, tags: entry.data.tags, aliases: entry.data.aliases, related: entry.data.related, link: entry.data.link, github: entry.data.github } })),
    ...pages.map((entry) => ({ collection: 'pages', slug: slugFor(entry), body: entry.body ?? '', fields: { title: entry.data.title, description: entry.data.description, eyebrow: entry.data.eyebrow } })),
  ];
  return entries.map((entry) => ({ params: { collection: entry.collection, slug: entry.slug }, props: { source: serialize(entry) } }));
}

export function GET({ props }: { props: { source: string } }) {
  return new Response(props.source, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}
