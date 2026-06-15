// features/blog/components/blog-card.tsx
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
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { tileV } from "./blog-variants"

type BlogCardProps = {
  post: BlogPost
  variant?: "default" | "featured" | "compact"
  shouldPreventNavigation?: () => boolean
  className?: string
}

export function BlogCard({
  post,
  variant = "default",
  shouldPreventNavigation,
  className,
}: BlogCardProps) {
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

  if (variant === "compact") {
    return <CompactCard post={post} className={className} />
  }

  const isFeatured = variant === "featured"

  return (
    <motion.article
      variants={tileV}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: ease.smooth }}
      className={className}
    >
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
            "transition-[border-color] duration-300 ease-[var(--ease-premium)]",
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
            className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.05]"
          />

          {/* Subtle dark gradient on hover */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <CategoryBadge category={post.category} />
          <HoverArrow />
        </div>

        {/* Content */}
        <div className={cn("flex flex-col gap-3", isFeatured ? "mt-6 gap-4" : "mt-5")}>
          <div className="flex items-center gap-3 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            <span>{post.date}</span>
            <span className="size-1 rounded-full bg-[var(--text-subtle)]/40" />
            <span>{post.readTime}</span>
          </div>

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

          {isFeatured && (
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[13px] text-[var(--text-muted)]">
                By {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] transition-transform duration-300 group-hover:translate-x-1">
                Read article
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

/* ── Compact ──────────────────────────────────────────────────── */

function CompactCard({
  post,
  className,
}: {
  post: BlogPost
  className?: string
}) {
  return (
    <motion.article variants={tileV} className={className}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col gap-3 border-b border-[var(--border)] py-7",
          "transition-colors duration-300 ease-[var(--ease-premium)]"
        )}
      >
        <div className="flex items-center gap-3 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          <span className={getCategoryColor(post.category)}>{post.category}</span>
          <span className="size-1 rounded-full bg-[var(--text-subtle)]/40" />
          <span>{post.date}</span>
        </div>

        <h4 className="font-heading text-[18px] font-semibold leading-snug tracking-tight text-[var(--text)] transition-colors duration-300 ease-[var(--ease-premium)] group-hover:text-[var(--brand)] md:text-[20px]">
          {post.title}
        </h4>

        <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--text-muted)] md:text-[14px]">
          {post.excerpt}
        </p>

        <div className="mt-1 flex w-full items-center justify-between">
          <span className="font-medium text-[11px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
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

/* ── Sub-components ───────────────────────────────────────────── */

function CategoryBadge({ category }: { category: BlogPost["category"] }) {
  return (
    <span
      className={cn(
        "absolute left-4 top-4 inline-flex items-center gap-2 rounded-full",
        "border border-[var(--border)] bg-[var(--background)]/70 px-3 py-1.5",
        "font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur-md"
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
        "translate-y-2 opacity-0",
        "transition-[transform,opacity,border-color,color] duration-400 ease-[var(--ease-premium)]",
        "group-hover:translate-y-0 group-hover:opacity-100",
        "group-hover:border-[var(--brand-border)] group-hover:text-[var(--brand)]"
      )}
    >
      <ArrowUpRight className="size-4" />
    </span>
  )
}