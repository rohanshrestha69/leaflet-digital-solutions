"use client"

import { Plus } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ServiceStep } from "@/features/marketing/data/services-page"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import {
  sectionContainer,
  itemVariants,
  gridContainer,
  tileVariants,
} from "./service-variants"

export function ServiceProcess({ steps }: { steps: ServiceStep[] }) {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              How we build,
              <br />
              step by step.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A proven process that turns ambitious visions into measurable digital outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={gridContainer}
            className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4"
          >
            {steps.map((s) => (
              <motion.article
                key={s.number}
                variants={tileVariants}
                className={cn(
                  "group flex flex-col gap-4 rounded-[var(--radius-xl)]",
                  "border border-[var(--border)] bg-[var(--card)]/40 p-6 md:p-7",
                  "transition-colors duration-300 ease-[var(--ease-premium)]",
                  "hover:border-[var(--border-strong)]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)]">
                    Step {s.number}
                  </span>
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)] transition-transform duration-300 group-hover:rotate-45">
                    <Plus className="size-3.5" strokeWidth={2.5} />
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-[20px] font-semibold tracking-tight text-[var(--text)] md:text-[22px]">
                  {s.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">
                  {s.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}