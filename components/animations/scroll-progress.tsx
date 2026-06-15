// components/animations/scroll-progress.tsx
"use client"

import { motion, useScroll, useSpring } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // Smooth spring so the bar doesn't feel mechanical
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping:   40,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] h-[2px] w-full origin-left bg-[var(--brand)] motion-reduce:hidden"
      style={{ scaleX }}
    />
  )
}