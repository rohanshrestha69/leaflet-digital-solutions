// features/projects/components/project-metric-card.tsx
"use client"

import { motion } from "motion/react"

import { AnimatedCounter } from "@/components/animations/animated-counter"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { ProjectMetric } from "@/features/marketing/data/projects-page"
import { tileV } from "./project-variants"

type ProjectMetricCardProps = {
  metric: ProjectMetric
  className?: string
}

export function ProjectMetricCard({ metric, className }: ProjectMetricCardProps) {
  return (
    <motion.div
      variants={tileV}
      whileHover={{ y: -3, borderColor: "rgba(248,130,33,0.25)" }}
      transition={{ duration: 0.25, ease: ease.smooth }}
      className={cn(
        "group flex flex-col gap-2 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8",
        "transition-[border-color] duration-300",
        className
      )}
    >
      <p className="font-heading text-[36px] font-extrabold tracking-tight text-[var(--brand)] md:text-[48px]">
        <AnimatedCounter value={metric.value} duration={1800} />
      </p>
      <p className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        {metric.label}
      </p>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  )
}