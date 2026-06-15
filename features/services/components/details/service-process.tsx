// features/services/components/details/service-process.tsx
"use client"

import { Plus } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ServiceStep } from "@/features/marketing/data/services-page"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemBlurV, gridV, tileV } from "./service-variants"

export function ServiceProcess({ steps }: { steps: ServiceStep[] }) {
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
              How we build,
              <br />
              step by step.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A proven process that turns ambitious visions into measurable
              digital outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={gridV}
            className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4"
          >
            {steps.map((s) => (
              <motion.article
                key={s.number}
                variants={tileV}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: ease.smooth }}
                className={cn(
                  "group flex flex-col gap-4 rounded-[var(--radius-xl)]",
                  "border border-[var(--border)] bg-[var(--card)]/40 p-6 md:p-7",
                  "transition-[border-color] duration-300 ease-[var(--ease-premium)]",
                  "hover:border-[var(--border-strong)]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]">
                    Step {s.number}
                  </span>
                  <motion.span
                    className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: ease.spring }}
                  >
                    <Plus className="size-3.5" strokeWidth={2.5} />
                  </motion.span>
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