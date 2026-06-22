// features/marketing/components/white-label-partnerships-section.tsx
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Globe,
  Handshake,
  PencilRuler,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionLabel } from "@/components/shared/section-label";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── Data ─────────────────────────────────────────────────────────── */

type SupportItem = {
  title: string;
  icon: LucideIcon;
};

const supportItems: SupportItem[] = [
  { title: "Website Development", icon: Globe },
  { title: "Custom Software", icon: Code2 },
  { title: "Mobile Apps", icon: Smartphone },
  { title: "UI/UX Design", icon: PencilRuler },
  { title: "Support & Maintenance", icon: Wrench },
];

const partnershipReasons = [
  "Confidential delivery",
  "Consistent communication",
  "Flexible capacity",
  "Production-ready quality",
];

/* ── Variants ─────────────────────────────────────────────────────── */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const headerV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
};

const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: ease.out },
  },
};

const listV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.out },
  },
};

/* ── Shared styles ───────────────────────────────────────────────── */

const cardBase = cn(
  "group relative overflow-hidden rounded-[var(--radius-xl)]",
  "border border-[var(--border)] bg-[var(--card)]/40",
  "transition-[border-color,background-color] duration-300 ease-[var(--ease-premium)]",
  "hover:border-[var(--border-strong)]",
);

const iconBadge = cn(
  "inline-flex size-10 items-center justify-center rounded-full",
  "border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]",
);

const hoverGlow = cn(
  "pointer-events-none absolute inset-0",
  "bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.08),transparent_55%)]",
  "opacity-0 transition-opacity duration-500 group-hover:opacity-100",
);

/* ── Component ────────────────────────────────────────────────────── */

export function WhiteLabelPartnershipsSection() {
  return (
    <section
      id="white-label-partnerships"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <SectionLabel variant="line" className="mb-8 md:mb-10">
          White-Label Partnerships
        </SectionLabel>

        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          {/* Header */}
          <motion.div
            variants={headerV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Development partner
              <br />
              for agencies
            </SectionHeading>

            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              We work with agencies as a reliable white-label development team,
              helping them deliver web, mobile, and software projects under
              their own brand.
            </p>
          </motion.div>

          {/* ── Bento grid ─────────────────────────────────────────── */}
          <motion.div
            variants={gridV}
            className={cn(
              "mt-12 grid gap-4 lg:mt-16 lg:gap-5",
              "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
              "lg:grid-rows-[auto_auto]",
            )}
          >
            {/* ── Card 1 — What we support (spans 2 rows) ────────── */}
            <motion.article
              variants={cardV}
              className={cn(
                cardBase,
                "flex flex-col p-6 md:p-7",
                "lg:row-span-2",
              )}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: ease.smooth }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  01
                </span>
                <motion.span
                  className={iconBadge}
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  transition={{ duration: 0.35, ease: ease.spring }}
                >
                  <BriefcaseBusiness className="size-4" strokeWidth={2} />
                </motion.span>
              </div>

              {/* Heading */}
              <div className="mt-8 md:mt-10">
                <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] md:text-[26px]">
                  What we support
                </h3>
                <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  We plug into agency workflows as a dependable delivery partner
                  — supporting product, design, and engineering work with clean
                  execution.
                </p>
              </div>

              {/* Services list */}
              <motion.ul
                variants={listV}
                className="mt-8 flex flex-1 flex-col border-t border-[var(--border)]"
              >
                {supportItems.map((item, i) => {
                  const Icon = item.icon;
                  const number = String(i + 1).padStart(2, "0");

                  return (
                    <motion.li
                      key={item.title}
                      variants={itemV}
                      className={cn(
                        "flex items-center gap-4 border-b border-[var(--border)] py-4",
                        "last:border-b-0 last:pb-0",
                      )}
                    >
                      <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                        {number}
                      </span>

                      <span className="min-w-0 flex-1 text-[15px] text-[var(--text)]">
                        {item.title}
                      </span>

                      <span
                        className={cn(
                          "inline-flex size-8 shrink-0 items-center justify-center rounded-full",
                          "border border-[var(--border)] bg-white/[0.03] text-[var(--brand)]",
                        )}
                      >
                        <Icon className="size-4" strokeWidth={2} />
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <div aria-hidden className={hoverGlow} />
            </motion.article>

            {/* ── Card 2 — Why agencies work with us ──────────────── */}
            <motion.article
              variants={cardV}
              className={cn(cardBase, "flex flex-col p-6 md:p-7")}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: ease.smooth }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  02
                </span>
                <motion.span
                  className={iconBadge}
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  transition={{ duration: 0.35, ease: ease.spring }}
                >
                  <ShieldCheck className="size-4" strokeWidth={2} />
                </motion.span>
              </div>

              <div className="mt-8 md:mt-10">
                <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] md:text-[26px]">
                  Why agencies choose us
                </h3>
              </div>

              <motion.ul
                variants={listV}
                className="mt-6 grid gap-2.5 sm:grid-cols-2"
              >
                {partnershipReasons.map((reason) => (
                  <motion.li
                    key={reason}
                    variants={itemV}
                    className={cn(
                      "flex items-center gap-3 rounded-[16px]",
                      "border border-[var(--border)] bg-white/[0.02]",
                      "px-4 py-3",
                    )}
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                    <span className="text-[14px] leading-snug text-[var(--text-soft)]">
                      {reason}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <div aria-hidden className={hoverGlow} />
            </motion.article>

            {/* ── Card 3 — CTA ───────────────────────────────────── */}
            <motion.article
              variants={cardV}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius-xl)]",
                "border border-[var(--border)]",
                "bg-[linear-gradient(180deg,rgba(248,130,33,0.06)_0%,var(--card)_100%)]",
                "flex flex-col p-6 md:p-7",
                "transition-[border-color] duration-300 ease-[var(--ease-premium)]",
                "hover:border-[var(--brand-border)]",
              )}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: ease.smooth }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  03
                </span>
                <motion.span
                  className={iconBadge}
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  transition={{ duration: 0.35, ease: ease.spring }}
                >
                  <Handshake className="size-4" strokeWidth={2} />
                </motion.span>
              </div>

              <div className="mt-8 md:mt-10">
                <h3 className="font-heading text-[20px] font-semibold tracking-tight text-[var(--text)] md:text-[22px]">
                  Ready to partner?
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  {`Whether it's project-based support or ongoing delivery, we
                  integrate as a quiet, dependable extension of your team.`}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full",
                    "bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white",
                    "transition-colors duration-300 ease-[var(--ease-premium)]",
                    "hover:bg-[var(--brand-hover)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40",
                  )}
                >
                  Discuss Partnership
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0",
                  "bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.1),transparent_55%)]",
                  "opacity-50",
                )}
              />
            </motion.article>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
