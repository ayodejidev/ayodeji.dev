import { getContentRecords } from '../lib/content';

export async function GET() {
  const records = await getContentRecords();
  const enriched = records.map((record) => {
    const topics = new Set(record.tags);
    const inferred = records
      .filter((candidate) => candidate.url !== record.url && candidate.tags.some((tag) => topics.has(tag)))
      .sort((left, right) => right.tags.filter((tag) => topics.has(tag)).length - left.tags.filter((tag) => topics.has(tag)).length || (right.date ?? '').localeCompare(left.date ?? ''))
      .slice(0, 3)
      .map((candidate) => candidate.url);
    const related = [...new Set([...record.related, ...inferred])].slice(0, 3);
    return { ...record, topics: record.tags, related };
  });
  return new Response(JSON.stringify({ schemaVersion: 2, records: enriched }), { headers: { 'content-type': 'application/json; charset=utf-8' } });
}
