// features/about/components/about-hero.tsx
"use client"

import { useCallback } from "react"
import { ArrowDown } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Container } from "@/components/shared/container"
import { SplitWords } from "@/components/animations/text-reveal"
import { MagneticButton } from "@/components/animations/magnetic-button"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

const containerV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
}

const itemV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: ease.out } },
}

const eyebrowV: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show:   {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.out },
  },
}

const subtitleV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
}

const scrollV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out, delay: 0.7 },
  },
}

export function AboutHero() {
  const scrollToStory = useCallback(() => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })
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
            About Leaflet
          </motion.span>

          <motion.div variants={itemV}>
            <SplitWords
              text="A studio built for the next chapter."
              as="h1"
              className="font-heading text-[40px] font-semibold leading-[1.05] tracking-tight text-[var(--text)] sm:text-[60px] md:text-[80px] lg:text-[96px]"
              delay={0.15}
              stagger={0.045}
            />
          </motion.div>

          <motion.p
            variants={subtitleV}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[17px]"
          >
            We partner with founders and modern teams to craft brand, product,
            and web experiences that compound in value over time.
          </motion.p>
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
          onClick={scrollToStory}
          aria-label="Jump to story"
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