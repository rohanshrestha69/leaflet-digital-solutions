// features/marketing/components/blog-section.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { getLatestPosts } from "@/features/marketing/data/blog-data";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/features/blog/components/blog-card";
import { SectionLabel } from "@/components/shared/section-label";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const headerV: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.out },
  },
};

const featuredV: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: ease.out, delay: 0.1 },
  },
};

const sideListV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const sideCardV: Variants = {
  hidden: { opacity: 0, x: 18, filter: "blur(3px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: ease.out },
  },
};

const dividerV: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.6, ease: ease.inOut, delay: 0.05 },
  },
};

const ctaV: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: ease.soft, delay: 0.1 },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function BlogSection() {
  const posts = getLatestPosts(4);
  const [featured, ...rest] = posts;

  if (!featured) return null;

  return (
    <section
      id="journal"
      className="relative bg-[var(--background)] py-20 md:py-28"
    >
      <Container wide>
        <SectionLabel variant="line" className="mb-8 md:mb-10">
          Blogs
        </SectionLabel>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          {/* Header */}
          <motion.div
            variants={headerV}
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
            {/* Featured */}
            <motion.div variants={featuredV} className="lg:col-span-7">
              <BlogCard post={featured} variant="featured" />
            </motion.div>

            {/* Side list */}
            <motion.div
              variants={sideListV}
              className={cn(
                "flex flex-col",
                "border-t border-[var(--border)]",
                "lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12",
              )}
            >
              {rest.map((post, index) => (
                <motion.div key={post.slug} variants={sideCardV}>
                  {index > 0 && (
                    <motion.div
                      variants={dividerV}
                      className="border-t border-[var(--border)]"
                      style={{ originX: 0 }}
                    />
                  )}
                  <BlogCard post={post} variant="compact" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            variants={ctaV}
            className="mt-14 flex justify-center md:mt-16"
          >
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outlineDark", size: "lg" }),
                "gap-2",
              )}
            >
              All articles
              <ArrowUpRight className="size-4" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
