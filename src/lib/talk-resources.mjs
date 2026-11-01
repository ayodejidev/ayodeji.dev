/**
 * Keep existing slide/recording fields and arbitrary resource links in one list.
 * @param {{ slidesUrl?: string, videoUrl?: string, resources?: {label: string, url: string}[] }} data
 * @returns {{label: string, url: string}[]}
 */
export function getTalkResources({ slidesUrl, videoUrl, resources = [] }) {
  const links = [
    ...(slidesUrl ? [{ label: 'Slides', url: slidesUrl }] : []),
    ...(videoUrl ? [{ label: 'Recording', url: videoUrl }] : []),
    ...resources,
  ];
  const seen = new Set();
  return links.filter(({ url }) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}
