// features/services/components/testimonial-card.tsx
"use client"

import { motion } from "motion/react"

import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { ServiceTestimonial } from "@/features/marketing/data/services-page"

type TestimonialCardProps = {
  testimonial: ServiceTestimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: ease.out }}
      whileHover={{ y: -2 }}
      className={cn(
        "group/quote flex flex-col justify-between gap-8 rounded-[var(--radius-xl)]",
        "border border-[var(--border)] bg-[var(--card)] p-7 md:p-8",
        "transition-[border-color] duration-300",
        "hover:border-[var(--border-strong)]"
      )}
    >
      <p className="text-[15px] leading-[1.65] text-[var(--text-soft)] md:text-[16px]">
        <span className="text-[var(--brand)]">&ldquo;</span>
        {testimonial.quote}
        <span className="text-[var(--brand)]">&rdquo;</span>
      </p>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--brand-soft)] font-medium text-[12px] font-semibold uppercase text-[var(--brand)]">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0">
            <p className="truncate font-heading text-[14px] font-semibold text-[var(--text)]">
              {testimonial.name}
            </p>
            <p className="truncate text-[12px] text-[var(--text-muted)]">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}