// features/marketing/components/projects-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { ProjectCard } from "@/features/projects/components/project-card"
import { getFeaturedProjects } from "@/features/marketing/data/projects-page"
import {
  fadeUp,
  fadeUpScale,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Motion                                                              */
/* ------------------------------------------------------------------ */

const orchestrator = sectionStagger(0.12, 0.04)
const header = fadeUp(24, 0.6)
const grid = sectionStagger(0.1, 0.08)
const card = fadeUpScale(28, 0.97, 0.6)

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

export function ProjectsSection() {
  const featured = getFeaturedProjects(4)

  return (
    <section
      id="work"
      className="relative bg-[var(--background)] py-16 md:py-28"
    >
      {/* <motion.div
        variants={labelV}
        initial="hidden"
        whileInView="visible"
        viewport={labelViewport}
      >
        <SectionLabel>Selected work</SectionLabel>
      </motion.div> */}

      <Container wide>
        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          {/* Header */}
          <motion.div
            variants={header}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Projects we&apos;ve
              <br />
              shipped recently
            </SectionHeading>

            <Link
              href="/work"
              className={cn(
                buttonVariants({ variant: "outlineDark" }),
                "self-start md:self-auto"
              )}
            >
              View all projects
              <ArrowUpRight />
            </Link>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={grid}
            className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-y-20"
          >
            {featured.map((project, i) => (
              <motion.div key={project.id} variants={card}>
                <ProjectCard
                  project={project}
                  index={i}
                  priority={i < 2}
                  size="compact"
                  disableAnimation
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Footer note */}
          <motion.div
            variants={header}
            className="mt-14 flex flex-col items-center justify-center gap-4 pt-6 md:mt-20 md:flex-row md:items-center"
          >
          <Link href="/work" className={buttonVariants({ variant: "outlineDark" })}>
            Explore Our More Projects
            <ArrowUpRight />
          </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}