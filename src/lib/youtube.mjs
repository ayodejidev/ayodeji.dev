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
  return id && /^[A-Za-z0-9_-]{11}$/u.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : undefined;
}
