// features/booking/components/details-step.tsx
"use client";

import { useId } from "react";
import { motion } from "motion/react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MeetingFormat } from "@/features/marketing/data/services-page";

type DetailsStepProps = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  format: MeetingFormat;
  onChange: <K extends keyof FormFields>(
    field: K,
    value: FormFields[K],
  ) => void;
};

type FormFields = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  format: MeetingFormat;
};

const FORMATS: { id: MeetingFormat; label: string }[] = [
  { id: "online", label: "Online (Google Meet)" },
  { id: "in-person", label: "In-person" },
];

export function DetailsStep({
  fullName,
  email,
  phone,
  company,
  notes,
  format,
  onChange,
}: DetailsStepProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-8">
      {/* Format selection */}
      <div className="flex flex-col gap-4">
        <p className="text-[13px] font-medium text-[var(--text)]">
          Meeting format
        </p>
        <div className="flex flex-wrap gap-3">
          {FORMATS.map((opt) => (
            <FormatOption
              key={opt.id}
              label={opt.label}
              active={format === opt.id}
              onSelect={() => onChange("format", opt.id)}
            />
          ))}
        </div>
      </div>

      {/* Personal fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <UnderlineField
          id={`${id}-name`}
          label="Full name"
          value={fullName}
          onChange={(v) => onChange("fullName", v)}
          placeholder="Evan Carter"
          maxLength={100}
          required
        />
        <UnderlineField
          id={`${id}-email`}
          label="Email"
          type="email"
          value={email}
          onChange={(v) => onChange("email", v)}
          placeholder="evan@company.com"
          maxLength={255}
          required
        />
        <UnderlineField
          id={`${id}-phone`}
          label="Phone"
          type="tel"
          value={phone}
          onChange={(v) => onChange("phone", v)}
          placeholder="+1 555 123 4567"
          maxLength={30}
        />
        <UnderlineField
          id={`${id}-company`}
          label="Company"
          value={company}
          onChange={(v) => onChange("company", v)}
          placeholder="Company name"
          maxLength={100}
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor={`${id}-notes`}
          className="text-[13px] font-medium text-[var(--text)]"
        >
          What would you like to discuss?
        </label>
        <textarea
          id={`${id}-notes`}
          value={notes}
          onChange={(e) => onChange("notes", e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="A few sentences about your project, timelines, or goals."
          className={cn(
            "w-full resize-y rounded-[var(--radius-md)]",
            "border border-[var(--border)] bg-[var(--background)]",
            "px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)]",
            "outline-none transition-[border-color] duration-200",
            "hover:border-[var(--border-strong)]",
            "focus:border-[var(--brand-border)] focus:ring-2 focus:ring-[var(--brand)]/15",
          )}
        />
        <p className="text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          {notes.length} / 1000
        </p>
      </div>
    </div>
  );
}

/* ── Format option ─────────────────────────────────────────────── */

function FormatOption({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: ease.smooth }}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-4 py-2",
        "text-[13px] font-medium",
        "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-premium)]",
        active
          ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
          : "border-[var(--border)] bg-[var(--background)] text-[var(--text)] hover:border-[var(--border-strong)]",
      )}
    >
      <span
        className={cn(
          "grid size-4 place-items-center rounded-full border",
          active ? "border-[var(--brand)]" : "border-[var(--text-muted)]/40",
        )}
      >
        {active && <span className="size-1.5 rounded-full bg-[var(--brand)]" />}
      </span>
      {label}
    </motion.button>
  );
}

/* ── Underline field ───────────────────────────────────────────── */

function UnderlineField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
}) {
  return (
    <div className="relative flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[13px] font-medium text-[var(--text)]"
      >
        {label}
        {required && <span className="ml-1 text-[var(--brand)]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className={cn(
          "peer w-full border-b border-[var(--border)] bg-transparent pb-2",
          "text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)]",
          "outline-none transition-[border-color] duration-200",
          "hover:border-[var(--border-strong)] focus:border-[var(--brand)]",
        )}
      />
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left bg-[var(--brand)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        whileFocus={{ scaleX: 1 }}
        style={{ originX: 0 }}
        aria-hidden
      />
    </div>
  );
}
