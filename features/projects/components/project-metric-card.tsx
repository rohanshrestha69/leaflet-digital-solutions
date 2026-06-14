// features/projects/components/project-metric-card.tsx
"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { popIn } from "@/lib/motion"
import type { ProjectMetric } from "@/features/marketing/data/projects-page"

type ProjectMetricCardProps = {
  metric: ProjectMetric
  className?: string
}

export function ProjectMetricCard({ metric, className }: ProjectMetricCardProps) {
  return (
    <motion.div
      variants={popIn(0.95, 0.55)}
      className={cn(
        "flex flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8",
        "transition-colors duration-300",
        "hover:border-[var(--brand-border)]",
        className
      )}
    >
      <p className="font-heading text-[36px] font-extrabold tracking-tight text-[var(--brand)] md:text-[48px]">
        {metric.value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        {metric.label}
      </p>
    </motion.div>
  )
}