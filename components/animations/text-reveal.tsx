// components/animations/text-reveal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { ease } from "@/lib/motion";

const BASE_DURATION = 0.7;
const BASE_STAGGER = 0.048;
const ROTATE_DEG = 1.2;
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

type HeadingTag = "h1" | "h2" | "h3" | "h4";
type BlockTag = HeadingTag | "p";
type AnyTag = BlockTag | "span";

export type SplitWordsProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /**
   * Skip IntersectionObserver — animate immediately on mount.
   * Use when a parent gate (e.g. contentVisible) already controls rendering.
   */
  immediate?: boolean;
  as?: AnyTag;
};

export type SplitLinesProps = {
  lines: string[];
  className?: string;
  lineClass?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  immediate?: boolean;
  as?: BlockTag;
};

export type TextScrambleProps = {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  speed?: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// CLIP HELPERS
// padding/margin trick: the clip needs a little breathing room so
// descenders and ascenders aren't cut off by overflow:hidden.
// ─────────────────────────────────────────────────────────────────────────────

const CLIP_INLINE =
  "inline-block overflow-hidden align-bottom pt-[0.04em] pb-[0.18em] -mb-[0.18em]";

const CLIP_BLOCK = "block overflow-hidden pt-[0.04em] pb-[0.18em] -mb-[0.18em]";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED VARIANTS
// Defined at module scope — never recreated on render.
// Using variants + staggerChildren on the container means only ONE
// Framer animation controller runs instead of N per-word controllers.
// ─────────────────────────────────────────────────────────────────────────────

const WORD_VARIANTS: Variants = {
  hidden: { y: "108%", rotate: ROTATE_DEG, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    // No transition here — it inherits from the parent stagger controller.
    // This is intentional: individual transition overrides break stagger.
  },
};

const LINE_VARIANTS: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1 },
};

// ─────────────────────────────────────────────────────────────────────────────
// SplitWords
//
// Performance notes:
//  - Container variants + staggerChildren = one RAF callback driving all
//    children, vs. N independent motion.span controllers.
//  - `rotate` is applied via transform — compositor-only, no layout.
//  - `immediate` prop bypasses IntersectionObserver for above-fold content.
//  - SSR: initial="hidden" is stable on server and client — no mismatch.
// ─────────────────────────────────────────────────────────────────────────────

export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = BASE_STAGGER,
  once = true,
  immediate = false,
  as: Tag = "p",
}: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.15,
  });

  const shouldAnimate = immediate || inView;
  const words = text.split(" ");

  // Container variants built with the caller's delay/stagger.
  // useMemo prevents recreation when unrelated props change.
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // Per-word transition — same duration for every child, Framer handles timing.
  const childTransition = {
    duration: BASE_DURATION,
    ease: ease.out,
  };

  return (
    // @ts-expect-error — polymorphic as prop
    <Tag ref={ref} className={className} aria-label={text}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "show" : "hidden"}
        // `inline` so words wrap naturally
        style={{ display: "inline" }}
        aria-hidden
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={CLIP_INLINE}
            style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
          >
            <motion.span
              variants={WORD_VARIANTS}
              transition={childTransition}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SplitLines
// ─────────────────────────────────────────────────────────────────────────────

export function SplitLines({
  lines,
  className,
  lineClass,
  delay = 0,
  stagger = 0.1,
  once = true,
  immediate = false,
  as: Tag = "p",
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.3,
  });

  const shouldAnimate = immediate || inView;

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childTransition = {
    duration: BASE_DURATION,
    ease: ease.out,
  };

  return (
    // @ts-expect-error — polymorphic as prop
    <Tag ref={ref} className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "show" : "hidden"}
        style={{ display: "block" }}
      >
        {lines.map((line, i) => (
          <span
            key={i}
            className={`${CLIP_BLOCK}${lineClass ? ` ${lineClass}` : ""}`}
          >
            <motion.span
              variants={LINE_VARIANTS}
              transition={childTransition}
              style={{ display: "block" }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TextScramble
// Unchanged logic, minor cleanup.
// ─────────────────────────────────────────────────────────────────────────────

export function TextScramble({
  text,
  className,
  delay = 0,
  once = true,
  speed = 28,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.5,
  });
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!inView) return;

    let iteration = 0;
    const total = text.length * 3;
    let interval: ReturnType<typeof setInterval> | null = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < iteration / 3) return text[idx]!;
              return CHARS[Math.floor(Math.random() * CHARS.length)]!;
            })
            .join(""),
        );
        iteration += 1;
        if (iteration > total) {
          if (interval) clearInterval(interval);
          setDisplay(text);
        }
      }, speed);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [inView, text, delay, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display || text.replace(/\S/g, "\u00A0")}
    </span>
  );
}
