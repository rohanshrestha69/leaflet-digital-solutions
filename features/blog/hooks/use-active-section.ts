// features/blog/hooks/use-active-section.ts
"use client"

import { useEffect, useRef, useState } from "react"

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return

    /* Cleanup previous observer if section list changed */
    observerRef.current?.disconnect()

    const visibilityMap = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibilityMap.set(entry.target.id, entry.intersectionRatio)
        }

        /* Pick the section with the highest intersection ratio,
         * preferring earlier sections in document order on ties */
        let bestId = ""
        let bestRatio = 0
        for (const id of sectionIds) {
          const ratio = visibilityMap.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestId && bestRatio > 0) {
          setActiveId(bestId)
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
      }
    )

    observerRef.current = observer

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}