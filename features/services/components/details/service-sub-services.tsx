"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { SubService } from "@/features/marketing/data/services-page"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import {
  sectionContainer,
  itemVariants,
  gridContainer,
  tileVariants,
} from "./service-variants"

type Props = {
  title: string
  subtitle: string
  subServices: SubService[]
}

export function ServiceSubServices({ title, subtitle, subServices }: Props) {
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
            <SectionHeading>{title}</SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={gridContainer}
            className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-3"
          >
            {subServices.map((s) => (
              <motion.article
                key={s.number}
                variants={tileVariants}
                className={cn(
                  "group flex aspect-square flex-col justify-between overflow-hidden rounded-[var(--radius-xl)]",
                  "border border-[var(--border)] bg-[var(--card)]/40 p-6 md:p-7",
                  "transition-colors duration-300 ease-[var(--ease-premium)]",
                  "hover:border-[var(--border-strong)]"
                )}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  {s.number}
                </span>
                <div>
                  <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] md:text-[26px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
                    {s.description}
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