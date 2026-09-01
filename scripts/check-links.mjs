import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}

async function resolves(pathname) {
  const clean = decodeURIComponent(pathname.split(/[?#]/u)[0]);
  const relative = clean.replace(/^\//u, '');
  const candidates = clean === '/' ? ['index.html'] : extname(relative) ? [relative] : [`${relative}/index.html`, `${relative}.html`];
  for (const candidate of candidates) {
    try { await access(join(dist, candidate)); return true; } catch { /* try the next candidate */ }
  }
  return false;
}

const output = await files(dist);
let checked = 0;
for (const file of output.filter((path) => path.endsWith('.html') || path.endsWith('.md'))) {
  const source = await readFile(file, 'utf8');
  const references = file.endsWith('.html')
    ? [...source.matchAll(/(?:href|src)=["'](\/[^"']*)["']/gu)].map((match) => match[1])
    : [...source.matchAll(/\]\((\/[^)\s]+)\)/gu)].map((match) => match[1]);
  for (const reference of references) {
    checked += 1;
    assert(await resolves(reference), `${file} references missing output ${reference}`);
  }
}
console.log(`Verified ${checked} internal links and assets in generated HTML and raw Markdown.`);
