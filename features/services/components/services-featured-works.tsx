// features/services/components/services-featured-works.tsx
"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { viewport } from "@/lib/motion"
import { sectionV, itemV, itemBlurV } from "./details/service-variants"
import { FeaturedProjectsCarousel } from "./featured-projects-carousel"

export function ServicesFeaturedWorks() {
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
              Recent featured
              <br />
              projects.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A snapshot of the work — each one tailored to drive clarity,
              conversion, and lasting brand impact.
            </p>
          </motion.div>

          <motion.div variants={itemV} className="mt-14 md:mt-20">
            <FeaturedProjectsCarousel />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}