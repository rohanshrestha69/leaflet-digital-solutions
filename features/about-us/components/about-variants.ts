// features/about/components/about-variants.ts
import type { Variants } from "motion/react"
import { ease } from "@/lib/motion"

export const sectionV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
}

export const itemV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
}

export const itemBlurV: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show:   {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: ease.out },
  },
}

export const gridV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
}

export const tileV: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show:   {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: ease.out },
  },
}

export const lineV: Variants = {
  hidden: { scaleX: 0 },
  show:   {
    scaleX: 1,
    transition: { duration: 0.8, ease: ease.inOut, delay: 0.1 },
  },
}

export const popV: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: ease.spring },
  },
}

/* Legacy aliases */
// export const sectionContainer = sectionV
// export const itemVariants     = itemV
// export const gridContainer    = gridV
// export const tileVariants     = tileV