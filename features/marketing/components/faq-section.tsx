// features/marketing/components/faq-section.tsx
"use client";

import { motion, type Variants } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { faqs } from "@/features/marketing/data/faqs";
import { ease, viewport } from "@/lib/motion";
import { SectionLabel } from "@/components/shared/section-label";

/* ── Variants ─────────────────────────────────────────────────────── */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const headerV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.out } },
};

const listV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
};

/* ── Component ────────────────────────────────────────────────────── */

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <SectionLabel variant="line" className="mb-8 md:mb-10">
          FAQ
        </SectionLabel>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={headerV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Everything you need
              <br />
              to know
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              From pricing to process — answers to the questions we hear most
              often.
            </p>
          </motion.div>

          <motion.div
            variants={listV}
            className="mt-14 border-t border-[var(--border)] md:mt-20"
          >
            <Accordion defaultValue={faqs[0] ? [faqs[0].question] : undefined}>
              {faqs.map((faq, i) => (
                <motion.div key={faq.question} variants={itemV}>
                  <AccordionItem
                    value={faq.question}
                    className="border-b border-[var(--border)]"
                  >
                    <AccordionTrigger className="group flex w-full items-start gap-5 py-6 text-left no-underline transition-colors duration-300 hover:no-underline data-[state=open]:text-[var(--brand)]">
                      <span className="mt-1 font-medium text-[12px] tabular-nums tracking-[0.18em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-heading text-[18px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)] md:text-[22px]">
                        {faq.question}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="pb-8 pl-[44px] pr-6 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                      <p className="max-w-2xl">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
