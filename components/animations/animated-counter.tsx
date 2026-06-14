"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type AnimatedCounterProps = {
  value: string
  duration?: number
  className?: string
  once?: boolean
}

type ParsedValue = {
  prefix: string
  suffix: string
  target: number
  decimals: number
}

function parseValue(value: string): ParsedValue | null {
  if (!value) return null

  // Match first valid number (supports commas + decimals)
  const match = value.match(/-?\d[\d,]*(\.\d+)?/)
  if (!match) return null

  const raw = match[0]
  const numeric = Number(raw.replace(/,/g, ""))

  if (!Number.isFinite(numeric)) return null

  const start = match.index ?? 0

  return {
    prefix: value.slice(0, start),
    suffix: value.slice(start + raw.length),
    target: numeric,
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
  }
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function AnimatedCounter({
  value,
  duration = 1600,
  className,
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const startedRef = useRef(false)

  const parsed = useMemo(() => parseValue(value), [value])

  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!parsed || !ref.current) return

    const element = ref.current

    const animate = () => {
      if (once && startedRef.current) return

      startedRef.current = true

      const start = performance.now()

      const update = (time: number) => {
        const elapsed = time - start
        const progress = Math.min(elapsed / duration, 1)

        const eased = easeOutCubic(progress)
        const nextValue = parsed.target * eased

        setDisplayValue(nextValue)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(update)
        } else {
          setDisplayValue(parsed.target)
        }
      }

      frameRef.current = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate()

          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          startedRef.current = false
        }
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [parsed, duration, once])

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  const formatted =
    parsed.decimals > 0
      ? displayValue.toFixed(parsed.decimals)
      : Math.round(displayValue).toLocaleString()

  return (
    <span
      ref={ref}
      className={className}
      aria-label={value}
    >
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  )
}