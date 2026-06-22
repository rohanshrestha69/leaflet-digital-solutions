// components/animations/infinite-logo-strip.tsx
"use client";

import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Logo = {
  label: string;
  Icon?: ComponentType<{ className?: string }>;
};

type Size = "sm" | "md" | "lg";
type Direction = "left" | "right";

type InfiniteLogoStripProps = {
  logos: Logo[];
  className?: string;
  /** Seconds per full loop — lower = faster */
  duration?: number;
  pauseOnHover?: boolean;
  size?: Size;
  direction?: Direction;
};

/* ------------------------------------------------------------------ */
/*  Size config                                                        */
/* ------------------------------------------------------------------ */

const sizeMap: Record<Size, { text: string; icon: string; padding: string }> = {
  sm: {
    text: "text-base md:text-xl",
    icon: "size-4 md:size-5",
    padding: "px-4 md:px-6",
  },
  md: {
    text: "text-xl md:text-3xl",
    icon: "size-5 md:size-6",
    padding: "px-6 md:px-8",
  },
  lg: {
    text: "text-2xl md:text-4xl",
    icon: "size-6 md:size-7",
    padding: "px-8 md:px-10",
  },
};

export function InfiniteLogoStrip({
  logos,
  className,
  duration = 30,
  pauseOnHover = true,
  size = "md",
  direction = "left",
}: InfiniteLogoStripProps) {
  if (!logos.length) return null;

  const cfg = sizeMap[size];

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max items-center",
          direction === "right" ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <LogoGroup logos={logos} cfg={cfg} />
        <LogoGroup logos={logos} cfg={cfg} ariaHidden />
        <LogoGroup logos={logos} cfg={cfg} ariaHidden />
        <LogoGroup logos={logos} cfg={cfg} ariaHidden />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo group                                                         */
/* ------------------------------------------------------------------ */

function LogoGroup({
  logos,
  cfg,
  ariaHidden,
}: {
  logos: Logo[];
  cfg: (typeof sizeMap)[Size];
  ariaHidden?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {logos.map(({ label, Icon }, i) => (
        <div
          key={`${label}-${i}`}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap",
            "text-white/40 transition-colors duration-500 hover:text-white/85",
            cfg.padding,
          )}
        >
          {Icon && <Icon className={cfg.icon} />}
          <span
            className={cn("font-heading font-bold tracking-tight", cfg.text)}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
