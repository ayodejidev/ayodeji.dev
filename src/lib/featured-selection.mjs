/** Publication filtering is performed by getPublicEntries before this selection. */
export function selectFeatured(records) {
  return records.filter((record) => record.featured === true).sort((a, b) =>
    (b.date ?? '').localeCompare(a.date ?? '') || a.type.localeCompare(b.type) || a.id.localeCompare(b.id));
}
