"use client"

import { TestimonialsSection, type Testimonial } from "@/components/shared/testimonials-section"
import type { ServiceTestimonial } from "@/features/marketing/data/services-page"

type Props = {
  testimonials: ServiceTestimonial[]
}

export function ServiceTestimonials({ testimonials }: Props) {
  /* Adapt ServiceTestimonial → shared Testimonial shape */
  const items: Testimonial[] = testimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    company: t.company,
    socialUrl: "#", // wire up real URLs when available
  }))

  return (
    <TestimonialsSection
      heading={
        <>
          Trusted by teams
          <br />
          who care about craft.
        </>
      }
      description="Hear directly from founders and operators we've shipped with."
      testimonials={items}
    />
  )
}