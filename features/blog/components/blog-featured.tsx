// features/blog/components/blog-featured.tsx
"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { animate, motion, useMotionValue } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { sectionV, itemV, itemBlurV } from "./blog-variants"
import { BlogCard } from "./blog-card"
import { getFeaturedPosts } from "@/features/marketing/data/blog-data"

/* ── Constants ────────────────────────────────────────────────── */

const AUTOPLAY_INTERVAL     = 5000
const AUTOPLAY_RESUME_DELAY = 4000

type DragInfo = {
  offset:   { x: number; y: number }
  velocity: { x: number; y: number }
}

/* ── Component ────────────────────────────────────────────────── */

export function BlogFeatured() {
  const posts = useMemo(() => getFeaturedPosts(), [])

  const [index, setIndex]               = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [isPaused, setIsPaused]         = useState(false)

  const viewportRef       = useRef<HTMLDivElement>(null)
  const hasSyncedRef      = useRef(false)
  const autoplayTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const preventCardClickRef = useRef(false)
  const preventClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const x = useMotionValue(0)

  /* Responsive */
  const isDesktop  = useMediaQuery("(min-width: 1024px)")
  const isTabletUp = useMediaQuery("(min-width: 640px)")
  const slidesPerView = isDesktop ? 3 : isTabletUp ? 2 : 1
  const maxIndex     = Math.max(0, posts.length - slidesPerView)
  const currentIndex = Math.min(index, maxIndex)

  /* Viewport sizing */
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => setViewportWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stepWidth = viewportWidth / slidesPerView
  const targetX   = -(currentIndex * stepWidth)
  const progress  = maxIndex === 0
    ? 100
    : ((currentIndex + slidesPerView) / posts.length) * 100

  /* Animate to position with smoother easing */
  useEffect(() => {
    if (!stepWidth) return
    if (!hasSyncedRef.current) {
      x.set(targetX)
      hasSyncedRef.current = true
      return
    }
    const controls = animate(x, targetX, {
      duration: 0.8,
      ease: ease.out,
    })
    return () => controls.stop()
  }, [targetX, stepWidth, x])

  /* Cleanup */
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current)      clearInterval(autoplayTimerRef.current)
      if (resumeTimerRef.current)        clearTimeout(resumeTimerRef.current)
      if (preventClickTimeoutRef.current) clearTimeout(preventClickTimeoutRef.current)
    }
  }, [])

  /* Helpers */
  const clampIndex = useCallback(
    (value: number) => Math.max(0, Math.min(value, maxIndex)),
    [maxIndex]
  )

  const goTo = useCallback(
    (value: number) => setIndex(clampIndex(value)),
    [clampIndex]
  )

  const advance = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  /* Autoplay */
  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }, [])

  const startAutoplay = useCallback(() => {
    stopAutoplay()
    if (maxIndex === 0) return
    autoplayTimerRef.current = setInterval(advance, AUTOPLAY_INTERVAL)
  }, [advance, maxIndex, stopAutoplay])

  useEffect(() => {
    if (isPaused || maxIndex === 0) {
      stopAutoplay()
      return
    }
    startAutoplay()
    return stopAutoplay
  }, [isPaused, maxIndex, startAutoplay, stopAutoplay])

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), AUTOPLAY_RESUME_DELAY)
  }, [])

  /* Manual controls */
  const prev = useCallback(() => {
    setIsPaused(true)
    goTo(currentIndex - 1)
    scheduleResume()
  }, [currentIndex, goTo, scheduleResume])

  const next = useCallback(() => {
    setIsPaused(true)
    goTo(currentIndex + 1)
    scheduleResume()
  }, [currentIndex, goTo, scheduleResume])

  /* Drag */
  const releaseClickLock = useCallback(() => {
    if (preventClickTimeoutRef.current) clearTimeout(preventClickTimeoutRef.current)
    preventClickTimeoutRef.current = setTimeout(() => {
      preventCardClickRef.current = false
    }, 140)
  }, [])

  const handleDragStart = useCallback(() => {
    setIsPaused(true)
    preventCardClickRef.current = true
  }, [])

  const handleDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: DragInfo) => {
      releaseClickLock()
      if (!stepWidth) return

      const distanceThreshold = stepWidth * 0.18
      const velocityThreshold = 500

      const projectedIndex = clampIndex(Math.round(-x.get() / stepWidth))
      const draggedFar = Math.abs(info.offset.x) >= distanceThreshold
      const movedFast  = Math.abs(info.velocity.x) >= velocityThreshold

      if (!draggedFar && !movedFast) {
        goTo(currentIndex)
      } else if (info.offset.x < 0 || info.velocity.x < -velocityThreshold) {
        goTo(projectedIndex > currentIndex ? projectedIndex : currentIndex + 1)
      } else if (info.offset.x > 0 || info.velocity.x > velocityThreshold) {
        goTo(projectedIndex < currentIndex ? projectedIndex : currentIndex - 1)
      } else {
        goTo(projectedIndex)
      }

      scheduleResume()
    },
    [clampIndex, currentIndex, goTo, releaseClickLock, scheduleResume, stepWidth, x]
  )

  /* Styles */
  const controlButton = cn(
    "flex size-12 items-center justify-center rounded-full",
    "border border-[var(--border)] bg-[var(--card)]/50 text-[var(--text-muted)]",
    "transition-[border-color,background-color,color,transform] duration-300 ease-[var(--ease-premium)]",
    "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]",
    "active:scale-95",
    "disabled:cursor-not-allowed disabled:opacity-30",
    "disabled:hover:border-[var(--border)] disabled:hover:bg-transparent disabled:hover:text-[var(--text-muted)]"
  )

  if (posts.length === 0) return null

  const canDrag = maxIndex > 0 && stepWidth > 0

  return (
    <section
      id="featured"
      className="relative scroll-mt-24 border-b border-[var(--border)] py-20 md:py-28"
    >
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          {/* Header */}
          <motion.div
            variants={itemBlurV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="flex flex-col gap-4">
              <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]">
                Editor&apos;s picks
              </span>
              <SectionHeading>
                Featured
                <br />
                posts.
              </SectionHeading>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A hand-picked selection of recent essays worth your attention.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            variants={itemV}
            className="mt-14 md:mt-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setIsPaused(false)
              }
            }}
          >
            <div ref={viewportRef} className="overflow-hidden">
              <motion.div
                className={cn(
                  "flex select-none",
                  canDrag && "cursor-grab active:cursor-grabbing"
                )}
                style={{
                  x,
                  width: `${(posts.length * 100) / slidesPerView}%`,
                  touchAction: "pan-y",
                }}
                drag={canDrag ? "x" : false}
                dragConstraints={{ left: -(maxIndex * stepWidth), right: 0 }}
                dragElastic={0.06}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{ width: `${100 / posts.length}%` }}
                  >
                    <BlogCard
                      post={post}
                      shouldPreventNavigation={() => preventCardClickRef.current}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-6">
              <div className="relative h-px flex-1 bg-[var(--border)]">
                <motion.div
                  className="absolute left-0 top-0 h-px bg-[var(--brand)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: ease.smooth }}
                />
              </div>

              <span className="font-medium text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(maxIndex + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  disabled={currentIndex === 0}
                  aria-label="Previous"
                  className={controlButton}
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next"
                  className={controlButton}
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}