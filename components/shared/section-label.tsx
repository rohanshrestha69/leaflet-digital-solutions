// components/shared/section-label.tsx
"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/*                                                                     */
/*  All children use the SAME state names as the parent wrapper        */
/*  (`hidden` / `show`) so Framer Motion's variant inheritance works.  */
/*  Each child has its own stagger via the parent's transition.        */
/* ------------------------------------------------------------------ */

const containerV: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const labelTextV: Variants = {
  hidden: { opacity: 0, y: 6, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: ease.out },
  },
};

const dotV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: ease.spring },
  },
};

const lineV: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: ease.inOut },
  },
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Variant = "default" | "pill" | "minimal" | "line";
type Tone = "muted" | "brand";

type SectionLabelProps = {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  /** Skip the wrapper's own viewport trigger — use when parent orchestrates */
  animated?: boolean;
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  Shared text class                                                  */
/* ------------------------------------------------------------------ */

function getTextClass(tone: Tone) {
  return cn(
    "font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.2em]",
    "sm:text-[12px]",
    tone === "brand" ? "text-[var(--brand)]" : "text-[var(--text-muted)]",
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SectionLabel({
  children,
  variant = "default",
  tone = "muted",
  animated = true,
  className,
}: SectionLabelProps) {
  const isBrand = tone === "brand";
  const textCls = getTextClass(tone);

  /* The inner content — always wrapped in a motion.span that orchestrates
   * its children's stagger. Whether it triggers itself or inherits from
   * a parent is controlled by `animated`. */
  const renderInner = () => {
    switch (variant) {
      case "pill":
        return (
          <motion.span
            variants={containerV}
            className={cn(
              "inline-flex items-center gap-2.5 rounded-full",
              "px-3.5 py-2 border backdrop-blur-sm",
              isBrand
                ? "border-[var(--brand-border)] bg-[var(--brand)]/[0.08]"
                : "border-[var(--border)] bg-[var(--card)]/40",
            )}
          >
            <motion.span
              variants={dotV}
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                isBrand ? "bg-[var(--brand)]" : "bg-[var(--text-muted)]",
              )}
            />
            <motion.span variants={labelTextV} className={textCls}>
              {children}
            </motion.span>
          </motion.span>
        );

      case "minimal":
        return (
          <motion.span variants={containerV} className="inline-flex">
            <motion.span variants={labelTextV} className={textCls}>
              {children}
            </motion.span>
          </motion.span>
        );

      case "line":
        return (
          <motion.span
            variants={containerV}
            className="inline-flex items-center gap-3.5"
          >
            <motion.span
              variants={lineV}
              className={cn(
                "h-px w-8 origin-left sm:w-10",
                isBrand ? "bg-[var(--brand)]" : "bg-[var(--text-muted)]/50",
              )}
              style={{ originX: 0 }}
            />
            <motion.span variants={labelTextV} className={textCls}>
              {children}
            </motion.span>
          </motion.span>
        );

      default:
        return (
          <motion.span
            variants={containerV}
            className="inline-flex items-center gap-2.5"
          >
            <motion.span
              variants={dotV}
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                isBrand ? "bg-[var(--brand)]" : "bg-[var(--text-muted)]",
              )}
            />
            <motion.span variants={labelTextV} className={textCls}>
              {children}
            </motion.span>
          </motion.span>
        );
    }
  };

  /* When `animated`, wrap in our own viewport trigger.
   * When NOT animated, inherit from the nearest parent motion component. */
  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className={cn("inline-flex", className)}
      >
        {renderInner()}
      </motion.div>
    );
  }

  return <div className={cn("inline-flex", className)}>{renderInner()}</div>;
}
