// features/services/components/services-testimonials.tsx
"use client"

import { useCallback, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { servicesTestimonials } from "@/features/marketing/data/services-page"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ── Variants ─────────────────────────────────────────────────── */

const orchestratorV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const headingV: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.out },
  },
}

const controlsV: Variants = {
  hidden: { opacity: 0, x: 12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease.smooth } },
}

const gridV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardV: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: ease.out },
  },
}

const borderV: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: ease.inOut },
  },
}

const quoteV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth, delay: 0.1 },
  },
}

const captionV: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.smooth, delay: 0.18 },
  },
}

const VISIBLE = 3

export function ServicesTestimonials() {
  const [start, setStart] = useState(0)
  const total    = servicesTestimonials.length
  const maxStart = Math.max(0, total - VISIBLE)

  const visible = useMemo(
    () => servicesTestimonials.slice(start, start + VISIBLE),
    [start]
  )

  const prev = useCallback(() => setStart((s) => Math.max(0, s - 1)), [])
  const next = useCallback(() => setStart((s) => Math.min(maxStart, s + 1)), [maxStart])

  return (
    <section className="relative border-t border-[var(--border)] bg-[var(--background)] py-16 md:py-28">
      <Container wide>
        <motion.div
          variants={orchestratorV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={headingV}
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
              <motion.div variants={controlsV} className="flex gap-3">
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

          <AnimatePresence mode="wait">
            <motion.div
              key={start}
              variants={gridV}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10"
            >
              {visible.map((t) => (
                <motion.div key={`${t.name}-${start}`} variants={cardV}>
                  <figure>
                    <motion.div
                      variants={borderV}
                      className="mb-7 h-px w-full bg-white/[0.08]"
                      style={{ originX: 0 }}
                    />
                    <motion.blockquote
                      variants={quoteV}
                      className="text-sm leading-7 text-white/58"
                    >
                      &ldquo;{t.quote}&rdquo;
                    </motion.blockquote>
                    <motion.figcaption variants={captionV} className="mt-9">
                      <p className="text-base font-medium text-white">{t.name}</p>
                      <p className="mt-2 font-medium text-[12px] uppercase tracking-[0.18em] text-white/38">
                        {t.role}, {t.company}
                      </p>
                    </motion.figcaption>
                  </figure>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  )
}