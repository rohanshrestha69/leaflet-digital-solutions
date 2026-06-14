"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Project } from "@/features/marketing/data/projects-page"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionContainer, itemVariants } from "../project-variants"

export function ProjectDetailChallenges({ project }: { project: Project }) {
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
              Challenges
              <br />
              & solutions.
            </SectionHeading>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)] md:text-right">
              02 / Approach
            </span>
          </motion.div>

          <div className="mt-14 flex flex-col gap-12 md:mt-20 md:gap-14">
            {project.challenge && (
              <Block label="The problem" body={project.challenge} />
            )}
            {project.solution && (
              <Block label="Our solution" body={project.solution} accent />
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function Block({
  label,
  body,
  accent = false,
}: {
  label: string
  body: string
  accent?: boolean
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-12"
    >
      <p
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.22em]",
          accent ? "text-[var(--brand)]" : "text-[var(--text-subtle)]"
        )}
      >
        {label}
      </p>
      <p className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px] md:leading-[1.7]">
        {body}
      </p>
    </motion.div>
  )
}