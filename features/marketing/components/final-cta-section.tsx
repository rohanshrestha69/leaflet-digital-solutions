// features/marketing/components/final-cta-section.tsx
"use client"

import Link from "next/link"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { InteractiveDots } from "@/components/ui/interactive-dots"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ── Variants ─────────────────────────────────────────────────────── */

const orchestratorV: Variants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.13, delayChildren: 0.06 } },
}

const headingV: Variants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(5px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.78, ease: ease.out },
  },
}

const subtitleV: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
}

const buttonV: Variants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: ease.spring },
  },
}

/* ── Component ────────────────────────────────────────────────────── */

export function FinalCTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[var(--background-deep)] py-24 md:py-36"
    >
      {/* Interactive dot background */}
      <InteractiveDots
        gap={28}
        dotRadius={1}
        color={[248, 130, 33]}
        baseOpacity={0.1}
        maxOpacity={0.85}
      />

      {/* Edge fades */}
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <div
          key={side}
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-[1]",
            side === "top"    && "inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--background-deep)] to-transparent",
            side === "bottom" && "inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--background-deep)] to-transparent",
            side === "left"   && "inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background-deep)] to-transparent",
            side === "right"  && "inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background-deep)] to-transparent",
          )}
        />
      ))}

      <Container wide className="relative z-[2] text-center">
        <motion.div
          variants={orchestratorV}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.section}
        >
          <motion.h2
            variants={headingV}
            className="mx-auto max-w-5xl font-heading text-[32px] font-extrabold leading-[1.12] text-white sm:text-[48px] lg:text-[66px]"
          >
            Build scalable digital solutions for modern businesses.
          </motion.h2>

          <motion.p
            variants={subtitleV}
            className="mt-8 text-base text-white/62"
          >
            With a lot of creativity, we can make your dream come true
          </motion.p>

          <motion.div variants={buttonV} className="mt-10">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "orange", size: "lg" }),
                "shadow-[0_0_0_1px_rgba(248,130,33,0.2)] hover:shadow-none",
              )}
            >
              Contact us
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}