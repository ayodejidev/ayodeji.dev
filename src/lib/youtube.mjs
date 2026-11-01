/** Convert a YouTube timestamp in seconds or h/m/s notation to safe integer seconds. */
function startSeconds(value) {
  if (typeof value !== 'string' || !value) return undefined;
  let seconds;
  if (/^\d+$/u.test(value)) seconds = Number(value);
  else {
    const parts = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/u.exec(value);
    if (!parts || !parts.slice(1).some((part) => part !== undefined)) return undefined;
    seconds = Number(parts[1] ?? 0) * 3600 + Number(parts[2] ?? 0) * 60 + Number(parts[3] ?? 0);
  }
  return Number.isSafeInteger(seconds) && seconds >= 0 ? seconds : undefined;
}

/** Only recognized YouTube video URLs become embeds; other recordings stay links. */
export function youtubeEmbedUrl(value) {
  if (!value) return undefined;
  let url;
  try { url = new URL(value); } catch { return undefined; }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return undefined;
  const parts = url.pathname.split('/').filter(Boolean);
  let id;
  if (url.hostname === 'youtu.be' && parts.length === 1) id = parts[0];
  else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else if (['embed', 'shorts', 'live'].includes(parts[0]) && parts.length === 2) id = parts[1];
  } else if (url.hostname === 'www.youtube-nocookie.com' && parts[0] === 'embed' && parts.length === 2) id = parts[1];
  if (!id || !/^[A-Za-z0-9_-]{11}$/u.test(id)) return undefined;
  const fragment = new URLSearchParams(url.hash.slice(1));
  const start = [url.searchParams.get('start'), url.searchParams.get('t'), fragment.get('t')]
    .map(startSeconds).find((value) => value !== undefined);
  return `https://www.youtube-nocookie.com/embed/${id}${start === undefined ? '' : `?start=${start}`}`;
}
