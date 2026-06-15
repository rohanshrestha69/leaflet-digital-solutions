// features/blog/components/details/blog-detail-body.tsx
"use client"

import { useMemo, useState } from "react"
import { motion, type Variants } from "motion/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/shared/container"
import type { BlogPost } from "@/features/marketing/data/blog-data"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { useActiveSection } from "../../hooks/use-active-section"
import { BlogBlock } from "./blog-block"
import { BlogToc } from "./blog-toc"
import { BlogSidebar } from "./blog-sidebar"

/* ── Variants ─────────────────────────────────────────────────── */

const layoutV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const sideV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.out },
  },
}

const articleV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
}

const sectionV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
}

const blockV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.out },
  },
}

const blocksContainerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const headingV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out },
  },
}

const faqItemV: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.out },
  },
}

const faqListV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

/* ── Component ────────────────────────────────────────────────── */

export function BlogDetailBody({ post }: { post: BlogPost }) {
  const hasStandaloneFaqs = post.faqs && post.faqs.length > 0

  const [openFaq, setOpenFaq] = useState<string[]>(
    hasStandaloneFaqs ? ["faq-0"] : []
  )

  const sectionIds = useMemo(
    () => [
      ...post.sections.map((s) => s.id),
      ...(hasStandaloneFaqs ? ["faq"] : []),
    ],
    [post.sections, hasStandaloneFaqs]
  )

  const activeId = useActiveSection(sectionIds)

  const tocItems = [
    ...post.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(hasStandaloneFaqs
      ? [{ id: "faq", label: "Frequently asked questions" }]
      : []),
  ]

  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={layoutV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
          className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:gap-16"
        >
          {/* TOC */}
          {tocItems.length > 0 && (
            <motion.aside
              variants={sideV}
              className="hidden lg:block lg:sticky lg:top-28 lg:self-start"
            >
              <BlogToc items={tocItems} activeId={activeId} />
            </motion.aside>
          )}

          {/* Article body */}
          <motion.article
            variants={articleV}
            className={cn(
              "flex min-w-0 flex-col gap-14",
              tocItems.length === 0 && "lg:col-span-2"
            )}
          >
            {post.sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={sectionV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
                className="scroll-mt-28 flex flex-col gap-6"
              >
                <motion.h2
                  variants={headingV}
                  className="font-heading text-[24px] font-semibold tracking-tight text-[var(--text)] md:text-[30px]"
                >
                  {section.heading}
                </motion.h2>

                <motion.div
                  variants={blocksContainerV}
                  className="flex flex-col gap-6"
                >
                  {section.blocks.map((block, i) => (
                    <motion.div key={i} variants={blockV}>
                      <BlogBlock block={block} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            ))}

            {/* Standalone FAQ */}
            {hasStandaloneFaqs && (
              <motion.section
                id="faq"
                variants={sectionV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="scroll-mt-28 flex flex-col gap-6 pt-4"
              >
                <motion.h2
                  variants={headingV}
                  className="font-heading text-[24px] font-semibold tracking-tight text-[var(--text)] md:text-[30px]"
                >
                  Frequently asked questions
                </motion.h2>

                <motion.div
                  variants={faqListV}
                  className="border-t border-[var(--border)]"
                >
                  <Accordion value={openFaq} onValueChange={setOpenFaq}>
                    {post.faqs!.map((faq, i) => (
                      <motion.div key={faq.question} variants={faqItemV}>
                        <AccordionItem
                          value={`faq-${i}`}
                          className="border-b border-[var(--border)]"
                        >
                          <AccordionTrigger
                            className={cn(
                              "group flex w-full items-start gap-5 py-5 text-left no-underline",
                              "transition-colors duration-300 ease-[var(--ease-premium)]",
                              "hover:no-underline data-[state=open]:text-[var(--brand)]"
                            )}
                          >
                            <span className="mt-1 font-medium text-[11px] tabular-nums tracking-[0.18em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 font-heading text-[16px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)] md:text-[18px]">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-6 pl-[40px] pr-4 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                            <p className="max-w-2xl">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              </motion.section>
            )}
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            variants={sideV}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <BlogSidebar />
          </motion.aside>
        </motion.div>
      </Container>
    </section>
  )
}