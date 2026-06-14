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
import { faqs } from "@/features/marketing/data/faqs"
import { premiumEase, sectionViewport } from "@/lib/motion"

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

const listContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          {/* Header */}
          <motion.div
            variants={headerVariants}
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

          {/* FAQ list */}
          <motion.div
            variants={listContainer}
            className="mt-14 border-t border-[var(--border)] md:mt-20"
          >
            <Accordion
              defaultValue={faqs[0] ? [faqs[0].question] : undefined}
            >
              {faqs.map((faq, index) => {
                const number = String(index + 1).padStart(2, "0")

                return (
                  <motion.div key={faq.question} variants={itemVariants}>
                    <AccordionItem
                      value={faq.question}
                      className="border-b border-[var(--border)]"
                    >
                      <AccordionTrigger
                        className={[
                          "group flex w-full items-start gap-5 py-6 text-left no-underline",
                          "transition-colors duration-300 ease-[var(--ease-premium)]",
                          "hover:no-underline data-[state=open]:text-[var(--brand)]",
                        ].join(" ")}
                      >
                        <span className="mt-1 font-mono text-[12px] tabular-nums tracking-[0.18em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)]">
                          {number}
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
                )
              })}
            </Accordion>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}