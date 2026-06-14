// app/work/[slug]/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProjectDetailPage from "@/features/projects/pages/project-detail-page"
import {
  getProjectBySlug,
  projects,
} from "@/features/marketing/data/projects-page"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) return { title: "Project not found" }

  return {
    title: `${project.title} — Leaflet Digital Solutions`,
    description:
      project.about ?? `Case study for ${project.title}`,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.about,
      images: [project.image],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return <ProjectDetailPage slug={slug} />
}