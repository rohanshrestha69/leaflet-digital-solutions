// features/services/components/details/service-faqs.tsx
"use client"

import { motion, type Variants } from "motion/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ServiceFaq } from "@/features/marketing/data/services-page"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemBlurV } from "./service-variants"

const listV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
}

const faqItemV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
}

export function ServiceFAQs({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={itemBlurV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Frequently
              <br />
              asked questions.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              From timelines to revisions — quick answers to the things we hear
              most.
            </p>
          </motion.div>

          <motion.div
            variants={listV}
            className="mt-14 border-t border-[var(--border)] md:mt-20"
          >
            <Accordion>
              {faqs.map((f, i) => (
                <motion.div key={f.question} variants={faqItemV}>
                  <AccordionItem
                    value={`item-${i}`}
                    className="border-b border-[var(--border)]"
                  >
                    <AccordionTrigger
                      className={cn(
                        "group flex w-full items-start gap-5 py-6 text-left no-underline",
                        "transition-colors duration-300 ease-[var(--ease-premium)]",
                        "hover:no-underline data-[state=open]:text-[var(--brand)]"
                      )}
                    >
                      <span className="mt-1 font-medium text-[12px] tabular-nums tracking-[0.18em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-heading text-[18px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)] md:text-[22px]">
                        {f.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pl-[44px] pr-6 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                      <p className="max-w-2xl">{f.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}