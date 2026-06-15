// components/animations/motion-provider.tsx
"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "motion/react"

import { ScrollProgress } from "@/components/animations/scroll-progress"
import { transition } from "@/lib/motion"

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      // reducedMotion="user"
      transition={transition.default}
    >
      <ScrollProgress />
      {children}
    </MotionConfig>
  )
}