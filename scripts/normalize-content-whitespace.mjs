import { readFile, writeFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../src/content/', import.meta.url);

async function markdownFiles() {
  const files = [];
  for await (const entry of glob('**/*.md', { cwd: root.pathname })) files.push(join(root.pathname, entry));
  return files;
}

function normalize(source) {
  return source
    .replace(/\r\n/gu, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/u, ''))
    .join('\n')
    .replace(/\n{3,}/gu, '\n\n')
    .replace(/\n+$/u, '\n');
}

let changed = 0;
for (const file of await markdownFiles()) {
  const source = await readFile(file, 'utf8');
  const next = normalize(source);
  if (next !== source) {
    await writeFile(file, next);
    changed += 1;
    console.log(`normalized ${file}`);
  }
}
console.log(`Updated ${changed} Markdown file(s).`);
