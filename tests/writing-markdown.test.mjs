import assert from 'node:assert/strict';
import test from 'node:test';
import { writingMarkdown } from '../src/lib/writing-markdown.mjs';

const article = { title: 'An API guide', description: 'Build an API.', author: 'Ayodeji', publishedAt: '2026-11-01', url: 'https://example.com/blog/api', mediaBase: 'https://example.com/content-media/blog/api/', body: '## Setup\n\n```sh\npython -m venv .venv\n```\n\n![Diagram](./diagram.png)', guide: undefined };

test('copyable Markdown preserves original code and portable media with attribution', () => {
  const text = writingMarkdown(article);
  for (const expected of ['# An API guide', 'Source: https://example.com/blog/api', 'Author: Ayodeji', 'Published: 2026-11-01', '```sh\npython -m venv .venv\n```', '![Diagram](https://example.com/content-media/blog/api/diagram.png)']) assert(text.includes(expected), expected);
  assert(!text.includes('Help me work through'));
  assert(!text.includes('undefined'));
});

test('guide exports include learning outcomes, prerequisites, and FAQ answers', () => {
  const text = writingMarkdown({ ...article, guide: { outcomes: ['Build an API'], prerequisites: ['Python'], faq: [{ question: 'Need a frontend?', answer: 'No.' }] } });
  for (const expected of ['## What you’ll learn\n\n- Build an API', '## Before you start\n\n- Python', '### Need a frontend?\n\nNo.']) assert(text.includes(expected), expected);
});

test('fenced Markdown examples are not rewritten as live media', () => {
  const body = '```md\n![Example](./example.png)\n```\n\n![Actual](./actual.png)';
  const result = writingMarkdown({ ...article, body });
  assert(result.includes('```md\n![Example](./example.png)\n```'));
  assert(result.includes('![Actual](https://example.com/content-media/blog/api/actual.png)'));
  assert(!result.includes('Originally published'));
});
