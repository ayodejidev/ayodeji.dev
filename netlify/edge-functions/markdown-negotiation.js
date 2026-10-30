/** Explicit Markdown preference; wildcards alone retain browser HTML defaults. */
export function wantsMarkdown(accept = '') {
  const ranges = accept.toLowerCase().split(',').map((range) => {
    const [type, ...parameters] = range.trim().split(';');
    const quality = parameters.map((value) => value.trim()).find((value) => value.startsWith('q='));
    const q = quality ? Number(quality.slice(2)) : 1;
    return { type: type.trim(), q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 };
  });
  const markdown = Math.max(0, ...ranges.filter(({ type }) => type === 'text/markdown').map(({ q }) => q));
  const html = Math.max(0, ...ranges.filter(({ type }) => type === 'text/html' || type === 'application/xhtml+xml').map(({ q }) => q));
  return markdown > 0 && markdown >= html;
}

function varyAccept(headers) {
  const vary = headers.get('vary') ?? '';
  if (vary !== '*' && !vary.split(',').some((value) => value.trim().toLowerCase() === 'accept')) {
    headers.set('vary', [vary, 'Accept'].filter(Boolean).join(', '));
  }
}

export default async function negotiate(request, context) {
  const url = new URL(request.url);
  if (!['GET', 'HEAD'].includes(request.method) || /\.[^/]+$/u.test(url.pathname) || url.pathname.startsWith('/markdown/')) return;
  const original = await context.next();
  if (original.status !== 200 || !original.headers.get('content-type')?.toLowerCase().startsWith('text/html')) return original;
  const headers = new Headers(original.headers);
  varyAccept(headers);
  if (!wantsMarkdown(request.headers.get('accept') ?? '')) {
    return new Response(request.method === 'HEAD' ? null : original.body, { status: original.status, headers });
  }
  const path = url.pathname.replace(/\/$/u, '') || '/index';
  const target = new URL(`/markdown${path}.md`, url.origin);
  let markdown;
  try {
    // Only public, build-generated Markdown is fetched. Subrequests bypass this function.
    markdown = await fetch(target, { headers: { accept: 'text/markdown' } });
  } catch {
    return new Response(request.method === 'HEAD' ? null : original.body, { status: original.status, headers });
  }
  // A missing representation must never turn a 404 fallback HTML page into Markdown.
  if (markdown.status !== 200 || !markdown.headers.get('content-type')?.toLowerCase().startsWith('text/markdown')) {
    return new Response(request.method === 'HEAD' ? null : original.body, { status: original.status, headers });
  }
  for (const header of ['content-length', 'content-encoding', 'content-range', 'transfer-encoding', 'etag', 'last-modified']) headers.delete(header);
  headers.set('content-type', 'text/markdown; charset=utf-8');
  // Do not cache a transformed representation under an HTML cache key.
  headers.set('cache-control', 'private, no-store');
  headers.set('netlify-cdn-cache-control', 'no-store');
  return new Response(request.method === 'HEAD' ? null : markdown.body, { status: 200, headers });
}
