export function toYYYYMMDD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getDateNDaysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export function formatDate(date: string | Date, locale: string = "pt-BR"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

export function formatDateRange(start: string, end: string, locale: string = "pt-BR"): string {
  return `${formatDate(start, locale)} — ${formatDate(end, locale)}`;
}

export function daysBetween(start: string | Date, end: string | Date): number {
  const s = typeof start === "string" ? new Date(start) : start;
  const e = typeof end === "string" ? new Date(end) : end;
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}
