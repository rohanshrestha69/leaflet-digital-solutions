// features/marketing/components/process-section.tsx
"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, type Variants } from "motion/react"

import { ProcessWheel } from "@/components/methodology/process-wheel"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { processSteps } from "@/features/marketing/data/process"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

const AUTO_INTERVAL = 4500

/* ── Variants ─────────────────────────────────────────────────────── */

const sectionV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const headerV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
}

const listV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
}

const listItemV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
}

const wheelV: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.85, ease: ease.out, delay: 0.2 } },
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function getRotation(index: number, stepSize: number) {
  return -(index * stepSize + stepSize / 2)
}

function closestRotation(prev: number, next: number) {
  let target = next
  while (target - prev > 180)  target -= 360
  while (target - prev < -180) target += 360
  return target
}

/* ── Component ────────────────────────────────────────────────────── */

export function ProcessSection() {
  const stepSize = useMemo(() => 360 / processSteps.length, [])

  const [state, setState] = useState({
    activeIndex:   0,
    rotationAngle: getRotation(0, stepSize),
  })
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const selectStep = useCallback(
    (next: number) => {
      setState((cur) => {
        if (next === cur.activeIndex) return cur
        return {
          activeIndex:   next,
          rotationAngle: closestRotation(cur.rotationAngle, getRotation(next, stepSize)),
        }
      })
    },
    [stepSize],
  )

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (paused) return

    timerRef.current = setInterval(() => {
      setState((cur) => {
        const next = (cur.activeIndex + 1) % processSteps.length
        return {
          activeIndex:   next,
          rotationAngle: closestRotation(cur.rotationAngle, getRotation(next, stepSize)),
        }
      })
    }, AUTO_INTERVAL)

    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, stepSize])

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[var(--background)] py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
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
            variants={headerV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              A proven methodology
              <br />
              for consistent results
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              From strategy to launch — every step is engineered for clarity,
              scale, and conversion.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(480px,0.95fr)] lg:gap-16">

            {/* Step list */}
            <motion.ol
              variants={listV}
              className="flex flex-col border-t border-[var(--border)]"
            >
              {processSteps.map((step, i) => {
                const isActive = i === state.activeIndex

                return (
                  <motion.li key={step.id} variants={listItemV}>
                    <button
                      type="button"
                      onClick={() => selectStep(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "group relative flex w-full items-start gap-5 border-b border-[var(--border)] py-6 text-left",
                        "transition-colors duration-500 ease-[var(--ease-premium)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)]/40",
                      )}
                    >
                      {/* Active underline — animated scaleX */}
                      <motion.span
                        className="pointer-events-none absolute bottom-[-1px] left-0 h-px bg-[var(--brand)]"
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.65, ease: ease.inOut }}
                        style={{ originX: 0, width: "100%" }}
                      />

                      <span className={cn(
                        "mt-1 font-medium text-[12px] tabular-nums tracking-[0.18em] transition-colors duration-500",
                        isActive ? "text-[var(--brand)]" : "text-[var(--text-subtle)] group-hover:text-[var(--brand)]",
                      )}>
                        {step.index}
                      </span>

                      <span className="flex-1">
                        <span className={cn(
                          "block font-heading text-[20px] font-semibold tracking-tight transition-colors duration-500 md:text-[24px]",
                          isActive ? "text-[var(--text)]" : "text-[var(--text-muted)] group-hover:text-[var(--text)]",
                        )}>
                          {step.label}
                        </span>

                        {/* CSS grid-rows expansion — more performant than height:auto */}
                        <span className={cn(
                          "grid transition-all duration-500 ease-[var(--ease-premium)]",
                          isActive ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}>
                          <span className="min-h-0 overflow-hidden">
                            <span className="block max-w-xl text-[14px] leading-relaxed text-[var(--text-muted)]">
                              {step.description}
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </motion.li>
                )
              })}
            </motion.ol>

            {/* Wheel */}
            <motion.div
              variants={wheelV}
              className="flex items-center justify-center"
            >
              <ProcessWheel
                steps={processSteps}
                activeIndex={state.activeIndex}
                rotationAngle={state.rotationAngle}
                onSelect={selectStep}
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}