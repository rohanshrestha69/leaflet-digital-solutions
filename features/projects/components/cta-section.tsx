// features/projects/components/cta-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { InteractiveDots } from "@/components/ui/interactive-dots"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ── Types ─────────────────────────────────────────────────────── */

type CTAAction = {
  label:    string
  href:     string
  variant?: "orange" | "outlineDark"
  external?: boolean
}

type CTASectionProps = {
  eyebrow?:    string
  title:       React.ReactNode
  description?: string
  actions?:    CTAAction[]
  withDots?:   boolean
  align?:      "center" | "left"
  id?:         string
  size?:       "default" | "compact"
  className?:  string
}

/* ── Variants ──────────────────────────────────────────────────── */

const orchestratorV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const eyebrowV: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: ease.out },
  },
}

const titleV: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: ease.out },
  },
}

const descV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.out },
  },
}

const buttonsV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const buttonV: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: ease.spring },
  },
}

/* ── Component ─────────────────────────────────────────────────── */

export function CTASection({
  eyebrow,
  title,
  description,
  actions = [],
  withDots = true,
  align    = "center",
  id,
  size     = "default",
  className,
}: CTASectionProps) {
  const padding = size === "compact" ? "py-16 md:py-24" : "py-24 md:py-36"

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
      {/* {(["top", "bottom", "left", "right"] as const).map((side) => (
        <div
          key={side}
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-[1]",
            side === "top"    && "inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--background-deep)] to-transparent",
            side === "bottom" && "inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background-deep)] to-transparent",
            side === "left"   && "inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background-deep)] to-transparent",
            side === "right"  && "inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background-deep)] to-transparent",
          )}
        />
      ))} */}

      <Container
        wide
        className={cn(
          "relative z-[2]",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        <motion.div
          variants={orchestratorV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
          className={cn(
            "flex flex-col gap-6",
            align === "center" ? "items-center" : "items-start"
          )}
        >
          {eyebrow && (
            <motion.span
              variants={eyebrowV}
              className={cn(
                "inline-flex items-center gap-2 rounded-full",
                "border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-sm",
                "px-3.5 py-1.5 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
              )}
            >
              <span className="size-1.5 rounded-full bg-[var(--brand)]" />
              {eyebrow}
            </motion.span>
          )}

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
                        size:    "lg",
                      }),
                      "group w-full gap-2 sm:w-auto"
                    )}
                  >
                    {action.label}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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