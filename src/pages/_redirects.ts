import { getAliases } from '../lib/content';
export async function GET() {
  const aliases = await getAliases();
  return new Response(`${aliases.map(({ alias, target }) => `${alias} ${target} 301`).join('\n')}\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
