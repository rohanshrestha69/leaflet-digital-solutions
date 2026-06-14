"use client"

import Link from "next/link"
import { ArrowUpRight, Eye, Leaf, Snowflake } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { InteractiveDots } from "@/components/ui/interactive-dots"
import { Container } from "@/components/shared/container"
import { InfiniteLogoStrip } from "@/components/animations/infinite-logo-strip"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { clientLogos, stats } from "@/features/marketing/data/stats"
import { premiumEase, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const logoIcons = [Eye, Snowflake, Eye, undefined, Leaf, undefined]
const logos = clientLogos.map((label, index) => ({
  label,
  Icon: logoIcons[index],
}))

/* -------------------------------------------------------------------------- */
/*                              Hero variants                                 */
/*  Use `animate` (not whileInView) — hero is always in view on mount.        */
/*  Only animate `transform` + `opacity` — both are GPU-accelerated.          */
/* -------------------------------------------------------------------------- */

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
}

const heroButtonRow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const heroButton: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
}

const logoStripVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase, delay: 0.5 },
  },
}

/* Stats use `whileInView` since they're below the fold. */
const statsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const statItemV: Variants = {
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

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#080706]"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 z-0">
        <InteractiveDots
          gap={14}
          dotRadius={0.72}
          lightRadius={180}
          baseOpacity={0.1}
          maxOpacity={0.9}
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#080706_0%,rgba(8,7,6,0.16)_12%,rgba(8,7,6,0.03)_34%,rgba(8,7,6,0.08)_72%,#080706_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* Hero content */}
        <Container
          wide
          className="flex flex-1 flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28"
        >
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="mx-auto flex w-full max-w-[1200px] flex-col items-start sm:items-center"
          >
            <motion.h1
              variants={heroItem}
              className="text-left text-balance font-heading text-[30px] font-extrabold uppercase leading-[1.12] tracking-normal text-[#f8f1ea] sm:text-center sm:text-[44px] md:text-[60px] lg:text-[76px] xl:text-[88px]"
            >
              Digital systems built to convert, scale, and simplify growth.
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-4 max-w-[800px] text-left text-pretty text-[13px] font-medium leading-[1.6] text-white/[0.46] sm:mt-6 sm:text-center sm:text-[15px] sm:leading-7 md:mt-7 md:text-[18px] md:leading-8 xl:text-[20px]"
            >
              Leaflet Digital Solutions helps businesses design, develop, and
              launch websites, mobile apps, dashboards, automation tools, and
              digital growth systems that improve operations, build trust, and
              generate qualified leads.
            </motion.p>

            <motion.div
              variants={heroButtonRow}
              className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:justify-center sm:gap-5"
            >
              <motion.div variants={heroButton}>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "h-12 w-full text-[14px] sm:h-[52px] sm:w-auto sm:min-w-[240px] sm:text-[15px]"
                  )}
                >
                  Book a free consultation
                  <ArrowUpRight />
                </Link>
              </motion.div>

              <motion.div variants={heroButton}>
                <Link
                  href="/work"
                  className={cn(
                    buttonVariants({ variant: "outlineDark", size: "lg" }),
                    "h-12 w-full border-white/[0.22] bg-transparent text-[14px] text-white/[0.76] hover:border-white/[0.34] hover:bg-white/[0.04] sm:h-[52px] sm:w-auto sm:min-w-[168px] sm:text-[15px]"
                  )}
                >
                  See our work
                  <ArrowUpRight />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>

        {/* Logo strip */}
        <motion.div
          variants={logoStripVariants}
          initial="hidden"
          animate="show"
          className="w-full pb-12 sm:pb-16 md:pb-32"
        >
          <Container wide>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/20 sm:text-[11px]">
              WE HAVE WORKED WITH LARGE CORPORATE TEAMS
            </p>
            <InfiniteLogoStrip
              logos={logos}
              className="mt-4 text-white/50 sm:mt-5"
            />
          </Container>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <Container wide className="py-10 md:py-14">
          <motion.div
            variants={statsContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            className="grid grid-cols-2 gap-6 gap-y-10 md:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={statItemV}
                className="text-center"
              >
                <p className="font-heading text-[32px] font-semibold leading-none text-white sm:text-[40px] md:text-[50px]">
                  <AnimatedCounter value={s.value} duration={1600} />
                </p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-white/[0.32] sm:mt-4 sm:text-[10px]">
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