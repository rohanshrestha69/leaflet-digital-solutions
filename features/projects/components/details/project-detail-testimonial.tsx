"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { sectionViewport } from "@/lib/motion"
import { sectionContainer, itemVariants } from "../project-variants"

type Props = {
  quote: string
  author?: string
}

export function ProjectDetailTestimonial({ quote, author }: Props) {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur-sm"
          >
            Client testimonial
          </motion.span>

          <motion.blockquote
            variants={itemVariants}
            className="mt-8 font-heading text-[26px] font-semibold leading-[1.3] tracking-tight text-[var(--text)] md:text-[40px] md:leading-[1.25]"
          >
            <span className="text-[var(--brand)]">&ldquo;</span>
            {quote}
            <span className="text-[var(--brand)]">&rdquo;</span>
          </motion.blockquote>

          {author && (
            <motion.cite
              variants={itemVariants}
              className="mt-8 block font-mono text-[11px] uppercase not-italic tracking-[0.22em] text-[var(--text-muted)]"
            >
              — {author}
            </motion.cite>
          )}
        </motion.div>
      </Container>
    </section>
  )
}