"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionContainer, itemVariants } from "./details/service-variants"
import { StatsGrid } from "./stats-grid"

export function ServicesNumbers() {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          <motion.div
            variants={itemVariants}
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
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <p className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]">
                Every number reflects a shipped engagement — real product, real
                clients, real outcomes. We measure success the way our partners
                do: by what gets built and what it drives.
              </p>
              <div>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "gap-2"
                  )}
                >
                  Let&apos;s talk
                  <ArrowUpRight className="size-4" />
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