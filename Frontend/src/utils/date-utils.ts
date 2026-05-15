import type { CustomDate } from "../types/CustomDate";

export function formatCustomDate(
  customDate: CustomDate | null | undefined,
): string {
  if (!customDate?.date) return "-";

  const parsed = new Date(customDate.date);
  if (isNaN(parsed.getTime())) return "-";

  const locale = navigator.language;

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function customDateToInput(date?: CustomDate | null): string {
  if (!date?.date) return "";

  return date.date.split(" ")[0];
}
