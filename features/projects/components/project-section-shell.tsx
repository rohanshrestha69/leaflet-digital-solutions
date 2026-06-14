// features/projects/components/project-section-shell.tsx
"use client"

import { motion } from "motion/react"
import { Container } from "@/components/shared/container"
import { cn } from "@/lib/utils"
import { fadeUpBlur, fadeUp, sectionViewport } from "@/lib/motion"
import type { ReactNode } from "react"

type ProjectSectionShellProps = {
  eyebrow?: string
  title: string
  children: ReactNode
  className?: string
  divider?: boolean
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
            variants={fadeUpBlur(24, 4, 0.7)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="flex flex-col gap-3"
          >
            {eyebrow && (
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-subtle)]">
                {eyebrow}
              </span>
            )}
            <h2 className="max-w-3xl font-heading text-[32px] font-extrabold uppercase leading-[1.04] tracking-tight text-[var(--text)] sm:text-[44px] md:text-[56px]">
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp(16, 0.6, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            {children}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}