import { getBlogPosts, getEvents, getFeatured, getProjects, getTopics, slugFor } from '../lib/content';
import { site } from '../data/site';
export async function GET() {
  const [posts, events, featured, projects, topics] = await Promise.all([getBlogPosts(), getEvents(), getFeatured(), getProjects(), getTopics()]);
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    '## Primary pages',
    '- [About Ayodeji](/#about)', '- [Writing](/blog)', '- [Guides](/guides)', '- [Articles](/blog/articles)', '- [Speaking](/speaking)', '- [Featured](/featured)', '- [Connect](/connect)',
    '', '## Articles',
    ...posts.map((post) => `- [${post.data.title}](/blog/${slugFor(post)}) (${post.data.kind}): ${post.data.description}`),
    '', '## Speaking',
    ...events.map((event) => `- [${event.data.title}](/speaking/${slugFor(event)}): ${event.data.description}`),
    '', '## Topics',
    ...topics.map((topic) => `- [${topic.label}](/topics/${topic.tag}) — ${topic.count} ${topic.count === 1 ? 'item' : 'items'}`),
    '', '## Appearances',
    ...featured.map((item) => `- [${item.data.title}](${item.data.url})`),
    '', '## Projects',
    ...projects.map((project) => `- [${project.data.title}](${project.data.link})`),
    '', '## Machine-readable outputs',
    '- [RSS](/rss.xml)', '- [JSON Feed](/feed.json)', '- [Content index](/content-index.json)', '- [Sitemap](/sitemap-index.xml)',
  ];
  return new Response(`${lines.join('\n')}\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
