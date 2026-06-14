"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import type { Project } from "@/features/marketing/data/projects-page"
import { cn } from "@/lib/utils"
import { sectionContainer, itemVariants } from "../project-variants"

export function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <section className="relative border-b border-[var(--border)] pt-32 md:pt-40">
      <Container wide className="pb-16 md:pb-24">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          animate="show"
        >
          {/* Back link */}
          <motion.div variants={itemVariants} className="mb-10">
            <Link
              href="/work"
              className={cn(
                "group/back inline-flex items-center gap-2",
                "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]",
                "transition-colors duration-300 hover:text-[var(--text)]"
              )}
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
              All projects
            </Link>
          </motion.div>

          {/* 
            Equal-height grid:
            - Mobile: stacked (image on top with aspect ratio, content below)
            - Desktop: side-by-side with matching heights via `items-stretch`
          */}
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-stretch lg:gap-16">
            {/* Media */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]",
                /* Mobile: maintain aspect ratio. Desktop: stretch to column height */
                "aspect-[16/11] lg:aspect-auto lg:min-h-[500px]"
              )}
              style={{ background: project.tone ?? "var(--card)" }}
            >
              <Image
                src={project.image}
                alt={`${project.title} cover`}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
              />
            </motion.div>

            {/* Meta */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-10"
            >
              <div className="flex flex-col gap-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)]">
                  Case study
                </span>

                <h1 className="font-heading text-[40px] font-semibold leading-[1.05] tracking-tight text-[var(--text)] sm:text-[56px] md:text-[64px]">
                  {project.title}
                  <br />
                  <span className="text-[var(--text-muted)]">
                    {project.year}
                  </span>
                </h1>

                {project.about && (
                  <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
                    {project.about}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--border)] pt-6">
                {project.industry && (
                  <MetaItem label="Industry" value={project.industry} />
                )}
                {project.location && (
                  <MetaItem label="Location" value={project.location} />
                )}
                {project.duration && (
                  <MetaItem label="Duration" value={project.duration} />
                )}
                <MetaItem label="Year" value={project.year} />
              </div>

              {/* Live URL */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "w-full gap-2 sm:w-auto"
                  )}
                >
                  Visit live site
                  <ExternalLink className="size-4" />
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {label}
      </p>
      <p className="text-[14px] font-medium text-[var(--text)] md:text-[15px]">
        {value}
      </p>
    </div>
  )
}