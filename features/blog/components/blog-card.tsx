"use client"

import {
  useCallback,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import {
  type BlogPost,
  getCategoryColor,
} from "@/features/marketing/data/blog-data"
import { cn } from "@/lib/utils"
import { tileVariants } from "./blog-variants"

type BlogCardProps = {
  post: BlogPost
  /**
   * `default` — standard card for grids (4:3 image)
   * `featured` — larger card with bigger heading and "Read article" CTA (16:10 image)
   * `compact` — minimal horizontal layout for sidebar/side lists (no image)
   */
  variant?: "default" | "featured" | "compact"
  /** Prevent navigation when parent carousel is dragging */
  shouldPreventNavigation?: () => boolean
  className?: string
}

export function BlogCard({
  post,
  variant = "default",
  shouldPreventNavigation,
  className,
}: BlogCardProps) {
  /* ----------------------------- Drag prevention ---------------------------- */
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)
  const draggedRef = useRef(false)

  const handlePointerDownCapture = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      pointerStartRef.current = { x: event.clientX, y: event.clientY }
      draggedRef.current = false
    },
    []
  )

  const handlePointerMoveCapture = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!pointerStartRef.current || draggedRef.current) return
      const dx = Math.abs(event.clientX - pointerStartRef.current.x)
      const dy = Math.abs(event.clientY - pointerStartRef.current.y)
      if (dx > 8 || dy > 8) draggedRef.current = true
    },
    []
  )

  const clearPointer = useCallback(() => {
    pointerStartRef.current = null
  }, [])

  const handleClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (draggedRef.current || shouldPreventNavigation?.()) {
        event.preventDefault()
        event.stopPropagation()
      }
      draggedRef.current = false
    },
    [shouldPreventNavigation]
  )

  /* Compact variant — no image, horizontal layout for sidebars/side lists */
  if (variant === "compact") {
    return (
      <CompactCard post={post} className={className} />
    )
  }

  /* ----------------------------- Default + Featured ------------------------- */
  const isFeatured = variant === "featured"

  return (
    <motion.article variants={tileVariants} className={className}>
      <Link
        href={`/blog/${post.slug}`}
        onPointerDownCapture={handlePointerDownCapture}
        onPointerMoveCapture={handlePointerMoveCapture}
        onPointerUpCapture={clearPointer}
        onPointerCancelCapture={clearPointer}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className="group block"
      >
        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-xl)]",
            "border border-[var(--border)] bg-[var(--card)]/40",
            "transition-colors duration-300 ease-[var(--ease-premium)]",
            "group-hover:border-[var(--border-strong)]",
            isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"
          )}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={
              isFeatured
                ? "(min-width: 1024px) 58vw, 100vw"
                : "(min-width: 1024px) 33vw, 100vw"
            }
            draggable={false}
            className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]"
          />

          {/* Category badge */}
          <CategoryBadge category={post.category} />

          {/* Hover arrow */}
          <HoverArrow />
        </div>

        {/* Content */}
        <div className={cn("flex flex-col gap-3", isFeatured ? "mt-6 gap-4" : "mt-5")}>
          {/* Meta */}
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            <span>{post.date}</span>
            <span className="size-1 rounded-full bg-[var(--text-subtle)]/40" />
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "font-heading font-semibold leading-tight tracking-tight text-[var(--text)]",
              "transition-colors duration-300 ease-[var(--ease-premium)]",
              "group-hover:text-[var(--brand)]",
              isFeatured
                ? "text-[24px] md:text-[28px]"
                : "text-[20px] md:text-[22px]"
            )}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className={cn(
              "text-[14px] leading-relaxed text-[var(--text-muted)]",
              isFeatured
                ? "max-w-xl line-clamp-3 md:text-[15px]"
                : "line-clamp-2"
            )}
          >
            {post.excerpt}
          </p>

          {/* Featured footer */}
          {isFeatured && (
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[13px] text-[var(--text-muted)]">
                By {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] transition-transform duration-300 group-hover:translate-x-0.5">
                Read article
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

/* -------------------------------------------------------------------------- */
/*                             Compact card variant                           */
/* -------------------------------------------------------------------------- */

function CompactCard({
  post,
  className,
}: {
  post: BlogPost
  className?: string
}) {
  return (
    <motion.article variants={tileVariants} className={className}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col gap-3 border-b border-[var(--border)] py-7",
          "transition-colors duration-300 ease-[var(--ease-premium)]"
        )}
      >
        {/* Meta */}
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          <span className={getCategoryColor(post.category)}>
            {post.category}
          </span>
          <span className="size-1 rounded-full bg-[var(--text-subtle)]/40" />
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h4 className="font-heading text-[18px] font-semibold leading-snug tracking-tight text-[var(--text)] transition-colors duration-300 ease-[var(--ease-premium)] group-hover:text-[var(--brand)] md:text-[20px]">
          {post.title}
        </h4>

        {/* Excerpt */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--text-muted)] md:text-[14px]">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-1 flex w-full items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            {post.readTime}
          </span>
          <ArrowUpRight
            className={cn(
              "size-4 text-[var(--text-subtle)]",
              "transition-all duration-300 ease-[var(--ease-premium)]",
              "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]"
            )}
          />
        </div>
      </Link>
    </motion.article>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Sub-components                              */
/* -------------------------------------------------------------------------- */

function CategoryBadge({ category }: { category: BlogPost["category"] }) {
  return (
    <span
      className={cn(
        "absolute left-4 top-4 inline-flex items-center gap-2 rounded-full",
        "border border-[var(--border)] bg-[var(--background)]/70 px-3 py-1.5",
        "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur-md"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          getCategoryColor(category).replace("text-", "bg-")
        )}
      />
      {category}
    </span>
  )
}

function HoverArrow() {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute right-4 top-4 flex size-9 items-center justify-center rounded-full",
        "border border-white/[0.1] bg-[var(--background)]/70 text-[var(--text-soft)] backdrop-blur-md",
        "translate-y-2 opacity-0 transition-all duration-400 ease-[var(--ease-premium)]",
        "group-hover:translate-y-0 group-hover:opacity-100",
        "group-hover:border-[var(--brand-border)] group-hover:text-[var(--brand)]"
      )}
    >
      <ArrowUpRight className="size-4" />
    </span>
  )
}