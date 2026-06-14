// components/shared/cta-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { InteractiveDots } from "@/components/ui/interactive-dots"
import {
  fadeUp,
  fadeUpBlur,
  popIn,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type CTAAction = {
  label: string
  href: string
  variant?: "orange" | "outlineDark"
  external?: boolean
}

type CTASectionProps = {
  /** Small uppercase label above title — optional */
  eyebrow?: string
  /** Main heading — supports JSX for partial coloring */
  title: React.ReactNode
  /** Supporting copy beneath the heading */
  description?: string
  /** 1-2 action buttons */
  actions?: CTAAction[]
  /** Show the animated dot background */
  withDots?: boolean
  /** Center vs left-align the content */
  align?: "center" | "left"
  /** Override section id for anchor links */
  id?: string
  /** Vertical padding preset */
  size?: "default" | "compact"
  className?: string
}

/* ------------------------------------------------------------------ */
/*  Motion                                                              */
/* ------------------------------------------------------------------ */

const orchestrator: Variants = sectionStagger(0.1, 0.05)
const eyebrowV: Variants = fadeUp(10, 0.45)
const titleV: Variants = fadeUpBlur(24, 4, 0.65)
const descV: Variants = fadeUp(14, 0.5)
const buttonsV: Variants = sectionStagger(0.08, 0)
const buttonV: Variants = popIn(0.96, 0.45)

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function CTASection({
  eyebrow,
  title,
  description,
  actions = [],
  withDots = true,
  align = "center",
  id,
  size = "default",
  className,
}: CTASectionProps) {
  const padding =
    size === "compact" ? "py-16 md:py-24" : "py-24 md:py-36"

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden border-t border-white/[0.06] bg-[var(--background-deep)]",
        padding,
        className
      )}
    >
      {/* Background dots */}
      {withDots && (
        <InteractiveDots
          gap={28}
          dotRadius={1}
          color={[248, 130, 33]}
          baseOpacity={0.08}
          maxOpacity={0.7}
        />
      )}

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[var(--background-deep)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-[var(--background-deep)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-gradient-to-r from-[var(--background-deep)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-gradient-to-l from-[var(--background-deep)] to-transparent"
      />


      <Container
        wide
        className={cn(
          "relative z-[2]",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className={cn(
            "flex flex-col gap-6",
            align === "center" ? "items-center" : "items-start"
          )}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <motion.span
              variants={eyebrowV}
              className={cn(
                "inline-flex items-center gap-2 rounded-full",
                "border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-sm",
                "px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
              )}
            >
              {eyebrow}
            </motion.span>
          )}

          {/* Title */}
          <motion.h2
            variants={titleV}
            className={cn(
              "max-w-4xl font-heading font-extrabold leading-[1.08] tracking-tight text-white",
              "text-[30px] sm:text-[44px] lg:text-[60px]",
              align === "center" && "mx-auto"
            )}
          >
            {title}
          </motion.h2>

          {/* Description */}
          {description && (
            <motion.p
              variants={descV}
              className={cn(
                "max-w-xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px] md:text-[16px] md:leading-7",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </motion.p>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <motion.div
              variants={buttonsV}
              className={cn(
                "mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center",
                align === "center" && "sm:justify-center"
              )}
            >
              {actions.map((action) => (
                <motion.div key={action.href} variants={buttonV}>
                  <Link
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      buttonVariants({
                        variant: action.variant ?? "orange",
                        size: "lg",
                      }),
                      "w-full sm:w-auto"
                    )}
                  >
                    {action.label}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}