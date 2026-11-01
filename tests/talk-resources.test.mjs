import assert from 'node:assert/strict';
import test from 'node:test';
import { getTalkResources } from '../src/lib/talk-resources.mjs';
import { validateMetadata } from '../scripts/content-rules.mjs';

test('talks without materials have no resource links', () => {
  assert.deepEqual(getTalkResources({}), []);
});

test('existing recording fields coexist with custom resources without duplicate links', () => {
  assert.deepEqual(getTalkResources({
    slidesUrl: 'https://example.com/slides', videoUrl: 'https://example.com/video',
    resources: [{ label: 'Demo code', url: 'https://example.com/code' }, { label: 'Same slides', url: 'https://example.com/slides' }],
  }), [{ label: 'Slides', url: 'https://example.com/slides' }, { label: 'Recording', url: 'https://example.com/video' }, { label: 'Demo code', url: 'https://example.com/code' }]);
});

test('resource metadata rejects missing labels and unsafe URLs', () => {
  const data = { title: 'Talk', description: 'Description', draft: true, tags: [] };
  for (const resources of [[{ label: 'Code', url: 'javascript:alert(1)' }], [{ label: '', url: 'https://example.com' }], [{ label: 'Missing URL' }], 'invalid']) {
    assert(validateMetadata('events', { ...data, resources }).includes('resources must contain a label and HTTPS URL'));
  }
  assert.deepEqual(validateMetadata('events', { ...data, resources: [{ label: 'Workshop notes', url: 'https://example.com/notes' }] }), []);
});

test('audit requires literal HTTPS URLs, matching the collection schema', () => {
  const data = { title: 'Talk', description: 'Description', draft: true, tags: [] };
  for (const url of ['https:example.com', 'https:/example.com', 'http://example.com', 'HTTPS://example.com', ' https://example.com', 'https://', '//example.com']) {
    assert(validateMetadata('events', { ...data, resources: [{ label: 'Slides', url }] }).includes('resources must contain a label and HTTPS URL'), url);
  }
  assert.deepEqual(validateMetadata('events', { ...data, resources: [{ label: 'Slides', url: 'https://example.com/slides?format=pdf' }] }), []);
});
