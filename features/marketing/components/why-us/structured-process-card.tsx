"use client";

import { motion } from "motion/react";
import {
  Search,
  PenTool,
  Code2,
  TestTube,
  Rocket,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CardShell, CardHeader, CardCopy, DiagramBox } from "./card-shell";

/* ── Data ─────────────────────────────────────────────────────────── */

const milestones = [
  { icon: Search, label: "Discovery", week: "W1–2", status: "done" as const },
  { icon: PenTool, label: "Design", week: "W3–4", status: "done" as const },
  { icon: Code2, label: "Build", week: "W5–8", status: "done" as const },
  { icon: TestTube, label: "QA", week: "W9–10", status: "active" as const },
  { icon: Rocket, label: "Launch", week: "W11–12", status: "pending" as const },
];

/* ── Status indicator ─────────────────────────────────────────────── */

function StepIndicator({
  icon: Icon,
  status,
}: {
  icon: LucideIcon;
  status: "done" | "active" | "pending";
}) {
  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full",
        status === "done" &&
          "border border-[var(--border-strong)] bg-[var(--card)] text-[var(--text-subtle)]",
        status === "active" &&
          "bg-[var(--brand)] text-white ring-[3px] ring-[var(--brand-glow)]",
        status === "pending" &&
          "border border-[var(--border)] bg-transparent text-[var(--text-subtle)]",
      )}
    >
      <Icon className="size-3.5" strokeWidth={2} />
    </span>
  );
}

/* ── Card ─────────────────────────────────────────────────────────── */

export function StructuredProcessCard() {
  return (
    <CardShell className="min-h-[320px]">
      <div className="p-6 md:p-7">
        <CardHeader number="02" icon={ListChecks} />
        <CardCopy
          title="Structured Delivery Process"
          description="Clear milestones, regular updates, and predictable delivery from planning to deployment."
          className="mt-8 md:mt-10"
        />
      </div>

      <DiagramBox className="mx-3 mb-3 min-h-[220px] md:mx-4 md:mb-4">
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListChecks
                className="size-3.5 text-[var(--brand)]"
                aria-hidden="true"
              />
              <span className="text-[12px] font-semibold text-[var(--text)]">
                Active delivery cycle
              </span>
            </div>
            <span className="text-[10px] font-medium text-[var(--text-subtle)]">
              60% complete
            </span>
          </div>

          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              className="h-full rounded-full bg-[var(--brand)]"
              initial={{ width: "0%" }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.18, ease: ease.out }}
            />
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {milestones.map(({ icon, label, week, status }, i) => {
              const isLast = i === milestones.length - 1;

              return (
                <motion.div
                  key={label}
                  className={cn(
                    "rounded-[16px] border border-[var(--border)] bg-white/[0.02] px-3.5 py-3",
                    isLast && "sm:col-span-2",
                  )}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.08 * i + 0.15,
                    ease: ease.out,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <StepIndicator icon={icon} status={status} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "text-[13px]",
                            status === "done" &&
                              "font-medium text-[var(--text-subtle)] line-through",
                            status === "active" &&
                              "font-semibold text-[var(--text)]",
                            status === "pending" &&
                              "font-medium text-[var(--text-muted)]",
                          )}
                        >
                          {label}
                        </span>

                        <span
                          className={cn(
                            "tabular-nums text-[10px] font-medium",
                            status === "active"
                              ? "text-[var(--brand)]"
                              : "text-[var(--text-subtle)]",
                          )}
                        >
                          {week}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </DiagramBox>
    </CardShell>
  );
}
