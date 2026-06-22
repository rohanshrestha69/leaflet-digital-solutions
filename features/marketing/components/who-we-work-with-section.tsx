// features/marketing/components/who-we-work-with-section.tsx
"use client";

import { Building2, Handshake, Rocket, type LucideIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionLabel } from "@/components/shared/section-label";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── Data ─────────────────────────────────────────────────────────── */

type AudienceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const audienceCards: AudienceCard[] = [
  {
    icon: Building2,
    title: "Businesses",
    description:
      "We partner with established businesses that need reliable digital infrastructure — whether that's a customer-facing platform, an internal system, or an operational tool that removes friction and supports day-to-day growth.",
  },
  {
    icon: Rocket,
    title: "Startups",
    description:
      "From early-stage MVPs to scaling products, we help startups move fast without cutting corners. We focus on architecture that holds up as your team, users, and requirements grow beyond the first version.",
  },
  {
    icon: Handshake,
    title: "Agencies",
    description:
      "We act as a quiet, dependable development partner for agencies that need white-label support. Whether you need a full build or a specialist team to extend yours, we integrate cleanly and deliver on your behalf.",
  },
];

/* ── Variants — identical rhythm to AboutStorySection ────────────── */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const headerV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
};

const cardsV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
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

/* ── Component ────────────────────────────────────────────────────── */

export function WhoWeWorkWithSection() {
  return (
    <section
      id="who-we-work-with"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <SectionLabel variant="line" className="mb-8 md:mb-10">
          Who We Work With
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
              Built for businesses,
              <br />
              startups, and agencies
            </SectionHeading>

            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              We work with teams that need practical, reliable digital solutions
              — not just design, but systems that support real operations and
              growth.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={cardsV}
            className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6"
          >
            {audienceCards.map((card, i) => {
              const Icon = card.icon;
              const number = String(i + 1).padStart(2, "0");

              return (
                <motion.article
                  key={card.title}
                  variants={cardV}
                  className={cn(
                    "group relative flex flex-col overflow-hidden",
                    "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
                    "p-7 md:p-8",
                    "transition-[border-color,background-color] duration-300 ease-[var(--ease-premium)]",
                    "hover:border-[var(--border-strong)]",
                  )}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25, ease: ease.smooth }}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                      {number}
                    </span>

                    <motion.span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-full",
                        "border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]",
                      )}
                      whileHover={{ scale: 1.12, rotate: 8 }}
                      transition={{ duration: 0.35, ease: ease.spring }}
                    >
                      <Icon className="size-4" strokeWidth={2} />
                    </motion.span>
                  </div>

                  {/* Body */}
                  <div className="mt-12 md:mt-16">
                    <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] md:text-[26px]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                      {card.description}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.09),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
