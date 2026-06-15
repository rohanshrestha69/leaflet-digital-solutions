// components/ui/magnetic-button.tsx
"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Pre-create motion elements at module scope                         */
/* ------------------------------------------------------------------ */

const MotionButton = motion.create("button")
const MotionAnchor = motion.create("a")
const MotionDiv    = motion.create("div")

/* ------------------------------------------------------------------ */
/*  useHasHover — uses useSyncExternalStore (no cascading renders)    */
/* ------------------------------------------------------------------ */

const HOVER_QUERY = "(hover: hover) and (pointer: fine)"

function subscribeHover(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const mq = window.matchMedia(HOVER_QUERY)
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

function getHoverSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches
}

function getServerHoverSnapshot() {
  return false
}

function useHasHover(): boolean {
  return useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    getServerHoverSnapshot,
  )
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MagneticTag = "button" | "a" | "div"

type MagneticButtonProps = {
  children:       ReactNode
  className?:     string
  /** How strongly the shell follows the cursor (0–1) */
  strength?:      number
  /** Multiplier for inner content movement relative to shell */
  innerStrength?: number
  /** Enable magnetic drag on touch devices (default true) */
  touchMagnetic?: boolean
  /** Force-disable magnetic effect entirely */
  disabled?:      boolean
  as?:            MagneticTag
} & (
  | ({ as?: "button" } & Omit<HTMLMotionProps<"button">, "ref" | "style" | "className" | "children">)
  | ({ as:  "a"      } & Omit<HTMLMotionProps<"a">,      "ref" | "style" | "className" | "children">)
  | ({ as:  "div"    } & Omit<HTMLMotionProps<"div">,    "ref" | "style" | "className" | "children">)
)

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MagneticButton({
  children,
  className,
  strength      = 0.25,
  innerStrength = 1.5,
  touchMagnetic = true,
  disabled:     forceDisabled = false,
  as: tag       = "button",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const isPressedRef = useRef(false)

  const hasHover = useHasHover()
  const enabled  = !forceDisabled && (hasHover || touchMagnetic)

  /* ── Motion values ────────────────────────────────────────────── */
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springCfg = { stiffness: 180, damping: 18, mass: 0.1 }
  const springX   = useSpring(x, springCfg)
  const springY   = useSpring(y, springCfg)

  const innerX = useTransform(springX, (v) => (enabled ? v * innerStrength : 0))
  const innerY = useTransform(springY, (v) => (enabled ? v * innerStrength : 0))

  /* ── Core pull logic ──────────────────────────────────────────── */
  const pullToward = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled || !ref.current) return
      const rect    = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width  / 2
      const centerY = rect.top  + rect.height / 2
      x.set((clientX - centerX) * strength)
      y.set((clientY - centerY) * strength)
    },
    [enabled, strength, x, y],
  )

  const release = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  /* ── Mouse (hover-capable devices) ─────────────────────────────── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!hasHover) return
      pullToward(e.clientX, e.clientY)
    },
    [hasHover, pullToward],
  )

  const handleMouseLeave = useCallback(() => {
    if (!hasHover) return
    release()
  }, [hasHover, release])

  /* ── Touch / pointer drag (mobile magnetic) ────────────────────── */
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || hasHover || !touchMagnetic) return

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return
      isPressedRef.current = true
      pullToward(e.clientX, e.clientY)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isPressedRef.current) return
      pullToward(e.clientX, e.clientY)
    }

    const onPointerUp = () => {
      if (!isPressedRef.current) return
      isPressedRef.current = false
      release()
    }

    el.addEventListener("pointerdown",   onPointerDown, { passive: true })
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerup",   onPointerUp,   { passive: true })
    window.addEventListener("pointercancel", onPointerUp, { passive: true })

    return () => {
      el.removeEventListener("pointerdown",     onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup",   onPointerUp)
      window.removeEventListener("pointercancel", onPointerUp)
    }
  }, [enabled, hasHover, touchMagnetic, pullToward, release])

  /* ── Inner content ────────────────────────────────────────────── */
  const innerSpan = (
    <motion.span
      style={{ x: innerX, y: innerY }}
      className="flex h-full w-full items-center justify-center"
    >
      {children}
    </motion.span>
  )

  /* ── Shared props ─────────────────────────────────────────────── */
  const sharedProps = {
    onMouseMove:  handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap:     { scale: 0.96 } as const,
    className:    cn(
      "relative inline-block cursor-pointer align-middle select-none",
      className,
    ),
    style: enabled
      ? {
          x: springX,
          y: springY,
          touchAction: "manipulation" as const,
        }
      : undefined,
  }

  /* ── Render by tag ─────────────────────────────────────────────── */
  if (tag === "a") {
    const { as: _as, disabled: _d, touchMagnetic: _tm, ...anchorRest } =
      rest as { as?: MagneticTag; disabled?: boolean; touchMagnetic?: boolean } & HTMLMotionProps<"a">
    return (
      <MotionAnchor
        {...anchorRest}
        {...sharedProps}
        // @ts-expect-error — polymorphic ref is safe at runtime
        ref={ref}
      >
        {innerSpan}
      </MotionAnchor>
    )
  }

  if (tag === "div") {
    const { as: _as, disabled: _d, touchMagnetic: _tm, ...divRest } =
      rest as { as?: MagneticTag; disabled?: boolean; touchMagnetic?: boolean } & HTMLMotionProps<"div">
    return (
      <MotionDiv
        {...divRest}
        {...sharedProps}
        // @ts-expect-error — polymorphic ref is safe at runtime
        ref={ref}
      >
        {innerSpan}
      </MotionDiv>
    )
  }

  const { as: _as, disabled: _d, touchMagnetic: _tm, ...buttonRest } =
    rest as { as?: MagneticTag; disabled?: boolean; touchMagnetic?: boolean } & HTMLMotionProps<"button">
  return (
    <MotionButton
      {...buttonRest}
      {...sharedProps}
      // @ts-expect-error — polymorphic ref is safe at runtime
      ref={ref}
    >
      {innerSpan}
    </MotionButton>
  )
}