// features/services/components/services-offerings.tsx
"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { serviceOfferings } from "@/features/marketing/data/services-page"
import { viewport } from "@/lib/motion"
import { sectionV, itemBlurV, gridV } from "./details/service-variants"
import { ServiceTile } from "./service-tile"

export function ServicesOfferings() {
  return (
    <section
      id="offerings"
      className="relative scroll-mt-24 border-b border-[var(--border)] py-20 md:py-28"
    >
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
              Our core
              <br />
              creative offerings.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A complete toolkit covering brand, product, marketing, and
              engineering — delivered by one tightly-aligned team.
            </p>
          </motion.div>

          <motion.div
            variants={gridV}
            className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4"
          >
            {serviceOfferings.map((service) => (
              <ServiceTile key={service.slug} service={service} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}