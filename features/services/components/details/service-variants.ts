// features/services/components/details/service-variants.ts
import type { Variants } from "motion/react"
import { ease } from "@/lib/motion"

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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

export const tileV: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: ease.out },
  },
}

export const lineV: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: ease.inOut, delay: 0.1 },
  },
}

/* Legacy aliases */
export const sectionContainer = sectionV
export const itemVariants     = itemV
export const gridContainer    = gridV
export const tileVariants     = tileV