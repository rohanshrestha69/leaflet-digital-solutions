"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Project } from "@/features/marketing/data/projects-page"
import { sectionViewport } from "@/lib/motion"
import { sectionContainer, itemVariants } from "../project-variants"

export function ProjectDetailAbout({ project }: { project: Project }) {
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
              About the
              <br />
              project.
            </SectionHeading>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] md:text-right">
              01 / Overview
            </span>
          </motion.div>

          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <motion.div variants={itemVariants} className="flex flex-col gap-8">
              {project.services && project.services.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    Services
                  </p>
                  <ul className="flex flex-col gap-2">
                    {project.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-3 text-[15px] text-[var(--text)] md:text-[16px]"
                      >
                        <span className="size-1 rounded-full bg-[var(--brand)]" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.client && (
                <div className="flex flex-col gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    Client
                  </p>
                  <p className="text-[15px] text-[var(--text)] md:text-[16px]">
                    {project.client}
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[20px] md:leading-[1.65]">
                {project.about}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}