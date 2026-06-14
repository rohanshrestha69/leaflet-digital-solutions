"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  getLatestPosts,
} from "@/features/marketing/data/blog-data"
import { premiumEase, sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { BlogCard } from "@/features/blog/components/blog-card"

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

const featuredVariants: Variants = {
  hidden: {},
  show: {
    transition: { duration: 0.6, ease: premiumEase, delayChildren: 0.15 },
  },
}

const sideListContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.25 },
  },
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function BlogSection() {
  /* Get the 4 most recent posts: 1 featured + 3 in the side list */
  const posts = getLatestPosts(4)
  const [featured, ...rest] = posts

  if (!featured) return null

  return (
    <section
      id="journal"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          {/* Header */}
          <motion.div
            variants={headerVariants}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              Writing from
              <br />
              the studio
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              Essays, playbooks, and lessons from shipping software with
              distributed teams.
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
            {/* Featured post */}
            <motion.div variants={featuredVariants} className="lg:col-span-7">
              <BlogCard post={featured} variant="featured" />
            </motion.div>

            {/* Side list — compact variant */}
            <motion.div
              variants={sideListContainer}
              className="flex flex-col border-t border-[var(--border)] lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12"
            >
              {rest.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  variant="compact"
                />
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            variants={headerVariants}
            className="mt-14 flex justify-center md:mt-16"
          >
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outlineDark", size: "lg" }),
                "gap-2"
              )}
            >
              All articles
              <ArrowUpRight className="size-4" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}