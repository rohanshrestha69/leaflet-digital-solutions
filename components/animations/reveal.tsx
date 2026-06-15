// components/animations/reveal.tsx
"use client"

import type { ReactNode } from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"

import {
  ease,
  transition as t,
  sectionStagger,
  fadeUp,
} from "@/lib/motion"

/* ------------------------------------------------------------------ */
/*  Reveal — single element fade-up                                    */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children:  ReactNode
  className?: string
  delay?:    number
  y?:        number
  once?:     boolean
  amount?:   number
}

export function Reveal({
  children,
  className,
  delay  = 0,
  y      = 18,
  once   = true,
  amount = 0.12,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={fadeUp(y, t.default.duration as number, delay)}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  StaggerContainer — orchestrates child entrance                    */
/* ------------------------------------------------------------------ */

type StaggerContainerProps = {
  children:  ReactNode
  className?: string
  stagger?:  number
  delay?:    number
  slow?:     boolean
  once?:     boolean
  amount?:   number
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delay   = 0.04,
  slow    = false,
  once    = true,
  amount  = 0.1,
}: StaggerContainerProps) {
  const variants = sectionStagger(slow ? 0.1 : stagger, delay)

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  StaggerItem — child of StaggerContainer                           */
/* ------------------------------------------------------------------ */

type StaggerItemProps = {
  children:  ReactNode
  className?: string
  layout?:   boolean | "position" | "size" | "preserve-aspect"
  y?:        number
}

const staggerItemVariants: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.6, ease: ease.out },
  },
}

export function StaggerItem({
  children,
  className,
  layout,
  y = 22,
}: StaggerItemProps) {
  const variants: Variants = {
    hidden:  { opacity: 0, y },
    visible: {
      opacity: 1,
      y:       0,
      transition: { duration: 0.6, ease: ease.out },
    },
  }

  return (
    <motion.div
      className={className}
      layout={layout ?? undefined}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  LineReveal — origin-left scaleX wipe                              */
/* ------------------------------------------------------------------ */

type LineRevealProps = {
  className?: string
  delay?:    number
  duration?: number
}

export function LineReveal({
  className,
  delay    = 0,
  duration = 0.8,
}: LineRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration, ease: ease.inOut, delay }}
      style={{ originX: 0 }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  ClipReveal — clipPath mask reveal                                  */
/* ------------------------------------------------------------------ */

type ClipRevealProps = {
  children:  ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?:    number
  duration?: number
  once?:     boolean
}

const clipMap = {
  up:    { hidden: "inset(100% 0 0 0)",  visible: "inset(0% 0 0 0)"  },
  down:  { hidden: "inset(0 0 100% 0)",  visible: "inset(0 0 0% 0)"  },
  left:  { hidden: "inset(0 100% 0 0)",  visible: "inset(0 0% 0 0)"  },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)"  },
}

export function ClipReveal({
  children,
  className,
  direction = "up",
  delay     = 0,
  duration  = 0.9,
  once      = true,
}: ClipRevealProps) {
  const { hidden, visible } = clipMap[direction]

  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: visible }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, ease: ease.inOut, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Presence — AnimatePresence wrapper                                 */
/* ------------------------------------------------------------------ */

export function Presence({
  children,
  mode = "popLayout",
}: {
  children: ReactNode
  mode?: "sync" | "popLayout" | "wait"
}) {
  return (
    <AnimatePresence mode={mode} initial={false}>
      {children}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/*  Aliases — keep existing imports working                           */
/* ------------------------------------------------------------------ */

export const StaggerReveal = StaggerContainer
export const Stagger       = StaggerContainer