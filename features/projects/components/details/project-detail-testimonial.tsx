// features/projects/components/details/project-detail-testimonial.tsx
"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { viewport } from "@/lib/motion"
import { sectionV, itemV } from "../project-variants"

type Props = {
  quote: string
  author?: string
}

export function ProjectDetailTestimonial({ quote, author }: Props) {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={itemV}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-3.5 py-1.5 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-[var(--brand)]" />
            Client testimonial
          </motion.span>

          <motion.blockquote
            variants={itemV}
            className="mt-8 font-heading text-[26px] font-semibold leading-[1.3] tracking-tight text-[var(--text)] md:text-[40px] md:leading-[1.25]"
          >
            <span className="text-[var(--brand)]">&ldquo;</span>
            {quote}
            <span className="text-[var(--brand)]">&rdquo;</span>
          </motion.blockquote>

          {author && (
            <motion.cite
              variants={itemV}
              className="mt-8 block font-medium text-[11px] uppercase not-italic tracking-[0.22em] text-[var(--text-muted)]"
            >
              — {author}
            </motion.cite>
          )}
        </motion.div>
      </Container>
    </section>
  )
}