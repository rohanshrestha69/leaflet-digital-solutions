// features/blog/components/details/blog-detail-hero.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Container } from "@/components/shared/container"
import { SplitWords } from "@/components/animations/text-reveal"
import { LineSweepReveal } from "@/components/animations/line-sweep-reveal"
import { ImageReveal } from "@/components/animations/image-reveal"
import type { BlogPost } from "@/features/marketing/data/blog-data"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ── Variants ─────────────────────────────────────────────────── */

const containerV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const itemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
}

const backV: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
}

const metaV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } },
}

const metaItemV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.smooth },
  },
}

/* ── Component ────────────────────────────────────────────────── */

export function BlogDetailHero({ post }: { post: BlogPost }) {
  return (
    <section className="relative border-b border-[var(--border)] pt-32 md:pt-40">
      <Container wide className="pb-12 md:pb-16">
        <motion.div variants={containerV} initial="hidden" animate="show">
          {/* Back link */}
          <motion.div variants={backV} className="mb-12">
            <Link
              href="/blog"
              className={cn(
                "group/back inline-flex items-center gap-2",
                "font-medium text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]",
                "transition-colors duration-300 hover:text-[var(--text)]"
              )}
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover/back:-translate-x-1" />
              All articles
            </Link>
          </motion.div>

          {/* Category eyebrow */}
          <motion.div variants={itemV} className="mb-8">
            <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]">
              {post.category}
            </span>
          </motion.div>

          {/* Title — word-by-word clip reveal */}
          <motion.div variants={itemV} className="mb-8">
            <SplitWords
              text={post.title}
              as="h1"
              className="max-w-5xl font-heading text-[36px] font-semibold leading-[1.04] tracking-tight text-[var(--text)] sm:text-[52px] md:text-[64px] lg:text-[76px]"
              delay={0.15}
              stagger={0.035}
            />
          </motion.div>

          {/* Excerpt — left-to-right sweep */}
          <motion.div variants={itemV} className="mb-10 max-w-3xl">
            <LineSweepReveal
              text={post.excerpt}
              as="p"
              className="text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]"
              delay={0.05}
              stagger={0.022}
              duration={0.32}
            />
          </motion.div>

          {/* Meta row */}
          <motion.div
            variants={metaV}
            className="flex flex-wrap items-center gap-4 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]"
          >
            <motion.span variants={metaItemV}>By {post.author}</motion.span>
            <motion.span
              variants={metaItemV}
              className="size-1 rounded-full bg-[var(--text-subtle)]/40"
            />
            <motion.span variants={metaItemV}>{post.date}</motion.span>
            <motion.span
              variants={metaItemV}
              className="size-1 rounded-full bg-[var(--text-subtle)]/40"
            />
            <motion.span variants={metaItemV}>{post.readTime}</motion.span>
          </motion.div>
        </motion.div>
      </Container>

      {/* Hero image — curtain reveal with zoom */}
      <Container wide className="pb-16 md:pb-20">
        <ImageReveal
          className="relative aspect-[16/9] rounded-[var(--radius-xl)] border border-[var(--border)]"
          direction="up"
          curtainColor="var(--background)"
          delay={0.45}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
          />
        </ImageReveal>
      </Container>
    </section>
  )
}