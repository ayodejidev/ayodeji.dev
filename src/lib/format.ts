export function formatDate(value: Date) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(value);
}

export function canonical(path: string) {
  return new URL(path, 'https://ayodeji.dev').toString();
}
