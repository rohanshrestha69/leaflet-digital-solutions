// features/marketing/components/services-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { serviceOfferings } from "@/features/marketing/data/services-page"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ── Variants ─────────────────────────────────────────────────────── */

const sectionV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const headerV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
}

const listV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const rowV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
}

/* ── Component ────────────────────────────────────────────────────── */

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[var(--background)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={headerV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              We offer several
              <br />
              services for you
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A complete toolkit for modern digital growth — from interface design
              to launch.
            </p>
          </motion.div>

          <motion.ul
            variants={listV}
            className="mt-14 flex flex-col border-t border-[var(--border)] md:mt-20"
          >
            {serviceOfferings.map((service) => (
              <ServiceRow
                key={service.slug}
                number={service.number}
                title={service.title}
                href={`/services/${service.slug}`}
              />
            ))}
          </motion.ul>

          <motion.div
            variants={headerV}
            className="mt-14 flex justify-center md:mt-16"
          >
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outlineDark", size: "lg" }), "gap-2")}
            >
              All services
              <ArrowUpRight className="size-4" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* ── Service row ──────────────────────────────────────────────────── */

function ServiceRow({
  number,
  title,
  href,
}: {
  number: string
  title:  string
  href:   string
}) {
  return (
    <motion.li variants={rowV}>
      <Link
        href={href}
        className={cn(
          "group relative flex items-center justify-between gap-6",
          "border-b border-[var(--border)] py-7 md:py-9",
          "transition-colors duration-300 ease-[var(--ease-premium)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)]/40",
        )}
      >
        {/* Hover underline — scaleX from left */}
        <motion.span
          className="pointer-events-none absolute bottom-[-1px] left-0 h-px bg-[var(--brand)] origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: ease.inOut }}
        />

        <span className="font-medium text-[12px] tabular-nums tracking-[0.18em] text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--brand)] md:text-[13px]">
          {number}
        </span>

        <h3 className={cn(
          "absolute left-1/2 -translate-x-1/2 text-center",
          "font-heading font-semibold tracking-tight text-[var(--text)]",
          "text-[22px] md:text-[34px] lg:text-[40px]",
          "transition-colors duration-300 group-hover:text-[var(--brand)]",
        )}>
          {title}
        </h3>

        <motion.span
          aria-hidden
          className="inline-flex items-center justify-center text-[var(--text-muted)]"
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.25, ease: ease.smooth }}
        >
          <ArrowUpRight className="size-5 transition-colors duration-300 group-hover:text-[var(--brand)] md:size-6" />
        </motion.span>
      </Link>
    </motion.li>
  )
}