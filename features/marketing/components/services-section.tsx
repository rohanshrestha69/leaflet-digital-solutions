"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { serviceOfferings } from "@/features/marketing/data/services-page"
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

const listContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
}

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEase, delay: 0.2 },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function ServicesSection() {
  return (
    <section
      id="services"
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
              We offer several
              <br />
              services for you
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A complete toolkit for modern digital growth — from interface
              design to launch.
            </p>
          </motion.div>

          {/* Services list */}
          <motion.ul
            variants={listContainer}
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

          {/* CTA */}
          <motion.div
            variants={ctaVariants}
            className="mt-14 flex justify-center md:mt-16"
          >
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "outlineDark", size: "lg" }),
                "gap-2"
              )}
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

/* -------------------------------------------------------------------------- */
/*                                 Service Row                                */
/* -------------------------------------------------------------------------- */

type ServiceRowProps = {
  number: string
  title: string
  href: string
}

function ServiceRow({ number, title, href }: ServiceRowProps) {
  return (
    <motion.li variants={rowVariants}>
      <Link
        href={href}
        className={cn(
          "group relative flex items-center justify-between gap-6",
          "border-b border-[var(--border)]",
          "py-7 md:py-9",
          "transition-colors duration-300 ease-[var(--ease-premium)]",
          "hover:border-[var(--border-strong)]"
        )}
      >
        <span className="font-mono text-[12px] tabular-nums tracking-[0.18em] text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--brand)] md:text-[13px]">
          {number}
        </span>

        <h3
          className={cn(
            "absolute left-1/2 -translate-x-1/2 text-center",
            "font-heading font-semibold tracking-tight text-[var(--text)]",
            "text-[22px] md:text-[34px] lg:text-[40px]",
            "transition-colors duration-300 ease-[var(--ease-premium)]",
            "group-hover:text-[var(--brand)]"
          )}
        >
          {title}
        </h3>

        <span
          aria-hidden
          className={cn(
            "inline-flex items-center justify-center text-[var(--text-muted)]",
            "transition-all duration-300 ease-[var(--ease-premium)]",
            "group-hover:translate-x-1 group-hover:text-[var(--brand)]"
          )}
        >
          <ArrowUpRight className="size-5 md:size-6" />
        </span>
      </Link>
    </motion.li>
  )
}