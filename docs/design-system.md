# Developer Field Notes

Version 1 · ayodeji.dev · 28 October 2026

A personal publication for a developer advocate who builds, writes, and speaks.
The visual identity combines a warm reading surface, technical metadata, and
precise ruled layouts. The person introduces the work; the work carries the page.

## Files and adoption

- `src/styles/design-tokens.css`: reusable semantic tokens for both themes.
- `docs/design-system.html`: standalone visual specimen; open in a browser.
- This document: component, page, interaction, and editorial specifications.

All pages use this system through `BaseLayout`, which sets
`data-design="field-notes"` on the root element. `design-tokens.css` defines the
shared palette and scales; `global.css` provides component foundations;
`field-notes.css` provides shared page treatments; `home.css` holds homepage
compositions. Keep all public queries behind `getPublicEntries()` and its helpers.

## Design principles

1. Lead with useful work. Give article titles and talk subjects the strongest hierarchy.
2. Keep a human presence. Use the real portrait, natural language, and original photography.
3. Make structure visible. Align metadata and divide groups with one-pixel rules.
4. Use developer cues with purpose. Monospace supports dates, topics, code, and shortcuts.
5. Make the default experience complete. Navigation and content work without JavaScript;
   search, theme persistence, and copy controls enhance it.

References: [Claude.dev](https://claude.dev/) for its writing and topic structure;
[Stripe.dev](https://stripe.dev/) for its mixed-content index and labelled sections.
The palette and component rules below are specific to this site.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#F7F5F0` | `#1C1D1F` | Page canvas |
| `--surface` | `#FFFEFA` | `#242528` | Search dialog, raised controls |
| `--surface-soft` | `#EEECE6` | `#2C2D30` | Hover backgrounds, inline code, callouts |
| `--text` | `#202124` | `#F1EFE9` | Titles and body copy |
| `--muted` | `#62635F` | `#B0B1AA` | Dates, descriptions, captions |
| `--line` | `#D6D4CC` | `#42443F` | Decorative rules and group separators |
| `--control-border` | `#85867F` | `#85877F` | Input boundaries and control outlines |
| `--brand` | `#1F5E8E` | `#8FC4EB` | Links, focus indicators, primary actions |
| `--brand-strong` | `#16466B` | `#B5DCF7` | Link and primary action hover |
| `--on-brand` | `#FFFFFF` | `#1C1D1F` | Text on primary actions |
| `--success` | `#326446` | `#9BC6A7` | Positive status, with a text label |
| `--danger` | `#A33232` | `#F0AAAA` | Errors, with a text explanation |

Use text, muted, and brand on the three neutral surfaces. Use on-brand on brand
and brand-strong fills. The subtle line colour is decorative; use control-border
where a boundary identifies a control. Keep code blocks charcoal in both themes.
Do not place captions directly over photography or reduce text contrast with opacity.

## Typography

Use the system sans-serif stack for reading and the system monospace stack for
metadata. No external font request is required. Use weights 400, 500, 600, and 700.

| Role | Token | Size | Leading / weight |
| --- | --- | --- | --- |
| Hero and article title | `--type-display` | 40–64px fluid | 1.12 / 600 |
| Section heading | `--type-section` | 28–36px fluid | 1.2 / 600 |
| Card or row title | `--type-card` | 20–24px fluid | 1.3 / 600 |
| Article body | `--type-prose` | 18px | 1.75 / 400 |
| Interface body | `--type-body` | 16px | 1.65 / 400 |
| Secondary interface text | `--type-small` | 14px | 1.5 / 400 |
| Metadata and section labels | `--type-label` | 12px | 1.5 / 500, monospace |

Heading tracking: -0.03em; body: normal; uppercase labels: 0.06em.
Use sentence case for titles. Limit uppercase to short labels. Avoid monospace
paragraphs. Metadata must remain readable at browser zoom and may wrap.

## Layout and spacing

Use a 4px base with 4, 8, 12, 16, 24, 32, 48, 64, and 96px spacing tokens.
Page width is 1120px; reading width is 680px. Page gutters range from 20 to 40px.
Main sections use 64px vertical space on desktop and 40px on small screens.
Content rows use 24px vertical padding; adjacent metadata items use 8–12px gaps.

| Viewport | Layout |
| --- | --- |
| Below 680px | One column; stacked metadata; full-width actions when needed |
| 680–899px | Two columns for selected work; compact navigation |
| 900px and wider | Full navigation; introduction with portrait; aligned index rows; article sidebar |

Use `minmax(0, 1fr)` for flexible grid tracks and allow long titles to wrap.
At 320px wide, the page must not scroll horizontally. Code and data tables may
scroll inside their own containers. At 200% zoom, navigation and text must reflow.
Retain useful media on mobile; reduce its size or stack it above the title.

## Components

### Header and navigation

Use a 64px minimum header height with a bottom rule. The identity is `ayodeji.dev`.
Keep Home, Blog, Speaking, and Featured as the primary navigation. Projects may
remain a homepage section until a dedicated route exists. Mark the current page
with `aria-current="page"`, darker text, and an underline. Below 900px use the
existing native disclosure menu. Search and theme controls have 44px targets and
accessible names. Display the search shortcut as a hint, never as the only trigger.

### Personal introduction

Use a two-column composition with text and a 160–220px portrait on desktop.
Put the name above a concise role statement, followed by at most two short
sentences. Use one primary action and one secondary action. Keep social links
below the introduction. On mobile, stack the portrait and copy in DOM reading order.
Give the image useful alt text; retain the source image's natural colour.

### Featured article

One featured article per homepage. Use a 16:9 cover beside the title, description,
and publication metadata. Stack the cover above the copy below 680px. Keep text
outside the image. If the entry has no cover, give the title the space instead.
Select from public entries and fall back to the latest public article.

### Content index row

Use a semantic list with a top rule and one bottom rule per item. Desktop columns:
112px date, flexible title and description, 96px type or duration. Put topics below
the description. On mobile place date and type above the title. The title is the
main link; topic links are separate siblings, with no nested interactive elements.
Hover adds a soft background and underlines the title; keyboard focus remains clear.

### Talk row

Show date, talk title, conference, location, and text status (`Upcoming` or
`Past talk`). Provide separately named slides, recording, and event links only
when their URLs exist. Use `<time datetime>` for dates. Do not rely on a status
dot or colour alone. Preserve current event timing behaviour and public filtering.

### Project and featured work

Use two restrained columns on larger screens, one on mobile. Each item includes
a name, a specific description of the work, topics, and explicit outbound links.
Use original cover media where available. Square corners and rules provide grouping;
shadows are reserved for overlays. Add outcomes only when supported by source content.

### Buttons and links

Primary: brand fill, on-brand text, 1px border, 2px radius, minimum 44px height.
Secondary: transparent fill, text colour, control-border outline. Hover uses
brand-strong for primary and surface-soft for secondary. Use anchors for navigation
and buttons for actions. Inline prose links are underlined at rest. Icon controls
need accessible names. Disabled actions have an explicit explanation where needed.

### Topics and filters

Render topic links as quiet monospace text with generous interactive padding.
Use a visible underline or filled neutral surface for the selected filter, with
`aria-pressed` on toggle buttons. Keep topic slugs lowercase ASCII while rendering
human-readable labels. Filtering must provide an empty state and a clear reset.

### Search dialog

Retain the native `<dialog>` and existing dependency-free index search. Width:
620px maximum with 16px viewport clearance. Include a labelled input, close action,
live result count, content type, title, and description. Specify loading, results,
empty, and unavailable states. Keep the unavailable message visible if loading fails.
Escape closes the dialog; restore focus to the invoking control. Arrow navigation
and the shortcut supplement Tab navigation. Fetch only the public content index.

### Article body

Use the 680px reading column with 18px text and 1.75 leading. Place the table of
contents beside it at 900px and above, otherwise in a disclosure before the body.
Underline links; use muted captions beneath figures; preserve code whitespace.
Code blocks have a charcoal background, horizontal overflow, and a labelled copy
button with success/failure feedback. Tables use header cells and local overflow.
Related content follows the article with two or three ruled items.

### Newsletter and footer

Close the homepage with one sentence describing the newsletter and an outbound
Subscribe link using the existing Substack destination. Keep the footer compact:
identity, social links, feed, and copyright. Avoid adding a subscription form
without a real submission path.

## Page compositions

- **Home:** introduction → one featured article → latest writing → upcoming/recent
  talks → selected projects and appearances → newsletter → footer. Omit empty groups.
- **Blog:** title and short introduction → topic navigation → article index → footer.
- **Speaking:** introduction → upcoming talks in ascending date order → past talks
  in descending date order → footer.
- **Featured:** introduction → interviews, community work, and appearances → footer.
- **Article/talk:** title and metadata → optional cover → body and contents → source
  links and related work → footer.

## Interaction and accessibility acceptance

- Use native landmarks, one h1 per page, sequential headings, and the skip link.
- Text should meet 4.5:1 contrast; meaningful control boundaries and focus indicators
  should meet 3:1 against adjacent surfaces. Verify rendered pairings when adopting.
- Use a 2px brand focus outline with 4px offset; never remove an outline without
  an equally visible replacement. Sticky headers must not obscure anchor targets.
- Use 44px targets for standalone controls and adequate separation for inline links.
- Theme follows the system preference until explicitly selected; persist the choice
  when storage is available. A storage failure must not break page interaction.
- Limit transitions to colour, background, and border, for 140ms. Respect reduced
  motion and avoid autoplay, parallax, and decorative layout movement.
- Verify keyboard navigation, both themes, 320px width, 200% zoom, long titles,
  missing covers, empty collections, and failed search before rollout.

## Repository guardrails

Keep Astro, plain CSS, repository Markdown, colocated media, and folder-derived
IDs. Preserve feeds, canonical URLs, aliases, topic routes, raw Markdown, and
`content-index.json` schema version 2. The specimen uses authored example text;
it is outside `src/pages` and does not add a public route or query content.
No new client framework, font service, image service, CMS, or search dependency
is needed. Run all repository checks before handing off an implementation.
