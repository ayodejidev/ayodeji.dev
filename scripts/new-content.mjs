import { access, copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const [type, slug] = process.argv.slice(2);
const types = new Set(['guide', 'blog', 'events', 'featured', 'pages', 'projects']);
if (!types.has(type) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug ?? '')) {
  console.error('Usage: npm run content:new -- <guide|blog|events|featured|pages|projects> <lowercase-slug>');
  process.exitCode = 1;
} else {
  const collection = type === 'guide' ? 'blog' : type;
  const root = new URL('../', import.meta.url).pathname;
  const folderEntry = type !== 'pages';
  const target = folderEntry ? join(root, 'src/content', collection, slug, 'index.md') : join(root, 'src/content/pages', `${slug}.md`);
  const template = folderEntry ? join(root, 'templates/content', type, 'index.md') : join(root, 'templates/content/pages.md');
  try {
    await access(target);
    throw new Error(`Refusing to overwrite ${target}`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Refusing')) throw error;
  }
  await mkdir(dirname(target), { recursive: true });
  await copyFile(template, target);
  console.log(`Created ${target}`);
}
