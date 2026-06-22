// features/marketing/components/testimonials-section.tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/features/marketing/data/testimonials";
import { ease, viewport } from "@/lib/motion";
import { SectionLabel } from "@/components/shared/section-label";

/* ── Variants ─────────────────────────────────────────────────────── */

const orchestratorV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const headingV: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
};

const controlsV: Variants = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

const cardsV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: ease.out },
  },
};

const borderV: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.75, ease: ease.inOut } },
};

const quoteV: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth, delay: 0.1 },
  },
};

const captionV: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.smooth, delay: 0.18 },
  },
};

/* ── Component ────────────────────────────────────────────────────── */

export function TestimonialsSection() {
  return (
    <section className="relative bg-[var(--background)] py-16 md:py-28">
      <Container wide>
        <SectionLabel variant="line" className="mb-8 md:mb-10">
          Testimonials
        </SectionLabel>
        <motion.div
          variants={orchestratorV}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.section}
        >
          {/* Header */}
          <motion.div
            variants={headingV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              They are satisfied with
              <br />
              the results we provide
            </SectionHeading>

            <motion.div variants={controlsV} className="flex gap-3">
              <Button
                variant="outlineDark"
                size="icon-lg"
                aria-label="Previous testimonial"
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="outlineDark"
                size="icon-lg"
                aria-label="Next testimonial"
              >
                <ArrowRight />
              </Button>
            </motion.div>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={cardsV}
            className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={cardV}>
                <figure>
                  {/* Animated border */}
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
                      {t.role}
                    </p>
                  </motion.figcaption>
                </figure>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
