"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, type Variants } from "motion/react"

import { ProcessWheel } from "@/components/methodology/process-wheel"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { processSteps } from "@/features/marketing/data/process"
import { premiumEase, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const AUTO_INTERVAL = 4500

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

const listContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
}

const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
}

const wheelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: premiumEase, delay: 0.25 },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function getRotationForIndex(index: number, stepSize: number) {
  return -(index * stepSize + stepSize / 2)
}

function closestRotation(previous: number, next: number) {
  let target = next
  while (target - previous > 180) target -= 360
  while (target - previous < -180) target += 360
  return target
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function MethodologySection() {
  const stepSize = useMemo(() => 360 / processSteps.length, [])
  const initialRotation = useMemo(
    () => getRotationForIndex(0, stepSize),
    [stepSize]
  )

  const [wheelState, setWheelState] = useState({
    activeIndex: 0,
    rotationAngle: initialRotation,
  })
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const selectStep = useCallback(
    (nextIndex: number) => {
      setWheelState((current) => {
        if (nextIndex === current.activeIndex) return current
        const targetRotation = getRotationForIndex(nextIndex, stepSize)
        return {
          activeIndex: nextIndex,
          rotationAngle: closestRotation(current.rotationAngle, targetRotation),
        }
      })
    },
    [stepSize]
  )

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    stopTimer()
    if (paused) return

    timerRef.current = setInterval(() => {
      setWheelState((current) => {
        const nextIndex = (current.activeIndex + 1) % processSteps.length
        const targetRotation = getRotationForIndex(nextIndex, stepSize)
        return {
          activeIndex: nextIndex,
          rotationAngle: closestRotation(current.rotationAngle, targetRotation),
        }
      })
    }, AUTO_INTERVAL)

    return stopTimer
  }, [paused, stepSize, stopTimer])

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[var(--background)] py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          {/* Header */}
          <motion.div
            variants={headerVariants}
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

          {/* Content grid */}
          <div className="mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(480px,0.95fr)] lg:gap-16">
            {/* Step list */}
            <motion.ol
              variants={listContainer}
              className="flex flex-col border-t border-[var(--border)]"
            >
              {processSteps.map((step, index) => {
                const isActive = index === wheelState.activeIndex

                return (
                  <motion.li key={step.id} variants={listItem}>
                    <button
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "group relative flex w-full items-start gap-5 border-b border-[var(--border)] py-6 text-left",
                        "transition-colors duration-500 ease-[var(--ease-premium)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)]/40"
                      )}
                    >
                      {/* Active underline */}
                      <span
                        className={cn(
                          "pointer-events-none absolute bottom-[-1px] left-0 h-px bg-[var(--brand)] transition-all duration-700 ease-[var(--ease-premium)]",
                          isActive ? "w-full" : "w-0"
                        )}
                      />

                      {/* Number */}
                      <span
                        className={cn(
                          "mt-1 font-medium text-[12px] tabular-nums tracking-[0.18em] transition-colors duration-500",
                          isActive
                            ? "text-[var(--brand)]"
                            : "text-[var(--text-subtle)] group-hover:text-[var(--brand)]"
                        )}
                      >
                        {step.index}
                      </span>

                      {/* Title + description */}
                      <span className="flex-1">
                        <span
                          className={cn(
                            "block font-heading text-[20px] font-semibold tracking-tight transition-colors duration-500 md:text-[24px]",
                            isActive
                              ? "text-[var(--text)]"
                              : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                          )}
                        >
                          {step.label}
                        </span>

                        {/* Smoothly expanding description */}
                        <span
                          className={cn(
                            "grid transition-all duration-500 ease-[var(--ease-premium)]",
                            isActive
                              ? "mt-3 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          )}
                        >
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
              variants={wheelVariants}
              className="flex items-center justify-center"
            >
              <ProcessWheel
                steps={processSteps}
                activeIndex={wheelState.activeIndex}
                rotationAngle={wheelState.rotationAngle}
                onSelect={selectStep}
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}