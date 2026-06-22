// features/booking/components/service-step.tsx
"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  MEETING_SERVICES,
  MeetingService,
} from "@/features/marketing/data/services-page";

type ServiceStepProps = {
  serviceId: string;
  duration: number;
  onSelect: (service: MeetingService, duration: number) => void;
  onNext: () => void;
};

export function ServiceStep({
  serviceId,
  duration,
  onSelect,
  onNext,
}: ServiceStepProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {MEETING_SERVICES.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            active={s.id === serviceId}
            activeDuration={duration}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: ease.smooth }}
          className={cn(
            "inline-flex items-center gap-2 rounded-full",
            "bg-[var(--brand)] px-6 py-3 text-[13px] font-medium text-white",
            "transition-colors duration-300 hover:bg-[var(--brand-hover)]",
            "shadow-[0_8px_24px_-12px_rgba(248,130,33,0.5)]",
          )}
        >
          Continue
        </motion.button>
      </div>
    </>
  );
}

/* ── Service card ─────────────────────────────────────────────── */

function ServiceCard({
  service,
  active,
  activeDuration,
  onSelect,
}: {
  service: MeetingService;
  active: boolean;
  activeDuration: number;
  onSelect: (service: MeetingService, duration: number) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(service, service.durations[0]!)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: ease.smooth }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-[var(--radius-lg)]",
        "border bg-[var(--background)] p-5 text-left",
        "transition-[border-color,background-color] duration-300 ease-[var(--ease-premium)]",
        "sm:p-6",
        active
          ? "border-[var(--brand-border)] bg-[var(--brand)]/[0.04]"
          : "border-[var(--border)] hover:border-[var(--border-strong)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-[16px] font-semibold tracking-tight text-[var(--text)] sm:text-[18px]">
          {service.title}
        </h3>

        <motion.span
          animate={{
            backgroundColor: active ? "var(--brand)" : "transparent",
            borderColor: active ? "var(--brand)" : "var(--border)",
          }}
          transition={{ duration: 0.25, ease: ease.smooth }}
          className="grid size-5 shrink-0 place-items-center rounded-full border"
        >
          {active && <Check className="size-3 text-white" strokeWidth={3} />}
        </motion.span>
      </div>

      <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">
        {service.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {service.durations.map((d) => (
          <DurationChip
            key={d}
            duration={d}
            active={active && d === activeDuration}
            disabled={!active}
            onSelect={(e) => {
              e.stopPropagation();
              if (active) onSelect(service, d);
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}

function DurationChip({
  duration,
  active,
  disabled,
  onSelect,
}: {
  duration: number;
  active: boolean;
  disabled: boolean;
  onSelect: (e: React.MouseEvent) => void;
}) {
  return (
    <span
      onClick={onSelect}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(e as unknown as React.MouseEvent);
        }
      }}
      className={cn(
        "inline-flex select-none items-center rounded-full border px-3 py-1",
        "text-[11px] font-medium uppercase tracking-[0.1em]",
        "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-premium)]",
        disabled && "cursor-default",
        active
          ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
          : "border-[var(--border)] text-[var(--text-muted)]",
      )}
    >
      {duration} min
    </span>
  );
}
