import assert from 'node:assert/strict';
import test from 'node:test';
import negotiate, { wantsMarkdown } from '../netlify/edge-functions/markdown-negotiation.js';

const html = () => new Response('<h1>Hello</h1>', { headers: {
  'content-type': 'text/html; charset=utf-8', 'content-security-policy': "default-src 'self'",
  link: '</llms.txt>; rel="describedby"', vary: 'Accept-Encoding', etag: '"html"', 'content-length': '14',
} });

test('Markdown negotiation respects explicit preferences and browser defaults', () => {
  for (const value of ['', '*/*', 'text/html,application/xhtml+xml,*/*;q=0.8', 'text/markdown;q=0', 'text/markdown;q=0.2,text/html', 'text/markdown;q=bogus']) assert.equal(wantsMarkdown(value), false, value);
  for (const value of ['text/markdown', 'TEXT/MARKDOWN; charset=utf-8', 'text/html;q=0.5,text/markdown;q=0.8', 'text/html,text/markdown']) assert.equal(wantsMarkdown(value), true, value);
});

test('default HTML remains unchanged and declares Accept variation', async () => {
  const response = await negotiate(new Request('https://example.com/'), { next: async () => html() });
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(response.headers.get('vary'), 'Accept-Encoding, Accept');
  assert.equal(await response.text(), '<h1>Hello</h1>');
});

test('Markdown GET and HEAD preserve security/discovery, remove HTML validators, and do not cache', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    assert.equal(String(url), 'https://example.com/markdown/index.md');
    return new Response('# Hello', { headers: { 'content-type': 'text/markdown' } });
  });
  for (const method of ['GET', 'HEAD']) {
    const response = await negotiate(new Request('https://example.com/?ignored=1', { method, headers: { accept: 'text/markdown', 'if-none-match': '"html"' } }), { next: async () => html() });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8');
    assert.equal(response.headers.get('content-security-policy'), "default-src 'self'");
    assert.equal(response.headers.get('link'), '</llms.txt>; rel="describedby"');
    assert.equal(response.headers.get('etag'), null);
    assert.equal(response.headers.get('content-length'), null);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    assert.equal(await response.text(), method === 'HEAD' ? '' : '# Hello');
  }
});

test('missing Markdown or failed fetch falls back to actual HTML', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response('<h1>Not found</h1>', { status: 404, headers: { 'content-type': 'text/html' } }));
  const request = new Request('https://example.com/blog/post/', { headers: { accept: 'text/markdown' } });
  assert.equal(await (await negotiate(request, { next: async () => html() })).text(), '<h1>Hello</h1>');
  fetchMock.mock.mockImplementation(async () => { throw new Error('offline'); });
  assert.equal(await (await negotiate(request, { next: async () => html() })).text(), '<h1>Hello</h1>');
});

test('assets, raw Markdown and unsafe methods bypass negotiation; redirects and errors survive', async () => {
  for (const [path, method] of [['/markdown/index.md', 'GET'], ['/raw/blog/post.md', 'GET'], ['/content-index.json', 'GET'], ['/blog', 'POST']]) {
    assert.equal(await negotiate(new Request(`https://example.com${path}`, { method }), { next: () => { throw new Error('must bypass'); } }), undefined);
  }
  for (const status of [301, 404]) {
    const original = new Response(null, { status, headers: { 'content-type': 'text/html' } });
    assert.equal(await negotiate(new Request('https://example.com/missing', { headers: { accept: 'text/markdown' } }), { next: async () => original }), original);
  }
});
