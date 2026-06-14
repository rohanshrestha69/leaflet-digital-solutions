"use client"

import { useRef, useEffect, useState, useMemo, useSyncExternalStore } from "react"
import { motion } from "motion/react"

type TextHoverEffectProps = {
  text: string
  duration?: number
  strokeWidth?: number
  className?: string
}

const FONT_SIZE = 64
const HEIGHT = FONT_SIZE * 1.5
const PADDING = 8
const LETTER_SPACING = 3
const FONT_FAMILY = "Helvetica Neue, Helvetica, Arial, sans-serif"

const estimateWidth = (text: string) =>
  text.length * FONT_SIZE * 0.6 + Math.max(0, text.length - 1) * LETTER_SPACING

const measureTextWidth = (text: string): number => {
  try {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return estimateWidth(text)
    ctx.font = `700 ${FONT_SIZE}px ${FONT_FAMILY}`
    return ctx.measureText(text).width + Math.max(0, text.length - 1) * LETTER_SPACING
  } catch {
    return estimateWidth(text)
  }
}

// External store: tracks whether fonts are ready.
// useSyncExternalStore handles SSR + hydration correctly without setState-in-effect.
const fontStore = {
  ready: false,
  listeners: new Set<() => void>(),
  init() {
    if (typeof document === "undefined") return
    if (this.ready) return
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        this.ready = true
        this.listeners.forEach((l) => l())
      })
    } else {
      // No Font Loading API — assume ready
      this.ready = true
    }
  },
  subscribe(listener: () => void) {
    this.listeners.add(listener)
    this.init()
    return () => {
      this.listeners.delete(listener)
    }
  },
  getSnapshot() {
    return this.ready
  },
  getServerSnapshot() {
    return false
  },
}

export function TextHoverEffect({
  text,
  duration = 0,
  strokeWidth = 0.4,
  className,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  // Returns false during SSR + first client render, true after hydration / fonts ready.
  // No setState in effect — useSyncExternalStore subscribes properly.
  const fontsReady = useSyncExternalStore(
    fontStore.subscribe.bind(fontStore),
    fontStore.getSnapshot.bind(fontStore),
    fontStore.getServerSnapshot.bind(fontStore)
  )

  const textWidth = useMemo(() => {
    if (!fontsReady) return estimateWidth(text)
    return measureTextWidth(text)
  }, [text, fontsReady])

  const totalWidth = textWidth + PADDING * 2
  const cx = totalWidth / 2
  const cy = HEIGHT / 2
  const viewBox = `0 0 ${totalWidth} ${HEIGHT}`

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const cxPercent = ((cursor.x - rect.left) / rect.width) * 100
    const cyPercent = ((cursor.y - rect.top) / rect.height) * 100
    setMaskPosition({ cx: `${cxPercent}%`, cy: `${cyPercent}%` })
  }, [cursor])

  const textProps = {
    x: cx,
    y: cy,
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    letterSpacing: String(LETTER_SPACING),
  }

  return (
    <div className={`w-full overflow-hidden ${className ?? ""}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        onTouchMove={(e) => {
          const t = e.touches[0]
          setCursor({ x: t.clientX, y: t.clientY })
        }}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        style={{
          userSelect: "none",
          touchAction: "none",
          display: "block",
        }}
      >
        <defs>
          <linearGradient
            id="textHoverGradient"
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={totalWidth}
            y2={0}
          >
            {hovered && (
              <>
                <stop offset="0%"   stopColor="#f88221" />
                <stop offset="25%"  stopColor="#ff9a44" />
                <stop offset="50%"  stopColor="#e97012" />
                <stop offset="75%"  stopColor="#ffb876" />
                <stop offset="100%" stopColor="#f88221" />
              </>
            )}
          </linearGradient>

          <motion.radialGradient
            id="textHoverRevealMask"
            gradientUnits="userSpaceOnUse"
            r="30%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskPosition}
            transition={{ duration, ease: "easeOut" }}
          >
            <stop offset="0%"   stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="textHoverMask">
            <rect
              x={0}
              y={0}
              width={totalWidth}
              height={HEIGHT}
              fill="url(#textHoverRevealMask)"
            />
          </mask>
        </defs>

        {/* Base ghost outline */}
        <text
          {...textProps}
          fill="transparent"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
        >
          {text}
        </text>

        {/* Animated stroke draw-on */}
        <motion.text
          {...textProps}
          fill="transparent"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
          initial={{ strokeDashoffset: 3000, strokeDasharray: 3000 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 3000 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          {text}
        </motion.text>

        {/* Hover brightened outline */}
        <text
          {...textProps}
          fill="transparent"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth={strokeWidth}
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {text}
        </text>

        {/* Gradient stroke revealed by cursor */}
        <text
          {...textProps}
          fill="transparent"
          stroke="url(#textHoverGradient)"
          strokeWidth={strokeWidth}
          mask="url(#textHoverMask)"
        >
          {text}
        </text>
      </svg>
    </div>
  )
}