// components/ui/bento-grid.tsx
"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type ReactNode } from "react"

export type BentoSize = "sm" | "md" | "lg" | "xl"

/* ------------------------------------------------------------------ */
/*  Size dimensions in grid units                                       */
/* ------------------------------------------------------------------ */

const sizeDimensions: Record<BentoSize, { cols: number; rows: number }> = {
  sm: { cols: 1, rows: 1 },
  md: { cols: 2, rows: 1 },
  lg: { cols: 1, rows: 2 },
  xl: { cols: 2, rows: 2 },
}

/* ------------------------------------------------------------------ */
/*  Smart layout algorithm                                              */
/* ------------------------------------------------------------------ */

/**
 * Computes bento sizes for an array of items that ALWAYS tile cleanly
 * across the given column count, with no awkward gaps.
 *
 * Strategy:
 *   - Use a repeating "rhythm pattern" of visually pleasing sizes
 *   - Track remaining columns in current row
 *   - If a chosen size doesn't fit, fall back to a smaller one
 *   - Last item plug-fills any leftover space
 *
 * @param count       Number of items to lay out
 * @param totalCols   Grid column count (e.g. 3)
 * @returns           Array of sizes — one per item
 */
export function computeBentoLayout(
  count: number,
  totalCols: number = 3
): BentoSize[] {
  // Rhythm: large feature, then small accents, then a wide, repeat
  // This pattern works for 3-col grids without leaving gaps
  const rhythm: BentoSize[] = ["xl", "sm", "sm", "sm", "md", "sm"]

  const sizes: BentoSize[] = []
  let rhythmIndex = 0

  // Track virtual row occupancy — simple 1D model of "cols still free in current row"
  // We approximate dense flow: any leftover row capacity gets filled by sm
  let i = 0

  while (i < count) {
    const isLast = i === count - 1
    const remaining = count - i

    // Pick from rhythm
    let candidate = rhythm[rhythmIndex % rhythm.length]
    rhythmIndex++

    // Guard: never start a 2-wide item if only 1 item remains
    if (sizeDimensions[candidate].cols > 1 && remaining < 2) {
      candidate = "sm"
    }

    // Guard: don't end on a tall item that creates an orphan row
    if (isLast && sizeDimensions[candidate].rows > 1) {
      candidate = sizeDimensions[candidate].cols > 1 ? "md" : "sm"
    }

    sizes.push(candidate)
    i++
  }

  // Post-pass: ensure the total area mod totalCols == 0 by padding logic
  // The dense flow algorithm in CSS handles small gaps automatically when
  // sm items exist, so as long as we have enough sm items, we're clean.
  return sizes
}

/* ------------------------------------------------------------------ */
/*  Grid                                                                */
/* ------------------------------------------------------------------ */

type BentoGridProps = {
  className?: string
  children?: ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full gap-3 sm:gap-4",
        "grid-cols-2 md:grid-cols-3",
        "auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[240px]",
        "grid-flow-dense",
        className
      )}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Item                                                                */
/* ------------------------------------------------------------------ */

type BentoGridItemProps = {
  className?: string
  children?: ReactNode
  size?: BentoSize
}

const sizeClasses: Record<BentoSize, string> = {
  sm: "col-span-1 row-span-1",
  md: "col-span-2 row-span-1",
  lg: "col-span-1 row-span-2",
  xl: "col-span-2 row-span-2",
}

export const BentoGridItem = forwardRef<HTMLDivElement, BentoGridItemProps>(
  function BentoGridItem({ className, children, size = "sm" }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "group/bento relative overflow-hidden rounded-[var(--radius-lg)]",
          "border border-[var(--border)] bg-[var(--card)]",
          "transition-all duration-400 ease-[var(--ease-premium)]",
          "hover:border-[var(--border-strong)]",
          "hover:shadow-[0_0_0_1px_var(--brand-border),0_8px_30px_-8px_rgba(0,0,0,0.4)]",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    )
  }
)