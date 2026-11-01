import assert from 'node:assert/strict';
import test from 'node:test';
import { codeLanguage, copyCode } from '../src/lib/code-blocks.mjs';

test('labels Shiki fenced commands, named code, and unlabelled pre blocks', () => {
  const block = (language, className = '') => ({ dataset: { language }, querySelector: () => ({ className }) });
  assert.equal(codeLanguage(block('bash')), 'Shell');
  assert.equal(codeLanguage(block('typescript')), 'TypeScript');
  assert.equal(codeLanguage(block(undefined, 'language-json')), 'JSON');
  assert.equal(codeLanguage(block(undefined)), 'Text');
});

test('copies exact code whitespace without toolbar labels or status', async () => {
  const textContent = '  curl https://example.com \\\n    --header "Accept: application/json"\n';
  let copied;
  await copyCode({ textContent }, { writeText: async (value) => { copied = value; } });
  assert.equal(copied, textContent);
});

test('clipboard unavailability and denied access reach the manual fallback', async () => {
  await assert.rejects(copyCode({ textContent: 'pip install fastapi' }, undefined));
  await assert.rejects(copyCode({ textContent: 'pip install fastapi' }, { writeText: async () => { throw new Error('denied'); } }));
});
