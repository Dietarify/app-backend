export function dateToString(date: Date | null) {
  return date?.toISOString().split('T')[0] ?? null;
}
