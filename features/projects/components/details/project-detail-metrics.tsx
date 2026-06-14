"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Project } from "@/features/marketing/data/projects-page"
import { sectionViewport } from "@/lib/motion"
import {
  sectionContainer,
  itemVariants,
  gridContainer,
} from "../project-variants"
import { ProjectMetricCard } from "../project-metric-card"

export function ProjectDetailMetrics({
  metrics,
}: {
  metrics: NonNullable<Project["metrics"]>
}) {
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
              The
              <br />
              numbers.
            </SectionHeading>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] md:text-right">
              03 / Impact
            </span>
          </motion.div>

          <motion.div
            variants={gridContainer}
            className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:gap-5 lg:grid-cols-4"
          >
            {metrics.map((metric) => (
              <ProjectMetricCard key={metric.label} metric={metric} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}