// features/projects/components/details/project-detail-cta.tsx
"use client"

import { CTASection } from "../cta-section"

export function ProjectDetailCTA() {
  return (
    <CTASection
      eyebrow="Start a project"
      title={
        <>
          Have something
          <span className="text-[var(--text-muted)]"> like this in mind?</span>
        </>
      }
      description="We work with a small number of clients each quarter. Reach out early to secure a slot."
      actions={[
        { label: "Book a consultation", href: "/contact", variant: "orange" },
        { label: "See all work",        href: "/work",    variant: "outlineDark" },
      ]}
      withDots
      align="center"
    />
  )
}