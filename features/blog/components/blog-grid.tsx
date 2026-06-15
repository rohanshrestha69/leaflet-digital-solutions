// features/blog/components/blog-grid.tsx
"use client"

import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { sectionV, itemV, itemBlurV, gridV } from "./blog-variants"
import { BlogCard } from "./blog-card"
import {
  BlogCategory,
  getAllBlogPosts,
  getAllCategories,
} from "@/features/marketing/data/blog-data"

const PAGE_SIZE = 6

type FilterValue = "All" | BlogCategory

export function BlogGrid() {
  const allPosts   = useMemo(() => getAllBlogPosts(), [])
  const categories: FilterValue[] = useMemo(
    () => ["All", ...getAllCategories()],
    []
  )

  const [activeCategory, setActiveCategory] = useState<FilterValue>("All")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allPosts
    return allPosts.filter((p) => p.category === activeCategory)
  }, [allPosts, activeCategory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const visible    = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const handleCategoryChange = (cat: FilterValue) => {
    setActiveCategory(cat)
    setPage(1)
  }

  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={itemBlurV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Latest from
              <br />
              the journal.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              Long-form essays, field notes, and frameworks from the studio.
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            variants={itemV}
            className="mt-12 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category
              return (
                <motion.button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isActive}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: ease.smooth }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[13px] font-medium",
                    "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-premium)]",
                    isActive
                      ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
                      : "border-[var(--border)] bg-[var(--background)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                  )}
                >
                  {category}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Grid — animate on category/page change */}
          <AnimatePresence mode="wait">
            {visible.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${safePage}`}
                variants={gridV}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
              >
                {visible.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: ease.smooth }}
                className="mt-14 flex h-[280px] items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-[var(--card)]/30"
              >
                <p className="text-[14px] text-[var(--text-muted)]">
                  No posts in this category yet — check back soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              variants={itemV}
              className="mt-16 flex items-center justify-center gap-2"
            >
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1
                const active = n === safePage
                return (
                  <motion.button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-label={`Go to page ${n}`}
                    aria-current={active ? "page" : undefined}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: 0.15, ease: ease.smooth }}
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-full",
                      "font-medium text-[13px] tabular-nums",
                      "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-premium)]",
                      active
                        ? "border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
                        : "border border-transparent text-[var(--text-muted)] hover:border-[var(--border)] hover:text-[var(--text)]"
                    )}
                  >
                    {String(n).padStart(2, "0")}
                  </motion.button>
                )
              })}
              <motion.button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Next page"
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.15, ease: ease.smooth }}
                className={cn(
                  "ml-2 inline-flex size-11 items-center justify-center rounded-full",
                  "border border-[var(--border)] text-[var(--text-muted)]",
                  "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-premium)]",
                  "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]",
                  "disabled:cursor-not-allowed disabled:opacity-30",
                  "disabled:hover:border-[var(--border)] disabled:hover:bg-transparent disabled:hover:text-[var(--text-muted)]"
                )}
              >
                <ArrowRight className="size-4" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}