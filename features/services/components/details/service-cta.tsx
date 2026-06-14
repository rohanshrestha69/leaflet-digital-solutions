"use client"

import { CTASection } from "@/features/projects/components/cta-section"

type ServiceCTAProps = {
  /** Optional service title to personalize the CTA */
  serviceTitle?: string
}

export function ServiceCTA({ serviceTitle }: ServiceCTAProps) {
  return (
    <CTASection
      eyebrow="What's next"
      title={
        <>
          Let&apos;s work
          <span className="text-[var(--text-muted)]"> together.</span>
        </>
      }
      description={
        serviceTitle
          ? `Ready to start your ${serviceTitle.toLowerCase()} project? Let's bring your vision to life and create something unforgettable together.`
          : "Bring your vision to life and transform your ideas into a powerful, unforgettable brand experience that drives growth and lasting impact."
      }
      actions={[
        {
          label: "Schedule a call",
          href: "/contact",
          variant: "orange",
        },
        {
          label: "All services",
          href: "/services",
          variant: "outlineDark",
        },
      ]}
      withDots
      align="center"
    />
  )
}