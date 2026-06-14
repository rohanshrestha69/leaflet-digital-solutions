// features/projects/components/project-row.tsx
"use client"

import { useRef, useCallback } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { premiumEase } from "@/lib/motion"
import { Project } from "@/features/marketing/data/projects-page"

type ProjectRowProps = {
  project: Project
  index: number
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnter = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
  }, [])

  const handleLeave = useCallback(() => {
    videoRef.current?.pause()
  }, [])

  const Wrapper = project.href ? Link : "div"
  const wrapperProps = project.href ? { href: project.href } : {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: premiumEase }}
    >
      <Wrapper
        {...(wrapperProps as { href: string })}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn(
          "group flex items-center justify-between gap-4 py-5 md:gap-6 md:py-6",
          project.href && "cursor-pointer"
        )}
      >
        {/* Left: thumbnail + title */}
        <div className="flex min-w-0 items-center gap-4 md:gap-5">
          {/* Thumbnail */}
          <div
            className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)]"
            style={{ background: project.tone ?? "var(--card)" }}
          >
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                "transition-opacity duration-500 ease-[var(--ease-premium)]",
                project.video && "group-hover:opacity-0"
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
                className={cn(
                  "absolute inset-0 h-full w-full object-cover opacity-0",
                  "transition-opacity duration-500 ease-[var(--ease-premium)]",
                  "group-hover:opacity-100"
                )}
              />
            )}
          </div>

          {/* Title */}
          <h3
            className={cn(
              "min-w-0 truncate font-heading text-[18px] font-semibold tracking-tight text-[var(--text)] md:text-[24px]",
              "transition-colors duration-300",
              "group-hover:text-white"
            )}
          >
            {project.title}
            <span className="text-[var(--text-muted)]"> — {project.year}</span>
          </h3>
        </div>

        {/* Right: tags + arrow */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-sm",
                  "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]",
                  "transition-colors duration-300",
                  "group-hover:border-[var(--border-strong)] group-hover:text-[var(--text-soft)]"
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              "border border-[var(--border)] bg-transparent",
              "text-[var(--text-muted)]",
              "transition-all duration-300",
              "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              "group-hover:border-[var(--brand-border)] group-hover:bg-[var(--brand-soft)] group-hover:text-[var(--brand)]"
            )}
          >
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </Wrapper>
    </motion.div>
  )
}