"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { InfiniteLogoStrip } from "@/components/animations/infinite-logo-strip"
import { servicesPartners } from "@/features/marketing/data/services-page"
import { sectionViewport } from "@/lib/motion"
import { sectionContainer, itemVariants } from "./details/service-variants"

export function ServicesPartners() {
  return (
    <section className="relative border-b border-[var(--border)] py-16 md:py-20">
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
      >
        <Container wide>
          <motion.p
            variants={itemVariants}
            className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[11px]"
          >
            Trusted by teams shipping at scale
          </motion.p>
        </Container>

        <motion.div variants={itemVariants} className="mt-10">
          <InfiniteLogoStrip
            logos={servicesPartners}
            size="md"
            duration={35}
            pauseOnHover
          />
        </motion.div>
      </motion.div>
    </section>
  )
}