"use client"

import Link from "next/link"
import { ArrowUpRight, Check, X } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { comparisonRows } from "@/features/marketing/data/comparison"
import { premiumEase, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

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

const tableVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase, delay: 0.15 },
  },
}

const rowsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.25 },
  },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: premiumEase },
  },
}

const footerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const footerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEase },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function WhyUsSection() {
  return (
    <section
      id="why-us"
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
              Why businesses choose
              <br />
              Leaflet over agencies
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              We&apos;re not just remote. We&apos;re remotely better — built for
              speed, clarity, and outcomes.
            </p>
          </motion.div>

          {/* Desktop table */}
          <motion.div
            variants={tableVariants}
            className="mt-14 hidden overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] lg:block"
          >
            {/* Header row */}
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--card)]/40 px-8 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Feature
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Traditional Agency
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Freelancers
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)]">
                Leaflet
              </span>
            </div>

            {/* Body */}
            <motion.div variants={rowsContainer}>
              {comparisonRows.map((r) => (
                <motion.div
                  key={r.feature}
                  variants={rowVariants}
                  className={cn(
                    "grid grid-cols-4 items-center gap-4 px-8 py-6 text-[14px]",
                    "border-b border-[var(--border)] last:border-b-0",
                    "transition-colors duration-300 ease-[var(--ease-premium)]",
                    "hover:bg-[var(--card)]/30"
                  )}
                >
                  <span className="font-medium text-[var(--text)]">
                    {r.feature}
                  </span>
                  <Negative>{r.agency}</Negative>
                  <Negative>{r.freelancers}</Negative>
                  <Positive>{r.leaflet}</Positive>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile cards */}
          <motion.div
            variants={rowsContainer}
            className="mt-10 grid gap-4 lg:hidden"
          >
            {comparisonRows.map((r) => (
              <motion.div
                key={r.feature}
                variants={rowVariants}
                className={cn(
                  "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-5",
                  "transition-colors duration-300",
                  "hover:border-[var(--border-strong)]"
                )}
              >
                <h3 className="font-heading text-[18px] font-semibold text-[var(--text)]">
                  {r.feature}
                </h3>
                <div className="mt-4 flex flex-col gap-3 text-[13px]">
                  <ComparisonLine label="Agency" negative>
                    {r.agency}
                  </ComparisonLine>
                  <ComparisonLine label="Freelancers" negative>
                    {r.freelancers}
                  </ComparisonLine>
                  <ComparisonLine label="Leaflet">{r.leaflet}</ComparisonLine>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer block */}
          <motion.div
            variants={footerVariants}
            className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-2 lg:items-center lg:gap-16"
          >
            <motion.div variants={footerItemVariants}>
              <h3 className="max-w-[440px] font-heading text-[28px] font-semibold leading-tight tracking-tight text-[var(--text)] md:text-[36px]">
                What remote-first really means
              </h3>
              <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
                Without the physical constraints of an office, we access talent
                traditional agencies can&apos;t reach. We work in your timezone,
                follow your rhythm, and keep you in the loop with modern async
                tools.
              </p>
            </motion.div>

            <motion.div
              variants={footerItemVariants}
              className={cn(
                "flex flex-col gap-8 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-8 md:p-10",
                "transition-colors duration-300",
                "hover:border-[var(--border-strong)]"
              )}
            >
              <blockquote className="font-heading text-[20px] font-medium leading-snug text-[var(--text)] md:text-[24px]">
                &ldquo;Enterprise-grade results with the speed and cost-efficiency
                of a lean, modern team.&rdquo;
              </blockquote>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "orange", size: "lg" }),
                  "w-fit gap-2"
                )}
              >
                See how we work
                <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Helper components                             */
/* -------------------------------------------------------------------------- */

function Negative({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-[var(--text-muted)]">
      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02]">
        <X className="size-3 text-red-400/80" strokeWidth={2.5} />
      </span>
      <span className="leading-snug">{children}</span>
    </span>
  )
}

function Positive({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-[var(--text)]">
      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10">
        <Check className="size-3 text-[var(--brand)]" strokeWidth={2.5} />
      </span>
      <span className="leading-snug">{children}</span>
    </span>
  )
}

function ComparisonLine({
  label,
  children,
  negative = false,
}: {
  label: string
  children: React.ReactNode
  negative?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "inline-flex size-5 shrink-0 items-center justify-center rounded-full",
          negative
            ? "border border-white/[0.06] bg-white/[0.02]"
            : "border border-[var(--brand-border)] bg-[var(--brand)]/10"
        )}
      >
        {negative ? (
          <X className="size-3 text-red-400/80" strokeWidth={2.5} />
        ) : (
          <Check className="size-3 text-[var(--brand)]" strokeWidth={2.5} />
        )}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          {label}
        </span>
        <span
          className={cn(
            "leading-snug",
            negative ? "text-[var(--text-muted)]" : "text-[var(--text)]"
          )}
        >
          {children}
        </span>
      </div>
    </div>
  )
}