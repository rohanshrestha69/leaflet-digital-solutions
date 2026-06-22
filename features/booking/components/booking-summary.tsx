// features/booking/components/booking-summary.tsx
"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/shared/section-label";
import {
  MeetingFormat,
  MeetingService,
} from "@/features/marketing/data/services-page";
import { formatDateLong } from "@/lib/calendar";

type BookingSummaryProps = {
  service: MeetingService;
  duration: number;
  date: Date | null;
  time: string | null;
  format: MeetingFormat;
  canSubmit: boolean;
  submitting: boolean;
};

export function BookingSummary({
  service,
  duration,
  date,
  time,
  format,
  canSubmit,
  submitting,
}: BookingSummaryProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-[var(--radius-xl)]",
        "border border-[var(--border)] bg-[var(--card)]/40 p-6 sm:p-8",
        "transition-[border-color] duration-300 hover:border-[var(--border-strong)]",
      )}
    >
      <SectionLabel variant="default" animated={false}>
        Your meeting
      </SectionLabel>

      <div className="flex flex-col gap-5">
        <SummaryRow label="Type" value={service.title} />
        <Divider />
        <SummaryRow label="Duration" value={`${duration} minutes`} />
        <Divider />
        <SummaryRow
          label="When"
          value={
            date ? (
              <>
                {formatDateLong(date)}
                {time && (
                  <span className="text-[var(--text-muted)]"> · {time}</span>
                )}
              </>
            ) : (
              "Not selected"
            )
          }
          muted={!date}
        />
        <Divider />
        <SummaryRow
          label="Format"
          value={format === "online" ? "Online · Google Meet" : "In-person"}
        />
      </div>

      <motion.button
        type="submit"
        disabled={!canSubmit || submitting}
        whileHover={canSubmit && !submitting ? { y: -1 } : undefined}
        whileTap={canSubmit && !submitting ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2, ease: ease.smooth }}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full",
          "bg-[var(--brand)] py-3.5 text-[13px] font-medium text-white",
          "transition-colors duration-300 hover:bg-[var(--brand-hover)]",
          "shadow-[0_8px_24px_-12px_rgba(248,130,33,0.5)]",
          "disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
        )}
      >
        {submitting ? (
          <Spinner />
        ) : (
          <>
            Confirm meeting
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </motion.button>

      <p className="text-[12px] leading-relaxed text-[var(--text-muted)]">
        No payment required. You&apos;ll receive a calendar invite once we
        confirm — typically within one business day.
      </p>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────────────── */

function SummaryRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {label}
      </p>
      <p
        className={cn(
          "text-[14px] font-medium",
          muted ? "text-[var(--text-muted)]" : "text-[var(--text)]",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--border)]" />;
}

function Spinner() {
  return (
    <motion.span
      className="inline-block size-4 rounded-full border-2 border-white/30 border-t-white"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}
