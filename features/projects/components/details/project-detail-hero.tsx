// features/projects/components/details/project-detail-hero.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SplitWords } from "@/components/animations/text-reveal"
import { ImageReveal } from "@/components/animations/image-reveal"
import type { Project } from "@/features/marketing/data/projects-page"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

const containerV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const itemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
}

const backV: Variants = {
  hidden: { opacity: 0, x: -8 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease.out } },
}

const metaV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.6 } },
}

const metaItemV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.smooth } },
}

export function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <section className="relative border-b border-[var(--border)] pt-32 md:pt-40">
      <Container wide className="pb-16 md:pb-24">
        <motion.div variants={containerV} initial="hidden" animate="show">
          {/* Back link */}
          <motion.div variants={backV} className="mb-10">
            <Link
              href="/work"
              className={cn(
                "group/back inline-flex items-center gap-2",
                "font-medium text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]",
                "transition-colors duration-300 hover:text-[var(--text)]"
              )}
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover/back:-translate-x-1" />
              All projects
            </Link>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-stretch lg:gap-16">
            {/* Media */}
            <motion.div
              variants={itemV}
              className="aspect-[16/11] lg:aspect-auto lg:min-h-[500px]"
            >
              <ImageReveal
                className={cn(
                  "relative h-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]"
                )}
                direction="up"
                curtainColor="var(--background)"
              >
                <div
                  className="absolute inset-0"
                  style={{ background: project.tone ?? "var(--card)" }}
                />
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
              </ImageReveal>
            </motion.div>

            {/* Meta */}
            <motion.div
              variants={itemV}
              className="flex flex-col justify-between gap-10"
            >
              <div className="flex flex-col gap-5">
                <motion.span
                  variants={itemV}
                  className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]"
                >
                  Case study
                </motion.span>

                <SplitWords
                  text={project.title}
                  as="h1"
                  className="font-heading text-[36px] font-semibold leading-[1.05] tracking-tight text-[var(--text)] sm:text-[48px] md:text-[56px]"
                  delay={0.1}
                  stagger={0.04}
                />

                <motion.span
                  variants={itemV}
                  className="block font-heading text-[36px] font-semibold leading-[1.05] tracking-tight text-[var(--text-muted)] sm:text-[48px] md:text-[56px]"
                >
                  {project.year}
                </motion.span>

                {project.about && (
                  <motion.p
                    variants={itemV}
                    className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]"
                  >
                    {project.about}
                  </motion.p>
                )}
              </div>

              {/* Tags */}
              <motion.div
                variants={metaV}
                className="flex flex-wrap items-center gap-2"
              >
                {project.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={metaItemV}
                    className="rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-3 py-1.5 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Meta grid */}
              <motion.div
                variants={metaV}
                className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--border)] pt-6"
              >
                {project.industry && <MetaItem label="Industry" value={project.industry} />}
                {project.location && <MetaItem label="Location" value={project.location} />}
                {project.duration && <MetaItem label="Duration" value={project.duration} />}
                <MetaItem label="Year" value={project.year} />
              </motion.div>

              {/* Live URL */}
              {project.liveUrl && (
                <motion.div variants={itemV}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "orange", size: "lg" }),
                      "group w-full gap-2 sm:w-auto"
                    )}
                  >
                    Visit live site
                    <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.smooth } },
      }}
      className="flex flex-col gap-1.5"
    >
      <p className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {label}
      </p>
      <p className="text-[14px] font-medium text-[var(--text)] md:text-[15px]">
        {value}
      </p>
    </motion.div>
  )
}