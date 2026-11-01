import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const initialization = layout.match(/<script is:inline>([\s\S]*?)<\/script>/u)[1];
function visit({ dark = false, saved = null, blockedStorage = false } = {}) {
  const dataset = {};
  const handlers = {};
  const writes = [];
  const system = { matches: dark, addEventListener: (_type, listener) => { handlers.system = listener; } };
  runInNewContext(initialization, {
    matchMedia: () => system,
    localStorage: {
      getItem: () => { if (blockedStorage) throw Error('blocked'); return saved; },
      setItem: (key, value) => { if (blockedStorage) throw Error('blocked'); writes.push([key, value]); },
    },
    document: {
      documentElement: { dataset },
      addEventListener: (_type, listener) => { handlers.ready = listener; },
      querySelector: () => ({ addEventListener: (_type, listener) => { handlers.click = listener; } }),
    },
  });
  handlers.ready();
  return { dataset, writes, click: handlers.click, changeSystem(dark) { system.matches = dark; handlers.system(); } };
}

test('first visit follows either system appearance without saving an override', () => {
  for (const dark of [true, false]) {
    const page = visit({ dark });
    assert.equal(page.dataset.theme, dark ? 'dark' : 'light');
    assert.deepEqual(page.writes, []);
    page.changeSystem(!dark);
    assert.equal(page.dataset.theme, dark ? 'light' : 'dark');
  }
});

test('explicit and remembered choices take priority over later system changes', () => {
  const page = visit({ dark: true });
  page.click();
  assert.equal(page.dataset.theme, 'light');
  assert.deepEqual(page.writes, [['theme', 'light']]);
  page.changeSystem(true);
  assert.equal(page.dataset.theme, 'light');
  assert.equal(visit({ dark: true, saved: 'light' }).dataset.theme, 'light');
  assert.equal(visit({ dark: false, saved: 'dark' }).dataset.theme, 'dark');
});

test('invalid saved preferences and blocked storage still use the system default', () => {
  assert.equal(visit({ dark: true, saved: 'system' }).dataset.theme, 'dark');
  const page = visit({ dark: true, blockedStorage: true });
  assert.equal(page.dataset.theme, 'dark');
  page.click();
  page.changeSystem(true);
  assert.equal(page.dataset.theme, 'light');
});
