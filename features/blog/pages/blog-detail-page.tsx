import { notFound } from "next/navigation"

import {
  getBlogPost,
  getRelatedPosts,
} from "@/features/marketing/data/blog-data"
import { ContactForm } from "@/components/shared/contact-form"

import { BlogDetailHero } from "../components/details/blog-detail-hero"
import { BlogDetailBody } from "../components/details/blog-detail-body"
import { BlogDetailRelated } from "../components/details/blog-detail-related"

type Props = {
  slug: string
}

export function BlogDetailPage({ slug }: Props) {
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <BlogDetailHero post={post} />
      <BlogDetailBody post={post} />
      <BlogDetailRelated posts={related} currentCategory={post.category} />
      <ContactForm />
    </main>
  )
}