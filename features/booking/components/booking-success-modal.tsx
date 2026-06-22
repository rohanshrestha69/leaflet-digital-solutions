// features/booking/components/booking-success-modal.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { MeetingService } from "@/features/marketing/data/services-page";
import { formatDateLong } from "@/lib/calendar";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BookingSuccessModalProps = {
  open: boolean;
  service: MeetingService;
  duration: number;
  date: Date;
  time: string;
  email: string;
  onClose: () => void;
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BookingSuccessModal({
  open,
  service,
  duration,
  date,
  time,
  email,
  onClose,
}: BookingSuccessModalProps) {
  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  /* Escape to close */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.smooth }}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-md"
            aria-hidden
          />

          {/* Dialog panel */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: ease.out }}
            className={cn(
              "relative z-[1] w-full max-w-md overflow-hidden",
              "rounded-[var(--radius-xl)] border border-[var(--border-strong)] bg-[var(--card)]",
              "shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6),0_8px_24px_-12px_rgba(248,130,33,0.15)]",
            )}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={cn(
                "absolute right-4 top-4 grid size-9 place-items-center rounded-full",
                "border border-[var(--border)] text-[var(--text-muted)]",
                "transition-[border-color,background-color,color] duration-200",
                "hover:border-[var(--border-strong)] hover:bg-[var(--background)] hover:text-[var(--text)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40",
              )}
            >
              <X className="size-4" />
            </button>

            <div className="flex flex-col items-center px-7 py-10 text-center sm:px-10 sm:py-12">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: ease.spring, delay: 0.1 }}
                className="mb-6 grid size-14 place-items-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
              >
                <CalendarCheck className="size-6" strokeWidth={2} />
              </motion.div>

              {/* Title */}
              <motion.h2
                id="booking-success-title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ease.out, delay: 0.18 }}
                className="font-heading text-[24px] font-semibold tracking-tight text-[var(--text)] sm:text-[28px]"
              >
                Meeting requested.
              </motion.h2>

              {/* Copy */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ease.out, delay: 0.26 }}
                className="mt-3 max-w-sm text-[14px] leading-relaxed text-[var(--text-muted)]"
              >
                We&apos;ll send a confirmation and calendar invite to{" "}
                <span className="text-[var(--text)]">{email}</span> within one
                business day.
              </motion.p>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ease.out, delay: 0.34 }}
                className="mt-7 w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background)] p-5 text-left"
              >
                <div className="flex flex-col gap-4">
                  <SummaryRow label="Meeting" value={service.title} />
                  <Divider />
                  <SummaryRow label="Duration" value={`${duration} minutes`} />
                  <Divider />
                  <SummaryRow
                    label="When"
                    value={`${formatDateLong(date)} · ${time}`}
                  />
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: ease.out, delay: 0.42 }}
                className="mt-7 flex w-full flex-col gap-3 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    buttonVariants({ variant: "outlineDark", size: "lg" }),
                    "w-full sm:flex-1",
                  )}
                >
                  Close
                </button>
                <Link
                  href="/work"
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "group w-full gap-2 sm:flex-1",
                  )}
                >
                  See our work
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── Sub-components ────────────────────────────────────────────── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {label}
      </span>
      <span className="text-right text-[13px] font-medium text-[var(--text)]">
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--border)]" />;
}
