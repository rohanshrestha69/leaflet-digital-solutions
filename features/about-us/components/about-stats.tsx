// features/about/components/about-stats.tsx
"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { viewport, ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemBlurV, gridV, tileV, lineV } from "./about-variants"
import { aboutStats } from "@/features/marketing/data/about-data"

export function AboutStats() {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={itemBlurV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              By the
              <br />
              numbers.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              Eight years of compounding craft, measured in outcomes — not just
              output.
            </p>
          </motion.div>

          <motion.div
            variants={gridV}
            className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4"
          >
            {aboutStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={tileV}
                whileHover={{ y: -3, borderColor: "rgba(248,130,33,0.25)" }}
                transition={{ duration: 0.25, ease: ease.smooth }}
                className={cn(
                  "group flex aspect-square flex-col justify-between overflow-hidden",
                  "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
                  "p-6 md:p-7",
                  "transition-[border-color] duration-300 ease-[var(--ease-premium)]"
                )}
              >
                <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>

                  <AnimatedCounter
                    value={stat.value}
                    duration={1800}
                    className="font-heading text-[40px] font-extrabold tracking-tight text-[var(--brand)] md:text-[56px]"
                  />

                  <h3 className="mt-3 font-heading text-[16px] font-semibold tracking-tight text-[var(--text)]">
                    {stat.label}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}