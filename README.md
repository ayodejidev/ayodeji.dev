# ayodeji.dev

Ayodeji Ogundare’s home on the web: writing, talks, open-source work, and projects from a Developer Advocate and full-stack engineer.

The site is built with Astro and plain CSS. Its content lives in this repository as Markdown, so publishing does not depend on a CMS or client-side framework.

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

```sh
npm run check
npm test
npm run content:audit
npm run build
```
