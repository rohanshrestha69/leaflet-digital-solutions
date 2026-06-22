// features/booking/components/booking-success.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MeetingService } from "@/features/marketing/data/services-page";
import { formatDateLong } from "@/lib/calendar";

type BookingSuccessProps = {
  service: MeetingService;
  duration: number;
  date: Date;
  time: string;
  email: string;
};

export function BookingSuccess({
  service,
  duration,
  date,
  time,
  email,
}: BookingSuccessProps) {
  return (
    <main className="min-h-dvh bg-[var(--background)]">
      <Container
        wide
        className="flex min-h-dvh flex-col items-center justify-center py-24 text-center"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: ease.spring }}
          className="mb-8 grid size-16 place-items-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
        >
          <CalendarCheck className="size-7" strokeWidth={2} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.out, delay: 0.1 }}
          className="font-heading text-[32px] font-semibold leading-[1.1] tracking-tight text-[var(--text)] sm:text-[42px] md:text-[48px]"
        >
          Meeting requested.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.out, delay: 0.2 }}
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]"
        >
          We&apos;ll send a confirmation and calendar invite to{" "}
          <span className="text-[var(--text)]">{email}</span> within one
          business day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.out, delay: 0.3 }}
          className={cn(
            "mt-10 grid w-full max-w-md gap-4 rounded-[var(--radius-xl)]",
            "border border-[var(--border)] bg-[var(--card)]/40 p-6 text-left",
          )}
        >
          <Row label="Meeting" value={service.title} />
          <Row label="Duration" value={`${duration} minutes`} />
          <Row label="When" value={`${formatDateLong(date)} · ${time}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.out, delay: 0.45 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outlineDark", size: "lg" }),
              "group gap-2",
            )}
          >
            Back to home
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/work"
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "group gap-2",
            )}
          >
            See our work
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {label}
      </span>
      <span className="text-[14px] font-medium text-[var(--text)]">
        {value}
      </span>
    </div>
  );
}
