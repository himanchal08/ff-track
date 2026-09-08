/**
 * Date utility functions shared across all features.
 * No React/Next imports — independently unit-testable.
 */

/** Format a date to YYYY-MM-DD string (local time) */
export function toDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse a YYYY-MM-DD string to a local Date (midnight) */
export function fromDateString(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Return today's date as YYYY-MM-DD */
export function today(): string {
  return toDateString(new Date());
}

/** Return tomorrow's date as YYYY-MM-DD */
export function tomorrow(): string {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return toDateString(t);
}

/** Day of week: 0=Sunday, 6=Saturday */
export function dayOfWeek(dateStr: string): number {
  return fromDateString(dateStr).getDay();
}

/** Get the start of the calendar week (Monday) for a date */
export function startOfWeek(dateStr: string): string {
  const d = fromDateString(dateStr);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  return toDateString(d);
}

/** Get the start of the calendar month for a date */
export function startOfMonth(dateStr: string): string {
  const d = fromDateString(dateStr);
  return toDateString(new Date(d.getFullYear(), d.getMonth(), 1));
}

/** Get the start of the calendar quarter for a date */
export function startOfQuarter(dateStr: string): string {
  const d = fromDateString(dateStr);
  const quarterStartMonth = Math.floor(d.getMonth() / 3) * 3;
  return toDateString(new Date(d.getFullYear(), quarterStartMonth, 1));
}

/** Get the start of the calendar year for a date */
export function startOfYear(dateStr: string): string {
  const d = fromDateString(dateStr);
  return toDateString(new Date(d.getFullYear(), 0, 1));
}

/** Friendly display string: "Today", "Yesterday", or formatted date */
export function displayDate(dateStr: string): string {
  const t = today();
  const y = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return toDateString(d);
  })();

  if (dateStr === t) return "Today";
  if (dateStr === y) return "Yesterday";

  return fromDateString(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Format seconds as MM:SS */
export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/** Format seconds as H:MM:SS */
export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
