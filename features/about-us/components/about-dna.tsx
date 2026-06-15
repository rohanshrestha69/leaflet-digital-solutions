// features/about/components/about-dna.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SplitLines } from "@/components/animations/text-reveal"
import { ImageReveal } from "@/components/animations/image-reveal"
import { viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { sectionV, itemV, itemBlurV } from "./about-variants"

export function AboutDna() {
  return (
    <section
      id="story"
      className="relative scroll-mt-24 border-b border-[var(--border)] py-20 md:py-28"
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
              Craft is in
              <br />
              our DNA.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              We stand as an experienced and trustworthy partner — ready to
              help you build the next chapter with clarity, taste, and rigor.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2 lg:items-start lg:gap-16">
            <motion.div variants={itemV}>
              <ImageReveal
                className="aspect-[4/3] rounded-[var(--radius-xl)] border border-[var(--border)]"
                direction="up"
                curtainColor="#080706"
              >
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=1500&fit=crop"
                  alt="Leaflet studio workspace"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/30 to-transparent"
                />
              </ImageReveal>
            </motion.div>

            <motion.div variants={itemV} className="flex flex-col gap-6">
              <SplitLines
                lines={[
                  "Leaflet was formed by a small team of designers, engineers, and strategists who had spent years inside agencies and product teams.",
                  "We started the studio to do the work we always wanted to do — without the overhead, without the bureaucracy, and without compromising on craft.",
                ]}
                as="p"
                className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]"
                stagger={0.15}
              />

              <motion.p
                variants={itemV}
                className="text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]"
              >
                Every engagement is treated like it has our name attached
                forever. Because it does.
              </motion.p>

              <motion.div variants={itemV}>
                <Link
                  href="/blog"
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full",
                    "border border-[var(--border)] px-6 py-3",
                    "text-[14px] font-medium text-[var(--text)]",
                    "transition-[border-color,background-color,color] duration-300 ease-[var(--ease-premium)]",
                    "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/5 hover:text-[var(--brand)]"
                  )}
                >
                  Read our journal
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