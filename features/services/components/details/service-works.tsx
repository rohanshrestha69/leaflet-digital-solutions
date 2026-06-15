// features/services/components/details/service-works.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { animate, motion, useMotionValue } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ServiceProject } from "@/features/marketing/data/services-page"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemV, itemBlurV } from "./service-variants"

export function ServiceWorks({ projects }: { projects: ServiceProject[] }) {
  const [index, setIndex]               = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const viewportRef  = useRef<HTMLDivElement>(null)
  const hasSyncedRef = useRef(false)
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

  const stepWidth = viewportWidth / slidesPerView
  const targetX   = -(currentIndex * stepWidth)
  const progress  = maxIndex === 0 ? 100 : ((currentIndex + 1) / (maxIndex + 1)) * 100

  useEffect(() => {
    if (!stepWidth) return
    if (!hasSyncedRef.current) {
      x.set(targetX)
      hasSyncedRef.current = true
      return
    }
    const controls = animate(x, targetX, { duration: 0.8, ease: ease.out })
    return () => controls.stop()
  }, [targetX, stepWidth, x])

  const controlButton = cn(
    "flex size-12 items-center justify-center rounded-full",
    "border border-[var(--border)] bg-[var(--card)]/50 text-[var(--text-muted)]",
    "transition-[border-color,background-color,color,transform] duration-300 ease-[var(--ease-premium)]",
    "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]",
    "active:scale-95",
    "disabled:cursor-not-allowed disabled:opacity-30",
    "disabled:hover:border-[var(--border)] disabled:hover:bg-transparent disabled:hover:text-[var(--text-muted)]"
  )

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
              Recent work
              <br />
              in this space.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A glimpse of recent projects — each tailored to drive clarity,
              conversion, and lasting brand impact.
            </p>
          </motion.div>

          <motion.div variants={itemV} className="mt-14 md:mt-20">
            <div ref={viewportRef} className="overflow-hidden">
              <motion.div
                className="flex"
                style={{
                  x,
                  width: `${(projects.length * 100) / slidesPerView}%`,
                }}
              >
                {projects.map((p) => (
                  <div
                    key={p.name}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{ width: `${100 / projects.length}%` }}
                  >
                    <article className="group">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] transition-[border-color] duration-300 group-hover:border-[var(--border-strong)]">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={1200}
                          height={900}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.05]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-heading text-[20px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] md:text-[24px]">
                          {p.name}
                          <span className="text-[var(--text-muted)]"> — {p.year}</span>
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-2.5 py-1 font-medium text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </motion.div>
            </div>

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
                  onClick={() => setIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  aria-label="Previous"
                  className={controlButton}
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex(Math.min(maxIndex, currentIndex + 1))}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next"
                  className={controlButton}
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemV}
            className="mt-12 flex justify-center"
          >
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
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}