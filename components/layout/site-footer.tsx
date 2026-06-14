"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "motion/react"

import { Container } from "@/components/shared/container"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { footerColumns } from "@/features/marketing/data/footer-links"
import { premiumEase } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
]

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const viewport = { once: true, amount: 0.15 as const }

const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
}

const gridContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
}

const bottomVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase, delay: 0.2 },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)]">
      {/* Hover text banner */}
      <div className="border-b border-[var(--border)]">
        <Container wide>
          <motion.div
            variants={bannerVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="items-center justify-center py-6 flex md:py-10"
          >
            <div className="h-[50px] w-full max-w-350 sm:h-[70px] md:h-[100px] lg:h-[130px] xl:h-[160px]">
              <TextHoverEffect
                text="LEAFLET DIGITAL"
                strokeWidth={1}
              />
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Footer columns */}
      <Container wide className="py-16 md:py-20">
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <motion.div variants={columnVariants} className="flex flex-col gap-6">
            <Link
              href="/"
              aria-label="Leaflet — Home"
              className="inline-flex items-center gap-2 font-heading font-bold tracking-wide text-[var(--text)] transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src="/logo_white.svg"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
              <span className="text-[28px] tracking-wider">Leaflet</span>
            </Link>

            <p className="max-w-[280px] text-[15px] leading-relaxed text-[var(--text-muted)]">
              Connecting your brand to the digital world.
            </p>

            <p className="max-w-[280px] text-[14px] leading-relaxed text-[var(--text-subtle)]">
              Built remote. Built different.
              <br />
              Built for growth.
            </p>
          </motion.div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <motion.div
              key={column.title}
              variants={columnVariants}
              className="flex flex-col gap-5"
            >
              <h3 className="font-semibold text-base font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={bottomVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 flex flex-col gap-4 border-t border-[var(--border)] pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            © {year} Leaflet Digital Solutions
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-[var(--text-muted)]">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-[var(--text)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Footer link                                 */
/* -------------------------------------------------------------------------- */

function FooterLink({
  link,
}: {
  link: { label: string; href: string; external?: boolean }
}) {
  const className = cn(
    "inline-flex text-[14px] text-[var(--text-muted)]",
    "transition-colors duration-200 ease-[var(--ease-premium)]",
    "hover:text-[var(--brand)]"
  )

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}