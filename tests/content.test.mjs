import assert from 'node:assert/strict';
import test from 'node:test';
import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { validateMetadata } from '../scripts/content-rules.mjs';

const root = new URL('../', import.meta.url);
const contentRoot = new URL('src/content/', root);

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? markdownFiles(join(directory, entry.name)) : entry.name.endsWith('.md') ? [join(directory, entry.name)] : []))).flat();
}

test('all five Markdown collections are present', async () => {
  for (const collection of ['blog', 'events', 'featured', 'pages', 'projects']) assert((await markdownFiles(new URL(`${collection}/`, contentRoot).pathname)).length > 0, `${collection} is empty`);
});

test('blog entries are portable folders with local media', async () => {
  const directory = new URL('blog/', contentRoot).pathname;
  const files = (await markdownFiles(directory)).sort();
  assert.equal(files.length, 4);
  for (const file of files) {
    assert.equal(file.endsWith('/index.md'), true);
    const source = await readFile(file, 'utf8');
    assert(!/!\[[^\]]*\]\(https?:\/\//u.test(source));
    assert.match(source, /draft: false/u);
    const cover = source.match(/^cover: "(\.\/[^"?#]+)"$/mu)?.[1];
    if (cover) await access(resolve(dirname(file), cover));
  }
});

test('content rules reject unsafe editorial states', () => {
  const valid = { title: 'Title', description: 'Description', draft: false, tags: ['open-source'], aliases: ['/old-path'], cover: './cover.webp', coverAlt: 'A useful description', publishedAt: '2026-01-01' };
  assert.deepEqual(validateMetadata('blog', valid), []);
  assert(validateMetadata('blog', { ...valid, tags: ['Open Source'] }).some((error) => error.includes('lowercase')));
  assert(validateMetadata('blog', { ...valid, tags: ['api', 'api'] }).some((error) => error.includes('unique')));
  assert(validateMetadata('blog', { ...valid, coverAlt: '' }).some((error) => error.includes('coverAlt')));
  assert(validateMetadata('blog', { ...valid, updatedAt: '2025-01-01' }).some((error) => error.includes('updatedAt')));
  assert(validateMetadata('events', { title: 'Title', description: 'Description', tags: [] }).some((error) => error.includes('draft')));
});

test('active site has no standalone About page or legacy runtime dependency', async () => {
  await assert.rejects(access(new URL('src/pages/about.astro', root)));
  const [navigation, indexPage, llms, packageSource] = await Promise.all([
    readFile(new URL('src/data/navigation.ts', root), 'utf8'),
    readFile(new URL('src/pages/index.astro', root), 'utf8'),
    readFile(new URL('src/pages/llms.txt.ts', root), 'utf8'),
    readFile(new URL('package.json', root), 'utf8'),
  ]);
  assert(!/href:\s*['"]\/about['"]/u.test(navigation));
  assert.match(indexPage, /id="about"/u);
  assert.match(llms, /\/#about/u);
  const packageJson = JSON.parse(packageSource);
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  for (const name of ['next', 'react', 'react-dom', 'tailwindcss', 'fuse.js']) assert(!(name in dependencies));
});
