"use client"

import { cn } from "@/lib/utils"

type TocItem = {
  id: string
  label: string
}

type BlogTocProps = {
  items: TocItem[]
  activeId: string
}

export function BlogToc({ items, activeId }: BlogTocProps) {
  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-1">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        On this page
      </p>
      {items.map((item) => {
        const active = activeId === item.id
        const label =
          item.label.length > 38 ? `${item.label.slice(0, 38)}…` : item.label

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "group flex items-start gap-3 py-2 text-[13px] transition-colors duration-300",
              active
                ? "text-[var(--text)]"
                : "text-[var(--text-subtle)] hover:text-[var(--text-muted)]"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-[7px] h-px shrink-0 transition-all duration-300",
                active
                  ? "w-6 bg-[var(--brand)]"
                  : "w-3 bg-[var(--border)] group-hover:w-4 group-hover:bg-[var(--text-muted)]"
              )}
            />
            <span className={active ? "font-medium" : ""}>{label}</span>
          </a>
        )
      })}
    </nav>
  )
}