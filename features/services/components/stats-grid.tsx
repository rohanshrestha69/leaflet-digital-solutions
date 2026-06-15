// features/services/components/stats-grid.tsx
"use client"

import { motion, type Variants } from "motion/react"

import { AnimatedCounter } from "@/components/animations/animated-counter"
import { servicesStats } from "@/features/marketing/data/services-page"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

const orchestratorV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const tileV: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: ease.out },
  },
}

const lineV: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: ease.inOut, delay: 0.15 },
  },
}

export function StatsGrid() {
  return (
    <motion.div
      variants={orchestratorV}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      className="grid grid-cols-2 gap-4 md:gap-5"
    >
      {servicesStats.map((stat, index) => {
        const number = String(index + 1).padStart(2, "0")

        return (
          <motion.div
            key={stat.label}
            variants={tileV}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: ease.smooth }}
            className={cn(
              "group/stat relative flex aspect-square flex-col justify-between overflow-hidden rounded-[var(--radius-xl)]",
              "border border-[var(--border)] bg-[var(--card)] p-5 md:p-6",
              "transition-[border-color] duration-300",
              "hover:border-[var(--brand-border)]"
            )}
          >
            <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              {number}
            </span>

            <div className="flex flex-col gap-2">
              <AnimatedCounter
                value={stat.value}
                duration={1800}
                className="font-heading text-[36px] font-extrabold tracking-tight text-[var(--brand)] md:text-[56px]"
              />
              <p className="text-[13px] leading-snug text-[var(--text-soft)] md:text-[14px]">
                {stat.label}
              </p>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(248,130,33,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover/stat:opacity-100"
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}