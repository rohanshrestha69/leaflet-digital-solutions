// features/marketing/components/hero-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight, Eye, Leaf, Snowflake } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { InfiniteLogoStrip } from "@/components/animations/infinite-logo-strip"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { SplitWords } from "@/components/animations/text-reveal"
import { LineSweepReveal } from "@/components/animations/line-sweep-reveal"
import { InteractiveDots } from "@/components/ui/interactive-dots"
import { clientLogos, stats } from "@/features/marketing/data/stats"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ── Logo data ────────────────────────────────────────────────────── */

const logoIcons = [Eye, Snowflake, Eye, undefined, Leaf, undefined] as const
const logos = clientLogos.map((label, i) => ({
  label,
  Icon: logoIcons[i],
}))

/* ── Variants ─────────────────────────────────────────────────────── */

const container: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
}

const eyebrowV: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: ease.out },
  },
}

const buttonRow: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const buttonItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: ease.spring },
  },
}

const logoStrip: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.out, delay: 0.55 },
  },
}

const statsGrid: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const statItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.out },
  },
}

/* ── Copy ──────────────────────────────────────────────────────── */

const SUB_COPY =
  "We design, develop, and launch websites, mobile apps, dashboards, and automation systems that improve operations, build trust, and generate qualified leads."

/* ── Component ────────────────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#080706]"
    >
      {/* ── Background ──────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 z-0">
        <InteractiveDots
          gap={14}
          dotRadius={0.72}
          lightRadius={180}
          baseOpacity={0.1}
          maxOpacity={0.9}
          className="opacity-90"
        />
        {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,#080706_0%,rgba(8,7,6,0.16)_12%,rgba(8,7,6,0.03)_34%,rgba(8,7,6,0.08)_72%,#080706_100%)]" /> */}
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* ── Main content ─────────────────────────────────────── */}
        <Container
          wide
          className="flex flex-1 flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto flex w-full max-w-[1080px] flex-col items-center text-center"
          >
            {/* ── Eyebrow ─────────────────────────────────────── */}
            <motion.span
              variants={eyebrowV}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 font-medium text-[12px] uppercase tracking-[0.24em] text-white/60 sm:mb-7 sm:text-[11px]"
            >
              Leaflet Digital Solutions
            </motion.span>

            {/* ── Headline ────────────────────────────────────── */}
            <motion.div variants={item}>
              <SplitWords
                text="Digital systems built to convert, scale, and simplify growth."
                as="h1"
                className={cn(
                  "text-balance font-heading font-bold uppercase tracking-tight text-[#f8f1ea]",
                  /* Sizing — much more refined now */
                  "text-[28px] leading-[1.08]",
                  "sm:text-[40px] sm:leading-[1.06]",
                  "md:text-[52px]",
                  "lg:text-[64px]",
                  "xl:text-[72px]"
                )}
                delay={0.1}
                stagger={0.035}
              />
            </motion.div>

            {/* ── Sub-copy ─────────────────────────────────────── */}
            <motion.div
              variants={item}
              className="mt-5 w-full max-w-[680px] sm:mt-6 md:mt-7"
            >
              <LineSweepReveal
                text={SUB_COPY}
                from="left"
                delay={0.3}
                stagger={0.022}
                duration={0.3}
                className={cn(
                  "text-pretty text-[14px] font-normal leading-[1.65] text-white/55",
                  "sm:text-[15px] sm:leading-[1.7]",
                  "md:text-[16px] md:leading-[1.7]"
                )}
              />
            </motion.div>

            {/* ── CTA buttons ──────────────────────────────────── */}
            <motion.div
              variants={buttonRow}
              className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
            >
              <motion.div variants={buttonItem}>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "group h-11 w-full px-6 text-[13px] sm:h-12 sm:w-auto sm:min-w-[210px] sm:text-[14px]"
                  )}
                >
                  Book a free consultation
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>

              <motion.div variants={buttonItem}>
                <Link
                  href="/work"
                  className={cn(
                    buttonVariants({ variant: "outlineDark", size: "lg" }),
                    "group h-11 w-full border-white/[0.18] bg-transparent px-6 text-[13px] text-white/75",
                    "hover:border-white/[0.32] hover:bg-white/[0.04]",
                    "sm:h-12 sm:w-auto sm:min-w-[150px] sm:text-[14px]"
                  )}
                >
                  See our work
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>

        {/* ── Logo strip ───────────────────────────────────────── */}
        <motion.div
          variants={logoStrip}
          initial="hidden"
          animate="show"
          className="w-full pb-12 sm:pb-16 md:pb-24"
        >
          <Container wide>
            <p className="text-center font-medium text-[9px] uppercase tracking-[0.26em] text-white/25 sm:text-[12px]">
              Trusted by teams shipping at scale
            </p>
            <InfiniteLogoStrip
              logos={logos}
              className="mt-5 text-white/40 sm:mt-6"
              size="sm"
            />
          </Container>
        </motion.div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <Container wide className="py-10 md:py-12">
          <motion.div
            variants={statsGrid}
            initial="hidden"
            whileInView="show"
            viewport={viewport.section}
            className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={statItem}
                className="flex flex-col items-center text-center"
              >
                <p className="font-heading text-[28px] font-semibold leading-none text-white sm:text-[34px] md:text-[42px]">
                  <AnimatedCounter value={s.value} duration={1800} />
                </p>
                <p className="mt-3 font-medium text-[9px] uppercase tracking-[0.24em] text-white/35 sm:mt-4 sm:text-[12px]">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>
    </section>
  )
}