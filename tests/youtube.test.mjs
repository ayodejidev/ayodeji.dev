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
