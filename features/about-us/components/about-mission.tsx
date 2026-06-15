// features/about/components/about-mission.tsx
"use client"

import Image from "next/image"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { ImageReveal } from "@/components/animations/image-reveal"
import { SplitLines } from "@/components/animations/text-reveal"
import { viewport } from "@/lib/motion"
import { sectionV, itemV, itemBlurV } from "./about-variants"

export function AboutMission() {
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
              Your success is
              <br />
              the only metric.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              We combine talented people with an unwavering commitment to our
              partners&apos; outcomes.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2 lg:items-start lg:gap-16">
            <motion.div
              variants={itemV}
              className="order-2 lg:order-1"
            >
              <ImageReveal
                className="relative aspect-[5/3] rounded-[var(--radius-xl)] border border-[var(--border)]"
                direction="left"
                curtainColor="#080706"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=960&fit=crop"
                  alt="Leaflet team collaborating"
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

            <motion.div
              variants={itemV}
              className="order-1 flex flex-col gap-6 lg:order-2"
            >
              <SplitLines
                lines={[
                  "We obsess over how to design, build, and validate new ideas in better ways — for our partners, and for the people who ultimately use what we make.",
                  "More than 90% of our work comes through referrals. We've proven, time and again, that we don't let our partners down.",
                ]}
                as="p"
                className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]"
                stagger={0.15}
              />

              <motion.p
                variants={itemV}
                className="text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]"
              >
                We treat every project as if our name were attached to it
                forever. It is.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}