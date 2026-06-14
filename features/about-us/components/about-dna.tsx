"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { sectionViewport } from "@/lib/motion"
import { sectionContainer, itemVariants } from "./about-variants"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AboutDna() {
  return (
    <section
      id="story"
      className="relative scroll-mt-24 border-b border-[var(--border)] py-20 md:py-28"
    >
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
            <motion.div
              variants={itemVariants}
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]"
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
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <p className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]">
                Leaflet was formed by a small team of designers, engineers, and
                strategists who had spent years inside agencies and product
                teams. We started the studio to do the work we always wanted to
                do — without the overhead, without the bureaucracy, and without
                compromising on craft.
              </p>
              <p className="text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
                Every engagement is treated like it has our name attached
                forever. Because it does.
              </p>
              <Button               
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-fit flex items-center justify-center"
              )}>
                <Link
                    href="/blog"
                    className="inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-[var(--text)] transition-colors duration-200 hover:text-[var(--brand)]"
                >
                    Read our journal
                    <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}