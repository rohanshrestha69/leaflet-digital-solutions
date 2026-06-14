"use client"

import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import type { BlogPost } from "@/features/marketing/data/blog-data"
import { sectionViewport } from "@/lib/motion"
import {
  sectionContainer,
  itemVariants,
  gridContainer,
} from "../blog-variants"
import { BlogCard } from "../blog-card"

type Props = {
  posts: BlogPost[]
  currentCategory: string
}

export function BlogDetailRelated({ posts, currentCategory }: Props) {
  if (posts.length === 0) return null

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
              More on
              <span className="text-[var(--text-muted)]"> {currentCategory}.</span>
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              More writing from the studio worth your time.
            </p>
          </motion.div>

          <motion.div
            variants={gridContainer}
            className="mt-14 grid gap-8 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}