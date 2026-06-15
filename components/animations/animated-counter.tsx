// components/animations/animated-counter.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type ParsedValue = {
  prefix:   string
  suffix:   string
  target:   number
  decimals: number
}

function parse(value: string): ParsedValue | null {
  if (!value) return null
  const match = value.match(/-?\d[\d,]*(\.\d+)?/)
  if (!match) return null
  const raw     = match[0]!
  const numeric = Number(raw.replace(/,/g, ""))
  if (!Number.isFinite(numeric)) return null
  const start = match.index ?? 0
  return {
    prefix:   value.slice(0, start),
    suffix:   value.slice(start + raw.length),
    target:   numeric,
    decimals: raw.includes(".") ? raw.split(".")[1]!.length : 0,
  }
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

type AnimatedCounterProps = {
  value:     string
  duration?: number
  className?: string
  once?:     boolean
}

export function AnimatedCounter({
  value,
  duration = 1800,
  className,
  once     = true,
}: AnimatedCounterProps) {
  const ref       = useRef<HTMLSpanElement>(null)
  const frameRef  = useRef<number | null>(null)
  const startedRef = useRef(false)
  const parsed    = useMemo(() => parse(value), [value])
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!parsed || !ref.current) return

    const el = ref.current

    const run = () => {
      if (once && startedRef.current) return
      startedRef.current = true
      const start = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        setDisplay(parsed.target * easeOutExpo(progress))
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick)
        } else {
          setDisplay(parsed.target)
        }
      }
      frameRef.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          run()
          if (once) observer.disconnect()
        } else if (!once) {
          startedRef.current = false
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [parsed, duration, once])

  if (!parsed) return <span ref={ref} className={className}>{value}</span>

  const formatted =
    parsed.decimals > 0
      ? display.toFixed(parsed.decimals)
      : Math.round(display).toLocaleString()

  return (
    <span ref={ref} className={className} aria-label={value}>
      {parsed.prefix}{formatted}{parsed.suffix}
    </span>
  )
}