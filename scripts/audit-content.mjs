import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { parse } from 'yaml';
import { validateMetadata } from './content-rules.mjs';

const root = new URL('../', import.meta.url);
const contentRoot = new URL('src/content/', root).pathname;
const collections = ['blog', 'events', 'featured', 'pages', 'projects'];
const aliases = new Map();
let total = 0;

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? markdownFiles(join(directory, entry.name)) : entry.name.endsWith('.md') ? [join(directory, entry.name)] : []))).flat();
}

for (const collection of collections) {
  const directory = join(contentRoot, collection);
  const files = (await markdownFiles(directory)).sort();
  assert(files.length > 0, `${collection} must contain Markdown`);
  for (const file of files) {
    total += 1;
    const source = await readFile(file, 'utf8');
    const match = source.match(/^---\n([\s\S]*?)\n---\n?/u);
    assert(match, `${file} has no valid frontmatter block`);
    const data = parse(match[1]);
    const body = source.slice(match[0].length);
    const errors = validateMetadata(collection, data);
    assert.equal(errors.length, 0, `${file}: ${errors.join('; ')}`);
    assert(!/^#\s+/mu.test(body), `${file} body contains an h1`);
    assert(!/!\[[^\]]*\]\(https?:\/\//u.test(body), `${file} contains a remote runtime image`);
    assert(!/!\[\]\(/u.test(body), `${file} contains an image without alternative text`);

    let inFence = false;
    for (const [index, line] of body.split('\n').entries()) {
      if (!line.startsWith('```')) continue;
      if (!inFence) assert(/^```[a-z0-9_-]+\s*$/iu.test(line), `${file}:${index + 1} code fence needs a language`);
      inFence = !inFence;
    }
    assert(!inFence, `${file} has an unclosed code fence`);

    for (const [, reference] of body.matchAll(/!\[[^\]]*\]\((\.\/[^\s)]+)\)/gu)) await access(resolve(dirname(file), reference));
    for (const field of ['cover', 'image']) if (typeof data[field] === 'string' && data[field].startsWith('./')) await access(resolve(dirname(file), data[field]));
    for (const alias of data.aliases ?? []) {
      assert(!aliases.has(alias), `${alias} is duplicated by ${file} and ${aliases.get(alias)}`);
      aliases.set(alias, file);
    }
  }
  console.log(`${collection}: ${files.length} Markdown entries`);
}

console.log(`Audited ${total} repository-owned content entries and ${aliases.size} aliases.`);
