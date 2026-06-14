"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { sectionViewport } from "@/lib/motion"
import { sectionContainer, itemVariants } from "../project-variants"

export function ProjectDetailTakeaways({ text }: { text: string }) {
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
              Key
              <br />
              takeaways.
            </SectionHeading>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] md:text-right">
              05 / Reflection
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-14 md:mt-20">
            <p className="max-w-3xl text-[18px] leading-relaxed text-[var(--text-muted)] md:text-[22px] md:leading-[1.65]">
              {text}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}