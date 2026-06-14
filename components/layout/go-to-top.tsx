"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const SCROLL_THRESHOLD = 500
const TEXT = "LEAFLET DIGITAL • LEAFLET DIGITAL • "

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function GoToTop() {
  const [visible, setVisible] = useState(false)
  const frameRef = useRef<number | null>(null)

  /* ---------------------------- Scroll visibility --------------------------- */
  useEffect(() => {
    const update = () => {
      setVisible((prev) => {
        const next = window.scrollY > SCROLL_THRESHOLD
        return prev === next ? prev : next
      })
      frameRef.current = null
    }

    const onScroll = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  /* -------------------------------- Scroll up ------------------------------- */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <>
      {/* Global keyframes — placed once, always available */}
      <style>{`
        @keyframes gtt-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .gtt-rotating {
          animation: gtt-spin 18s linear infinite;
          transform-origin: 50% 50%;
        }
        @media (prefers-reduced-motion: reduce) {
          .gtt-rotating { animation: none; }
        }
      `}</style>

      <button
        type="button"
        aria-label="Go to top"
        onClick={scrollToTop}
        className={cn(
          "group fixed bottom-6 right-6 z-[120]",
          "flex h-20 w-20 items-center justify-center rounded-full",
          "border border-[var(--border)] bg-[var(--card)] text-[var(--text)]",
          "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]",
          "transition-[opacity,transform,border-color,background-color,color] duration-300 ease-[var(--ease-premium)]",
          "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/5 hover:text-[var(--brand)]",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        {/* Rotating circular text */}
        <div
          aria-hidden
          className="gtt-rotating pointer-events-none absolute inset-0"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="gtt-circle"
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
            </defs>
            <text
              fill="currentColor"
              style={{
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              <textPath href="#gtt-circle" startOffset="0%">
                {TEXT}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center arrow */}
        <span
          className={cn(
            "relative z-10 inline-flex size-10 items-center justify-center rounded-full",
            "border border-[var(--border)] bg-[var(--background)]",
            "transition-all duration-300 ease-[var(--ease-premium)]",
            "group-hover:border-[var(--brand-border)] group-hover:bg-[var(--brand)]/10"
          )}
        >
          <ArrowUp
            className="size-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:-translate-y-0.5"
            strokeWidth={2.25}
          />
        </span>
      </button>
    </>
  )
}