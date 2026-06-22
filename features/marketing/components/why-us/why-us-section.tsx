"use client";

import { motion, type Variants } from "motion/react";

import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { SectionHeading } from "@/components/shared/section-heading";
import { ease, viewport } from "@/lib/motion";

import { DirectAccessCard } from "./direct-access-card";
import { StructuredProcessCard } from "./structured-process-card";
import { PracticalEngineeringCard } from "./practical-engineering-card";
import { FlexibleEngagementCard } from "./flexible-engagement-card";

/* ── Variants ─────────────────────────────────────────────────────── */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const headerV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.out },
  },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: ease.out },
  },
};

/* ── Component ────────────────────────────────────────────────────── */

export function WhyLeafletSection() {
  return (
    <section
      id="why-leaflet"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div variants={headerV}>
            <SectionLabel
              variant="line"
              animated={false}
              className="mb-8 md:mb-10"
            >
              Why Leaflet
            </SectionLabel>
          </motion.div>

          <motion.div
            variants={headerV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Why businesses
              <br />
              choose Leaflet
            </SectionHeading>

            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              Clear communication, structured delivery, and production-ready
              execution — built for teams that need software to work in the real
              world.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:gap-5 lg:grid-cols-12">
            <motion.div variants={cardV} className="lg:col-span-7">
              <DirectAccessCard />
            </motion.div>

            <motion.div variants={cardV} className="lg:col-span-5">
              <StructuredProcessCard />
            </motion.div>

            <motion.div variants={cardV} className="lg:col-span-5">
              <PracticalEngineeringCard />
            </motion.div>

            <motion.div variants={cardV} className="lg:col-span-7">
              <FlexibleEngagementCard />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
