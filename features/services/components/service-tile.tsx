"use client"

import Link from "next/link"
import { motion, type Variants } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { premiumEase } from "@/lib/motion"
import type { ServiceOffering } from "@/features/marketing/data/services-page"

type ServiceTileProps = {
  service: ServiceOffering
  className?: string
}

/* Defined at module level so the variant reference is stable
   and Framer Motion properly inherits from the parent stagger. */
const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEase },
  },
}

export function ServiceTile({ service, className }: ServiceTileProps) {
  return (
    <motion.div variants={tileVariants}>
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "group/tile relative flex aspect-square flex-col justify-between overflow-hidden rounded-[var(--radius-xl)]",
          "border border-[var(--border)] bg-[var(--card)]",
          "p-5 md:p-6",
          "transition-all duration-400 ease-[var(--ease-premium)]",
          "hover:border-[var(--brand-border)] hover:bg-[var(--card-hover)]",
          "hover:shadow-[0_0_0_1px_var(--brand-border),0_12px_32px_-12px_rgba(0,0,0,0.5)]",
          className
        )}
      >
        {/* Number + arrow */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            {service.number}
          </span>
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full",
              "border border-[var(--border)] bg-transparent text-[var(--text-muted)]",
              "transition-all duration-300 ease-[var(--ease-premium)]",
              "group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5",
              "group-hover/tile:border-[var(--brand-border)] group-hover/tile:bg-[var(--brand-soft)] group-hover/tile:text-[var(--brand)]"
            )}
          >
            <ArrowUpRight className="size-3.5" />
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-heading text-[22px] font-bold leading-tight tracking-tight text-[var(--text)] md:text-[26px]",
            "transition-colors duration-300 group-hover/tile:text-white"
          )}
        >
          {service.title}
        </h3>

        {/* Brand glow on hover */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(248,130,33,0.12),transparent_55%)]",
            "opacity-0 transition-opacity duration-500 ease-[var(--ease-premium)]",
            "group-hover/tile:opacity-100"
          )}
        />
      </Link>
    </motion.div>
  )
}