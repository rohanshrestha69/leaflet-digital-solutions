// features/projects/components/project-section-shell.tsx
"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "motion/react"

import { Container } from "@/components/shared/container"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

const headerV: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.out },
  },
}

const childV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out, delay: 0.1 },
  },
}

type ProjectSectionShellProps = {
  eyebrow?:  string
  title:     string
  children:  ReactNode
  className?: string
  divider?:  boolean
}

export function ProjectSectionShell({
  eyebrow,
  title,
  children,
  className,
  divider = true,
}: ProjectSectionShellProps) {
  return (
    <section
      className={cn(
        "relative bg-[var(--background)] py-20 md:py-28",
        divider && "border-t border-[var(--border)]",
        className
      )}
    >
      <Container wide>
        <div className="flex flex-col gap-12 md:gap-16">
          <motion.div
            variants={headerV}
            initial="hidden"
            whileInView="show"
            viewport={viewport.section}
            className="flex flex-col gap-3"
          >
            {eyebrow && (
              <span className="font-medium text-[12px] uppercase tracking-[0.24em] text-[var(--text-subtle)]">
                {eyebrow}
              </span>
            )}
            <h2 className="max-w-3xl font-heading text-[32px] font-extrabold uppercase leading-[1.04] tracking-tight text-[var(--text)] sm:text-[44px] md:text-[56px]">
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={childV}
            initial="hidden"
            whileInView="show"
            viewport={viewport.section}
          >
            {children}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}