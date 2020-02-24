// Formats date to a human readable form, dd/mm/yyyy
export function formatDate(date: string) {
  return date
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('-')
    .replace(/-/g, '.');
}
