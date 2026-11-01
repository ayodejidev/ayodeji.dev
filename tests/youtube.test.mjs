import assert from 'node:assert/strict';
import test from 'node:test';
import { youtubeEmbedUrl } from '../src/lib/youtube.mjs';

test('YouTube share and watch URLs embed the recording without tracking parameters', () => {
  for (const url of ['https://youtu.be/qUSSh9drYtU?is=dgbFxJlj2OHRoW6c', 'https://www.youtube.com/watch?v=qUSSh9drYtU', 'https://youtube.com/shorts/qUSSh9drYtU', 'https://m.youtube.com/live/qUSSh9drYtU', 'https://www.youtube-nocookie.com/embed/qUSSh9drYtU']) {
    assert.equal(youtubeEmbedUrl(url), 'https://www.youtube-nocookie.com/embed/qUSSh9drYtU', url);
  }
});

test('missing, non-YouTube, malformed, playlist and lookalike URLs do not create frames', () => {
  for (const url of [undefined, '', 'not a url', 'https://example.com/video', 'javascript:alert(1)', 'https://youtube.com.evil.example/watch?v=qUSSh9drYtU', 'https://youtube.com@evil.example/watch?v=qUSSh9drYtU', 'https://www.youtube.com/playlist?list=123', 'https://youtu.be/invalid', 'http://youtu.be/qUSSh9drYtU', 'https://youtu.be/qUSSh9drYtU/extra']) assert.equal(youtubeEmbedUrl(url), undefined, String(url));
});

test('recording timestamps become start seconds on the privacy-enhanced embed', () => {
  const base = 'https://www.youtube-nocookie.com/embed/qUSSh9drYtU';
  const cases = [
    ['https://youtu.be/qUSSh9drYtU?t=3600&is=tracking', 3600],
    ['https://www.youtube.com/watch?v=qUSSh9drYtU&t=1h2m3s', 3723],
    ['https://www.youtube.com/watch?v=qUSSh9drYtU#t=2m30s', 150],
    ['https://www.youtube-nocookie.com/embed/qUSSh9drYtU?start=90', 90],
    ['https://youtu.be/qUSSh9drYtU?t=0', 0],
    ['https://youtu.be/qUSSh9drYtU?start=60&t=90', 60],
    ['https://youtu.be/qUSSh9drYtU?start=invalid&t=90', 90],
  ];
  for (const [url, seconds] of cases) assert.equal(youtubeEmbedUrl(url), `${base}?start=${seconds}`, url);
  for (const timestamp of ['-1', '1.5', 'Infinity', '1e6', 'now', '9007199254740992', '1mgarbage', '']) {
    assert.equal(youtubeEmbedUrl(`https://youtu.be/qUSSh9drYtU?t=${timestamp}`), base, timestamp);
  }
  assert.equal(youtubeEmbedUrl('https://example.com/watch?v=qUSSh9drYtU&t=90'), undefined);
});
