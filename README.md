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
