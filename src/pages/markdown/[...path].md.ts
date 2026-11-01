import { getBlogPosts, getEvents, getPage, getFeaturedContent, getContentRecords, getTopics, slugFor } from '../../lib/content';
import { writingMarkdown } from '../../lib/writing-markdown.mjs';
import { getTalkResources } from '../../lib/talk-resources.mjs';
import { site } from '../../data/site';

type Document = { path: string; title: string; description: string; body: string; complete?: boolean };

export async function getStaticPaths() {
  const [posts, events, records, topics, home, about, blogPage, speakingPage, featuredPage, featuredItems, connectPage] = await Promise.all([
    getBlogPosts(), getEvents(), getContentRecords(), getTopics(),
    getPage('home'), getPage('about'), getPage('blog'), getPage('speaking'), getPage('featured'), getFeaturedContent(), getPage('connect'),
  ]);
  const list = (items: typeof records) => items.map((item) => `- [${item.title}](${item.url}): ${item.description}`).join('\n');
  const documents: Document[] = [
    { path: 'index', title: home.data.title, description: home.data.description, body: `${about.body ?? ''}${featuredItems.length ? '\n\n## Featured\n\n' + featuredItems.map((item) => `- [${item.title}](${item.url}): ${item.description}`).join('\n') : ''}\n\n## Writing\n\n${list(records.filter((item) => item.type === 'article'))}\n\n## Speaking\n\n${list(records.filter((item) => item.type === 'event'))}\n\n[Subscribe](${site.social.substack})` },
    { path: 'connect', title: connectPage.data.title, description: connectPage.data.description, body: `${connectPage.body ?? ''}\n\n## Coffee chat\n\n${connectPage.data.coffeeChatUrl ? `[Coffee chat](${connectPage.data.coffeeChatUrl})` : 'Coffee chat: booking link coming soon.'}\n\n## Find me online\n\n${Object.entries(site.social).map(([label, url]) => `- [${label}](${url})`).join('\n')}` },
    { path: 'blog', title: blogPage.data.title, description: blogPage.data.description, body: `${blogPage.body ?? ''}\n\n${list(records.filter((item) => item.type === 'article'))}` },
    { path: 'guides', title: 'Technical guides', description: 'Practical walkthroughs with prerequisites and copyable Markdown.', body: list(records.filter((item) => item.writingKind === 'guide')) },
    { path: 'blog/articles', title: 'Articles', description: 'Reflections and field reports.', body: list(records.filter((item) => item.writingKind === 'article')) },
    { path: 'speaking', title: speakingPage.data.title, description: speakingPage.data.description, body: `${speakingPage.body ?? ''}\n\n[Invite me to speak](/connect)\n\n${list(records.filter((item) => item.type === 'event'))}` },
    { path: 'featured', title: featuredPage.data.title, description: featuredPage.data.description, body: `${featuredPage.body ?? ''}\n\n${featuredItems.map((item) => `- [${item.title}](${item.url}): ${item.description}`).join('\n')}` },
    ...posts.map((entry) => ({ path: `blog/${slugFor(entry)}`, title: entry.data.title, description: entry.data.description,
      body: writingMarkdown({ title: entry.data.title, description: entry.data.description, author: entry.data.author,
        publishedAt: entry.data.publishedAt.toISOString(), url: `${site.url}/blog/${slugFor(entry)}`,
        body: entry.body ?? '', mediaBase: `${site.url}/content-media/blog/${slugFor(entry)}/`,
        guide: entry.data.kind === 'guide' ? entry.data.guide : undefined }), complete: true })),
    ...events.map((entry) => ({ path: `speaking/${slugFor(entry)}`, title: entry.data.title, description: entry.data.description, body: `${entry.data.event} · ${entry.data.location} · ${entry.data.date.toISOString()}\n\n${entry.body ?? ''}\n\n${[...getTalkResources({ slidesUrl: entry.data.slidesUrl, videoUrl: entry.data.videoUrl, resources: entry.data.resources }), ...(entry.data.eventUrl ? [{ label: 'Event', url: entry.data.eventUrl }] : [])].map(({ label, url }) => `[${label}](${url})`).join('\n\n')}`.replace(/(\]\()\.\/([^\s)]+)(\))/gu, `$1/content-media/events/${slugFor(entry)}/$2$3`) })),
    ...topics.map((topic) => ({ path: `topics/${topic.tag}`, title: topic.label, description: `Writing, speaking, projects, and featured work about ${topic.label}.`, body: list(records.filter((item) => item.tags.includes(topic.tag))) })),
  ];
  // All source collections above are filtered by the same public-content helpers as HTML.
  return documents.map((document) => ({ params: { path: document.path }, props: { source: document.complete ? document.body : `---\ntitle: ${JSON.stringify(document.title)}\ndescription: ${JSON.stringify(document.description)}\n---\n\n# ${document.title}\n\n${document.body.trim()}\n` } }));
}

export function GET({ props }: { props: { source: string } }) {
  return new Response(props.source, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}
