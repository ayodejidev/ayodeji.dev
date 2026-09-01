import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

type PublicCollection = 'blog' | 'events' | 'featured' | 'projects';

export interface ContentRecord {
  type: 'article' | 'event' | 'featured' | 'project';
  id: string;
  title: string;
  description: string;
  excerpt: string;
  url: string;
  tags: string[];
  related: string[];
  date?: string;
}

export async function getPage(id: string) {
  const page = await getEntry('pages', id);
  if (!page || page.data.draft) throw new Error(`Missing public page content: ${id}`);
  return page;
}

export async function getPublicEntries(collection: 'blog'): Promise<CollectionEntry<'blog'>[]>;
export async function getPublicEntries(collection: 'events'): Promise<CollectionEntry<'events'>[]>;
export async function getPublicEntries(collection: 'featured'): Promise<CollectionEntry<'featured'>[]>;
export async function getPublicEntries(collection: 'projects'): Promise<CollectionEntry<'projects'>[]>;
export async function getPublicEntries(collection: PublicCollection) {
  switch (collection) {
    case 'blog': {
      const now = Date.now();
      return getCollection('blog', ({ data }) => !data.draft && data.publishedAt.getTime() <= now);
    }
    case 'events': return getCollection('events', ({ data }) => !data.draft);
    case 'featured': return getCollection('featured', ({ data }) => !data.draft);
    case 'projects': return getCollection('projects', ({ data }) => !data.draft);
  }
}

export async function getBlogPosts() {
  return (await getPublicEntries('blog')).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.id.localeCompare(b.id));
}

export async function getEvents() {
  return (await getPublicEntries('events')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export async function getFeatured() {
  return (await getPublicEntries('featured')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export async function getProjects() {
  return (await getPublicEntries('projects')).sort((a, b) => a.id.localeCompare(b.id));
}

export function slugFor(entry: { id: string }) {
  return entry.id.replace(/\.md$/u, '');
}

export function topicLabel(tag: string) {
  const initialisms: Record<string, string> = { ai: 'AI', api: 'API', apis: 'APIs', devrel: 'DevRel', github: 'GitHub', json: 'JSON' };
  return tag.split('-').map((part) => initialisms[part] ?? `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
}

export type EventTiming = 'upcoming' | 'past';

export function eventTiming(date: Date, now = new Date()): EventTiming {
  return date.getTime() >= now.getTime() ? 'upcoming' : 'past';
}

function excerpt(body: string | undefined) {
  return (body ?? '')
    .replace(/^---[\s\S]*?---/u, '')
    .replace(/```[\s\S]*?```/gu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/[*_#>`~-]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
    .slice(0, 280);
}

export async function getContentRecords(): Promise<ContentRecord[]> {
  const [blog, events, featured, projects] = await Promise.all([getBlogPosts(), getEvents(), getFeatured(), getProjects()]);
  return [
    ...blog.map((entry): ContentRecord => ({ type: 'article', id: slugFor(entry), title: entry.data.title, description: entry.data.description, excerpt: excerpt(entry.body), url: `/blog/${slugFor(entry)}`, tags: entry.data.tags, related: entry.data.related, date: entry.data.publishedAt.toISOString() })),
    ...events.map((entry): ContentRecord => ({ type: 'event', id: slugFor(entry), title: entry.data.title, description: entry.data.description, excerpt: excerpt(entry.body), url: `/speaking/${slugFor(entry)}`, tags: entry.data.tags, related: entry.data.related, date: entry.data.date.toISOString() })),
    ...featured.map((entry): ContentRecord => ({ type: 'featured', id: slugFor(entry), title: entry.data.title, description: entry.data.description, excerpt: excerpt(entry.body), url: entry.data.url, tags: entry.data.tags, related: entry.data.related, date: entry.data.date.toISOString() })),
    ...projects.map((entry): ContentRecord => ({ type: 'project', id: slugFor(entry), title: entry.data.title, description: entry.data.description, excerpt: excerpt(entry.body), url: entry.data.link, tags: entry.data.tags, related: entry.data.related })),
  ].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.type.localeCompare(b.type) || a.id.localeCompare(b.id));
}

export async function getTopics() {
  const records = await getContentRecords();
  const counts = new Map<string, number>();
  for (const record of records) for (const tag of record.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts].map(([tag, count]) => ({ tag, label: topicLabel(tag), count })).sort((a, b) => a.label.localeCompare(b.label));
}

export async function getRelatedRecords(currentUrl: string, tags: string[], limit = 3) {
  const wanted = new Set(tags);
  const records = await getContentRecords();
  const explicit = new Set(records.find((record) => record.url === currentUrl)?.related ?? []);
  return records
    .filter((record) => record.url !== currentUrl && (explicit.has(record.url) || record.tags.some((tag) => wanted.has(tag))))
    .sort((a, b) => Number(explicit.has(b.url)) - Number(explicit.has(a.url)) || b.tags.filter((tag) => wanted.has(tag)).length - a.tags.filter((tag) => wanted.has(tag)).length || (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, limit);
}

export async function getAliases() {
  const [blog, events] = await Promise.all([getBlogPosts(), getEvents()]);
  return [
    ...blog.flatMap((entry) => entry.data.aliases.map((alias) => ({ alias, target: `/blog/${slugFor(entry)}` }))),
    ...events.flatMap((entry) => entry.data.aliases.map((alias) => ({ alias, target: `/speaking/${slugFor(entry)}` }))),
  ].sort((a, b) => a.alias.localeCompare(b.alias));
}
