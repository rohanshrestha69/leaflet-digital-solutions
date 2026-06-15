// features/services/components/details/service-intro.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { ImageReveal } from "@/components/animations/image-reveal"
import { SplitLines } from "@/components/animations/text-reveal"
import type { ServiceDetail } from "@/features/marketing/data/services-page"
import { viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemV, itemBlurV } from "./service-variants"

export function ServiceIntro({ intro }: { intro: ServiceDetail["intro"] }) {
  return (
    <section
      id="intro"
      className="relative border-b border-[var(--border)] py-20 md:py-28"
    >
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
              {intro.title}
              {intro.titleAccent && (
                <>
                  <br />
                  {intro.titleAccent}
                </>
              )}
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              {intro.supportingCopy}
            </p>
          </motion.div>

          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2 lg:items-start lg:gap-16">
            <motion.div variants={itemV}>
              <ImageReveal
                className="relative aspect-[4/3] rounded-[var(--radius-xl)] border border-[var(--border)]"
                direction="up"
                curtainColor="var(--background)"
              >
                <Image
                  src={intro.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 to-transparent"
                />
              </ImageReveal>
            </motion.div>

            <motion.div variants={itemV} className="flex flex-col gap-6">
              <SplitLines
                lines={[intro.body]}
                as="p"
                className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]"
              />

              <motion.div variants={itemV}>
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
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}