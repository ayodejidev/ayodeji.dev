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

## Articles and technical guides

Writing stays in `src/content/blog/<slug>/index.md`, with stable `/blog/<slug>`
URLs and colocated media. Set `kind: article` (the default for existing posts) or
`kind: guide`. `/blog` lists all writing; `/blog/articles` and `/guides` provide
separate views. Topics remain independent of writing type.

```sh
npm run content:new -- guide my-technical-guide
```

The guide template starts as a draft. Its optional `guide` frontmatter defines
`level`, `prerequisites`, `outcomes`, and plain-text `faq` questions/answers. Guides get a learning overview, linked contents, expandable FAQ,
and copyable Markdown containing the complete guide. Readers can copy
manually if clipboard access is unavailable. Nothing is sent to an AI service.

Keep main steps expanded. Use native `<details><summary>` sections for optional
explanations; leave blank lines around the Markdown inside them (see the guide
template). Section links open enclosing disclosures. Articles and guides offer “Copy as Markdown”, including source attribution,
publication metadata, original code blocks, portable image URLs, and guide FAQs.
The copy action uses repository Markdown, not an HTML-to-Markdown conversion.

The existing REST API tutorial is the first guide. Feeds and the content index
still include all public writing. The index retains `schemaVersion: 2` and the
existing `article` record type; optional `writingKind` distinguishes guides.

## Talk resources

Add available links to the talk's `src/content/events/<slug>/index.md` frontmatter:

```yaml
slidesUrl: "https://example.com/slides"
videoUrl: "https://www.youtube.com/watch?v=your-recording"
resources:
  - label: "Example code"
    url: "https://github.com/your-name/talk-demo"
  - label: "Workshop handout"
    url: "https://example.com/handout.pdf"
```

All fields are optional. URLs must use HTTPS. Add each link when it becomes
available; no placeholders are required. Use any useful label for additional
materials. Resources appear on the talk page and talk cards, including homepage
previews, and are included in Markdown exports. Duplicate resource URLs appear
once. `eventUrl` remains the conference/event link, separate from talk materials.

When `videoUrl` points to a recognized YouTube video, the talk page automatically
shows a responsive, lazy-loaded player using YouTube's privacy-enhanced embed
host. No extra metadata is needed. Recording links remain available on the talk
page and cards; other video providers continue to appear as ordinary links.

## Feature any content

Set this frontmatter flag on an article, guide, talk, project, or appearance:

```yaml
featured: true
```

The item appears in the homepage's Featured section and on `/featured`, using its
existing URL and cover image when available. Missing flags default to false;
change to `featured: false` to remove an item. There is no automatic latest-post
fallback. Multiple selections appear newest first, with stable type/ID ordering
for ties and undated items. Drafts and scheduled blog posts remain excluded.

Page Markdown also accepts the flag for pages with existing public routes
(`home`, `about`, `blog`, `speaking`, `featured`, `connect`). Flagging a page without a route
fails the build rather than producing a broken featured link. Templates include
`featured: false`. The `src/content/featured` folder still holds external
appearances; its folder name alone does not opt an item into the curated set.
Existing appearances have explicit flags to preserve their placement.

Raw Markdown includes the flag, and `content-index.json` keeps schema version 2
with an additive optional `featured` property on its existing record types.

## Connect page

The homepage's second CTA links to `/connect`. Its introduction and optional
coffee-chat booking link live in `src/content/pages/connect.md`. Set the HTTPS booking URL in the frontmatter:

```yaml
coffeeChatUrl: "https://calendar.google.com/your-booking-link"
```

If the URL is omitted, the page says “Booking link coming soon” and has no
inactive or placeholder button. Social destinations use `src/data/site.ts`.
