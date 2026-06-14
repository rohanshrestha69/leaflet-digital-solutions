"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionContainer, itemVariants } from "./details/service-variants"

const EXPERTISE_IMAGES = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop",
]

export function ServicesExpertise() {
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
              We solve
              <br />
              real problems.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              Strategy, design, and engineering combined into a single team —
              shipping outcomes that move the business forward.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div variants={itemVariants}>
              <p className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]">
                We combine years of expertise across UX/UI, motion, web
                engineering, and brand systems to build digital experiences
                that don&apos;t just look great — they drive engagement and
                deliver measurable results.
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

            <motion.div
              variants={itemVariants}
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-3 md:p-4"
            >
              <div className="grid h-full grid-cols-3 gap-2.5 md:gap-3">
                {EXPERTISE_IMAGES.map((src, i) => (
                  <div
                    key={src}
                    className="group relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)]"
                  >
                    <Image
                      src={src}
                      alt=""
                      width={400}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-110"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}