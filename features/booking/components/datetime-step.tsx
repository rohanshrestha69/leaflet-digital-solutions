// features/booking/components/datetime-step.tsx
"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { getMonthGrid, MONTHS, sameDay, WEEKDAYS } from "@/lib/calendar";
import { TIME_SLOTS } from "@/features/marketing/data/services-page";

type DateTimeStepProps = {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
};

export function DateTimeStep({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onNext,
}: DateTimeStepProps) {
  const today = useMemo(() => new Date(), []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const grid = useMemo(
    () => getMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const prevMonth = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const nextMonth = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const monthKey = `${viewYear}-${viewMonth}`;

  return (
    <>
      {/* Calendar */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background)] p-5 sm:p-6">
        {/* Month header */}
        <div className="mb-5 flex items-center justify-between">
          <motion.button
            type="button"
            onClick={prevMonth}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous month"
            className={cn(
              "grid size-9 place-items-center rounded-full",
              "border border-[var(--border)] text-[var(--text-muted)]",
              "transition-[border-color,background-color,color] duration-200",
              "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]",
            )}
          >
            <ChevronLeft className="size-4" />
          </motion.button>

          <p className="font-heading text-[14px] font-semibold tracking-tight text-[var(--text)]">
            {MONTHS[viewMonth]} {viewYear}
          </p>

          <motion.button
            type="button"
            onClick={nextMonth}
            whileTap={{ scale: 0.92 }}
            aria-label="Next month"
            className={cn(
              "grid size-9 place-items-center rounded-full",
              "border border-[var(--border)] text-[var(--text-muted)]",
              "transition-[border-color,background-color,color] duration-200",
              "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]",
            )}
          >
            <ChevronRight className="size-4" />
          </motion.button>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid — animates on month change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={monthKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: ease.smooth }}
            className="mt-1 grid grid-cols-7 gap-1"
          >
            {grid.map((cell, i) => {
              const isSelected =
                selectedDate && sameDay(cell.date, selectedDate);
              const disabled = !cell.inMonth || cell.isPast;

              return (
                <motion.button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelectDate(cell.date)}
                  whileTap={!disabled ? { scale: 0.92 } : undefined}
                  className={cn(
                    "relative aspect-square rounded-[var(--radius-md)] text-[13px] font-medium",
                    "transition-[background-color,color,border-color] duration-200 ease-[var(--ease-premium)]",
                    disabled &&
                      "cursor-not-allowed text-[var(--text-subtle)]/40",
                    !disabled &&
                      !isSelected &&
                      cell.isToday &&
                      "border border-[var(--border-strong)] text-[var(--text)] hover:bg-[var(--card)]/60",
                    !disabled &&
                      !isSelected &&
                      !cell.isToday &&
                      "text-[var(--text)] hover:bg-[var(--card)]/60",
                    isSelected &&
                      "bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]",
                  )}
                >
                  {cell.date.getDate()}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Time slots */}
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {Object.entries(TIME_SLOTS).map(([period, slots]) => (
          <TimePeriod
            key={period}
            label={period}
            slots={slots}
            selectedTime={selectedTime}
            disabled={!selectedDate}
            onSelect={onSelectTime}
          />
        ))}
      </div>

      {/* Continue */}
      <div className="mt-8 flex justify-end">
        <motion.button
          type="button"
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          whileHover={!(!selectedDate || !selectedTime) ? { y: -1 } : undefined}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: ease.smooth }}
          className={cn(
            "inline-flex items-center gap-2 rounded-full",
            "bg-[var(--brand)] px-6 py-3 text-[13px] font-medium text-white",
            "transition-colors duration-300 hover:bg-[var(--brand-hover)]",
            "shadow-[0_8px_24px_-12px_rgba(248,130,33,0.5)]",
            "disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
          )}
        >
          Continue
        </motion.button>
      </div>
    </>
  );
}

/* ── Time period column ────────────────────────────────────────── */

function TimePeriod({
  label,
  slots,
  selectedTime,
  disabled,
  onSelect,
}: {
  label: string;
  slots: readonly string[];
  selectedTime: string | null;
  disabled: boolean;
  onSelect: (time: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((t) => {
          const active = selectedTime === t;
          return (
            <motion.button
              key={t}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(t)}
              whileTap={!disabled ? { scale: 0.96 } : undefined}
              className={cn(
                "rounded-[var(--radius-md)] border px-3 py-2.5 text-[13px] font-medium",
                "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-premium)]",
                "disabled:cursor-not-allowed disabled:opacity-40",
                active
                  ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--text)] hover:border-[var(--border-strong)]",
              )}
            >
              {t}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
