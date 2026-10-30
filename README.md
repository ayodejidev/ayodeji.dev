# ayodeji.dev

Ayodeji Ogundare’s home on the web: writing, talks, open-source work, and projects from a Developer Advocate and full-stack engineer.

The site is built with Astro and plain CSS. Its content lives in this repository as Markdown, so publishing does not depend on a CMS or client-side framework.

## Design system

The Developer Field Notes site theme is documented in
[the design specification](docs/design-system.md), with a
[light/dark visual specimen](docs/design-system.html) and reusable tokens in
`src/styles/design-tokens.css`. All pages use these tokens through the shared layout.

## Local development

Requires Node.js `24.19.x` and npm `>=10.8.2`.

```sh
npm ci
npm run dev
```

## Publish content

Content lives in `src/content/{blog,events,featured,pages,projects}`. Create new work as a draft:

```sh
npm run content:new -- blog my-article
npm run content:new -- events my-talk
```

Posts, talks, featured work, and projects keep their `index.md` and images together. Set `draft: false` only when an entry is ready to publish.

## Ship safely

`robots.txt` declares `Content-Signal: ai-train=no, search=yes, ai-input=no`
for all user agents. This expresses usage preferences separately from the existing
crawl allowance and sitemap declaration.

Netlify attaches homepage `Link` response headers advertising `/llms.txt` and
`/content-index.json` with the registered `describedby` relation (RFC 8288).
These reuse the public-content helpers; the content index retains schema version 2.
`npm run build` verifies the header configuration and that both targets exist.
Astro preview and a plain static HTTP server do not apply `netlify.toml` headers.
After deployment, verify the actual response with `curl -I https://ayodeji.dev/`.

```sh
npm run check
npm test
npm run content:audit
npm run build
```

## Markdown content negotiation

On Netlify, the `markdown-negotiation` Edge Function serves a pre-rendered
Markdown representation when a GET or HEAD request explicitly accepts
`text/markdown` with positive quality at least as high as HTML. HTML remains the
browser default. Both representations declare `Vary: Accept`; negotiated Markdown
is not cached and preserves the original security and discovery headers.

Markdown is built from the same public-content helpers as the site, with local
entry media rewritten to its public media route. Homepage, blog, speaking,
featured, article, talk, and topic representations live under `/markdown/` and
are excluded from the sitemap. Existing `/raw/` source exports are unchanged.
No tokenizer is installed, so no estimated `x-markdown-tokens` count is advertised.

After Netlify deployment (or with Netlify Dev), verify:

```sh
curl -i -H 'Accept: text/markdown' https://ayodeji.dev/
curl -I -H 'Accept: text/html' https://ayodeji.dev/
```

The first should return `Content-Type: text/markdown; charset=utf-8`; the second
should return HTML. Astro preview and plain static servers serve the generated
Markdown files directly but do not execute the Edge Function.
