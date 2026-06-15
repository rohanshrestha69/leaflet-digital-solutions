"use client"

import { useCallback, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { premiumEase, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string
  name: string
  role: string
  /** Optional company — appended to role if provided */
  company?: string
}

type TestimonialsSectionProps = {
  /** Section heading — JSX for line breaks or accent text */
  heading: React.ReactNode
  /** Optional supporting copy under the heading on mobile / beside on desktop */
  description?: string
  /** Testimonials to display */
  testimonials: Testimonial[]
  /** Number of cards visible at once (defaults to 3) */
  itemsPerView?: 1 | 2 | 3
  /** Show prev/next pagination controls */
  withControls?: boolean
  /** Section anchor id */
  id?: string
  /** Remove bottom border (when last section before footer) */
  noBorder?: boolean
  className?: string
}

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEase },
  },
}

const borderVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: premiumEase },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function TestimonialsSection({
  heading,
  description,
  testimonials,
  itemsPerView = 3,
  withControls = true,
  id,
  noBorder = false,
  className,
}: TestimonialsSectionProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(testimonials.length / itemsPerView))

  const visible = testimonials.slice(
    page * itemsPerView,
    page * itemsPerView + itemsPerView
  )

  const canPrev = page > 0
  const canNext = page < totalPages - 1

  const handlePrev = useCallback(() => {
    setPage((p) => Math.max(0, p - 1))
  }, [])

  const handleNext = useCallback(() => {
    setPage((p) => Math.min(totalPages - 1, p + 1))
  }, [totalPages])

  const gridCols =
    itemsPerView === 1
      ? "md:grid-cols-1"
      : itemsPerView === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3"

  const showControls = withControls && totalPages > 1

  return (
    <section
      id={id}
      className={cn(
        "relative bg-[var(--background)] py-20 md:py-28",
        !noBorder && "border-b border-[var(--border)]",
        className
      )}
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
            <SectionHeading>{heading}</SectionHeading>

            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:gap-8">
              {description && (
                <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
                  {description}
                </p>
              )}

              {showControls && (
                <div className="flex shrink-0 gap-3">
                  <Button
                    variant="outlineDark"
                    size="icon-lg"
                    aria-label="Previous testimonial"
                    onClick={handlePrev}
                    disabled={!canPrev}
                  >
                    <ArrowLeft />
                  </Button>
                  <Button
                    variant="outlineDark"
                    size="icon-lg"
                    aria-label="Next testimonial"
                    onClick={handleNext}
                    disabled={!canNext}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Testimonial cards */}
          <motion.div
            key={page}
            variants={cardsContainer}
            initial="hidden"
            animate="show"
            className={cn("mt-14 grid gap-8 md:mt-16 md:gap-10", gridCols)}
          >
            {visible.map((t) => (
              <TestimonialCard key={`${t.name}-${t.company ?? ""}`} testimonial={t} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Testimonial card                              */
/* -------------------------------------------------------------------------- */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, role, company } = testimonial
  const subline = company ? `${role}, ${company}` : role

  return (
    <motion.figure
      variants={cardVariants}
      className="flex flex-col"
    >
      {/* Top divider */}
      <motion.div
        variants={borderVariants}
        className="mb-7 h-px w-full origin-left bg-[var(--border)]"
      />

      {/* Quote */}
      <blockquote className="text-[14px] leading-7 text-[var(--text-muted)] md:text-[15px]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Caption */}
      <figcaption className="mt-9">
        <p className="text-[15px] font-medium text-[var(--text)]">{name}</p>
        <p className="mt-2 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          {subline}
        </p>
      </figcaption>
    </motion.figure>
  )
}