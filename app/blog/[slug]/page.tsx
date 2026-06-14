import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getAllBlogSlugs,
  getBlogPost,
} from "@/features/marketing/data/blog-data"
import { BlogDetailPage } from "@/features/blog/pages/blog-detail-page"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Article — Leaflet Digital" }

  return {
    title: `${post.title} — Leaflet Digital`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      url: `/blog/${slug}`,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return <BlogDetailPage slug={slug} />
}