# Agent guidance

- Keep the site static-first and repository-owned Markdown as the content source of truth.
- Do not add Next.js, React, Tailwind, a hosted CMS, remote runtime images, or a client search dependency.
- Keep credentials out of source and logs.
- Keep entry media beside its Markdown under `src/content/<collection>/<slug>/`; reserve `public/` for global assets.
- Route every public query through `getPublicEntries()` or a helper built on it. Draft and scheduled blog content must not leak into routes, feeds, topics, search, raw Markdown, or discovery output.
- Use lowercase ASCII topic slugs, useful image alternative text, and stable folder-derived IDs.
- Preserve the dependency-free native search and the versioned `content-index.json` agent contract.
- Run `npm run check`, `npm test`, `npm run content:audit`, `npm run build`, and `npm run verify:determinism` before handoff.
