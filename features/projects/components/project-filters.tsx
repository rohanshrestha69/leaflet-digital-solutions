// features/projects/components/project-filters.tsx
"use client"

import { LayoutGrid, List } from "lucide-react"
import { motion } from "motion/react"

import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { ProjectCategory } from "@/features/marketing/data/projects-page"

type ProjectFiltersProps = {
  filters: ProjectCategory[]
  active: ProjectCategory | "All"
  onFilterChange: (filter: ProjectCategory | "All") => void
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function ProjectFilters({
  filters,
  active,
  onFilterChange,
  view,
  onViewChange,
}: ProjectFiltersProps) {
  const allFilters: (ProjectCategory | "All")[] = ["All", ...filters]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-xl uppercase tracking-[0.24em] text-[var(--text-soft)]">
            Our projects
          </span>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)]/40 p-1">
          <motion.button
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15, ease: ease.smooth }}
            className={cn(
              "flex size-10 items-center justify-center rounded-full",
              "transition-[background-color,color] duration-300 ease-[var(--ease-premium)]",
              view === "grid"
                ? "bg-[var(--brand)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            <LayoutGrid className="size-4" />
          </motion.button>
          <motion.button
            onClick={() => onViewChange("list")}
            aria-label="List view"
            aria-pressed={view === "list"}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15, ease: ease.smooth }}
            className={cn(
              "flex size-10 items-center justify-center rounded-full",
              "transition-[background-color,color] duration-300 ease-[var(--ease-premium)]",
              view === "list"
                ? "bg-[var(--brand)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            <List className="size-4" />
          </motion.button>
        </div>
      </div>

      {/* Filter pills with animated layoutId background */}
      <div className="flex flex-wrap items-center gap-1.5">
        {allFilters.map((filter) => {
          const isActive = filter === active
          return (
            <motion.button
              key={filter}
              onClick={() => onFilterChange(filter)}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: ease.smooth }}
              className={cn(
                "relative rounded-full px-4 py-2 text-[13px] font-medium",
                "transition-colors duration-300 ease-[var(--ease-premium)]",
                isActive
                  ? "text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-soft)]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-[var(--muted)]"
                  transition={{
                    type:     "spring",
                    bounce:   0.2,
                    duration: 0.55,
                  }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}