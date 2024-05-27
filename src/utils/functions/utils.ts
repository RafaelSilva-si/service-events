export function parseDate(dataStr: string): Date {
  const [year, month, day] = dataStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}
