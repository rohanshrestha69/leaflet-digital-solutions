// features/services/components/service-tile.tsx
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceOffering } from "@/features/marketing/data/services-page";
import { tileV } from "./details/service-variants";
import { serviceIconMap } from "./service-icons";

type ServiceTileProps = {
  service: ServiceOffering;
  className?: string;
};

export function ServiceTile({ service, className }: ServiceTileProps) {
  const [flipped, setFlipped] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flipIn = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setFlipped(true);
  }, []);

  const flipOut = useCallback(() => {
    timeoutRef.current = setTimeout(() => setFlipped(false), 80);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const IconComponent = serviceIconMap[service.slug];

  return (
    <motion.div
      variants={tileV}
      className={cn("group/tile", className)}
      style={{ perspective: 1200 }}
      onMouseEnter={flipIn}
      onMouseLeave={flipOut}
      onFocus={flipIn}
      onBlur={flipOut}
    >
      <Link
        href={`/services/${service.slug}`}
        className="relative block aspect-square outline-none"
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: ease.smooth }}
        >
          {/* ====================================================== */}
          {/*  FRONT                                                   */}
          {/* ====================================================== */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col",
              "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]",
              "p-5 md:p-6",
              "[backface-visibility:hidden]",
            )}
          >
            {/* Top — number + arrow */}
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                {service.number}
              </span>
              <motion.div
                className="flex size-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)]"
                animate={
                  flipped
                    ? {
                        borderColor: "var(--brand-border)",
                        backgroundColor: "var(--brand-soft)",
                        color: "var(--brand)",
                        x: 1.5,
                        y: -1.5,
                      }
                    : {
                        borderColor: "var(--border)",
                        backgroundColor: "transparent",
                        color: "var(--text-muted)",
                        x: 0,
                        y: 0,
                      }
                }
                transition={{ duration: 0.35, ease: ease.smooth }}
              >
                <ArrowUpRight className="size-3.5" />
              </motion.div>
            </div>

            {/* Center — icon (large, fills available space) */}
            <div className="flex flex-1 items-center justify-center py-2">
              <div className="aspect-square w-[60%] max-w-[200px] sm:w-[55%] md:w-[60%]">
                {IconComponent ? (
                  <IconComponent />
                ) : (
                  <div className="h-full w-full rounded-2xl bg-white/[0.03]" />
                )}
              </div>
            </div>

            {/* Bottom — title */}
            <motion.h3
              className="font-heading text-[22px] font-bold leading-tight tracking-tight md:text-[26px]"
              animate={{ color: flipped ? "white" : "var(--text)" }}
              transition={{ duration: 0.35, ease: ease.smooth }}
            >
              {service.title}
            </motion.h3>

            {/* Glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-[radial-gradient(circle_at_70%_20%,rgba(248,130,33,0.12),transparent_55%)]"
              animate={{ opacity: flipped ? 1 : 0 }}
              transition={{ duration: 0.4, ease: ease.smooth }}
            />

            {/* Border glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] border border-[var(--brand-border)]"
              animate={{
                opacity: flipped ? 1 : 0,
                boxShadow: flipped
                  ? "0 0 0 1px var(--brand-border), 0 12px 32px -12px rgba(0,0,0,0.5)"
                  : "0 0 0 0 transparent",
              }}
              transition={{ duration: 0.35, ease: ease.smooth }}
            />
          </div>

          {/* ====================================================== */}
          {/*  BACK                                                    */}
          {/* ====================================================== */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-between",
              "rounded-[var(--radius-xl)] border border-[var(--brand-border)]/30 bg-[var(--card)]",
              "p-5 md:p-6",
              "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            )}
          >
            <div>
              <span
                className={cn(
                  "inline-flex h-6 items-center rounded-full px-2.5",
                  "bg-[var(--brand)]/10 font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--brand)]",
                )}
              >
                {service.number}
              </span>
              <h3 className="mt-3 font-heading text-[20px] font-bold leading-snug tracking-tight text-[var(--text)] md:text-[22px]">
                {service.title}
              </h3>
            </div>

            <p className="text-[14px] leading-relaxed text-[var(--text-muted)]">
              {service.description}
            </p>

            <div className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--brand)]">
              <span>Learn more</span>
              <motion.span
                className="inline-flex"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: ease.smooth,
                }}
              >
                <ArrowUpRight className="size-3.5" />
              </motion.span>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-[radial-gradient(circle_at_30%_80%,rgba(248,130,33,0.06),transparent_55%)]"
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
