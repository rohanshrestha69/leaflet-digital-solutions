"use client"

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { premiumEase } from "@/lib/motion"
import type { Project } from "@/features/marketing/data/projects-page"
import Image from "next/image"

type ProjectCardProps = {
  project: Project
  index?: number
  priority?: boolean
  /**
   * `default` — full size, used on projects page
   * `compact` — slightly tighter typography for homepage grid / carousel
   */
  size?: "default" | "compact"
  /** Disable the in-view animation (parent handles it) */
  disableAnimation?: boolean
  className?: string
  /** Limit visible tags when needed */
  maxTags?: number
  /** Prevent navigation when parent carousel is dragging */
  shouldPreventNavigation?: () => boolean
}

export function ProjectCard({
  project,
  index = 0,
  priority = false,
  size = "default",
  disableAnimation = false,
  className,
  maxTags,
  shouldPreventNavigation,
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const playTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)
  const draggedRef = useRef(false)

  useEffect(() => {
    return () => {
      if (playTimeout.current) {
        clearTimeout(playTimeout.current)
      }

      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  const handleEnter = useCallback(() => {
    if (!project.video || !videoRef.current) return

    playTimeout.current = setTimeout(() => {
      const v = videoRef.current
      if (!v) return
      v.currentTime = 0
      v.play().catch(() => {})
    }, 100)
  }, [project.video])

  const handleLeave = useCallback(() => {
    if (playTimeout.current) {
      clearTimeout(playTimeout.current)
      playTimeout.current = null
    }

    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

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

      if (dx > 8 || dy > 8) {
        draggedRef.current = true
      }
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

  const isInteractive = Boolean(project.href)
  const Wrapper = isInteractive ? Link : "div"
  const wrapperProps = isInteractive ? { href: project.href! } : {}

  const titleSize =
    size === "compact"
      ? "text-[18px] md:text-[22px]"
      : "text-[22px] md:text-[26px]"

  const titleSpacing = size === "compact" ? "mt-4" : "mt-5"

  const tagSize =
    size === "compact"
      ? "px-2.5 py-1 text-[9px]"
      : "px-3 py-1.5 text-[10px]"

  const visibleTags =
    typeof maxTags === "number" ? project.tags.slice(0, maxTags) : project.tags

  const inner = (
    <Wrapper
      {...(wrapperProps as { href: string })}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onPointerDownCapture={handlePointerDownCapture}
      onPointerMoveCapture={handlePointerMoveCapture}
      onPointerUpCapture={clearPointer}
      onPointerCancelCapture={clearPointer}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
      className={cn("block", isInteractive && "cursor-pointer", className)}
    >
      {/* Media */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]",
          "aspect-[16/10]",
          "transition-colors duration-400 ease-[var(--ease-premium)]",
          "group-hover:border-[var(--border-strong)]"
        )}
        style={{ background: project.tone ?? "var(--card)" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={500}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-all duration-700 ease-[var(--ease-premium)]",
            "group-hover:scale-[1.03]",
            videoReady && project.video ? "group-hover:opacity-0" : ""
          )}
        />

        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            draggable={false}
            onCanPlay={() => setVideoReady(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover opacity-0",
              "transition-opacity duration-500 ease-[var(--ease-premium)]",
              videoReady && "group-hover:opacity-100"
            )}
          />
        )}

        <div
          aria-hidden
          className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
        />

        <div
          aria-hidden
          className={cn(
            "absolute right-4 top-4 flex size-9 items-center justify-center rounded-full",
            "border border-white/[0.1] bg-[var(--background)]/70 backdrop-blur-md",
            "text-[var(--text-soft)]",
            "translate-y-2 opacity-0 transition-all duration-400 ease-[var(--ease-premium)]",
            "group-hover:translate-y-0 group-hover:opacity-100",
            "group-hover:border-[var(--brand-border)] group-hover:text-[var(--brand)]"
          )}
        >
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Title + tags */}
      <div
        className={cn(
          "flex flex-wrap items-baseline justify-between gap-3",
          titleSpacing
        )}
      >
        <h3
          className={cn(
            "font-heading font-semibold tracking-tight text-[var(--text)]",
            "transition-colors duration-300",
            "group-hover:text-white",
            titleSize
          )}
        >
          {project.title}
          <span className="text-[var(--text-muted)]"> — {project.year}</span>
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-sm",
                "font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]",
                "transition-colors duration-300",
                "group-hover:border-[var(--border-strong)] group-hover:text-[var(--text-soft)]",
                tagSize
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  )

  if (disableAnimation) {
    return <div className="group">{inner}</div>
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: (index % 2) * 0.08,
        ease: premiumEase,
      }}
      className="group"
    >
      {inner}
    </motion.article>
  )
}