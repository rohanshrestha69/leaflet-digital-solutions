// features/services/components/featured-projects-carousel.tsx
"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Link from "next/link"
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { ProjectCard } from "@/features/projects/components/project-card"
import { getFeaturedProjects } from "@/features/marketing/data/projects-page"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

type DragInfo = {
  offset:   { x: number; y: number }
  velocity: { x: number; y: number }
}

export function FeaturedProjectsCarousel() {
  const projects = useMemo(
    () =>
      getFeaturedProjects(6).map((project) => ({
        ...project,
        href: project.href ?? `/work/${project.slug}`,
      })),
    []
  )

  const [index, setIndex]                 = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)

  const viewportRef            = useRef<HTMLDivElement>(null)
  const hasSyncedRef           = useRef(false)
  const preventCardClickRef    = useRef(false)
  const preventClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const x = useMotionValue(0)

  const isTabletUp    = useMediaQuery("(min-width: 640px)")
  const slidesPerView = isTabletUp ? 2 : 1
  const maxIndex      = Math.max(0, projects.length - slidesPerView)
  const currentIndex  = Math.min(index, maxIndex)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => setViewportWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (preventClickTimeoutRef.current) clearTimeout(preventClickTimeoutRef.current)
    }
  }, [])

  const stepWidth      = viewportWidth / slidesPerView
  const targetX        = -(currentIndex * stepWidth)
  const totalDragRange = maxIndex * stepWidth

  const indicatorLeft = useTransform(x, (value) => {
    if (totalDragRange === 0) return "0%"
    const progress         = Math.max(0, Math.min(1, -value / totalDragRange))
    const segmentWidthPct  = 100 / (maxIndex + 1)
    const maxLeftPct       = 100 - segmentWidthPct
    return `${progress * maxLeftPct}%`
  })

  const indicatorWidth = `${100 / (maxIndex + 1)}%`

  const clampIndex = useCallback(
    (value: number) => Math.max(0, Math.min(value, maxIndex)),
    [maxIndex]
  )

  const goTo = useCallback((v: number) => setIndex(clampIndex(v)), [clampIndex])
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])

  useEffect(() => {
    if (!stepWidth) return
    if (!hasSyncedRef.current) {
      x.set(targetX)
      hasSyncedRef.current = true
      return
    }
    const controls = animate(x, targetX, { duration: 0.85, ease: ease.out })
    return () => controls.stop()
  }, [targetX, stepWidth, x])

  const releaseClickLock = useCallback(() => {
    if (preventClickTimeoutRef.current) clearTimeout(preventClickTimeoutRef.current)
    preventClickTimeoutRef.current = setTimeout(() => {
      preventCardClickRef.current = false
    }, 140)
  }, [])

  const handleDragStart = useCallback(() => {
    preventCardClickRef.current = true
  }, [])

  const handleDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: DragInfo) => {
      releaseClickLock()
      if (!stepWidth) return

      const distanceThreshold = stepWidth * 0.18
      const velocityThreshold = 500

      const projectedIndex = clampIndex(Math.round(-x.get() / stepWidth))
      const draggedFar     = Math.abs(info.offset.x) >= distanceThreshold
      const movedFast      = Math.abs(info.velocity.x) >= velocityThreshold

      if (!draggedFar && !movedFast) {
        goTo(currentIndex)
        return
      }

      if (info.offset.x < 0 || info.velocity.x < -velocityThreshold) {
        goTo(projectedIndex > currentIndex ? projectedIndex : currentIndex + 1)
        return
      }

      if (info.offset.x > 0 || info.velocity.x > velocityThreshold) {
        goTo(projectedIndex < currentIndex ? projectedIndex : currentIndex - 1)
        return
      }

      goTo(projectedIndex)
    },
    [clampIndex, currentIndex, goTo, releaseClickLock, stepWidth, x]
  )

  const controlButton = cn(
    "flex size-12 items-center justify-center rounded-full",
    "border border-[var(--border)] bg-[var(--card)]/50 text-[var(--text-muted)]",
    "backdrop-blur-sm",
    "transition-[border-color,background-color,color,transform] duration-300 ease-[var(--ease-premium)]",
    "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]",
    "active:scale-95",
    "disabled:cursor-not-allowed disabled:opacity-30",
    "disabled:hover:border-[var(--border)] disabled:hover:bg-transparent disabled:hover:text-[var(--text-muted)]"
  )

  return (
    <div
      className="flex flex-col gap-8"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          className="flex cursor-grab select-none active:cursor-grabbing"
          style={{
            x,
            width: `${(projects.length * 100) / slidesPerView}%`,
            touchAction: "pan-y",
          }}
          drag={maxIndex > 0 && stepWidth > 0 ? "x" : false}
          dragConstraints={{ left: -(maxIndex * stepWidth), right: 0 }}
          dragElastic={0.06}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="shrink-0 px-2.5 sm:px-3"
              style={{ width: `${100 / projects.length}%` }}
            >
              <ProjectCard
                project={project}
                size="compact"
                disableAnimation
                maxTags={2}
                shouldPreventNavigation={() => preventCardClickRef.current}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative h-px flex-1 bg-[var(--border)]">
          <motion.div
            className="absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[var(--text)]"
            style={{ left: indicatorLeft, width: indicatorWidth }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous project"
            className={controlButton}
          >
            <ArrowLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={currentIndex >= maxIndex}
            aria-label="Next project"
            className={controlButton}
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="-mt-4 flex justify-start">
        <span
          aria-live="polite"
          className="font-medium text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]"
        >
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(maxIndex + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex justify-center pt-2">
        <Link
          href="/work"
          className={cn(
            buttonVariants({ variant: "orange", size: "lg" }),
            "group gap-2"
          )}
        >
          All projects
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  )
}