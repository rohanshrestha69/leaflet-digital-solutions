// features/projects/components/details/project-detail-process.tsx
"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Project } from "@/features/marketing/data/projects-page"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import {
  sectionV,
  itemBlurV,
  gridV,
  tileV,
} from "../project-variants"

export function ProjectDetailProcess({
  process,
}: {
  process: NonNullable<Project["process"]>
}) {
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
              How it
              <br />
              works.
            </SectionHeading>
            <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)] md:text-right">
              04 / Process
            </span>
          </motion.div>

          <motion.div
            variants={gridV}
            className="mt-14 grid gap-4 md:mt-20 md:gap-5"
          >
            {process.map((step, i) => (
              <motion.article
                key={step.title}
                variants={tileV}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: ease.smooth }}
                className={cn(
                  "group flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-6 md:flex-row md:items-start md:gap-8 md:p-8",
                  "transition-[border-color] duration-300 ease-[var(--ease-premium)]",
                  "hover:border-[var(--border-strong)]"
                )}
              >
                <div className="flex items-center gap-4 md:w-48 md:shrink-0">
                  <motion.span
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 font-medium text-[12px] font-semibold text-[var(--brand)]"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3, ease: ease.spring }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <h3 className="font-heading text-[17px] font-semibold tracking-tight text-[var(--text)] md:hidden">
                    {step.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-2 md:flex-1">
                  <h3 className="hidden font-heading text-[18px] font-semibold tracking-tight text-[var(--text)] md:block">
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}