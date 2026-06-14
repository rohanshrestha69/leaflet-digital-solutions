"use client"

import { CTASection } from "@/features/projects/components/cta-section"


export function BlogCTA() {
  return (
    <CTASection
      eyebrow="Stay in the loop"
      title={
        <>
          Want more like this?
          <br />
          <span className="text-[var(--text-muted)]">Get it in your inbox.</span>
        </>
      }
      description="Occasional writing on design, engineering, and shipping products — no spam, no promotion. Just thoughtful posts when we publish them."
      actions={[
        { label: "Subscribe", href: "/contact", variant: "orange" },
        { label: "All articles", href: "/blog", variant: "outlineDark" },
      ]}
      withDots
      align="center"
    />
  )
}