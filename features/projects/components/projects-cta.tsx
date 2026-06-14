"use client"

import { CTASection } from "./cta-section"


export function ProjectsCTA() {
  return (
    <CTASection
      eyebrow="Let's work together"
      title={
        <>
          Have a project in mind?
          <br />
          <span className="text-[var(--text-muted)]">
            Let&apos;s build it together.
          </span>
        </>
      }
      description="We take on a limited number of projects each quarter to ensure focus and quality. Get in touch early."
      actions={[
        { label: "View services", href: "/services", variant: "outlineDark" },
        { label: "Start a project", href: "/contact", variant: "orange" },
      ]}
      withDots
      align="center"
    />
  )
}