// features/services/components/service-tile.tsx
"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { ServiceOffering } from "@/features/marketing/data/services-page"
import { tileV } from "./details/service-variants"

type ServiceTileProps = {
  service: ServiceOffering
  className?: string
}

export function ServiceTile({ service, className }: ServiceTileProps) {
  return (
    <motion.div
      variants={tileV}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: ease.smooth }}
    >
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "group/tile relative flex aspect-square flex-col justify-between overflow-hidden rounded-[var(--radius-xl)]",
          "border border-[var(--border)] bg-[var(--card)]",
          "p-5 md:p-6",
          "transition-[background-color,border-color,box-shadow] duration-400 ease-[var(--ease-premium)]",
          "hover:border-[var(--brand-border)] hover:bg-[var(--card-hover)]",
          "hover:shadow-[0_0_0_1px_var(--brand-border),0_12px_32px_-12px_rgba(0,0,0,0.5)]",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <span className="font-medium text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            {service.number}
          </span>
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full",
              "border border-[var(--border)] bg-transparent text-[var(--text-muted)]",
              "transition-[transform,border-color,background-color,color] duration-300 ease-[var(--ease-premium)]",
              "group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5",
              "group-hover/tile:border-[var(--brand-border)] group-hover/tile:bg-[var(--brand-soft)] group-hover/tile:text-[var(--brand)]"
            )}
          >
            <ArrowUpRight className="size-3.5" />
          </div>
        </div>

        <h3
          className={cn(
            "font-heading text-[22px] font-bold leading-tight tracking-tight text-[var(--text)] md:text-[26px]",
            "transition-colors duration-300 group-hover/tile:text-white"
          )}
        >
          {service.title}
        </h3>

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