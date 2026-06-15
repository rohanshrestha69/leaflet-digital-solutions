// features/marketing/components/about-story-section.tsx
"use client"

import { Beaker, Rocket, Zap, type LucideIcon } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { storyCards } from "@/features/marketing/data/story"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

const icons: Record<string, LucideIcon> = {
  spark:      Zap,
  experiment: Beaker,
  evolution:  Rocket,
}

/* ── Variants ─────────────────────────────────────────────────────── */

const sectionV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const headerV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
}

const cardsV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}

const cardV: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: ease.out } },
}

/* ── Component ────────────────────────────────────────────────────── */

export function AboutStorySection() {
  return (
    <section id="about" className="relative bg-[var(--background)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          {/* Header */}
          <motion.div
            variants={headerV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Built remote.
              <br />
              Built for growth.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A modern studio model — engineered for clarity, speed, and the kind
              of work that compounds long after launch.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={cardsV}
            className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6"
          >
            {storyCards.map((card, i) => {
              const Icon   = icons[card.icon]!
              const number = String(i + 1).padStart(2, "0")

              return (
                <motion.article
                  key={card.title}
                  variants={cardV}
                  className={cn(
                    "group relative flex flex-col overflow-hidden",
                    "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
                    "p-7 md:p-8",
                    "transition-[border-color,background-color] duration-300 ease-[var(--ease-premium)]",
                    "hover:border-[var(--border-strong)]",
                  )}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25, ease: ease.smooth }}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                      {number}
                    </span>

                    <motion.span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-full",
                        "border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]",
                      )}
                      whileHover={{ scale: 1.12, rotate: 8 }}
                      transition={{ duration: 0.35, ease: ease.spring }}
                    >
                      <Icon className="size-4" strokeWidth={2} />
                    </motion.span>
                  </div>

                  {/* Body */}
                  <div className="mt-12 md:mt-16">
                    <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] md:text-[26px]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                      {card.description}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.09),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </motion.article>
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}