// features/projects/components/project-row.tsx
"use client"

import { useCallback, useRef } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { Project } from "@/features/marketing/data/projects-page"

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

  const Wrapper      = project.href ? Link : "div"
  const wrapperProps = project.href ? { href: project.href } : {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: ease.out }}
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
        <div className="flex min-w-0 items-center gap-4 md:gap-5">
          <div
            className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] transition-[border-color] duration-300 group-hover:border-[var(--border-strong)]"
            style={{ background: project.tone ?? "var(--card)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                "transition-[transform,opacity] duration-500 ease-[var(--ease-premium)]",
                "group-hover:scale-[1.06]",
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

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-sm",
                  "px-3 py-1.5 font-medium text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]",
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
              "border border-[var(--border)] bg-transparent text-[var(--text-muted)]",
              "transition-[transform,border-color,background-color,color] duration-300 ease-[var(--ease-premium)]",
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