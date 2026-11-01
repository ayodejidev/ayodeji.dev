import assert from 'node:assert/strict';
import test from 'node:test';
import { validateMetadata } from '../scripts/content-rules.mjs';

test('writing kind validation preserves legacy articles and accepts only supported kinds', () => {
  const metadata = { title: 'Writing', description: 'Description', draft: true, tags: [] };
  assert.deepEqual(validateMetadata('blog', metadata), []);
  for (const kind of ['article', 'guide']) assert.deepEqual(validateMetadata('blog', { ...metadata, kind }), []);
  assert(validateMetadata('blog', { ...metadata, kind: 'unsupported' }).includes('kind must be article or guide'));
});
