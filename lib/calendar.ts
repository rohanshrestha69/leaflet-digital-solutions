// features/booking/lib/calendar.ts

export const WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type CalendarCell = {
  date: Date;
  inMonth: boolean;
  isPast: boolean;
  isToday: boolean;
};

/** Returns a Mon-first 6-row × 7-col grid for the given month */
export function getMonthGrid(year: number, month: number): CalendarCell[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7; // Monday = 0

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarCell[] = [];

  /* Leading days from previous month */
  for (let i = 0; i < startDay; i++) {
    const date = new Date(year, month, i - startDay + 1);
    cells.push({
      date,
      inMonth: false,
      isPast: date < today,
      isToday: sameDay(date, today),
    });
  }

  /* Current month */
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    cells.push({
      date,
      inMonth: true,
      isPast: date < today,
      isToday: sameDay(date, today),
    });
  }

  /* Trailing days to complete the final week */
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1]!.date;
    const date = new Date(
      last.getFullYear(),
      last.getMonth(),
      last.getDate() + 1,
    );
    cells.push({
      date,
      inMonth: false,
      isPast: date < today,
      isToday: sameDay(date, today),
    });
  }

  return cells;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDateLong(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
