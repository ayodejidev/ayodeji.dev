import { getBlogPosts, getEvents, getPage, getContentRecords, getTopics, slugFor } from '../../lib/content';
import { site } from '../../data/site';

type Document = { path: string; title: string; description: string; body: string };

export async function getStaticPaths() {
  const [posts, events, records, topics, home, about, blogPage, speakingPage, featuredPage] = await Promise.all([
    getBlogPosts(), getEvents(), getContentRecords(), getTopics(),
    getPage('home'), getPage('about'), getPage('blog'), getPage('speaking'), getPage('featured'),
  ]);
  const list = (items: typeof records) => items.map((item) => `- [${item.title}](${item.url}): ${item.description}`).join('\n');
  const documents: Document[] = [
    { path: 'index', title: home.data.title, description: home.data.description, body: `${about.body ?? ''}\n\n## Writing\n\n${list(records.filter((item) => item.type === 'article'))}\n\n## Speaking\n\n${list(records.filter((item) => item.type === 'event'))}\n\n## Selected work\n\n${list(records.filter((item) => item.type === 'project' || item.type === 'featured'))}\n\n[Subscribe](${site.social.substack})` },
    { path: 'blog', title: blogPage.data.title, description: blogPage.data.description, body: `${blogPage.body ?? ''}\n\n${list(records.filter((item) => item.type === 'article'))}` },
    { path: 'speaking', title: speakingPage.data.title, description: speakingPage.data.description, body: `${speakingPage.body ?? ''}\n\n${list(records.filter((item) => item.type === 'event'))}` },
    { path: 'featured', title: featuredPage.data.title, description: featuredPage.data.description, body: `${featuredPage.body ?? ''}\n\n${list(records.filter((item) => item.type === 'featured'))}` },
    ...posts.map((entry) => ({ path: `blog/${slugFor(entry)}`, title: entry.data.title, description: entry.data.description, body: `${entry.body ?? ''}\n\n${entry.data.originalUrl ? `[Original publication](${entry.data.originalUrl})` : ''}`.replace(/(\]\()\.\/([^\s)]+)(\))/gu, `$1/content-media/blog/${slugFor(entry)}/$2$3`) })),
    ...events.map((entry) => ({ path: `speaking/${slugFor(entry)}`, title: entry.data.title, description: entry.data.description, body: `${entry.data.event} · ${entry.data.location} · ${entry.data.date.toISOString()}\n\n${entry.body ?? ''}\n\n${[['Slides', entry.data.slidesUrl], ['Recording', entry.data.videoUrl], ['Event', entry.data.eventUrl]].filter(([, url]) => url).map(([label, url]) => `[${label}](${url})`).join('\n\n')}`.replace(/(\]\()\.\/([^\s)]+)(\))/gu, `$1/content-media/events/${slugFor(entry)}/$2$3`) })),
    ...topics.map((topic) => ({ path: `topics/${topic.tag}`, title: topic.label, description: `Writing, speaking, projects, and featured work about ${topic.label}.`, body: list(records.filter((item) => item.tags.includes(topic.tag))) })),
  ];
  // All source collections above are filtered by the same public-content helpers as HTML.
  return documents.map((document) => ({ params: { path: document.path }, props: { source: `---\ntitle: ${JSON.stringify(document.title)}\ndescription: ${JSON.stringify(document.description)}\n---\n\n# ${document.title}\n\n${document.body.trim()}\n` } }));
}

export function GET({ props }: { props: { source: string } }) {
  return new Response(props.source, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}
