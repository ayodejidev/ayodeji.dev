import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const required = [
  'index.html', 'about/index.html', 'blog/index.html', 'speaking/index.html', 'featured/index.html',
  '404.html', 'rss.xml',
  'feed.json', 'content-index.json', 'llms.txt', 'robots.txt', 'sitemap-index.xml',
  'blog/devrelcon-new-york-2026-building-for-humans-agents-and-the-next-billion-builders/index.html',
  'blog/my-devrelcon-new-york-2025-experience/index.html',
  'blog/rest-api-basics-a-beginners-introduction-to-api-development/index.html',
  'blog/reflections-on-api-days-paris-conference-2024/index.html',
  'speaking/imagine-a-world-without-open-source/index.html',
  'speaking/innersource-by-design/index.html',
  'speaking/open-source-and-the-new-ai-stack/index.html',
  'topics/open-source/index.html',
  'content-media/blog/rest-api-basics-a-beginners-introduction-to-api-development/image-01.png',
];
for (const file of required) await access(new URL(file, dist));
await assert.rejects(access(new URL('topics/index.html', dist)), { code: 'ENOENT' });
await assert.rejects(access(new URL('projects/index.html', dist)), { code: 'ENOENT' });
await assert.rejects(access(new URL('project/index.html', dist)), { code: 'ENOENT' });
await assert.rejects(access(new URL('contact/index.html', dist)), { code: 'ENOENT' });

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}
const htmlFiles = (await files(dist.pathname)).filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  assert(!/\/_next\/|api\.hashnode|gql\.hashnode/iu.test(source), `${file} contains a legacy runtime reference`);
  assert(!/<img[^>]+src=["']https?:\/\//iu.test(source), `${file} contains a remote image`);
  const isRedirect = /<meta http-equiv=["']refresh["']/iu.test(source);
  assert(isRedirect || /<main\b/iu.test(source), `${file} has no main landmark`);
  if (!isRedirect) {
    assert(!/href=["']\/about(?:["'/?#])/iu.test(source), `${file} links to the retired About page`);
    assert(!/href=["']\/blog\/tags\//iu.test(source), `${file} links to a legacy blog tag page`);
  }
}
const feed = JSON.parse(await readFile(new URL('feed.json', dist), 'utf8'));
const index = JSON.parse(await readFile(new URL('content-index.json', dist), 'utf8'));
assert.equal(feed.items.length, 4);
assert.equal(index.schemaVersion, 2);
assert(index.records.length >= 9);
assert(index.records.every((record) => Array.isArray(record.topics) && Array.isArray(record.related)));
assert(index.records.filter((record) => record.type === 'event').every((record) => record.url.startsWith('/speaking/')));
const home = await readFile(new URL('index.html', dist), 'utf8');
assert.match(home, /id=["']about["']/u);
const sitemap = await readFile(new URL('sitemap-0.xml', dist), 'utf8');
const sitemapLocs = new Set(Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/giu), ([, loc]) => loc));
assert(!sitemap.includes('https://ayodeji.dev/about'));
assert(!sitemap.includes('/blog/tags/'));
assert(!sitemap.includes('<loc>https://ayodeji.dev/topics</loc>'));
assert(!sitemap.includes('<loc>https://ayodeji.dev/projects</loc>'));
assert(!sitemap.includes('<loc>https://ayodeji.dev/project</loc>'));
assert(sitemapLocs.has('https://ayodeji.dev/topics/open-source'));
assert(sitemapLocs.has('https://ayodeji.dev/speaking/innersource-by-design'));
console.log(`Verified ${required.length} required outputs, ${htmlFiles.length} HTML documents, ${feed.items.length} feed items, and ${index.records.length} discovery records.`);
