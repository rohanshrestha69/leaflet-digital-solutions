// components/animations/motion-card.tsx
"use client"

import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { motion } from "motion/react"

import { hover, tap, transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

type MotionCardProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children:  ReactNode
  /** Disable hover lift — useful when card is a grid item that doesn't need elevation */
  noHover?:  boolean
}

export function MotionCard({
  children,
  className,
  noHover = false,
  ...props
}: MotionCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-[20px] border border-white/[0.08] bg-[var(--card)]",
        "transition-[background-color,border-color,box-shadow]",
        "duration-300 ease-[var(--ease-premium)]",
        !noHover && "hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
        className,
      )}
      whileHover={noHover ? undefined : hover.card}
      whileTap={tap.scale}
      transition={transition.normal}
      {...props}
    >
      {children}
    </motion.div>
  )
}