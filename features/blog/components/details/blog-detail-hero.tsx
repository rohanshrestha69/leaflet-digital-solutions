"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import type { BlogPost } from "@/features/marketing/data/blog-data"
import { cn } from "@/lib/utils"
import { sectionContainer, itemVariants } from "../blog-variants"

export function BlogDetailHero({ post }: { post: BlogPost }) {
  return (
    <section className="relative border-b border-[var(--border)] pt-32 md:pt-40">
      <Container wide className="pb-12 md:pb-16">
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          animate="show"
        >
          {/* Back link */}
          <motion.div variants={itemVariants} className="mb-12">
            <Link
              href="/blog"
              className={cn(
                "group/back inline-flex items-center gap-2",
                "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]",
                "transition-colors duration-300 hover:text-[var(--text)]"
              )}
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
              All articles
            </Link>
          </motion.div>

          {/* Meta + title */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)]">
              {post.category}
            </span>

            <h1 className="max-w-5xl font-heading text-[36px] font-semibold leading-[1.04] tracking-tight text-[var(--text)] sm:text-[52px] md:text-[64px] lg:text-[76px]">
              {post.title}
            </h1>

            <p className="max-w-3xl text-[16px] leading-relaxed text-[var(--text-muted)] md:text-[18px]">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              <span>By {post.author}</span>
              <span className="size-1 rounded-full bg-[var(--text-subtle)]/40" />
              <span>{post.date}</span>
              <span className="size-1 rounded-full bg-[var(--text-subtle)]/40" />
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Hero image — outside container for edge-to-edge feel within max width */}
      <Container wide className="pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]"
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
        </motion.div>
      </Container>
    </section>
  )
}