import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const contentRoot = join(process.cwd(), 'src/content');
const collections = ['blog', 'events', 'featured', 'projects'];
const types: Record<string, string> = { '.gif': 'image/gif', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

async function assets(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? assets(join(directory, entry.name)) : entry.name === 'index.md' ? [] : [join(directory, entry.name)]))).flat();
}

export async function getStaticPaths() {
  const paths = [];
  for (const collection of collections) {
    const directory = join(contentRoot, collection);
    for (const file of await assets(directory)) {
      const [slug, ...assetParts] = relative(directory, file).split('/');
      paths.push({ params: { collection, slug, asset: assetParts.join('/') }, props: { file } });
    }
  }
  return paths;
}

export async function GET({ props }: { props: { file: string } }) {
  const type = types[extname(props.file).toLowerCase()] ?? 'application/octet-stream';
  return new Response(await readFile(props.file), { headers: { 'content-type': type, 'cache-control': 'public, max-age=31536000, immutable' } });
}
