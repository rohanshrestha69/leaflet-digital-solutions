// features/services/components/services-testimonials.tsx
"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { useState, useCallback, useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { servicesTestimonials } from "@/features/marketing/data/services-page"
import {
  fadeSlideX,
  fadeUp,
  fadeUpScale,
  lineReveal,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const orchestrator = sectionStagger(0.12, 0.04)
const heading = fadeUp(24, 0.6)
const controls = fadeSlideX(12, 0.45)
const cardsGrid = sectionStagger(0.12, 0.15)
const card = fadeUpScale(32, 0.97, 0.6)
const border = lineReveal(0.7, 0)
const quote = fadeUp(10, 0.45, 0.1)
const caption = fadeUp(8, 0.4, 0.18)

const VISIBLE = 3

export function ServicesTestimonials() {
  const [start, setStart] = useState(0)
  const total = servicesTestimonials.length
  const maxStart = Math.max(0, total - VISIBLE)

  const visible = useMemo(() => {
    return servicesTestimonials.slice(start, start + VISIBLE)
  }, [start])

  const prev = useCallback(
    () => setStart((s) => Math.max(0, s - 1)),
    []
  )
  const next = useCallback(
    () => setStart((s) => Math.min(maxStart, s + 1)),
    [maxStart]
  )

  return (
    <section className="relative border-t border-[var(--border)] bg-[var(--background)] py-16 md:py-28">
      <Container wide>
        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.div
            variants={heading}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <h2
              className={cn(
                "font-heading font-extrabold uppercase leading-[1.04] tracking-tight text-[var(--text)]",
                "text-[32px] sm:text-[44px] md:text-[56px]",
                "max-w-[18ch]"
              )}
            >
              They&apos;re satisfied with the results we provide.
            </h2>

            {total > VISIBLE && (
              <motion.div variants={controls} className="flex gap-3">
                <Button
                  variant="outlineDark"
                  size="icon-lg"
                  aria-label="Previous testimonial"
                  onClick={prev}
                  disabled={start === 0}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="outlineDark"
                  size="icon-lg"
                  aria-label="Next testimonial"
                  onClick={next}
                  disabled={start >= maxStart}
                >
                  <ArrowRight />
                </Button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            key={start} /* Re-trigger stagger on slide */
            variants={cardsGrid}
            initial="hidden"
            animate="visible"
            className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10"
          >
            {visible.map((t) => (
              <motion.div key={`${t.name}-${start}`} variants={card}>
                <figure className="transition-colors duration-300 ease-[var(--ease-premium)]">
                  <motion.div
                    variants={border}
                    className="mb-7 h-px w-full origin-left bg-white/[0.08]"
                  />
                  <motion.blockquote
                    variants={quote}
                    className="text-sm leading-7 text-white/58"
                  >
                    {t.quote}
                  </motion.blockquote>
                  <motion.figcaption variants={caption} className="mt-9">
                    <p className="text-base font-medium text-white">{t.name}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">
                      {t.role}, {t.company}
                    </p>
                  </motion.figcaption>
                </figure>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}