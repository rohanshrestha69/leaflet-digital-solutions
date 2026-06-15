// features/projects/components/projects-hero.tsx
"use client"

import { useCallback } from "react"
import { ArrowDown } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Container } from "@/components/shared/container"
import { SplitWords } from "@/components/animations/text-reveal"
import { LineSweepReveal } from "@/components/animations/line-sweep-reveal"
import { MagneticButton } from "@/components/animations/magnetic-button"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

const containerV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

const itemV: Variants = {
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

const scrollV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.out, delay: 0.7 },
  },
}

export function ProjectsHero() {
  const scrollToWorks = useCallback(() => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section className="relative flex min-h-dvh flex-col border-b border-[var(--border)] pt-32 md:pt-40">
      <Container
        wide
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <motion.div
          variants={containerV}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            variants={eyebrowV}
            className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]"
          >
            Our Work
          </motion.span>

          <motion.div variants={itemV}>
            <SplitWords
              text="Work we're"
              as="h1"
              className={cn(
                "font-heading font-bold uppercase tracking-tight text-[var(--text)]",
                "text-[34px] leading-[1.05]",
                "sm:text-[52px]",
                "md:text-[68px]",
                "lg:text-[80px]"
              )}
              delay={0.1}
              stagger={0.04}
            />
            <SplitWords
              text="proud to ship."
              as="span"
              className={cn(
                "block font-heading font-bold uppercase tracking-tight text-[var(--text-muted)]",
                "text-[34px] leading-[1.05]",
                "sm:text-[52px]",
                "md:text-[68px]",
                "lg:text-[80px]"
              )}
              delay={0.3}
              stagger={0.04}
            />
          </motion.div>

          <motion.div variants={itemV} className="mt-2 max-w-2xl">
            <LineSweepReveal
              text="A curated selection of recent products, brands, and platforms built in close partnership with founders and operating teams."
              as="p"
              className={cn(
                "text-pretty text-[14px] leading-[1.65] text-white/55",
                "sm:text-[15px] sm:leading-[1.7]",
                "md:text-[16px] md:leading-[1.7]"
              )}
              delay={0.05}
              stagger={0.022}
              duration={0.32}
            />
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        variants={scrollV}
        initial="hidden"
        animate="show"
        className="flex justify-center pb-12 md:pb-16"
      >
        <MagneticButton
          as="button"
          strength={0.35}
          innerStrength={1.2}
          onClick={scrollToWorks}
          aria-label="Jump to work"
          className={cn(
            "size-14 rounded-full",
            "border border-[var(--border)] bg-[var(--card)]/40 text-[var(--text)]",
            "transition-[border-color,background-color,color] duration-300 ease-[var(--ease-premium)]",
            "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]"
          )}
        >
          <ArrowDown className="size-5" />
        </MagneticButton>
      </motion.div>
    </section>
  )
}