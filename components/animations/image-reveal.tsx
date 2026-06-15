// components/animations/image-reveal.tsx
"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "motion/react"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

type ImageRevealProps = {
  children: ReactNode
  className?: string
  /** Direction the curtain wipes away */
  direction?: "up" | "down" | "left" | "right"
  /** Curtain color */
  curtainColor?: string
  /** Delay before reveal starts */
  delay?: number
  /** Parallax scale factor on the image */
  scale?: number
  once?: boolean
}

const origins = {
  up: "top" as const,
  down: "bottom" as const,
  left: "left" as const,
  right: "right" as const,
}

const scaleAxis = {
  up: { scaleY: 1 },
  down: { scaleY: 1 },
  left: { scaleX: 1 },
  right: { scaleX: 1 },
}

const scaleAxisHidden = {
  up: { scaleY: 0 },
  down: { scaleY: 0 },
  left: { scaleX: 0 },
  right: { scaleX: 0 },
}

export function ImageReveal({
  children,
  className,
  direction = "up",
  curtainColor = "var(--background)",
  delay = 0,
  scale = 1.12,
  once = true,
}: ImageRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.25 })

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Image with zoom-out effect */}
      <motion.div
        className="h-full w-full"
        initial={{ scale }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          duration: 1.4,
          delay: delay + 0.15,
          ease: ease.out,
        }}
      >
        {children}
      </motion.div>

      {/* Curtain overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: curtainColor,
          transformOrigin: origins[direction],
        }}
        initial={scaleAxis[direction]}
        animate={inView ? scaleAxisHidden[direction] : {}}
        transition={{
          duration: 0.85,
          delay,
          ease: ease.inOut,
        }}
      />
    </div>
  )
}