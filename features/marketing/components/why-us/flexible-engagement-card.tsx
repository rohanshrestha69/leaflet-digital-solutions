"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  Users,
  Building2,
  Layers,
  HeartHandshake,
  Wrench,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";

import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CardShell, CardHeader, CardCopy, DiagramBox } from "./card-shell";

/* ── Data ─────────────────────────────────────────────────────────── */

const models = [
  {
    icon: Briefcase,
    label: "Project-Based",
    meta: "Fixed scope",
    bestFor: "Clear deliverables and one-off builds",
  },
  {
    icon: Users,
    label: "Dedicated Team",
    meta: "Monthly",
    bestFor: "Ongoing product and delivery support",
  },
  {
    icon: Building2,
    label: "White-Label",
    meta: "Partner",
    bestFor: "Agencies delivering under their brand",
  },
] as const;

const supportItems = [
  {
    icon: Wrench,
    label: "Maintenance & fixes",
    status: "Active",
  },
  {
    icon: TrendingUp,
    label: "Feature improvements",
    status: "Ongoing",
  },
  {
    icon: RefreshCcw,
    label: "Capacity on demand",
    status: "Flexible",
  },
] as const;

/* ── Card ─────────────────────────────────────────────────────────── */

export function FlexibleEngagementCard() {
  return (
    <CardShell className="min-h-[320px]">
      <div className="p-6 md:p-7">
        <CardHeader number="04" icon={Layers} />
        <CardCopy
          title="Flexible Engagement Models"
          description="Project-based delivery, dedicated teams, and white-label support shaped around how your team works."
          className="mt-8 md:mt-10"
        />
      </div>

      <DiagramBox
        className="mx-3 mb-3 min-h-[240px] md:mx-4 md:mb-4"
        glowColor="rgba(248,130,33,0.04)"
      >
        <div className="grid h-full gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <Layers
                className="size-3.5 text-[var(--brand)]"
                aria-hidden="true"
              />
              <span className="text-[12px] font-semibold text-[var(--text)]">
                Engagement models
              </span>
            </div>

            <ul className="flex flex-1 flex-col divide-y divide-[var(--border)] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]/40">
              {models.map(({ icon: Icon, label, meta, bestFor }, i) => (
                <motion.li
                  key={label}
                  className={cn(
                    "group/option flex items-start gap-4 px-4 py-3.5",
                    "transition-colors duration-300 ease-[var(--ease-premium)]",
                    "hover:bg-white/[0.02]",
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.08 * i + 0.18,
                    ease: ease.out,
                  }}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-soft)] transition-colors duration-300 group-hover/option:border-[var(--brand-border)] group-hover/option:text-[var(--brand)]">
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[13px] font-semibold text-[var(--text)]">
                        {label}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                        {meta}
                      </span>
                    </div>
                    <span className="mt-0.5 text-[11px] leading-relaxed text-[var(--text-muted)]">
                      {bestFor}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]/40 p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.34, ease: ease.out }}
          >
            <div className="flex items-center gap-2">
              <HeartHandshake
                className="size-3.5 text-[var(--brand)]"
                aria-hidden="true"
              />
              <span className="text-[12px] font-semibold text-[var(--text)]">
                After launch
              </span>
            </div>

            <ul className="mt-4 space-y-3">
              {supportItems.map(({ icon: Icon, label, status }, i) => (
                <motion.li
                  key={label}
                  className="flex items-center justify-between gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.08 * i + 0.42,
                    ease: ease.out,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className="size-3.5 text-[var(--text-subtle)]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="text-[12px] text-[var(--text-soft)]">
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

            <p className="mt-4 text-[11px] leading-relaxed text-[var(--text-subtle)]">
              Switch or combine models as requirements change.
            </p>
          </motion.div>
        </div>
      </DiagramBox>
    </CardShell>
  );
}
