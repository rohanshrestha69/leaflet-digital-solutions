"use client"

import { Beaker, Rocket, Zap, type LucideIcon } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { storyCards } from "@/features/marketing/data/story"
import { premiumEase, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const icons: Record<string, LucideIcon> = {
  spark: Zap,
  experiment: Beaker,
  evolution: Rocket,
}

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

const cardsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEase },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function AboutStorySection() {
  return (
    <section
      id="about"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          {/* Header */}
          <motion.div
            variants={headerVariants}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Built remote.
              <br />
              Built for growth.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A modern studio model — engineered for clarity, speed, and the
              kind of work that compounds long after launch.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={cardsContainer}
            className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6"
          >
            {storyCards.map((card, index) => {
              const Icon = icons[card.icon]
              const number = String(index + 1).padStart(2, "0")

              return (
                <motion.article
                  key={card.title}
                  variants={cardVariants}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)]",
                    "border border-[var(--border)] bg-[var(--card)]/40",
                    "p-7 md:p-8",
                    "transition-colors duration-300 ease-[var(--ease-premium)]",
                    "hover:border-[var(--border-strong)]"
                  )}
                >
                  {/* Top row: number + icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                      {number}
                    </span>

                    <span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-full",
                        "border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]",
                        "transition-transform duration-500 ease-[var(--ease-premium)]",
                        "group-hover:scale-110"
                      )}
                    >
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="mt-12 md:mt-16">
                    <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] md:text-[26px]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                      {card.description}
                    </p>
                  </div>

                  {/* Subtle hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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