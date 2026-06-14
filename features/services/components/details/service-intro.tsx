"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ServiceDetail } from "@/features/marketing/data/services-page"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { itemVariants, sectionContainer } from "./service-variants"

export function ServiceIntro({ intro }: { intro: ServiceDetail["intro"] }) {
  return (
    <section id="intro" className="relative border-b border-[var(--border)] py-20 md:py-28">
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
            <motion.div
              variants={itemVariants}
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]"
            >
              <Image
                src={intro.image}
                alt=""
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 to-transparent"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]">
                {intro.body}
              </p>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "orange", size: "lg" }),
                  "mt-8 gap-2"
                )}
              >
                Let&apos;s talk
                <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}