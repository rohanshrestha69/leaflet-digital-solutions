"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

import { Container } from "@/components/shared/container"
import {
  type ProjectCategory,
  projectFilters,
  projects,
} from "@/features/marketing/data/projects-page"
import { premiumEase, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { ProjectCard } from "./project-card"
import { ProjectRow } from "./project-row"
import { ProjectFilters } from "./project-filters"
import { itemVariants } from "./project-variants"

const INITIAL_COUNT = 6
const STEP = 4

export function ProjectsWorks() {
  const [active, setActive] = useState<ProjectCategory | "All">("All")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [visible, setVisible] = useState(INITIAL_COUNT)

  /* Reset visible count when filters/view change */
  const filterKey = `${active}|${view}`
  const [lastKey, setLastKey] = useState(filterKey)
  if (filterKey !== lastKey) {
    setLastKey(filterKey)
    setVisible(INITIAL_COUNT)
  }

  const filtered = useMemo(() => {
    if (active === "All") return projects
    return projects.filter((p) => p.tags.includes(active))
  }, [active])

  const items = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <section
      id="works"
      className="relative scroll-mt-24 border-b border-[var(--border)] py-20 md:py-28"
    >
      <Container wide>
        {/* Toolbar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          <ProjectFilters
            filters={projectFilters}
            active={active}
            onFilterChange={setActive}
            view={view}
            onViewChange={setView}
          />
        </motion.div>

        {/* Results meta */}
        <div className="mt-8 mb-6 flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            / index — {String(filtered.length).padStart(2, "0")} results
          </span>
          {hasMore && (
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              showing {String(items.length).padStart(2, "0")} /{" "}
              {String(filtered.length).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Grid / List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${view}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-20"
                : "flex flex-col divide-y divide-[var(--border)]"
            }
          >
            {items.length === 0 ? (
              <EmptyState onReset={() => setActive("All")} />
            ) : view === "grid" ? (
              items.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  priority={i < 2}
                />
              ))
            ) : (
              items.map((project, i) => (
                <ProjectRow key={project.id} project={project} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Show more */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 0.45, ease: premiumEase }}
            className="mt-16 flex justify-center"
          >
            <button
              type="button"
              onClick={() => setVisible((v) => v + STEP)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full",
                "border border-[var(--border)] bg-transparent",
                "px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]",
                "transition-all duration-300 ease-[var(--ease-premium)]",
                "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]"
              )}
            >
              Show more
              <span className="font-mono text-[10px] text-[var(--text-subtle)]">
                +{Math.min(STEP, filtered.length - visible)}
              </span>
            </button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Empty state                                 */
/* -------------------------------------------------------------------------- */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full flex h-[280px] items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-[var(--card)]/30">
      <div className="text-center">
        <p className="text-[14px] text-[var(--text-muted)]">
          No projects in this category yet.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-3 font-mono text-[12px] text-[var(--brand)] underline underline-offset-4 transition-colors hover:text-[var(--brand-hover)]"
        >
          Show all
        </button>
      </div>
    </div>
  )
}