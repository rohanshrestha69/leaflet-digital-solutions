// components/animations/line-sweep-reveal.tsx
"use client"

import { useMemo, useRef, type ReactNode } from "react"
import { motion, useInView, type Variants } from "motion/react"

import { ease } from "@/lib/motion"

/* ------------------------------------------------------------------ */
/*  LineSweepReveal                                                    */
/*                                                                     */
/*  Splits text into WORDS (not characters) and fades each one in     */
/*  sequence from one side to the other. Word-level chunks keep DOM   */
/*  light, animate buttery-smooth, and read as a single fast sweep.   */
/* ------------------------------------------------------------------ */

type LineSweepRevealProps = {
  text:       string
  className?: string
  /** Delay before the sweep starts (seconds) */
  delay?:     number
  /** Per-word stagger (seconds). Lower = faster sweep. */
  stagger?:   number
  /** Each word's fade duration (seconds) */
  duration?:  number
  /** Direction the sweep travels */
  from?:      "left" | "right"
  /** Trigger once or every time it enters viewport */
  once?:      boolean
  /** Viewport visibility threshold (0–1) */
  amount?:    number
  /** Semantic tag for the container */
  as?:        "p" | "span" | "div" | "h2" | "h3" | "h4"
}

export function LineSweepReveal({
  text,
  className,
  delay    = 0,
  stagger  = 0.03,
  duration = 0.35,
  from     = "left",
  once     = true,
  amount   = 0.25,
  as:      Tag = "p",
}: LineSweepRevealProps) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once, amount })

  /* Split into words once per text change */
  const words = useMemo(() => text.split(" "), [text])

  /* Container orchestrates the sweep direction + stagger */
  const containerV: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren:  stagger,
          delayChildren:    delay,
          staggerDirection: from === "left" ? 1 : -1,
        },
      },
    }),
    [stagger, delay, from],
  )

  /* Each word: opacity only — pure compositor work, no layout */
  const wordV: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { duration, ease: ease.smooth },
      },
    }),
    [duration],
  )

  return (
    // @ts-expect-error — polymorphic tag is safe at runtime
    <Tag ref={ref} className={className} aria-label={text}>
      <motion.span
        variants={containerV}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="inline"
        aria-hidden
        style={{ willChange: "opacity" }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
            <motion.span variants={wordV} className="inline-block">
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}