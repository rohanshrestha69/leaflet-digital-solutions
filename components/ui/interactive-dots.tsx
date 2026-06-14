"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type InteractiveDotsProps = {
  className?: string
  /** Distance between dot centers in px */
  gap?: number
  /** Base dot radius in px */
  dotRadius?: number
  /** Radius of the cursor light-up area in px */
  lightRadius?: number
  /** Brand color as [R, G, B] */
  color?: [number, number, number]
  /** Opacity of dots outside the light */
  baseOpacity?: number
  /** Peak opacity of dots at cursor center */
  maxOpacity?: number
  /** Fade-out duration in ms after pointer leaves */
  fadeDuration?: number
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const OFFSCREEN = -10_000
const TWO_PI = Math.PI * 2

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v
}

function expDecay(dt: number, smoothing: number): number {
  return 1 - Math.exp(-dt / smoothing)
}

function smoothStep(t: number): number {
  return t * t * (3 - 2 * t)
}

/* ------------------------------------------------------------------ */
/*  Environment — all canvas/context state in one place               */
/* ------------------------------------------------------------------ */

interface Env {
  canvasEl: HTMLCanvasElement
  parentEl: HTMLElement
  sectionEl: HTMLElement
  mainCtx: CanvasRenderingContext2D
  baseCanvas: HTMLCanvasElement
  baseCtx: CanvasRenderingContext2D
}

function acquireEnv(canvas: HTMLCanvasElement): Env | null {
  const parentEl = canvas.parentElement
  if (!parentEl) return null

  const sectionEl =
    (parentEl.closest("section") as HTMLElement | null) ?? parentEl

  const mainCtx = canvas.getContext("2d", { alpha: true })
  if (!mainCtx) return null

  const baseCanvas = document.createElement("canvas")
  const baseCtx = baseCanvas.getContext("2d", { alpha: true })
  if (!baseCtx) return null

  return { canvasEl: canvas, parentEl, sectionEl, mainCtx, baseCanvas, baseCtx }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function InteractiveDots({
  className,
  gap = 16,
  dotRadius = 0.72,
  lightRadius = 180,
  color = [248, 130, 33],
  baseOpacity = 0.1,
  maxOpacity = 0.9,
  fadeDuration = 220,
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const env = acquireEnv(canvas)
    if (!env) return

    const { canvasEl, parentEl, sectionEl, mainCtx, baseCanvas, baseCtx } = env
    const [cr, cg, cb] = color

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    /* ---- Mutable layout state ---- */
    let width = 0
    let height = 0
    let pxW = 0   // physical canvas width  (width  * dpr)
    let pxH = 0   // physical canvas height (height * dpr)
    let dpr = 1
    let cols = 0
    let rows = 0
    let padX = 0
    let padY = 0

    /* ---- Animation state ---- */
    let rafId: number | null = null
    let lastTimestamp = 0

    let pointerActive = false
    let targetX = OFFSCREEN
    let targetY = OFFSCREEN
    let cursorX = OFFSCREEN
    let cursorY = OFFSCREEN
    let targetIntensity = 0
    let intensity = 0

    /* -------------------------------------------------------------- */
    /*  Canvas sizing                                                  */
    /* -------------------------------------------------------------- */

    function resize(): void {
      const rect = parentEl.getBoundingClientRect()

      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)

      pxW = width * dpr
      pxH = height * dpr

      canvasEl.width = pxW
      canvasEl.height = pxH
      canvasEl.style.width = `${width}px`
      canvasEl.style.height = `${height}px`

      baseCanvas.width = pxW
      baseCanvas.height = pxH

      mainCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(width / gap) + 1
      rows = Math.ceil(height / gap) + 1
      padX = (width - (cols - 1) * gap) / 2
      padY = (height - (rows - 1) * gap) / 2
    }

    /* -------------------------------------------------------------- */
    /*  Static base layer (rendered once per resize)                   */
    /* -------------------------------------------------------------- */

    function renderBase(): void {
      baseCtx.setTransform(1, 0, 0, 1, 0, 0)
      baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height)
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      baseCtx.beginPath()
      for (let r = 0; r < rows; r++) {
        const y = padY + r * gap
        for (let c = 0; c < cols; c++) {
          const x = padX + c * gap
          baseCtx.moveTo(x + dotRadius, y)
          baseCtx.arc(x, y, dotRadius, 0, TWO_PI)
        }
      }
      baseCtx.fillStyle = `rgba(255,255,255,${baseOpacity})`
      baseCtx.fill()
    }

    /* -------------------------------------------------------------- */
    /*  Drawing                                                        */
    /* -------------------------------------------------------------- */

    function blitBase(): void {
      mainCtx.setTransform(1, 0, 0, 1, 0, 0)
      mainCtx.clearRect(0, 0, pxW, pxH)
      mainCtx.drawImage(baseCanvas, 0, 0)
      mainCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawLitDots(cx: number, cy: number, alpha: number): void {
      if (alpha < 0.01) return

      const rSq = lightRadius * lightRadius

      const cMin = Math.max(0, Math.floor((cx - lightRadius - padX) / gap))
      const cMax = Math.min(cols - 1, Math.ceil((cx + lightRadius - padX) / gap))
      const rMin = Math.max(0, Math.floor((cy - lightRadius - padY) / gap))
      const rMax = Math.min(rows - 1, Math.ceil((cy + lightRadius - padY) / gap))

      for (let row = rMin; row <= rMax; row++) {
        const dy = padY + row * gap - cy
        const dySq = dy * dy
        for (let col = cMin; col <= cMax; col++) {
          const dx = padX + col * gap - cx
          const dSq = dx * dx + dySq
          if (dSq > rSq) continue

          const t = 1 - Math.sqrt(dSq) / lightRadius
          const falloff = smoothStep(t)

          const dotAlpha =
            baseOpacity + (maxOpacity - baseOpacity) * falloff * alpha
          const dotSize = dotRadius * (1 + 1.5 * falloff * alpha)

          const x = padX + col * gap
          const y = padY + row * gap

          mainCtx.beginPath()
          mainCtx.arc(x, y, dotSize, 0, TWO_PI)
          mainCtx.fillStyle = `rgba(${cr},${cg},${cb},${dotAlpha})`
          mainCtx.fill()
        }
      }
    }

    function paint(): void {
      blitBase()

      const active =
        cursorX > OFFSCREEN / 2 &&
        cursorY > OFFSCREEN / 2 &&
        intensity > 0.01

      if (active) drawLitDots(cursorX, cursorY, intensity)
    }

    /* -------------------------------------------------------------- */
    /*  Animation loop                                                 */
    /* -------------------------------------------------------------- */

    function stopIfIdle(): boolean {
      const stillMoving =
        Math.abs(targetX - cursorX) > 0.15 ||
        Math.abs(targetY - cursorY) > 0.15 ||
        Math.abs(targetIntensity - intensity) > 0.008

      if (pointerActive || intensity > 0.01 || stillMoving) return false

      // Fully idle — reset and stop
      intensity = 0
      cursorX = OFFSCREEN
      cursorY = OFFSCREEN
      targetX = OFFSCREEN
      targetY = OFFSCREEN
      lastTimestamp = 0

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }

      blitBase()
      return true
    }

    function tick(now: number): void {
      const dt =
        lastTimestamp === 0 ? 16.67 : Math.min(now - lastTimestamp, 40)
      lastTimestamp = now

      // Snap cursor to target on first appearance
      if (cursorX <= OFFSCREEN / 2 && targetIntensity > 0) {
        cursorX = targetX
        cursorY = targetY
      }

      const moveAlpha = reducedMotion ? 1 : expDecay(dt, 48)
      const fadeIn    = reducedMotion ? 1 : expDecay(dt, 90)
      const fadeOut   = reducedMotion ? 1 : expDecay(dt, Math.max(70, fadeDuration))

      cursorX += (targetX - cursorX) * moveAlpha
      cursorY += (targetY - cursorY) * moveAlpha
      intensity +=
        (targetIntensity - intensity) *
        (targetIntensity > intensity ? fadeIn : fadeOut)

      paint()

      if (!stopIfIdle()) {
        rafId = requestAnimationFrame(tick)
      }
    }

    function ensureRunning(): void {
      if (rafId !== null) return
      rafId = requestAnimationFrame(tick)
    }

    /* -------------------------------------------------------------- */
    /*  Pointer helpers                                                */
    /* -------------------------------------------------------------- */

    function activate(clientX: number, clientY: number): void {
      const rect = parentEl.getBoundingClientRect()
      targetX = clamp(clientX - rect.left, 0, width)
      targetY = clamp(clientY - rect.top, 0, height)
      targetIntensity = 1
      pointerActive = true
      ensureRunning()
    }

    function deactivate(): void {
      pointerActive = false
      targetIntensity = 0
      ensureRunning()
    }

    /* -------------------------------------------------------------- */
    /*  Event handlers                                                 */
    /* -------------------------------------------------------------- */

    function onPointerMove(e: PointerEvent): void {
      activate(e.clientX, e.clientY)
    }

    function onPointerDown(e: PointerEvent): void {
      activate(e.clientX, e.clientY)
    }

    function onPointerLeave(): void {
      deactivate()
    }

    function onPointerUp(e: PointerEvent): void {
      if (e.pointerType !== "mouse") deactivate()
    }

    function onPointerCancel(): void {
      deactivate()
    }

    /* -------------------------------------------------------------- */
    /*  Init                                                           */
    /* -------------------------------------------------------------- */

    resize()
    renderBase()
    paint()

    const ro = new ResizeObserver(() => {
      resize()
      renderBase()
      paint()
    })
    ro.observe(parentEl)

    const opts: AddEventListenerOptions = { passive: true }

    sectionEl.addEventListener("pointermove", onPointerMove, opts)
    sectionEl.addEventListener("pointerdown", onPointerDown, opts)
    sectionEl.addEventListener("pointerleave", onPointerLeave)
    sectionEl.addEventListener("pointerup", onPointerUp, opts)
    sectionEl.addEventListener("pointercancel", onPointerCancel, opts)

    return () => {
      ro.disconnect()

      sectionEl.removeEventListener("pointermove", onPointerMove)
      sectionEl.removeEventListener("pointerdown", onPointerDown)
      sectionEl.removeEventListener("pointerleave", onPointerLeave)
      sectionEl.removeEventListener("pointerup", onPointerUp)
      sectionEl.removeEventListener("pointercancel", onPointerCancel)

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }, [gap, dotRadius, lightRadius, color, baseOpacity, maxOpacity, fadeDuration])

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}