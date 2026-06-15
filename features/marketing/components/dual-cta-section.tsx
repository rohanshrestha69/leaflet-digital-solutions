// features/marketing/components/dual-cta-section.tsx
"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                              Lazy-loaded visuals                           */
/* -------------------------------------------------------------------------- */

const GlobeVisual = dynamic(
  () => import("./dual-cta-visuals").then((m) => m.GlobeVisual),
  { ssr: false, loading: () => <VisualPlaceholder /> }
)

const MarqueeVisual = dynamic(
  () => import("./dual-cta-visuals").then((m) => m.MarqueeVisual),
  { ssr: false, loading: () => <VisualPlaceholder /> }
)

function VisualPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,130,33,0.06),transparent_60%)]" />
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function DualCTASection() {
  return (
    <section className="relative bg-[var(--background)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
          className="grid gap-5 md:gap-6 lg:grid-cols-2"
        >
          <motion.div variants={cardV}>
            <CTACard
              label="For businesses"
              title="Scale your digital presence"
              body="Ready to grow with a tech partner that ships fast and builds for the long run."
              href="/contact"
              button="Start a project"
              variant="orange"
              renderVisual={(active) => active ? <GlobeVisual /> : <VisualPlaceholder />}
            />
          </motion.div>

          <motion.div variants={cardV}>
            <CTACard
              label="For agencies"
              title="White-label that delivers"
              body="Reliable white-label development and design support — ship under your brand."
              href="/contact"
              button="Partner with us"
              variant="outlineDark"
              renderVisual={(active) => active ? <MarqueeVisual /> : <VisualPlaceholder />}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  CTA Card                                  */
/* -------------------------------------------------------------------------- */

type CTACardProps = {
  label: string
  title: ReactNode
  body: string
  href: string
  button: string
  variant: "orange" | "outlineDark"
  renderVisual: (active: boolean) => ReactNode
}

function CTACard({ label, title, body, href, button, variant, renderVisual }: CTACardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setActive(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={cn(
        "group relative flex min-h-[420px] overflow-hidden rounded-[var(--radius-xl)]",
        "border border-[var(--border)] bg-[var(--card)]/40 p-7 md:p-10",
        "transition-colors duration-300 ease-[var(--ease-premium)] hover:border-[var(--border-strong)]"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90"
      >
        {renderVisual(active)}
      </div>

      <div className="relative z-10 mt-auto max-w-sm">
        <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]">
          {label}
        </span>
        <h3 className="mt-3 font-heading text-[24px] font-semibold leading-tight tracking-tight text-[var(--text)] md:text-[30px]">
          {title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
          {body}
        </p>
        <Link href={href} className={cn(buttonVariants({ variant, size: "lg" }), "mt-7 gap-2")}>
          {button}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}