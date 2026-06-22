// features/booking/components/step-section.tsx
"use client";

import { useId, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type StepSectionProps = {
  step: number;
  title: string;
  summary?: string;
  /** Step is fully completed (gets check icon) */
  completed?: boolean;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export function StepSection({
  step,
  title,
  summary,
  completed = false,
  open,
  onToggle,
  children,
}: StepSectionProps) {
  const contentId = useId();

  return (
    <section
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--card)]/40",
        "transition-[border-color,background-color] duration-300 ease-[var(--ease-premium)]",
        open
          ? "border-[var(--border-strong)] bg-[var(--card)]/60"
          : "border-[var(--border)] hover:border-[var(--border-strong)]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
      >
        <div className="flex min-w-0 items-center gap-4">
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full",
              "transition-[background-color,color] duration-300 ease-[var(--ease-premium)]",
              completed
                ? "bg-[var(--brand)] text-white"
                : open
                  ? "bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand-border)]"
                  : "bg-[var(--background)] text-[var(--text-muted)] border border-[var(--border)]",
            )}
          >
            {completed ? (
              <Check className="size-4" strokeWidth={2.5} />
            ) : (
              <span className="text-[13px] font-semibold">{step}</span>
            )}
          </span>

          <div className="min-w-0">
            <p className="font-heading text-[16px] font-semibold tracking-tight text-[var(--text)] sm:text-[18px]">
              {title}
            </p>
            {summary && !open && (
              <p className="mt-0.5 truncate text-[13px] text-[var(--text-muted)]">
                {summary}
              </p>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: ease.smooth }}
          className="shrink-0"
        >
          <ChevronDown className="size-5 text-[var(--text-muted)]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: ease.inOut },
              opacity: { duration: 0.25, delay: open ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--border)] px-6 pb-8 pt-7 sm:px-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
