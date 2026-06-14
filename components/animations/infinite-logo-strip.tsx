// components/animations/infinite-logo-strip.tsx
"use client"

import type { ComponentType } from "react"
import { cn } from "@/lib/utils"

export type Logo = {
  label: string
  Icon?: ComponentType<{ className?: string }>
}

type InfiniteLogoStripProps = {
  logos: Logo[]
  className?: string
  /** Animation duration in seconds — lower = faster */
  duration?: number
  /** Pause animation on hover */
  pauseOnHover?: boolean
  /** Visual density */
  size?: "sm" | "md" | "lg"
  /** Direction of scroll */
  direction?: "left" | "right"
}

const sizeMap = {
  sm: {
    text: "text-base md:text-xl",
    icon: "size-4 md:size-5",
    minWidth: "min-w-[120px]",
    gap: "gap-8",
    pr: "pr-8",
  },
  md: {
    text: "text-xl md:text-3xl",
    icon: "size-5 md:size-6",
    minWidth: "min-w-[160px]",
    gap: "gap-12",
    pr: "pr-12",
  },
  lg: {
    text: "text-2xl md:text-4xl",
    icon: "size-6 md:size-7",
    minWidth: "min-w-[200px]",
    gap: "gap-16",
    pr: "pr-16",
  },
}

export function InfiniteLogoStrip({
  logos,
  className,
  duration = 30,
  pauseOnHover = true,
  size = "md",
  direction = "left",
}: InfiniteLogoStripProps) {
  if (!logos.length) return null

  const cfg = sizeMap[size]

  return (
    <div
      className={cn(
        "logo-marquee group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      style={
        {
          "--logo-marquee-duration": `${duration}s`,
          "--logo-marquee-direction": direction === "right" ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "logo-marquee-track flex w-max items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <LogoGroup logos={logos} cfg={cfg} />
        <LogoGroup logos={logos} cfg={cfg} ariaHidden />
      </div>
    </div>
  )
}

function LogoGroup({
  logos,
  cfg,
  ariaHidden,
}: {
  logos: Logo[]
  cfg: (typeof sizeMap)[keyof typeof sizeMap]
  ariaHidden?: boolean
}) {
  return (
    <div
      className={cn("flex shrink-0 items-center", cfg.gap, cfg.pr)}
      aria-hidden={ariaHidden}
    >
      {logos.map(({ label, Icon }, index) => (
        <div
          key={`${label}-${index}`}
          className={cn(
            "flex items-center justify-center gap-3",
            "text-white/42 transition-colors duration-500 ease-[var(--ease-premium)]",
            "hover:text-white/85",
            cfg.minWidth
          )}
        >
          {Icon && <Icon className={cfg.icon} />}
          <span
            className={cn(
              "font-heading font-bold tracking-tight whitespace-nowrap",
              cfg.text
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}