// components/animations/text-reveal.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

import { ease } from "@/lib/motion"

/* ------------------------------------------------------------------ */
/*  Shared config                                                      */
/* ------------------------------------------------------------------ */

const BASE_DURATION = 0.75
const BASE_STAGGER  = 0.055
const ROTATE_DEG    = 2
const CHARS         = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type HeadingTag = "h1" | "h2" | "h3" | "h4"
type BlockTag   = HeadingTag | "p"
type AnyTag     = BlockTag | "span"

type SplitWordsProps = {
  text:       string
  className?: string
  delay?:     number
  stagger?:   number
  once?:      boolean
  as?:        AnyTag
}

type SplitLinesProps = {
  lines:      string[]
  className?: string
  lineClass?: string
  delay?:     number
  stagger?:   number
  once?:      boolean
  as?:        BlockTag
}

type TextScrambleProps = {
  text:       string
  className?: string
  delay?:     number
  once?:      boolean
  speed?:     number
}

/* ------------------------------------------------------------------ */
/*  SplitWords                                                         */
/*  Reveals each word by clipping upward from below its container.    */
/*  Uses the overflow-hidden wrapper technique from eloqwnt.com.      */
/* ------------------------------------------------------------------ */

export function SplitWords({
  text,
  className,
  delay   = 0,
  stagger = BASE_STAGGER,
  once    = true,
  as:     Tag = "p",
}: SplitWordsProps) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.3,
  })

  const words = text.split(" ")

  return (
    // @ts-expect-error — polymorphic `as` prop; safe at runtime
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "108%", rotate: ROTATE_DEG }}
            animate={inView ? { y: "0%", rotate: 0 } : {}}
            transition={{
              duration: BASE_DURATION,
              delay:    delay + i * stagger,
              ease:     ease.out,
            }}
          >
            {word}
          </motion.span>

          {/* Non-breaking space preserves word spacing without extra DOM */}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  SplitLines                                                         */
/*  Reveals each line by clipping upward. Pass lines as an array.     */
/* ------------------------------------------------------------------ */

export function SplitLines({
  lines,
  className,
  lineClass,
  delay   = 0,
  stagger = 0.1,
  once    = true,
  as:     Tag = "p",
}: SplitLinesProps) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.3,
  })

  return (
    // @ts-expect-error — polymorphic `as` prop; safe at runtime
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block overflow-hidden${lineClass ? ` ${lineClass}` : ""}`}
        >
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{
              duration: BASE_DURATION,
              delay:    delay + i * stagger,
              ease:     ease.out,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  TextScramble                                                       */
/*  Characters randomize before settling into the final string.       */
/*  Ideal for mono / data-display labels.                             */
/* ------------------------------------------------------------------ */

export function TextScramble({
  text,
  className,
  delay = 0,
  once  = true,
  speed = 28,
}: TextScrambleProps) {
  const ref     = useRef<HTMLSpanElement>(null)
  const inView  = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.5,
  })
  const [display, setDisplay] = useState("")

  useEffect(() => {
    if (!inView) return

    let iteration = 0
    const total   = text.length * 3
    let interval: ReturnType<typeof setInterval> | null = null

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, idx) => {
              if (char === " ")         return " "
              if (idx < iteration / 3) return text[idx]!
              return CHARS[Math.floor(Math.random() * CHARS.length)]!
            })
            .join(""),
        )

        iteration += 1

        if (iteration > total) {
          if (interval) clearInterval(interval)
          setDisplay(text)
        }
      }, speed)
    }, delay * 1000)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [inView, text, delay, speed])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display || text.replace(/\S/g, "\u00A0")}
    </span>
  )
}