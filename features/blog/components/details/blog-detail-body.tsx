"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/shared/container"
import type { BlogPost } from "@/features/marketing/data/blog-data"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { useActiveSection } from "../../hooks/use-active-section"
import { sectionContainer, itemVariants } from "../blog-variants"
import { BlogBlock } from "./blog-block"
import { BlogToc } from "./blog-toc"
import { BlogSidebar } from "./blog-sidebar"

export function BlogDetailBody({ post }: { post: BlogPost }) {
  const hasStandaloneFaqs = post.faqs && post.faqs.length > 0

  /* Controlled accordion — start with first item open */
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
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:gap-16"
        >
          {/* TOC */}
          {tocItems.length > 0 && (
            <motion.aside
              variants={itemVariants}
              className="hidden lg:block lg:sticky lg:top-28 lg:self-start"
            >
              <BlogToc items={tocItems} activeId={activeId} />
            </motion.aside>
          )}

          {/* Article body */}
          <motion.article
            variants={itemVariants}
            className={cn(
              "flex min-w-0 flex-col gap-14",
              tocItems.length === 0 && "lg:col-span-2"
            )}
          >
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 flex flex-col gap-6"
              >
                <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--text)] md:text-[30px]">
                  {section.heading}
                </h2>

                {section.blocks.map((block, i) => (
                  <BlogBlock key={i} block={block} />
                ))}
              </section>
            ))}

            {/* Standalone FAQ section */}
            {hasStandaloneFaqs && (
              <section
                id="faq"
                className="scroll-mt-28 flex flex-col gap-6 pt-4"
              >
                <h2 className="font-heading text-[24px] font-semibold tracking-tight text-[var(--text)] md:text-[30px]">
                  Frequently asked questions
                </h2>

                <div className="border-t border-[var(--border)]">
                  <Accordion value={openFaq} onValueChange={setOpenFaq}>
                    {post.faqs!.map((faq, i) => {
                      const number = String(i + 1).padStart(2, "0")
                      return (
                        <AccordionItem
                          key={faq.question}
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
                            <span className="mt-1 font-mono text-[11px] tabular-nums tracking-[0.18em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)]">
                              {number}
                            </span>
                            <span className="flex-1 font-heading text-[16px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)] md:text-[18px]">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-6 pl-[40px] pr-4 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                            <p className="max-w-2xl">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </div>
              </section>
            )}
          </motion.article>

          {/* Right sidebar */}
          <motion.aside
            variants={itemVariants}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <BlogSidebar />
          </motion.aside>
        </motion.div>
      </Container>
    </section>
  )
}