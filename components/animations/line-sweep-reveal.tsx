// components/animations/line-sweep-reveal.tsx
"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { ease } from "@/lib/motion";

export type LineSweepRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  from?: "left" | "right";
  once?: boolean;
  amount?: number;
  immediate?: boolean;
  as?: "p" | "span" | "div" | "h2" | "h3" | "h4";
};

// Word variant — opacity only, no transform.
// clip-path on a parent would be cheaper for a single block of text,
// but per-word opacity allows natural line-wrap without clipping artifacts.
const WORD_HIDDEN = { opacity: 0 };
const WORD_SHOW = { opacity: 1 };

export function LineSweepReveal({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  duration = 0.32,
  from = "left",
  once = true,
  amount = 0.2,
  immediate = false,
  as: Tag = "p",
}: LineSweepRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once, amount });
  const shouldAnimate = immediate || inView;

  const words = useMemo(() => text.split(" "), [text]);

  const containerV: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
          staggerDirection: from === "right" ? -1 : 1,
        },
      },
    }),
    [stagger, delay, from],
  );

  const wordV: Variants = useMemo(
    () => ({
      hidden: WORD_HIDDEN,
      show: {
        ...WORD_SHOW,
        transition: { duration, ease: ease.smooth },
      },
    }),
    [duration],
  );

  return (
    // @ts-expect-error — polymorphic tag
    <Tag ref={ref} className={className} aria-label={text}>
      <motion.span
        variants={containerV}
        initial="hidden"
        animate={shouldAnimate ? "show" : "hidden"}
        style={{ display: "inline" }}
        aria-hidden
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            <motion.span variants={wordV} style={{ display: "inline-block" }}>
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
