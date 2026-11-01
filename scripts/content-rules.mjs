const topicPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const sitePathPattern = /^\/(?!\/)[a-z0-9/_-]*(?:#[a-z0-9_-]+)?$/u;

/** Match the content schema's nonempty, trimmed text fields. */
function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Catch malformed guide metadata before Astro's schema validation at build time. */
function validateGuide(guide) {
  const errors = [];
  if (!guide || typeof guide !== 'object' || Array.isArray(guide)) return ['guide must be an object'];
  if (guide.level !== undefined && !['beginner', 'intermediate', 'advanced'].includes(guide.level)) errors.push('guide.level must be beginner, intermediate, or advanced');
  for (const field of ['prerequisites', 'outcomes']) {
    if (guide[field] !== undefined && (!Array.isArray(guide[field]) || !guide[field].every(nonEmptyString))) errors.push(`guide.${field} must contain nonempty strings`);
  }
  if (guide.faq !== undefined && (!Array.isArray(guide.faq) || guide.faq.some((item) => !item || !nonEmptyString(item.question) || !nonEmptyString(item.answer)))) errors.push('guide.faq must contain nonempty questions and answers');
  return errors;
}

/** Audit authored frontmatter, including optional guide and resource metadata. */
export function validateMetadata(collection, data) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['frontmatter must be an object'];
  if (typeof data.title !== 'string' || !data.title.trim()) errors.push('title is required');
  if (typeof data.description !== 'string' || !data.description.trim()) errors.push('description is required');

  if (data.featured !== undefined && typeof data.featured !== 'boolean') errors.push('featured must be a boolean');

  if (collection === 'blog' && data.kind !== undefined && !['article', 'guide'].includes(data.kind)) errors.push('kind must be article or guide');

  if (collection === 'blog' && data.guide !== undefined) errors.push(...validateGuide(data.guide));

  if (collection === 'events' && data.resources !== undefined) {
    const https = (value) => {
      try { return value.startsWith('https://') && new URL(value).protocol === 'https:'; } catch { return false; }
    };
    if (!Array.isArray(data.resources) || data.resources.some((item) => !item || typeof item.label !== 'string' || !item.label.trim() || typeof item.url !== 'string' || !https(item.url))) errors.push('resources must contain a label and HTTPS URL');
  }

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
