// features/services/components/services-numbers.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SplitLines } from "@/components/animations/text-reveal"
import { viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemV, itemBlurV } from "./details/service-variants"
import { StatsGrid } from "./stats-grid"

export function ServicesNumbers() {
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
              Leaflet
              <br />
              in numbers.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              Design is more than aesthetics — it&apos;s about measurable
              impact. Here&apos;s how we deliver it.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-2 lg:items-start lg:gap-16">
            <motion.div variants={itemV} className="flex flex-col gap-6">
              <SplitLines
                lines={[
                  "Every number reflects a shipped engagement — real product, real clients, real outcomes. We measure success the way our partners do: by what gets built and what it drives.",
                ]}
                as="p"
                className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]"
              />
              <div>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "group gap-2"
                  )}
                >
                  Let&apos;s talk
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>

            <StatsGrid />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}