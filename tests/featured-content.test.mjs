import assert from 'node:assert/strict';
import test from 'node:test';
import { selectFeatured } from '../src/lib/featured-selection.mjs';
import { validateMetadata } from '../scripts/content-rules.mjs';

test('featured selection includes every content type and requires an explicit true flag', () => {
  const items = ['article', 'event', 'project', 'featured', 'page'].map((type) => ({ type, id: 'same-slug', featured: true }));
  const result = selectFeatured([...items, { type: 'article', id: 'off', featured: false }, { type: 'event', id: 'unset' }]);
  assert.equal(result.length, 5);
  assert.deepEqual(new Set(result.map((item) => item.type)), new Set(items.map((item) => item.type)));
  assert.deepEqual(selectFeatured([{ type: 'article', id: 'none' }]), []);
});

test('featured ordering is deterministic across mixed dates and collection ID collisions', () => {
  const items = [
    { type: 'project', id: 'same', featured: true },
    { type: 'event', id: 'same', featured: true, date: '2026-10-01' },
    { type: 'article', id: 'same', featured: true, date: '2026-10-01' },
    { type: 'article', id: 'new', featured: true, date: '2026-11-01' },
  ];
  assert.deepEqual(selectFeatured(items), selectFeatured([...items].reverse()));
  assert.equal(selectFeatured(items)[0].id, 'new');
  assert.equal(selectFeatured(items).at(-1).type, 'project');
});

test('all Markdown collections validate the featured boolean', () => {
  for (const collection of ['blog', 'events', 'featured', 'projects', 'pages']) {
    const data = { title: 'Title', description: 'Description', draft: true, tags: [] };
    for (const featured of [true, false]) assert.deepEqual(validateMetadata(collection, { ...data, featured }), []);
    assert(validateMetadata(collection, { ...data, featured: 'true' }).includes('featured must be a boolean'));
  }
});
