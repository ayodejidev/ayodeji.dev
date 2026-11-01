/** The same source-backed representation is used by copying and content negotiation. */
export function writingMarkdown({ title, description, author, publishedAt, url, body, mediaBase, guide }) {
  // Leave fenced code examples byte-for-byte intact when making media URLs portable.
  const portableBody = body.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/gu).map((part, index) => index % 2 ? part :
    part.replace(/(\]\()\.\/([^\s)]+)(\))/gu, (_match, start, asset, end) => `${start}${mediaBase}${asset}${end}`)).join('');
  const sections = [
    `# ${title}`, description,
    `Author: ${author}\nPublished: ${publishedAt}\nSource: ${url}`,
    ...(guide?.outcomes?.length ? ['## What you’ll learn', guide.outcomes.map((item) => `- ${item}`).join('\n')] : []),
    ...(guide?.prerequisites?.length ? ['## Before you start', guide.prerequisites.map((item) => `- ${item}`).join('\n')] : []),
    portableBody.trim(),
    ...(guide?.faq?.length ? ['## Frequently asked questions', ...guide.faq.map((item) => `### ${item.question}\n\n${item.answer}`)] : []),
  ];
  return `${sections.filter(Boolean).join('\n\n')}\n`;
}
