// lib/motion.ts
import type { Transition, Variants } from "motion/react"

/* ------------------------------------------------------------------ */
/*  Easing curves                                                      */
/* ------------------------------------------------------------------ */

export const ease = {
  /** Primary — expo-out for reveals, entrances */
  out:     [0.16, 1, 0.3, 1]      as [number, number, number, number],
  /** Curtain / overlay wipes */
  inOut:   [0.76, 0, 0.24, 1]     as [number, number, number, number],
  /** Hover effects, underlines, micro-interactions */
  smooth:  [0.22, 1, 0.36, 1]     as [number, number, number, number],
  /** Spring-like pop for buttons, chips */
  spring:  [0.34, 1.56, 0.64, 1]  as [number, number, number, number],
  /** Soft deceleration — forms, subtle transitions */
  soft:    [0.25, 0.8, 0.25, 1]   as [number, number, number, number],
  /** Dramatic — cinematic entrances */
  dramatic:[0.6, 0.01, 0.05, 0.95]as [number, number, number, number],
  /** Bouncy — success states, checkmarks */
  bouncy:  [0.34, 1.8, 0.64, 1]   as [number, number, number, number],
  /** Linear — marquees, infinite loops */
  linear:  "linear"                as const,
} as const

/* Named exports for direct imports */
export const premiumEase  = ease.smooth
export const softEase     = ease.soft
export const smoothEase   = ease.smooth
export const dramaticEase = ease.dramatic
export const bouncyEase   = ease.bouncy

/* ------------------------------------------------------------------ */
/*  Transitions                                                        */
/* ------------------------------------------------------------------ */

export const transition = {
  default: { duration: 0.56, ease: ease.smooth }  satisfies Transition,
  fast:    { duration: 0.18, ease: ease.smooth }  satisfies Transition,
  normal:  { duration: 0.28, ease: ease.smooth }  satisfies Transition,
  exit:    { duration: 0.22, ease: ease.smooth }  satisfies Transition,
  slow:    { duration: 0.9,  ease: ease.out }     satisfies Transition,
  reveal:  { duration: 0.65, ease: ease.out }     satisfies Transition,
} as const

export const defaultTransition = transition.default
export const fastTransition    = transition.fast
export const normalTransition  = transition.normal
export const exitTransition    = transition.exit

/* ------------------------------------------------------------------ */
/*  Viewport configs                                                   */
/* ------------------------------------------------------------------ */

export const viewport = {
  section: {
    once:   true,
    amount: 0.1  as const,
    margin: "0px 0px -8% 0px" as const,
  },
  hero: {
    once:   true,
    amount: 0.05 as const,
  },
  lazy: {
    once:   true,
    amount: 0.05 as const,
    margin: "0px 0px -5% 0px" as const,
  },
} as const

export const sectionViewport = viewport.section
export const heroViewport    = viewport.hero
export const labelViewport   = {
  once:   false,
  amount: 0 as const,
  margin: "-60px 0px 0px 0px" as const,
}

/* ------------------------------------------------------------------ */
/*  Orchestrators                                                      */
/* ------------------------------------------------------------------ */

export function sectionStagger(
  staggerChildren = 0.12,
  delayChildren   = 0.04,
): Variants {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren, delayChildren } },
    show:    { transition: { staggerChildren, delayChildren } },
  }
}

/* ------------------------------------------------------------------ */
/*  Atomic reveal variants                                             */
/* ------------------------------------------------------------------ */

export function fadeUp(y = 22, duration = 0.6, delay = 0): Variants {
  const t = { duration, ease: ease.out, delay }
  return {
    hidden:  { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: t },
    show:    { opacity: 1, y: 0, transition: t },
  }
}

export function fadeUpScale(y = 32, scale = 0.97, duration = 0.65): Variants {
  const t = { duration, ease: ease.out }
  return {
    hidden:  { opacity: 0, y, scale },
    visible: { opacity: 1, y: 0, scale: 1, transition: t },
    show:    { opacity: 1, y: 0, scale: 1, transition: t },
  }
}

export function fadeUpBlur(y = 32, blur = 6, duration = 0.78): Variants {
  const t = { duration, ease: ease.out }
  return {
    hidden:  { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: t },
    show:    { opacity: 1, y: 0, filter: "blur(0px)", transition: t },
  }
}

export function fadeIn(duration = 0.5, delay = 0): Variants {
  const t = { duration, ease: ease.smooth, delay }
  return {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: t },
    show:    { opacity: 1, transition: t },
  }
}

export function fadeSlideX(x = 16, duration = 0.5): Variants {
  const t = { duration, ease: ease.smooth }
  return {
    hidden:  { opacity: 0, x },
    visible: { opacity: 1, x: 0, transition: t },
    show:    { opacity: 1, x: 0, transition: t },
  }
}

export function scaleIn(scale = 0.85, duration = 1): Variants {
  const t = { duration, ease: ease.out }
  return {
    hidden:  { opacity: 0, scale },
    visible: { opacity: 1, scale: 1, transition: t },
    show:    { opacity: 1, scale: 1, transition: t },
  }
}

export function lineReveal(duration = 0.8, delay = 0.15): Variants {
  const t = { duration, ease: ease.inOut, delay }
  return {
    hidden:  { scaleX: 0 },
    visible: { scaleX: 1, transition: t },
    show:    { scaleX: 1, transition: t },
  }
}

export function popIn(scale = 0.85, duration = 0.35): Variants {
  const t = { duration, ease: ease.spring }
  return {
    hidden:  { opacity: 0, scale },
    visible: { opacity: 1, scale: 1, transition: t },
    show:    { opacity: 1, scale: 1, transition: t },
  }
}

export function clipReveal(
  direction: "up" | "down" | "left" | "right" = "up",
  duration = 0.9,
  delay = 0,
): Variants {
  const map = {
    up:    { hidden: "inset(100% 0 0 0)",  visible: "inset(0% 0 0 0)"  },
    down:  { hidden: "inset(0 0 100% 0)",  visible: "inset(0 0 0% 0)"  },
    left:  { hidden: "inset(0 100% 0 0)",  visible: "inset(0 0% 0 0)"  },
    right: { hidden: "inset(0 0 0 100%)",  visible: "inset(0 0 0 0%)"  },
  }
  const t = { duration, ease: ease.inOut, delay }
  return {
    hidden:  { clipPath: map[direction].hidden },
    visible: { clipPath: map[direction].visible, transition: t },
    show:    { clipPath: map[direction].visible, transition: t },
  }
}

/* ------------------------------------------------------------------ */
/*  Named variants                                                     */
/* ------------------------------------------------------------------ */

export const iconPop: Variants = {
  hidden:  { opacity: 0, scale: 0.6, rotate: -20 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: ease.out, delay: 0.15 } },
  show:    { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: ease.out, delay: 0.15 } },
}

/* ------------------------------------------------------------------ */
/*  Hover / tap presets                                                */
/* ------------------------------------------------------------------ */

export const hover = {
  card: {
    y: -2,
    borderColor: "rgba(248, 130, 33, 0.28)",
    backgroundColor: "var(--card-hover)",
    transition: transition.normal,
  },
  lift: { y: -1, transition: transition.fast },
  scale: { scale: 1.04, transition: transition.fast },
} as const

export const tap = {
  scale: { scale: 0.97 },
  press: { scale: 0.95 },
} as const


/* ------------------------------------------------------------------ */
/*  Legacy aliases                                                     */
/* ------------------------------------------------------------------ */
export const staggerContainer: Variants  = sectionStagger()