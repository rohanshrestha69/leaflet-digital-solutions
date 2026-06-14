"use client"

import { useCallback } from "react"
import { ArrowDown } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { premiumEase } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionContainer, itemVariants } from "./project-variants"

export function ProjectsHero() {
  const scrollToWorks = useCallback(() => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section className="relative flex min-h-[100vh] flex-col border-b border-[var(--border)] pt-32 md:pt-40">
      <Container wide className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            variants={itemVariants}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)]"
          >
            Our Work
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-[40px] font-semibold leading-[1.05] tracking-tight text-[var(--text)] sm:text-[60px] md:text-[80px] lg:text-[96px]"
          >
            Work we&apos;re
            <br />
            <span className="text-[var(--text-muted)]">proud to ship.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[17px]"
          >
            A curated selection of recent products, brands, and platforms built
            in close partnership with founders and operating teams.
          </motion.p>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: premiumEase, delay: 0.6 }}
        className="flex justify-center pb-12 md:pb-16"
      >
        <button
          type="button"
          aria-label="Jump to work"
          onClick={scrollToWorks}
          className={cn(
            "group inline-flex size-12 items-center justify-center rounded-full",
            "border border-[var(--border)] bg-[var(--card)]/40 text-[var(--text)]",
            "transition-all duration-300 ease-[var(--ease-premium)]",
            "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]"
          )}
        >
          <ArrowDown className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </motion.div>
    </section>
  )
}