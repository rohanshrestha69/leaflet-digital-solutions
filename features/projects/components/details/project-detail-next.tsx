"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import type { Project } from "@/features/marketing/data/projects-page"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionContainer, itemVariants } from "../project-variants"

type Props = {
  next: Project
}

export function ProjectDetailNext({ next }: Props) {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <Link href={`/work/${next.slug}`} className="group/next block">
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
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)]">
                Up next / {next.year}
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12"
            >
              <h2
                className={cn(
                  "font-heading text-[36px] font-semibold leading-[1.05] tracking-tight text-[var(--text)] sm:text-[48px] md:text-[64px]",
                  "transition-colors duration-400 group-hover/next:text-[var(--brand)]"
                )}
              >
                {next.title}
              </h2>

              <div
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-full",
                  "border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)]",
                  "transition-all duration-400 ease-[var(--ease-premium)]",
                  "group-hover/next:-translate-y-1 group-hover/next:translate-x-1",
                  "group-hover/next:border-[var(--brand-border)] group-hover/next:bg-[var(--brand)]/10 group-hover/next:text-[var(--brand)]"
                )}
              >
                <ArrowRight className="size-5" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]"
              style={{ background: next.tone ?? "var(--card)" }}
            >
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src={next.image}
                  alt={next.title}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover",
                    "transition-transform duration-[1200ms] ease-[var(--ease-premium)]",
                    "group-hover/next:scale-[1.03]"
                  )}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
                />
              </div>
            </motion.div>
          </motion.div>
        </Link>
      </Container>
    </section>
  )
}