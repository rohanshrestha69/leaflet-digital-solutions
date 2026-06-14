"use client"

import { motion } from "motion/react"

import { AnimatedCounter } from "@/components/animations/animated-counter"
import { servicesStats } from "@/features/marketing/data/services-page"
import { fadeUpScale, sectionStagger, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

const orchestrator = sectionStagger(0.08, 0.05)
const tileV = fadeUpScale(16, 0.97, 0.5)

export function StatsGrid() {
  return (
    <motion.div
      variants={orchestrator}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="grid grid-cols-2 gap-4 md:gap-5"
    >
      {servicesStats.map((stat, index) => {
        const number = String(index + 1).padStart(2, "0")

        return (
          <motion.div
            key={stat.label}
            variants={tileV}
            className={cn(
              "group/stat relative flex aspect-square flex-col justify-between overflow-hidden rounded-[var(--radius-xl)]",
              "border border-[var(--border)] bg-[var(--card)]",
              "p-5 md:p-6",
              "transition-colors duration-300",
              "hover:border-[var(--brand-border)]"
            )}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              {number}
            </span>

            <div className="flex flex-col gap-2">
              <AnimatedCounter
                value={stat.value}
                duration={1600}
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