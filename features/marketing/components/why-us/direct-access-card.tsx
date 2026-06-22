"use client";

import { motion } from "motion/react";
import {
  User,
  MessageCircle,
  Code,
  Palette,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";

import { ease } from "@/lib/motion";
import { CardShell, CardHeader, CardCopy, DiagramBox } from "./card-shell";

/* ── Data ─────────────────────────────────────────────────────────── */

const roles = [
  { label: "Developer", icon: Code, x: 18, y: 28 },
  { label: "Designer", icon: Palette, x: 50, y: 16 },
  { label: "PM", icon: FolderKanban, x: 82, y: 28 },
] as const;

/* ── Role node ────────────────────────────────────────────────────── */

function RoleNode({
  label,
  icon: Icon,
  x,
  y,
  delay,
}: {
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: ease.out, delay }}
    >
      <div className="flex size-16 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--card)] text-[var(--text-soft)]">
        <Icon className="size-6" strokeWidth={2} aria-hidden="true" />
      </div>
      <span className="text-[10px] font-medium text-[var(--text-subtle)]">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Card ─────────────────────────────────────────────────────────── */

export function DirectAccessCard() {
  return (
    <CardShell className="min-h-[320px] lg:min-h-[300px] lg:flex-row">
      <div className="flex w-full flex-col justify-between p-6 md:p-7 lg:max-w-[290px]">
        <CardHeader number="01" icon={MessageCircle} />
        <CardCopy
          title="Direct Access to the Team"
          description="Work directly with developers, designers, and project managers without unnecessary layers or communication bottlenecks."
          className="mt-8 md:mt-10"
        />
      </div>

      <DiagramBox
        className="m-3 min-h-[320px] md:m-4 lg:my-3 lg:mr-3 lg:ml-0 lg:flex-1"
        glowColor="rgba(248,130,33,0.045)"
      >
        <div className="flex h-full items-center justify-center p-6 md:p-8">
          <div className="relative aspect-square w-full max-w-[360px]">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full"
              aria-hidden="true"
            >
              {roles.map((r, i) => (
                <motion.line
                  key={r.label}
                  x1="50"
                  y1="78"
                  x2={r.x}
                  y2={r.y}
                  stroke="var(--brand)"
                  strokeOpacity="0.22"
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.65,
                    delay: 0.18 + 0.08 * i,
                    ease: ease.out,
                  }}
                />
              ))}
            </svg>

            {roles.map((r, i) => (
              <RoleNode key={r.label} {...r} delay={0.24 + 0.07 * i} />
            ))}

            <motion.div
              className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1, ease: ease.out }}
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-[0_0_22px_var(--brand-glow)] ring-4 ring-[var(--brand-glow)]">
                <User className="size-6" strokeWidth={2} aria-hidden="true" />
              </div>
              <span className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-soft)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
                You
              </span>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.35, ease: ease.smooth }}
            >
              <span className="text-[12px] font-semibold text-[var(--text-subtle)]">
                Direct communication
              </span>
            </motion.div>
          </div>
        </div>
      </DiagramBox>
    </CardShell>
  );
}
