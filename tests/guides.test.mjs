import assert from 'node:assert/strict';
import test from 'node:test';
import { validateMetadata } from '../scripts/content-rules.mjs';

test('writing kind validation preserves legacy articles and accepts only supported kinds', () => {
  const metadata = { title: 'Writing', description: 'Description', draft: true, tags: [] };
  assert.deepEqual(validateMetadata('blog', metadata), []);
  for (const kind of ['article', 'guide']) assert.deepEqual(validateMetadata('blog', { ...metadata, kind }), []);
  assert(validateMetadata('blog', { ...metadata, kind: 'unsupported' }).includes('kind must be article or guide'));
});

test('audit rejects invalid optional guide fields before building', () => {
  const data = { title: 'Guide', description: 'Description', draft: true, tags: [], kind: 'guide' };
  for (const guide of [null, [], 'guide', { level: 'expert' }, { prerequisites: [' '] }, { prerequisites: 'Python' }, { outcomes: [3] }, { outcomes: null }, { faq: [{ question: '', answer: 'Answer' }] }, { faq: [{ question: 'Question', answer: '  ' }] }, { faq: [null] }, { faq: 'not a list' }]) {
    assert(validateMetadata('blog', { ...data, guide }).length > 0, JSON.stringify(guide));
  }
  for (const guide of [{}, { level: 'beginner' }, { prerequisites: [], outcomes: [], faq: [] }, { prerequisites: ['Python'], outcomes: ['Build an API'], faq: [{ question: 'How?', answer: 'Follow the steps.' }] }]) {
    assert.deepEqual(validateMetadata('blog', { ...data, guide }), [], JSON.stringify(guide));
  }
  // The schema also validates optional guide metadata on ordinary articles.
  assert(validateMetadata('blog', { ...data, kind: 'article', guide: { level: 'invalid' } }).length > 0);
});
