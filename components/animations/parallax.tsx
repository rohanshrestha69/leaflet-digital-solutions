// components/animations/parallax.tsx
"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ParallaxProps = {
  children:    ReactNode
  className?:  string
  /**
   * How far the child moves relative to the scroll range.
   * 0.1–0.2 = subtle depth.  0.3+ = dramatic.
   */
  speed?:      number
  /**
   * Start and end scroll offsets passed directly to useScroll.
   * Accepts any strings the library understands at runtime,
   * typed as a readonly string tuple to avoid fighting internal types.
   */
  scrollStart?: string
  scrollEnd?:   string
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Parallax({
  children,
  className,
  speed       = 0.15,
  scrollStart = "start end",
  scrollEnd   = "end start",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Build the options object separately so we can cast `offset` once
  // without spreading unknown types onto the motion hook.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollOptions: any = {
    target: ref,
    offset: [scrollStart, scrollEnd],
  }

  const { scrollYProgress } = useScroll(scrollOptions)

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -100}%`, `${speed * 100}%`],
  )

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}