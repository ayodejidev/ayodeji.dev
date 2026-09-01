import { site } from '../data/site';
export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
