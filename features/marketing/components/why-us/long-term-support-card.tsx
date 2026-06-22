"use client";

import { motion } from "motion/react";
import { HeartHandshake, Wrench, TrendingUp, RefreshCcw } from "lucide-react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CardShell, CardHeader, CardCopy, DiagramBox } from "./card-shell";

/* ── Data ─────────────────────────────────────────────────────────── */

const supportItems = [
  {
    icon: Wrench,
    label: "Bug Fixes & Maintenance",
    status: "Active",
  },
  {
    icon: TrendingUp,
    label: "Feature Expansion",
    status: "Ongoing",
  },
  {
    icon: RefreshCcw,
    label: "Performance Optimization",
    status: "Scheduled",
  },
] as const;

const uptimeMonths = [
  { month: "Jul", pct: 99.9 },
  { month: "Aug", pct: 100 },
  { month: "Sep", pct: 99.8 },
  { month: "Oct", pct: 100 },
  { month: "Nov", pct: 99.9 },
  { month: "Dec", pct: 100 },
] as const;

/* ── Card ─────────────────────────────────────────────────────────── */

export function LongTermSupportCard() {
  return (
    <CardShell className="lg:flex-row lg:items-stretch">
      {/* Copy */}
      <div className="flex shrink-0 flex-col p-7 md:p-8 lg:max-w-[340px] lg:justify-between">
        <CardHeader number="05" icon={HeartHandshake} />
        <CardCopy
          title="Long-Term Support"
          description="Post-launch improvements, maintenance, and feature expansion support."
          className="mt-10 md:mt-14"
        />
      </div>

      {/* Dashboard */}
      <DiagramBox
        className="m-3 md:m-4 lg:m-0 lg:rounded-l-none lg:border-l lg:border-t-0"
        glowColor="rgba(248,130,33,0.04)"
      >
        <div className="flex h-full flex-col gap-4 p-5 lg:flex-row">
          {/* Panel A: Support items */}
          <div className="flex flex-1 flex-col">
            {/* Header */}
            <div className="mb-3 flex items-center gap-2">
              <HeartHandshake
                className="size-3.5 text-[var(--brand)]"
                aria-hidden
              />
              <span className="text-[12px] font-semibold text-[var(--text)]">
                Post-Launch Coverage
              </span>
            </div>

            {/* Items */}
            <ul className="flex flex-1 flex-col divide-y divide-[var(--border)] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]/40">
              {supportItems.map(({ icon: Icon, label, status }, i) => (
                <motion.li
                  key={label}
                  className="flex items-center justify-between gap-3 px-3.5 py-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08 * i + 0.2,
                    ease: ease.out,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className="size-3.5 text-[var(--text-subtle)]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="text-[12px] font-medium text-[var(--text-soft)]">
                      {label}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[var(--text-subtle)]">
                    <span className="size-1.5 rounded-full bg-[var(--brand)]" />
                    {status}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border)] lg:h-auto lg:w-px" />

          {/* Panel B: Uptime chart */}
          <motion.div
            className="flex flex-1 flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]/40 p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.45, ease: ease.out }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-medium text-[var(--text-muted)]">
                Uptime · Last 6 months
              </span>
              <span className="tabular-nums text-[11px] font-semibold text-[var(--text)]">
                99.93%
              </span>
            </div>

            {/* Bar chart */}
            <div className="flex flex-1 items-end gap-2">
              {uptimeMonths.map(({ month, pct }, i) => {
                const height = ((pct - 99.5) / 0.5) * 48 + 12;

                return (
                  <div
                    key={month}
                    className="flex flex-1 flex-col items-center gap-1.5"
                  >
                    <motion.div
                      className={cn(
                        "w-full rounded-sm",
                        "bg-[var(--brand)]/70",
                      )}
                      style={{ minHeight: 6 }}
                      initial={{ height: 0 }}
                      whileInView={{ height }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: 0.06 * i + 0.55,
                        ease: ease.out,
                      }}
                    />
                    <span className="tabular-nums text-[9px] font-medium text-[var(--text-subtle)]">
                      {month}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </DiagramBox>
    </CardShell>
  );
}
