const topicPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const sitePathPattern = /^\/(?!\/)[a-z0-9/_-]*(?:#[a-z0-9_-]+)?$/u;

export function validateMetadata(collection, data) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['frontmatter must be an object'];
  if (typeof data.title !== 'string' || !data.title.trim()) errors.push('title is required');
  if (typeof data.description !== 'string' || !data.description.trim()) errors.push('description is required');

  if (collection !== 'pages') {
    if (typeof data.draft !== 'boolean') errors.push('draft must be explicit');
    if (!Array.isArray(data.tags)) errors.push('tags must be an array');
    else {
      if (new Set(data.tags).size !== data.tags.length) errors.push('tags must be unique');
      if (data.tags.some((tag) => typeof tag !== 'string' || !topicPattern.test(tag))) errors.push('tags must be lowercase ASCII slugs');
    }
  }

  for (const field of ['aliases', 'related']) {
    if (data[field] === undefined) continue;
    if (!Array.isArray(data[field]) || data[field].some((value) => typeof value !== 'string' || !sitePathPattern.test(value))) errors.push(`${field} must contain site-relative paths`);
    else if (new Set(data[field]).size !== data[field].length) errors.push(`${field} must be unique`);
  }

  if (data.cover && (typeof data.coverAlt !== 'string' || !data.coverAlt.trim())) errors.push('coverAlt is required with cover');
  if (data.image && (typeof data.imageAlt !== 'string' || !data.imageAlt.trim())) errors.push('imageAlt is required with image');
  if (data.updatedAt && data.publishedAt && new Date(data.updatedAt) < new Date(data.publishedAt)) errors.push('updatedAt cannot precede publishedAt');
  return errors;
}

export function topicSlug(value) {
  return typeof value === 'string' && topicPattern.test(value);
}
