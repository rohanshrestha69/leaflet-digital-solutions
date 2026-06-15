// features/about/components/about-story.tsx
"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { viewport, ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemBlurV, gridV, tileV } from "./about-variants"
import { storyCards } from "@/features/marketing/data/about-data"

export function AboutStory() {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={itemBlurV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              A short story,
              <br />
              told in three acts.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              How a small group of practitioners turned a frustration with
              traditional agencies into a global studio model.
            </p>
          </motion.div>

          <motion.div
            variants={gridV}
            className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6"
          >
            {storyCards.map((card) => {
              const Icon = card.icon

              return (
                <motion.article
                  key={card.title}
                  variants={tileV}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: ease.smooth }}
                  className={cn(
                    "group relative flex flex-col overflow-hidden",
                    "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
                    "p-7 md:p-8",
                    "transition-[border-color] duration-300 ease-[var(--ease-premium)]",
                    "hover:border-[var(--border-strong)]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                      {card.number}
                    </span>

                    <motion.span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-full",
                        "border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
                      )}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ duration: 0.35, ease: ease.spring }}
                    >
                      <Icon className="size-4" strokeWidth={2} />
                    </motion.span>
                  </div>

                  <div className="mt-12 md:mt-16">
                    <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] md:text-[26px]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                      {card.description}
                    </p>
                  </div>

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