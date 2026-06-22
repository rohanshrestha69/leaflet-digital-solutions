"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── Shared card chrome ──────────────────────────────────────────── */

type CardShellProps = {
  children: ReactNode;
  className?: string;
};

export function CardShell({ children, className }: CardShellProps) {
  return (
    <motion.article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
        "transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-premium)]",
        "hover:border-[var(--border-strong)]",
        className,
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: ease.smooth }}
    >
      {children}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.09),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.article>
  );
}

/* ── Card header ─────────────────────────────────────────────────── */

type CardHeaderProps = {
  number: string;
  icon: LucideIcon;
};

export function CardHeader({ number, icon: Icon }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {number}
      </span>

      <motion.span
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full",
          "border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]",
        )}
        whileHover={{ scale: 1.08, rotate: 6 }}
        transition={{ duration: 0.3, ease: ease.spring }}
      >
        <Icon className="size-4" strokeWidth={2} />
      </motion.span>
    </div>
  );
}

/* ── Card copy ───────────────────────────────────────────────────── */

type CardCopyProps = {
  title: string;
  description: string;
  className?: string;
};

export function CardCopy({ title, description, className }: CardCopyProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h3 className="font-heading text-[20px] font-semibold tracking-tight text-[var(--text)] md:text-[24px]">
        {title}
      </h3>
      <p className="mt-3 max-w-[56ch] text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
        {description}
      </p>
    </div>
  );
}

/* ── Diagram box ─────────────────────────────────────────────────── */

type DiagramBoxProps = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
};

export function DiagramBox({
  children,
  className,
  glowColor = "rgba(248,130,33,0.05)",
}: DiagramBoxProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]/60",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 68%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 0.5px, transparent 0.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
