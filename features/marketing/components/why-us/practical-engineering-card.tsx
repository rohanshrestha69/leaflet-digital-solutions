"use client";

import { motion } from "motion/react";
import { Gauge, Shield, Wrench, CheckCircle2 } from "lucide-react";

import { ease } from "@/lib/motion";
import { CardShell, CardHeader, CardCopy, DiagramBox } from "./card-shell";

/* ── Data ─────────────────────────────────────────────────────────── */

const metrics = [
  { label: "Stability", value: "99.9%", width: "99%" },
  { label: "Performance", value: "96/100", width: "96%" },
  { label: "Usability", value: "94/100", width: "94%" },
] as const;

const checks = [
  "Performance budgets",
  "QA review",
  "Maintainable codebase",
  "Production monitoring",
] as const;

/* ── Card ─────────────────────────────────────────────────────────── */

export function PracticalEngineeringCard() {
  return (
    <CardShell className="min-h-[340px]">
      <div className="p-6 md:p-7">
        <CardHeader number="03" icon={Wrench} />
        <CardCopy
          title="Production-Ready Engineering"
          description="We prioritize stability, performance, and maintainability — not unnecessary complexity."
          className="mt-8 md:mt-10"
        />
      </div>

      {/* flex-1 ensures diagram fills remaining space */}
      <DiagramBox
        className="mx-3 mb-3 flex flex-1 md:mx-4 md:mb-4"
        glowColor="rgba(248,130,33,0.04)"
      >
        <div
          className="
            grid
            h-full
            w-full
            gap-4
            p-5
            grid-cols-1
            lg:grid-cols-2
          "
        >
          {/* Left: Quality benchmarks (fills height) */}
          <div className="flex h-full w-full flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge
                  className="size-3.5 text-[var(--brand)]"
                  aria-hidden="true"
                />
                <span className="text-[12px] font-semibold text-[var(--text)]">
                  Quality benchmarks
                </span>
              </div>
              <span className="text-[10px] font-medium text-[var(--text-subtle)]">
                Last 12 months
              </span>
            </div>

            {/* justify-around evenly distributes bars to fill height */}
            <div className="flex flex-1 flex-col justify-around gap-4">
              {metrics.map(({ label, value, width }, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.1 * i + 0.18,
                    ease: ease.out,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[var(--text-soft)]">
                      {label}
                    </span>
                    <span className="tabular-nums text-[11px] font-semibold text-[var(--text)]">
                      {value}
                    </span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      className="h-full rounded-full bg-[var(--brand)]"
                      initial={{ width: "0%" }}
                      whileInView={{ width }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.75,
                        delay: 0.12 * i + 0.22,
                        ease: ease.out,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Delivery checks (fills height) */}
          <motion.div
            className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]/40 p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35, ease: ease.out }}
          >
            <div className="flex items-center gap-2">
              <Shield
                className="size-3.5 text-[var(--brand)]"
                aria-hidden="true"
              />
              <span className="text-[12px] font-semibold text-[var(--text)]">
                Delivery checks
              </span>
            </div>

            {/* flex-1 + justify-around distributes evenly */}
            <ul className="mt-4 flex flex-1 flex-col justify-around gap-2.5">
              {checks.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.08 * i + 0.42,
                    ease: ease.out,
                  }}
                >
                  <CheckCircle2
                    className="size-3.5 shrink-0 text-[var(--brand)]"
                    aria-hidden="true"
                  />
                  <span className="text-[12px] leading-relaxed text-[var(--text-soft)]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </DiagramBox>
    </CardShell>
  );
}
