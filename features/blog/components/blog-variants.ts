// features/blog/components/blog-variants.ts
import type { Variants } from "motion/react"
import { ease } from "@/lib/motion"

/* ── Section orchestrators ─────────────────────────────────────── */

export const sectionV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const itemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.out },
  },
}

export const itemBlurV: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: ease.out },
  },
}

export const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}

export const tileV: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: ease.out },
  },
}

export const fadeInV: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: ease.smooth },
  },
}

/* ── Legacy aliases — keep old imports working ─────────────────── */

export const sectionContainer = sectionV
export const itemVariants     = itemV
export const gridContainer    = gridV
export const tileVariants     = tileV